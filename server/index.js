const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const BOT_TOKEN = process.env.BOT_TOKEN || '';

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'X-Telegram-Init-Data', 'X-Telegram-User-Id']
}));
app.use(express.json({ limit: '10mb' }));

const db = new Database(path.join(__dirname, 'codestreak.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    telegram_id TEXT PRIMARY KEY,
    username TEXT,
    first_name TEXT,
    last_name TEXT,
    photo_url TEXT,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    gems INTEGER DEFAULT 100,
    lives INTEGER DEFAULT 5,
    max_lives INTEGER DEFAULT 5,
    streak INTEGER DEFAULT 0,
    max_streak INTEGER DEFAULT 0,
    last_lesson_date TEXT,
    last_life_regen TEXT,
    total_lessons INTEGER DEFAULT 0,
    perfect_lessons INTEGER DEFAULT 0,
    skill_progress TEXT DEFAULT '{}',
    completed_lessons TEXT DEFAULT '[]',
    achievements TEXT DEFAULT '[]',
    inventory TEXT DEFAULT '[]',
    settings TEXT DEFAULT '{}',
    clan_id TEXT,
    friends TEXT DEFAULT '[]',
    weak_skills TEXT DEFAULT '{}',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    last_sync TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS clans (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT DEFAULT '🏰',
    leader_id TEXT NOT NULL,
    total_xp INTEGER DEFAULT 0,
    members_count INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS clan_members (
    clan_id TEXT,
    user_id TEXT,
    role TEXT DEFAULT 'member',
    joined_at TEXT DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (clan_id, user_id)
  );

  CREATE TABLE IF NOT EXISTS clan_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clan_id TEXT,
    user_id TEXT,
    username TEXT,
    message TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS friends (
    user_id TEXT,
    friend_id TEXT,
    status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, friend_id)
  );

  CREATE TABLE IF NOT EXISTS gifts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_user_id TEXT,
    to_user_id TEXT,
    gift_type TEXT,
    amount INTEGER DEFAULT 1,
    claimed INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS leaderboard_weekly (
    user_id TEXT PRIMARY KEY,
    username TEXT,
    xp INTEGER DEFAULT 0,
    week_start TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON users(telegram_id);
  CREATE INDEX IF NOT EXISTS idx_clan_members_clan ON clan_members(clan_id);
  CREATE INDEX IF NOT EXISTS idx_clan_messages_clan ON clan_messages(clan_id);
`);

function validateTelegramData(initData) {
  if (!initData || !BOT_TOKEN) return true; // Skip in dev mode
  
  try {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    urlParams.delete('hash');
    
    const dataCheckString = Array.from(urlParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
    
    const secretKey = crypto.createHmac('sha256', 'WebAppData')
      .update(BOT_TOKEN)
      .digest();
    
    const calculatedHash = crypto.createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');
    
    return calculatedHash === hash;
  } catch (e) {
    return false;
  }
}

function getTelegramUser(req) {
  const telegramId = req.headers['x-telegram-user-id'];
  if (telegramId) return { id: telegramId };
  
  const initData = req.headers['x-telegram-init-data'];
  if (initData) {
    try {
      const urlParams = new URLSearchParams(initData);
      const userStr = urlParams.get('user');
      if (userStr) return JSON.parse(userStr);
    } catch (e) {}
  }
  
  return null;
}


app.get('/api/user/:telegramId', (req, res) => {
  try {
    const { telegramId } = req.params;
    
    let user = db.prepare('SELECT * FROM users WHERE telegram_id = ?').get(telegramId);
    
    if (!user) {
      db.prepare(`
        INSERT INTO users (telegram_id, username, first_name)
        VALUES (?, ?, ?)
      `).run(telegramId, `user_${telegramId}`, 'Новый игрок');
      
      user = db.prepare('SELECT * FROM users WHERE telegram_id = ?').get(telegramId);
    }

    const userData = {
      ...user,
      skill_progress: JSON.parse(user.skill_progress || '{}'),
      completed_lessons: JSON.parse(user.completed_lessons || '[]'),
      achievements: JSON.parse(user.achievements || '[]'),
      inventory: JSON.parse(user.inventory || '[]'),
      settings: JSON.parse(user.settings || '{}'),
      friends: JSON.parse(user.friends || '[]'),
      weak_skills: JSON.parse(user.weak_skills || '{}')
    };
    
    res.json({ success: true, user: userData });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/user/:telegramId', (req, res) => {
  try {
    const { telegramId } = req.params;
    const data = req.body;

    const existing = db.prepare('SELECT telegram_id FROM users WHERE telegram_id = ?').get(telegramId);
    
    if (existing) {
      db.prepare(`
        UPDATE users SET
          username = COALESCE(?, username),
          first_name = COALESCE(?, first_name),
          last_name = COALESCE(?, last_name),
          photo_url = COALESCE(?, photo_url),
          xp = COALESCE(?, xp),
          level = COALESCE(?, level),
          gems = COALESCE(?, gems),
          lives = COALESCE(?, lives),
          max_lives = COALESCE(?, max_lives),
          streak = COALESCE(?, streak),
          max_streak = COALESCE(?, max_streak),
          last_lesson_date = COALESCE(?, last_lesson_date),
          last_life_regen = COALESCE(?, last_life_regen),
          total_lessons = COALESCE(?, total_lessons),
          perfect_lessons = COALESCE(?, perfect_lessons),
          skill_progress = COALESCE(?, skill_progress),
          completed_lessons = COALESCE(?, completed_lessons),
          achievements = COALESCE(?, achievements),
          inventory = COALESCE(?, inventory),
          settings = COALESCE(?, settings),
          clan_id = ?,
          friends = COALESCE(?, friends),
          weak_skills = COALESCE(?, weak_skills),
          updated_at = CURRENT_TIMESTAMP,
          last_sync = CURRENT_TIMESTAMP
        WHERE telegram_id = ?
      `).run(
        data.username,
        data.first_name,
        data.last_name,
        data.photo_url,
        data.xp,
        data.level,
        data.gems,
        data.lives,
        data.max_lives,
        data.streak,
        data.max_streak,
        data.last_lesson_date,
        data.last_life_regen,
        data.total_lessons,
        data.perfect_lessons,
        JSON.stringify(data.skill_progress || {}),
        JSON.stringify(data.completed_lessons || []),
        JSON.stringify(data.achievements || []),
        JSON.stringify(data.inventory || []),
        JSON.stringify(data.settings || {}),
        data.clan_id || null,
        JSON.stringify(data.friends || []),
        JSON.stringify(data.weak_skills || {}),
        telegramId
      );
    } else {
      db.prepare(`
        INSERT INTO users (
          telegram_id, username, first_name, last_name, photo_url,
          xp, level, gems, lives, max_lives, streak, max_streak,
          last_lesson_date, last_life_regen, total_lessons, perfect_lessons,
          skill_progress, completed_lessons, achievements, inventory,
          settings, clan_id, friends, weak_skills
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        telegramId,
        data.username || `user_${telegramId}`,
        data.first_name || 'Игрок',
        data.last_name || '',
        data.photo_url || '',
        data.xp || 0,
        data.level || 1,
        data.gems || 100,
        data.lives || 5,
        data.max_lives || 5,
        data.streak || 0,
        data.max_streak || 0,
        data.last_lesson_date || null,
        data.last_life_regen || null,
        data.total_lessons || 0,
        data.perfect_lessons || 0,
        JSON.stringify(data.skill_progress || {}),
        JSON.stringify(data.completed_lessons || []),
        JSON.stringify(data.achievements || []),
        JSON.stringify(data.inventory || []),
        JSON.stringify(data.settings || {}),
        data.clan_id || null,
        JSON.stringify(data.friends || []),
        JSON.stringify(data.weak_skills || {})
      );
    }

    const weekStart = getWeekStart();
    db.prepare(`
      INSERT OR REPLACE INTO leaderboard_weekly (user_id, username, xp, week_start)
      VALUES (?, ?, ?, ?)
    `).run(telegramId, data.username || data.first_name, data.xp || 0, weekStart);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Save user error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/user/:telegramId/sync', (req, res) => {
  try {
    const { telegramId } = req.params;
    const clientData = req.body;
    
    const serverUser = db.prepare('SELECT * FROM users WHERE telegram_id = ?').get(telegramId);
    
    if (!serverUser) {
      db.prepare(`
        INSERT INTO users (
          telegram_id, username, first_name, xp, level, gems, lives,
          streak, max_streak, last_lesson_date, total_lessons, perfect_lessons,
          skill_progress, completed_lessons, achievements, inventory, settings,
          clan_id, friends, weak_skills
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        telegramId,
        clientData.username,
        clientData.first_name,
        clientData.xp,
        clientData.level,
        clientData.gems,
        clientData.lives,
        clientData.streak,
        clientData.max_streak,
        clientData.last_lesson_date,
        clientData.total_lessons,
        clientData.perfect_lessons,
        JSON.stringify(clientData.skill_progress || {}),
        JSON.stringify(clientData.completed_lessons || []),
        JSON.stringify(clientData.achievements || []),
        JSON.stringify(clientData.inventory || []),
        JSON.stringify(clientData.settings || {}),
        clientData.clan_id,
        JSON.stringify(clientData.friends || []),
        JSON.stringify(clientData.weak_skills || {})
      );
      
      return res.json({ success: true, user: clientData, source: 'client' });
    }

    const serverProgress = JSON.parse(serverUser.skill_progress || '{}');
    const clientProgress = clientData.skill_progress || {};
    const mergedProgress = { ...serverProgress };
    
    for (const [skill, progress] of Object.entries(clientProgress)) {
      if (!mergedProgress[skill] || progress > mergedProgress[skill]) {
        mergedProgress[skill] = progress;
      }
    }
    
    const serverLessons = JSON.parse(serverUser.completed_lessons || '[]');
    const clientLessons = clientData.completed_lessons || [];
    const mergedLessons = [...new Set([...serverLessons, ...clientLessons])];
    
    const serverAchievements = JSON.parse(serverUser.achievements || '[]');
    const clientAchievements = clientData.achievements || [];
    const mergedAchievements = [...new Set([...serverAchievements, ...clientAchievements])];
    
    const serverInventory = JSON.parse(serverUser.inventory || '[]');
    const clientInventory = clientData.inventory || [];
    const mergedInventory = [...new Set([...serverInventory, ...clientInventory])];
    
    const mergedUser = {
      telegram_id: telegramId,
      username: clientData.username || serverUser.username,
      first_name: clientData.first_name || serverUser.first_name,
      last_name: clientData.last_name || serverUser.last_name,
      photo_url: clientData.photo_url || serverUser.photo_url,
      xp: Math.max(serverUser.xp || 0, clientData.xp || 0),
      level: Math.max(serverUser.level || 1, clientData.level || 1),
      gems: Math.max(serverUser.gems || 0, clientData.gems || 0),
      lives: clientData.lives ?? serverUser.lives,
      max_lives: serverUser.max_lives || 5,
      streak: Math.max(serverUser.streak || 0, clientData.streak || 0),
      max_streak: Math.max(serverUser.max_streak || 0, clientData.max_streak || 0),
      last_lesson_date: clientData.last_lesson_date || serverUser.last_lesson_date,
      total_lessons: Math.max(serverUser.total_lessons || 0, clientData.total_lessons || 0),
      perfect_lessons: Math.max(serverUser.perfect_lessons || 0, clientData.perfect_lessons || 0),
      skill_progress: mergedProgress,
      completed_lessons: mergedLessons,
      achievements: mergedAchievements,
      inventory: mergedInventory,
      settings: { ...JSON.parse(serverUser.settings || '{}'), ...(clientData.settings || {}) },
      clan_id: clientData.clan_id || serverUser.clan_id,
      friends: [...new Set([...JSON.parse(serverUser.friends || '[]'), ...(clientData.friends || [])])],
      weak_skills: { ...JSON.parse(serverUser.weak_skills || '{}'), ...(clientData.weak_skills || {}) }
    };

    db.prepare(`
      UPDATE users SET
        username = ?, first_name = ?, last_name = ?, photo_url = ?,
        xp = ?, level = ?, gems = ?, lives = ?,
        streak = ?, max_streak = ?, last_lesson_date = ?,
        total_lessons = ?, perfect_lessons = ?,
        skill_progress = ?, completed_lessons = ?, achievements = ?,
        inventory = ?, settings = ?, clan_id = ?, friends = ?, weak_skills = ?,
        updated_at = CURRENT_TIMESTAMP, last_sync = CURRENT_TIMESTAMP
      WHERE telegram_id = ?
    `).run(
      mergedUser.username,
      mergedUser.first_name,
      mergedUser.last_name,
      mergedUser.photo_url,
      mergedUser.xp,
      mergedUser.level,
      mergedUser.gems,
      mergedUser.lives,
      mergedUser.streak,
      mergedUser.max_streak,
      mergedUser.last_lesson_date,
      mergedUser.total_lessons,
      mergedUser.perfect_lessons,
      JSON.stringify(mergedUser.skill_progress),
      JSON.stringify(mergedUser.completed_lessons),
      JSON.stringify(mergedUser.achievements),
      JSON.stringify(mergedUser.inventory),
      JSON.stringify(mergedUser.settings),
      mergedUser.clan_id,
      JSON.stringify(mergedUser.friends),
      JSON.stringify(mergedUser.weak_skills),
      telegramId
    );
    
    res.json({ success: true, user: mergedUser, source: 'merged' });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


app.get('/api/leaderboard', (req, res) => {
  try {
    const weekStart = getWeekStart();
    
    const leaders = db.prepare(`
      SELECT user_id, username, xp
      FROM leaderboard_weekly
      WHERE week_start = ?
      ORDER BY xp DESC
      LIMIT 100
    `).all(weekStart);
    
    res.json({ success: true, leaderboard: leaders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


app.get('/api/clans', (req, res) => {
  try {
    const clans = db.prepare(`
      SELECT c.*, COUNT(cm.user_id) as members_count
      FROM clans c
      LEFT JOIN clan_members cm ON c.id = cm.clan_id
      GROUP BY c.id
      ORDER BY c.total_xp DESC
      LIMIT 50
    `).all();
    
    res.json({ success: true, clans });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/clans', (req, res) => {
  try {
    const { name, icon, leaderId, leaderName } = req.body;
    const clanId = 'clan_' + Date.now();
    
    db.prepare(`
      INSERT INTO clans (id, name, icon, leader_id)
      VALUES (?, ?, ?, ?)
    `).run(clanId, name, icon || '🏰', leaderId);
    
    db.prepare(`
      INSERT INTO clan_members (clan_id, user_id, role)
      VALUES (?, ?, 'leader')
    `).run(clanId, leaderId);
    
    db.prepare(`
      UPDATE users SET clan_id = ? WHERE telegram_id = ?
    `).run(clanId, leaderId);
    
    res.json({ success: true, clanId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/clans/:clanId/join', (req, res) => {
  try {
    const { clanId } = req.params;
    const { userId, username } = req.body;

    const clan = db.prepare('SELECT * FROM clans WHERE id = ?').get(clanId);
    if (!clan) {
      return res.status(404).json({ success: false, error: 'Clan not found' });
    }

    const existing = db.prepare('SELECT * FROM clan_members WHERE clan_id = ? AND user_id = ?').get(clanId, userId);
    if (existing) {
      return res.json({ success: true, message: 'Already a member' });
    }
    
    db.prepare(`
      INSERT INTO clan_members (clan_id, user_id, role)
      VALUES (?, ?, 'member')
    `).run(clanId, userId);
    
    db.prepare(`
      UPDATE users SET clan_id = ? WHERE telegram_id = ?
    `).run(clanId, userId);
    
    db.prepare(`
      UPDATE clans SET members_count = members_count + 1 WHERE id = ?
    `).run(clanId);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/clans/:clanId/leave', (req, res) => {
  try {
    const { clanId } = req.params;
    const { userId } = req.body;
    
    db.prepare('DELETE FROM clan_members WHERE clan_id = ? AND user_id = ?').run(clanId, userId);
    db.prepare('UPDATE users SET clan_id = NULL WHERE telegram_id = ?').run(userId);
    db.prepare('UPDATE clans SET members_count = members_count - 1 WHERE id = ?').run(clanId);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/clans/:clanId', (req, res) => {
  try {
    const { clanId } = req.params;
    
    const clan = db.prepare('SELECT * FROM clans WHERE id = ?').get(clanId);
    if (!clan) {
      return res.status(404).json({ success: false, error: 'Clan not found' });
    }
    
    const members = db.prepare(`
      SELECT cm.*, u.username, u.first_name, u.xp, u.level, u.streak
      FROM clan_members cm
      JOIN users u ON cm.user_id = u.telegram_id
      WHERE cm.clan_id = ?
      ORDER BY u.xp DESC
    `).all(clanId);
    
    const messages = db.prepare(`
      SELECT * FROM clan_messages
      WHERE clan_id = ?
      ORDER BY created_at DESC
      LIMIT 100
    `).all(clanId);
    
    res.json({ success: true, clan, members, messages: messages.reverse() });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/clans/:clanId/messages', (req, res) => {
  try {
    const { clanId } = req.params;
    const { userId, username, message } = req.body;
    
    db.prepare(`
      INSERT INTO clan_messages (clan_id, user_id, username, message)
      VALUES (?, ?, ?, ?)
    `).run(clanId, userId, username, message);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


app.get('/api/friends/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    
    const friends = db.prepare(`
      SELECT u.telegram_id, u.username, u.first_name, u.xp, u.level, u.streak
      FROM friends f
      JOIN users u ON f.friend_id = u.telegram_id
      WHERE f.user_id = ? AND f.status = 'accepted'
    `).all(userId);
    
    res.json({ success: true, friends });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/friends/add', (req, res) => {
  try {
    const { userId, friendId } = req.body;

    const friend = db.prepare('SELECT telegram_id FROM users WHERE telegram_id = ?').get(friendId);
    if (!friend) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    db.prepare(`
      INSERT OR REPLACE INTO friends (user_id, friend_id, status)
      VALUES (?, ?, 'accepted')
    `).run(userId, friendId);
    
    db.prepare(`
      INSERT OR REPLACE INTO friends (user_id, friend_id, status)
      VALUES (?, ?, 'accepted')
    `).run(friendId, userId);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


app.post('/api/gifts/send', (req, res) => {
  try {
    const { fromUserId, toUserId, giftType, amount } = req.body;
    
    db.prepare(`
      INSERT INTO gifts (from_user_id, to_user_id, gift_type, amount)
      VALUES (?, ?, ?, ?)
    `).run(fromUserId, toUserId, giftType, amount || 1);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/gifts/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    
    const gifts = db.prepare(`
      SELECT g.*, u.username as from_username
      FROM gifts g
      JOIN users u ON g.from_user_id = u.telegram_id
      WHERE g.to_user_id = ? AND g.claimed = 0
    `).all(userId);
    
    res.json({ success: true, gifts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/gifts/:giftId/claim', (req, res) => {
  try {
    const { giftId } = req.params;
    
    const gift = db.prepare('SELECT * FROM gifts WHERE id = ?').get(giftId);
    if (!gift) {
      return res.status(404).json({ success: false, error: 'Gift not found' });
    }
    
    db.prepare('UPDATE gifts SET claimed = 1 WHERE id = ?').run(giftId);

    if (gift.gift_type === 'gems') {
      db.prepare('UPDATE users SET gems = gems + ? WHERE telegram_id = ?').run(gift.amount, gift.to_user_id);
    } else if (gift.gift_type === 'lives') {
      db.prepare('UPDATE users SET lives = MIN(lives + ?, max_lives) WHERE telegram_id = ?').run(gift.amount, gift.to_user_id);
    }
    
    res.json({ success: true, gift });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

function getWeekStart() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split('T')[0];
}

app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Programgo API running on http://localhost:${PORT}`);
});
