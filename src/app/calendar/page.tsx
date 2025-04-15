import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Content Calendar - SocFlow",
  description: "Schedule and manage your social media content",
};

export default function CalendarPage() {
  // In a real app, this would be fetched from an API
  const scheduledPosts = [
    {
      id: 1,
      title: "10 Tips for Better Social Media Engagement",
      platforms: ["Twitter", "Instagram"],
      time: "10:00 AM",
      status: "scheduled",
    },
    {
      id: 2,
      title: "Product Launch Announcement",
      platforms: ["Facebook", "LinkedIn"],
      time: "2:30 PM",
      status: "scheduled",
    },
    {
      id: 3,
      title: "Weekly Inspiration Post",
      platforms: ["Instagram"],
      time: "5:45 PM",
      status: "scheduled",
    },
  ];

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Content Calendar</h1>
            <Button>Schedule New Post</Button>
          </div>
          
          <Tabs defaultValue="month" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1"><path d="m15 18-6-6 6-6"/></svg>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Today
                </Button>
                <Button variant="outline" size="sm">
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1"><path d="m9 18 6-6-6-6"/></svg>
                </Button>
              </div>
            </div>
            
            <TabsContent value="day" className="space-y-4">
              <h2 className="text-xl font-semibold">April 15, 2025</h2>
              <div className="grid gap-4">
                {scheduledPosts.map((post) => (
                  <Card key={post.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-muted-foreground">{post.time}</div>
                        <div className="flex items-center gap-2 mt-2">
                          {post.platforms.map((platform) => (
                            <span 
                              key={platform} 
                              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                            >
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Delete</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="week" className="space-y-4">
              <h2 className="text-xl font-semibold">April 15 - 21, 2025</h2>
              <div className="grid grid-cols-7 gap-4">
                {Array.from({ length: 7 }).map((_, index) => {
                  const day = index + 15;
                  const isToday = day === 15;
                  return (
                    <div key={index} className="space-y-2">
                      <div className={`text-center p-2 rounded-md ${isToday ? 'bg-primary text-primary-foreground' : ''}`}>
                        <div className="text-xs">{
                          ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][(index + 2) % 7]
                        }</div>
                        <div className="font-semibold">{day}</div>
                      </div>
                      <div className="space-y-2">
                        {index === 0 && (
                          <Card className="p-2">
                            <div className="text-xs font-medium truncate">10 Tips for Better Social Media</div>
                            <div className="text-xs text-muted-foreground">10:00 AM</div>
                          </Card>
                        )}
                        {index === 0 && (
                          <Card className="p-2">
                            <div className="text-xs font-medium truncate">Product Launch</div>
                            <div className="text-xs text-muted-foreground">2:30 PM</div>
                          </Card>
                        )}
                        {index === 0 && (
                          <Card className="p-2">
                            <div className="text-xs font-medium truncate">Weekly Inspiration</div>
                            <div className="text-xs text-muted-foreground">5:45 PM</div>
                          </Card>
                        )}
                        {index === 2 && (
                          <Card className="p-2">
                            <div className="text-xs font-medium truncate">Customer Spotlight</div>
                            <div className="text-xs text-muted-foreground">11:00 AM</div>
                          </Card>
                        )}
                        {index === 4 && (
                          <Card className="p-2">
                            <div className="text-xs font-medium truncate">Weekend Promotion</div>
                            <div className="text-xs text-muted-foreground">3:00 PM</div>
                          </Card>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="month" className="space-y-4">
              <h2 className="text-xl font-semibold">April 2025</h2>
              <div className="grid grid-cols-7 gap-1">
                {/* Day headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center p-2 text-sm font-medium">
                    {day}
                  </div>
                ))}
                
                {/* Empty cells for days from previous month */}
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={`prev-${index}`} className="p-2 text-center text-muted-foreground text-sm border border-muted">
                    {30 + index}
                  </div>
                ))}
                
                {/* Days in current month */}
                {Array.from({ length: 30 }).map((_, index) => {
                  const day = index + 1;
                  const isToday = day === 15;
                  const hasEvents = [1, 3, 5, 8, 10, 15, 17, 20, 22, 25, 28].includes(day);
                  return (
                    <div 
                      key={day} 
                      className={`p-2 min-h-[80px] text-sm border ${isToday ? 'bg-primary/10 border-primary' : 'border-muted'}`}
                    >
                      <div className={`text-right font-medium ${isToday ? 'text-primary' : ''}`}>{day}</div>
                      {hasEvents && (
                        <div className="mt-1">
                          <div className="text-xs bg-blue-100 dark:bg-blue-900 p-1 rounded truncate mb-1">
                            {day === 15 ? '3 scheduled posts' : '1 scheduled post'}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* Empty cells for days from next month */}
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={`next-${index}`} className="p-2 text-center text-muted-foreground text-sm border border-muted">
                    {index + 1}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
