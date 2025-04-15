"use client";

import { useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";

export default function DashboardPage() {
  const { isAuthenticated, openLoginModal } = useAuth();

  // Kullanıcı giriş yapmadıysa, login modalını göster
  useEffect(() => {
    if (!isAuthenticated) {
      openLoginModal();
    }
  }, [isAuthenticated, openLoginModal]);

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <Button asChild>
              <Link href="/content/create">Create Content</Link>
            </Button>
          </div>
          
          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">+5.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Next: Today at 3:00 PM</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2K</div>
                <p className="text-xs text-muted-foreground">+12% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">3 platforms connected</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Content */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight">Recent Content</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/content">View all</Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Content Card 1 */}
              <Card>
                <CardHeader>
                  <CardTitle className="line-clamp-1">10 Tips for Better Social Media Engagement</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">Scheduled</span>
                    <span className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    Boost your social media presence with these 10 proven strategies for increasing engagement and growing your audience.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                    <span className="text-xs">Twitter</span>
                    <span className="inline-flex h-2 w-2 rounded-full bg-pink-500"></span>
                    <span className="text-xs">Instagram</span>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </CardFooter>
              </Card>
              
              {/* Content Card 2 */}
              <Card>
                <CardHeader>
                  <CardTitle className="line-clamp-1">Introducing Our New Product Line</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500 text-primary-foreground hover:bg-green-500/80">Published</span>
                    <span className="text-xs text-muted-foreground">Today, 9:00 AM</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    We're excited to announce our latest product line, designed with you in mind. Check out the new features and benefits!
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-blue-600"></span>
                    <span className="text-xs">Facebook</span>
                    <span className="inline-flex h-2 w-2 rounded-full bg-blue-700"></span>
                    <span className="text-xs">LinkedIn</span>
                  </div>
                  <Button variant="ghost" size="sm">View Stats</Button>
                </CardFooter>
              </Card>
              
              {/* Content Card 3 */}
              <Card>
                <CardHeader>
                  <CardTitle className="line-clamp-1">Behind the Scenes: Our Creative Process</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-500 text-primary-foreground hover:bg-amber-500/80">Draft</span>
                    <span className="text-xs text-muted-foreground">Updated 2 hours ago</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    Take a peek behind the curtain and see how our team brings ideas to life. From concept to creation, this is our journey.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    <span className="text-xs">YouTube</span>
                    <span className="inline-flex h-2 w-2 rounded-full bg-pink-500"></span>
                    <span className="text-xs">Instagram</span>
                  </div>
                  <Button variant="ghost" size="sm">Continue Editing</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-base">Connect Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Add a new social media account to your dashboard.</p>
                </CardContent>
              </Card>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-base">Schedule Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Plan your content calendar for the upcoming weeks.</p>
                </CardContent>
              </Card>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-base">AI Content Generator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Create engaging content with our AI assistant.</p>
                </CardContent>
              </Card>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-base">View Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Track performance metrics across all your platforms.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
