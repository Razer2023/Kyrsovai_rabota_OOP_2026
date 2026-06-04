
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json
import os
from datetime import datetime
from functools import wraps

STATIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')

app = Flask(__name__, static_folder=STATIC_DIR, static_url_path='')
CORS(app)

#путь к базе данных
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'codestreak.db')

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    print(f"Путь к БД: {DB_PATH}")
    
    conn = get_db()
    cursor = conn.cursor()
    
    #таблица пользователей
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            telegram_id TEXT PRIMARY KEY,
            username TEXT,
            first_name TEXT,
            data TEXT NOT NULL DEFAULT '{}',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    #таблица кланов
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS clans (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            icon TEXT DEFAULT '🐍',
            leader_id TEXT NOT NULL,
            total_xp INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    #участники кланов
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS clan_members (
            clan_id INTEGER,
            telegram_id TEXT,
            username TEXT,
            xp_contributed INTEGER DEFAULT 0,
            joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (clan_id, telegram_id),
            FOREIGN KEY (clan_id) REFERENCES clans(id) ON DELETE CASCADE
        )
    ''')
    
    #сообщения в чате клана
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS clan_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            clan_id INTEGER,
            telegram_id TEXT,
            username TEXT,
            avatar TEXT DEFAULT '👤',
            message TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (clan_id) REFERENCES clans(id) ON DELETE CASCADE
        )
    ''')
    
    #подарки между пользователями
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS gifts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            from_id TEXT,
            to_id TEXT,
            gift_type TEXT,
            amount INTEGER DEFAULT 1,
            claimed INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    #друзья
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS friends (
            user_id TEXT,
            friend_id TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (user_id, friend_id)
        )
    ''')
    
    #дуэли
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS duels (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            player1_id TEXT,
            player2_id TEXT,
            player1_score INTEGER DEFAULT 0,
            player2_score INTEGER DEFAULT 0,
            winner_id TEXT,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()
    print(f"База данных создана: {DB_PATH}")

def log_request(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        print(f"📥 {request.method} {request.path}")
        return f(*args, **kwargs)
    return decorated

@app.route('/api/health', methods=['GET'])
def health():
    """проверка сервера"""
    db_exists = os.path.exists(DB_PATH)
    db_size = os.path.getsize(DB_PATH) if db_exists else 0
    
    return jsonify({
        'status': 'ok',
        'message': 'CodeStreak API is running',
        'database': db_exists,
        'db_size_kb': round(db_size / 1024, 2),
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/user/<telegram_id>', methods=['GET'])
@log_request
def get_user(telegram_id):
    """получить данные пользователя"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM users WHERE telegram_id = ?', (telegram_id,))
        row = cursor.fetchone()
        conn.close()
        
        if row:
            user_data = json.loads(row['data']) if row['data'] else {}
            print(f"Загружен пользователь: {telegram_id} (XP: {user_data.get('totalXp', 0)})")
            return jsonify({
                'success': True,
                'exists': True,
                'telegram_id': row['telegram_id'],
                'username': row['username'],
                'data': user_data,
                'updated_at': row['updated_at']
            })
        else:
            print(f"Новый пользователь: {telegram_id}")
            return jsonify({
                'success': True,
                'exists': False,
                'telegram_id': telegram_id,
                'data': None,
                'message': 'User not found, will be created on first save'
            })
            
    except Exception as e:
        print(f"Ошибка загрузки {telegram_id}: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/user/<telegram_id>', methods=['POST'])
@log_request
def save_user(telegram_id):
    """сохранить данные пользователя"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'error': 'No data provided'}), 400
        
        conn = get_db()
        cursor = conn.cursor()
        
        username = data.get('username', '')
        first_name = data.get('name', '')
        data_json = json.dumps(data, ensure_ascii=False)
        
        cursor.execute('''
            INSERT INTO users (telegram_id, username, first_name, data, updated_at)
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(telegram_id) DO UPDATE SET
                username = excluded.username,
                first_name = excluded.first_name,
                data = excluded.data,
                updated_at = CURRENT_TIMESTAMP
        ''', (telegram_id, username, first_name, data_json))
        
        conn.commit()
        conn.close()
        
        print(f"Сохранён пользователь: {telegram_id} (Level: {data.get('level', 1)}, XP: {data.get('totalXp', 0)})")
        
        return jsonify({
            'success': True,
            'message': 'User data saved',
            'telegram_id': telegram_id
        })
        
    except Exception as e:
        print(f"Ошибка сохранения {telegram_id}: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/user/<telegram_id>/sync', methods=['POST'])
@log_request
def sync_user(telegram_id):
    """синхронизация данных"""
    try:
        client_data = request.get_json()
        
        if not client_data:
            return jsonify({'success': False, 'error': 'No data provided'}), 400
        
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('SELECT data FROM users WHERE telegram_id = ?', (telegram_id,))
        row = cursor.fetchone()
        
        if row and row['data']:
            server_data = json.loads(row['data'])
            merged_data = merge_user_data(server_data, client_data)
        else:
            merged_data = client_data
        
        username = merged_data.get('username', '')
        first_name = merged_data.get('name', '')
        data_json = json.dumps(merged_data, ensure_ascii=False)
        
        cursor.execute('''
            INSERT INTO users (telegram_id, username, first_name, data, updated_at)
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(telegram_id) DO UPDATE SET
                username = excluded.username,
                first_name = excluded.first_name,
                data = excluded.data,
                updated_at = CURRENT_TIMESTAMP
        ''', (telegram_id, username, first_name, data_json))
        
        conn.commit()
        conn.close()
        
        print(f"Синхронизирован: {telegram_id}")
        
        return jsonify({
            'success': True,
            'message': 'Data synced',
            'data': merged_data
        })
        
    except Exception as e:
        print(f"Ошибка синхронизации {telegram_id}: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

def merge_user_data(server_data, client_data):
    """объединение данных сервера и клиента"""
    merged = {**server_data}

    numeric_fields = ['xp', 'totalXp', 'level', 'gems', 'streak', 
                      'lessonsCompleted', 'perfectLessons', 'duelWins', 'duelElo']
    for key in numeric_fields:
        client_val = client_data.get(key, 0) or 0
        server_val = server_data.get(key, 0) or 0
        merged[key] = max(client_val, server_val)

    array_fields = ['completedLessons', 'unlockedSkills', 'achievements', 
                    'purchasedItems', 'friends']
    for key in array_fields:
        server_list = server_data.get(key, []) or []
        client_list = client_data.get(key, []) or []
        merged[key] = list(set(server_list + client_list))

    server_progress = server_data.get('skillProgress', {}) or {}
    client_progress = client_data.get('skillProgress', {}) or {}
    merged_progress = {**server_progress}
    for skill, progress in client_progress.items():
        if skill not in merged_progress or progress > merged_progress[skill]:
            merged_progress[skill] = progress
    merged['skillProgress'] = merged_progress

    timestamp_fields = ['lastWheelSpin', 'lastLessonDate', 'lastGiftSent']
    for key in timestamp_fields:
        client_val = client_data.get(key, 0) or 0
        server_val = server_data.get(key, 0) or 0
        merged[key] = max(client_val, server_val)

    for key in client_data:
        if key not in merged or merged[key] is None:
            merged[key] = client_data[key]

    for key in ['name', 'username', 'avatar', 'activePet', 'activeTheme', 'clan']:
        if key in client_data:
            merged[key] = client_data[key]
    
    return merged

@app.route('/api/clans', methods=['GET'])
@log_request
def get_clans():
    """список всех кланов"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        # Создаём дефолтные кланы если их нет
        cursor.execute('SELECT COUNT(*) as cnt FROM clans')
        count = cursor.fetchone()['cnt']
        
        if count == 0:
            default_clans = [
                ('Python Masters', '🐍', 'system', 125000),
                ('Code Lightning', '⚡', 'system', 98000),
                ('Bug Hunters', '🐛', 'system', 87500),
                ('Night Coders', '🌙', 'system', 142000),
                ('Rocket Devs', '🚀', 'system', 65000),
            ]
            for name, icon, leader, xp in default_clans:
                cursor.execute('''
                    INSERT OR IGNORE INTO clans (name, icon, leader_id, total_xp)
                    VALUES (?, ?, ?, ?)
                ''', (name, icon, leader, xp))
            conn.commit()
            print("Созданы дефолтные кланы")
        
        cursor.execute('''
            SELECT c.*, COUNT(cm.telegram_id) as member_count,
                   (SELECT username FROM clan_members WHERE clan_id = c.id AND telegram_id = c.leader_id) as leader_name
            FROM clans c
            LEFT JOIN clan_members cm ON c.id = cm.clan_id
            GROUP BY c.id
            ORDER BY c.total_xp DESC
            LIMIT 50
        ''')
        
        clans = []
        for row in cursor.fetchall():
            clans.append({
                'id': row['id'],
                'name': row['name'],
                'icon': row['icon'],
                'leader_id': row['leader_id'],
                'leader_name': row['leader_name'] or 'Leader',
                'total_xp': row['total_xp'] or 0,
                'member_count': max(1, row['member_count']),
                'created_at': row['created_at']
            })
        
        conn.close()
        print(f"Возвращаю {len(clans)} кланов")
        return jsonify({'success': True, 'clans': clans})
        
    except Exception as e:
        print(f"Ошибка получения кланов: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/clans', methods=['POST'])
@log_request
def create_clan():
    """создать клан"""
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        icon = data.get('icon', '🐍')
        leader_id = data.get('leader_id')
        leader_name = data.get('leader_name', 'Leader')
        
        if not name or len(name) < 3:
            return jsonify({'success': False, 'error': 'Название должно быть минимум 3 символа'}), 400
        
        if not leader_id:
            return jsonify({'success': False, 'error': 'leader_id required'}), 400
        
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute('SELECT id FROM clans WHERE name = ?', (name,))
        if cursor.fetchone():
            conn.close()
            return jsonify({'success': False, 'error': 'Клан с таким названием уже существует'}), 400

        cursor.execute('SELECT clan_id FROM clan_members WHERE telegram_id = ?', (leader_id,))
        if cursor.fetchone():
            conn.close()
            return jsonify({'success': False, 'error': 'Вы уже состоите в клане'}), 400
        
        cursor.execute('''
            INSERT INTO clans (name, icon, leader_id, total_xp)
            VALUES (?, ?, ?, 0)
        ''', (name, icon, leader_id))
        
        clan_id = cursor.lastrowid

        cursor.execute('''
            INSERT INTO clan_members (clan_id, telegram_id, username)
            VALUES (?, ?, ?)
        ''', (clan_id, leader_id, leader_name))
        
        conn.commit()
        conn.close()
        
        print(f"Создан клан: {name} (ID: {clan_id})")
        
        return jsonify({
            'success': True,
            'clan_id': clan_id,
            'message': 'Clan created',
            'clan': {
                'id': clan_id,
                'name': name,
                'icon': icon,
                'leader_id': leader_id
            }
        })
        
    except Exception as e:
        print(f"Ошибка создания клана: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/clans/<int:clan_id>', methods=['GET'])
@log_request
def get_clan(clan_id):
    """информация о клане"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM clans WHERE id = ?', (clan_id,))
        clan_row = cursor.fetchone()
        
        if not clan_row:
            conn.close()
            return jsonify({'success': False, 'error': 'Clan not found'}), 404

        cursor.execute('''
            SELECT cm.*, u.data
            FROM clan_members cm
            LEFT JOIN users u ON cm.telegram_id = u.telegram_id
            WHERE cm.clan_id = ?
            ORDER BY cm.xp_contributed DESC
        ''', (clan_id,))
        
        members = []
        for row in cursor.fetchall():
            user_data = json.loads(row['data']) if row['data'] else {}
            members.append({
                'telegram_id': row['telegram_id'],
                'username': row['username'] or user_data.get('name', 'Player'),
                'xp': user_data.get('totalXp', 0),
                'level': user_data.get('level', 1),
                'xp_contributed': row['xp_contributed'],
                'joined_at': row['joined_at']
            })
        
        conn.close()
        
        return jsonify({
            'success': True,
            'clan': {
                'id': clan_row['id'],
                'name': clan_row['name'],
                'icon': clan_row['icon'],
                'leader_id': clan_row['leader_id'],
                'total_xp': clan_row['total_xp'],
                'member_count': len(members),
                'members': members
            }
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/clans/<int:clan_id>/join', methods=['POST'])
@log_request
def join_clan(clan_id):
    """вступить в клан"""
    try:
        data = request.get_json()
        telegram_id = data.get('telegram_id')
        username = data.get('username', 'Player')
        
        if not telegram_id:
            return jsonify({'success': False, 'error': 'telegram_id required'}), 400
        
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute('SELECT * FROM clans WHERE id = ?', (clan_id,))
        clan = cursor.fetchone()
        if not clan:
            conn.close()
            return jsonify({'success': False, 'error': 'Clan not found'}), 404

        cursor.execute('SELECT clan_id FROM clan_members WHERE telegram_id = ?', (telegram_id,))
        existing = cursor.fetchone()
        if existing:
            conn.close()
            return jsonify({'success': False, 'error': 'Вы уже состоите в клане'}), 400

        cursor.execute('''
            INSERT INTO clan_members (clan_id, telegram_id, username)
            VALUES (?, ?, ?)
        ''', (clan_id, telegram_id, username))
        
        conn.commit()
        conn.close()
        
        print(f"{username} вступил в клан {clan['name']}")
        
        return jsonify({
            'success': True, 
            'message': 'Joined clan',
            'clan': {
                'id': clan['id'],
                'name': clan['name'],
                'icon': clan['icon']
            }
        })
        
    except Exception as e:
        print(f"Ошибка вступления в клан: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/clans/<int:clan_id>/leave', methods=['POST'])
@log_request
def leave_clan(clan_id):
    """покинуть клан"""
    try:
        data = request.get_json()
        telegram_id = data.get('telegram_id')
        
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute('SELECT leader_id FROM clans WHERE id = ?', (clan_id,))
        clan = cursor.fetchone()
        
        if clan and clan['leader_id'] == telegram_id:
            cursor.execute('DELETE FROM clan_messages WHERE clan_id = ?', (clan_id,))
            cursor.execute('DELETE FROM clan_members WHERE clan_id = ?', (clan_id,))
            cursor.execute('DELETE FROM clans WHERE id = ?', (clan_id,))
            message = 'Clan deleted (leader left)'
        else:
            cursor.execute('''
                DELETE FROM clan_members
                WHERE clan_id = ? AND telegram_id = ?
            ''', (clan_id, telegram_id))
            message = 'Left clan'
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': message})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/clans/<int:clan_id>/messages', methods=['GET'])
@log_request
def get_clan_messages(clan_id):
    """сообщения чата клана"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT * FROM clan_messages
            WHERE clan_id = ?
            ORDER BY created_at DESC
            LIMIT 100
        ''', (clan_id,))
        
        messages = []
        for row in cursor.fetchall():
            created_at = row['created_at']
            try:
                from datetime import datetime as dt
                if isinstance(created_at, str):
                    parsed = dt.fromisoformat(created_at.replace('Z', '+00:00'))
                    time_str = parsed.strftime('%H:%M')
                else:
                    time_str = '00:00'
            except:
                time_str = str(created_at)[-8:-3] if created_at and len(str(created_at)) > 8 else '00:00'
            
            messages.append({
                'id': row['id'],
                'telegram_id': row['telegram_id'],
                'username': row['username'] or 'Аноним',
                'avatar': row['avatar'] if 'avatar' in row.keys() else '👤',
                'message': row['message'],
                'text': row['message'],
                'time': time_str,
                'created_at': row['created_at']
            })
        
        conn.close()
        print(f"Возвращаю {len(messages)} сообщений для клана {clan_id}")
        return jsonify({'success': True, 'messages': list(reversed(messages))})
        
    except Exception as e:
        print(f"Ошибка получения сообщений: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/clans/<int:clan_id>/messages', methods=['POST'])
@log_request
def send_clan_message(clan_id):
    """отправить сообщение"""
    try:
        data = request.get_json()
        telegram_id = data.get('telegram_id')
        username = data.get('username', 'Anonymous')
        avatar = data.get('avatar', '👤')
        message = data.get('message', '').strip()
        
        if not message:
            return jsonify({'success': False, 'error': 'Message required'}), 400
        
        if len(message) > 500:
            return jsonify({'success': False, 'error': 'Message too long (max 500)'}), 400
        
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute("PRAGMA table_info(clan_messages)")
        columns = [col[1] for col in cursor.fetchall()]
        
        if 'avatar' in columns:
            cursor.execute('''
                INSERT INTO clan_messages (clan_id, telegram_id, username, avatar, message)
                VALUES (?, ?, ?, ?, ?)
            ''', (clan_id, telegram_id, username, avatar, message))
        else:
            cursor.execute('''
                INSERT INTO clan_messages (clan_id, telegram_id, username, message)
                VALUES (?, ?, ?, ?)
            ''', (clan_id, telegram_id, username, message))
        
        message_id = cursor.lastrowid
        now = datetime.now()
        time_str = now.strftime('%H:%M')
        
        conn.commit()
        conn.close()
        
        print(f"💬 {username}: {message[:30]}...")
        
        return jsonify({
            'success': True, 
            'message_id': message_id,
            'time': time_str,
            'created_at': now.isoformat()
        })
        
    except Exception as e:
        print(f"ошибка отправки сообщения: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/friends/<telegram_id>', methods=['GET'])
@log_request
def get_friends(telegram_id):
    """список друзей"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT f.friend_id, u.username, u.first_name, u.data
            FROM friends f
            LEFT JOIN users u ON f.friend_id = u.telegram_id
            WHERE f.user_id = ?
        ''', (telegram_id,))
        
        friends = []
        for row in cursor.fetchall():
            user_data = json.loads(row['data']) if row['data'] else {}
            friends.append({
                'telegram_id': row['friend_id'],
                'username': row['username'] or user_data.get('username', ''),
                'name': row['first_name'] or user_data.get('name', 'Player'),
                'xp': user_data.get('totalXp', 0),
                'level': user_data.get('level', 1),
                'streak': user_data.get('streak', 0),
                'avatar': user_data.get('avatar', '🐱')
            })
        
        conn.close()
        return jsonify({'success': True, 'friends': friends})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/friends/add', methods=['POST'])
@log_request
def add_friend():
    """добавить друга"""
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        friend_id = data.get('friend_id')
        
        if not user_id or not friend_id:
            return jsonify({'success': False, 'error': 'user_id and friend_id required'}), 400
        
        if user_id == friend_id:
            return jsonify({'success': False, 'error': 'Cannot add yourself'}), 400
        
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute('''
            INSERT OR IGNORE INTO friends (user_id, friend_id) VALUES (?, ?)
        ''', (user_id, friend_id))
        
        cursor.execute('''
            INSERT OR IGNORE INTO friends (user_id, friend_id) VALUES (?, ?)
        ''', (friend_id, user_id))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Friend added'})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/gifts/send', methods=['POST'])
@log_request
def send_gift():
    """отправить подарок"""
    try:
        data = request.get_json()
        from_id = data.get('from_id')
        to_id = data.get('to_id')
        gift_type = data.get('gift_type')
        amount = data.get('amount', 1)
        
        if not all([from_id, to_id, gift_type]):
            return jsonify({'success': False, 'error': 'Missing required fields'}), 400
        
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO gifts (from_id, to_id, gift_type, amount)
            VALUES (?, ?, ?, ?)
        ''', (from_id, to_id, gift_type, amount))
        
        gift_id = cursor.lastrowid
        
        conn.commit()
        conn.close()
        
        print(f"Подарок отправлен: {gift_type} от {from_id} к {to_id}")
        
        return jsonify({'success': True, 'gift_id': gift_id})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/gifts/<telegram_id>', methods=['GET'])
@log_request
def get_gifts(telegram_id):
    """получить непрочитанные подарки"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT g.*, u.username, u.first_name, u.data
            FROM gifts g
            LEFT JOIN users u ON g.from_id = u.telegram_id
            WHERE g.to_id = ? AND g.claimed = 0
            ORDER BY g.created_at DESC
        ''', (telegram_id,))
        
        gifts = []
        for row in cursor.fetchall():
            user_data = json.loads(row['data']) if row['data'] else {}
            gifts.append({
                'id': row['id'],
                'from_id': row['from_id'],
                'from_name': row['first_name'] or user_data.get('name', 'Friend'),
                'gift_type': row['gift_type'],
                'amount': row['amount'],
                'created_at': row['created_at']
            })
        
        conn.close()
        return jsonify({'success': True, 'gifts': gifts})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/gifts/<int:gift_id>/claim', methods=['POST'])
@log_request
def claim_gift(gift_id):
    """принять подарок"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('UPDATE gifts SET claimed = 1 WHERE id = ?', (gift_id,))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/leaderboard', methods=['GET'])
@log_request
def get_leaderboard():
    """топ пользователей"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT telegram_id, username, first_name, data
            FROM users
            WHERE data != '{}'
            ORDER BY CAST(json_extract(data, '$.totalXp') AS INTEGER) DESC
            LIMIT 100
        ''')
        
        users = []
        rank = 1
        for row in cursor.fetchall():
            data = json.loads(row['data']) if row['data'] else {}
            if data.get('totalXp', 0) > 0:
                users.append({
                    'rank': rank,
                    'telegram_id': row['telegram_id'],
                    'username': row['username'] or data.get('username', ''),
                    'name': row['first_name'] or data.get('name', 'Player'),
                    'xp': data.get('totalXp', 0),
                    'level': data.get('level', 1),
                    'streak': data.get('streak', 0),
                    'avatar': data.get('avatar', '🐱')
                })
                rank += 1
        
        conn.close()
        return jsonify({'success': True, 'users': users})
        
    except Exception as e:
        print(f"Ошибка лидерборда: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/stats', methods=['GET'])
@log_request
def get_stats():
    """статистика сервера"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('SELECT COUNT(*) as count FROM users')
        user_count = cursor.fetchone()['count']
        
        cursor.execute('SELECT COUNT(*) as count FROM clans')
        clan_count = cursor.fetchone()['count']
        
        cursor.execute('SELECT SUM(CAST(json_extract(data, "$.totalXp") AS INTEGER)) as total FROM users')
        total_xp = cursor.fetchone()['total'] or 0
        
        conn.close()
        
        return jsonify({
            'success': True,
            'users': user_count,
            'clans': clan_count,
            'total_xp': total_xp
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/')
def serve_index():
    """главная страница"""
    return app.send_static_file('index.html')

@app.route('/favicon.ico')
def favicon():
    return app.send_static_file('favicon.svg')

if __name__ == '__main__':
    os.makedirs(STATIC_DIR, exist_ok=True)
    
    init_db()
    
    print("")
    print(" Endpoints:")
    print("   GET  /api/health              - Health check")
    print("   GET  /api/user/<id>           - Get user")
    print("   POST /api/user/<id>           - Save user")
    print("   POST /api/user/<id>/sync      - Sync user")
    print("   GET  /api/clans               - List clans")
    print("   POST /api/clans               - Create clan")
    print("   GET  /api/clans/<id>          - Get clan info")
    print("   POST /api/clans/<id>/join     - Join clan")
    print("   POST /api/clans/<id>/leave    - Leave clan")
    print("   GET  /api/clans/<id>/messages - Get chat")
    print("   POST /api/clans/<id>/messages - Send message")
    print("   GET  /api/friends/<id>        - Get friends")
    print("   POST /api/friends/add         - Add friend")
    print("   GET  /api/gifts/<id>          - Get gifts")
    print("   POST /api/gifts/send          - Send gift")
    print("   GET  /api/leaderboard         - Top users")
    print("   GET  /api/stats               - Server stats")
    print("")
    print("Server: http://localhost:3001")
    
    app.run(host='0.0.0.0', port=3001, debug=True)
