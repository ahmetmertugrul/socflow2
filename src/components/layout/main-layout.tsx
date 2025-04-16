"use client";

import { ReactNode } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { useTheme } from '@/providers/theme-context';

interface MainLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export function MainLayout({ children, showSidebar = true }: MainLayoutProps) {
  const { theme } = useTheme();
  
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && <Sidebar />}
        <div className={`flex-1 overflow-auto ${theme === 'dark' ? 'dark' : ''}`}>
          <main className="bg-background text-foreground h-full transition-colors duration-200">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
