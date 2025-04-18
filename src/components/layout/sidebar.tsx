"use client";

import Link from 'next/link'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Home, Calendar as CalendarIcon, BarChart2, Users, FileText, Plus, ChevronRight, ChevronLeft, LogOut, X } from 'lucide-react'
import { BlueskyIcon, FacebookIcon, InstagramIcon, LinkedinIcon, MediumIcon, PinterestIcon, TelegramIcon, ThreadsIcon, TiktokIcon, TumblrIcon, XIcon, YoutubeIcon } from '@/components/icons/SocialIcons'
import { useEffect, useState } from 'react'
import { usePlatformAuth } from '@/context/auth-context'
import { socialPlatforms } from '@/config/social-platforms'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(3) // Nisan ayı için 3 (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025)
  const [activePlatforms, setActivePlatforms] = useState<string[]>([])
  const currentDate = new Date()
  
  // Platform Auth context'ten kimlik doğrulama fonksiyonlarını al
  const { authenticatePlatform, disconnectPlatform, isAuthenticated } = usePlatformAuth()
  
  // Ay isimleri
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
    ]

  // Seçili ayın gün sayısını hesapla
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  }

  // Ayın ilk gününün haftanın hangi gününe denk geldiğini hesapla (0 = Pazar, 1 = Pazartesi, ...)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  }

  // Önceki aya git
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }

  // Sonraki aya git
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  // Platform icons and names
  const platforms = [
    { 
      name: 'Bluesky', 
      activeColor: 'bg-[#1DA1F2]', 
      inactiveColor: 'bg-[#4a5568]',
      icon: <BlueskyIcon /> 
    },
    { 
      name: 'Facebook', 
      activeColor: 'bg-[#1877F2]', 
      inactiveColor: 'bg-[#4a5568]',
      icon: <FacebookIcon /> 
    },
    { 
      name: 'Instagram', 
      activeColor: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]', 
      inactiveColor: 'bg-[#4a5568]',
      icon: <InstagramIcon /> 
    },
    { 
      name: 'LinkedIn', 
      activeColor: 'bg-[#0A66C2]', 
      inactiveColor: 'bg-[#4a5568]',
      icon: <LinkedinIcon /> 
    },
    { 
      name: 'Medium', 
      activeColor: 'bg-[#00ab6c]', 
      inactiveColor: 'bg-[#4a5568]',
      icon: <MediumIcon /> 
    },
    { 
      name: 'Pinterest', 
      activeColor: 'bg-[#E60023]', 
      inactiveColor: 'bg-[#4a5568]',
      icon: <PinterestIcon /> 
    },
    { 
      name: 'Telegram', 
      activeColor: 'bg-[#26A5E4]', 
      inactiveColor: 'bg-[#4a5568]',
      icon: <TelegramIcon /> 
    },
    { 
      name: 'Threads', 
      activeColor: 'bg-[#000000]', 
      inactiveColor: 'bg-[#4a5568]',
      icon: <ThreadsIcon /> 
    },
    { 
      name: 'TikTok', 
      activeColor: 'bg-[#000000]', 
      inactiveColor: 'bg-[#4a5568]',
      icon: <TiktokIcon /> 
    },
    { 
      name: 'Tumblr', 
      activeColor: 'bg-[#000000]', 
      inactiveColor: 'bg-[#4a5568]',
      icon: <TumblrIcon /> 
    },
    { 
      name: 'X', 
      activeColor: 'bg-[#000000]', 
      inactiveColor: 'bg-[#4a5568]',
      icon: <XIcon /> 
    },
    { 
      name: 'YouTube', 
      activeColor: 'bg-[#FF0000]', 
      inactiveColor: 'bg-[#4a5568]',
      icon: <YoutubeIcon /> 
    },
  ]
  
  // Platform'un kimlik doğrulama işlemini başlat veya sonlandır
  const togglePlatform = (platformName: string) => {
    const platform = socialPlatforms.find(p => p.name === platformName)?.id;
    if (!platform) return;
    
    if (isAuthenticated(platform)) {
      // Eğer platform zaten kimlik doğrulaması yapılmışsa, bağlantıyı kes
      disconnectPlatform(platform);
      
      // Aktif platformlar listesinden çıkar
      setActivePlatforms(prev => prev.filter(name => name !== platformName));
    } else {
      // Eğer platform kimlik doğrulaması yapılmamışsa, kimlik doğrulama işlemini başlat
      authenticatePlatform(platform);
      
      // Aktif platformlar listesine ekle
      setActivePlatforms(prev => [...prev, platformName]);
    }
  }

  // Header'dan gelen sidebar toggle event'ini dinle
  useEffect(() => {
    const handleToggleSidebar = (event: CustomEvent) => {
      setCollapsed(event.detail.collapsed)
    }

    window.addEventListener('toggle-sidebar', handleToggleSidebar as EventListener)
    
    return () => {
      window.removeEventListener('toggle-sidebar', handleToggleSidebar as EventListener)
    }
  }, [])

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <aside className={cn(
      'flex flex-col h-full bg-gradient-to-b from-[#1e3a8a] to-[#0f172a] text-white transition-all duration-300',
      collapsed ? 'w-16' : 'w-64',
      className
    )}>
      {/* SocFlow yazu0131su0131 kaldu0131ru0131ldu0131 */}

      {!collapsed ? (
        <div className="px-6 py-4">
          <Link href="/content/create">
            <button className="w-full flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-full py-3 px-4 transition-colors cursor-pointer">
              <Plus className="h-5 w-5" />
              Create Post
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 mt-10">
          <Link href="/content/create">
            <button className="w-10 h-10 flex items-center justify-center bg-transparent hover:bg-white/20 text-white rounded-md transition-colors cursor-pointer">
              <Plus className="h-5 w-5" />
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="w-10 h-10 flex items-center justify-center bg-transparent hover:bg-white/20 text-white rounded-md transition-colors cursor-pointer">
              <Home className="h-5 w-5" />
            </button>
          </Link>
          <Link href="/calendar">
            <button className="w-10 h-10 flex items-center justify-center bg-transparent hover:bg-white/20 text-white rounded-md transition-colors cursor-pointer">
              <CalendarIcon className="h-5 w-5" />
            </button>
          </Link>
          <Link href="/analytics">
            <button className="w-10 h-10 flex items-center justify-center bg-transparent hover:bg-white/20 text-white rounded-md transition-colors cursor-pointer">
              <BarChart2 className="h-5 w-5" />
            </button>
          </Link>
          <Link href="/audience">
            <button className="w-10 h-10 flex items-center justify-center bg-transparent hover:bg-white/20 text-white rounded-md transition-colors cursor-pointer">
              <Users className="h-5 w-5" />
            </button>
          </Link>
          <Link href="/content">
            <button className="w-10 h-10 flex items-center justify-center bg-transparent hover:bg-white/20 text-white rounded-md transition-colors cursor-pointer">
              <FileText className="h-5 w-5" />
            </button>
          </Link>
        </div>
      )}
      <nav className="flex-1 px-4 py-2 space-y-1">
        <Link href="/dashboard" className={cn(
          'flex items-center w-full px-4 py-2.5 text-white rounded-md hover:bg-white/10 transition-colors',
        )}>
          <Home className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Dashboard</span>}
        </Link>
        <Link href="/calendar" className={cn(
          'flex items-center w-full px-4 py-2.5 text-white rounded-md hover:bg-white/10 transition-colors',
        )}>
          <CalendarIcon className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Calendar</span>}
        </Link>
        <Link href="/analytics" className={cn(
          'flex items-center w-full px-4 py-2.5 text-white rounded-md hover:bg-white/10 transition-colors',
        )}>
          <BarChart2 className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Analytics</span>}
        </Link>
        <Link href="/audience" className={cn(
          'flex items-center w-full px-4 py-2.5 text-white rounded-md hover:bg-white/10 transition-colors',
        )}>
          <Users className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Audience</span>}
        </Link>
        <Link href="/content" className={cn(
          'flex items-center w-full px-4 py-2.5 text-white rounded-md hover:bg-white/10 transition-colors',
        )}>
          <FileText className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Content</span>}
        </Link>
      </nav>

      {!collapsed && (
        <>

          <div className="px-4 py-0 mt-2">
            <div className="grid grid-cols-2 gap-2">
              {platforms.map((platform) => {
                // Kimlik doğrulama durumunu kontrol et
                const platformId = socialPlatforms.find(p => p.name === platform.name)?.id;
                const isAuthenticated = platformId ? usePlatformAuth().isAuthenticated(platformId) : false;
                const isActive = isAuthenticated || activePlatforms.includes(platform.name);
                
                return (
                  <div 
                    key={platform.name}
                    className={`${isActive ? platform.activeColor : platform.inactiveColor} flex items-center gap-2 py-2 px-3 rounded-md hover:opacity-90 text-xs font-medium transition-all duration-200 cursor-pointer shadow-sm relative`}
                    onClick={() => togglePlatform(platform.name)}
                  >
                    {platform.icon}
                    <span className="text-white font-medium">{platform.name}</span>
                    
                    {/* Çıkış yapma butonu (kimlik doğrulaması yapılmışsa göster) */}
                    {isAuthenticated && (
                      <div 
                        className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-white cursor-pointer ring-1 ring-gray-200"
                        title="Disconnect"
                        aria-label={`Disconnect from ${platform.name}`}
                        onClick={(e) => {
                          e.stopPropagation(); // Tıklama olayının yukarıya yayılmasını engelle
                          if (platformId) {
                            disconnectPlatform(platformId);
                            setActivePlatforms(prev => prev.filter(name => name !== platform.name));
                          }
                        }}
                      >
                        <X className="w-1.5 h-1.5 text-gray-600" strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
      
          {/* Toggle Button */}
          <div className="p-4 flex justify-center -mt-3 -mb-2">
            <button 
              onClick={toggleSidebar}
              className="h-8 w-8 rounded-full bg-transparent hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </>
      )}

      {collapsed && (
        <div className="p-4 flex justify-center mt-auto -mb-2">
          <button 
            onClick={toggleSidebar}
            className="h-8 w-8 rounded-full bg-transparent hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </aside>
  )
}
