"use client";

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { useTheme } from '@/providers/theme-context';
import { cn } from '@/lib/utils';
import { useCalendar, ScheduledContent } from '@/context/calendar-context';
import { BlueskyIcon, FacebookIcon, InstagramIcon, LinkedinIcon, MediumIcon, PinterestIcon, TelegramIcon, ThreadsIcon, TiktokIcon, TumblrIcon, XIcon, YoutubeIcon } from '@/components/icons/SocialIcons';

interface ScheduledEvent {
  id: string;
  title: string;
  platforms: string[];
  startTime: string;
  endTime: string;
  color?: string;
  day: number; // 0-6 (Pazar-Cumartesi)
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
  const [viewMode, setViewMode] = useState<'month'>('month');
  const { scheduledContents, clearScheduledContents } = useCalendar();
  
  // Tarih bilgileri
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentDayOfWeek = currentDate.getDay();
  
  // Ay isimleri
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Gün isimleri
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  // Önceki haftaya git
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };
  
  // Sonraki haftaya git
  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };
  
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

  // Scheduled contents from context and sample events
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
        day: dayOfWeek
      };
    });
    
    // Combine with sample events
    return [...scheduledEvents, {
      id: 'event-1',
      title: 'Industry News Share',
      platforms: ['Twitter', 'LinkedIn'],
      startTime: '10:00',
      endTime: '11:00',
      color: '#F59E0B', // amber-500
      day: 0 // Pazar
    },
    {
      id: 'event-2',
      title: 'Morning Standup',
      platforms: ['Teams'],
      startTime: '08:30',
      endTime: '09:00',
      color: '#3b82f6', // blue-500
      day: 1 // Pazartesi
    },
    {
      id: 'event-3',
      title: 'Client Call',
      platforms: ['Zoom'],
      startTime: '10:00',
      endTime: '11:00',
      color: '#eab308', // yellow-500
      day: 1 // Pazartesi
    },
    {
      id: 'event-4',
      title: 'Team Training',
      platforms: ['Zoom'],
      startTime: '10:30',
      endTime: '11:30',
      color: '#22c55e', // green-500
      day: 3 // Çarşamba
    },
    {
      id: 'event-5',
      title: 'Product Demo',
      platforms: ['Instagram', 'Facebook', 'YouTube'],
      startTime: '11:00',
      endTime: '12:00',
      color: '#10B981', // green-500
      day: 4 // Perşembe
    },
    {
      id: 'event-6',
      title: 'Client Presentation',
      platforms: ['Zoom'],
      startTime: '11:00',
      endTime: '12:30',
      color: '#f97316', // orange-500
      day: 5 // Cuma
    },
    {
      id: 'event-7',
      title: 'Investor Meeting',
      platforms: ['Zoom'],
      startTime: '10:00',
      endTime: '11:00',
      color: '#ef4444', // red-500
      day: 6 // Cumartesi
    },
    {
      id: 'event-8',
      title: 'Lunch with Sarah',
      platforms: ['Personal'],
      startTime: '12:30',
      endTime: '13:30',
      color: '#22c55e', // green-500
      day: 0 // Pazar
    },
    {
      id: 'event-9',
      title: 'Product Planning',
      platforms: ['Teams'],
      startTime: '14:00',
      endTime: '15:30',
      color: '#ec4899', // pink-500
      day: 0 // Pazar
    },
    {
      id: 'event-10',
      title: 'Budget Review',
      platforms: ['Finance'],
      startTime: '14:00',
      endTime: '15:00',
      color: '#eab308', // yellow-500
      day: 2 // Salı
    },
    {
      id: 'event-11',
      title: 'Team Brainstorm',
      platforms: ['Teams'],
      startTime: '15:00',
      endTime: '16:30',
      color: '#6366f1', // indigo-500
      day: 3 // Çarşamba
    },
    {
      id: 'event-12',
      title: 'Design Review',
      platforms: ['Figma'],
      startTime: '14:30',
      endTime: '15:45',
      color: '#a855f7', // purple-500
      day: 4 // Perşembe
    },
    {
      id: 'event-13',
      title: 'Marketing Meeting',
      platforms: ['Zoom'],
      startTime: '11:00',
      endTime: '12:00',
      color: '#14b8a6', // teal-500
      day: 5 // Cuma
    },
    {
      id: 'event-14',
      title: 'Code Review',
      platforms: ['GitHub'],
      startTime: '16:00',
      endTime: '17:00',
      color: '#06b6d4', // cyan-500
      day: 6 // Cumartesi
    },
    // Ay görünümü için örnek tatil günleri
    {
      id: 'holiday-1',
      title: 'Ramadan Bayram',
      platforms: ['Holiday'],
      startTime: '00:00',
      endTime: '23:59',
      color: '#86efac', // green-300
      day: 0 // Pazar
    },
    {
      id: 'holiday-2',
      title: 'National Sovereignty Day',
      platforms: ['Holiday'],
      startTime: '00:00',
      endTime: '23:59',
      color: '#86efac', // green-300
      day: 2 // Salı
    }
  ];
  }, [scheduledContents]);
  
  // Günlük takvim verilerini oluştur
  const generateDayCalendarData = useMemo(() => {
    const today = new Date();
    const isToday = currentDate.getDate() === today.getDate() && 
                    currentDate.getMonth() === today.getMonth() && 
                    currentDate.getFullYear() === today.getFullYear();
    
    const dayData: CalendarDay = {
      date: currentDate.getDate(),
      dayOfWeek: currentDate.getDay(),
      dayName: dayNames[currentDate.getDay()],
      isCurrentMonth: currentDate.getMonth() === currentMonth,
      isToday,
      events: []
    };
    
    // Günün etkinliklerini ekle
    events.forEach((event: ScheduledEvent) => {
      if (event.day === currentDate.getDay()) {
        dayData.events.push(event);
      }
    });
    
    return dayData;
  }, [currentDate, dayNames, currentMonth, events]);
  
  // Haftalık takvim verilerini oluştur
  const generateWeekCalendarData = useMemo(() => {
    const today = new Date();
    const weekStart = new Date(currentDate);
    // Haftanın başlangıcını Pazar gününe ayarla
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDays: CalendarDay[] = [];
    
    // Haftanın 7 gününü oluştur
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      
      const isToday = day.getDate() === today.getDate() && 
                      day.getMonth() === today.getMonth() && 
                      day.getFullYear() === today.getFullYear();
      
      const isCurrentMonth = day.getMonth() === currentMonth;
      
      weekDays.push({
        date: day.getDate(),
        dayOfWeek: day.getDay(),
        dayName: dayNames[day.getDay()],
        isCurrentMonth,
        isToday,
        events: []
      });
    }
    
    // Etkinlikleri ilgili günlere ekle
    events.forEach((event: ScheduledEvent) => {
      const dayIndex = event.day;
      if (dayIndex >= 0 && dayIndex < 7) {
        weekDays[dayIndex].events.push(event);
      }
    });
    
    return weekDays;
  }, [currentDate, dayNames, currentMonth, events]);
  
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
        // Basit bir örnek için, ayın belirli günlerine etkinlikler ekleyelim
        if ((i % 7 === event.day) || (i === 15 && event.day === 3) || (i === 22 && event.day === 2)) {
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
  
  // Saat aralıklarını oluştur (8:00 - 17:00)
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 8; hour <= 17; hour++) {
      slots.push(`${hour}:00`);
    }
    return slots;
  }, []);
  
  // Etkinliğin konumunu hesapla (saat bazında)
  const calculateEventPosition = (startTime: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startHour = 8; // Başlangıç saati (8:00)
    
    // Saat ve dakika bazında pozisyon hesapla
    return (hours - startHour) + (minutes / 60);
  };
  
  // Etkinliğin yüksekliğini hesapla (süre bazında)
  const calculateEventHeight = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    // Toplam dakika farkını hesapla ve saat cinsine çevir
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    const durationHours = (endTotalMinutes - startTotalMinutes) / 60;
    
    return durationHours;
  };
  
  // Navigasyon butonları için fonksiyonlar
  const handlePrevious = () => {
    goToPreviousMonth();
  };

  const handleNext = () => {
    goToNextMonth();
  };

  // Günlük takvim görünümü
  const renderDayView = () => {
    const dayData = generateDayCalendarData;
    
    return (
      <div className="rounded-lg border overflow-hidden overflow-x-auto bg-card/20 backdrop-blur-sm w-full" 
           style={{ 
             backgroundImage: theme === 'dark' ? 'linear-gradient(to right bottom, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.7))' : 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7))',
             maxHeight: 'calc(100vh - 200px)'
           }}>
        {/* Gün başlığı */}
        <div className="grid grid-cols-1 min-w-[900px]">
          <div className={`p-4 text-center border-b ${dayData.isToday ? 'bg-primary/10' : ''}`}>
            <div className="font-medium text-lg">{dayData.dayName}</div>
            <div className={`inline-flex items-center justify-center w-10 h-10 mt-1 rounded-full ${dayData.isToday ? 'bg-primary text-white' : ''}`}>
              {dayData.date}
            </div>
          </div>
        </div>
        
        {/* Takvim içeriği - Saatler ve etkinlikler */}
        <div className="grid grid-cols-2 min-w-[900px]">
          {/* Saat sütunu */}
          <div className="border-r w-[100px]">
            {timeSlots.map((time, index) => (
              <div key={index} className="h-16 border-b px-2 text-xs text-right pr-2">
                <span className="relative -top-2 bg-card/80 px-1 text-muted-foreground">{time}</span>
              </div>
            ))}
          </div>
          
          {/* Günün içeriği */}
          <div className="relative border-r flex-1">
            {/* Saat çizgileri */}
            {timeSlots.map((_, timeIndex) => (
              <div key={timeIndex} className="h-16 border-b"></div>
            ))}
            
            {/* Günün etkinlikleri */}
            {dayData.events.map((event, eventIndex) => {
              const top = calculateEventPosition(event.startTime) * 64; // 64px = 1 saat yüksekliği (h-16)
              const height = calculateEventHeight(event.startTime, event.endTime) * 64;
              return (
                <div 
                  key={eventIndex} 
                  className="absolute rounded-md p-2 overflow-hidden cursor-pointer transition-opacity hover:opacity-90"
                  style={{ 
                    top: `${top}px`, 
                    height: `${height}px`,
                    left: '4px',
                    right: '4px',
                    backgroundColor: event.color,
                    color: 'white',
                    boxShadow: theme === 'dark' ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="font-medium text-xs truncate">{event.title}</div>
                  <div className="text-[10px] opacity-90">{event.startTime} - {event.endTime}</div>
                  <div className="flex mt-1 gap-1 flex-wrap">
                    {event.platforms.map((platform, platformIndex) => (
                      <span 
                        key={platformIndex} 
                        className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] bg-white/20"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Haftalık takvim görünümü
  const renderWeekView = () => {
    return (
      <div className="rounded-lg border overflow-hidden overflow-x-auto bg-card/20 backdrop-blur-sm w-full" 
           style={{ 
             backgroundImage: theme === 'dark' ? 'linear-gradient(to right bottom, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.7))' : 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7))',
             maxHeight: 'calc(100vh - 200px)'
           }}>
        {/* Gün isimleri ve tarihler */}
        <div className="grid grid-cols-8 min-w-[900px]">
          {/* Saat sütunu başlığı */}
          <div className="p-2 text-center border-b border-r"></div>
          
          {/* Gün isimleri ve tarihler */}
          {generateWeekCalendarData.map((day, index) => (
            <div 
              key={index} 
              className={`p-2 text-center border-b border-r ${day.isToday ? 'bg-primary/10' : ''}`}
            >
              <div className="font-medium">{day.dayName}</div>
              <div className={`inline-flex items-center justify-center w-8 h-8 mt-1 rounded-full ${day.isToday ? 'bg-primary text-white' : ''}`}>
                {day.date}
              </div>
            </div>
          ))}
        </div>
        
        {/* Takvim içeriği - Saatler ve etkinlikler */}
        <div className="grid grid-cols-8 min-w-[900px]">
          {/* Saat sütunu */}
          <div className="border-r">
            {timeSlots.map((time, index) => (
              <div key={index} className="h-16 border-b px-2 text-xs text-right pr-2">
                <span className="relative -top-2 bg-card/80 px-1 text-muted-foreground">{time}</span>
              </div>
            ))}
          </div>
          
          {/* Günlerin içeriği */}
          {generateWeekCalendarData.map((day, dayIndex) => (
            <div key={dayIndex} className="relative border-r">
              {/* Saat çizgileri */}
              {timeSlots.map((_, timeIndex) => (
                <div key={timeIndex} className="h-16 border-b"></div>
              ))}
              
              {/* Günün etkinlikleri */}
              {day.events.map((event, eventIndex) => {
                const top = calculateEventPosition(event.startTime) * 64; // 64px = 1 saat yüksekliği (h-16)
                const height = calculateEventHeight(event.startTime, event.endTime) * 64;
                return (
                  <div 
                    key={eventIndex} 
                    className="absolute rounded-md p-2 overflow-hidden cursor-pointer transition-opacity hover:opacity-90"
                    style={{ 
                      top: `${top}px`, 
                      height: `${height}px`,
                      left: '4px',
                      right: '4px',
                      backgroundColor: event.color,
                      color: 'white',
                      boxShadow: theme === 'dark' ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <div className="font-medium text-xs truncate">{event.title}</div>
                    <div className="text-[10px] opacity-90">{event.startTime} - {event.endTime}</div>
                    <div className="flex mt-1 gap-1 flex-wrap">
                      {event.platforms.map((platform, platformIndex) => (
                        <span 
                          key={platformIndex} 
                          className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] bg-white/20"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

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
                    <div className="text-[10px] opacity-90">{event.startTime} - {event.endTime}</div>
                    <div className="flex mt-0.5 gap-0.5">
                      {event.platforms.map((platform, platformIndex) => (
                        <span 
                          key={platformIndex} 
                          className="inline-flex items-center rounded-full p-0.5 bg-white/20"
                        >
                          {platform === 'Twitter' && 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          }
                          {platform === 'LinkedIn' && 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                            </svg>
                          }
                          {platform === 'Instagram' && 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                              <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.977.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.977-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.977-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.469a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
                            </svg>
                          }
                          {platform === 'Facebook' && 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                              <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                            </svg>
                          }
                          {platform === 'YouTube' && 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                          }
                          {platform === 'Zoom' && 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                              <path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12z" />
                              <path fill="#fff" d="M14.24 9.6h-4.8a.96.96 0 0 0-.96.96v2.88c0 .53.43.96.96.96h4.8a.96.96 0 0 0 .96-.96v-2.88a.96.96 0 0 0-.96-.96zM24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM7.2 10.8c0-.994.806-1.8 1.8-1.8h6c.994 0 1.8.806 1.8 1.8v3.6c0 .994-.806 1.8-1.8 1.8h-6c-.994 0-1.8-.806-1.8-1.8v-3.6z" />
                            </svg>
                          }
                          {platform === 'Teams' && 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                              <path d="M20.625 7.042c.917.917.917 2.413 0 3.33l-2.022 2.023a.324.324 0 0 1-.46 0l-2.404-2.404a.324.324 0 0 1 0-.46l2.023-2.02c.917-.918 2.41-.918 3.33 0-.917.917-.917 2.413 0 3.33l2.022 2.023a.324.324 0 0 1 .46 0l2.404-2.404a.324.324 0 0 1 0 .46l-2.023 2.02c-.917.918-2.41.918-3.33 0Zm-4.426 5.546 2.403 2.403a.324.324 0 0 1 0 .46l-2.023 2.023c-.917.917-2.413.917-3.33 0-.917-.917-.917-2.413 0-3.33l2.023-2.023a.324.324 0 0 1 .46 0l.467.467Zm-3.048-3.048 2.404 2.404a.324.324 0 0 1 0 .46l-.466.465a.324.324 0 0 1-.46 0l-2.404-2.403a.324.324 0 0 1 0-.46l.466-.466a.324.324 0 0 1 .46 0ZM7.8 3a3 3 0 0 1 3 3v1.5a3 3 0 0 1-3 3H6.6v1.125A3.375 3.375 0 0 1 3.225 15H3a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h4.8Zm0 1.5H3a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 3 13.5h.225A1.875 1.875 0 0 0 5.1 11.625V9a.75.75 0 0 1 .75-.75H7.8A1.5 1.5 0 0 0 9.3 6.75v-1.5A1.5 1.5 0 0 0 7.8 3.75v.75Z" />
                            </svg>
                          }
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
