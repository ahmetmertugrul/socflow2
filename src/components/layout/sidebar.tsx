"use client";

import Link from 'next/link'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Home, Calendar as CalendarIcon, BarChart2, Users, FileText, Plus, ChevronRight, ChevronLeft } from 'lucide-react'
import { BlueskyIcon, FacebookIcon, InstagramIcon, LinkedinIcon, MediumIcon, PinterestIcon, TelegramIcon, ThreadsIcon, TiktokIcon, TumblrIcon, XIcon, YoutubeIcon } from '@/components/icons/SocialIcons'
import { useEffect, useState } from 'react'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(3) // Nisan ayı için 3 (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025)
  const [activePlatforms, setActivePlatforms] = useState<string[]>([])
  const currentDate = new Date()
  
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
  
  // Platform'un aktif olup olmadığını değiştir
  const togglePlatform = (platformName: string) => {
    setActivePlatforms(prev => {
      if (prev.includes(platformName)) {
        return prev.filter(name => name !== platformName);
      } else {
        return [...prev, platformName];
      }
    });
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
          <div className="px-4 py-1 mt-0 relative">
            <div className="flex items-center justify-between mb-1 mt-1">
              <div className="text-sm font-medium text-white/90">
                {months[currentMonth]} {currentYear}
              </div>
              <div className="flex items-center">
                <button 
                  onClick={goToPreviousMonth} 
                  className="text-white/70 hover:text-white cursor-pointer p-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button 
                  onClick={goToNextMonth} 
                  className="text-white/70 hover:text-white cursor-pointer p-1"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 text-center text-xs mb-1 text-white/80 mt-2">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-center text-xs">
              {/* Önceki ayın günleri için boş hücreler */}
              {Array.from({ length: getFirstDayOfMonth(currentYear, currentMonth) }, (_, i) => (
                <div key={`empty-${i}`} className="h-7 w-7"></div>
              ))}
              
              {/* Güncel ayın günleri */}
              {Array.from({ length: getDaysInMonth(currentYear, currentMonth) }, (_, i) => i + 1).map((day) => {
                // Bugünün tarihini kontrol et (16 Nisan 2025 olarak varsayalım)
                const isToday = day === 16 && currentMonth === 3 && currentYear === 2025
                return (
                  <div 
                    key={day} 
                    className={cn(
                      'h-7 w-7 rounded-full flex items-center justify-center cursor-pointer',
                      isToday ? 'bg-white text-[#9c27b0] font-bold' : 'hover:bg-white/10 text-white/90'
                    )}
                  >
                    {day}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="px-4 py-0 mt-2">
            <div className="grid grid-cols-2 gap-2">
              {platforms.map((platform) => {
                const isActive = activePlatforms.includes(platform.name);
                return (
                  <div 
                    key={platform.name}
                    className={`${isActive ? platform.activeColor : platform.inactiveColor} flex items-center gap-2 py-2 px-3 rounded-md hover:opacity-90 text-xs font-medium transition-all duration-200 cursor-pointer shadow-sm`}
                    onClick={() => togglePlatform(platform.name)}
                  >
                    {platform.icon}
                    <span className="text-white font-medium">{platform.name}</span>
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
