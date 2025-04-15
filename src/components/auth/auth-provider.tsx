"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { LoginModal } from "./login-modal";
import { SignupModal } from "./signup-modal";

interface AuthContextType {
  isAuthenticated: boolean;
  openLoginModal: () => void;
  openSignupModal: () => void;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Gerçek uygulamada, bu durumu bir token veya oturum kontrolü ile belirleyebilirsiniz
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Varsayılan olarak giriş yapılmış kabul ediyoruz
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const openLoginModal = () => {
    setSignupModalOpen(false);
    setLoginModalOpen(true);
  };

  const openSignupModal = () => {
    setLoginModalOpen(false);
    setSignupModalOpen(true);
  };

  const login = () => {
    setIsAuthenticated(true);
    setLoginModalOpen(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        openLoginModal,
        openSignupModal,
        login,
        logout,
      }}
    >
      {children}
      
      <LoginModal 
        defaultOpen={loginModalOpen} 
        onOpenChange={setLoginModalOpen} 
        onSwitchToSignup={openSignupModal}
      />
      
      <SignupModal 
        defaultOpen={signupModalOpen} 
        onOpenChange={setSignupModalOpen} 
        onSwitchToLogin={openLoginModal}
      />
    </AuthContext.Provider>
  );
}
