"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bell, Menu, Search, Sun, User } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    // Sidebar durumunu global olarak paylaşmak için bir event yayınlayalım
    const event = new CustomEvent('toggle-sidebar', { detail: { collapsed: !isSidebarCollapsed } });
    window.dispatchEvent(event);
  };

  return (
    <header className="bg-[#3c3d3a] text-white sticky top-0 z-50 w-full">
      <div className="flex h-16 items-center justify-between pl-0 pr-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white rounded-md hover:bg-white/10 cursor-pointer p-4 m-0 ml-3.5" onClick={toggleSidebar}>
            <Menu className="h-10 w-10" />
          </Button>
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">SocFlow</span>
          </Link>
        </div>
        
        <div className="flex-1 px-2 mx-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/70" />
            <input 
              type="search" 
              placeholder="Search..." 
              className="w-full bg-white/20 border-none rounded-full pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder:text-white/70"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full cursor-pointer">
            <Sun className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full relative cursor-pointer">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-white"></span>
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="text-right mr-2 hidden md:block">
              <p className="text-sm font-medium">April 15, 2025</p>
              <p className="text-xs text-white/70">04:39 PM</p>
            </div>
            
            <Button variant="ghost" size="icon" className="rounded-full bg-white/20 hover:bg-white/30 h-8 w-8 cursor-pointer">
              <span className="text-white font-medium text-sm">U</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
