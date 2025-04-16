"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bell, Menu, Search, Sun, Moon, User, Settings, LogOut, Lock, CreditCard, HelpCircle, Key } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/providers/theme-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Saati güncellemek için useEffect kullanıyoruz
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Her dakika güncelle

    return () => clearInterval(timer);
  }, []);

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
          {/* Tarih */}
          <div className="text-right mr-2 hidden md:block">
            <p className="text-sm font-medium">{currentDate.toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
            <p className="text-xs text-white/70">{currentDate.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}</p>
          </div>
          
          {/* Zil butonu */}
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full relative cursor-pointer h-12 w-12">
            <Bell className="h-8 w-8" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-white"></span>
          </Button>
          
          {/* Gece/Gündüz tema butonu */}
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full cursor-pointer h-12 w-12" onClick={toggleTheme}>
            {theme === 'dark' ? <Moon className="h-8 w-8" /> : <Sun className="h-8 w-8" />}
          </Button>
          
          {/* Profil butonu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full bg-white/20 hover:bg-white/30 h-12 w-12 cursor-pointer">
                <User className="h-8 w-8 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[#1e1f1c] text-white border-[#333] mt-2">
              <div className="flex flex-col space-y-1 p-2">
                <p className="font-medium text-sm">User Name</p>
                <p className="text-xs text-white/70">user@example.com</p>
              </div>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-white/10">
                <User className="h-4 w-4" />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-white/10">
                <Key className="h-4 w-4" />
                <span>API Keys</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-white/10">
                <CreditCard className="h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-white/10">
                <HelpCircle className="h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-white/10">
                <Lock className="h-4 w-4" />
                <span>Privacy & Security</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-white/10">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem> 
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-white/10 text-red-400">
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
