"use client";

import { ReactNode } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';

interface MainLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export function MainLayout({ children, showSidebar = true }: MainLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {showSidebar && <Sidebar />}
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
