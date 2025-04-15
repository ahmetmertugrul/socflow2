"use client";

import Link from 'next/link'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Home, Calendar as CalendarIcon, BarChart2, Users, FileText, Plus, ChevronRight, ChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const currentDate = new Date()
  
  // Platform icons and names
  const platforms = [
    { name: 'Bluesky', color: 'bg-blue-500', icon: 'S' },
    { name: 'Facebook', color: 'bg-blue-600', icon: 'f' },
    { name: 'Instagram', color: 'bg-pink-500', icon: 'IG' },
    { name: 'LinkedIn', color: 'bg-blue-700', icon: 'in' },
    { name: 'Medium', color: 'bg-green-700', icon: 'M' },
    { name: 'Pinterest', color: 'bg-red-600', icon: 'P' },
    { name: 'Telegram', color: 'bg-blue-400', icon: 'T' },
    { name: 'Threads', color: 'bg-black', icon: 'TH' },
    { name: 'TikTok', color: 'bg-black', icon: 'TT' },
    { name: 'Tumblr', color: 'bg-blue-900', icon: 'T' },
    { name: 'X', color: 'bg-blue-400', icon: 'X' },
    { name: 'YouTube', color: 'bg-red-600', icon: 'YT' },
  ]

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
            <button className="w-full flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-full py-3 px-4 transition-colors">
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
          <div className="px-4 py-1 mt-0">
            <div className="text-xs font-medium mb-1 text-white/90">April 2025</div>
            <div className="grid grid-cols-7 text-center text-xs mb-1 text-white/80">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-center text-xs">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                const isToday = day === 15 // Assuming today is the 15th as shown in images
                return (
                  <div 
                    key={day} 
                    className={cn(
                      'h-7 w-7 rounded-full flex items-center justify-center',
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
              {platforms.map((platform) => (
                <div 
                  key={platform.name}
                  className="flex items-center gap-2 p-2 rounded-md bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors cursor-pointer"
                >
                  <span className={`${platform.color} h-5 w-5 rounded flex items-center justify-center text-white text-xs`}>
                    {platform.icon}
                  </span>
                  <span className="text-white/90">{platform.name}</span>
                </div>
              ))}
            </div>

          </div>
          
          {/* Toggle Button */}
          <div className="p-4 flex justify-center mt-auto mb-8">
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
        <div className="p-4 flex justify-center mt-auto mb-4">
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
