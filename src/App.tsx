import { useState, useEffect, useCallback, useRef } from 'react';
import { skills, achievements, shopItems, projects, type Skill } from './data/lessons';
import * as api from './api';

// Telegram WebApp types
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        MainButton: {
          text: string;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        BackButton: {
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
          selectionChanged: () => void;
        };
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          secondary_bg_color?: string;
        };
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            photo_url?: string;
          };
        };
        CloudStorage: {
          setItem: (key: string, value: string, callback?: (error: Error | null, success: boolean) => void) => void;
          getItem: (key: string, callback: (error: Error | null, value: string | null) => void) => void;
          getItems: (keys: string[], callback: (error: Error | null, values: Record<string, string>) => void) => void;
        };
        colorScheme: 'light' | 'dark';
      };
    };
  }
}

// User state interface
// Clan interface for future use
type ClanData = {
  id: string;
  name: string;
  icon: string;
  members: number;
  totalXP: number;
  rank: number;
};

interface UserState {
  level: number;
  xp: number;
  xpToNextLevel: number;
  gems: number;
  hearts: number;
  maxHearts: number;
  lastHeartRegenTime: number;
  streak: number;
  lastActivityDate: string;
  streakFreezeActive: boolean;
  completedLessons: string[];
  completedSkills: string[];
  completedProjects: string[];
  unlockedAchievements: string[];
  ownedItems: string[];
  equippedAvatar: string;
  equippedPet: string;
  equippedTheme: string;
  equippedFrame: string;
  friends: string[];
  clanId: string | null;
  clanName: string | null;
  clanIcon: string | null;
  eloRating: number;
  duelsWon: number;
  duelsLost: number;
  battlePassLevel: number;
  battlePassXP: number;
  isPremium: boolean;
  dailySpinsUsed: number;
  lastSpinDate: string;
  lastWheelSpin: number; // timestamp для точной проверки 24 часов
  weakSkills: string[];
  totalLessonsCompleted: number;
  perfectLessons: number;
  nightLessons: number;
  bugsFixed: number;
  codeWritten: number;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  reminderTime: 'morning' | 'evening';
}

const defaultUserState: UserState = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  gems: 500,
  hearts: 5,
  maxHearts: 5,
  lastHeartRegenTime: Date.now(),
  streak: 0,
  lastActivityDate: '',
  streakFreezeActive: false,
  completedLessons: [],
  completedSkills: [],
  completedProjects: [],
  unlockedAchievements: [],
  ownedItems: ['avatar-hacker'],
  equippedAvatar: '👨‍💻',
  equippedPet: '',
  equippedTheme: '',
  equippedFrame: '',
  friends: [],
  clanId: null,
  clanName: null,
  clanIcon: null,
  eloRating: 1000,
  duelsWon: 0,
  duelsLost: 0,
  battlePassLevel: 1,
  battlePassXP: 0,
  isPremium: false,
  dailySpinsUsed: 0,
  lastSpinDate: '',
  lastWheelSpin: 0,
  weakSkills: [],
  totalLessonsCompleted: 0,
  perfectLessons: 0,
  nightLessons: 0,
  bugsFixed: 0,
  codeWritten: 0,
  soundEnabled: true,
  vibrationEnabled: true,
  reminderTime: 'morning'
};

// Views
type View = 'home' | 'learn' | 'practice' | 'leaderboard' | 'shop' | 'profile' | 
            'lesson' | 'skill' | 'project' | 'sandbox' | 'duel' | 'clan' | 
            'friends' | 'achievements' | 'battlepass' | 'wheel' | 'settings';

