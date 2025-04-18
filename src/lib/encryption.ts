// Şifreleme yardımcı fonksiyonları

// Basit bir şifreleme anahtarı (gerçek uygulamada daha güvenli bir yöntem kullanılmalıdır)
const ENCRYPTION_KEY = 'socflow-secure-encryption-key-2025';

/**
 * Metni şifreler
 * @param text Şifrelenecek metin
 * @returns Şifrelenmiş metin
 */
export function encrypt(text: string): string {
  // Basit bir şifreleme algoritması (gerçek uygulamada daha güçlü bir algoritma kullanılmalıdır)
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
