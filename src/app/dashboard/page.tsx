"use client";

import { useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";
import { BarChart2, ChevronRight, Plus, Edit, BarChart, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const { isAuthenticated, openLoginModal } = useAuth();

  // Kullanıcı giriş yapmadıysa, login modalını göster
  useEffect(() => {
    if (!isAuthenticated) {
      openLoginModal();
    }
  }, [isAuthenticated, openLoginModal]);

  // Yaklaşan gönderiler
  const upcomingPosts = [
    {
      id: 1,
      title: "10 Tips for Better Social Media Engagement",
      date: "Tomorrow",
      time: "10:00 AM",
      status: "Scheduled",
      platforms: ["Twitter", "Instagram"],
      description: "Boost your social media presence with these 10 proven strategies for increasing engagement and growing your audience."
    },
    {
      id: 2,
      title: "Introducing Our New Product Line",
      date: "Today",
      time: "3:00 PM",
      status: "Publishing",
      platforms: ["Facebook", "LinkedIn"],
      description: "We're excited to announce our latest product line, designed with you in mind. Check out the new features and benefits!"
    },
    {
      id: 3,
      title: "Behind the Scenes: Our Creative Process",
      date: "Updated",
      time: "2 hours ago",
      status: "Draft",
      platforms: ["YouTube", "Instagram"],
      description: "Take a peek behind the curtain and see how our team brings ideas to life. From concept to creation, this is our journey."
    }
  ];

  // Platform istatistikleri
  const platformStats = [
    { name: "Total Posts", value: "127", change: "+3.5% from last month" },
    { name: "Scheduled", value: "24", change: "Next: Today at 3:00 PM" },
    { name: "Engagement", value: "3.2K", change: "+5% from last week" },
    { name: "Accounts", value: "7", change: "7 platforms connected" },
  ];

  // Hızlı eylemler
  const quickActions = [
    { title: "Connect Account", description: "Add a new social media account to your dashboard." },
    { title: "Schedule Content", description: "Plan your content calendar for the upcoming weeks." },
    { title: "AI Content Generator", description: "Create engaging content with our AI assistant." },
    { title: "View Analytics", description: "Track performance metrics across all your platforms." },
  ];

  return (
    <MainLayout>
      <div className="container py-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <Button asChild className="rounded-full bg-primary hover:bg-primary/90">
            <Link href="/content/create">Create Content</Link>
          </Button>
        </div>
        
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {platformStats.map((stat, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Content */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Recent Content</h2>
            <Button variant="ghost" size="sm" className="text-xs">
              View all
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingPosts.map((post) => (
              <Card key={post.id} className="bg-white">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${post.status === 'Scheduled' ? 'bg-primary text-white' : post.status === 'Publishing' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}`}>
                      {post.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.date}, {post.time}</span>
                  </div>
                  <CardTitle className="text-base">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <div className="flex items-center gap-1">
                    {post.platforms.map((platform) => (
                      <span key={platform} className="inline-flex items-center gap-1">
                        <span className={`h-2 w-2 rounded-full ${platform === 'Twitter' ? 'bg-blue-500' : platform === 'Instagram' ? 'bg-pink-500' : platform === 'Facebook' ? 'bg-blue-600' : platform === 'LinkedIn' ? 'bg-blue-700' : platform === 'YouTube' ? 'bg-red-600' : 'bg-gray-500'}`}></span>
                        <span className="text-xs">{platform}</span>
                      </span>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    {post.status === 'Draft' ? 'Continue Editing' : 'Edit'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="bg-white hover:bg-muted/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
