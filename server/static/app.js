const API_URL = '/api';
const $ = id => document.getElementById(id);

const PET_TYPES = {
    cat: {
        name: 'Котик',
        icon: '🐱',
        frames: {
            idle: ['(=^･ω･^=)', '(=^･ｪ･^=)'],
            happy: ['(=^▽^=)', '✧(=^･ω･^=)✧'],
            sad: ['(=;ω;=)', '(=T_T=)'],
            sleep: ['(=^-ω-^=) zzZ', '(=^｡^=) zZ'],
            walk: ['≡(=^･ω･^=)', '(=^･ω･^=)≡'],
            eat: ['(=^･ω･^=)🐟', '(=^○^=)'],
            love: ['♡(=^･ω･^=)♡', '(=^･ω･^=)💕'],
            code: ['(=^･ω･^=)💻', '(=^･ω･^=)⌨️']
        },
        messages: {
            idle: ['Мяу! Давай учиться!', 'Погладь меня!', '*мурчит*', 'Код — это весело!'],
            happy: ['Ты молодец! 🎉', 'Отличная работа!', 'Мяу-у-у! ✨', 'Горжусь тобой!'],
            sad: ['Не сдавайся!', 'В следующий раз получится!', 'Я верю в тебя!', 'Давай попробуем ещё!'],
            streak: ['🔥 Стрик горит!', 'Не останавливайся!', 'Продолжай в том же духе!'],
            morning: ['Доброе утро! ☀️', 'Готов к учёбе?', 'Новый день — новые знания!'],
            night: ['Пора спать... 🌙', 'Ты много работал!', 'Завтра продолжим!']
        }
    },
    dragon: {
        name: 'Дракон',
        icon: '🐉',
        frames: {
            idle: ['🐲', '🐉'],
            happy: ['🐲✨', '🔥🐉🔥'],
            sad: ['🐲💧', '😢🐉'],
            sleep: ['🐲💤', '🐉zzZ'],
            walk: ['~🐲', '🐲~'],
            eat: ['🐲🔥', '🐉🍖'],
            love: ['🐲💕', '💕🐉'],
            code: ['🐲💻', '🐉⚡']
        },
        messages: {
            idle: ['Рр-р! Кодим!', '*дышит огнём*', 'Баги сжигаю!'],
            happy: ['ОГОНЬ! 🔥🔥🔥', 'Ты легенда!', 'Эпично!'],
            sad: ['Баг... горит...', 'Не сдавайся, воин!'],
            streak: ['🔥 ПЛАМЯ СТРИКА! 🔥'],
            morning: ['Новый день битвы!'],
            night: ['Дракон спит... 🌙']
        }
    },
    robot: {
        name: 'Робот',
        icon: '🤖',
        frames: {
            idle: ['[◉_◉]', '[◎_◎]'],
            happy: ['[^_^]', '[★_★]'],
            sad: ['[;_;]', '[T_T]'],
            sleep: ['[—_—]', '[-_-] zzZ'],
            walk: ['[◉_◉]/', '\\[◉_◉]'],
            eat: ['[◉_◉]⚡', '[●_●]'],
            love: ['[♥_♥]', '[❤_❤]'],
            code: ['[◉_◉]💻', '[◎_◎]01']
        },
        messages: {
            idle: ['BEEP BOOP', 'Оптимизирую...', 'Сканирую код...'],
            happy: ['УСПЕХ! 100%', 'Задача выполнена!'],
            sad: ['ОШИБКА 404', 'Перезагрузка...'],
            streak: ['СТРИК АКТИВЕН'],
            morning: ['Системы запущены!'],
            night: ['Режим сна...']
        }
    },
    fox: {
        name: 'Лисичка',
        icon: '🦊',
        frames: {
            idle: ['(◕ᴗ◕)', '(◠‿◠)'],
            happy: ['✧(◕ᴗ◕)✧', '♪(◠‿◠)♪'],
            sad: ['(╥﹏╥)', '(；ω；)'],
            sleep: ['(᷇ᴗ᷆)zzZ', '(-.-)zZ'],
            walk: ['≋(◕ᴗ◕)', '(◕ᴗ◕)≋'],
            eat: ['(◕ᴗ◕)🍎', '(◠‿◠)ノ🍇'],
            love: ['♡(◕ᴗ◕)♡', '(◕ᴗ◕)💕'],
            code: ['(◕ᴗ◕)💻', '(◠‿◠)📚']
        },
        messages: {
            idle: ['Хитрый план!', '*виляет хвостом*'],
            happy: ['Умница! ✨', 'Отлично!'],
            sad: ['Не грусти!', 'Попробуем снова!'],
            streak: ['🔥 Огненный стрик!'],
            morning: ['Доброе утро! 🌸'],
            night: ['Сладких снов! 🌙']
        }
    },
    penguin: {
        name: 'Пингвин',
        icon: '🐧',
        frames: {
            idle: ['(・∀・)', '(・ω・)'],
            happy: ['(＾▽＾)', '(◕‿◕)'],
            sad: ['(╯︵╰)', '(´;ω;`)'],
            sleep: ['(_ _)zzZ', '(-.-)zZ'],
            walk: ['ヾ(・ω・)', '(・ω・)ノ'],
            eat: ['(・ω・)🐟', '(・∀・)🍣'],
            love: ['♡(・ω・)♡', '(・ω・)💕'],
            code: ['(・∀・)💻', '(・ω・)❄️']
        },
        messages: {
            idle: ['Brrr! Кодим!', '*машет ластами*'],
            happy: ['Круто! ❄️', 'Ледяной успех!'],
            sad: ['Не замерзай!', 'Согреемся кодом!'],
            streak: ['❄️ Морозный стрик! ❄️'],
            morning: ['Доброе утро! ☀️'],
            night: ['Пора спать! 🌙']
        }
    }
};

let petState = {
    type: null,
    mood: 'idle',
    x: 50,
    direction: 1,
    frame: 0,
    hunger: 100,
    happiness: 100,
    energy: 100,
    lastFed: Date.now(),
    lastPetted: Date.now(),
    isWalking: false,
    message: null,
    messageTimeout: null
};

let petAnimationInterval = null;

function loadPetState() {
    const saved = localStorage.getItem('cs_pet_state');
    if (saved) {
        try {
            Object.assign(petState, JSON.parse(saved));
        } catch(e) {}
    }
    if (!petState.type) {
        if (state.owned.includes('pet-cat')) petState.type = 'cat';
        else if (state.owned.includes('pet-dragon')) petState.type = 'dragon';
        else if (state.owned.includes('pet-robot')) petState.type = 'robot';
        else if (state.owned.includes('pet-fox')) petState.type = 'fox';
        else if (state.owned.includes('pet-penguin')) petState.type = 'penguin';
    }
}

function savePetState() {
    localStorage.setItem('cs_pet_state', JSON.stringify(petState));
}

function updatePetMood(mood, duration = 3000) {
    petState.mood = mood;
    savePetState();

    setTimeout(() => {
        if (petState.mood === mood) {
            petState.mood = 'idle';
            savePetState();
        }
    }, duration);
}

function showPetMessage(text, duration = 3000) {
    petState.message = text;
    
    if (petState.messageTimeout) {
        clearTimeout(petState.messageTimeout);
    }
    
    petState.messageTimeout = setTimeout(() => {
        petState.message = null;
        render();
    }, duration);
    
    render();
}

function getRandomPetMessage(category) {
    if (!petState.type) return null;
    const pet = PET_TYPES[petState.type];
    if (!pet || !pet.messages[category]) return null;
    const messages = pet.messages[category];
    return messages[Math.floor(Math.random() * messages.length)];
}

function petReactCorrect() {
    if (!petState.type) return;
    updatePetMood('happy');
    petState.happiness = Math.min(100, petState.happiness + 5);
    const msg = getRandomPetMessage('happy');
    if (msg) showPetMessage(msg);
    savePetState();
}

function petReactWrong() {
    if (!petState.type) return;
    updatePetMood('sad');
    const msg = getRandomPetMessage('sad');
    if (msg) showPetMessage(msg);
    savePetState();
}

function feedPet() {
    if (!petState.type) return;
    if (Date.now() - petState.lastFed < 60000) { // 1 минута кулдаун
        // Разные ответы "не голоден" для разных питомцев
        const notHungryMessages = {
            cat: 'Мяу, я сыт! 😺',
            fox: 'Уже наелся! 🦊',
            penguin: '*качает головой* 🐧',
            robot: 'ЖЕЛУДОК: 100% 🔋',
            dragon: '*икает огнём* 🔥'
        };
        showPetMessage(notHungryMessages[petState.type] || 'Я не голоден! 😊');
        return;
    }
    petState.lastFed = Date.now();
    petState.hunger = 100;
    petState.happiness = Math.min(100, petState.happiness + 10);
    updatePetMood('eat', 2000);

    const feedReactions = {
        cat: 'Ням-ням! 🐟😻',
        fox: '*хрум-хрум* 🍖🦊',
        penguin: '*ловит рыбку* 🐟🐧',
        robot: 'ЗАРЯД: +50% 🔋⚡',
        dragon: '*жарит и ест* 🔥🍖'
    };
    
    showPetMessage(feedReactions[petState.type] || 'Вкусно! 😋');
    haptic('success');
    savePetState();
}

function petThePet() {
    if (!petState.type) return;
    petState.lastPetted = Date.now();
    petState.happiness = Math.min(100, petState.happiness + 5);
    updatePetMood('love', 2000);

    const petReactions = {
        cat: 'Мурррр~ 😻',
        fox: 'Тяф-тяф! 🥰',
        penguin: '*машет крыльями* 🐧💕',
        robot: 'СИСТЕМА: счастье++ 🤖💚',
        dragon: '*пускает дымок* 🐉💨'
    };
    
    const reaction = petReactions[petState.type] || '*радуется* ♡';
    showPetMessage(reaction);
    haptic('light');
    savePetState();
}

function getPetFrame() {
    if (!petState.type) return '';
    const pet = PET_TYPES[petState.type];
    if (!pet) return '';
    const frames = pet.frames[petState.mood] || pet.frames.idle;
    return frames[petState.frame % frames.length];
}

function animatePet() {
    petState.frame = (petState.frame + 1) % 10;

    if (Math.random() < 0.02 && !petState.isWalking) {
        petState.isWalking = true;
        petState.direction = Math.random() > 0.5 ? 1 : -1;
        updatePetMood('walk');
        setTimeout(() => {
            petState.isWalking = false;
            petState.mood = 'idle';
        }, 2000);
    }
    
    if (petState.isWalking) {
        petState.x += petState.direction * 2;
        if (petState.x > 85) { petState.direction = -1; petState.x = 85; }
        if (petState.x < 15) { petState.direction = 1; petState.x = 15; }
    }

    if (Math.random() < 0.005 && !petState.message) {
        const msg = getRandomPetMessage('idle');
        if (msg) showPetMessage(msg, 4000);
    }

    const hoursSinceLastFed = (Date.now() - petState.lastFed) / (1000 * 60 * 60);
    petState.hunger = Math.max(0, 100 - hoursSinceLastFed * 10);
    
    const hoursSinceLastPetted = (Date.now() - petState.lastPetted) / (1000 * 60 * 60);
    petState.happiness = Math.max(0, petState.happiness - hoursSinceLastPetted * 0.1);

    if (petState.happiness < 20 && petState.mood !== 'sleep') {
        updatePetMood('sleep');
    }
}

function startPetAnimation() {
    if (petAnimationInterval) return;
    petAnimationInterval = setInterval(() => {
        animatePet();
        renderPetOnly();
    }, 500);
}

function stopPetAnimation() {
    if (petAnimationInterval) {
        clearInterval(petAnimationInterval);
        petAnimationInterval = null;
    }
}

function renderPetOnly() {
    const petEl = document.getElementById('floating-pet');
    if (petEl && petState.type) {
        const pet = PET_TYPES[petState.type];
        const spriteEl = petEl.querySelector('.pet-sprite');
        if (spriteEl) {
            spriteEl.textContent = getPetFrame();
            spriteEl.style.transform = `scaleX(${petState.direction})`;
        }
        petEl.style.left = petState.x + '%';
        
        const msgEl = petEl.querySelector('.pet-message');
        if (msgEl) {
            msgEl.style.display = petState.message ? 'block' : 'none';
            msgEl.textContent = petState.message || '';
        }
    }
}

function selectPet(type) {
    if (!state.owned.includes('pet-' + type)) {
        haptic('error');
        alert('Сначала купи питомца в магазине!');
        return;
    }
    petState.type = type;
    petState.mood = 'happy';
    showPetMessage('Привет! Я ' + PET_TYPES[type].name + '! ♡');
    savePetState();
    haptic('success');
    render();
}

const ADMIN_IDS = ['5313412464', 5313412464];

function isAdmin() {
    const odgovarajući = getTelegramId();
    return ADMIN_IDS.includes(odgovarajući) || ADMIN_IDS.includes(String(odgovarajući)) || ADMIN_IDS.includes(Number(odgovarajući));
}

let currentLanguage = localStorage.getItem('cs_language') || 'python';

const getLanguages = () => {
    if (typeof window !== 'undefined' && window.AVAILABLE_LANGUAGES) {
        return window.AVAILABLE_LANGUAGES;
    }
    return [
        { id: 'python', name: 'Python', icon: '🐍', color: '#3776AB', desc: 'Самый популярный язык', available: true },
        { id: 'javascript', name: 'JavaScript', icon: '🟨', color: '#F7DF1E', desc: 'Язык веб-разработки', available: true },
        { id: 'html', name: 'HTML/CSS', icon: '🌐', color: '#E34F26', desc: 'Основы веб-страниц', available: true },
        { id: 'sql', name: 'SQL', icon: '🗄️', color: '#4479A1', desc: 'Базы данных', available: true },
        { id: 'go', name: 'Go', icon: '🐹', color: '#00ADD8', desc: 'Язык от Google', available: false, premium: true },
        { id: 'rust', name: 'Rust', icon: '🦀', color: '#CE422B', desc: 'Системный язык', available: false, premium: true },
    ];
};

function switchLanguage(langId) {
    currentLanguage = langId;
    localStorage.setItem('cs_language', langId);
    selectedSkill = null;
    view = 'home';
    haptic('medium');
    render();
}

const getSkills = () => {
    if (typeof window !== 'undefined' && window.getSkillsByLanguage) {
        return window.getSkillsByLanguage(currentLanguage);
    }
    if (typeof window !== 'undefined' && window.COURSE_SKILLS && window.COURSE_SKILLS.length > 0) {
        return window.COURSE_SKILLS;
    }
    console.error('Course data not loaded!');
    return [];
};