export function App() {
  const [user, setUser] = useState<UserState>(defaultUserState);
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [currentLesson, setCurrentLesson] = useState<{skill: Skill, lessonIndex: number} | null>(null);
  const [currentExercise, setCurrentExercise] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [xpPopup, setXpPopup] = useState<{amount: number, x: number, y: number} | null>(null);
  const [lessonMistakes, setLessonMistakes] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState<'correct' | 'wrong' | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Wheel state
  const [wheelSpinning, setWheelSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wheelPrize, setWheelPrize] = useState<{type: string, amount: number, label: string} | null>(null);
  
  // Sandbox state
  const [sandboxCode, setSandboxCode] = useState('# Пиши свой Python код здесь!\nprint("Hello, CodeStreak!")\n\n# Попробуй:\nfor i in range(5):\n    print(f"Число: {i}")');
  const [sandboxOutput, setSandboxOutput] = useState('');
  const [sandboxRunning, setSandboxRunning] = useState(false);
  
  // Clan state
  const [showClanCreateModal, setShowClanCreateModal] = useState(false);
  const [newClanName, setNewClanName] = useState('');
  const [selectedClanIcon, setSelectedClanIcon] = useState('🐍');
  const [clanChatMessages, setClanChatMessages] = useState<{id: string, user: string, avatar: string, text: string, time: string}[]>([
    { id: '1', user: 'PyMaster', avatar: '👨‍💻', text: 'Привет всем! Кто сегодня практику делал?', time: '10:30' },
    { id: '2', user: 'CodeNinja', avatar: '🥷', text: 'Я уже 5 уроков прошёл! 🔥', time: '10:35' },
    { id: '3', user: 'DevGuru', avatar: '🧙', text: 'Молодцы! Давайте в топ-3 на этой неделе!', time: '10:42' },
  ]);
  const [newChatMessage, setNewChatMessage] = useState('');
  const [showJoinClanModal, setShowJoinClanModal] = useState(false);
  
  // Duel state
  const [duelSearching, setDuelSearching] = useState(false);
  const [duelActive, setDuelActive] = useState(false);
  const [duelOpponent, setDuelOpponent] = useState<{name: string, avatar: string, elo: number} | null>(null);
  const [duelQuestion, setDuelQuestion] = useState(0);
  const [duelScore, setDuelScore] = useState({ player: 0, opponent: 0 });
  const [duelTimeLeft, setDuelTimeLeft] = useState(30);
  
  // Practice state  
  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceExercises, setPracticeExercises] = useState<any[]>([]);
  
  // Friends invite
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Initialize Telegram WebApp
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      
      // Apply theme
      const theme = window.Telegram.WebApp.themeParams;
      if (theme.bg_color) {
        document.documentElement.style.setProperty('--tg-theme-bg-color', theme.bg_color);
      }
      if (theme.text_color) {
        document.documentElement.style.setProperty('--tg-theme-text-color', theme.text_color);
      }
      if (theme.hint_color) {
        document.documentElement.style.setProperty('--tg-theme-hint-color', theme.hint_color);
      }
      if (theme.secondary_bg_color) {
        document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', theme.secondary_bg_color);
      }
    }

    // Load saved data
    loadUserData();
    
    // Check streak
    checkStreak();
    
    // Heart regeneration timer
    const heartTimer = setInterval(regenerateHearts, 60000);
    
    // Periodic sync every 30 seconds
    const syncTimer = setInterval(async () => {
      if (!isSyncing) {
        const currentUser = user;
        await api.syncUserData({
          ...currentUser,
          skill_progress: currentUser.completedSkills.reduce((acc, id) => ({ ...acc, [id]: 100 }), {}),
          completed_lessons: currentUser.completedLessons,
          achievements: currentUser.unlockedAchievements,
        });
        setLastSyncTime(new Date());
      }
    }, 30000);
    
    return () => {
      clearInterval(heartTimer);
      clearInterval(syncTimer);
    };
  }, []);

  const haptic = useCallback((type: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning' | 'selection') => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      if (type === 'selection') {
        window.Telegram.WebApp.HapticFeedback.selectionChanged();
      } else if (['success', 'error', 'warning'].includes(type)) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred(type as 'success' | 'error' | 'warning');
      } else {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(type as 'light' | 'medium' | 'heavy');
      }
    }
  }, []);

  // Состояние синхронизации
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const loadUserData = async () => {
    try {
      const telegramId = api.getTelegramUserId();
      console.log('📱 Loading data for Telegram ID:', telegramId);
      
      // Сначала загружаем из localStorage для быстрого отображения
      const saved = localStorage.getItem('codestreak_user');
      let localData: UserState | null = null;
      
      if (saved) {
        localData = JSON.parse(saved);
        setUser(localData!);
        
        if (localData?.equippedTheme) {
          document.body.className = `theme-${localData.equippedTheme}`;
        }
      }
      
      // Затем синхронизируем с сервером
      setIsSyncing(true);
      const serverData = await api.loadUserData();
      
      if (serverData) {
        console.log('☁️ Got data from server:', serverData);
        
        // Мержим данные - берём максимальные значения
        const mergedData: UserState = {
          ...defaultUserState,
          ...serverData,
          xp: Math.max(serverData.xp || 0, localData?.xp || 0),
          level: Math.max(serverData.level || 1, localData?.level || 1),
          gems: Math.max(serverData.gems || 0, localData?.gems || 0),
          streak: Math.max(serverData.streak || 0, localData?.streak || 0),
          hearts: Math.min(5, Math.max(serverData.hearts || 5, localData?.hearts || 5)),
          totalLessonsCompleted: Math.max(serverData.totalLessonsCompleted || 0, localData?.totalLessonsCompleted || 0),
          lastWheelSpin: Math.max(serverData.lastWheelSpin || 0, localData?.lastWheelSpin || 0),
          completedLessons: [...new Set([
            ...(serverData.completedLessons || []),
            ...(localData?.completedLessons || [])
          ])],
          completedSkills: [...new Set([
            ...(serverData.completedSkills || []),
            ...(localData?.completedSkills || [])
          ])],
          unlockedAchievements: [...new Set([
            ...(serverData.unlockedAchievements || []),
            ...(localData?.unlockedAchievements || [])
          ])],
          ownedItems: [...new Set([
            ...(serverData.ownedItems || ['avatar-hacker']),
            ...(localData?.ownedItems || ['avatar-hacker'])
          ])],
        };
        
        setUser(mergedData);
        api.saveToLocalStorage(mergedData);
        
        if (mergedData.equippedTheme) {
          document.body.className = `theme-${mergedData.equippedTheme}`;
        }
        
        console.log('✅ Merged data:', mergedData);
      } else {
        console.log('⚠️ No server data, using local');
      }
      
      setLastSyncTime(new Date());
      setIsSyncing(false);
    } catch (e) {
      console.error('Failed to load user data', e);
      setIsSyncing(false);
    }
  };

  const saveUserData = useCallback(async (newUser: UserState) => {
    try {
      console.log('💾 Saving user data...');
      
      // Сохраняем локально сразу
      api.saveToLocalStorage(newUser);
      
      // Отложенная синхронизация с сервером (debounce)
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
      
      syncTimeoutRef.current = setTimeout(async () => {
        setIsSyncing(true);
        console.log('☁️ Syncing to server...');
        
        try {
          const success = await api.saveUserData(newUser);
          
          if (success) {
            console.log('✅ Data saved to server');
          } else {
            console.log('⚠️ Failed to save to server, data is in localStorage');
          }
        } catch (err) {
          console.log('⚠️ Server not available, data saved locally');
        }
        
        setLastSyncTime(new Date());
        setIsSyncing(false);
      }, 1000); // 1 секунда debounce
    } catch (e) {
      console.error('Failed to save user data', e);
    }
  }, []);

  const updateUser = useCallback((updates: Partial<UserState>) => {
    setUser(prev => {
      const newUser = { ...prev, ...updates };
      saveUserData(newUser);
      return newUser;
    });
  }, [saveUserData]);

  const checkStreak = () => {
    const today = new Date().toDateString();
    const lastActivity = user.lastActivityDate;
    
    if (lastActivity) {
      const lastDate = new Date(lastActivity);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays > 1 && !user.streakFreezeActive) {
        updateUser({ streak: 0 });
      } else if (diffDays === 1) {
        updateUser({ streakFreezeActive: false });
      }
    }
  };

  const regenerateHearts = () => {
    if (user.hearts < user.maxHearts) {
      const now = Date.now();
      const timePassed = now - user.lastHeartRegenTime;
      const heartsToAdd = Math.floor(timePassed / (30 * 60 * 1000)); // 30 min per heart
      
      if (heartsToAdd > 0) {
        const newHearts = Math.min(user.maxHearts, user.hearts + heartsToAdd);
        updateUser({ hearts: newHearts, lastHeartRegenTime: now });
      }
    }
  };

  const addXP = useCallback((amount: number, event?: React.MouseEvent) => {
    const multiplier = user.isPremium ? 2 : 1;
    const totalXP = amount * multiplier;
    
    let newXP = user.xp + totalXP;
    let newLevel = user.level;
    let newXPToNext = user.xpToNextLevel;
    
    while (newXP >= newXPToNext) {
      newXP -= newXPToNext;
      newLevel++;
      newXPToNext = Math.floor(100 * Math.pow(1.2, newLevel - 1));
      haptic('success');
    }
    
    updateUser({
      xp: newXP,
      level: newLevel,
      xpToNextLevel: newXPToNext,
      battlePassXP: user.battlePassXP + totalXP
    });
    
    // Show XP popup
    if (event) {
      setXpPopup({
        amount: totalXP,
        x: event.clientX,
        y: event.clientY
      });
      setTimeout(() => setXpPopup(null), 1000);
    }
  }, [user, haptic, updateUser]);

  const checkAchievements = useCallback(() => {
    const newAchievements: string[] = [];
    
    if (user.totalLessonsCompleted === 1 && !user.unlockedAchievements.includes('first-lesson')) {
      newAchievements.push('first-lesson');
    }
    if (user.streak >= 7 && !user.unlockedAchievements.includes('streak-7')) {
      newAchievements.push('streak-7');
    }
    if (user.streak >= 30 && !user.unlockedAchievements.includes('streak-30')) {
      newAchievements.push('streak-30');
    }
    if (user.streak >= 100 && !user.unlockedAchievements.includes('streak-100')) {
      newAchievements.push('streak-100');
    }
    if (user.perfectLessons >= 1 && !user.unlockedAchievements.includes('perfect-lesson')) {
      newAchievements.push('perfect-lesson');
    }
    if (user.perfectLessons >= 10 && !user.unlockedAchievements.includes('perfect-10')) {
      newAchievements.push('perfect-10');
    }
    if (user.nightLessons >= 1 && !user.unlockedAchievements.includes('night-owl')) {
      newAchievements.push('night-owl');
    }
    if (user.nightLessons >= 10 && !user.unlockedAchievements.includes('night-10')) {
      newAchievements.push('night-10');
    }
    if (user.completedSkills.length >= 1 && !user.unlockedAchievements.includes('first-skill')) {
      newAchievements.push('first-skill');
    }
    if (user.xp >= 1000 && !user.unlockedAchievements.includes('xp-1000')) {
      newAchievements.push('xp-1000');
    }
    if (user.xp >= 10000 && !user.unlockedAchievements.includes('xp-10000')) {
      newAchievements.push('xp-10000');
    }
    
    if (newAchievements.length > 0) {
      updateUser({
        unlockedAchievements: [...user.unlockedAchievements, ...newAchievements]
      });
      haptic('success');
    }
  }, [user, updateUser, haptic]);

  const isSkillUnlocked = (skill: Skill): boolean => {
    if (skill.requiredSkills.length === 0) return true;
    return skill.requiredSkills.every(id => user.completedSkills.includes(id));
  };

  const getSkillProgress = (skill: Skill): number => {
    if (skill.lessons.length === 0) return 0;
    const completed = skill.lessons.filter(l => 
      user.completedLessons.includes(l.id)
    ).length;
    return (completed / skill.lessons.length) * 100;
  };

  const startLesson = (skill: Skill, lessonIndex: number) => {
    if (user.hearts <= 0 && !user.isPremium) {
      haptic('error');
      return;
    }
    
    setSelectedSkill(skill);
    setCurrentLesson({ skill, lessonIndex });
    setCurrentExercise(0);
    setLessonMistakes(0);
    setUserAnswer('');
    setShowResult(null);
    setSelectedOption(null);
    setCurrentView('lesson');
    haptic('medium');
  };

  const handleAnswer = (answer: string, event?: React.MouseEvent) => {
    if (showResult) return;
    
    const lesson = currentLesson?.skill.lessons[currentLesson.lessonIndex];
    if (!lesson) return;
    
    const exercise = lesson.exercises[currentExercise];
    let isCorrect = false;
    
    if (Array.isArray(exercise.correctAnswer)) {
      isCorrect = exercise.correctAnswer.some(correct => 
        answer.trim().toLowerCase().replace(/\s+/g, ' ') === 
        correct.toLowerCase().replace(/\s+/g, ' ')
      );
    } else {
      isCorrect = answer.trim().toLowerCase() === exercise.correctAnswer.toLowerCase();
    }
    
    if (isCorrect) {
      setShowResult('correct');
      haptic('success');
      addXP(exercise.xp, event);
    } else {
      setShowResult('wrong');
      haptic('error');
      setLessonMistakes(prev => prev + 1);
      
      if (!user.isPremium) {
        updateUser({ hearts: Math.max(0, user.hearts - 1) });
      }
      
      if (exercise.type === 'fix') {
        updateUser({ bugsFixed: user.bugsFixed + 1 });
      }
    }
    
    if (exercise.type === 'write' || exercise.type === 'translate') {
      updateUser({ codeWritten: user.codeWritten + 1 });
    }
  };

  const nextExercise = () => {
    const lesson = currentLesson?.skill.lessons[currentLesson.lessonIndex];
    if (!lesson) return;
    
    if (currentExercise < lesson.exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setUserAnswer('');
      setShowResult(null);
      setSelectedOption(null);
    } else {
      // Lesson complete
      completeLesson();
    }
  };

  const completeLesson = () => {
    if (!currentLesson) return;
    
    const lesson = currentLesson.skill.lessons[currentLesson.lessonIndex];
    const today = new Date().toDateString();
    const hour = new Date().getHours();
    
    let updates: Partial<UserState> = {
      completedLessons: [...user.completedLessons, lesson.id],
      totalLessonsCompleted: user.totalLessonsCompleted + 1,
      lastActivityDate: today
    };
    
    // Check streak
    if (user.lastActivityDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (user.lastActivityDate === yesterday.toDateString() || !user.lastActivityDate) {
        updates.streak = user.streak + 1;
      }
    }
    
    // Perfect lesson
    if (lessonMistakes === 0) {
      updates.perfectLessons = user.perfectLessons + 1;
    }
    
    // Night lesson
    if (hour >= 0 && hour < 6) {
      updates.nightLessons = user.nightLessons + 1;
    }
    
    // Check if skill completed
    const allLessonsComplete = currentLesson.skill.lessons.every(l => 
      [...user.completedLessons, lesson.id].includes(l.id)
    );
    
    if (allLessonsComplete && !user.completedSkills.includes(currentLesson.skill.id)) {
      updates.completedSkills = [...user.completedSkills, currentLesson.skill.id];
      updates.gems = user.gems + 50;
    }
    
    updateUser(updates);
    checkAchievements();
    
    setShowConfetti(true);
    haptic('success');
    
    setTimeout(() => {
      setShowConfetti(false);
      setCurrentView('home');
      setCurrentLesson(null);
    }, 2500);
  };

  const spinWheel = () => {
    const now = Date.now();
    const hoursSinceLastSpin = (now - user.lastWheelSpin) / (1000 * 60 * 60);
    
    // Проверка 24 часов (для не-премиум)
    if (hoursSinceLastSpin < 24 && !user.isPremium && user.lastWheelSpin > 0) {
      haptic('error');
      return null;
    }
    
    const prizes = [
      { type: 'xp', amount: 10, label: '+10 XP' },
      { type: 'xp', amount: 25, label: '+25 XP' },
      { type: 'xp', amount: 50, label: '+50 XP' },
      { type: 'gems', amount: 10, label: '+10 💎' },
      { type: 'gems', amount: 25, label: '+25 💎' },
      { type: 'gems', amount: 100, label: '+100 💎' },
      { type: 'hearts', amount: 1, label: '+1 ❤️' },
      { type: 'doubleXP', amount: 1, label: '2x XP 1ч' }
    ];
    
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    
    let updates: Partial<UserState> = {
      lastWheelSpin: now, // Сохраняем timestamp
      dailySpinsUsed: user.dailySpinsUsed + 1,
      lastSpinDate: new Date().toDateString()
    };
    
    if (prize.type === 'xp') {
      updates.xp = user.xp + prize.amount;
    } else if (prize.type === 'gems') {
      updates.gems = user.gems + prize.amount;
    } else if (prize.type === 'hearts') {
      updates.hearts = Math.min(user.maxHearts, user.hearts + prize.amount);
    }
    
    updateUser(updates);
    haptic('success');
    
    return prize;
  };

  const buyItem = (itemId: string) => {
    const item = shopItems.find(i => i.id === itemId);
    if (!item || user.gems < item.price || user.ownedItems.includes(itemId)) {
      haptic('error');
      return;
    }
    
    updateUser({
      gems: user.gems - item.price,
      ownedItems: [...user.ownedItems, itemId]
    });
    haptic('success');
  };

  // Render functions
  const renderHeader = () => (
    <div className="flex items-center justify-between p-4 sticky top-0 z-50 bg-[var(--tg-theme-bg-color)]">
      <div className="flex items-center gap-2">
        <span className="streak-flame">🔥</span>
        <span className="font-bold text-lg">{user.streak}</span>
        
        {/* Sync indicator */}
        <span className={`text-xs ml-2 ${isSyncing ? 'text-yellow-500 animate-pulse' : 'text-green-500'}`}>
          {isSyncing ? '⟳' : '✓'}
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[...Array(user.maxHearts)].map((_, i) => (
            <span key={i} className={`heart ${i >= user.hearts ? 'empty' : ''}`}>
              ❤️
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full">
          <span>💎</span>
          <span className="font-bold text-purple-600 dark:text-purple-400">{user.gems}</span>
        </div>
      </div>
    </div>
  );

  const renderTabBar = () => (
    <div className="tab-bar">
      {[
        { id: 'home', icon: '🏠', label: 'Учить' },
        { id: 'practice', icon: '🎯', label: 'Практика' },
        { id: 'leaderboard', icon: '🏆', label: 'Лидеры' },
        { id: 'shop', icon: '🛒', label: 'Магазин' },
        { id: 'profile', icon: '👤', label: 'Профиль' }
      ].map(tab => (
        <button
          key={tab.id}
          onClick={() => { setCurrentView(tab.id as View); haptic('selection'); }}
          className={`tab-item ${currentView === tab.id ? 'active' : ''}`}
        >
          <span className="text-2xl">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );

  const renderSkillTree = () => (
    <div className="p-4 safe-bottom">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">🐍 Python</h1>
        <p className="text-[var(--tg-theme-hint-color)]">Изучай программирование играючи</p>
      </div>
      
      <div className="flex flex-col items-center gap-6">
        {skills.map((skill, index) => {
          const unlocked = isSkillUnlocked(skill);
          const progress = getSkillProgress(skill);
          const completed = user.completedSkills.includes(skill.id);
          const current = unlocked && !completed && skill.lessons.length > 0;
          
          return (
            <div key={skill.id} className="flex flex-col items-center">
              {index > 0 && (
                <div className={`w-1 h-8 -mt-2 mb-2 rounded-full ${
                  unlocked ? 'bg-[var(--primary)]' : 'bg-gray-300 dark:bg-gray-700'
                }`} />
              )}
              
              <button
                onClick={() => {
                  if (unlocked && skill.lessons.length > 0) {
                    setSelectedSkill(skill);
                    setCurrentView('skill');
                    haptic('medium');
                  } else if (!unlocked) {
                    haptic('error');
                  }
                }}
                disabled={!unlocked || skill.lessons.length === 0}
                className={`skill-node relative ${
                  !unlocked ? 'locked' :
                  completed ? 'completed' :
                  current ? 'available current' : 'available'
                }`}
              >
                <span className="text-3xl">{skill.icon}</span>
                
                {progress > 0 && progress < 100 && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-2 progress-bar">
                    <div 
                      className="progress-fill bg-white"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
                
                {completed && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                )}
              </button>
              
              <span className={`mt-2 text-sm font-medium ${
                !unlocked ? 'text-gray-400' : ''
              }`}>
                {skill.title}
              </span>
              
              {skill.lessons.length === 0 && (
                <span className="text-xs text-[var(--tg-theme-hint-color)]">Скоро</span>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Projects section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-center">🚀 Проекты</h2>
        <div className="grid grid-cols-1 gap-4">
          {projects.map(project => {
            const unlocked = project.requiredSkills.every(id => 
              user.completedSkills.includes(id)
            );
            const completed = user.completedProjects.includes(project.id);
            
            return (
              <button
                key={project.id}
                onClick={() => {
                  if (unlocked) {
                    haptic('medium');
                    // Navigate to project
                  }
                }}
                disabled={!unlocked}
                className={`card p-4 flex items-center gap-4 ${
                  !unlocked ? 'opacity-50' : ''
                }`}
              >
                <span className="text-4xl">{project.icon}</span>
                <div className="text-left flex-1">
                  <h3 className="font-bold">{project.title}</h3>
                  <p className="text-sm text-[var(--tg-theme-hint-color)]">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">
                      +{project.xpReward} XP
                    </span>
                    {completed && (
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded">
                        ✓ Выполнено
                      </span>
                    )}
                  </div>
                </div>
                {!unlocked && <span className="text-2xl">🔒</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderSkillDetail = () => {
    if (!selectedSkill) return null;
    
    return (
      <div className="p-4 safe-bottom animate-slide-up">
        <button
          onClick={() => { setCurrentView('home'); haptic('light'); }}
          className="flex items-center gap-2 mb-4 text-[var(--tg-theme-link-color)]"
        >
          ← Назад
        </button>
        
        <div className="text-center mb-6">
          <span className="text-6xl mb-2 block animate-bounce-in">{selectedSkill.icon}</span>
          <h1 className="text-2xl font-bold">{selectedSkill.title}</h1>
          <p className="text-[var(--tg-theme-hint-color)]">{selectedSkill.description}</p>
        </div>
        
        <div className="space-y-3">
          {selectedSkill.lessons.map((lesson, index) => {
            const completed = user.completedLessons.includes(lesson.id);
            const previousCompleted = index === 0 || 
              user.completedLessons.includes(selectedSkill.lessons[index - 1].id);
            const available = previousCompleted && !completed;
            
            return (
              <button
                key={lesson.id}
                onClick={() => {
                  if (available || completed) {
                    startLesson(selectedSkill, index);
                  }
                }}
                disabled={!available && !completed}
                className={`card w-full p-4 flex items-center gap-4 transition-all ${
                  available ? 'border-2 border-[var(--primary)]' : ''
                } ${!available && !completed ? 'opacity-50' : ''}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  completed ? 'bg-[var(--primary)] text-white' :
                  available ? 'bg-[var(--primary)] text-white animate-pulse-glow' :
                  'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}>
                  {completed ? '✓' : index + 1}
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-semibold">{lesson.title}</h3>
                  <p className="text-sm text-[var(--tg-theme-hint-color)]">
                    {lesson.exercises.length} упражнений
                  </p>
                </div>
                {!available && !completed && <span className="text-xl">🔒</span>}
              </button>
            );
          })}
        </div>
        
        <div className="mt-6 card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Прогресс</span>
            <span className="text-[var(--primary)] font-bold">
              {Math.round(getSkillProgress(selectedSkill))}%
            </span>
          </div>
          <div className="progress-bar h-3">
            <div 
              className="progress-fill bg-[var(--primary)]"
              style={{ width: `${getSkillProgress(selectedSkill)}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderExercise = () => {
    // Handle practice mode
    if (practiceMode && practiceExercises.length > 0) {
      const exercise = practiceExercises[currentExercise];
      if (!exercise) {
        setPracticeMode(false);
        setPracticeExercises([]);
        setCurrentView('practice');
        return null;
      }
      
      const progress = ((currentExercise + 1) / practiceExercises.length) * 100;
      const totalExercises = practiceExercises.length;
      
      return (
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 flex items-center gap-4">
            <button
              onClick={() => { 
                setPracticeMode(false);
                setPracticeExercises([]);
                setCurrentView('practice'); 
                haptic('light'); 
              }}
              className="text-2xl"
            >
              ✕
            </button>
            <div className="flex-1 progress-bar h-3">
              <div 
                className="progress-fill bg-blue-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium">{currentExercise + 1}/{totalExercises}</span>
          </div>
          
          {/* Practice badge */}
          <div className="px-4 mb-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              🧠 Умная практика
            </span>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-4 overflow-auto">
            {/* Exercise Type Badge */}
            <div className="mb-4">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                {exercise.type === 'choice' && '🎯 Выбери правильный ответ'}
                {exercise.type === 'insert' && '✏️ Вставь пропущенное'}
                {exercise.type === 'write' && '💻 Напиши код'}
                {exercise.type === 'fix' && '🔧 Исправь ошибку'}
                {exercise.type === 'translate' && '📝 Переведи в код'}
                {exercise.type === 'card' && '📚 Запомни'}
              </span>
            </div>
            
            {/* Question */}
            <h2 className="text-xl font-bold mb-4">{exercise.question}</h2>
            
            {/* Code block if exists */}
            {exercise.code && (
              <pre className="code-input mb-4 overflow-x-auto">
                <code>{exercise.code}</code>
              </pre>
            )}
            
            {/* Answer section based on type */}
            {(exercise.type === 'choice' || exercise.type === 'insert') && exercise.options && (
              <div className={exercise.type === 'choice' ? 'space-y-3' : 'flex flex-wrap gap-2'}>
                {exercise.options.map((option: string, i: number) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      if (!showResult) {
                        setSelectedOption(option);
                        handleAnswer(option, e);
                      }
                    }}
                    disabled={showResult !== null}
                    className={`${exercise.type === 'choice' ? 'w-full p-4' : 'px-4 py-2'} rounded-xl border-2 text-left font-mono transition-all ${
                      showResult && option === exercise.correctAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : showResult && selectedOption === option && option !== exercise.correctAnswer
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : selectedOption === option
                        ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                        : 'border-gray-200 dark:border-gray-700 hover:border-[var(--primary)]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
            
            {(exercise.type === 'write' || exercise.type === 'fix' || exercise.type === 'translate') && (
              <div className="space-y-4">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Напиши код здесь..."
                  className="code-input w-full min-h-[120px]"
                  disabled={showResult !== null}
                />
                {!showResult && (
                  <button
                    onClick={(e) => handleAnswer(userAnswer, e)}
                    disabled={!userAnswer.trim()}
                    className="btn-primary w-full py-3 rounded-xl text-white font-bold disabled:opacity-50"
                  >
                    Проверить
                  </button>
                )}
              </div>
            )}
            
            {exercise.type === 'card' && (
              <div className="card p-6 text-center">
                <div className="text-4xl mb-4">📚</div>
                <p className="text-lg font-medium mb-4">{exercise.correctAnswer as string}</p>
                {!showResult && (
                  <button
                    onClick={(e) => { setShowResult('correct'); addXP(exercise.xp, e); }}
                    className="btn-primary px-8 py-3 rounded-xl text-white font-bold"
                  >
                    Понятно! 👍
                  </button>
                )}
              </div>
            )}
            
            {/* Result feedback */}
            {showResult && (
              <div className={`mt-4 p-4 rounded-xl animate-slide-up ${
                showResult === 'correct' 
                  ? 'bg-green-100 dark:bg-green-900/30' 
                  : 'bg-red-100 dark:bg-red-900/30'
              }`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">
                    {showResult === 'correct' ? '🎉' : '😢'}
                  </span>
                  <div>
                    <h3 className={`font-bold ${
                      showResult === 'correct' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {showResult === 'correct' ? 'Правильно!' : 'Неправильно'}
                    </h3>
                    {showResult === 'wrong' && (
                      <p className="text-sm">
                        Правильный ответ: <code className="font-mono bg-white/50 px-1 rounded">
                          {Array.isArray(exercise.correctAnswer) 
                            ? exercise.correctAnswer[0] 
                            : exercise.correctAnswer}
                        </code>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Bottom button */}
          {showResult && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => {
                  if (currentExercise < practiceExercises.length - 1) {
                    setCurrentExercise(prev => prev + 1);
                    setUserAnswer('');
                    setShowResult(null);
                    setSelectedOption(null);
                  } else {
                    // Practice complete
                    setPracticeMode(false);
                    setPracticeExercises([]);
                    setShowConfetti(true);
                    haptic('success');
                    setTimeout(() => {
                      setShowConfetti(false);
                      setCurrentView('practice');
                    }, 2500);
                  }
                }}
                className={`w-full py-4 rounded-xl text-white font-bold text-lg ${
                  showResult === 'correct' ? 'btn-primary' : 'btn-danger'
                }`}
              >
                {currentExercise < practiceExercises.length - 1 ? 'Продолжить' : 'Завершить практику'}
              </button>
            </div>
          )}
        </div>
      );
    }
    
    // Regular lesson mode
    if (!currentLesson) return null;
    
    const lesson = currentLesson.skill.lessons[currentLesson.lessonIndex];
    const exercise = lesson.exercises[currentExercise];
    const progress = ((currentExercise + 1) / lesson.exercises.length) * 100;
    
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 flex items-center gap-4">
          <button
            onClick={() => { setCurrentView('home'); setCurrentLesson(null); haptic('light'); }}
            className="text-2xl"
          >
            ✕
          </button>
          <div className="flex-1 progress-bar h-3">
            <div 
              className="progress-fill bg-[var(--primary)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center gap-1">
            {[...Array(user.maxHearts)].map((_, i) => (
              <span key={i} className={`text-lg ${i >= user.hearts ? 'opacity-30' : ''}`}>
                ❤️
              </span>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4 overflow-auto">
          {/* Exercise Type Badge */}
          <div className="mb-4">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              {exercise.type === 'choice' && '🎯 Выбери правильный ответ'}
              {exercise.type === 'insert' && '✏️ Вставь пропущенное'}
              {exercise.type === 'write' && '💻 Напиши код'}
              {exercise.type === 'fix' && '🔧 Исправь ошибку'}
              {exercise.type === 'translate' && '📝 Переведи в код'}
              {exercise.type === 'card' && '📚 Запомни'}
            </span>
          </div>
          
          {/* Question */}
          <h2 className="text-xl font-bold mb-4">{exercise.question}</h2>
          
          {/* Code block if exists */}
          {exercise.code && (
            <pre className="code-input mb-4 overflow-x-auto">
              <code>{exercise.code}</code>
            </pre>
          )}
          
          {/* Answer section based on type */}
          {exercise.type === 'choice' && exercise.options && (
            <div className="space-y-3">
              {exercise.options.map((option, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    if (!showResult) {
                      setSelectedOption(option);
                      handleAnswer(option, e);
                    }
                  }}
                  disabled={showResult !== null}
                  className={`w-full p-4 rounded-xl border-2 text-left font-mono transition-all ${
                    showResult && option === exercise.correctAnswer
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : showResult && selectedOption === option && option !== exercise.correctAnswer
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : selectedOption === option
                      ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-[var(--primary)]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          
          {exercise.type === 'insert' && exercise.options && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {exercise.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      if (!showResult) {
                        setSelectedOption(option);
                        handleAnswer(option, e);
                      }
                    }}
                    disabled={showResult !== null}
                    className={`px-4 py-2 rounded-xl border-2 font-mono transition-all ${
                      showResult && option === exercise.correctAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : showResult && selectedOption === option
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : selectedOption === option
                        ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {(exercise.type === 'write' || exercise.type === 'fix' || exercise.type === 'translate') && (
            <div className="space-y-4">
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Напиши код здесь..."
                className="code-input w-full min-h-[120px]"
                disabled={showResult !== null}
              />
              {!showResult && (
                <button
                  onClick={(e) => handleAnswer(userAnswer, e)}
                  disabled={!userAnswer.trim()}
                  className="btn-primary w-full py-3 rounded-xl text-white font-bold disabled:opacity-50"
                >
                  Проверить
                </button>
              )}
            </div>
          )}
          
          {exercise.type === 'card' && (
            <div className="card p-6 text-center">
              <div className="text-4xl mb-4">📚</div>
              <p className="text-lg font-medium mb-4">{exercise.correctAnswer as string}</p>
              {!showResult && (
                <button
                  onClick={(e) => { setShowResult('correct'); addXP(exercise.xp, e); }}
                  className="btn-primary px-8 py-3 rounded-xl text-white font-bold"
                >
                  Понятно! 👍
                </button>
              )}
            </div>
          )}
          
          {/* Result feedback */}
          {showResult && (
            <div className={`mt-4 p-4 rounded-xl animate-slide-up ${
              showResult === 'correct' 
                ? 'bg-green-100 dark:bg-green-900/30' 
                : 'bg-red-100 dark:bg-red-900/30'
            }`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {showResult === 'correct' ? '🎉' : '😢'}
                </span>
                <div>
                  <h3 className={`font-bold ${
                    showResult === 'correct' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {showResult === 'correct' ? 'Правильно!' : 'Неправильно'}
                  </h3>
                  {showResult === 'wrong' && (
                    <p className="text-sm">
                      Правильный ответ: <code className="font-mono bg-white/50 px-1 rounded">
                        {Array.isArray(exercise.correctAnswer) 
                          ? exercise.correctAnswer[0] 
                          : exercise.correctAnswer}
                      </code>
                    </p>
                  )}
                  {exercise.explanation && (
                    <p className="text-sm mt-1 text-[var(--tg-theme-hint-color)]">
                      {exercise.explanation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Bottom button */}
        {showResult && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={nextExercise}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg ${
                showResult === 'correct' ? 'btn-primary' : 'btn-danger'
              }`}
            >
              {currentExercise < lesson.exercises.length - 1 ? 'Продолжить' : 'Завершить урок'}
            </button>
          </div>
        )}
      </div>
    );
  };

  const startSmartPractice = () => {
    haptic('medium');
    
    // Collect exercises from completed skills for practice
    const exercises: any[] = [];
    skills.forEach(skill => {
      if (isSkillUnlocked(skill)) {
        skill.lessons.forEach(lesson => {
          lesson.exercises.forEach(ex => {
            exercises.push({ ...ex, skillId: skill.id });
          });
        });
      }
    });
    
    if (exercises.length === 0) {
      alert('Сначала пройди хотя бы один урок!');
      return;
    }
    
    // Shuffle and take 10 random exercises
    const shuffled = exercises.sort(() => Math.random() - 0.5).slice(0, 10);
    setPracticeExercises(shuffled);
    setPracticeMode(true);
    setCurrentExercise(0);
    setLessonMistakes(0);
    setUserAnswer('');
    setShowResult(null);
    setSelectedOption(null);
    setCurrentView('lesson');
  };

  const renderPractice = () => (
    <div className="p-4 safe-bottom">
      <h1 className="text-2xl font-bold mb-6 text-center">🎯 Практика</h1>
      
      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={startSmartPractice}
          className="card p-6 text-center hover:scale-[1.02] transition-transform bg-gradient-to-r from-blue-500/10 to-indigo-500/10"
        >
          <span className="text-5xl mb-3 block">🧠</span>
          <h2 className="text-xl font-bold mb-2">Умная практика</h2>
          <p className="text-[var(--tg-theme-hint-color)]">
            Упражнения на основе твоих слабых мест
          </p>
          <span className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
            10 случайных заданий
          </span>
        </button>
        
        <button
          onClick={() => { setCurrentView('wheel'); haptic('medium'); }}
          className="card p-6 text-center hover:scale-[1.02] transition-transform bg-gradient-to-r from-purple-500/10 to-pink-500/10"
        >
          <span className="text-5xl mb-3 block animate-spin-slow">🎡</span>
          <h2 className="text-xl font-bold mb-2">Колесо фортуны</h2>
          <p className="text-[var(--tg-theme-hint-color)]">
            Крути и выигрывай призы!
          </p>
          {(user.dailySpinsUsed === 0 || user.lastSpinDate !== new Date().toDateString()) && (
            <span className="inline-block mt-2 px-3 py-1 bg-green-500 text-white text-sm rounded-full">
              Бесплатный спин!
            </span>
          )}
        </button>
        
        <button
          onClick={() => { setCurrentView('duel'); haptic('medium'); }}
          className="card p-6 text-center hover:scale-[1.02] transition-transform bg-gradient-to-r from-red-500/10 to-orange-500/10"
        >
          <span className="text-5xl mb-3 block">⚔️</span>
          <h2 className="text-xl font-bold mb-2">Дуэль 1v1</h2>
          <p className="text-[var(--tg-theme-hint-color)]">
            Сразись с другими игроками
          </p>
          <div className="mt-2 text-sm">
            Рейтинг: <span className="font-bold text-yellow-600">{user.eloRating}</span> ELO
          </div>
        </button>
        
        <button
          onClick={() => { setCurrentView('sandbox'); haptic('medium'); }}
          className="card p-6 text-center hover:scale-[1.02] transition-transform bg-gradient-to-r from-green-500/10 to-teal-500/10"
        >
          <span className="text-5xl mb-3 block">🧪</span>
          <h2 className="text-xl font-bold mb-2">Песочница</h2>
          <p className="text-[var(--tg-theme-hint-color)]">
            Пиши и запускай свой код
          </p>
        </button>
      </div>
    </div>
  );

  const renderLeaderboard = () => {
    const leaderboardData = [
      { rank: 1, name: 'PyMaster', xp: 15420, streak: 147, avatar: '👨‍💻' },
      { rank: 2, name: 'CodeNinja', xp: 12350, streak: 89, avatar: '🥷' },
      { rank: 3, name: 'DevGuru', xp: 11200, streak: 63, avatar: '🧙' },
      { rank: 4, name: user.equippedAvatar, xp: user.level * 100 + user.xp, streak: user.streak, avatar: user.equippedAvatar, isUser: true },
      { rank: 5, name: 'AlgoWizard', xp: 9800, streak: 45, avatar: '🧙‍♂️' },
      { rank: 6, name: 'BugHunter', xp: 8500, streak: 32, avatar: '🐛' },
      { rank: 7, name: 'LoopMaster', xp: 7200, streak: 28, avatar: '🔄' },
      { rank: 8, name: 'FuncFan', xp: 6100, streak: 21, avatar: '⚡' },
      { rank: 9, name: 'ClassCreator', xp: 5400, streak: 17, avatar: '🏗️' },
      { rank: 10, name: 'DataDragon', xp: 4800, streak: 14, avatar: '🐉' },
    ].sort((a, b) => b.xp - a.xp).map((item, index) => ({ ...item, rank: index + 1 }));

    return (
      <div className="p-4 safe-bottom">
        <h1 className="text-2xl font-bold mb-6 text-center">🏆 Лидерборд недели</h1>
        
        <div className="flex gap-2 mb-6">
          <button className="flex-1 py-2 rounded-xl bg-[var(--primary)] text-white font-bold">
            Глобальный
          </button>
          <button className="flex-1 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 font-medium">
            Друзья
          </button>
          <button className="flex-1 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 font-medium">
            Клан
          </button>
        </div>
        
        <div className="space-y-2">
          {leaderboardData.map((player) => (
            <div
              key={player.rank}
              className={`leaderboard-item ${
                player.isUser ? 'bg-[var(--primary)]/10 border-2 border-[var(--primary)]' : 'card'
              }`}
            >
              <div className={`rank w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                player.rank <= 3 ? 'text-white' : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                {player.rank}
              </div>
              <span className="text-2xl">{player.avatar}</span>
              <div className="flex-1">
                <div className="font-semibold">
                  {player.isUser ? 'Ты' : player.name}
                </div>
                <div className="text-sm text-[var(--tg-theme-hint-color)]">
                  🔥 {player.streak} дней
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[var(--xp-blue)]">{player.xp}</div>
                <div className="text-xs text-[var(--tg-theme-hint-color)]">XP</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 card p-4 text-center">
          <p className="text-sm text-[var(--tg-theme-hint-color)]">
            Топ-3 получат эксклюзивные награды!
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <span>🥇 500 💎</span>
            <span>🥈 300 💎</span>
            <span>🥉 100 💎</span>
          </div>
        </div>
      </div>
    );
  };

  const renderShop = () => (
    <div className="p-4 safe-bottom">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">🛒 Магазин</h1>
        <div className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
          <span>💎</span>
          <span className="font-bold text-purple-600 dark:text-purple-400">{user.gems}</span>
        </div>
      </div>
      
      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {['Все', 'Бусты', 'Аватары', 'Питомцы', 'Темы'].map(cat => (
          <button
            key={cat}
            className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 whitespace-nowrap font-medium"
          >
            {cat}
          </button>
        ))}
      </div>
      
      {/* Premium Banner */}
      <button
        onClick={() => haptic('medium')}
        className="w-full card p-4 mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl">👑</span>
          <div className="text-left flex-1">
            <h3 className="font-bold text-lg">CodeStreak Premium</h3>
            <p className="text-sm opacity-90">∞ жизней • 2x XP • Без рекламы</p>
          </div>
          <div className="text-right">
            <div className="font-bold">149 ₽/мес</div>
          </div>
        </div>
      </button>
      
      {/* Items Grid */}
      <div className="grid grid-cols-2 gap-3">
        {shopItems.map(item => {
          const owned = user.ownedItems.includes(item.id);
          const canAfford = user.gems >= item.price;
          
          return (
            <button
              key={item.id}
              onClick={() => !owned && buyItem(item.id)}
              disabled={owned || !canAfford}
              className={`card p-4 text-center transition-all ${
                owned ? 'opacity-50' : canAfford ? 'hover:scale-105' : 'opacity-50'
              }`}
            >
              <span className="text-4xl block mb-2">{item.icon}</span>
              <h3 className="font-semibold text-sm">{item.title}</h3>
              <p className="text-xs text-[var(--tg-theme-hint-color)] mb-2">
                {item.description}
              </p>
              {owned ? (
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 px-2 py-1 rounded">
                  Куплено ✓
                </span>
              ) : (
                <span className="text-sm font-bold text-purple-600">
                  {item.price} 💎
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="p-4 safe-bottom">
      {/* Avatar & Level */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-5xl mb-3 mx-auto">
            {user.equippedAvatar}
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white px-3 py-1 rounded-full text-sm font-bold">
            Ур. {user.level}
          </div>
        </div>
        
        <h1 className="text-xl font-bold mt-4">
          {window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Кодер'}
        </h1>
        
        <div className="flex items-center justify-center gap-4 mt-2 text-[var(--tg-theme-hint-color)]">
          <span>🔥 {user.streak} дней</span>
          <span>⭐ {user.xp} XP</span>
        </div>
      </div>
      
      {/* XP Progress */}
      <div className="card p-4 mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Прогресс уровня</span>
          <span className="text-[var(--primary)]">{user.xp}/{user.xpToNextLevel} XP</span>
        </div>
        <div className="progress-bar h-3">
          <div 
            className="progress-fill bg-[var(--primary)]"
            style={{ width: `${(user.xp / user.xpToNextLevel) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="card p-3 text-center">
          <div className="text-2xl font-bold text-[var(--primary)]">{user.totalLessonsCompleted}</div>
          <div className="text-xs text-[var(--tg-theme-hint-color)]">Уроков</div>
        </div>
        <div className="card p-3 text-center">
          <div className="text-2xl font-bold text-yellow-500">{user.perfectLessons}</div>
          <div className="text-xs text-[var(--tg-theme-hint-color)]">Идеальных</div>
        </div>
        <div className="card p-3 text-center">
          <div className="text-2xl font-bold text-purple-500">{user.completedSkills.length}</div>
          <div className="text-xs text-[var(--tg-theme-hint-color)]">Навыков</div>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="space-y-2">
        <button
          onClick={() => { setCurrentView('achievements'); haptic('light'); }}
          className="card w-full p-4 flex items-center gap-4"
        >
          <span className="text-2xl">🏅</span>
          <div className="flex-1 text-left">
            <div className="font-semibold">Достижения</div>
            <div className="text-sm text-[var(--tg-theme-hint-color)]">
              {user.unlockedAchievements.length}/{achievements.length}
            </div>
          </div>
          <span className="text-gray-400">→</span>
        </button>
        
        <button
          onClick={() => { setCurrentView('friends'); haptic('light'); }}
          className="card w-full p-4 flex items-center gap-4"
        >
          <span className="text-2xl">👥</span>
          <div className="flex-1 text-left">
            <div className="font-semibold">Друзья</div>
            <div className="text-sm text-[var(--tg-theme-hint-color)]">
              {user.friends.length} друзей
            </div>
          </div>
          <span className="text-gray-400">→</span>
        </button>
        
        <button
          onClick={() => { setCurrentView('clan'); haptic('light'); }}
          className="card w-full p-4 flex items-center gap-4"
        >
          <span className="text-2xl">🏰</span>
          <div className="flex-1 text-left">
            <div className="font-semibold">Клан</div>
            <div className="text-sm text-[var(--tg-theme-hint-color)]">
              {user.clanId ? 'Участник клана' : 'Не состоишь в клане'}
            </div>
          </div>
          <span className="text-gray-400">→</span>
        </button>
        
        <button
          onClick={() => { setCurrentView('battlepass'); haptic('light'); }}
          className="card w-full p-4 flex items-center gap-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
        >
          <span className="text-2xl">🎖️</span>
          <div className="flex-1 text-left">
            <div className="font-semibold">Battle Pass</div>
            <div className="text-sm text-[var(--tg-theme-hint-color)]">
              Уровень {user.battlePassLevel}
            </div>
          </div>
          <span className="text-gray-400">→</span>
        </button>
        
        <button
          onClick={() => { setCurrentView('settings'); haptic('light'); }}
          className="card w-full p-4 flex items-center gap-4"
        >
          <span className="text-2xl">⚙️</span>
          <div className="flex-1 text-left">
            <div className="font-semibold">Настройки</div>
          </div>
          <span className="text-gray-400">→</span>
        </button>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="p-4 safe-bottom">
      <button
        onClick={() => { setCurrentView('profile'); haptic('light'); }}
        className="flex items-center gap-2 mb-4 text-[var(--tg-theme-link-color)]"
      >
        ← Назад
      </button>
      
      <h1 className="text-2xl font-bold mb-6 text-center">🏅 Достижения</h1>
      
      <div className="text-center mb-6">
        <span className="text-4xl font-bold text-[var(--primary)]">
          {user.unlockedAchievements.length}
        </span>
        <span className="text-xl text-[var(--tg-theme-hint-color)]">
          /{achievements.length}
        </span>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {achievements.map(achievement => {
          const unlocked = user.unlockedAchievements.includes(achievement.id);
          
          return (
            <div
              key={achievement.id}
              className={`card p-4 flex items-center gap-4 ${
                !unlocked ? 'opacity-50 grayscale' : ''
              }`}
            >
              <span className="text-4xl">{achievement.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{achievement.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded rarity-${achievement.rarity}`}>
                    {achievement.rarity}
                  </span>
                </div>
                <p className="text-sm text-[var(--tg-theme-hint-color)]">
                  {achievement.description}
                </p>
              </div>
              {unlocked && (
                <span className="text-green-500 text-2xl">✓</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const handleWheelSpin = () => {
    if (wheelSpinning) return;
    
    const now = Date.now();
    const hoursSinceLastSpin = (now - user.lastWheelSpin) / (1000 * 60 * 60);
    
    // Проверка 24 часов
    if (hoursSinceLastSpin < 24 && !user.isPremium && user.lastWheelSpin > 0) {
      haptic('error');
      return;
    }
    
    setWheelSpinning(true);
    setWheelPrize(null);
    haptic('medium');
    
    const newRotation = wheelRotation + 1440 + Math.random() * 360;
    setWheelRotation(newRotation);
    
    setTimeout(() => {
      const result = spinWheel();
      setWheelPrize(result || null);
      setWheelSpinning(false);
      haptic('success');
    }, 4000);
  };

  const renderWheel = () => {
    const now = Date.now();
    const hoursSinceLastSpin = (now - user.lastWheelSpin) / (1000 * 60 * 60);
    const canSpin = hoursSinceLastSpin >= 24 || user.isPremium || user.lastWheelSpin === 0;
    
    // Рассчитываем время до следующего спина
    const getTimeUntilNextSpin = () => {
      if (canSpin) return null;
      const msUntilNext = (24 * 60 * 60 * 1000) - (now - user.lastWheelSpin);
      const hours = Math.floor(msUntilNext / (1000 * 60 * 60));
      const minutes = Math.floor((msUntilNext % (1000 * 60 * 60)) / (1000 * 60));
      return { hours, minutes };
    };
    
    const timeLeft = getTimeUntilNextSpin();
    
    return (
      <div className="p-4 safe-bottom">
        <button
          onClick={() => { setCurrentView('practice'); haptic('light'); }}
          className="flex items-center gap-2 mb-4 text-[var(--tg-theme-link-color)]"
        >
          ← Назад
        </button>
        
        <h1 className="text-2xl font-bold mb-6 text-center">🎡 Колесо фортуны</h1>
        
        <div className="flex flex-col items-center">
          {/* Wheel pointer */}
          <div className="text-4xl mb-[-20px] z-10">▼</div>
          
          {/* Wheel */}
          <div
            className="fortune-wheel"
            style={{ transform: `rotate(${wheelRotation}deg)` }}
          />
          
          {/* Timer display */}
          {!canSpin && timeLeft && (
            <div className="mt-4 card p-4 text-center bg-orange-100 dark:bg-orange-900/30">
              <div className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                ⏰ Следующий бесплатный спин через:
              </div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-1">
                {timeLeft.hours}ч {timeLeft.minutes}мин
              </div>
            </div>
          )}
          
          {/* Spin button */}
          <button
            onClick={handleWheelSpin}
            disabled={wheelSpinning || !canSpin}
            className={`mt-6 px-12 py-4 rounded-xl font-bold text-lg transition-all ${
              canSpin && !wheelSpinning
                ? 'btn-primary text-white animate-pulse'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {wheelSpinning ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">🎰</span> Крутится...
              </span>
            ) : canSpin ? (
              '🎁 Крутить бесплатно!'
            ) : (
              `⏰ Доступно через ${timeLeft?.hours}ч ${timeLeft?.minutes}мин`
            )}
          </button>
          
          {/* Prize display */}
          {wheelPrize && !wheelSpinning && (
            <div className="mt-6 card p-6 text-center animate-bounce-in bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30">
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="text-xl font-bold mb-2">Поздравляем!</h2>
              <p className="text-2xl font-bold text-[var(--primary)]">{wheelPrize.label}</p>
            </div>
          )}
        </div>
        
        <div className="mt-8 card p-4">
          <h3 className="font-semibold mb-2">🎁 Возможные призы:</h3>
          <div className="grid grid-cols-4 gap-2 text-center text-sm">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">+10 XP</div>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">+25 XP</div>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">+50 XP</div>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">+10 💎</div>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">+25 💎</div>
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">+100 💎</div>
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">+1 ❤️</div>
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">2x XP</div>
          </div>
        </div>
        
        {/* Premium hint */}
        {!user.isPremium && (
          <div className="mt-4 card p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-center">
            <p className="text-sm">
              👑 <span className="font-bold">Premium</span> — крути без ограничений!
            </p>
          </div>
        )}
      </div>
    );
  };

  const runSandboxCode = async () => {
    setSandboxRunning(true);
    setSandboxOutput('Запуск...');
    haptic('medium');
    
    try {
      // Enhanced Python code execution simulation
      const lines = sandboxCode.split('\n');
      let result = '';
      const variables: Record<string, any> = {};
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip comments and empty lines
        if (line.startsWith('#') || !line) continue;
        
        // Handle variable assignment
        const assignMatch = line.match(/^(\w+)\s*=\s*(.+)$/);
        if (assignMatch) {
          const [, varName, value] = assignMatch;
          try {
            // Try to evaluate as number or string
            if (value.startsWith('"') || value.startsWith("'")) {
              variables[varName] = value.slice(1, -1);
            } else if (!isNaN(Number(value))) {
              variables[varName] = Number(value);
            } else if (value.startsWith('[')) {
              variables[varName] = JSON.parse(value);
            } else {
              variables[varName] = value;
            }
          } catch {
            variables[varName] = value;
          }
          continue;
        }
        
        // Handle print statements
        if (line.startsWith('print(')) {
          const printMatch = line.match(/print\((.+)\)$/);
          if (printMatch) {
            let content = printMatch[1].trim();
            
            // Handle f-strings
            if (content.startsWith('f"') || content.startsWith("f'")) {
              const fstringContent = content.slice(2, -1);
              let output = fstringContent.replace(/\{([^}]+)\}/g, (_, expr) => {
                if (variables[expr] !== undefined) return String(variables[expr]);
                return `{${expr}}`;
              });
              result += output + '\n';
            }
            // Handle regular strings
            else if ((content.startsWith('"') && content.endsWith('"')) ||
                (content.startsWith("'") && content.endsWith("'"))) {
              result += content.slice(1, -1) + '\n';
            }
            // Handle variables
            else if (variables[content] !== undefined) {
              result += String(variables[content]) + '\n';
            }
            // Handle expressions
            else {
              result += content + '\n';
            }
          }
        }
        
        // Handle for loops (simple range)
        if (line.startsWith('for ')) {
          const forMatch = line.match(/for\s+(\w+)\s+in\s+range\((\d+)(?:,\s*(\d+))?\)/);
          if (forMatch) {
            const [, varName, start, end] = forMatch;
            const rangeStart = end ? parseInt(start) : 0;
            const rangeEnd = end ? parseInt(end) : parseInt(start);
            
            // Find the loop body (next indented lines)
            const loopBody: string[] = [];
            let j = i + 1;
            while (j < lines.length && (lines[j].startsWith('    ') || lines[j].startsWith('\t'))) {
              loopBody.push(lines[j].trim());
              j++;
            }
            
            // Execute loop
            for (let k = rangeStart; k < rangeEnd; k++) {
              variables[varName] = k;
              for (const bodyLine of loopBody) {
                if (bodyLine.startsWith('print(')) {
                  const printMatch = bodyLine.match(/print\((.+)\)$/);
                  if (printMatch) {
                    let content = printMatch[1].trim();
                    if (content.startsWith('f"') || content.startsWith("f'")) {
                      const fstringContent = content.slice(2, -1);
                      let output = fstringContent.replace(/\{([^}]+)\}/g, (_, expr) => {
                        if (variables[expr] !== undefined) return String(variables[expr]);
                        return `{${expr}}`;
                      });
                      result += output + '\n';
                    } else if ((content.startsWith('"') && content.endsWith('"')) ||
                        (content.startsWith("'") && content.endsWith("'"))) {
                      result += content.slice(1, -1) + '\n';
                    } else if (variables[content] !== undefined) {
                      result += String(variables[content]) + '\n';
                    }
                  }
                }
              }
            }
            i = j - 1; // Skip processed loop body
          }
        }
      }
      
      setSandboxOutput(result || 'Программа выполнена (нет вывода)');
      haptic('success');
      updateUser({ codeWritten: user.codeWritten + 1 });
    } catch (error) {
      setSandboxOutput(`Ошибка: ${error}`);
      haptic('error');
    }
    
    setSandboxRunning(false);
  };

  const renderSandbox = () => {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => { setCurrentView('practice'); haptic('light'); }}
            className="text-[var(--tg-theme-link-color)]"
          >
            ← Назад
          </button>
          <h1 className="font-bold">🧪 Песочница</h1>
          <button
            onClick={runSandboxCode}
            disabled={sandboxRunning}
            className="btn-primary px-4 py-2 rounded-lg text-white font-bold text-sm disabled:opacity-50"
          >
            {sandboxRunning ? '...' : '▶ Run'}
          </button>
        </div>
        
        <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
          <div className="flex-1 flex flex-col">
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              📝 Код Python
              <span className="text-xs text-[var(--tg-theme-hint-color)]">
                (поддерживается print, переменные, for loops)
              </span>
            </label>
            <textarea
              value={sandboxCode}
              onChange={(e) => setSandboxCode(e.target.value)}
              className="code-input flex-1 resize-none font-mono text-sm"
              placeholder="# Пиши Python код..."
              spellCheck={false}
            />
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span>📟 Консоль</span>
              {sandboxRunning && <span className="animate-pulse text-green-500">●</span>}
            </h3>
            <div className="console-output min-h-[120px] max-h-[200px] overflow-auto">
              {sandboxOutput || '# Вывод появится здесь после запуска'}
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSandboxCode('# Пример: Hello World\nprint("Hello, CodeStreak!")');
                haptic('light');
              }}
              className="flex-1 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium"
            >
              📄 Пример 1
            </button>
            <button
              onClick={() => {
                setSandboxCode('# Пример: Цикл\nfor i in range(5):\n    print(f"Число: {i}")');
                haptic('light');
              }}
              className="flex-1 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium"
            >
              🔄 Пример 2
            </button>
            <button
              onClick={() => {
                setSandboxCode('# Пример: Переменные\nname = "Python"\nversion = 3\nprint(f"Язык: {name}")\nprint(f"Версия: {version}")');
                haptic('light');
              }}
              className="flex-1 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium"
            >
              📦 Пример 3
            </button>
          </div>
        </div>
      </div>
    );
  };

  const clanIcons = ['🐍', '⚔️', '🐛', '🔄', '⚡', '🚀', '💎', '🔥', '🎯', '🏆', '👑', '🦊'];
  
  const clansData: ClanData[] = [
    { id: '1', name: 'Python Masters', members: 48, totalXP: 125400, rank: 1, icon: '🐍' },
    { id: '2', name: 'Code Warriors', members: 35, totalXP: 98200, rank: 2, icon: '⚔️' },
    { id: '3', name: 'Bug Hunters', members: 42, totalXP: 87600, rank: 3, icon: '🐛' },
    { id: '4', name: 'Loop Lords', members: 29, totalXP: 65400, rank: 4, icon: '🔄' },
    { id: '5', name: 'Function Fans', members: 31, totalXP: 54200, rank: 5, icon: '⚡' },
  ];

  const createClan = async () => {
    if (user.gems < 100) {
      haptic('error');
      alert('Недостаточно гемов! Нужно 100 💎');
      return;
    }
    if (!newClanName.trim()) {
      haptic('error');
      alert('Введите название клана!');
      return;
    }
    if (newClanName.length < 3 || newClanName.length > 20) {
      haptic('error');
      alert('Название должно быть от 3 до 20 символов!');
      return;
    }

    // Создаём клан на сервере
    const clanId = await api.createClan(newClanName.trim(), selectedClanIcon);
    
    if (clanId) {
      updateUser({
        gems: user.gems - 100,
        clanId: clanId,
        clanName: newClanName.trim(),
        clanIcon: selectedClanIcon
      });
      setShowClanCreateModal(false);
      setNewClanName('');
      haptic('success');
    } else {
      haptic('error');
      alert('Ошибка создания клана. Попробуйте позже.');
    }
  };

  const joinClan = async (clan: ClanData) => {
    const success = await api.joinClan(clan.id);
    
    if (success) {
      updateUser({
        clanId: clan.id,
        clanName: clan.name,
        clanIcon: clan.icon
      });
      haptic('success');
    } else {
      haptic('error');
      alert('Ошибка вступления в клан. Попробуйте позже.');
    }
  };

  const leaveClan = async () => {
    if (confirm('Вы уверены, что хотите покинуть клан?')) {
      if (user.clanId) {
        await api.leaveClan(user.clanId);
      }
      
      updateUser({
        clanId: null,
        clanName: null,
        clanIcon: null
      });
      haptic('medium');
    }
  };

  const sendClanMessage = async () => {
    if (!newChatMessage.trim() || !user.clanId) return;
    
    const userName = window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Ты';
    const newMsg = {
      id: Date.now().toString(),
      user: userName,
      avatar: user.equippedAvatar,
      text: newChatMessage.trim(),
      time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
    };
    
    // Добавляем локально сразу
    setClanChatMessages(prev => [...prev, newMsg]);
    setNewChatMessage('');
    haptic('light');
    
    // Отправляем на сервер
    await api.sendClanMessage(user.clanId, newChatMessage.trim());
  };

  const inviteToClan = () => {
    haptic('medium');
    const inviteLink = `https://t.me/Programgo_bot?start=clan_${user.clanId}`;
    const shareText = `🏰 Присоединяйся к клану "${user.clanName}" в CodeStreak! Вместе покорим топ!`;
    
    if (window.Telegram?.WebApp) {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`, '_blank');
    } else {
      navigator.clipboard.writeText(inviteLink).then(() => {
        alert('Ссылка скопирована!');
      });
    }
  };

  const renderClan = () => {
    const clanMembers = [
      { id: '1', name: 'PyMaster', avatar: '👨‍💻', xp: 5420, streak: 47, role: 'leader' },
      { id: '2', name: 'CodeNinja', avatar: '🥷', xp: 3250, streak: 29, role: 'member' },
      { id: '3', name: 'DevGuru', avatar: '🧙', xp: 2800, streak: 23, role: 'member' },
      { id: 'user', name: window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Ты', avatar: user.equippedAvatar, xp: user.xp + user.level * 100, streak: user.streak, role: 'member' },
    ];

    return (
      <div className="p-4 safe-bottom">
        <button
          onClick={() => { setCurrentView('profile'); haptic('light'); }}
          className="flex items-center gap-2 mb-4 text-[var(--tg-theme-link-color)]"
        >
          ← Назад
        </button>
        
        <h1 className="text-2xl font-bold mb-6 text-center">🏰 Кланы</h1>
        
        {!user.clanId ? (
          <>
            <div className="card p-6 text-center mb-6">
              <span className="text-5xl mb-3 block animate-bounce-in">🏰</span>
              <h2 className="text-xl font-bold mb-2">Присоединяйся к клану!</h2>
              <p className="text-[var(--tg-theme-hint-color)] mb-4">
                Соревнуйся с другими кланами и получай эксклюзивные награды
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => { 
                    if (user.gems < 100) {
                      haptic('error');
                      alert('Недостаточно гемов! Нужно 100 💎');
                    } else {
                      setShowClanCreateModal(true); 
                      haptic('medium'); 
                    }
                  }}
                  className="flex-1 btn-primary py-3 rounded-xl text-white font-bold"
                >
                  Создать (100 💎)
                </button>
                <button
                  onClick={() => { setShowJoinClanModal(true); haptic('medium'); }}
                  className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 font-bold"
                >
                  Вступить
                </button>
              </div>
              <p className="text-sm text-[var(--tg-theme-hint-color)] mt-2">
                У вас: {user.gems} 💎
              </p>
            </div>

            {/* Create Clan Modal */}
            {showClanCreateModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
                <div className="card p-6 w-full max-w-sm animate-bounce-in">
                  <h2 className="text-xl font-bold mb-4 text-center">🏰 Создать клан</h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Название клана</label>
                    <input
                      type="text"
                      value={newClanName}
                      onChange={(e) => setNewClanName(e.target.value)}
                      placeholder="Введите название..."
                      maxLength={20}
                      className="w-full p-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-transparent focus:border-[var(--primary)] transition-colors"
                    />
                    <p className="text-xs text-[var(--tg-theme-hint-color)] mt-1">
                      {newClanName.length}/20 символов
                    </p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Иконка клана</label>
                    <div className="grid grid-cols-6 gap-2">
                      {clanIcons.map(icon => (
                        <button
                          key={icon}
                          onClick={() => { setSelectedClanIcon(icon); haptic('selection'); }}
                          className={`p-2 text-2xl rounded-lg transition-all ${
                            selectedClanIcon === icon 
                              ? 'bg-[var(--primary)] scale-110' 
                              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => { setShowClanCreateModal(false); setNewClanName(''); haptic('light'); }}
                      className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 font-bold"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={createClan}
                      disabled={!newClanName.trim() || newClanName.length < 3}
                      className="flex-1 py-3 rounded-xl btn-primary text-white font-bold disabled:opacity-50"
                    >
                      Создать
                    </button>
                  </div>

                  <p className="text-center text-sm text-[var(--tg-theme-hint-color)] mt-3">
                    Стоимость: 100 💎
                  </p>
                </div>
              </div>
            )}

            {/* Join Clan Modal */}
            {showJoinClanModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
                <div className="card p-6 w-full max-w-sm animate-bounce-in max-h-[80vh] overflow-auto">
                  <h2 className="text-xl font-bold mb-4 text-center">🏰 Выбери клан</h2>
                  
                  <div className="space-y-3 mb-4">
                    {clansData.map(clan => (
                      <button
                        key={clan.id}
                        onClick={() => {
                          joinClan(clan);
                          setShowJoinClanModal(false);
                        }}
                        className="card w-full p-4 flex items-center gap-3 hover:scale-[1.02] transition-transform border-2 border-transparent hover:border-[var(--primary)]"
                      >
                        <span className="text-3xl">{clan.icon}</span>
                        <div className="flex-1 text-left">
                          <div className="font-semibold">{clan.name}</div>
                          <div className="text-sm text-[var(--tg-theme-hint-color)]">
                            {clan.members} участников • {clan.totalXP.toLocaleString()} XP
                          </div>
                        </div>
                        <span className="text-[var(--primary)] font-bold">→</span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => { setShowJoinClanModal(false); haptic('light'); }}
                    className="w-full py-3 rounded-xl bg-gray-200 dark:bg-gray-700 font-bold"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            )}
            
            <h3 className="font-bold mb-3">🏆 Топ кланов недели</h3>
            <div className="space-y-3">
              {clansData.map(clan => (
                <button
                  key={clan.id}
                  onClick={() => {
                    setShowJoinClanModal(true);
                    haptic('light');
                  }}
                  className="card w-full p-4 flex items-center gap-3 hover:scale-[1.02] transition-transform"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    clan.rank === 1 ? 'bg-yellow-400 text-white' :
                    clan.rank === 2 ? 'bg-gray-300 text-gray-700' :
                    clan.rank === 3 ? 'bg-orange-400 text-white' :
                    'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    {clan.rank}
                  </div>
                  <span className="text-2xl">{clan.icon}</span>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{clan.name}</div>
                    <div className="text-sm text-[var(--tg-theme-hint-color)]">
                      {clan.members} участников
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[var(--xp-blue)]">{clan.totalXP.toLocaleString()}</div>
                    <div className="text-xs text-[var(--tg-theme-hint-color)]">XP</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 card p-4 text-center bg-gradient-to-r from-yellow-400/10 to-orange-500/10">
              <p className="font-medium">🏆 Топ-3 клана получают награды!</p>
              <div className="flex justify-center gap-4 mt-2 text-sm">
                <span>🥇 500 💎</span>
                <span>🥈 300 💎</span>
                <span>🥉 150 💎</span>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Clan Header */}
            <div className="card p-6 text-center mb-4">
              <span className="text-6xl mb-3 block animate-bounce-in">{user.clanIcon}</span>
              <h2 className="text-2xl font-bold">{user.clanName}</h2>
              <p className="text-[var(--tg-theme-hint-color)]">4 участника</p>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
                  <div className="text-xl font-bold text-[var(--xp-blue)]">{(user.xp + user.level * 100 + 11470).toLocaleString()}</div>
                  <div className="text-xs text-[var(--tg-theme-hint-color)]">Общий XP</div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-xl">
                  <div className="text-xl font-bold text-yellow-600">#4</div>
                  <div className="text-xs text-[var(--tg-theme-hint-color)]">Место в рейтинге</div>
                </div>
              </div>
            </div>

            {/* Invite Button */}
            <button
              onClick={inviteToClan}
              className="w-full card p-4 mb-4 flex items-center gap-3 border-2 border-dashed border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-colors"
            >
              <span className="text-2xl">➕</span>
              <div className="flex-1 text-left">
                <div className="font-semibold">Пригласить друзей</div>
                <div className="text-sm text-[var(--tg-theme-hint-color)]">Поделись ссылкой на клан</div>
              </div>
              <span className="text-xl">📤</span>
            </button>

            {/* Clan Members */}
            <div className="card p-4 mb-4">
              <h3 className="font-bold mb-3">👥 Участники клана</h3>
              <div className="space-y-3">
                {clanMembers.map(member => (
                  <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl">
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{member.name}</span>
                        {member.role === 'leader' && (
                          <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 px-2 py-0.5 rounded">👑 Лидер</span>
                        )}
                        {member.id === 'user' && (
                          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-2 py-0.5 rounded">Это ты</span>
                        )}
                      </div>
                      <div className="text-sm text-[var(--tg-theme-hint-color)]">
                        🔥 {member.streak} дней • {member.xp.toLocaleString()} XP
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clan Chat */}
            <div className="card p-4 mb-4">
              <h3 className="font-bold mb-3">💬 Чат клана</h3>
              
              {/* Messages */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 min-h-[150px] max-h-[250px] overflow-auto mb-3 space-y-3">
                {clanChatMessages.map(msg => (
                  <div key={msg.id} className={`flex gap-2 ${msg.user === (window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Ты') ? 'flex-row-reverse' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-sm flex-shrink-0">
                      {msg.avatar}
                    </div>
                    <div className={`max-w-[70%] ${msg.user === (window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Ты') ? 'text-right' : ''}`}>
                      <div className="text-xs text-[var(--tg-theme-hint-color)] mb-1">
                        {msg.user} • {msg.time}
                      </div>
                      <div className={`inline-block p-2 rounded-xl text-sm ${
                        msg.user === (window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Ты') 
                          ? 'bg-[var(--primary)] text-white' 
                          : 'bg-white dark:bg-gray-700'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newChatMessage}
                  onChange={(e) => setNewChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendClanMessage()}
                  placeholder="Написать сообщение..."
                  className="flex-1 p-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-transparent focus:border-[var(--primary)] transition-colors"
                />
                <button
                  onClick={sendClanMessage}
                  disabled={!newChatMessage.trim()}
                  className="btn-primary px-4 rounded-xl text-white font-bold disabled:opacity-50"
                >
                  📤
                </button>
              </div>
            </div>

            {/* Leave clan button */}
            <button
              onClick={leaveClan}
              className="card w-full p-4 text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              🚪 Покинуть клан
            </button>
          </>
        )}
      </div>
    );
  };

  const duelQuestions = [
    { question: 'Что выведет: print(2 ** 3)?', options: ['6', '8', '5', '9'], correct: '8' },
    { question: 'Как создать пустой список?', options: ['[]', '{}', '()', 'list'], correct: '[]' },
    { question: 'Что такое len("hello")?', options: ['4', '5', '6', 'error'], correct: '5' },
    { question: 'Как получить последний элемент списка a?', options: ['a[-1]', 'a[0]', 'a[last]', 'a.last()'], correct: 'a[-1]' },
    { question: 'Что делает метод .append()?', options: ['Удаляет элемент', 'Добавляет в конец', 'Сортирует', 'Копирует'], correct: 'Добавляет в конец' },
  ];

  const startDuelSearch = () => {
    if (duelSearching) return;
    
    setDuelSearching(true);
    haptic('medium');
    
    // Simulate finding opponent
    setTimeout(() => {
      const opponents = [
        { name: 'PyNinja', avatar: '🥷', elo: user.eloRating + Math.floor(Math.random() * 100) - 50 },
        { name: 'CodeMaster', avatar: '🧙', elo: user.eloRating + Math.floor(Math.random() * 100) - 50 },
        { name: 'BugSlayer', avatar: '🗡️', elo: user.eloRating + Math.floor(Math.random() * 100) - 50 },
      ];
      const opponent = opponents[Math.floor(Math.random() * opponents.length)];
      setDuelOpponent(opponent);
      setDuelSearching(false);
      setDuelActive(true);
      setDuelQuestion(0);
      setDuelScore({ player: 0, opponent: 0 });
      setDuelTimeLeft(30);
      haptic('success');
    }, 2000);
  };

  const answerDuelQuestion = (answer: string) => {
    const currentQ = duelQuestions[duelQuestion];
    const isCorrect = answer === currentQ.correct;
    
    // Simulate opponent answer
    const opponentCorrect = Math.random() > 0.4;
    
    setDuelScore(prev => ({
      player: prev.player + (isCorrect ? 1 : 0),
      opponent: prev.opponent + (opponentCorrect ? 1 : 0)
    }));
    
    haptic(isCorrect ? 'success' : 'error');
    
    if (duelQuestion < duelQuestions.length - 1) {
      setDuelQuestion(prev => prev + 1);
      setDuelTimeLeft(30);
    } else {
      // Duel finished
      setTimeout(() => {
        const playerWon = duelScore.player + (isCorrect ? 1 : 0) > duelScore.opponent + (opponentCorrect ? 1 : 0);
        if (playerWon) {
          updateUser({
            duelsWon: user.duelsWon + 1,
            eloRating: user.eloRating + 25,
            gems: user.gems + 20,
            xp: user.xp + 50
          });
          haptic('success');
          alert('🎉 Победа! +25 ELO, +20 💎, +50 XP');
        } else {
          updateUser({
            duelsLost: user.duelsLost + 1,
            eloRating: Math.max(0, user.eloRating - 20)
          });
          haptic('error');
          alert('😢 Поражение! -20 ELO');
        }
        setDuelActive(false);
        setDuelOpponent(null);
      }, 500);
    }
  };

  const renderDuel = () => {
    // Active duel screen
    if (duelActive && duelOpponent) {
      const currentQ = duelQuestions[duelQuestion];
      
      return (
        <div className="p-4 safe-bottom">
          {/* Duel header */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl mx-auto">
                {user.equippedAvatar}
              </div>
              <div className="font-bold text-2xl text-green-500">{duelScore.player}</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold">{duelQuestion + 1}/5</div>
              <div className="text-sm text-[var(--tg-theme-hint-color)]">⏱️ {duelTimeLeft}с</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-2xl mx-auto">
                {duelOpponent.avatar}
              </div>
              <div className="font-bold text-2xl text-red-500">{duelScore.opponent}</div>
            </div>
          </div>
          
          {/* Question */}
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-bold text-center">{currentQ.question}</h2>
          </div>
          
          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, i) => (
              <button
                key={i}
                onClick={() => answerDuelQuestion(option)}
                className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 font-medium hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    }
    
    // Duel lobby
    return (
      <div className="p-4 safe-bottom">
        <button
          onClick={() => { setCurrentView('practice'); haptic('light'); }}
          className="flex items-center gap-2 mb-4 text-[var(--tg-theme-link-color)]"
        >
          ← Назад
        </button>
        
        <h1 className="text-2xl font-bold mb-6 text-center">⚔️ Дуэли 1v1</h1>
        
        <div className="card p-6 text-center mb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl mx-auto mb-2">
                {user.equippedAvatar}
              </div>
              <div className="font-bold">Ты</div>
              <div className="text-sm text-[var(--tg-theme-hint-color)]">{user.eloRating} ELO</div>
            </div>
            
            <span className="text-4xl">⚔️</span>
            
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-2 ${
                duelSearching ? 'bg-yellow-500 animate-pulse' : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                {duelSearching ? '🔍' : '?'}
              </div>
              <div className="font-bold">{duelSearching ? 'Поиск...' : 'Соперник'}</div>
              <div className="text-sm text-[var(--tg-theme-hint-color)]">
                {duelSearching ? 'Ищем достойного' : 'Ждёт'}
              </div>
            </div>
          </div>
          
          <button
            onClick={startDuelSearch}
            disabled={duelSearching}
            className="btn-danger px-8 py-4 rounded-xl text-white font-bold text-lg w-full disabled:opacity-50"
          >
            {duelSearching ? '🔍 Поиск соперника...' : '⚔️ Найти соперника'}
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{user.duelsWon}</div>
            <div className="text-sm text-[var(--tg-theme-hint-color)]">Побед</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{user.duelsLost}</div>
            <div className="text-sm text-[var(--tg-theme-hint-color)]">Поражений</div>
          </div>
        </div>
        
        <div className="card p-4">
          <h3 className="font-bold mb-3">Правила дуэли:</h3>
          <ul className="text-sm text-[var(--tg-theme-hint-color)] space-y-2">
            <li>• 5 задач на скорость</li>
            <li>• Кто быстрее и точнее — побеждает</li>
            <li>• +25 ELO за победу, -20 за поражение</li>
            <li>• Призы: гемчики, XP, титулы</li>
          </ul>
        </div>
        
        <div className="mt-6 card p-4 bg-gradient-to-r from-yellow-400/10 to-orange-500/10">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏅</span>
            <div>
              <div className="font-bold">Сезон 1 — Финал через 12 дней</div>
              <div className="text-sm text-[var(--tg-theme-hint-color)]">
                Топ-100 получат эксклюзивные награды!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBattlePass = () => {
    const rewards = [
      { level: 1, free: '10 💎', premium: '25 💎' },
      { level: 2, free: '+50 XP', premium: 'Аватар 🎭' },
      { level: 3, free: '20 💎', premium: '50 💎' },
      { level: 4, free: '+100 XP', premium: 'Рамка ✨' },
      { level: 5, free: '30 💎', premium: 'Питомец 🐱' },
      { level: 10, free: '100 💎', premium: 'Тема 🌙' },
      { level: 15, free: '150 💎', premium: 'Анимация 🔥' },
      { level: 20, free: '200 💎', premium: 'Петомец 🐉' },
      { level: 30, free: '500 💎', premium: 'Quantum Cat 🌌' },
    ];
    
    return (
      <div className="p-4 safe-bottom">
        <button
          onClick={() => { setCurrentView('profile'); haptic('light'); }}
          className="flex items-center gap-2 mb-4 text-[var(--tg-theme-link-color)]"
        >
          ← Назад
        </button>
        
        <h1 className="text-2xl font-bold mb-2 text-center">🎖️ Battle Pass</h1>
        <p className="text-center text-[var(--tg-theme-hint-color)] mb-6">Сезон 1 • 25 дней осталось</p>
        
        {/* Current Level */}
        <div className="card p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold">Уровень {user.battlePassLevel}</span>
            <span className="text-[var(--tg-theme-hint-color)]">
              {user.battlePassXP % 100}/100 XP
            </span>
          </div>
          <div className="progress-bar h-3">
            <div 
              className="progress-fill bg-gradient-to-r from-purple-500 to-pink-500"
              style={{ width: `${(user.battlePassXP % 100)}%` }}
            />
          </div>
        </div>
        
        {/* Premium Banner */}
        {!user.isPremium && (
          <button
            onClick={() => haptic('medium')}
            className="w-full card p-4 mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">👑</span>
              <div className="flex-1 text-left">
                <div className="font-bold">Купить Premium Pass</div>
                <div className="text-sm opacity-90">Разблокируй все награды!</div>
              </div>
              <div className="font-bold">149₽</div>
            </div>
          </button>
        )}
        
        {/* Rewards Track */}
        <div className="space-y-3">
          {rewards.map(reward => (
            <div key={reward.level} className="card p-3 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                user.battlePassLevel >= reward.level 
                  ? 'bg-[var(--primary)] text-white' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                {reward.level}
              </div>
              
              <div className="flex-1 grid grid-cols-2 gap-2">
                <div className={`text-center p-2 rounded-lg ${
                  user.battlePassLevel >= reward.level 
                    ? 'bg-green-100 dark:bg-green-900/30' 
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                  <span className="text-sm">{reward.free}</span>
                  {user.battlePassLevel >= reward.level && <span className="ml-1">✓</span>}
                </div>
                
                <div className={`text-center p-2 rounded-lg ${
                  user.isPremium && user.battlePassLevel >= reward.level
                    ? 'bg-purple-100 dark:bg-purple-900/30'
                    : 'bg-gray-100 dark:bg-gray-800 opacity-50'
                }`}>
                  <span className="text-sm">{reward.premium}</span>
                  {!user.isPremium && <span className="ml-1">🔒</span>}
                  {user.isPremium && user.battlePassLevel >= reward.level && <span className="ml-1">✓</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const friendsList = [
    { id: '1', name: 'AlexCoder', avatar: '👨‍💻', streak: 45, level: 23, online: true },
    { id: '2', name: 'PyQueen', avatar: '👩‍💻', streak: 67, level: 31, online: true },
    { id: '3', name: 'BugMaster', avatar: '🐛', streak: 12, level: 15, online: false },
  ];

  const inviteFriend = () => {
    haptic('medium');
    
    const inviteLink = 'https://t.me/Programgo_bot?start=invite_' + (window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 'user123');
    const shareText = '🚀 Учи Python играючи в CodeStreak! Присоединяйся и получи 50 💎 бонус!';
    
    // Try to use Telegram sharing
    if (window.Telegram?.WebApp) {
      // Use Telegram share method if available
      const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`;
      window.open(shareUrl, '_blank');
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(inviteLink).then(() => {
        alert('Ссылка скопирована! Поделись с друзьями и получи 50 💎 за каждого!');
      }).catch(() => {
        alert(`Твоя ссылка для приглашения:\n${inviteLink}`);
      });
    }
    
    setShowInviteModal(true);
  };

  const sendGift = async (friendId: string, friendName: string) => {
    haptic('medium');
    
    const giftOptions = ['❤️ Жизнь', '💎 10 гемов', '🔥 Streak Freeze'];
    const giftTypes = ['lives', 'gems', 'streak_freeze'];
    const giftAmounts = [1, 10, 1];
    
    const choice = prompt(`Выбери подарок для ${friendName}:\n1. ❤️ Жизнь\n2. 💎 10 гемов\n3. 🔥 Streak Freeze\n\nВведи номер (1-3):`);
    
    if (choice === '1' || choice === '2' || choice === '3') {
      const index = parseInt(choice) - 1;
      const giftName = giftOptions[index];
      const giftType = giftTypes[index];
      const amount = giftAmounts[index];
      
      // Отправляем подарок на сервер
      const success = await api.sendGift(friendId, giftType, amount);
      
      if (success) {
        haptic('success');
        alert(`🎁 Подарок "${giftName}" отправлен игроку ${friendName}!`);
        addXP(10);
      } else {
        haptic('error');
        alert('Не удалось отправить подарок. Попробуйте позже.');
      }
    }
  };

  const renderFriends = () => {
    return (
      <div className="p-4 safe-bottom">
        <button
          onClick={() => { setCurrentView('profile'); haptic('light'); }}
          className="flex items-center gap-2 mb-4 text-[var(--tg-theme-link-color)]"
        >
          ← Назад
        </button>
        
        <h1 className="text-2xl font-bold mb-6 text-center">👥 Друзья</h1>
        
        <button
          onClick={inviteFriend}
          className="w-full card p-4 mb-6 flex items-center gap-3 border-2 border-dashed border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-colors"
        >
          <span className="text-3xl">➕</span>
          <div className="text-left flex-1">
            <div className="font-semibold">Пригласить друзей</div>
            <div className="text-sm text-[var(--tg-theme-hint-color)]">
              Получи 50 💎 за каждого друга
            </div>
          </div>
          <span className="text-2xl">📤</span>
        </button>

        {/* Invite Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="card p-6 w-full max-w-sm animate-bounce-in">
              <h2 className="text-xl font-bold mb-4 text-center">📤 Пригласи друзей</h2>
              
              <div className="text-center mb-6">
                <span className="text-6xl block mb-3">🎁</span>
                <p className="text-[var(--tg-theme-hint-color)]">
                  Поделись ссылкой и получай <span className="font-bold text-purple-600">50 💎</span> за каждого друга, который присоединится!
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    const link = 'https://t.me/Programgo_bot?start=invite_user';
                    const text = '🚀 Учи Python играючи в CodeStreak!';
                    window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="w-full py-3 rounded-xl bg-blue-500 text-white font-bold flex items-center justify-center gap-2"
                >
                  <span>📱</span> Поделиться в Telegram
                </button>
                
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('https://t.me/Programgo_bot?start=invite_user');
                    haptic('success');
                    alert('Ссылка скопирована!');
                  }}
                  className="w-full py-3 rounded-xl bg-gray-200 dark:bg-gray-700 font-bold flex items-center justify-center gap-2"
                >
                  <span>📋</span> Скопировать ссылку
                </button>
              </div>
              
              <button
                onClick={() => { setShowInviteModal(false); haptic('light'); }}
                className="w-full mt-4 py-3 text-[var(--tg-theme-hint-color)]"
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
        
        {/* Daily Gift */}
        <div className="card p-4 mb-6 bg-gradient-to-r from-pink-500/10 to-red-500/10">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🎁</span>
            <div className="flex-1">
              <div className="font-bold">Ежедневный подарок</div>
              <div className="text-sm text-[var(--tg-theme-hint-color)]">
                Отправь другу жизни или гемы!
              </div>
            </div>
            <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
              Доступно
            </span>
          </div>
        </div>
        
        <h3 className="font-bold mb-3">Мои друзья ({friendsList.length})</h3>
        
        <div className="space-y-3">
          {friendsList.map(friend => (
            <div key={friend.id} className="card p-4 flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                  {friend.avatar}
                </div>
                {friend.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                )}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{friend.name}</div>
                <div className="text-sm text-[var(--tg-theme-hint-color)]">
                  🔥 {friend.streak} • Ур. {friend.level}
                </div>
              </div>
              <button
                onClick={() => sendGift(friend.id, friend.name)}
                className="text-2xl hover:scale-110 transition-transform"
                title="Отправить подарок"
              >
                🎁
              </button>
            </div>
          ))}
        </div>
        
        {friendsList.length === 0 && (
          <div className="text-center py-8 text-[var(--tg-theme-hint-color)]">
            <span className="text-5xl block mb-3">👥</span>
            <p>У тебя пока нет друзей</p>
            <p className="text-sm">Пригласи друзей и получи бонусы!</p>
          </div>
        )}
      </div>
    );
  };

  const renderSettings = () => {
    const themes = [
      { id: '', icon: '☀️', name: 'Светлая' },
      { id: 'dark', icon: '🌙', name: 'Тёмная' },
      { id: 'matrix', icon: '💚', name: 'Matrix' },
      { id: 'cyberpunk', icon: '💜', name: 'Cyberpunk' },
      { id: 'dracula', icon: '🧛', name: 'Dracula' },
      { id: 'ocean', icon: '🌊', name: 'Ocean' },
    ];

    const handleThemeChange = (themeId: string) => {
      updateUser({ equippedTheme: themeId });
      haptic('selection');
      
      // Apply theme to document
      document.body.className = themeId ? `theme-${themeId}` : '';
      
      // Save theme preference
      localStorage.setItem('codestreak_theme', themeId);
    };

    const toggleSound = () => {
      updateUser({ soundEnabled: !user.soundEnabled });
      haptic('selection');
    };

    const toggleVibration = () => {
      updateUser({ vibrationEnabled: !user.vibrationEnabled });
      haptic('selection');
    };

    const setReminderTime = (time: 'morning' | 'evening') => {
      updateUser({ reminderTime: time });
      haptic('selection');
    };

    const resetProgress = () => {
      if (confirm('Вы уверены? Весь прогресс будет потерян!')) {
        localStorage.removeItem('codestreak_user');
        localStorage.removeItem('codestreak_theme');
        setUser(defaultUserState);
        document.body.className = '';
        haptic('success');
      }
    };

    return (
      <div className="p-4 safe-bottom">
        <button
          onClick={() => { setCurrentView('profile'); haptic('light'); }}
          className="flex items-center gap-2 mb-4 text-[var(--tg-theme-link-color)]"
        >
          ← Назад
        </button>
        
        <h1 className="text-2xl font-bold mb-6 text-center">⚙️ Настройки</h1>
        
        <div className="space-y-3">
          {/* Звуки */}
          <button 
            onClick={toggleSound}
            className="card p-4 flex items-center justify-between w-full"
          >
            <div className="text-left">
              <div className="font-semibold">Звуки</div>
              <div className="text-sm text-[var(--tg-theme-hint-color)]">Звуковые эффекты</div>
            </div>
            <div className={`w-12 h-7 rounded-full relative transition-colors ${
              user.soundEnabled ? 'bg-[var(--primary)]' : 'bg-gray-300 dark:bg-gray-600'
            }`}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${
                user.soundEnabled ? 'right-1' : 'left-1'
              }`} />
            </div>
          </button>
          
          {/* Вибрация */}
          <button 
            onClick={toggleVibration}
            className="card p-4 flex items-center justify-between w-full"
          >
            <div className="text-left">
              <div className="font-semibold">Вибрация</div>
              <div className="text-sm text-[var(--tg-theme-hint-color)]">Тактильный отклик</div>
            </div>
            <div className={`w-12 h-7 rounded-full relative transition-colors ${
              user.vibrationEnabled ? 'bg-[var(--primary)]' : 'bg-gray-300 dark:bg-gray-600'
            }`}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${
                user.vibrationEnabled ? 'right-1' : 'left-1'
              }`} />
            </div>
          </button>
          
          {/* Время напоминания */}
          <div className="card p-4">
            <div className="font-semibold mb-3">Время напоминания</div>
            <div className="flex gap-2">
              <button 
                onClick={() => setReminderTime('morning')}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  user.reminderTime === 'morning' 
                    ? 'bg-[var(--primary)] text-white' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                🌅 Утро (9:00)
              </button>
              <button 
                onClick={() => setReminderTime('evening')}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  user.reminderTime === 'evening' 
                    ? 'bg-[var(--primary)] text-white' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                🌙 Вечер (20:00)
              </button>
            </div>
          </div>
          
          {/* Темы оформления */}
          <div className="card p-4">
            <div className="font-semibold mb-3">Тема оформления</div>
            <div className="grid grid-cols-3 gap-2">
              {themes.map(theme => (
                <button 
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`p-3 rounded-lg flex flex-col items-center gap-1 transition-all ${
                    user.equippedTheme === theme.id 
                      ? 'bg-[var(--primary)] text-white ring-2 ring-[var(--primary)] ring-offset-2' 
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span className="text-2xl">{theme.icon}</span>
                  <span className="text-xs">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Premium */}
          {!user.isPremium && (
            <button 
              onClick={() => { 
                updateUser({ isPremium: true }); 
                haptic('success'); 
              }}
              className="card w-full p-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">👑</span>
                <div className="text-left flex-1">
                  <div className="font-bold">Стать Premium</div>
                  <div className="text-sm opacity-90">∞ жизней, 2x XP, без рекламы</div>
                </div>
                <div className="font-bold">149₽</div>
              </div>
            </button>
          )}
          
          {/* Сброс */}
          <button 
            onClick={resetProgress}
            className="card w-full p-4 text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            🗑️ Сбросить прогресс
          </button>
        </div>
        
        {/* Sync Status */}
        <div className="mt-6 card p-4">
          <h3 className="font-semibold mb-3">☁️ Синхронизация</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--tg-theme-hint-color)]">Статус:</span>
              <span className={isSyncing ? 'text-yellow-500' : 'text-green-500'}>
                {isSyncing ? '⟳ Синхронизация...' : '✓ Синхронизировано'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-[var(--tg-theme-hint-color)]">Telegram:</span>
              <span className={api.getUserInfo().isFromTelegram ? 'text-green-500' : 'text-orange-500'}>
                {api.getUserInfo().isFromTelegram ? '✓ Подключен' : '⚠️ Не в Telegram'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-[var(--tg-theme-hint-color)]">User ID:</span>
              <span className="font-mono text-xs">{api.getTelegramUserId().substring(0, 20)}...</span>
            </div>
            
            {lastSyncTime && (
              <div className="flex justify-between">
                <span className="text-[var(--tg-theme-hint-color)]">Последняя синхр.:</span>
                <span>{lastSyncTime.toLocaleTimeString()}</span>
              </div>
            )}
          </div>
          
          <button
            onClick={async () => {
              setIsSyncing(true);
              haptic('medium');
              try {
                const serverData = await api.syncUserData(user);
                if (serverData) {
                  setUser(prev => ({ ...prev, ...serverData }));
                  haptic('success');
                  alert('✅ Данные синхронизированы!');
                } else {
                  await api.saveUserData(user);
                  haptic('success');
                  alert('✅ Данные сохранены на сервер!');
                }
              } catch (e) {
                haptic('error');
                alert('❌ Ошибка синхронизации. Проверьте соединение.');
              }
              setIsSyncing(false);
              setLastSyncTime(new Date());
            }}
            disabled={isSyncing}
            className="w-full mt-3 py-2 rounded-lg bg-blue-500 text-white font-medium disabled:opacity-50"
          >
            {isSyncing ? '⟳ Синхронизация...' : '🔄 Синхронизировать сейчас'}
          </button>
        </div>

        {/* Important notice for non-Telegram users */}
        {!api.getUserInfo().isFromTelegram && (
          <div className="mt-4 card p-4 bg-orange-100 dark:bg-orange-900/30">
            <div className="flex gap-3">
              <span className="text-2xl">⚠️</span>
              <div className="text-sm">
                <p className="font-medium text-orange-600 dark:text-orange-400">
                  Вы не в Telegram Mini App
                </p>
                <p className="text-[var(--tg-theme-hint-color)] mt-1">
                  Для синхронизации между устройствами откройте приложение через Telegram бота.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6 text-center text-sm text-[var(--tg-theme-hint-color)]">
          <p>CodeStreak v1.0.0</p>
          <p className="mt-1">Made with ❤️ for coders</p>
        </div>
      </div>
    );
  };

  // Pixel Cat Mascot Component
  const PixelCat = ({ mood = 'neutral' }: { mood?: 'happy' | 'sad' | 'neutral' }) => {
    const catEmojis = {
      happy: '😺',
      sad: '😿',
      neutral: '🐱'
    };
    
    return (
      <div className="pixel-cat-container">
        <div className={`pixel-cat ${mood}`}>
          <div className="text-6xl filter drop-shadow-lg">
            {catEmojis[mood]}
          </div>
          {mood === 'happy' && (
            <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
              ✨
            </div>
          )}
        </div>
      </div>
    );
  };

  // Confetti Component
  const Confetti = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96e6a1', '#ffeaa7', '#fd79a8', '#a29bfe'];
    
    return (
      <div className="confetti-container">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: colors[Math.floor(Math.random() * colors.length)],
              animationDelay: `${Math.random() * 2}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
      </div>
    );
  };

  // Lesson Complete Screen
  const renderLessonComplete = () => (
    <div className="fixed inset-0 bg-[var(--tg-theme-bg-color)] z-50 flex flex-col items-center justify-center p-6">
      <Confetti />
      
      <div className="text-center animate-bounce-in">
        <div className="text-8xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold mb-4">Урок пройден!</h1>
        
        <div className="flex justify-center gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--xp-blue)]">
              +{currentLesson?.skill.lessons[currentLesson.lessonIndex].exercises.reduce((sum, e) => sum + e.xp, 0) || 0}
            </div>
            <div className="text-sm text-[var(--tg-theme-hint-color)]">XP</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500">
              {lessonMistakes === 0 ? '💯' : `${Math.max(0, 100 - lessonMistakes * 10)}%`}
            </div>
            <div className="text-sm text-[var(--tg-theme-hint-color)]">Точность</div>
          </div>
        </div>
        
        {lessonMistakes === 0 && (
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-xl mb-6">
            <span className="text-yellow-600 dark:text-yellow-400 font-bold">
              ⭐ Идеально! Ни одной ошибки!
            </span>
          </div>
        )}
      </div>
    </div>
  );

  // Main render
  return (
    <div className={`h-full flex flex-col ${user.equippedTheme ? `theme-${user.equippedTheme}` : ''}`}>
      {/* XP Popup */}
      {xpPopup && (
        <div
          className="xp-popup"
          style={{ left: xpPopup.x, top: xpPopup.y }}
        >
          +{xpPopup.amount} XP
        </div>
      )}
      
      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Pixel Cat Mascot - show on home and practice */}
      {(currentView === 'home' || currentView === 'practice') && (
        <PixelCat mood={user.hearts > 2 ? 'happy' : user.hearts === 0 ? 'sad' : 'neutral'} />
      )}
      
      {/* Header (not shown during lesson) */}
      {currentView !== 'lesson' && currentView !== 'sandbox' && renderHeader()}
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {currentView === 'home' && renderSkillTree()}
        {currentView === 'skill' && renderSkillDetail()}
        {currentView === 'lesson' && renderExercise()}
        {currentView === 'practice' && renderPractice()}
        {currentView === 'leaderboard' && renderLeaderboard()}
        {currentView === 'shop' && renderShop()}
        {currentView === 'profile' && renderProfile()}
        {currentView === 'achievements' && renderAchievements()}
        {currentView === 'wheel' && renderWheel()}
        {currentView === 'sandbox' && renderSandbox()}
        {currentView === 'clan' && renderClan()}
        {currentView === 'duel' && renderDuel()}
        {currentView === 'battlepass' && renderBattlePass()}
        {currentView === 'friends' && renderFriends()}
        {currentView === 'settings' && renderSettings()}
      </div>
      
      {/* Tab Bar (not shown during lesson/sandbox and other sub-pages) */}
      {!['lesson', 'sandbox', 'skill', 'achievements', 'wheel', 'clan', 'duel', 'battlepass', 'friends', 'settings'].includes(currentView) && renderTabBar()}
      
      {/* Lesson Complete Overlay */}
      {showConfetti && currentLesson && renderLessonComplete()}
    </div>
  );
}
