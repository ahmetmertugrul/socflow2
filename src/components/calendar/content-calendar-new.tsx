"use client";

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { useTheme } from '@/providers/theme-context';
import { cn } from '@/lib/utils';
import { useCalendar } from '@/context/calendar-context';
import { BlueskyIcon, FacebookIcon, InstagramIcon, LinkedinIcon, MediumIcon, PinterestIcon, TelegramIcon, ThreadsIcon, TiktokIcon, TumblrIcon, XIcon, YoutubeIcon } from '@/components/icons/SocialIcons';

interface ScheduledEvent {
  id: string;
  title: string;
  platforms: string[];
  startTime: string;
  endTime: string;
  color?: string;
  day: number; // 0-6 (Pazar-Cumartesi)
  date: string; // YYYY-MM-DD formatında tarih
}

interface CalendarDay {
  date: number;
  dayOfWeek: number; // 0-6 (Pazar-Cumartesi)
  dayName: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: ScheduledEvent[];
}

export function ContentCalendar() {
  const { theme } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { scheduledContents, clearScheduledContents } = useCalendar();
  
  // Tarih bilgileri
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Ay isimleri
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Gün isimleri
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  // Önceki aya git
  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };
  
  // Sonraki aya git
  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };
  
  // Bugüne git
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Scheduled contents from context
  const events: ScheduledEvent[] = useMemo(() => {
    // Convert scheduled contents to calendar events
    const scheduledEvents = scheduledContents.map((content) => {
      // Parse date to get day of week
      const contentDate = new Date(content.date);
      const dayOfWeek = contentDate.getDay();
      
      return {
        id: content.id,
        title: content.title,
        platforms: content.platforms,
        startTime: content.startTime,
        endTime: content.endTime,
        color: content.color || '#ec4899', // Default to pink if no color provided
        day: dayOfWeek,
        date: content.date
      };
    });
    
    // Return only user scheduled events, no sample events
    return scheduledEvents;
  }, [scheduledContents]);
  
  // Aylık takvim verilerini oluştur
  const generateMonthCalendarData = useMemo(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    const calendarDays: CalendarDay[] = [];
    
    // Önceki ayın günleri
    for (let i = 0; i < firstDayOfMonth; i++) {
      const day = daysInPrevMonth - firstDayOfMonth + i + 1;
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const date = new Date(prevMonthYear, prevMonth, day);
      
      calendarDays.push({
        date: day,
        dayOfWeek: date.getDay(),
        dayName: dayNames[date.getDay()],
        isCurrentMonth: false,
        isToday: false,
        events: []
      });
    }
    
    // Mevcut ayın günleri
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isToday = i === today.getDate() && 
                      currentMonth === today.getMonth() && 
                      currentYear === today.getFullYear();
      
      const dayData: CalendarDay = {
        date: i,
        dayOfWeek: date.getDay(),
        dayName: dayNames[date.getDay()],
        isCurrentMonth: true,
        isToday,
        events: []
      };
      
      // Bu gün için etkinlikleri ekle
      events.forEach((event: ScheduledEvent) => {
        // Etkinliğin tarihini kontrol et
        const eventDate = new Date(event.date);
        const eventDay = eventDate.getDate();
        const eventMonth = eventDate.getMonth();
        const eventYear = eventDate.getFullYear();
        
        // Eğer etkinlik bu güne aitse ekle (yıl, ay ve gün kontrolü)
        if (i === eventDay && currentMonth === eventMonth && currentYear === eventYear) {
          dayData.events.push({...event});
        }
      });
      
      calendarDays.push(dayData);
    }
    
    // Sonraki ayın günleri (42 günlük bir takvim oluşturmak için)
    const remainingDays = 42 - calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const date = new Date(nextMonthYear, nextMonth, i);
      
      calendarDays.push({
        date: i,
        dayOfWeek: date.getDay(),
        dayName: dayNames[date.getDay()],
        isCurrentMonth: false,
        isToday: false,
        events: []
      });
    }
    
    return calendarDays;
  }, [currentYear, currentMonth, dayNames, events]);

  // Aylık takvim görünümü
  const renderMonthView = () => {
    const monthData = generateMonthCalendarData;
    
    return (
      <div className="bg-card rounded-lg shadow-md border-4 w-full">
        <div className="grid grid-cols-7 w-full">
          {/* Gün başlıkları */}
          {dayNames.map((day, index) => (
            <div 
              key={index} 
              className="py-3 text-center font-semibold text-sm border-b-4 bg-muted/20"
            >
              {day}
            </div>
          ))}
          
          {/* Takvim günleri */}
          {monthData.map((day, index) => (
            <div 
              key={index} 
              className={cn(
                'border-t-4 border-r-4 p-2 h-[120px] overflow-hidden',
                index % 7 === 0 && 'border-l-4', // İlk sütun için sol kenar
                day.isCurrentMonth ? 'bg-card' : 'bg-muted/30',
                day.isToday && 'bg-muted/50'
              )}
            >
              <div className="flex justify-between items-start">
                <span
                  className={cn(
                    'inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium',
                    day.isToday ? 'bg-primary text-primary-foreground' : 'text-foreground'
                  )}
                >
                  {day.date}
                </span>
                {day.events.length > 0 && (
                  <span className="text-xs text-muted-foreground font-medium">
                    {day.events.length} {day.events.length === 1 ? 'post' : 'posts'}
                  </span>
                )}
              </div>
              
              {/* Günün etkinlikleri */}
              <div className="mt-1 space-y-1">
                {day.events.slice(0, 3).map((event, eventIndex) => (
                  <div 
                    key={eventIndex} 
                    className="text-xs p-1.5 rounded cursor-pointer hover:opacity-90 transition-opacity mb-1"
                    style={{ 
                      backgroundColor: event.color,
                      color: 'white'
                    }}
                  >
                    <div className="font-medium truncate text-[11px]">{event.title}</div>
                    <div className="text-[10px] opacity-90">{event.startTime}</div>
                    <div className="flex mt-0.5 gap-0.5 flex-wrap">
                      {event.platforms.map((platform, platformIndex) => (
                        <span 
                          key={platformIndex} 
                          className="inline-flex items-center justify-center rounded-full w-4 h-4 bg-white/20"
                        >
                          <div className="w-2.5 h-2.5 text-white">
                            {platform.toLowerCase().includes('bluesky') && <BlueskyIcon />}
                            {platform.toLowerCase().includes('facebook') && <FacebookIcon />}
                            {platform.toLowerCase().includes('instagram') && <InstagramIcon />}
                            {platform.toLowerCase().includes('linkedin') && <LinkedinIcon />}
                            {platform.toLowerCase().includes('medium') && <MediumIcon />}
                            {platform.toLowerCase().includes('pinterest') && <PinterestIcon />}
                            {platform.toLowerCase().includes('telegram') && <TelegramIcon />}
                            {platform.toLowerCase().includes('threads') && <ThreadsIcon />}
                            {platform.toLowerCase().includes('tiktok') && <TiktokIcon />}
                            {platform.toLowerCase().includes('tumblr') && <TumblrIcon />}
                            {(platform.toLowerCase().includes('x') || platform.toLowerCase().includes('twitter')) && <XIcon />}
                            {platform.toLowerCase().includes('youtube') && <YoutubeIcon />}
                          </div>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {day.events.length > 3 && (
                  <div className="text-xs text-muted-foreground mt-1 cursor-pointer hover:text-primary font-medium">
                    +{day.events.length - 3} more
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Navigasyon butonları için fonksiyonlar
  const handlePrevious = () => {
    goToPreviousMonth();
  };

  const handleNext = () => {
    goToNextMonth();
  };

  return (
    <div className="w-full h-full px-0 pb-4 flex flex-col">
      {/* Takvim Başlığı ve Kontroller */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-3">
        <div>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">{months[currentMonth]} {currentYear}</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handlePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="destructive"
              onClick={clearScheduledContents}
              disabled={scheduledContents.length === 0}
            >
              <X className="h-4 w-4 mr-2" />
              Clear All Notes
            </Button>
            
            <Button 
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Event
            </Button>
          </div>
        </div>
      </div>
      
      {/* Aylık takvim görünümü */}
      <div className="flex-1 overflow-hidden">
        {renderMonthView()}
      </div>
    </div>
  );
}