const getPracticeSkills = () => {
    if (typeof window !== 'undefined' && window.getPracticeByLanguage) {
        return window.getPracticeByLanguage(currentLanguage);
    }
    if (typeof window !== 'undefined' && window.PRACTICE_SKILLS && window.PRACTICE_SKILLS.length > 0) {
        return window.PRACTICE_SKILLS;
    }
    return [];
};
const h = (tag, attrs = {}, ...children) => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
        if (k === 'class') el.className = v;
        else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
        else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
        else el.setAttribute(k, v);
    });
    children.flat().forEach(c => {
        if (c == null) return;
        el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return el;
};


const ACHIEVEMENTS = [
    { id:'first-lesson', title:'Первый шаг', desc:'Пройди первый урок', icon:'👶', rarity:'common' },
    { id:'streak-7', title:'Неделя огня', desc:'7 дней подряд', icon:'🔥', rarity:'common' },
    { id:'streak-30', title:'Месяц мощи', desc:'30 дней подряд', icon:'💪', rarity:'rare' },
    { id:'perfect', title:'Перфекционист', desc:'Урок без ошибок', icon:'💯', rarity:'common' },
    { id:'night-owl', title:'Ночной кодер', desc:'Урок после 00:00', icon:'🦉', rarity:'rare' },
    { id:'xp-1000', title:'XP Маньяк', desc:'Набери 1000 XP', icon:'💎', rarity:'rare' },
    { id:'skill-complete', title:'Первый скилл', desc:'Заверши навык', icon:'🎯', rarity:'common' },
    { id:'coder-10', title:'10 уроков', desc:'Пройди 10 уроков', icon:'📚', rarity:'common' },
    { id:'bug-hunter', title:'Охотник на баги', desc:'Исправь 10 ошибок', icon:'🐛', rarity:'epic' },
    { id:'clan-founder', title:'Основатель', desc:'Создай клан', icon:'🏰', rarity:'epic' },
    { id:'duelist', title:'Дуэлянт', desc:'Победи в дуэли', icon:'⚔️', rarity:'rare' },
    { id:'collector', title:'Коллекционер', desc:'Собери 1000 гемов', icon:'💠', rarity:'legendary' },
];

const AVATARS = [
    { id: 'default', icon: '👨‍💻', name: 'Программист', price: 0, rarity: 'common' },
    { id: 'girl', icon: '👩‍💻', name: 'Программистка', price: 0, rarity: 'common' },
    { id: 'student', icon: '🧑‍🎓', name: 'Студент', price: 0, rarity: 'common' },
    { id: 'nerd', icon: '🤓', name: 'Ботан', price: 0, rarity: 'common' },

    { id: 'ninja', icon: '🥷', name: 'Ниндзя', price: 500, rarity: 'common' },
    { id: 'astronaut', icon: '🧑‍🚀', name: 'Астронавт', price: 600, rarity: 'common' },
    { id: 'scientist', icon: '🧑‍🔬', name: 'Учёный', price: 550, rarity: 'common' },
    { id: 'artist', icon: '🧑‍🎨', name: 'Художник', price: 500, rarity: 'common' },
    { id: 'cook', icon: '🧑‍🍳', name: 'Повар', price: 450, rarity: 'common' },
    { id: 'mechanic', icon: '🧑‍🔧', name: 'Механик', price: 500, rarity: 'common' },

    { id: 'robot', icon: '🤖', name: 'Робот', price: 800, rarity: 'rare' },
    { id: 'alien', icon: '👽', name: 'Пришелец', price: 900, rarity: 'rare' },
    { id: 'zombie', icon: '🧟', name: 'Зомби', price: 850, rarity: 'rare' },
    { id: 'vampire', icon: '🧛', name: 'Вампир', price: 900, rarity: 'rare' },
    { id: 'elf', icon: '🧝', name: 'Эльф', price: 850, rarity: 'rare' },
    { id: 'genie', icon: '🧞', name: 'Джинн', price: 950, rarity: 'rare' },
    { id: 'mermaid', icon: '🧜', name: 'Русалка', price: 900, rarity: 'rare' },
    { id: 'fairy', icon: '🧚', name: 'Фея', price: 850, rarity: 'rare' },

    { id: 'wizard', icon: '🧙', name: 'Маг', price: 1200, rarity: 'epic' },
    { id: 'superhero', icon: '🦸', name: 'Супергерой', price: 1500, rarity: 'epic' },
    { id: 'supervillain', icon: '🦹', name: 'Суперзлодей', price: 1500, rarity: 'epic' },
    { id: 'ghost', icon: '👻', name: 'Призрак', price: 1300, rarity: 'epic' },
    { id: 'devil', icon: '😈', name: 'Демон', price: 1400, rarity: 'epic' },
    { id: 'angel', icon: '😇', name: 'Ангел', price: 1400, rarity: 'epic' },
    { id: 'clown', icon: '🤡', name: 'Клоун', price: 1100, rarity: 'epic' },
    { id: 'cowboy', icon: '🤠', name: 'Ковбой', price: 1000, rarity: 'epic' },

    { id: 'skull', icon: '💀', name: 'Череп', price: 2000, rarity: 'legendary' },
    { id: 'crown', icon: '👑', name: 'Король', price: 2500, rarity: 'legendary' },
    { id: 'fire', icon: '🔥', name: 'Огонь', price: 2200, rarity: 'legendary' },
    { id: 'diamond', icon: '💎', name: 'Алмаз', price: 3000, rarity: 'legendary' },
    { id: 'rainbow', icon: '🌈', name: 'Радуга', price: 2800, rarity: 'legendary' },
    { id: 'unicorn', icon: '🦄', name: 'Единорог', price: 3500, rarity: 'legendary' },

    { id: 'dragon_face', icon: '🐲', name: 'Дракон', price: 5000, rarity: 'mythic' },
    { id: 'phoenix', icon: '🔶', name: 'Феникс', price: 5000, rarity: 'mythic' },
    { id: 'galaxy', icon: '🌌', name: 'Галактика', price: 6000, rarity: 'mythic' },
    { id: 'infinity', icon: '♾️', name: 'Бесконечность', price: 7500, rarity: 'mythic' },
    { id: 'god', icon: '⚡', name: 'Бог Кода', price: 10000, rarity: 'mythic', premium: true },
];

const AVATAR_FRAMES = [
    { id: 'none', name: 'Без рамки', price: 0, style: 'none' },
    { id: 'blue', name: 'Синяя', price: 200, style: '3px solid #3b82f6' },
    { id: 'purple', name: 'Фиолетовая', price: 200, style: '3px solid #8b5cf6' },
    { id: 'green', name: 'Зелёная', price: 200, style: '3px solid #10b981' },
    { id: 'gold', name: 'Золотая', price: 500, style: '3px solid #f59e0b' },
    { id: 'rainbow', name: 'Радужная', price: 1000, style: '3px solid', gradient: 'linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)' },
    { id: 'fire', name: 'Огненная', price: 1500, style: '3px solid #ef4444', glow: '0 0 15px #ef4444' },
    { id: 'ice', name: 'Ледяная', price: 1500, style: '3px solid #06b6d4', glow: '0 0 15px #06b6d4' },
    { id: 'legendary', name: 'Легендарная', price: 3000, style: '4px solid', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444, #8b5cf6)', glow: '0 0 20px rgba(245,158,11,0.5)', animation: true },
];

const PROFILE_BACKGROUNDS = [
    { id: 'default', name: 'Стандартный', price: 0, bg: 'var(--bg)' },
    { id: 'gradient1', name: 'Закат', price: 300, bg: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)' },
    { id: 'gradient2', name: 'Океан', price: 300, bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 'gradient3', name: 'Лес', price: 300, bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
    { id: 'gradient4', name: 'Космос', price: 500, bg: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' },
    { id: 'gradient5', name: 'Неон', price: 800, bg: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)' },
    { id: 'matrix', name: 'Matrix', price: 1000, bg: '#0d1117', special: 'matrix' },
    { id: 'stars', name: 'Звёзды', price: 1200, bg: '#0a0a0f', special: 'stars' },
];

const SHOP = [
    { id:'streak-freeze', title:'Streak Freeze', desc:'Защити серию', price:200, icon:'🧊', category:'boost' },
    { id:'double-xp', title:'2x XP на 24ч', desc:'Двойной опыт', price:300, icon:'⚡', category:'boost' },
    { id:'heart-refill', title:'Полные ❤️', desc:'Все жизни', price:350, icon:'💗', category:'boost' },

    { id:'pet-cat', title:'Котик', desc:'Мурчащий друг, реагирует на успехи', price:500, icon:'🐱', category:'pet' },
    { id:'pet-dragon', title:'Дракон', desc:'Огненный компаньон', price:1500, icon:'🐉', category:'pet' },
    { id:'pet-robot', title:'Робот', desc:'Цифровой помощник', price:1000, icon:'🤖', category:'pet' },
    { id:'pet-fox', title:'Лисичка', desc:'Хитрый компаньон', price:800, icon:'🦊', category:'pet' },
    { id:'pet-penguin', title:'Пингвин', desc:'Ледяной друг', price:700, icon:'🐧', category:'pet' },

    { id:'theme-matrix', title:'Тема Matrix', desc:'Зелёный код', price:800, icon:'💚', category:'theme' },
    { id:'theme-cyberpunk', title:'Тема Cyberpunk', desc:'Неоновый город', price:1000, icon:'💜', category:'theme' },
    { id:'theme-dracula', title:'Тема Dracula', desc:'Тёмный вампир', price:800, icon:'🧛', category:'theme' },
    { id:'theme-ocean', title:'Тема Ocean', desc:'Глубины моря', price:600, icon:'🌊', category:'theme' },
];

let state = {
    level:1, xp:0, xpNext:100, gems:500, hearts:5, maxHearts:5,
    streak:0, lastActivity:'', lastWheelSpin:0,
    completedLessons:[], completedSkills:[], achievements:[], owned:['avatar-default'],
    avatar:'👨‍💻', avatarFrame:'none', profileBg:'default',
    theme:'', clanId:null, clanName:null, clanIcon:null,
    eloRating:1000, duelsWon:0, duelsLost:0,
    totalLessons:0, perfectLessons:0, nightLessons:0,
    premium:false, sound:true, vibration:true,
    bpLevel:1, bpXP:0, bpSeason:1, bpClaimedFree:[], bpClaimedPremium:[]
};

let view = 'home';
let selectedSkill = null;
let currentLesson = null;
let exerciseIdx = 0;
let mistakes = 0;
let answer = '';
let result = null;
let selectedOpt = null;
let wheelRot = 0;
let wheelSpinning = false;
let wheelPrize = null;
let sandboxCode = '# Пиши Python код!\nprint("Hello, CodeStreak!")\n\nfor i in range(5):\n    print(f"Число: {i}")';
let earnedXP = 0;
let correctCount = 0;
let sandboxOutput = '';
let clanMessages = [];
let clanMessagesLoaded = false;
let chatMsg = '';

async function loadClanMessages() {
    if (!state.clanId) return;
    try {
        const r = await fetch(`${API_URL}/clans/${state.clanId}/messages`);
        const d = await r.json();
        if (d.success && d.messages) {
            clanMessages = d.messages.map(m => ({
                user: m.username || 'Аноним',
                avatar: m.avatar || '👤',
                text: m.message || m.text,
                time: m.time || new Date(m.created_at).toLocaleTimeString('ru', {hour:'2-digit', minute:'2-digit'})
            }));
            clanMessagesLoaded = true;
        }
    } catch(e) {
        console.log('Failed to load clan messages');
    }
}

setInterval(async () => {
    if (view === 'clan' && state.clanId) {
        await loadClanMessages();
        render();
    }
}, 5000);

function getTelegramId() {
    const tg = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (tg?.id) { localStorage.setItem('tg_id', String(tg.id)); return String(tg.id); }
    let id = localStorage.getItem('tg_id') || localStorage.getItem('local_id');
    if (!id) { id = 'local_' + Math.random().toString(36).substr(2,10); localStorage.setItem('local_id', id); }
    return id;
}

function haptic(type) {
    try {
        if (type === 'success' || type === 'error' || type === 'warning')
            window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred(type);
        else if (type === 'selection')
            window.Telegram?.WebApp?.HapticFeedback?.selectionChanged();
        else
            window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(type || 'light');
    } catch(e) {}
}

function saveState() {
    localStorage.setItem('cs_state', JSON.stringify(state));
    fetch(`${API_URL}/user/${getTelegramId()}`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify(state)
    }).catch(()=>{});
}

async function loadState() {
    const local = localStorage.getItem('cs_state');
    if (local) { try { Object.assign(state, JSON.parse(local)); } catch(e){} }
    try {
        const r = await fetch(`${API_URL}/user/${getTelegramId()}`);
        const d = await r.json();
        if (d.success && d.exists && d.data) {
            const s = d.data;
            state.xp = Math.max(state.xp, s.xp||0);
            state.level = Math.max(state.level, s.level||1);
            state.gems = Math.max(state.gems, s.gems||0);
            state.streak = Math.max(state.streak, s.streak||0);
            state.totalLessons = Math.max(state.totalLessons, s.totalLessons||0);
            state.lastWheelSpin = Math.max(state.lastWheelSpin||0, s.lastWheelSpin||0);
            if (s.completedLessons) state.completedLessons = [...new Set([...state.completedLessons, ...s.completedLessons])];
            if (s.completedSkills) state.completedSkills = [...new Set([...state.completedSkills, ...s.completedSkills])];
            if (s.achievements) state.achievements = [...new Set([...state.achievements, ...s.achievements])];
            if (s.owned) state.owned = [...new Set([...state.owned, ...s.owned])];
            localStorage.setItem('cs_state', JSON.stringify(state));
        }
    } catch(e) { console.warn('Server unavailable'); }
}

function addXP(amount) {
    const mult = state.premium ? 2 : 1;
    const totalAmount = amount * mult;

    let xp = state.xp + totalAmount;
    while (xp >= state.xpNext) {
        xp -= state.xpNext;
        state.level++;
        state.xpNext = Math.floor(100 * Math.pow(1.2, state.level - 1));
        haptic('success');
    }
    state.xp = xp;

    addBattlePassXP(totalAmount);
}

function addBattlePassXP(amount) {
    if (state.bpLevel >= 30) return;
    
    state.bpXP += amount;
    const xpNeeded = getBPXPNeeded(state.bpLevel);
    
    while (state.bpXP >= xpNeeded && state.bpLevel < 30) {
        state.bpXP -= xpNeeded;
        state.bpLevel++;
        haptic('success');
        // Notification
        console.log('Battle Pass уровень ' + state.bpLevel + '!');
    }
}

function getBPXPNeeded(level) {
    return 100 + (level - 1) * 50;
}

function isUnlocked(skill) {
    if (isAdmin()) return true;
    if (skill.alwaysOpen) return true;
    if (!skill.req || !skill.req.length) return true;
    return skill.req.every(r => state.completedSkills.includes(r));
}

function getProgress(skill) {
    if (!skill.lessons || !skill.lessons.length) return 0;
    return skill.lessons.filter(l => state.completedLessons.includes(l.id)).length / skill.lessons.length * 100;
}

function checkAnswer(exercise, userAns) {
    const correct = exercise.answer;
    const clean = s => s.trim().toLowerCase().replace(/\s+/g,' ');
    if (Array.isArray(correct)) return correct.some(c => clean(userAns) === clean(c));
    return clean(userAns) === clean(correct);
}

function checkAchievements() {
    const earn = id => { if (!state.achievements.includes(id)) { state.achievements.push(id); haptic('success'); } };
    if (state.totalLessons >= 1) earn('first-lesson');
    if (state.totalLessons >= 10) earn('coder-10');
    if (state.streak >= 7) earn('streak-7');
    if (state.streak >= 30) earn('streak-30');
    if (state.perfectLessons >= 1) earn('perfect');
    if (state.nightLessons >= 1) earn('night-owl');
    if (state.xp >= 1000) earn('xp-1000');
    if (state.completedSkills.length >= 1) earn('skill-complete');
    if (state.gems >= 1000) earn('collector');
}

function render() {
    const app = $('app');
    app.innerHTML = '';

    if (petState.type && !['lesson', 'complete'].includes(view)) {
        const pet = PET_TYPES[petState.type];
        const petHtml = `
            <div id="floating-pet" style="
                position: fixed;
                bottom: 80px;
                left: ${petState.x}%;
                transform: translateX(-50%);
                z-index: 1000;
                cursor: pointer;
                transition: left 0.3s ease;
            " onclick="openPetMenu()">
                <div class="pet-message" style="
                    display: ${petState.message ? 'block' : 'none'};
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    background: white;
                    color: #333;
                    padding: 8px 12px;
                    border-radius: 12px;
                    font-size: 12px;
                    white-space: nowrap;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    margin-bottom: 8px;
                    animation: petBounce 0.3s ease;
                ">${petState.message || ''}</div>
                <div class="pet-sprite" style="
                    font-size: 24px;
                    text-shadow: 0 2px 8px rgba(0,0,0,0.2);
                    animation: petFloat 2s ease-in-out infinite;
                    transform: scaleX(${petState.direction});
                ">${getPetFrame()}</div>
                <div style="
                    position: absolute;
                    bottom: -8px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 30px;
                    height: 6px;
                    background: rgba(0,0,0,0.1);
                    border-radius: 50%;
                "></div>
            </div>
        `;
        app.insertAdjacentHTML('beforeend', petHtml);
    }

    if (view === 'lesson') { renderLesson(app); return; }
    if (view === 'complete') { renderComplete(app); return; }

    if (!['lesson','complete'].includes(view)) {
        const header = h('div', {class:'header'},
            h('div', {class:'header-left'},
                h('span', {class:'streak-fire'}, '🔥'),
                h('span', {class:'streak-num'}, String(state.streak)),
                h('span', {class:'sync-dot ok'})
            ),
            h('div', {class:'header-right'},
                h('div', {class:'hearts'}, ...[...Array(state.maxHearts)].map((_,i) =>
                    h('span', {class:'heart'+(i>=state.hearts?' empty':'')}, '❤️')
                )),
                h('div', {class:'gems-badge'}, '💎 ', String(state.gems))
            )
        );
        app.appendChild(header);
    }

    const content = h('div', {class:'content'});
    if (view === 'home') renderHome(content);
    else if (view === 'skill') renderSkillDetail(content);
    else if (view === 'practice') renderPractice(content);
    else if (view === 'wheel') renderWheel(content);
    else if (view === 'sandbox') renderSandbox(content);
    else if (view === 'duel') renderDuel(content);
    else if (view === 'leaderboard') renderLeaderboard(content);
    else if (view === 'shop') renderShop(content);
    else if (view === 'profile') renderProfile(content);
    else if (view === 'achievements') renderAchievements(content);
    else if (view === 'clan') renderClan(content);
    else if (view === 'friends') renderFriends(content);
    else if (view === 'battlepass') renderBattlePass(content);
    else if (view === 'settings') renderSettings(content);
    app.appendChild(content);

    if (!['lesson','complete','skill','wheel','sandbox','duel','achievements','clan','friends','battlepass','settings'].includes(view)) {
        const tabs = h('div', {class:'tab-bar'},
            ...[ ['home','🏠','Учить'], ['practice','🎯','Практика'], ['leaderboard','🏆','Лидеры'], ['shop','🛒','Магазин'], ['profile','👤','Профиль'] ].map(([id,icon,label]) =>
                h('button', {class:'tab'+(view===id?' active':''), onClick:()=>{ view=id; haptic('selection'); render(); }},
                    h('span', {class:'tab-icon'}, icon),
                    h('span', {}, label)
                )
            )
        );
        app.appendChild(tabs);
    }
}

function renderHome(el) {
    const skills = getSkills();
    const practiceSkills = getPracticeSkills();
    const languages = getLanguages();
    const currentLang = languages.find(l => l.id === currentLanguage) || languages[0];

    el.appendChild(h('div', {style:{padding:'16px 16px 8px'}},
        h('div', {style:{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px'}},
            h('h2', {style:{fontSize:'16px',fontWeight:700,color:'var(--hint)'}}, '🌍 Выбери язык'),
            h('span', {class:'text-sm text-hint'}, languages.filter(l=>l.available).length + ' доступно')
        ),
        h('div', {style:{display:'flex',gap:'8px',overflowX:'auto',paddingBottom:'8px'}},
            ...languages.map(lang => {
                const isActive = lang.id === currentLanguage;
                const isAvailable = lang.available || state.premium;
                return h('button', {
                    style:{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        padding:'12px 16px',
                        borderRadius:'16px',
                        border: isActive ? '2px solid var(--primary)' : '2px solid var(--border)',
                        background: isActive ? 'linear-gradient(135deg,rgba(139,92,246,0.15),rgba(59,130,246,0.15))' : 'var(--card)',
                        cursor: isAvailable ? 'pointer' : 'not-allowed',
                        opacity: isAvailable ? 1 : 0.5,
                        minWidth:'80px',
                        fontFamily:'inherit',
                        color:'var(--text)',
                        transition:'all 0.2s',
                        position:'relative'
                    },
                    onClick: () => {
                        if (isAvailable) switchLanguage(lang.id);
                        else if (lang.premium) { haptic('error'); alert('Доступно для Premium!'); }
                    }
                },
                    lang.premium && !state.premium ? h('div', {style:{position:'absolute',top:'-4px',right:'-4px',fontSize:'12px'}}, '👑') : null,
                    h('span', {style:{fontSize:'28px'}}, lang.icon),
                    h('span', {style:{fontSize:'12px',fontWeight:isActive?700:500,marginTop:'4px'}}, lang.name),
                    isActive ? h('span', {style:{fontSize:'10px',color:'var(--primary)',marginTop:'2px'}}, '✓ Выбран') : null
                );
            })
        )
    ));

    el.appendChild(h('div', {class:'text-center', style:{padding:'8px 16px 16px'}},
        h('h1', {style:{fontSize:'28px',fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}, 
            h('span', {}, currentLang.icon),
            h('span', {}, currentLang.name)
        ),
        h('p', {class:'text-hint'}, `${skills.length} тем • ${practiceSkills.length} практик`)
    ));

    if (practiceSkills.length > 0) {
        el.appendChild(h('div', {style:{padding:'0 16px 12px'}},
            h('h2', {style:{fontSize:'18px',fontWeight:700,display:'flex',alignItems:'center',gap:'8px'}}, 
                h('span', {}, '🎯'), 
                'Практика ',
                h('span', {style:{fontSize:'12px',fontWeight:600,padding:'2px 8px',borderRadius:'10px',background:'#10B981',color:'white'}}, 'открыто')
            )
        ));
        
        const practiceGrid = h('div', {style:{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(100px, 1fr))',gap:'12px',padding:'0 16px 20px'}});
        
        practiceSkills.forEach(skill => {
            const progress = getProgress(skill);
            const completed = progress === 100;
            
            const node = h('div', {style:{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                padding:'16px 8px',
                borderRadius:'16px',
                background:'var(--card)',
                border:'2px solid ' + (completed ? '#10B981' : skill.color || '#10B981'),
                cursor:'pointer',
                transition:'all 0.2s'
            }, onClick:()=>{ selectedSkill=skill; view='skill'; haptic('medium'); render(); }},
                h('div', {style:{fontSize:'32px',marginBottom:'8px'}}, skill.icon),
                h('div', {style:{fontSize:'12px',fontWeight:600,textAlign:'center',color:'var(--text)'}}, skill.title.replace('🎯 ','').replace('🏆 ','')),
                progress > 0 ? h('div', {style:{width:'100%',height:'4px',background:'var(--border)',borderRadius:'2px',marginTop:'8px',overflow:'hidden'}},
                    h('div', {style:{width:progress+'%',height:'100%',background:completed?'#10B981':skill.color||'#10B981'}})
                ) : null,
                completed ? h('div', {style:{color:'#10B981',fontSize:'12px',marginTop:'4px'}}, '✓') : null
            );
            practiceGrid.appendChild(node);
        });
        el.appendChild(practiceGrid);
    }

    el.appendChild(h('div', {style:{padding:'0 16px 12px'}},
        h('h2', {style:{fontSize:'18px',fontWeight:700,display:'flex',alignItems:'center',gap:'8px'}}, 
            h('span', {}, '📚'), 
            'Основной курс'
        )
    ));

    const tree = h('div', {class:'skill-tree'});
    skills.forEach((skill, i) => {
        const unlocked = isUnlocked(skill);
        const progress = getProgress(skill);
        const completed = state.completedSkills.includes(skill.id);
        const current = unlocked && !completed && skill.lessons.length > 0;

        if (i > 0) tree.appendChild(h('div', {class:'skill-connector '+(unlocked?'active':'locked')}));

        const node = h('div', {class:'skill-node '+(completed?'completed':current?'available current':unlocked&&skill.lessons.length?'available':'locked'),
            onClick:()=>{ if (unlocked && skill.lessons.length) { selectedSkill=skill; view='skill'; haptic('medium'); render(); } else if (!unlocked) haptic('error'); }
        }, skill.icon);

        if (progress > 0 && progress < 100) {
            const ring = h('div', {class:'skill-progress-ring'}, h('div', {class:'skill-progress-fill', style:{width:progress+'%'}}));
            node.appendChild(ring);
        }
        if (completed) node.appendChild(h('div', {class:'skill-badge'}, '✓'));

        const wrap = h('div', {style:{display:'flex',flexDirection:'column',alignItems:'center'}});
        wrap.appendChild(node);
        wrap.appendChild(h('span', {class:'skill-label'+(unlocked?'':' locked')}, skill.title));
        if (!skill.lessons.length) wrap.appendChild(h('span', {class:'text-sm text-hint'}, 'Скоро'));
        tree.appendChild(wrap);
    });
    el.appendChild(tree);
}

function renderSkillDetail(el) {
    if (!selectedSkill) return;
    const sk = selectedSkill;
    el.appendChild(h('button', {class:'menu-item', style:{margin:'16px',width:'auto'}, onClick:()=>{ view='home'; render(); }}, '← Назад'));
    el.appendChild(h('div', {class:'text-center', style:{padding:'0 16px 16px'}},
        h('div', {class:'animate-bounce', style:{fontSize:'56px'}}, sk.icon),
        h('h1', {style:{fontSize:'22px',fontWeight:800,marginTop:'8px'}}, sk.title),
        h('p', {class:'text-hint'}, sk.desc)
    ));
    sk.lessons.forEach((lesson, i) => {
        const done = state.completedLessons.includes(lesson.id);
        const prevDone = i === 0 || state.completedLessons.includes(sk.lessons[i-1].id);
        const avail = isAdmin() ? true : (prevDone && !done); // Админ может открыть любой урок
        const btn = h('button', {class:'menu-item', style:{opacity:(!avail&&!done&&!isAdmin())?0.5:1, border:avail?'2px solid var(--primary)':'none'},
            onClick:()=>{ if (avail||done||isAdmin()) startLesson(sk, i); }
        },
            h('div', {style:{width:'40px',height:'40px',borderRadius:'50%',background:done?'var(--primary)':avail?'var(--primary)':'var(--border)',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:'16px'}}, done?'✓':String(i+1)),
            h('div', {class:'menu-label'}, h('div', {class:'menu-title'}, lesson.title), h('div', {class:'menu-desc'}, lesson.exercises.length+' упражнений')),
            (!avail && !done) ? h('span', {}, '🔒') : null
        );
        el.appendChild(btn);
    });
    const card = h('div', {class:'card', style:{margin:'16px'}},
        h('div', {class:'flex justify-between', style:{marginBottom:'8px'}},
            h('span', {class:'font-bold'}, 'Прогресс'),
            h('span', {style:{color:'var(--primary)',fontWeight:700}}, Math.round(getProgress(sk))+'%')
        ),
        h('div', {class:'progress-bar'}, h('div', {class:'progress-fill', style:{width:getProgress(sk)+'%'}}))
    );
    el.appendChild(card);
}

function startLesson(skill, idx) {
    if (state.hearts <= 0 && !state.premium) { haptic('error'); alert('Нет жизней! Подожди или купи в магазине.'); return; }
    currentLesson = { skill, idx };
    exerciseIdx = 0; mistakes = 0; answer = ''; result = null; selectedOpt = null;
    earnedXP = 0;
    correctCount = 0;
    view = 'lesson';
    haptic('medium');
    render();
}

function renderLesson(el) {
    if (!currentLesson) return;
    const lesson = currentLesson.skill.lessons[currentLesson.idx];
    const ex = lesson.exercises[exerciseIdx];
    const progress = (exerciseIdx + 1) / lesson.exercises.length * 100;

    const header = h('div', {style:{padding:'16px',display:'flex',alignItems:'center',gap:'12px'}},
        h('button', {style:{fontSize:'22px',background:'none',border:'none',cursor:'pointer',color:'var(--text)'}, onClick:()=>{ view='home'; currentLesson=null; render(); }}, '✕'),
        h('div', {class:'progress-bar', style:{flex:1,height:'10px'}}, h('div', {class:'progress-fill', style:{width:progress+'%'}})),
        h('span', {class:'text-sm font-bold'}, `${exerciseIdx+1}/${lesson.exercises.length}`)
    );
    el.appendChild(header);

    const body = h('div', {style:{padding:'16px',flex:1,overflowY:'auto'}});

    const types = {choice:'🎯 Выбери ответ', insert:'✏️ Вставь', write:'💻 Напиши код', fix:'🔧 Исправь', translate:'📝 Переведи', card:'📚 Запомни', theory:'📖 Теория'};
    body.appendChild(h('div', {style:{marginBottom:'12px'}},
        h('span', {style:{fontSize:'12px',fontWeight:600,padding:'4px 10px',borderRadius:'20px',background:ex.type==='theory'?'linear-gradient(135deg,#3b82f6,#8b5cf6)':'var(--card)',color:ex.type==='theory'?'white':'inherit'}}, types[ex.type]||'')
    ));

    body.appendChild(h('h2', {style:{fontSize:'20px',fontWeight:700,marginBottom:'16px'}}, ex.q));

    if (ex.code) body.appendChild(h('pre', {class:'code-block', style:{marginBottom:'16px'}}, ex.code));

    if (ex.type === 'choice' && ex.opts) {
        const grid = h('div', {style:{display:'flex',flexDirection:'column',gap:'10px'}});
        ex.opts.forEach(opt => {
            let cls = 'option-btn';
            if (result && opt === (Array.isArray(ex.answer)?ex.answer[0]:ex.answer)) cls += ' correct';
            else if (result && selectedOpt === opt && result === 'wrong') cls += ' wrong';
            else if (selectedOpt === opt) cls += ' selected';
            grid.appendChild(h('button', {class:cls, onClick:()=>{ if (!result) { selectedOpt=opt; submitAnswer(opt); } }}, opt));
        });
        body.appendChild(grid);
    }

    if (ex.type === 'insert' && ex.opts) {
        const grid = h('div', {style:{display:'flex',flexWrap:'wrap',gap:'8px'}});
        ex.opts.forEach(opt => {
            let cls = 'insert-btn';
            if (result && opt === ex.answer) cls += ' correct';
            else if (result && selectedOpt === opt && result === 'wrong') cls += ' wrong';
            else if (selectedOpt === opt) cls += ' selected';
            grid.appendChild(h('button', {class:cls, onClick:()=>{ if (!result) { selectedOpt=opt; submitAnswer(opt); } }}, opt));
        });
        body.appendChild(grid);
    }

    if (['write','fix','translate'].includes(ex.type)) {
        const ta = h('textarea', {class:'code-input', placeholder:'Напиши код...', value:answer});
        ta.value = answer;
        ta.addEventListener('input', e => { answer = e.target.value; });
        ta.disabled = !!result;
        body.appendChild(ta);
        if (!result) {
            body.appendChild(h('button', {class:'btn btn-primary', style:{marginTop:'12px'}, onClick:()=>submitAnswer(answer)}, 'Проверить'));
        }
    }

    if (ex.type === 'card') {
        body.appendChild(h('div', {class:'card text-center', style:{padding:'24px',margin:'0'}},
            h('div', {style:{fontSize:'48px',marginBottom:'12px'}}, '📚'),
            h('p', {style:{fontSize:'16px',fontWeight:500}}, Array.isArray(ex.answer)?ex.answer[0]:ex.answer),
            !result ? h('button', {class:'btn btn-primary', style:{marginTop:'16px'}, onClick:()=>{ result='correct'; saveState(); render(); }}, 'Понятно! 👍') : null
        ));
    }

    if (ex.type === 'theory') {
        body.appendChild(h('div', {class:'card', style:{padding:'24px',margin:'0',background:'linear-gradient(135deg,rgba(59,130,246,0.1),rgba(139,92,246,0.1))',border:'2px solid #3b82f6'}},
            h('div', {style:{fontSize:'48px',marginBottom:'12px',textAlign:'center'}}, '📖'),
            h('div', {style:{fontSize:'15px',lineHeight:'1.6',whiteSpace:'pre-wrap'}}, ex.text),
            ex.code ? h('pre', {class:'code-block', style:{marginTop:'16px',background:'rgba(0,0,0,0.1)',padding:'12px',borderRadius:'8px',fontSize:'14px'}}, ex.code) : null,
            !result ? h('button', {class:'btn btn-primary', style:{marginTop:'20px',width:'100%'}, onClick:()=>{ result='correct'; render(); }}, 'Понятно! Далее →') : null
        ));
    }

    if (result) {
        const fb = h('div', {class:'feedback '+(result==='correct'?'correct':'wrong')},
            h('span', {class:'feedback-icon'}, result==='correct'?'🎉':'😢'),
            h('div', {},
                h('div', {class:'feedback-title '+(result==='correct'?'correct':'wrong')}, result==='correct'?'Правильно!':'Неправильно'),
                result==='wrong' ? h('div', {class:'text-sm', style:{marginTop:'4px'}}, 'Ответ: ', h('code', {style:{background:'rgba(0,0,0,0.1)',padding:'2px 6px',borderRadius:'4px'}}, Array.isArray(ex.answer)?ex.answer[0]:ex.answer)) : null
            )
        );
        body.appendChild(fb);
    }

    el.appendChild(body);

    if (result) {
        el.appendChild(h('div', {style:{padding:'16px',borderTop:'1px solid var(--border)'}},
            h('button', {class:'btn '+(result==='correct'?'btn-primary':'btn-danger'), onClick:nextExercise},
                exerciseIdx < lesson.exercises.length - 1 ? 'Продолжить' : 'Завершить урок'
            )
        ));
    }
}

function submitAnswer(ans) {
    if (result) return;
    const lesson = currentLesson.skill.lessons[currentLesson.idx];
    const ex = lesson.exercises[exerciseIdx];

    if (ex.type === 'card' || ex.type === 'theory') {
        result = 'correct';
        render();
        return;
    }
    
    if (checkAnswer(ex, ans)) {
        result = 'correct'; 
        haptic('success');
        const xpGained = ex.xp || 10;
        earnedXP += xpGained;
        correctCount++;
        addXP(xpGained);

        petReactCorrect();
    } else {
        result = 'wrong'; 
        haptic('error'); 
        mistakes++;
        if (!state.premium) state.hearts = Math.max(0, state.hearts - 1);

        petReactWrong();
    }
    saveState(); 
    render();
}

function openPetMenu() {
    const pet = PET_TYPES[petState.type];
    if (!pet) return;
    
    haptic('light');

    const modal = document.createElement('div');
    modal.id = 'pet-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: fadeIn 0.2s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: var(--card);
            color: var(--text);
            border-radius: 24px;
            padding: 24px;
            max-width: 320px;
            width: 100%;
            text-align: center;
            animation: slideUp 0.3s ease;
            border: 1px solid var(--border);
        ">
            <div style="font-size: 64px; margin-bottom: 8px;">${getPetFrame()}</div>
            <h2 style="font-size: 20px; font-weight: 800; margin: 0; color: var(--text);">${pet.name}</h2>
            <p style="color: var(--hint); font-size: 14px; margin: 4px 0 16px;">Твой верный компаньон</p>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px;">
                <div style="padding: 12px; background: var(--bg); border-radius: 12px; border: 1px solid var(--border);">
                    <div style="font-size: 20px;">🍖</div>
                    <div style="font-size: 12px; color: var(--hint);">Сытость</div>
                    <div style="font-weight: 700; color: ${petState.hunger > 50 ? '#4caf50' : '#f44336'};">${Math.round(petState.hunger)}%</div>
                </div>
                <div style="padding: 12px; background: var(--bg); border-radius: 12px; border: 1px solid var(--border);">
                    <div style="font-size: 20px;">💕</div>
                    <div style="font-size: 12px; color: var(--hint);">Счастье</div>
                    <div style="font-weight: 700; color: ${petState.happiness > 50 ? '#4caf50' : '#f44336'};">${Math.round(petState.happiness)}%</div>
                </div>
                <div style="padding: 12px; background: var(--bg); border-radius: 12px; border: 1px solid var(--border);">
                    <div style="font-size: 20px;">⚡</div>
                    <div style="font-size: 12px; color: var(--hint);">Энергия</div>
                    <div style="font-weight: 700; color: ${petState.energy > 50 ? '#4caf50' : '#f44336'};">${Math.round(petState.energy)}%</div>
                </div>
            </div>
            
            <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                <button onclick="feedPet(); closePetModal();" style="
                    flex: 1;
                    padding: 12px;
                    border: none;
                    border-radius: 12px;
                    background: linear-gradient(135deg, #ff9800, #ff5722);
                    color: white;
                    font-weight: 700;
                    cursor: pointer;
                    font-family: inherit;
                ">🐟 Покормить</button>
                <button onclick="petThePet(); closePetModal();" style="
                    flex: 1;
                    padding: 12px;
                    border: none;
                    border-radius: 12px;
                    background: linear-gradient(135deg, #e91e63, #9c27b0);
                    color: white;
                    font-weight: 700;
                    cursor: pointer;
                    font-family: inherit;
                ">💕 Погладить</button>
            </div>
            
            <button onclick="openPetSelector();" style="
                width: 100%;
                padding: 12px;
                border: none;
                border-radius: 12px;
                background: var(--bg);
                color: var(--text);
                font-weight: 600;
                cursor: pointer;
                font-family: inherit;
                margin-bottom: 8px;
                border: 1px solid var(--border);
            ">🔄 Сменить питомца</button>
            
            <button onclick="closePetModal();" style="
                width: 100%;
                padding: 12px;
                border: none;
                border-radius: 12px;
                background: transparent;
                color: var(--hint);
                font-weight: 600;
                cursor: pointer;
                font-family: inherit;
            ">Закрыть</button>
        </div>
    `;
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closePetModal();
    });
    
    document.body.appendChild(modal);
}

function closePetModal() {
    const modal = document.getElementById('pet-modal');
    if (modal) modal.remove();
    render();
}

function openPetSelector() {
    closePetModal();
    
    const ownedPets = Object.keys(PET_TYPES).filter(type => state.owned.includes('pet-' + type));
    
    if (ownedPets.length === 0) {
        alert('У тебя пока нет питомцев! Купи в магазине 🛒');
        view = 'shop';
        render();
        return;
    }
    
    const modal = document.createElement('div');
    modal.id = 'pet-selector-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: fadeIn 0.2s ease;
    `;
    
    let petsHtml = '';
    Object.entries(PET_TYPES).forEach(([type, pet]) => {
        const owned = state.owned.includes('pet-' + type);
        const active = petState.type === type;
        petsHtml += `
            <button onclick="${owned ? `selectPet('${type}'); closePetSelectorModal();` : ''}" style="
                padding: 16px;
                border: 2px solid ${active ? 'var(--primary)' : 'var(--border)'};
                border-radius: 16px;
                background: ${active ? 'rgba(139,92,246,0.1)' : 'var(--card)'};
                cursor: ${owned ? 'pointer' : 'not-allowed'};
                opacity: ${owned ? 1 : 0.5};
                text-align: center;
                font-family: inherit;
            ">
                <div style="font-size: 40px; margin-bottom: 8px;">${pet.icon}</div>
                <div style="font-weight: 700; font-size: 14px; color: var(--text);">${pet.name}</div>
                ${!owned ? '<div style="font-size: 11px; color: var(--hint);">🔒 В магазине</div>' : ''}
                ${active ? '<div style="font-size: 11px; color: var(--primary);">✓ Выбран</div>' : ''}
            </button>
        `;
    });
    
    modal.innerHTML = `
        <div style="
            background: var(--card);
            color: var(--text);
            border-radius: 24px;
            padding: 24px;
            max-width: 360px;
            width: 100%;
            animation: slideUp 0.3s ease;
            border: 1px solid var(--border);
        ">
            <h2 style="font-size: 20px; font-weight: 800; text-align: center; margin: 0 0 16px; color: var(--text);">🐾 Выбери питомца</h2>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
                ${petsHtml}
            </div>
            <button onclick="petState.type = null; savePetState(); closePetSelectorModal(); render();" style="
                width: 100%;
                padding: 12px;
                margin-top: 16px;
                border: 1px solid var(--border);
                border-radius: 12px;
                background: var(--bg);
                color: var(--hint);
                font-weight: 600;
                cursor: pointer;
                font-family: inherit;
            ">🚫 Без питомца</button>
            <button onclick="closePetSelectorModal();" style="
                width: 100%;
                padding: 12px;
                margin-top: 8px;
                border: none;
                border-radius: 12px;
                background: transparent;
                color: var(--hint);
                font-weight: 600;
                cursor: pointer;
                font-family: inherit;
            ">Отмена</button>
        </div>
    `;
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closePetSelectorModal();
    });
    
    document.body.appendChild(modal);
}

function closePetSelectorModal() {
    const modal = document.getElementById('pet-selector-modal');
    if (modal) modal.remove();
    render();
}

function openAvatarSelector() {
    const modal = document.createElement('div');
    modal.id = 'avatar-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: fadeIn 0.2s ease;
        overflow-y: auto;
    `;
    
    const rarityColors = {
        common: '#9ca3af',
        rare: '#3b82f6',
        epic: '#8b5cf6',
        legendary: '#f59e0b',
        mythic: '#ef4444'
    };
    
    const rarityNames = {
        common: 'Обычный',
        rare: 'Редкий',
        epic: 'Эпический',
        legendary: 'Легендарный',
        mythic: 'Мифический'
    };
    
    let avatarsHtml = '';
    const categories = ['common', 'rare', 'epic', 'legendary', 'mythic'];
    
    categories.forEach(rarity => {
        const avatarsInCategory = AVATARS.filter(a => a.rarity === rarity);
        if (avatarsInCategory.length === 0) return;
        
        avatarsHtml += `
            <div style="margin-bottom: 16px;">
                <div style="font-size: 14px; font-weight: 700; color: ${rarityColors[rarity]}; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                    <span style="width: 12px; height: 12px; background: ${rarityColors[rarity]}; border-radius: 50%;"></span>
                    ${rarityNames[rarity]}
                </div>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
        `;
        
        avatarsInCategory.forEach(avatar => {
            const owned = avatar.price === 0 || state.owned.includes('avatar-' + avatar.id);
            const isActive = state.avatar === avatar.icon;
            const canBuy = state.gems >= avatar.price;
            
            avatarsHtml += `
                <button onclick="${owned ? `selectAvatar('${avatar.icon}')` : canBuy ? `buyAvatar('${avatar.id}', ${avatar.price}, '${avatar.icon}')` : ''}" style="
                    padding: 12px 8px;
                    border: 2px solid ${isActive ? 'var(--primary)' : owned ? 'transparent' : 'var(--border)'};
                    border-radius: 12px;
                    background: ${isActive ? 'rgba(139,92,246,0.15)' : 'var(--card)'};
                    cursor: ${owned || canBuy ? 'pointer' : 'not-allowed'};
                    opacity: ${owned || canBuy ? 1 : 0.5};
                    text-align: center;
                    font-family: inherit;
                    transition: all 0.2s;
                    position: relative;
                ">
                    ${avatar.premium && !state.premium ? '<div style="position: absolute; top: 2px; right: 2px; font-size: 10px;">👑</div>' : ''}
                    <div style="font-size: 28px; margin-bottom: 4px;">${avatar.icon}</div>
                    <div style="font-size: 10px; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${avatar.name}</div>
                    ${isActive ? '<div style="font-size: 9px; color: var(--primary); margin-top: 2px;">✓ Выбран</div>' : 
                      owned ? '' : 
                      `<div style="font-size: 10px; color: ${canBuy ? 'var(--primary)' : 'var(--hint)'}; margin-top: 2px;">${avatar.price} 💎</div>`}
                </button>
            `;
        });
        
        avatarsHtml += `
                </div>
            </div>
        `;
    });
    
    modal.innerHTML = `
        <div style="
            background: var(--card, white);
            border-radius: 24px;
            padding: 20px;
            max-width: 380px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideUp 0.3s ease;
        ">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                <h2 style="font-size: 20px; font-weight: 800; margin: 0;">🎭 Выбор аватара</h2>
                <div style="display: flex; align-items: center; gap: 4px; background: var(--bg); padding: 6px 12px; border-radius: 20px;">
                    <span>💎</span>
                    <span style="font-weight: 700;">${state.gems}</span>
                </div>
            </div>
            
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #8b5cf6, #ec4899);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 48px;
                    margin: 0 auto;
                    box-shadow: 0 8px 24px rgba(139,92,246,0.3);
                ">${state.avatar}</div>
                <div style="font-size: 14px; color: var(--hint); margin-top: 8px;">Текущий аватар</div>
            </div>
            
            ${avatarsHtml}
            
            <button onclick="closeAvatarModal();" style="
                width: 100%;
                padding: 14px;
                border: none;
                border-radius: 12px;
                background: var(--primary);
                color: white;
                font-weight: 700;
                cursor: pointer;
                font-family: inherit;
                font-size: 16px;
                margin-top: 8px;
            ">Готово</button>
        </div>
    `;
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeAvatarModal();
    });
    
    document.body.appendChild(modal);
}

function closeAvatarModal() {
    const modal = document.getElementById('avatar-modal');
    if (modal) modal.remove();
    render();
}

function selectAvatar(icon) {
    state.avatar = icon;
    haptic('success');
    saveState();
    // Update modal display
    const modal = document.getElementById('avatar-modal');
    if (modal) {
        closeAvatarModal();
        openAvatarSelector();
    } else {
        render();
    }
}

function buyAvatar(id, price, icon) {
    if (state.gems < price) {
        haptic('error');
        alert('Недостаточно гемов! Нужно ' + price + ' 💎');
        return;
    }
    
    if (confirm(`Купить аватар за ${price} 💎?`)) {
        state.gems -= price;
        state.owned.push('avatar-' + id);
        state.avatar = icon;
        haptic('success');
        saveState();

        closeAvatarModal();
        openAvatarSelector();
    }
}

function openFrameSelector() {
    const modal = document.createElement('div');
    modal.id = 'frame-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: fadeIn 0.2s ease;
    `;
    
    let framesHtml = '';
    AVATAR_FRAMES.forEach(frame => {
        const owned = frame.price === 0 || state.owned.includes('frame-' + frame.id);
        const isActive = (state.avatarFrame || 'none') === frame.id;
        const canBuy = state.gems >= frame.price;
        
        let frameStyle = frame.style;
        if (frame.gradient) {
            frameStyle = `border: ${frame.style}; border-image: ${frame.gradient} 1`;
        }
        
        framesHtml += `
            <button onclick="${owned ? `selectFrame('${frame.id}')` : canBuy ? `buyFrame('${frame.id}', ${frame.price})` : ''}" style="
                padding: 16px;
                border: 2px solid ${isActive ? 'var(--primary)' : 'var(--border)'};
                border-radius: 12px;
                background: ${isActive ? 'rgba(139,92,246,0.1)' : 'var(--card)'};
                cursor: ${owned || canBuy ? 'pointer' : 'not-allowed'};
                opacity: ${owned || canBuy ? 1 : 0.5};
                text-align: center;
                font-family: inherit;
            ">
                <div style="
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    ${frame.style !== 'none' ? frameStyle : ''}
                    ${frame.glow ? `box-shadow: ${frame.glow};` : ''}
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    margin: 0 auto 8px;
                    background: var(--bg);
                ">${state.avatar}</div>
                <div style="font-size: 12px; font-weight: 600;">${frame.name}</div>
                ${isActive ? '<div style="font-size: 10px; color: var(--primary);">✓</div>' : 
                  owned ? '' : 
                  `<div style="font-size: 10px; color: var(--hint);">${frame.price} 💎</div>`}
            </button>
        `;
    });
    
    modal.innerHTML = `
        <div style="
            background: var(--card, white);
            border-radius: 24px;
            padding: 24px;
            max-width: 360px;
            width: 100%;
            animation: slideUp 0.3s ease;
        ">
            <h2 style="font-size: 20px; font-weight: 800; text-align: center; margin: 0 0 16px;">✨ Рамки аватара</h2>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
                ${framesHtml}
            </div>
            <button onclick="closeFrameModal();" style="
                width: 100%;
                padding: 14px;
                margin-top: 16px;
                border: none;
                border-radius: 12px;
                background: var(--bg);
                color: var(--text);
                font-weight: 600;
                cursor: pointer;
                font-family: inherit;
            ">Закрыть</button>
        </div>
    `;
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeFrameModal();
    });
    
    document.body.appendChild(modal);
}

function closeFrameModal() {
    const modal = document.getElementById('frame-modal');
    if (modal) modal.remove();
    render();
}

function selectFrame(id) {
    state.avatarFrame = id;
    haptic('success');
    saveState();
    closeFrameModal();
}

function buyFrame(id, price) {
    if (state.gems < price) {
        haptic('error');
        alert('Недостаточно гемов!');
        return;
    }
    
    if (confirm(`Купить рамку за ${price} 💎?`)) {
        state.gems -= price;
        state.owned.push('frame-' + id);
        state.avatarFrame = id;
        haptic('success');
        saveState();
        closeFrameModal();
        openFrameSelector();
    }
}

function nextExercise() {
    const lesson = currentLesson.skill.lessons[currentLesson.idx];
    if (exerciseIdx < lesson.exercises.length - 1) {
        exerciseIdx++; answer=''; result=null; selectedOpt=null; render();
    } else {
        completeLesson();
    }
}

function completeLesson() {
    const lesson = currentLesson.skill.lessons[currentLesson.idx];
    const today = new Date().toDateString();
    if (!state.completedLessons.includes(lesson.id)) state.completedLessons.push(lesson.id);
    state.totalLessons++;
    if (state.lastActivity !== today) {
        const yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
        if (state.lastActivity === yesterday.toDateString() || !state.lastActivity) state.streak++;
    }
    state.lastActivity = today;
    if (mistakes === 0) state.perfectLessons++;
    if (new Date().getHours() < 6) state.nightLessons = (state.nightLessons||0) + 1;

    const sk = currentLesson.skill;
    if (sk.lessons.every(l => state.completedLessons.includes(l.id)) && !state.completedSkills.includes(sk.id)) {
        state.completedSkills.push(sk.id);
        state.gems += 50;
    }
    checkAchievements();
    saveState();
    view = 'complete'; render();
    setTimeout(()=>{ view='home'; currentLesson=null; render(); }, 3000);
}

function renderComplete(el) {
    const conf = h('div', {class:'confetti-container'});
    const colors = ['#ff6b6b','#4ecdc4','#45b7d1','#96e6a1','#ffeaa7','#fd79a8','#a29bfe'];
    for (let i=0;i<40;i++) {
        conf.appendChild(h('div', {class:'confetti-piece', style:{left:Math.random()*100+'%',background:colors[i%colors.length],animationDelay:Math.random()*2+'s'}}));
    }
    el.appendChild(conf);

    let totalPractice = 0;
    if (currentLesson && currentLesson.skill.lessons[currentLesson.idx]) {
        const exercises = currentLesson.skill.lessons[currentLesson.idx].exercises || [];
        totalPractice = exercises.filter(ex => ex.type !== 'theory' && ex.type !== 'card').length;
    }

    const accuracy = totalPractice > 0 ? Math.round((correctCount / totalPractice) * 100) : 100;
    
    el.appendChild(h('div', {class:'lesson-complete'},
        h('div', {class:'lc-emoji'}, '🎉'),
        h('div', {class:'lc-title'}, 'Урок пройден!'),
        h('div', {class:'lc-stats'},
            h('div', {class:'lc-stat'}, 
                h('div', {class:'lc-stat-value', style:{color:'var(--xp)'}}, '+' + earnedXP), 
                h('div', {class:'lc-stat-label'}, 'XP заработано')
            ),
            h('div', {class:'lc-stat'}, 
                h('div', {class:'lc-stat-value', style:{color:'#ffc800'}}, mistakes === 0 ? '💯' : accuracy + '%'), 
                h('div', {class:'lc-stat-label'}, 'Точность')
            )
        ),
        h('div', {style:{marginTop:'12px',fontSize:'14px',color:'var(--hint)'}}, 
            `✅ ${correctCount} правильно • ❌ ${mistakes} ошибок`
        ),
        mistakes === 0 ? h('div', {style:{marginTop:'16px',padding:'12px',background:'rgba(255,200,0,0.15)',borderRadius:'12px',color:'#b8860b',fontWeight:700}}, '⭐ Идеально! Ни одной ошибки!') : null
    ));
}

function renderPractice(el) {
    el.appendChild(h('h1', {class:'text-center', style:{padding:'20px',fontSize:'22px',fontWeight:800}}, '🎯 Практика'));
    const items = [
        ['🧠','Умная практика','Упражнения по слабым местам',()=>startSmartPractice()],
        ['🎡','Колесо фортуны','Крути и выигрывай!',()=>{ view='wheel'; render(); }],
        ['⚔️','Дуэль 1v1','Сразись с соперником',()=>{ view='duel'; render(); }],
        ['🧪','Песочница','Пиши и запускай код',()=>{ view='sandbox'; render(); }],
    ];
    items.forEach(([icon, title, desc, onClick]) => {
        el.appendChild(h('button', {class:'card', style:{display:'flex',alignItems:'center',gap:'16px',cursor:'pointer',border:'none',width:'calc(100% - 32px)',margin:'8px 16px',textAlign:'left',fontFamily:'inherit',color:'var(--text)'}, onClick:()=>{ haptic('medium'); onClick(); }},
            h('span', {style:{fontSize:'40px'}}, icon),
            h('div', {}, h('div', {style:{fontWeight:700,fontSize:'16px'}}, title), h('div', {class:'text-sm text-hint'}, desc))
        ));
    });
}

function startSmartPractice() {
    const skills = getSkills();
    const exercises = [];
    skills.forEach(sk => {
        if (!isUnlocked(sk)) return;
        sk.lessons.forEach(l => l.exercises.forEach(ex => exercises.push({...ex, skillId:sk.id})));
    });
    if (!exercises.length) { alert('Сначала пройди хотя бы один урок!'); return; }
    const shuffled = exercises.sort(()=>Math.random()-0.5).slice(0,10);
    currentLesson = { skill:{ lessons:[{ id:'practice', exercises:shuffled }] }, idx:0 };
    exerciseIdx=0; mistakes=0; answer=''; result=null; selectedOpt=null;
    view = 'lesson'; render();
}

function renderWheel(el) {
    el.appendChild(h('button', {class:'menu-item', style:{margin:'16px',width:'auto'}, onClick:()=>{ view='practice'; render(); }}, '← Назад'));
    
    const now = Date.now();
    const hoursSince = (now - (state.lastWheelSpin||0)) / (1000*60*60);
    const canSpin = hoursSince >= 24 || state.premium || !state.lastWheelSpin;

    const prizes = [
        {t:'xp', a:50, l:'+50 XP', color:'#3b82f6', icon:'⭐'},
        {t:'gems', a:25, l:'+25 💎', color:'#8b5cf6', icon:'💎'},
        {t:'xp', a:100, l:'+100 XP', color:'#10b981', icon:'🌟'},
        {t:'gems', a:50, l:'+50 💎', color:'#f59e0b', icon:'💰'},
        {t:'hearts', a:2, l:'+2 ❤️', color:'#ef4444', icon:'❤️'},
        {t:'xp', a:150, l:'+150 XP', color:'#06b6d4', icon:'✨'},
        {t:'gems', a:100, l:'+100 💎', color:'#ec4899', icon:'💠'},
        {t:'2xp', a:1, l:'2x XP', color:'#84cc16', icon:'⚡'}
    ];
    
    const segmentAngle = 360 / prizes.length;

    el.appendChild(h('div', {style:{textAlign:'center',padding:'0 16px 24px'}},
        h('h1', {style:{fontSize:'24px',fontWeight:800,color:'var(--text)',marginBottom:'4px'}}, '🎡 Колесо Фортуны'),
        h('p', {style:{color:'var(--hint)',fontSize:'14px'}}, canSpin ? 'Испытай удачу!' : 'Возвращайся завтра')
    ));

    const container = h('div', {style:{display:'flex',flexDirection:'column',alignItems:'center',padding:'0 16px'}});

    const wheelContainer = h('div', {id:'wheel-container', style:{
        position:'relative',
        width:'280px',
        height:'280px',
        margin:'0 auto'
    }});

    wheelContainer.appendChild(h('div', {style:{
        position:'absolute',
        top:'10px',
        left:'10px',
        right:'10px',
        bottom:'-10px',
        borderRadius:'50%',
        background:'rgba(0,0,0,0.2)',
        filter:'blur(15px)'
    }}));

    wheelContainer.appendChild(h('div', {style:{
        position:'absolute',
        top:'0',
        left:'0',
        width:'100%',
        height:'100%',
        borderRadius:'50%',
        background:'linear-gradient(135deg, #374151, #1f2937)',
        padding:'8px',
        boxSizing:'border-box'
    }}));

    const wheelInner = h('div', {id:'wheel-spinner', style:{
        position:'absolute',
        top:'8px',
        left:'8px',
        width:'264px',
        height:'264px',
        borderRadius:'50%',
        transform:`rotate(${wheelRot}deg)`,
        transition: wheelSpinning ? 'transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)' : 'none',
        overflow:'hidden'
    }});

    let gradientParts = [];
    prizes.forEach((prize, i) => {
        gradientParts.push(`${prize.color} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`);
    });
    wheelInner.style.background = `conic-gradient(from -${segmentAngle/2}deg, ${gradientParts.join(', ')})`;

    prizes.forEach((prize, i) => {
        const divider = h('div', {style:{
            position:'absolute',
            top:'50%',
            left:'50%',
            width:'50%',
            height:'2px',
            background:'rgba(255,255,255,0.3)',
            transformOrigin:'left center',
            transform:`rotate(${i * segmentAngle}deg)`
        }});
        wheelInner.appendChild(divider);

        const iconAngle = i * segmentAngle + segmentAngle / 2;
        const iconRadius = 85;
        const iconX = Math.cos((iconAngle - 90) * Math.PI / 180) * iconRadius;
        const iconY = Math.sin((iconAngle - 90) * Math.PI / 180) * iconRadius;
        
        const icon = h('div', {style:{
            position:'absolute',
            left:`calc(50% + ${iconX}px)`,
            top:`calc(50% + ${iconY}px)`,
            transform:'translate(-50%, -50%)',
            fontSize:'24px',
            textShadow:'0 2px 4px rgba(0,0,0,0.3)'
        }}, prize.icon);
        wheelInner.appendChild(icon);
    });

    const hub = h('div', {style:{
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%, -50%)',
        width:'60px',
        height:'60px',
        borderRadius:'50%',
        background:'linear-gradient(135deg, #f8fafc, #e2e8f0)',
        boxShadow:'0 4px 12px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.8)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        fontSize:'24px',
        zIndex:5
    }}, wheelSpinning ? '🎰' : '🎯');
    wheelInner.appendChild(hub);

    wheelContainer.appendChild(wheelInner);

    const pointer = h('div', {style:{
        position:'absolute',
        top:'-12px',
        left:'50%',
        transform:'translateX(-50%)',
        zIndex:10
    }});
    pointer.innerHTML = `
        <svg width="40" height="48" viewBox="0 0 40 48">
            <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
                </filter>
            </defs>
            <path d="M20 48 L4 8 L20 16 L36 8 Z" fill="#1f2937" filter="url(#shadow)"/>
            <path d="M20 44 L8 12 L20 18 L32 12 Z" fill="#ef4444"/>
        </svg>
    `;
    wheelContainer.appendChild(pointer);

    container.appendChild(wheelContainer);

    if (!canSpin) {
        const ms = 24*60*60*1000 - (now - state.lastWheelSpin);
        const hrs = Math.floor(ms/(1000*60*60));
        const mins = Math.floor((ms%(1000*60*60))/(1000*60));
        
        container.appendChild(h('div', {style:{
            marginTop:'20px',
            padding:'12px 24px',
            borderRadius:'12px',
            background:'var(--card)',
            border:'1px solid var(--border)',
            textAlign:'center'
        }},
            h('div', {style:{fontSize:'13px',color:'var(--hint)',marginBottom:'4px'}}, '⏰ Следующий спин'),
            h('div', {style:{fontSize:'24px',fontWeight:800,color:'var(--text)'}}, 
                `${hrs}ч ${mins}мин`
            )
        ));
    }

    const spinBtn = h('button', {style:{
        marginTop:'24px',
        padding:'14px 40px',
        borderRadius:'12px',
        border:'none',
        background: canSpin && !wheelSpinning 
            ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' 
            : '#374151',
        color:'white',
        fontSize:'16px',
        fontWeight:'700',
        cursor: canSpin && !wheelSpinning ? 'pointer' : 'not-allowed',
        boxShadow: canSpin && !wheelSpinning ? '0 4px 16px rgba(99,102,241,0.4)' : 'none',
        transition:'all 0.2s',
        fontFamily:'inherit',
        opacity: canSpin && !wheelSpinning ? 1 : 0.6
    }, onClick:()=>{
        if (wheelSpinning || !canSpin) return;
        
        wheelSpinning = true; 
        wheelPrize = null; 
        haptic('medium');

        const prizeIndex = Math.floor(Math.random() * prizes.length);
        const targetAngle = (prizes.length - prizeIndex - 1) * segmentAngle + segmentAngle / 2;

        const newRotation = wheelRot + 1800 + targetAngle;
        wheelRot = newRotation;

        render();

        setTimeout(()=>{
            const p = prizes[prizeIndex];

            if (p.t === 'xp') addXP(p.a);
            else if (p.t === 'gems') state.gems += p.a;
            else if (p.t === 'hearts') state.hearts = Math.min(state.maxHearts, state.hearts + p.a);
            else if (p.t === '2xp') {
                state.gems += 50;
            }
            
            state.lastWheelSpin = Date.now();
            wheelPrize = p; 
            wheelSpinning = false;
            haptic('success'); 
            saveState(); 
            render();
        }, 4000);
    }});
    spinBtn.textContent = wheelSpinning ? '🎰 Крутится...' : canSpin ? '🎯 Крутить!' : '⏰ Подожди';
    container.appendChild(spinBtn);

    if (wheelPrize && !wheelSpinning) {
        const overlay = h('div', {style:{
            position:'fixed',
            top:0,left:0,right:0,bottom:0,
            background:'rgba(0,0,0,0.7)',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            zIndex:1000
        }, onClick:()=>{ wheelPrize = null; render(); }});
        
        const popup = h('div', {style:{
            background:'var(--card)',
            borderRadius:'20px',
            padding:'32px',
            textAlign:'center',
            maxWidth:'280px',
            margin:'20px',
            boxShadow:'0 20px 40px rgba(0,0,0,0.3)'
        }, onClick:(e)=>e.stopPropagation()},
            h('div', {style:{fontSize:'56px',marginBottom:'12px'}}, '🎉'),
            h('h2', {style:{fontSize:'22px',fontWeight:800,marginBottom:'8px',color:'var(--text)'}}, 'Поздравляем!'),
            h('div', {style:{
                fontSize:'28px',
                fontWeight:800,
                color:wheelPrize.color,
                padding:'16px',
                margin:'12px 0',
                background:`${wheelPrize.color}15`,
                borderRadius:'12px',
                border:`2px solid ${wheelPrize.color}30`
            }}, wheelPrize.l),
            h('button', {style:{
                marginTop:'12px',
                padding:'12px 32px',
                borderRadius:'12px',
                border:'none',
                background:'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color:'white',
                fontSize:'15px',
                fontWeight:'700',
                cursor:'pointer',
                fontFamily:'inherit'
            }, onClick:()=>{ wheelPrize = null; render(); }}, 'Отлично!')
        );
        overlay.appendChild(popup);
        el.appendChild(overlay);
    }

    container.appendChild(h('div', {style:{
        marginTop:'24px',
        padding:'16px',
        borderRadius:'16px',
        background:'var(--card)',
        width:'100%',
        maxWidth:'320px',
        boxSizing:'border-box'
    }},
        h('div', {style:{fontWeight:700,marginBottom:'12px',fontSize:'14px',color:'var(--text)'}}, '🎁 Призы'),
        h('div', {style:{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'8px'}},
            ...prizes.map(p => 
                h('div', {style:{
                    padding:'10px 4px',
                    borderRadius:'10px',
                    background:`${p.color}15`,
                    textAlign:'center',
                    border:`1px solid ${p.color}30`
                }},
                    h('div', {style:{fontSize:'18px'}}, p.icon),
                    h('div', {style:{fontSize:'10px',fontWeight:600,color:'var(--text)',marginTop:'4px'}}, p.l.replace('+',''))
                )
            )
        )
    ));

    if (state.premium) {
        container.appendChild(h('div', {style:{
            marginTop:'12px',
            padding:'8px 16px',
            borderRadius:'8px',
            background:'rgba(139,92,246,0.15)',
            color:'#8b5cf6',
            fontSize:'12px',
            fontWeight:600
        }}, '👑 Безлимитные спины'));
    }

    container.appendChild(h('div', {style:{height:'100px'}}));

    el.appendChild(container);
}

function renderSandbox(el) {
    el.appendChild(h('div', {style:{padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid var(--border)'}},
        h('button', {style:{background:'none',border:'none',color:'var(--primary)',cursor:'pointer',fontFamily:'inherit',fontSize:'14px'}, onClick:()=>{ view='practice'; render(); }}, '← Назад'),
        h('b', {}, '🧪 Песочница'),
        h('button', {class:'btn btn-primary', style:{padding:'8px 16px',width:'auto',fontSize:'14px'}, onClick:runCode}, '▶ Run')
    ));
    const ta = h('textarea', {class:'code-input', style:{margin:'12px 16px',width:'calc(100% - 32px)',minHeight:'180px'}, placeholder:'# Python код...'});
    ta.value = sandboxCode;
    ta.addEventListener('input', e => { sandboxCode = e.target.value; });
    el.appendChild(ta);
    el.appendChild(h('div', {style:{padding:'0 16px'}},
        h('b', {}, '📟 Консоль'),
        h('div', {class:'console-output', style:{marginTop:'8px'}}, sandboxOutput || '# Вывод появится здесь')
    ));
    el.appendChild(h('div', {style:{display:'flex',gap:'8px',padding:'12px 16px'}},
        ...['print("Hello!")', 'for i in range(5):\n    print(i)', 'x=10\nprint(f"x={x}")'].map((code,i) =>
            h('button', {class:'btn btn-secondary', style:{padding:'8px',fontSize:'12px'}, onClick:()=>{ sandboxCode=code; render(); }}, '📄 '+(i+1))
        )
    ));
}

function runCode() {
    const lines = sandboxCode.split('\n');
    let out = '';
    const vars = {};
    for (let i=0;i<lines.length;i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith('#')) continue;
        const assign = line.match(/^(\w+)\s*=\s*(.+)$/);
        if (assign) {
            const [,name,val] = assign;
            if (val.startsWith('"')||val.startsWith("'")) vars[name]=val.slice(1,-1);
            else if (!isNaN(Number(val))) vars[name]=Number(val);
            else vars[name]=val;
            continue;
        }
        if (line.startsWith('print(')) {
            const m = line.match(/print\((.+)\)$/);
            if (m) {
                let c = m[1].trim();
                if (c.startsWith('f"')||c.startsWith("f'")) {
                    out += c.slice(2,-1).replace(/\{([^}]+)\}/g,(_,e)=>vars[e]!==undefined?vars[e]:`{${e}}`) + '\n';
                } else if ((c.startsWith('"')&&c.endsWith('"'))||(c.startsWith("'")&&c.endsWith("'"))) {
                    out += c.slice(1,-1) + '\n';
                } else if (vars[c]!==undefined) { out += vars[c]+'\n'; }
                else { try { out += eval(c)+'\n'; } catch(e) { out += c+'\n'; } }
            }
        }
        if (line.startsWith('for ')) {
            const fm = line.match(/for\s+(\w+)\s+in\s+range\((\d+)(?:,\s*(\d+))?\)/);
            if (fm) {
                const [,v,a,b] = fm;
                const start = b?+a:0, end = b?+b:+a;
                const body = [];
                let j = i+1;
                while (j<lines.length && (lines[j].startsWith('    ')||lines[j].startsWith('\t'))) { body.push(lines[j].trim()); j++; }
                for (let k=start;k<end;k++) {
                    vars[v] = k;
                    body.forEach(bl => {
                        if (bl.startsWith('print(')) {
                            const pm = bl.match(/print\((.+)\)$/);
                            if (pm) {
                                let c = pm[1].trim();
                                if (c.startsWith('f"')||c.startsWith("f'")) out += c.slice(2,-1).replace(/\{([^}]+)\}/g,(_,e)=>vars[e]!==undefined?vars[e]:`{${e}}`) + '\n';
                                else if ((c.startsWith('"')&&c.endsWith('"'))||(c.startsWith("'")&&c.endsWith("'"))) out += c.slice(1,-1)+'\n';
                                else if (vars[c]!==undefined) out += vars[c]+'\n';
                            }
                        }
                    });
                }
                i = j-1;
            }
        }
    }
    sandboxOutput = out || 'Выполнено (нет вывода)';
    haptic('success'); render();
}

function renderDuel(el) {
    el.appendChild(h('button', {class:'menu-item', style:{margin:'16px',width:'auto'}, onClick:()=>{ view='practice'; render(); }}, '← Назад'));
    el.appendChild(h('h1', {class:'text-center', style:{fontSize:'22px',fontWeight:800}}, '⚔️ Дуэли 1v1'));
    el.appendChild(h('div', {class:'card text-center', style:{margin:'16px',padding:'24px'}},
        h('div', {style:{display:'flex',alignItems:'center',justifyContent:'center',gap:'24px',marginBottom:'16px'}},
            h('div', {class:'text-center'}, h('div', {class:'profile-avatar', style:{width:'56px',height:'56px',fontSize:'28px'}}, state.avatar), h('div', {class:'font-bold', style:{marginTop:'4px'}}, 'Ты'), h('div', {class:'text-sm text-hint'}, state.eloRating+' ELO')),
            h('span', {style:{fontSize:'36px'}}, '⚔️'),
            h('div', {class:'text-center'}, h('div', {style:{width:'56px',height:'56px',borderRadius:'50%',background:'var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',margin:'0 auto'}}, '?'), h('div', {class:'font-bold', style:{marginTop:'4px'}}, 'Соперник'))
        ),
        h('button', {class:'btn btn-danger', onClick:()=>{ haptic('medium'); alert('Поиск соперника... (в разработке)'); }}, '⚔️ Найти соперника')
    ));
    el.appendChild(h('div', {style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',padding:'0 16px'}},
        h('div', {class:'stat-card'}, h('div', {class:'stat-value', style:{color:'#4caf50'}}, String(state.duelsWon)), h('div', {class:'stat-label'}, 'Побед')),
        h('div', {class:'stat-card'}, h('div', {class:'stat-value', style:{color:'#f44336'}}, String(state.duelsLost)), h('div', {class:'stat-label'}, 'Поражений'))
    ));
}

function renderLeaderboard(el) {
    el.appendChild(h('h1', {class:'text-center', style:{padding:'20px',fontSize:'22px',fontWeight:800}}, '🏆 Лидерборд недели'));
    const data = [
        {name:'PyMaster',xp:15420,streak:147,avatar:'👨‍💻'},
        {name:'CodeNinja',xp:12350,streak:89,avatar:'🥷'},
        {name:'DevGuru',xp:11200,streak:63,avatar:'🧙'},
        {name:'Ты',xp:state.level*100+state.xp,streak:state.streak,avatar:state.avatar,self:true},
        {name:'AlgoWizard',xp:9800,streak:45,avatar:'🧙‍♂️'},
    ].sort((a,b)=>b.xp-a.xp);
    data.forEach((p,i) => {
        const rankCls = i===0?'gold':i===1?'silver':i===2?'bronze':'';
        el.appendChild(h('div', {class:'lb-item'+(p.self?' self':'')},
            h('div', {class:'lb-rank '+rankCls}, String(i+1)),
            h('span', {style:{fontSize:'24px'}}, p.avatar),
            h('div', {class:'flex-1'}, h('div', {class:'font-bold'}, p.name), h('div', {class:'text-sm text-hint'}, '🔥 '+p.streak+' дней')),
            h('div', {class:'text-center'}, h('div', {class:'font-bold', style:{color:'var(--xp)'}}, String(p.xp)), h('div', {class:'text-sm text-hint'}, 'XP'))
        ));
    });
}

function renderShop(el) {
    el.appendChild(h('div', {style:{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px 16px'}},
        h('h1', {style:{fontSize:'22px',fontWeight:800}}, '🛒 Магазин'),
        h('div', {class:'gems-badge'}, '💎 '+state.gems)
    ));

    const categories = [
        { id: 'pet', name: '🐾 Питомцы', desc: 'Верные компаньоны' },
        { id: 'boost', name: '⚡ Бусты', desc: 'Усиления' },
        { id: 'avatar', name: '🎭 Аватары', desc: 'Стиль' },
        { id: 'theme', name: '🎨 Темы', desc: 'Оформление' },
    ];
    
    categories.forEach(cat => {
        const items = SHOP.filter(i => i.category === cat.id);
        if (items.length === 0) return;
        
        el.appendChild(h('div', {style:{padding:'0 16px 8px'}},
            h('h2', {style:{fontSize:'16px',fontWeight:700,display:'flex',alignItems:'center',gap:'8px'}}, cat.name),
            h('p', {class:'text-sm text-hint', style:{margin:0}}, cat.desc)
        ));
        
        const grid = h('div', {style:{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'12px',padding:'0 16px 20px'}});
        
        items.forEach(item => {
            const owned = state.owned.includes(item.id);
            const isPet = item.category === 'pet';
            const isActivePet = isPet && petState.type === item.id.replace('pet-', '');
            
            grid.appendChild(h('button', {
                style:{
                    padding:'16px',
                    borderRadius:'16px',
                    border: isActivePet ? '2px solid var(--primary)' : '2px solid var(--border)',
                    background: owned ? 'rgba(76,175,80,0.1)' : 'var(--card)',
                    cursor: owned && !isPet ? 'default' : 'pointer',
                    textAlign:'center',
                    fontFamily:'inherit',
                    color:'var(--text)',
                    transition:'all 0.2s'
                },
                onClick:()=>{
                    if (owned) {
                        // Если питомец - активировать
                        if (isPet) {
                            selectPet(item.id.replace('pet-', ''));
                        }
                        return;
                    }
                    if (state.gems < item.price) { 
                        haptic('error'); 
                        alert('Недостаточно гемов! Нужно ' + item.price + ' 💎'); 
                        return; 
                    }
                    if (confirm(`Купить "${item.title}" за ${item.price} 💎?`)) {
                        state.gems -= item.price; 
                        state.owned.push(item.id);
                        haptic('success'); 
                        
                        // Автоматически активировать питомца после покупки
                        if (isPet) {
                            selectPet(item.id.replace('pet-', ''));
                        }
                        
                        saveState(); 
                        render();
                    }
                }
            },
                h('div', {style:{fontSize:'40px',marginBottom:'8px'}}, item.icon),
                h('div', {style:{fontWeight:700,fontSize:'14px'}}, item.title),
                h('div', {style:{fontSize:'12px',color:'var(--hint)',marginTop:'4px'}}, item.desc),
                owned ? h('div', {style:{color:'#4caf50',fontWeight:700,fontSize:'12px',marginTop:'8px'}}, isActivePet ? '✓ Активен' : '✓ Куплено')
                      : h('div', {style:{color:'var(--primary)',fontWeight:700,fontSize:'14px',marginTop:'8px'}}, item.price+' 💎')
            ));
        });
        
        el.appendChild(grid);
    });

    if (!state.premium) {
        el.appendChild(h('div', {style:{margin:'0 16px 20px',padding:'20px',borderRadius:'20px',background:'linear-gradient(135deg,#8b5cf6,#ec4899)',color:'white',textAlign:'center'}},
            h('div', {style:{fontSize:'32px',marginBottom:'8px'}}, '👑'),
            h('h2', {style:{fontSize:'18px',fontWeight:800,margin:'0 0 4px'}}, 'Premium'),
            h('p', {style:{fontSize:'14px',opacity:0.9,margin:'0 0 12px'}}, '∞ жизней • 2x XP • Без рекламы'),
            h('button', {style:{padding:'12px 32px',borderRadius:'20px',border:'none',background:'white',color:'#8b5cf6',fontWeight:700,cursor:'pointer',fontSize:'16px'}, onClick:()=>{
                state.premium = true;
                haptic('success');
                saveState();
                render();
            }}, 'Попробовать бесплатно')
        ));
    }
}

function renderProfile(el) {
    const currentFrame = AVATAR_FRAMES.find(f => f.id === (state.avatarFrame || 'none')) || AVATAR_FRAMES[0];
    let frameStyle = currentFrame.style !== 'none' ? currentFrame.style : '';
    if (currentFrame.gradient) {
        frameStyle = `border: 4px solid transparent; background: linear-gradient(var(--card), var(--card)) padding-box, ${currentFrame.gradient} border-box;`;
    }
    
    el.appendChild(h('div', {class:'text-center', style:{padding:'20px'}},
        h('div', {style:{position:'relative',display:'inline-block'}},
            h('div', {class:'profile-avatar', style:{
                cursor:'pointer',
                ...(frameStyle ? {border:currentFrame.style, boxShadow: currentFrame.glow || ''} : {})
            }, onClick:()=>openAvatarSelector()}, 
                state.avatar, 
                h('div', {class:'profile-level'}, 'Ур. '+state.level)
            ),
            h('button', {style:{
                position:'absolute',
                bottom:'-4px',
                right:'-4px',
                width:'28px',
                height:'28px',
                borderRadius:'50%',
                background:'var(--primary)',
                color:'white',
                border:'2px solid var(--card)',
                cursor:'pointer',
                fontSize:'12px',
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
            }, onClick:()=>openAvatarSelector()}, '✏️')
        ),
        h('h1', {style:{fontSize:'20px',fontWeight:800,marginTop:'20px'}}, window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Кодер'),
        h('div', {class:'text-sm text-hint', style:{marginTop:'4px'}}, `🔥 ${state.streak} дней • ⭐ ${state.xp} XP`),
        isAdmin() ? h('div', {style:{marginTop:'8px',padding:'4px 12px',borderRadius:'20px',background:'linear-gradient(135deg,#f59e0b,#ef4444)',color:'white',fontSize:'12px',fontWeight:700,display:'inline-block'}}, '👑 ADMIN') : null
    ));
    el.appendChild(h('div', {class:'card', style:{margin:'0 16px 16px'}},
        h('div', {class:'flex justify-between text-sm', style:{marginBottom:'6px'}}, h('span',{},'Прогресс'), h('span',{style:{color:'var(--primary)',fontWeight:700}}, state.xp+'/'+state.xpNext+' XP')),
        h('div', {class:'progress-bar'}, h('div', {class:'progress-fill', style:{width:(state.xp/state.xpNext*100)+'%'}}))
    ));
    el.appendChild(h('div', {class:'stat-grid'},
        h('div', {class:'stat-card'}, h('div', {class:'stat-value', style:{color:'var(--primary)'}}, String(state.totalLessons)), h('div', {class:'stat-label'}, 'Уроков')),
        h('div', {class:'stat-card'}, h('div', {class:'stat-value', style:{color:'#ffc800'}}, String(state.perfectLessons)), h('div', {class:'stat-label'}, 'Идеальных')),
        h('div', {class:'stat-card'}, h('div', {class:'stat-value', style:{color:'var(--gem)'}}, String(state.completedSkills.length)), h('div', {class:'stat-label'}, 'Навыков'))
    ));
    if (state.owned.some(id => id.startsWith('pet-'))) {
        el.appendChild(h('div', {class:'card', style:{margin:'0 16px 16px',padding:'16px'}},
            h('div', {style:{display:'flex',alignItems:'center',justifyContent:'space-between'}},
                h('div', {style:{display:'flex',alignItems:'center',gap:'12px'}},
                    h('div', {style:{fontSize:'40px'}}, petState.type ? PET_TYPES[petState.type]?.icon || '🐾' : '🐾'),
                    h('div', {},
                        h('div', {style:{fontWeight:700}}, petState.type ? PET_TYPES[petState.type]?.name : 'Питомец'),
                        h('div', {class:'text-sm text-hint'}, petState.type ? `❤️ ${Math.round(petState.happiness)}% • 🍖 ${Math.round(petState.hunger)}%` : 'Не выбран')
                    )
                ),
                h('button', {style:{padding:'8px 16px',borderRadius:'12px',border:'none',background:'var(--primary)',color:'white',fontWeight:600,cursor:'pointer'}, onClick:()=>{ openPetSelector(); }}, petState.type ? '🔄' : 'Выбрать')
            ),
            petState.type ? h('div', {style:{display:'flex',gap:'8px',marginTop:'12px'}},
                h('button', {style:{flex:1,padding:'10px',borderRadius:'10px',border:'none',background:'linear-gradient(135deg,#ff9800,#ff5722)',color:'white',fontWeight:600,cursor:'pointer',fontFamily:'inherit'}, onClick:feedPet}, '🐟 Покормить'),
                h('button', {style:{flex:1,padding:'10px',borderRadius:'10px',border:'none',background:'linear-gradient(135deg,#e91e63,#9c27b0)',color:'white',fontWeight:600,cursor:'pointer',fontFamily:'inherit'}, onClick:petThePet}, '💕 Погладить')
            ) : null
        ));
    }

    el.appendChild(h('div', {style:{padding:'0 16px 8px'}},
        h('h3', {style:{fontSize:'14px',fontWeight:700,color:'var(--hint)',marginBottom:'8px'}}, '🎨 Кастомизация')
    ));
    
    el.appendChild(h('div', {style:{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'8px',padding:'0 16px 16px'}},
        h('button', {style:{padding:'16px 8px',borderRadius:'16px',border:'none',background:'var(--card)',cursor:'pointer',textAlign:'center',fontFamily:'inherit',color:'var(--text)'}, onClick:()=>openAvatarSelector()},
            h('div', {style:{fontSize:'28px',marginBottom:'4px'}}, '🎭'),
            h('div', {style:{fontSize:'11px',fontWeight:600}}, 'Аватар')
        ),
        h('button', {style:{padding:'16px 8px',borderRadius:'16px',border:'none',background:'var(--card)',cursor:'pointer',textAlign:'center',fontFamily:'inherit',color:'var(--text)'}, onClick:()=>openFrameSelector()},
            h('div', {style:{fontSize:'28px',marginBottom:'4px'}}, '✨'),
            h('div', {style:{fontSize:'11px',fontWeight:600}}, 'Рамка')
        ),
        h('button', {style:{padding:'16px 8px',borderRadius:'16px',border:'none',background:'var(--card)',cursor:'pointer',textAlign:'center',fontFamily:'inherit',color:'var(--text)'}, onClick:()=>openPetSelector()},
            h('div', {style:{fontSize:'28px',marginBottom:'4px'}}, petState.type ? PET_TYPES[petState.type]?.icon : '🐾'),
            h('div', {style:{fontSize:'11px',fontWeight:600}}, 'Питомец')
        )
    ));

    const items = [
        ['🏅','Достижения',state.achievements.length+'/'+ACHIEVEMENTS.length,()=>{ view='achievements'; render(); }],
        ['🎖️','Battle Pass','Сезон 1',()=>{ view='battlepass'; render(); }],
        ['👥','Друзья','Пригласить друзей',()=>{ view='friends'; render(); }],
        ['🏰','Клан',state.clanId?'Участник':'Не в клане',()=>{ view='clan'; render(); }],
        ['⚙️','Настройки','',()=>{ view='settings'; render(); }],
    ];
    items.forEach(([icon,title,desc,onClick]) => {
        el.appendChild(h('button', {class:'menu-item', onClick:()=>{ haptic('light'); onClick(); }},
            h('span', {class:'menu-icon'}, icon),
            h('div', {class:'menu-label'}, h('div', {class:'menu-title'}, title), desc ? h('div', {class:'menu-desc'}, desc) : null),
            h('span', {class:'menu-arrow'}, '→')
        ));
    });

    if (isAdmin()) {
        el.appendChild(h('div', {style:{margin:'20px 16px 0',padding:'16px',borderRadius:'16px',background:'linear-gradient(135deg,rgba(245,158,11,0.2),rgba(239,68,68,0.2))',border:'2px solid #f59e0b'}},
            h('div', {style:{fontWeight:800,fontSize:'16px',marginBottom:'12px',display:'flex',alignItems:'center',gap:'8px'}}, '👑 Админ-панель'),
            h('div', {style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}},
                h('button', {class:'btn btn-primary', style:{padding:'10px',fontSize:'12px'}, onClick:()=>{
                    state.gems += 10000; haptic('success'); saveState(); render();
                }}, '💎 +10000'),
                h('button', {class:'btn btn-primary', style:{padding:'10px',fontSize:'12px'}, onClick:()=>{
                    state.hearts = 999; state.maxHearts = 999; haptic('success'); saveState(); render();
                }}, '❤️ ∞'),
                h('button', {class:'btn btn-primary', style:{padding:'10px',fontSize:'12px'}, onClick:()=>{
                    addXP(10000); haptic('success'); saveState(); render();
                }}, '⭐ +10000 XP'),
                h('button', {class:'btn btn-primary', style:{padding:'10px',fontSize:'12px'}, onClick:()=>{
                    state.streak = 365; haptic('success'); saveState(); render();
                }}, '🔥 365 дней'),
                h('button', {class:'btn btn-primary', style:{padding:'10px',fontSize:'12px'}, onClick:()=>{
                    state.premium = true; haptic('success'); saveState(); render();
                }}, '👑 Premium'),
                h('button', {class:'btn btn-primary', style:{padding:'10px',fontSize:'12px'}, onClick:()=>{
                    ACHIEVEMENTS.forEach(a => {
                        if (!state.achievements.includes(a.id)) state.achievements.push(a.id);
                    });
                    haptic('success'); saveState(); render();
                }}, '🏅 Все ачивки'),
                h('button', {class:'btn btn-primary', style:{padding:'10px',fontSize:'12px',gridColumn:'span 2'}, onClick:()=>{
                    const skills = getSkills();
                    skills.forEach(sk => {
                        if (!state.completedSkills.includes(sk.id)) state.completedSkills.push(sk.id);
                        sk.lessons.forEach(l => {
                            if (!state.completedLessons.includes(l.id)) state.completedLessons.push(l.id);
                        });
                    });
                    haptic('success'); saveState(); render();
                    alert('✅ Все уроки и навыки открыты!');
                }}, '🔓 Открыть ВСЁ')
            ),
            h('div', {style:{marginTop:'12px',padding:'8px',background:'rgba(0,0,0,0.1)',borderRadius:'8px',fontSize:'11px',fontFamily:'monospace'}}, 
                'ID: ' + getTelegramId()
            )
        ));
    }
}

function renderAchievements(el) {
    el.appendChild(h('button', {class:'menu-item', style:{margin:'16px',width:'auto'}, onClick:()=>{ view='profile'; render(); }}, '← Назад'));
    el.appendChild(h('h1', {class:'text-center', style:{fontSize:'22px',fontWeight:800}}, '🏅 Достижения'));
    el.appendChild(h('div', {class:'text-center', style:{padding:'8px'}}, h('span', {style:{fontSize:'28px',fontWeight:800,color:'var(--primary)'}}, String(state.achievements.length)), h('span', {class:'text-hint'}, '/'+ACHIEVEMENTS.length)));
    ACHIEVEMENTS.forEach(a => {
        const unlocked = state.achievements.includes(a.id);
        el.appendChild(h('div', {class:'achievement-item'+(unlocked?'':' locked')},
            h('span', {class:'ach-icon'}, a.icon),
            h('div', {class:'flex-1'}, h('div', {class:'flex items-center', style:{gap:'6px'}}, h('b',{},a.title), h('span', {class:'ach-rarity '+a.rarity}, a.rarity)), h('div', {class:'text-sm text-hint'}, a.desc)),
            unlocked ? h('span', {style:{color:'#4caf50',fontSize:'22px'}}, '✓') : null
        ));
    });
}

let availableClans = [
    {id:1, name:'Python Masters', icon:'🐍', members:45, xp:125000, member_count:45, total_xp:125000},
    {id:2, name:'Code Lightning', icon:'⚡', members:32, xp:98000, member_count:32, total_xp:98000},
    {id:3, name:'Bug Hunters', icon:'🐛', members:28, xp:87500, member_count:28, total_xp:87500},
    {id:4, name:'Night Coders', icon:'🌙', members:51, xp:142000, member_count:51, total_xp:142000},
    {id:5, name:'Rocket Devs', icon:'🚀', members:19, xp:65000, member_count:19, total_xp:65000},
];
let clansLoaded = false;

async function loadClans() {
    if (clansLoaded) return;
    try {
        const r = await fetch(`${API_URL}/clans`);
        const d = await r.json();
        if (d.success && d.clans) {
            const serverClans = d.clans.map(c => ({
                id: c.id,
                name: c.name,
                icon: c.icon || '🏰',
                members: c.member_count || 1,
                member_count: c.member_count || 1,
                xp: c.total_xp || 0,
                total_xp: c.total_xp || 0
            }));

            const defaultClans = [
                {id:101, name:'Python Masters', icon:'🐍', members:45, member_count:45, xp:125000, total_xp:125000},
                {id:102, name:'Code Lightning', icon:'⚡', members:32, member_count:32, xp:98000, total_xp:98000},
                {id:103, name:'Bug Hunters', icon:'🐛', members:28, member_count:28, xp:87500, total_xp:87500},
                {id:104, name:'Night Coders', icon:'🌙', members:51, member_count:51, xp:142000, total_xp:142000},
                {id:105, name:'Rocket Devs', icon:'🚀', members:19, member_count:19, xp:65000, total_xp:65000},
            ];
            
            availableClans = [...serverClans, ...defaultClans];
            clansLoaded = true;
        }
    } catch(e) { 
        console.log('Using local clans'); 
        clansLoaded = true;
    }
}

function renderClan(el) {
    el.appendChild(h('button', {class:'menu-item', style:{margin:'16px',width:'auto'}, onClick:()=>{ view='profile'; render(); }}, '← Назад'));
    el.appendChild(h('h1', {class:'text-center', style:{fontSize:'22px',fontWeight:800}}, '🏰 Кланы'));

    if (!state.clanId) {
        el.appendChild(h('div', {class:'card text-center', style:{margin:'16px',padding:'24px'}},
            h('div', {style:{fontSize:'56px'}}, '🏰'),
            h('h2', {style:{fontSize:'18px',fontWeight:800,marginTop:'8px'}}, 'Создай свой клан!'),
            h('p', {class:'text-hint', style:{marginTop:'4px'}}, 'Или вступи в существующий'),
            h('button', {class:'btn btn-primary', style:{marginTop:'16px'}, onClick:async ()=>{
                const name = prompt('Название клана (3-20 символов):');
                if (!name||name.length<3) { haptic('error'); alert('Минимум 3 символа!'); return; }
                if (state.gems<100) { haptic('error'); alert('Нужно 100 💎!'); return; }

                try {
                    const r = await fetch(`${API_URL}/clans`, {
                        method:'POST', 
                        headers:{'Content-Type':'application/json'},
                        body:JSON.stringify({
                            name, 
                            icon:'🐍', 
                            leader_id:getTelegramId(),
                            leader_name: window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Leader'
                        })
                    });
                    const d = await r.json();
                    
                    if (d.success && d.clan) {
                        state.gems -= 100;
                        state.clanId = d.clan.id;
                        state.clanName = name;
                        state.clanIcon = '🐍';
                        if (!state.achievements.includes('clan-founder')) state.achievements.push('clan-founder');

                        availableClans.unshift({
                            id: d.clan.id,
                            name: name,
                            icon: '🐍',
                            members: 1,
                            member_count: 1,
                            xp: 0,
                            total_xp: 0
                        });
                        
                        haptic('success'); 
                        saveState(); 
                        render();
                    } else {
                        haptic('error');
                        alert(d.error || 'Ошибка создания клана');
                    }
                } catch(e) {
                    state.gems -= 100;
                    const newId = Date.now();
                    state.clanId = newId;
                    state.clanName = name;
                    state.clanIcon = '🐍';
                    if (!state.achievements.includes('clan-founder')) state.achievements.push('clan-founder');
                    
                    availableClans.unshift({
                        id: newId,
                        name: name,
                        icon: '🐍',
                        members: 1,
                        member_count: 1,
                        xp: 0,
                        total_xp: 0
                    });
                    
                    haptic('success'); 
                    saveState(); 
                    render();
                }
            }}, '➕ Создать клан (100 💎)')
        ));

        if (!clansLoaded) {
            loadClans().then(() => render());
        }

        el.appendChild(h('h2', {style:{padding:'0 16px',fontSize:'18px',fontWeight:700,marginTop:'20px'}}, '📋 Доступные кланы (' + availableClans.length + ')'));

        const clansToShow = availableClans.filter(c => c.id !== state.clanId);
        
        if (clansToShow.length === 0) {
            el.appendChild(h('div', {class:'text-center text-hint', style:{padding:'20px'}}, 'Загрузка кланов...'));
        }
        
        clansToShow.forEach(clan => {
            const memberCount = clan.member_count || clan.members || 1;
            const totalXP = clan.total_xp || clan.xp || 0;
            
            el.appendChild(h('div', {class:'card', style:{margin:'8px 16px',padding:'16px',display:'flex',alignItems:'center',gap:'12px'}},
                h('div', {style:{width:'50px',height:'50px',borderRadius:'12px',background:'linear-gradient(135deg,#8b5cf6,#ec4899)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px'}}, clan.icon || '🏰'),
                h('div', {style:{flex:1}},
                    h('div', {style:{fontWeight:700,fontSize:'16px'}}, clan.name),
                    h('div', {class:'text-sm text-hint'}, `👥 ${memberCount} • ⭐ ${totalXP >= 1000 ? (totalXP/1000).toFixed(0)+'k' : totalXP} XP`)
                ),
                h('button', {class:'btn btn-primary', style:{padding:'8px 16px',width:'auto',fontSize:'14px'}, onClick:async ()=>{
                    try {
                        await fetch(`${API_URL}/clans/${clan.id}/join`, {
                            method:'POST', 
                            headers:{'Content-Type':'application/json'},
                            body:JSON.stringify({
                                telegram_id: getTelegramId(),
                                username: window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Player'
                            })
                        });
                    } catch(e) {}
                    
                    state.clanId = clan.id;
                    state.clanName = clan.name;
                    state.clanIcon = clan.icon || '🏰';
                    clanMessages = [];
                    clanMessagesLoaded = false;
                    haptic('success'); 
                    saveState(); 
                    render();
                }}, 'Вступить')
            ));
        });
    } else {
        if (!clanMessagesLoaded && state.clanId) {
            loadClanMessages().then(() => render());
        }

        el.appendChild(h('div', {class:'card text-center', style:{margin:'16px',padding:'24px'}},
            h('div', {style:{fontSize:'56px'}}, state.clanIcon||'🏰'),
            h('h2', {style:{fontSize:'20px',fontWeight:800,marginTop:'8px'}}, state.clanName),
            h('p', {class:'text-hint'}, '👥 Участники клана'),
            h('div', {style:{display:'flex',justifyContent:'center',gap:'20px',marginTop:'16px'}},
                h('div', {class:'text-center'}, h('div', {style:{fontSize:'24px',fontWeight:800,color:'var(--xp)'}}, '125k'), h('div', {class:'text-sm text-hint'}, 'XP')),
                h('div', {class:'text-center'}, h('div', {style:{fontSize:'24px',fontWeight:800,color:'var(--primary)'}}, '#3'), h('div', {class:'text-sm text-hint'}, 'Место'))
            )
        ));

        el.appendChild(h('div', {class:'card', style:{margin:'0 16px 16px'}},
            h('b', {}, '💬 Чат клана'),
            h('div', {class:'chat-messages', style:{marginTop:'8px',maxHeight:'200px',overflowY:'auto'}}, ...clanMessages.map(m =>
                h('div', {class:'chat-msg'+(m.user==='Ты'?' self':'')},
                    h('div', {class:'chat-avatar'}, m.avatar),
                    h('div', {}, h('div', {class:'chat-meta'}, m.user+' • '+m.time), h('div', {class:'chat-bubble'}, m.text))
                )
            )),
            h('div', {class:'chat-input-row'},
                h('input', {class:'chat-input', placeholder:'Сообщение...', value:chatMsg, onInput:e=>{chatMsg=e.target.value;}, onKeypress:e=>{if(e.key==='Enter')sendChat();}}),
                h('button', {class:'chat-send', onClick:sendChat}, '📤')
            )
        ));

        el.appendChild(h('button', {class:'menu-item', style:{margin:'0 16px 8px'}, onClick:()=>{
            const link = 'https://t.me/CodeStreakBot?start=clan_'+state.clanId;
            if (window.Telegram?.WebApp) window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent('🏰 Вступай в наш клан '+state.clanName+'!')}`, '_blank');
            else { navigator.clipboard.writeText(link); alert('Ссылка скопирована!'); }
            haptic('medium');
        }}, h('span', {class:'menu-icon'}, '📤'), h('div', {class:'menu-label'}, h('div', {class:'menu-title'}, 'Пригласить друзей'))));

        el.appendChild(h('button', {class:'menu-item', style:{margin:'0 16px',color:'#f44336'}, onClick:()=>{
            if (confirm('Покинуть клан?')) { 
                fetch(`${API_URL}/clans/${state.clanId}/leave`, {method:'POST', headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({telegram_id:getTelegramId()})}).catch(()=>{});
                state.clanId=null; state.clanName=null; state.clanIcon=null; 
                clanMessages = []; clanMessagesLoaded = false;
                saveState(); render(); 
            }
        }}, '🚪 Покинуть клан'));
    }
}

async function sendChat() {
    if (!chatMsg.trim()) return;
    const msgText = chatMsg.trim();
    const userName = window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Я';

    const newMsg = {
        user: userName, 
        avatar: state.avatar, 
        text: msgText, 
        time: new Date().toLocaleTimeString('ru',{hour:'2-digit',minute:'2-digit'})
    };
    clanMessages.push(newMsg);
    chatMsg = ''; 
    haptic('light'); 
    render();

    if (state.clanId) {
        try {
            await fetch(`${API_URL}/clans/${state.clanId}/messages`, {
                method: 'POST', 
                headers: {'Content-Type':'application/json'}, 
                body: JSON.stringify({
                    telegram_id: getTelegramId(), 
                    username: userName,
                    avatar: state.avatar,
                    message: msgText
                })
            });
            await loadClanMessages();
            render();
        } catch(e) {
            console.log('Failed to send message to server');
        }
    }
}

function renderFriends(el) {
    el.appendChild(h('button', {class:'menu-item', style:{margin:'16px',width:'auto'}, onClick:()=>{ view='profile'; render(); }}, '← Назад'));
    el.appendChild(h('h1', {class:'text-center', style:{fontSize:'22px',fontWeight:800}}, '👥 Друзья'));
    el.appendChild(h('button', {class:'card', style:{display:'flex',alignItems:'center',gap:'12px',border:'2px dashed var(--primary)',cursor:'pointer',margin:'16px',width:'calc(100% - 32px)'}, onClick:()=>{
        haptic('medium');
        const link = 'https://t.me/Programgo_bot?start=invite_'+getTelegramId();
        if (window.Telegram?.WebApp) window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent('🚀 Учи Python в CodeStreak!')}`, '_blank');
        else { navigator.clipboard.writeText(link); alert('Ссылка скопирована!'); }
    }},
        h('span', {style:{fontSize:'32px'}}, '➕'),
        h('div', {}, h('div', {class:'font-bold'}, 'Пригласить друзей'), h('div', {class:'text-hint text-sm'}, 'Получи 50 💎 за каждого')),
        h('span', {style:{fontSize:'20px'}}, '📤')
    ));
    const friends = [{name:'AlexCoder',avatar:'👨‍💻',streak:45,level:23},{name:'PyQueen',avatar:'👩‍💻',streak:67,level:31}];
    friends.forEach(f => {
        el.appendChild(h('div', {class:'menu-item'},
            h('div', {style:{width:'40px',height:'40px',borderRadius:'50%',background:'linear-gradient(135deg,#8b5cf6,#ec4899)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px'}}, f.avatar),
            h('div', {class:'menu-label'}, h('div', {class:'menu-title'}, f.name), h('div', {class:'menu-desc'}, '🔥 '+f.streak+' • Ур. '+f.level)),
            h('button', {style:{fontSize:'24px',background:'none',border:'none',cursor:'pointer'}, onClick:()=>{haptic('medium');alert('🎁 Подарок отправлен!');}}, '🎁')
        ));
    });
}

const BATTLE_PASS = [
    {level:1, free:{type:'xp',amount:50,label:'+50 XP'}, premium:{type:'gems',amount:25,label:'+25 💎'}},
    {level:2, free:{type:'gems',amount:10,label:'+10 💎'}, premium:{type:'avatar',id:'ninja',label:'🥷 Ниндзя'}},
    {level:3, free:{type:'xp',amount:100,label:'+100 XP'}, premium:{type:'xp',amount:200,label:'+200 XP'}},
    {level:4, free:{type:'hearts',amount:2,label:'+2 ❤️'}, premium:{type:'gems',amount:50,label:'+50 💎'}},
    {level:5, free:{type:'gems',amount:25,label:'+25 💎'}, premium:{type:'pet',id:'cat',label:'🐱 Котик'}},
    {level:6, free:{type:'xp',amount:75,label:'+75 XP'}, premium:{type:'theme',id:'matrix',label:'💚 Matrix'}},
    {level:7, free:{type:'streak_freeze',amount:1,label:'🧊 Freeze'}, premium:{type:'gems',amount:75,label:'+75 💎'}},
    {level:8, free:{type:'gems',amount:15,label:'+15 💎'}, premium:{type:'xp',amount:300,label:'+300 XP'}},
    {level:9, free:{type:'xp',amount:100,label:'+100 XP'}, premium:{type:'avatar',id:'robot',label:'🤖 Робот'}},
    {level:10, free:{type:'gems',amount:50,label:'+50 💎'}, premium:{type:'pet',id:'dragon',label:'🐉 Дракон'}},
    {level:11, free:{type:'xp',amount:125,label:'+125 XP'}, premium:{type:'gems',amount:100,label:'+100 💎'}},
    {level:12, free:{type:'hearts',amount:3,label:'+3 ❤️'}, premium:{type:'theme',id:'cyberpunk',label:'💜 Cyberpunk'}},
    {level:13, free:{type:'gems',amount:20,label:'+20 💎'}, premium:{type:'xp',amount:400,label:'+400 XP'}},
    {level:14, free:{type:'xp',amount:150,label:'+150 XP'}, premium:{type:'gems',amount:125,label:'+125 💎'}},
    {level:15, free:{type:'gems',amount:75,label:'+75 💎'}, premium:{type:'avatar',id:'wizard',label:'🧙 Маг'}},
    {level:16, free:{type:'xp',amount:100,label:'+100 XP'}, premium:{type:'hearts',amount:5,label:'+5 ❤️'}},
    {level:17, free:{type:'streak_freeze',amount:2,label:'🧊x2 Freeze'}, premium:{type:'gems',amount:150,label:'+150 💎'}},
    {level:18, free:{type:'gems',amount:30,label:'+30 💎'}, premium:{type:'xp',amount:500,label:'+500 XP'}},
    {level:19, free:{type:'xp',amount:175,label:'+175 XP'}, premium:{type:'theme',id:'dracula',label:'🧛 Dracula'}},
    {level:20, free:{type:'gems',amount:100,label:'+100 💎'}, premium:{type:'pet',id:'phoenix',label:'🔥 Феникс'}},
    {level:21, free:{type:'xp',amount:200,label:'+200 XP'}, premium:{type:'gems',amount:175,label:'+175 💎'}},
    {level:22, free:{type:'hearts',amount:5,label:'+5 ❤️'}, premium:{type:'avatar',id:'alien',label:'👽 Пришелец'}},
    {level:23, free:{type:'gems',amount:40,label:'+40 💎'}, premium:{type:'xp',amount:600,label:'+600 XP'}},
    {level:24, free:{type:'xp',amount:225,label:'+225 XP'}, premium:{type:'gems',amount:200,label:'+200 💎'}},
    {level:25, free:{type:'gems',amount:150,label:'+150 💎'}, premium:{type:'pet',id:'unicorn',label:'🦄 Единорог'}},
    {level:26, free:{type:'xp',amount:250,label:'+250 XP'}, premium:{type:'theme',id:'ocean',label:'🌊 Ocean'}},
    {level:27, free:{type:'streak_freeze',amount:3,label:'🧊x3 Freeze'}, premium:{type:'gems',amount:250,label:'+250 💎'}},
    {level:28, free:{type:'gems',amount:50,label:'+50 💎'}, premium:{type:'xp',amount:750,label:'+750 XP'}},
    {level:29, free:{type:'xp',amount:300,label:'+300 XP'}, premium:{type:'avatar',id:'king',label:'👑 Король'}},
    {level:30, free:{type:'gems',amount:200,label:'+200 💎'}, premium:{type:'pet',id:'quantum_cat',label:'✨ Quantum Cat'}},
];

function renderBattlePass(el) {
    el.appendChild(h('button', {class:'menu-item', style:{margin:'16px',width:'auto'}, onClick:()=>{ view='profile'; render(); }}, '← Назад'));

    if (!state.bpClaimedFree) state.bpClaimedFree = [];
    if (!state.bpClaimedPremium) state.bpClaimedPremium = [];

    const seasonStart = new Date('2024-01-01'); // Example start date
    const now = new Date();
    const daysPassed = Math.floor((now - seasonStart) / (1000*60*60*24)) % 30;
    const daysRemaining = 30 - daysPassed;

    el.appendChild(h('div', {class:'text-center', style:{padding:'0 16px 16px'}},
        h('h1', {style:{fontSize:'24px',fontWeight:800,background:'linear-gradient(135deg,#f59e0b,#ef4444)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}, '🎖️ Battle Pass'),
        h('p', {class:'text-hint'}, `Сезон ${state.bpSeason || 1} • Осталось ${daysRemaining} дней`)
    ));

    const bpXpNeeded = getBPXPNeeded(state.bpLevel);
    const progressPercent = Math.min(100, (state.bpXP / bpXpNeeded) * 100);
    
    el.appendChild(h('div', {class:'card', style:{margin:'0 16px 16px'}},
        h('div', {class:'flex justify-between', style:{marginBottom:'8px'}},
            h('span', {class:'font-bold'}, `🎖️ Уровень ${state.bpLevel}/30`),
            h('span', {style:{color:'var(--primary)',fontWeight:700}}, `${state.bpXP}/${bpXpNeeded} XP`)
        ),
        h('div', {class:'progress-bar'}, h('div', {class:'progress-fill', style:{width:progressPercent+'%'}})),
        state.bpLevel >= 30 ? h('div', {style:{marginTop:'8px',textAlign:'center',color:'#f59e0b',fontWeight:700}}, '🏆 Максимальный уровень!') : null
    ));

    const totalClaimed = (state.bpClaimedFree?.length || 0) + (state.bpClaimedPremium?.length || 0);
    const totalAvailable = BATTLE_PASS.length * 2;
    
    el.appendChild(h('div', {style:{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'8px',margin:'0 16px 16px'}},
        h('div', {class:'stat-card'}, h('div', {class:'stat-value', style:{color:'var(--primary)'}}, String(state.bpLevel)), h('div', {class:'stat-label'}, 'Уровень')),
        h('div', {class:'stat-card'}, h('div', {class:'stat-value', style:{color:'#4caf50'}}, String(totalClaimed)), h('div', {class:'stat-label'}, 'Собрано')),
        h('div', {class:'stat-card'}, h('div', {class:'stat-value', style:{color:'#f59e0b'}}, String(countUnclaimedRewards())), h('div', {class:'stat-label'}, 'Доступно'))
    ));

    const unclaimedCount = countUnclaimedRewards();
    if (unclaimedCount > 0) {
        el.appendChild(h('button', {class:'btn btn-primary', style:{margin:'0 16px 16px',width:'calc(100% - 32px)'}, onClick:()=>{
            claimAllAvailableRewards();
        }}, `🎁 Собрать всё (${unclaimedCount})`));
    }

    if (!state.premium) {
        el.appendChild(h('div', {class:'card', style:{margin:'0 16px 16px',padding:'16px',background:'linear-gradient(135deg,#8b5cf6,#ec4899)',color:'white',textAlign:'center'}},
            h('div', {style:{fontSize:'20px',fontWeight:800}}, '👑 Premium Pass'),
            h('p', {style:{opacity:0.9,fontSize:'14px',marginTop:'4px'}}, 'Разблокируй эксклюзивные награды!'),
            h('div', {style:{display:'flex',gap:'8px',justifyContent:'center',marginTop:'12px',flexWrap:'wrap'}},
                h('span', {style:{background:'rgba(255,255,255,0.2)',padding:'4px 8px',borderRadius:'8px',fontSize:'12px'}}, '🥷 Аватары'),
                h('span', {style:{background:'rgba(255,255,255,0.2)',padding:'4px 8px',borderRadius:'8px',fontSize:'12px'}}, '🐉 Питомцы'),
                h('span', {style:{background:'rgba(255,255,255,0.2)',padding:'4px 8px',borderRadius:'8px',fontSize:'12px'}}, '💎 Гемы x3')
            ),
            h('button', {style:{marginTop:'12px',padding:'10px 24px',borderRadius:'20px',border:'none',background:'white',color:'#8b5cf6',fontWeight:700,cursor:'pointer'}, onClick:()=>{
                state.premium = true; haptic('success'); saveState(); render();
            }}, '👑 Купить Premium • 149 ₽/мес')
        ));
    }

    el.appendChild(h('div', {style:{padding:'0 16px'}},
        h('div', {class:'flex justify-between', style:{marginBottom:'12px'}},
            h('b', {}, '🎁 Награды'),
            h('span', {class:'text-sm text-hint'}, `${totalClaimed}/${totalAvailable}`)
        )
    ));

    el.appendChild(h('div', {style:{display:'flex',gap:'12px',padding:'0 16px 12px',fontSize:'12px'}},
        h('span', {style:{display:'flex',alignItems:'center',gap:'4px'}}, h('span', {style:{width:'12px',height:'12px',background:'var(--card)',border:'2px solid var(--border)',borderRadius:'4px'}}), 'Бесплатно'),
        h('span', {style:{display:'flex',alignItems:'center',gap:'4px'}}, h('span', {style:{width:'12px',height:'12px',background:'linear-gradient(135deg,rgba(139,92,246,0.3),rgba(236,72,153,0.3))',border:'2px solid #ec4899',borderRadius:'4px'}}), 'Premium')
    ));

    const grid = h('div', {style:{display:'flex',flexDirection:'column',gap:'8px',padding:'0 16px 100px'}});
    
    BATTLE_PASS.forEach((tier, i) => {
        const lvl = tier.level;
        const unlocked = state.bpLevel >= lvl;
        const freeClaimed = state.bpClaimedFree?.includes(lvl);
        const premiumClaimed = state.bpClaimedPremium?.includes(lvl);
        const canClaimFree = unlocked && !freeClaimed;
        const canClaimPremium = state.premium && unlocked && !premiumClaimed;

        const row = h('div', {style:{display:'flex',alignItems:'center',gap:'8px'}},
            h('div', {style:{width:'40px',height:'40px',borderRadius:'50%',background:unlocked?'linear-gradient(135deg,#8b5cf6,#ec4899)':'var(--border)',color:unlocked?'white':'var(--hint)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:'14px',boxShadow:unlocked?'0 4px 12px rgba(139,92,246,0.3)':'none'}}, String(lvl)),

            h('div', {style:{flex:1,padding:'12px',borderRadius:'12px',background:freeClaimed?'rgba(76,175,80,0.1)':'var(--card)',border:'2px solid '+(freeClaimed?'#4caf50':canClaimFree?'var(--primary)':'var(--border)'),opacity:unlocked?1:0.5,cursor:canClaimFree?'pointer':'default',transition:'all 0.2s',transform:canClaimFree?'scale(1)':'scale(1)'}, onClick:()=>{
                if (canClaimFree) {
                    claimBPReward(tier.free, lvl, 'free');
                }
            }},
                h('div', {style:{fontSize:'18px',textAlign:'center'}}, tier.free.label),
                freeClaimed ? h('div', {style:{fontSize:'11px',color:'#4caf50',textAlign:'center',marginTop:'4px',fontWeight:600}}, '✓ Получено') 
                    : canClaimFree ? h('div', {style:{fontSize:'11px',color:'var(--primary)',textAlign:'center',marginTop:'4px',fontWeight:600}}, '🎁 Забрать!') 
                    : null
            ),

            h('div', {style:{flex:1,padding:'12px',borderRadius:'12px',background:premiumClaimed?'rgba(76,175,80,0.1)':state.premium?'linear-gradient(135deg,rgba(139,92,246,0.15),rgba(236,72,153,0.15))':'var(--card)',border:'2px solid '+(premiumClaimed?'#4caf50':canClaimPremium?'#ec4899':'var(--border)'),opacity:state.premium&&unlocked?1:0.5,cursor:canClaimPremium?'pointer':'default',position:'relative',transition:'all 0.2s'}, onClick:()=>{
                if (canClaimPremium) {
                    claimBPReward(tier.premium, lvl, 'premium');
                }
            }},
                !state.premium ? h('div', {style:{position:'absolute',top:'4px',right:'4px',fontSize:'12px'}}, '👑') : null,
                h('div', {style:{fontSize:'18px',textAlign:'center'}}, tier.premium.label),
                premiumClaimed ? h('div', {style:{fontSize:'11px',color:'#4caf50',textAlign:'center',marginTop:'4px',fontWeight:600}}, '✓ Получено') 
                    : canClaimPremium ? h('div', {style:{fontSize:'11px',color:'#ec4899',textAlign:'center',marginTop:'4px',fontWeight:600}}, '🎁 Забрать!') 
                    : !state.premium ? h('div', {style:{fontSize:'11px',color:'var(--hint)',textAlign:'center',marginTop:'4px'}}, '👑 Premium')
                    : null
            )
        );
        grid.appendChild(row);
    });

    el.appendChild(grid);
}

function countUnclaimedRewards() {
    let count = 0;
    BATTLE_PASS.forEach(tier => {
        if (state.bpLevel >= tier.level) {
            if (!state.bpClaimedFree?.includes(tier.level)) count++;
            if (state.premium && !state.bpClaimedPremium?.includes(tier.level)) count++;
        }
    });
    return count;
}

function claimAllAvailableRewards() {
    BATTLE_PASS.forEach(tier => {
        if (state.bpLevel >= tier.level) {
            if (!state.bpClaimedFree?.includes(tier.level)) {
                claimBPReward(tier.free, tier.level, 'free', true);
            }
            if (state.premium && !state.bpClaimedPremium?.includes(tier.level)) {
                claimBPReward(tier.premium, tier.level, 'premium', true);
            }
        }
    });
    haptic('success');
    saveState();
    render();
}

function claimBPReward(reward, level, type, silent = false) {
    if (!state.bpClaimedFree) state.bpClaimedFree = [];
    if (!state.bpClaimedPremium) state.bpClaimedPremium = [];
    
    if (type === 'free') {
        if (state.bpClaimedFree.includes(level)) return;
        state.bpClaimedFree.push(level);
    } else {
        if (state.bpClaimedPremium.includes(level)) return;
        state.bpClaimedPremium.push(level);
    }

    switch(reward.type) {
        case 'xp':
            const mult = state.premium ? 2 : 1;
            state.xp += reward.amount * mult;
            while (state.xp >= state.xpNext) {
                state.xp -= state.xpNext;
                state.level++;
                state.xpNext = Math.floor(100 * Math.pow(1.2, state.level - 1));
            }
            break;
        case 'gems': 
            state.gems += reward.amount; 
            break;
        case 'hearts': 
            state.hearts = Math.min(state.maxHearts + reward.amount, state.hearts + reward.amount); 
            if (state.hearts > state.maxHearts) state.maxHearts = state.hearts;
            break;
        case 'avatar': 
            if (!state.owned.includes('avatar-'+reward.id)) state.owned.push('avatar-'+reward.id); 
            break;
        case 'pet': 
            if (!state.owned.includes('pet-'+reward.id)) state.owned.push('pet-'+reward.id); 
            break;
        case 'theme': 
            if (!state.owned.includes('theme-'+reward.id)) state.owned.push('theme-'+reward.id); 
            break;
        case 'streak_freeze':
            for (let i = 0; i < (reward.amount || 1); i++) {
                state.owned.push('streak_freeze');
            }
            break;
    }

    if (!silent) {
        haptic('success');
        saveState();
        render();
    }
}

function renderSettings(el) {
    el.appendChild(h('button', {class:'menu-item', style:{margin:'16px',width:'auto'}, onClick:()=>{ view='profile'; render(); }}, '← Назад'));
    el.appendChild(h('h1', {class:'text-center', style:{fontSize:'22px',fontWeight:800,marginBottom:'16px'}}, '⚙️ Настройки'));

    el.appendChild(h('div', {class:'card', style:{margin:'0 16px 12px'}},
        h('b', {}, 'Тема оформления'),
        h('div', {style:{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'8px',marginTop:'10px'}},
            ...[ ['','☀️','Светлая'], ['dark','🌙','Тёмная'], ['matrix','💚','Matrix'], ['cyberpunk','💜','Cyberpunk'], ['dracula','🧛','Dracula'], ['ocean','🌊','Ocean'] ].map(([id,icon,name]) =>
                h('button', {style:{padding:'10px',borderRadius:'10px',border:'none',background:state.theme===id?'var(--primary)':'var(--card)',color:state.theme===id?'white':'var(--text)',cursor:'pointer',fontFamily:'inherit',display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',transition:'all 0.2s'},
                    onClick:()=>{ state.theme=id; document.body.className=id?'theme-'+id:''; saveState(); render(); }},
                    h('span', {style:{fontSize:'20px'}}, icon),
                    h('span', {style:{fontSize:'11px'}}, name)
                )
            )
        )
    ));

    el.appendChild(h('div', {class:'card', style:{margin:'0 16px 12px'}},
        h('b', {}, '☁️ Синхронизация'),
        h('div', {class:'text-sm', style:{marginTop:'8px'}},
            h('div', {class:'flex justify-between', style:{marginBottom:'4px'}}, h('span', {class:'text-hint'}, 'Telegram:'), h('span', {}, window.Telegram?.WebApp?.initDataUnsafe?.user ? '✅ Подключен' : '⚠️ Не в TG')),
            h('div', {class:'flex justify-between'}, h('span', {class:'text-hint'}, 'ID:'), h('span', {style:{fontFamily:'monospace',fontSize:'11px'}}, getTelegramId().substring(0,20)))
        ),
        h('button', {class:'btn btn-primary', style:{marginTop:'12px',fontSize:'14px',padding:'10px'}, onClick:async()=>{
            haptic('medium');
            try { await fetch(`${API_URL}/user/${getTelegramId()}/sync`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(state)}); alert('✅ Синхронизировано!'); } catch(e) { alert('❌ Ошибка'); }
        }}, '🔄 Синхронизировать')
    ));

    el.appendChild(h('button', {class:'menu-item', style:{margin:'16px',color:'#f44336'}, onClick:()=>{
        if (confirm('Сбросить весь прогресс?')) { localStorage.clear(); location.reload(); }
    }}, '🗑️ Сбросить прогресс'));

    el.appendChild(h('div', {class:'text-center text-sm text-hint', style:{padding:'20px'}}, 'CodeStreak v1.0.0 • Made with ❤️'));
}

async function init() {
    if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
    }
    await loadState();
    loadPetState();
    
    if (state.theme) document.body.className = 'theme-' + state.theme;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes petFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        @keyframes petBounce {
            0% { transform: translateX(-50%) scale(0); }
            50% { transform: translateX(-50%) scale(1.1); }
            100% { transform: translateX(-50%) scale(1); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        #floating-pet:hover {
            transform: translateX(-50%) scale(1.1) !important;
        }
        #floating-pet:active {
            transform: translateX(-50%) scale(0.95) !important;
        }
    `;
    document.head.appendChild(style);
    
    render();

    if (petState.type) {
        startPetAnimation();
    }

    setInterval(saveState, 30000);

    setTimeout(() => {
        if (petState.type) {
            const hour = new Date().getHours();
            if (hour >= 6 && hour < 12) {
                showPetMessage(getRandomPetMessage('morning') || 'Доброе утро! ☀️');
            } else if (hour >= 22 || hour < 6) {
                showPetMessage(getRandomPetMessage('night') || 'Пора спать! 🌙');
            } else {
                showPetMessage(getRandomPetMessage('idle') || 'Привет! 👋');
            }
        }
    }, 1000);
}

init();
