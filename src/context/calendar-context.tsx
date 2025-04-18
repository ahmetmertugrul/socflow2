"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ScheduledContent {
  id: string;
  title: string;
  content: string;
  platforms: string[];
  startTime: string;
  endTime: string;
  date: string;
  color?: string;
}

interface CalendarContextType {
  scheduledContents: ScheduledContent[];
  addScheduledContent: (content: ScheduledContent) => void;
  removeScheduledContent: (id: string) => void;
  clearScheduledContents: () => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
}

interface CalendarProviderProps {
  children: ReactNode;
}

export function CalendarProvider({ children }: CalendarProviderProps) {
  const [scheduledContents, setScheduledContents] = useState<ScheduledContent[]>(() => {
    // localStorage'dan verileri yükle (sayfa yenilendiinde silinmemesi için)
    if (typeof window !== 'undefined') {
      const savedContents = localStorage.getItem('scheduledContents');
      return savedContents ? JSON.parse(savedContents) : [];
    }
    return [];
  });

  // scheduledContents deitiğinde localStorage'a kaydet
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('scheduledContents', JSON.stringify(scheduledContents));
    }
  }, [scheduledContents]);

  const addScheduledContent = (content: ScheduledContent) => {
    setScheduledContents((prev) => [...prev, content]);
  };

  const removeScheduledContent = (id: string) => {
    setScheduledContents((prev) => prev.filter((content) => content.id !== id));
  };

  const clearScheduledContents = () => {
    // Takvim verilerini temizle
    setScheduledContents([]);
    // localStorage'dan da temizle
    if (typeof window !== 'undefined') {
      localStorage.removeItem('scheduledContents');
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        scheduledContents,
        addScheduledContent,
        removeScheduledContent,
        clearScheduledContents,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
