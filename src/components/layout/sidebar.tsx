import Link from 'next/link'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { LucideHome, LucideCalendar, LucideBarChart2, LucideUsers, LucideFileText, LucidePlus } from 'lucide-react'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const currentDate = new Date()
  
  // Platform icons and names
  const platforms = [
    { name: 'Bluesky', color: 'bg-blue-500', icon: '\ud83d\udc37' },
    { name: 'Facebook', color: 'bg-blue-600', icon: 'f' },
    { name: 'Instagram', color: 'bg-pink-500', icon: '\ud83d\udcf7' },
    { name: 'LinkedIn', color: 'bg-blue-700', icon: 'in' },
    { name: 'Medium', color: 'bg-green-700', icon: 'M' },
    { name: 'Pinterest', color: 'bg-red-600', icon: 'P' },
    { name: 'Telegram', color: 'bg-blue-400', icon: '\u2708\ufe0f' },
    { name: 'Threads', color: 'bg-black', icon: '\ud83e\uddf5' },
    { name: 'TikTok', color: 'bg-black', icon: '\ud83c\udfb5' },
    { name: 'Tumblr', color: 'bg-blue-900', icon: 'T' },
    { name: 'X/Twitter', color: 'bg-blue-400', icon: '\ud83d\udc26' },
    { name: 'YouTube', color: 'bg-red-600', icon: '\u25b6\ufe0f' },
  ]

  return (
    <aside className={cn(
      'flex flex-col h-screen w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border',
      className
    )}>
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold text-sidebar-primary">SocFlow</span>
        </Link>
      </div>

      <div className="p-4">
        <Link href="/content/create">
          <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md py-3 px-4 transition-colors">
            <LucidePlus className="h-5 w-5" />
            Create Post
          </button>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link href="/dashboard" className={cn(
          buttonVariants({ variant: 'ghost' }),
          'w-full justify-start text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/10'
        )}>
          <LucideHome className="mr-2 h-5 w-5" />
          Dashboard
        </Link>
        <Link href="/calendar" className={cn(
          buttonVariants({ variant: 'ghost' }),
          'w-full justify-start text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/10'
        )}>
          <LucideCalendar className="mr-2 h-5 w-5" />
          Calendar
        </Link>
        <Link href="/analytics" className={cn(
          buttonVariants({ variant: 'ghost' }),
          'w-full justify-start text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/10'
        )}>
          <LucideBarChart2 className="mr-2 h-5 w-5" />
          Analytics
        </Link>
        <Link href="/audience" className={cn(
          buttonVariants({ variant: 'ghost' }),
          'w-full justify-start text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/10'
        )}>
          <LucideUsers className="mr-2 h-5 w-5" />
          Audience
        </Link>
        <Link href="/content" className={cn(
          buttonVariants({ variant: 'ghost' }),
          'w-full justify-start text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/10'
        )}>
          <LucideFileText className="mr-2 h-5 w-5" />
          Content
        </Link>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="text-sm font-medium mb-2">April 2025</div>
        <div className="grid grid-cols-7 text-center text-xs mb-2">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const isToday = day === 15 // Assuming today is the 15th as shown in images
            return (
              <div 
                key={day} 
                className={cn(
                  'h-7 w-7 rounded-full flex items-center justify-center',
                  isToday ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'hover:bg-sidebar-accent/10'
                )}
              >
                {day}
              </div>
            )
          })}
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="text-sm font-medium mb-2">Platforms</div>
        <div className="grid grid-cols-2 gap-2">
          {platforms.map((platform) => (
            <div 
              key={platform.name}
              className="flex items-center gap-2 p-2 rounded-md bg-sidebar-accent/10 text-xs font-medium"
            >
              <span className={`${platform.color} h-5 w-5 rounded flex items-center justify-center text-white text-xs`}>
                {platform.icon}
              </span>
              <span>{platform.name}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
