const API_URL = 'http://localhost:3001/api';


export function getTelegramUserId(): string {
  const tg = window.Telegram?.WebApp?.initDataUnsafe?.user;
  if (tg?.id) {
    const telegramId = String(tg.id);
    console.log('📱 Got Telegram ID from WebApp:', telegramId, '| User:', tg.first_name);
    localStorage.setItem('codestreak_telegram_id', telegramId);
    return telegramId;
  }

  const savedTelegramId = localStorage.getItem('codestreak_telegram_id');
  if (savedTelegramId) {
    console.log('📱 Using saved Telegram ID:', savedTelegramId);
    return savedTelegramId;
  }

  let localId = localStorage.getItem('codestreak_user_id');
  if (!localId) {
    localId = 'local_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('codestreak_user_id', localId);
    console.warn('Created new local ID (data will NOT sync between devices):', localId);
  } else {
    console.log('Using local ID (no Telegram):', localId);
  }
  return localId;
}

export function getUserInfo(): { userId: string; isFromTelegram: boolean; username?: string; firstName?: string } {
  const tg = window.Telegram?.WebApp?.initDataUnsafe?.user;
  if (tg?.id) {
    return {
      userId: String(tg.id),
      isFromTelegram: true,
      username: tg.username,
      firstName: tg.first_name
    };
  }
  
  const savedId = localStorage.getItem('codestreak_telegram_id');
  return {
    userId: savedId || getTelegramUserId(),
    isFromTelegram: !!savedId
  };
}

export function debugUserId(): void {
  console.log('=== DEBUG USER ID ===');
  console.log('1. Telegram WebApp available:', !!window.Telegram?.WebApp);
  console.log('2. Telegram initDataUnsafe:', window.Telegram?.WebApp?.initDataUnsafe);
  console.log('3. Telegram user:', window.Telegram?.WebApp?.initDataUnsafe?.user);
  console.log('4. Saved telegram_id in localStorage:', localStorage.getItem('codestreak_telegram_id'));
  console.log('5. Saved local user_id:', localStorage.getItem('codestreak_user_id'));
  console.log('6. Final ID being used:', getTelegramUserId());
  console.log('======================');
}

export function resetLocalId(): void {
  localStorage.removeItem('codestreak_user_id');
  localStorage.removeItem('codestreak_telegram_id');
  console.log('✅ Local IDs cleared. Refresh the page.');
}

export function setTelegramId(id: string): void {
  localStorage.setItem('codestreak_telegram_id', id);
  console.log('✅ Telegram ID set to:', id, '. Refresh the page.');
}

export function saveToLocalStorage(data: any): void {
  try {
    localStorage.setItem('codestreak_user', JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

export function loadFromLocalStorage(): any | null {
  try {
    const saved = localStorage.getItem('codestreak_user');
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.warn('Failed to load from localStorage:', e);
    return null;
  }
}

export async function checkServerHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return data.status === 'ok';
  } catch (error) {
    console.warn('⚠️ Server not available:', error);
    return false;
  }
}

export async function loadUserData(telegramId?: string): Promise<any | null> {
  const id = telegramId || getTelegramUserId();
  
  try {
    console.log(`📱 Loading data for Telegram ID: ${id}`);
    
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const result = await response.json();
    
    if (result.success) {
      if (result.exists && result.data) {
        console.log('✅ User data loaded from server');
        return result.data;
      } else {
        console.log('ℹ️ New user, no data on server yet');
        return null;
      }
    } else {
      console.warn('⚠️ Server error:', result.error);
      return null;
    }
  } catch (error) {
    console.warn('⚠️ Failed to load from server:', error);
    return null;
  }
}

export async function saveUserData(data: any, telegramId?: string): Promise<boolean> {
  const id = telegramId || getTelegramUserId();
  
  try {
    console.log(`Saving data for Telegram ID: ${id}`);
    
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Data saved to server');
      return true;
    } else {
      console.warn('Failed to save:', result.error);
      return false;
    }
  } catch (error) {
    console.warn('Failed to save to server:', error);
    return false;
  }
}

export async function syncUserData(data: any, telegramId?: string): Promise<any | null> {
  const id = telegramId || getTelegramUserId();
  
  try {
    console.log(`🔄 Syncing data for Telegram ID: ${id}`);
    
    const response = await fetch(`${API_URL}/user/${id}/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Data synced with server');
      return result.data;
    } else {
      console.warn('Sync failed:', result.error);
      return null;
    }
  } catch (error) {
    console.warn('Failed to sync with server:', error);
    return null;
  }
}

export async function getClans(): Promise<any[]> {
  try {
    const response = await fetch(`${API_URL}/clans`);
    const result = await response.json();
    return result.success ? result.clans : [];
  } catch (error) {
    console.warn('Failed to get clans:', error);
    return [];
  }
}

export async function createClan(name: string, icon: string, leaderId?: string): Promise<string | null> {
  const id = leaderId || getTelegramUserId();
  
  try {
    const response = await fetch(`${API_URL}/clans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, icon, leader_id: id })
    });
    const result = await response.json();
    return result.success ? String(result.clan_id) : null;
  } catch (error) {
    console.warn('Failed to create clan:', error);
    return null;
  }
}

export async function joinClan(clanId: string, telegramId?: string): Promise<boolean> {
  const id = telegramId || getTelegramUserId();
  
  try {
    const response = await fetch(`${API_URL}/clans/${clanId}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegram_id: id })
    });
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.warn('Failed to join clan:', error);
    return false;
  }
}

export async function leaveClan(clanId: string, telegramId?: string): Promise<boolean> {
  const id = telegramId || getTelegramUserId();
  
  try {
    const response = await fetch(`${API_URL}/clans/${clanId}/leave`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegram_id: id })
    });
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.warn('Failed to leave clan:', error);
    return false;
  }
}

export async function getClanMessages(clanId: string): Promise<any[]> {
  try {
    const response = await fetch(`${API_URL}/clans/${clanId}/messages`);
    const result = await response.json();
    return result.success ? result.messages : [];
  } catch (error) {
    console.warn('Failed to get clan messages:', error);
    return [];
  }
}

export async function sendClanMessage(clanId: string, message: string, telegramId?: string): Promise<boolean> {
  const id = telegramId || getTelegramUserId();
  const username = window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Anonymous';
  
  try {
    const response = await fetch(`${API_URL}/clans/${clanId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegram_id: id, username, message })
    });
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.warn('Failed to send clan message:', error);
    return false;
  }
}


export async function sendGift(toId: string, giftType: string, amount: number): Promise<boolean> {
  const fromId = getTelegramUserId();
  
  try {
    const response = await fetch(`${API_URL}/gifts/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from_id: fromId, to_id: toId, gift_type: giftType, amount })
    });
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.warn('Failed to send gift:', error);
    return false;
  }
}

export async function getGifts(): Promise<any[]> {
  const id = getTelegramUserId();
  
  try {
    const response = await fetch(`${API_URL}/gifts/${id}`);
    const result = await response.json();
    return result.success ? result.gifts : [];
  } catch (error) {
    console.warn('Failed to get gifts:', error);
    return [];
  }
}


export async function getLeaderboard(): Promise<any[]> {
  try {
    const response = await fetch(`${API_URL}/leaderboard`);
    const result = await response.json();
    return result.success ? result.users : [];
  } catch (error) {
    console.warn('Failed to get leaderboard:', error);
    return [];
  }
}
