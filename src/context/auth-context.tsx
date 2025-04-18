"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAllAuthStatus, saveAuthToken, removeAuthToken, openAuthWindow, PlatformAuth } from '@/lib/auth-utils';

interface PlatformAuthContextType {
  authenticatedPlatforms: Record<string, boolean>;
  authenticatePlatform: (platform: string) => void;
  disconnectPlatform: (platform: string) => void;
  isAuthenticated: (platform: string) => boolean;
}

const PlatformAuthContext = createContext<PlatformAuthContextType | undefined>(undefined);

export function usePlatformAuth() {
  const context = useContext(PlatformAuthContext);
  if (!context) {
    throw new Error('usePlatformAuth must be used within a PlatformAuthProvider');
  }
  return context;
}

interface PlatformAuthProviderProps {
  children: ReactNode;
}

export function PlatformAuthProvider({ children }: PlatformAuthProviderProps) {
  const [authenticatedPlatforms, setAuthenticatedPlatforms] = useState<Record<string, boolean>>({});
  
  // Sayfa yüklendiğinde mevcut kimlik doğrulama durumlarını kontrol et
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const status = getAllAuthStatus();
      setAuthenticatedPlatforms(status);
    }
  }, []);

  // Platform kimlik doğrulama işlemini başlat
  const authenticatePlatform = (platform: string) => {
    // Pencere açılamadıysa işlemi sonlandır
    const authWindow = openAuthWindow(platform);
    if (!authWindow) {
      console.error(`Could not open auth window for ${platform}`);
      return;
    }
    
    // Kullanıcı pencereyi kapatırsa işlemi iptal et
    const checkWindowClosed = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(checkWindowClosed);
        console.log(`Authentication window for ${platform} was closed by user`);
        
        // Pencere kapatıldığında ve kimlik doğrulama yapılmadığında
        // butonun aktif olmamasını sağla
        if (!authenticatedPlatforms[platform]) {
          console.log(`Authentication was not completed for ${platform}`);
          // Kimlik doğrulama tamamlanmadığında platformu aktif listesinden kaldır
          setAuthenticatedPlatforms(prev => ({
            ...prev,
            [platform]: false
          }));
        }
      }
    }, 500);
    
    // Gerçek bir OAuth entegrasyonunda, burada redirect URL ile callback alınır
    // Bu demo için, pencere içindeki değişiklikleri kontrol etmeye çalışalım
    const checkAuthStatus = () => {
      try {
        // Kullanıcı giriş yapmış mı kontrol et (demo amaçlı)
        // Gerçek uygulamada burada OAuth callback URL'i dinlenecek
        
        // Demo için, kullanıcının giriş yaptığını varsayalım ve bir buton ekleyelim
        if (authWindow && !authWindow.closed) {
          try {
            // Pencereye bir onay butonu ekle
            authWindow.document.body.innerHTML += `
              <div style="position: fixed; top: 10px; right: 10px; background: #4CAF50; color: white; padding: 10px; border-radius: 5px; z-index: 9999;">
                <p>Demo Mode: Click to simulate successful login</p>
                <button id="socflow-auth-success" style="background: white; color: black; border: none; padding: 8px 15px; border-radius: 3px; cursor: pointer;">
                  Confirm Login
                </button>
              </div>
            `;
            
            // Butona tıklandığında kimlik doğrulama başarılı olsun
            authWindow.document.getElementById('socflow-auth-success')?.addEventListener('click', () => {
              // Demo için mocklanmış token
              const mockAuth: PlatformAuth = {
                platform,
                accessToken: `mock_token_${platform}_${Date.now()}`,
                expiresAt: Date.now() + 3600000, // 1 saat geçerli
                username: `user_${platform}`
              };
              
              // Token'ı şifreli olarak kaydet
              saveAuthToken(mockAuth);
              
              // Durum güncellemesi
              setAuthenticatedPlatforms(prev => ({
                ...prev,
                [platform]: true
              }));
              
              // Pencereyi kapat
              clearInterval(checkWindowClosed);
              authWindow.close();
            });
          } catch (error) {
            // CORS hatası olabilir, bu durumda butonu ekleyemeyiz
            console.log('Could not modify auth window content due to CORS restrictions');
          }
        }
      } catch (error) {
        // CORS hatası olabilir, bu normal
        console.log('Could not check auth status due to CORS restrictions');
      }
    };
    
    // Pencere açıldıktan kısa bir süre sonra kontrol et
    setTimeout(checkAuthStatus, 1000);
  };

  // Platform bağlantısını kes
  const disconnectPlatform = (platform: string) => {
    // Token'ı sil
    removeAuthToken(platform);
    
    // Durum güncellemesi
    setAuthenticatedPlatforms(prev => ({
      ...prev,
      [platform]: false
    }));
  };

  // Platform kimlik doğrulama durumunu kontrol et
  const isAuthenticated = (platform: string) => {
    return authenticatedPlatforms[platform] || false;
  };

  return (
    <PlatformAuthContext.Provider
      value={{
        authenticatedPlatforms,
        authenticatePlatform,
        disconnectPlatform,
        isAuthenticated
      }}
    >
      {children}
    </PlatformAuthContext.Provider>
  );
}
