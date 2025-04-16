"use client";

import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { ContentCalendar } from "@/components/calendar/content-calendar";

export default function CalendarPage() {
  return (
    <MainLayout>
      <div className="container py-6 px-1 md:px-4">
        <ContentCalendar />
      </div>
    </MainLayout>
  );
}
