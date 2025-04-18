// Sosyal medya kimlik doğrulama ve depolama yardımcıları

// Basit bir şifreleme anahtarı
const ENCRYPTION_KEY = 'socflow-secure-encryption-key-2025';

/**
 * Metni şifreler
 * @param text Şifrelenecek metin
 * @returns Şifrelenmiş metin
 */
export function encrypt(text: string): string {
  // Basit bir şifreleme algoritması
  try {
    // Base64 kodlama ve basit bir XOR şifreleme
    const base64 = btoa(text);
    let result = '';
    
    for (let i = 0; i < base64.length; i++) {
      const charCode = base64.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      result += String.fromCharCode(charCode);
    }
    
    return btoa(result); // Sonucu tekrar Base64 kodla
  } catch (error) {
    console.error('Encryption error:', error);
    return '';
  }
}

/**
 * Şifrelenmiş metni çözer
 * @param encryptedText Şifrelenmiş metin
 * @returns Çözülmüş metin
 */
export function decrypt(encryptedText: string): string {
  try {
    // Şifre çözme işlemi (şifrelemenin tersi)
    const decoded = atob(encryptedText);
    let result = '';
    
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      result += String.fromCharCode(charCode);
    }
    
    return atob(result); // Base64 kodlamasını çöz
  } catch (error) {
    console.error('Decryption error:', error);
    return '';
  }
}

// Kullanıcı kimlik bilgilerinin türü
export interface PlatformAuth {
  platform: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
  username?: string;
}

// Platformların kimlik doğrulama URL'leri
export const platformAuthUrls: Record<string, string> = {
  bluesky: 'https://account.bsky.app/signin',
  facebook: 'https://www.facebook.com/login',
  instagram: 'https://www.instagram.com/accounts/login',
  linkedin: 'https://www.linkedin.com/login',
  medium: 'https://medium.com/m/signin',
  pinterest: 'https://www.pinterest.com/login',
  telegram: 'https://web.telegram.org/',
  threads: 'https://www.threads.net/login',
  tiktok: 'https://www.tiktok.com/login',
  tumblr: 'https://www.tumblr.com/login',
  x: 'https://x.com/i/flow/login',
  youtube: 'https://accounts.google.com/signin/v2/identifier?service=youtube'
};

// Kimlik bilgilerini şifreli olarak localStorage'a kaydet
export function saveAuthToken(auth: PlatformAuth): void {
  try {
    const encryptedAuth = encrypt(JSON.stringify(auth));
    localStorage.setItem(`auth_${auth.platform}`, encryptedAuth);
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
}

// Şifreli kimlik bilgilerini localStorage'dan al
export function getAuthToken(platform: string): PlatformAuth | null {
  try {
    const encryptedAuth = localStorage.getItem(`auth_${platform}`);
    if (!encryptedAuth) return null;
    
    const decryptedAuth = decrypt(encryptedAuth);
    return JSON.parse(decryptedAuth) as PlatformAuth;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

// Kimlik bilgilerini localStorage'dan sil
export function removeAuthToken(platform: string): void {
  try {
    localStorage.removeItem(`auth_${platform}`);
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
}

// Tüm platformların kimlik doğrulama durumlarını al
export function getAllAuthStatus(): Record<string, boolean> {
  const platforms = Object.keys(platformAuthUrls);
  const status: Record<string, boolean> = {};
  
  platforms.forEach(platform => {
    status[platform] = getAuthToken(platform) !== null;
  });
  
  return status;
}

// Kimlik doğrulama penceresini aç
export function openAuthWindow(platform: string): Window | null {
  // Kullanıcı zaten kimlik doğrulaması yapmışsa tekrar pencere açma
  const authStatus = getAllAuthStatus();
  if (authStatus[platform]) {
    console.log(`User is already authenticated for ${platform}`);
    return null;
  }
  
  const loginUrl = platformAuthUrls[platform];
  
  if (!loginUrl) {
    console.error(`Login URL for platform ${platform} not found`);
    return null;
  }
  
  // Tarayıcıdaki mevcut oturumları kullanabilmek için
  // Aynı pencerede açılmasını sağla (yeni sekme olarak)
  const authWindow = window.open(
    loginUrl,
    '_blank',  // Yeni sekme olarak aç
    'width=800,height=700,noopener'
  );
  
  return authWindow;
}

// Kimlik doğrulama durumunu kontrol et ve güncelle
export function checkAuthStatus(platform: string): boolean {
  return getAuthToken(platform) !== null;
}
