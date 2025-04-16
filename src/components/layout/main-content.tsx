"use client";

import { useTheme } from '@/providers/theme-context';

interface MainContentProps {
  children: React.ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  const { theme } = useTheme();
  
  return (
    <main className={`flex-1 p-6 ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="bg-background text-foreground rounded-lg p-4 min-h-[calc(100vh-120px)] transition-colors duration-200">
        {children}
      </div>
    </main>
  );
}
