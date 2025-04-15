import { Metadata } from "next";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Content Library - SocFlow",
  description: "Manage your social media content",
};

export default function ContentPage() {
  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Content Library</h1>
            <Button asChild>
              <Link href="/content/create">Create Content</Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <Tabs defaultValue="all" className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2">
              <Input 
                placeholder="Search content..." 
                className="w-[250px]"
              />
              <Button variant="outline" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M3 6h18" />
                  <path d="M7 12h10" />
                  <path d="M10 18h4" />
                </svg>
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90 hover:bg-destructive/10">Delete</Button>
                  </div>
                </CardFooter>
              </Card>
              
              {/* Content Card 2 */}
              <Card>
                <CardHeader>
                  <CardTitle className="line-clamp-1">Introducing Our New Product Line</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500 text-primary-foreground hover:bg-green-500/80">Published</span>
                    <span className="text-xs text-muted-foreground">Today, 9:30 AM</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    We're excited to announce our latest product line, designed with you in mind. Check out the new features and benefits!
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                    <span className="text-xs">Facebook</span>
                    <span className="inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
                    <span className="text-xs">LinkedIn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">View Stats</Button>
                    <Button variant="ghost" size="sm">Duplicate</Button>
                  </div>
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
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm">Schedule</Button>
                  </div>
                </CardFooter>
              </Card>
              
              {/* Content Card 4 */}
              <Card>
                <CardHeader>
                  <CardTitle className="line-clamp-1">Customer Success Story: How Company X Increased Sales by 200%</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">Scheduled</span>
                    <span className="text-xs text-muted-foreground">April 20, 2:00 PM</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    Learn how our client Company X implemented our solutions and saw a dramatic increase in sales within just three months.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                    <span className="text-xs">LinkedIn</span>
                    <span className="inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                    <span className="text-xs">Facebook</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90 hover:bg-destructive/10">Delete</Button>
                  </div>
                </CardFooter>
              </Card>
              
              {/* Content Card 5 */}
              <Card>
                <CardHeader>
                  <CardTitle className="line-clamp-1">5 Industry Trends to Watch in 2025</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-500 text-primary-foreground hover:bg-amber-500/80">Draft</span>
                    <span className="text-xs text-muted-foreground">Created 3 days ago</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    Stay ahead of the curve with our analysis of the top 5 industry trends that will shape the market in 2025 and beyond.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                    <span className="text-xs">Twitter</span>
                    <span className="inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
                    <span className="text-xs">LinkedIn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm">Schedule</Button>
                  </div>
                </CardFooter>
              </Card>
              
              {/* Content Card 6 */}
              <Card>
                <CardHeader>
                  <CardTitle className="line-clamp-1">Weekly Inspiration: Beautiful Design Examples</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500 text-primary-foreground hover:bg-green-500/80">Published</span>
                    <span className="text-xs text-muted-foreground">Yesterday, 4:15 PM</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    Get inspired with our weekly roundup of beautiful design examples from around the web. Perfect for sparking creativity!
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-pink-500"></span>
                    <span className="text-xs">Instagram</span>
                    <span className="inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    <span className="text-xs">Pinterest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">View Stats</Button>
                    <Button variant="ghost" size="sm">Duplicate</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="published" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Published content would go here */}
              <Card>
                <CardHeader>
                  <CardTitle className="line-clamp-1">Introducing Our New Product Line</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500 text-primary-foreground hover:bg-green-500/80">Published</span>
                    <span className="text-xs text-muted-foreground">Today, 9:30 AM</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    We're excited to announce our latest product line, designed with you in mind. Check out the new features and benefits!
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                    <span className="text-xs">Facebook</span>
                    <span className="inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
                    <span className="text-xs">LinkedIn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">View Stats</Button>
                    <Button variant="ghost" size="sm">Duplicate</Button>
                  </div>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="line-clamp-1">Weekly Inspiration: Beautiful Design Examples</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500 text-primary-foreground hover:bg-green-500/80">Published</span>
                    <span className="text-xs text-muted-foreground">Yesterday, 4:15 PM</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    Get inspired with our weekly roundup of beautiful design examples from around the web. Perfect for sparking creativity!
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-pink-500"></span>
                    <span className="text-xs">Instagram</span>
                    <span className="inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    <span className="text-xs">Pinterest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">View Stats</Button>
                    <Button variant="ghost" size="sm">Duplicate</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="scheduled" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Scheduled content would go here */}
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
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90 hover:bg-destructive/10">Delete</Button>
                  </div>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="line-clamp-1">Customer Success Story: How Company X Increased Sales by 200%</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">Scheduled</span>
                    <span className="text-xs text-muted-foreground">April 20, 2:00 PM</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    Learn how our client Company X implemented our solutions and saw a dramatic increase in sales within just three months.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                    <span className="text-xs">LinkedIn</span>
                    <span className="inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                    <span className="text-xs">Facebook</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90 hover:bg-destructive/10">Delete</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="drafts" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Draft content would go here */}
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
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm">Schedule</Button>
                  </div>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="line-clamp-1">5 Industry Trends to Watch in 2025</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-500 text-primary-foreground hover:bg-amber-500/80">Draft</span>
                    <span className="text-xs text-muted-foreground">Created 3 days ago</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    Stay ahead of the curve with our analysis of the top 5 industry trends that will shape the market in 2025 and beyond.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                    <span className="text-xs">Twitter</span>
                    <span className="inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
                    <span className="text-xs">LinkedIn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm">Schedule</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </div>
      </div>
    </MainLayout>
  );
}
