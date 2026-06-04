# 🚀 CodeStreak - Duolingo для программирования

Telegram Mini App для геймифицированного изучения Python.

## 🏃 Быстрый запуск

### 1. Установи зависимости

```bash
npm install
```

### 2. Запусти Python сервер (для сохранения данных)

```bash
cd server
pip install flask flask-cors
python server.py
```

Увидишь:
```
✅ База данных создана: server/codestreak.db
🚀 CodeStreak API: http://localhost:3001
```

### 3. В новом терминале запусти клиент

```bash
npm run dev
```

### 4. Открой http://localhost:5173

---

## 📱 Деплой в Telegram

### 1. Собери проект

```bash
npm run build
```

### 2. Задеплой на хостинг (нужен HTTPS!)

**Vercel (рекомендую):**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### 3. Задеплой сервер

Для production нужен сервер с Python. Варианты:
- **Railway.app** (бесплатно)
- **Render.com** (бесплатно)
- **VPS** (DigitalOcean, Hetzner)

### 4. Создай бота в @BotFather

```
/newbot
Имя: CodeStreak
Username: YourCodeStreakBot
```

### 5. Создай Mini App

```
/newapp
→ Выбери бота
→ Название: CodeStreak
→ URL: https://your-app.vercel.app
```

---

## 💾 Сохранение данных

Данные сохраняются по **Telegram User ID**:

1. **SQLite база данных** (`server/codestreak.db`)
2. **LocalStorage** (backup в браузере)
3. **Telegram Cloud Storage** (если доступно)

### API эндпоинты

| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/user/:telegram_id` | Получить данные пользователя |
| POST | `/api/user/:telegram_id` | Сохранить данные |
| POST | `/api/user/:telegram_id/sync` | Синхронизация с мержем |
| GET | `/api/leaderboard` | Таблица лидеров |
| POST | `/api/clans` | Создать клан |
| POST | `/api/clans/:id/join` | Вступить в клан |
| POST | `/api/gifts/send` | Отправить подарок |

---

## ✨ Функции

### Обучение
- 🐍 11 навыков Python (Основы → ООП)
- 📚 6 типов упражнений
- 🎯 Умная практика
- 🧪 Песочница с выполнением кода

### Геймификация
- ❤️ Жизни (восстанавливаются)
- 🔥 Стрики (серия дней)
- ⭐ XP и уровни
- 💎 Гемчики (валюта)
- 🏆 Лидерборд

### Социальное
- 👥 Друзья
- 🏰 Кланы с чатом
- ⚔️ Дуэли 1v1
- 🎁 Подарки

### Награды
- 🎡 Колесо фортуны (1 раз в 24ч)
- 🏅 Достижения
- 🎖️ Battle Pass
- 🛒 Магазин

---

## 🔧 Конфигурация

### Переменные окружения (опционально)

Создай `.env` в корне проекта:

```env
VITE_API_URL=https://your-api-server.com/api
```

### Настройка API URL

В `src/api.ts`:
```typescript
const API_URL = 'http://localhost:3001/api'; // Измени на свой сервер
```

---

## 📁 Структура проекта

```
├── src/
│   ├── App.tsx          # Главный компонент
│   ├── api.ts           # API клиент
│   ├── data/
│   │   └── lessons.ts   # Данные уроков
│   └── index.css        # Стили
├── server/
│   ├── server.py        # Python API сервер
│   ├── requirements.txt # Python зависимости
│   └── codestreak.db    # SQLite база (создаётся автоматически)
├── index.html
├── package.json
└── README.md
```

---

## 🐛 Отладка

### Проверь что сервер работает

```bash
curl http://localhost:3001/api/health
```

Должен вернуть:
```json
{"success": true, "status": "ok", "database": true}
```

### Проверь данные пользователя

```bash
curl http://localhost:3001/api/user/test_user_123
```

### Логи в консоли браузера

- `📱 Loading data for Telegram ID: xxx` - загрузка
- `☁️ Got data from server` - получены данные с сервера
- `💾 Saving user data...` - сохранение
- `✅ Data saved to server` - успешно сохранено

---

## 📝 Лицензия

MIT

Made with ❤️ for coders
