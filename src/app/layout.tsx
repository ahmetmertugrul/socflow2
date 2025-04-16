import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from '@/components/auth/auth-provider';
import { ThemeProvider } from '@/providers/theme-context';
import { CalendarProvider } from '@/context/calendar-context';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SocFlow - Social Media Management Platform",
  description: "Manage all your social media accounts in one place. Schedule posts, analyze performance, and create content with AI assistance.",
  keywords: ["social media", "management", "scheduling", "analytics", "AI", "content creation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        <ThemeProvider>
          <AuthProvider>
            <CalendarProvider>
              {children}
              <Toaster />
            </CalendarProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
