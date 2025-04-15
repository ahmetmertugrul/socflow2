import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export const metadata: Metadata = {
  title: "Create Content - SocFlow",
  description: "Create and schedule social media content",
};

export default function CreateContentPage() {
  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Create Content</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline">Save as Draft</Button>
              <Button>Schedule Post</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Content Editor */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Title</label>
                    <Input id="title" placeholder="Enter a title for your post" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium">Content</label>
                    <Textarea 
                      id="content" 
                      placeholder="What do you want to share?" 
                      className="min-h-[200px] resize-y"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Media</label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-muted-foreground">
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                          <line x1="16" x2="22" y1="5" y2="5" />
                          <line x1="19" x2="19" y1="2" y2="8" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                        <p className="text-sm text-muted-foreground">
                          Drag and drop files here or click to browse
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Upload Media
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tags</label>
                    <Input placeholder="Add tags separated by commas" />
                  </div>
                </CardContent>
              </Card>
              
              {/* AI Content Assistant */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold">AI Content Assistant</h3>
                  <p className="text-sm text-muted-foreground">
                    Let our AI help you create engaging content for your social media posts.
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                        <path d="M21 15V6" />
                        <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        <path d="M12 12H3" />
                        <path d="M16 6H3" />
                        <path d="M12 18H3" />
                      </svg>
                      Generate Ideas
                    </Button>
                    <Button variant="outline">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                        <path d="M12 3v12" />
                        <path d="m8 11 4 4 4-4" />
                        <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
                      </svg>
                      Improve Content
                    </Button>
                    <Button variant="outline">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                        <path d="M7 20h10" />
                        <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
                        <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
                      </svg>
                      Suggest Hashtags
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Settings Panel */}
            <div className="space-y-6">
              {/* Platform Selection */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold">Platforms</h3>
                  <p className="text-sm text-muted-foreground">
                    Select the platforms where you want to publish this content.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="twitter" />
                      <label htmlFor="twitter" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                        Twitter
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="facebook" defaultChecked />
                      <label htmlFor="facebook" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                        Facebook
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="instagram" defaultChecked />
                      <label htmlFor="instagram" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                        Instagram
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="linkedin" />
                      <label htmlFor="linkedin" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                        LinkedIn
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pinterest" />
                      <label htmlFor="pinterest" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                        Pinterest
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tiktok" />
                      <label htmlFor="tiktok" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                        TikTok
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Scheduling */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold">Scheduling</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose when to publish your content.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="date" className="text-sm font-medium">Date</label>
                        <Input id="date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="time" className="text-sm font-medium">Time</label>
                        <Input id="time" type="time" />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="best-time" />
                      <label htmlFor="best-time" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                        Schedule at best time for engagement
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="repeat" />
                      <label htmlFor="repeat" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                        Repeat this post
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Platform Preview */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold">Preview</h3>
                  <Tabs defaultValue="facebook">
                    <TabsList className="w-full">
                      <TabsTrigger value="facebook" className="flex-1">Facebook</TabsTrigger>
                      <TabsTrigger value="instagram" className="flex-1">Instagram</TabsTrigger>
                      <TabsTrigger value="twitter" className="flex-1">Twitter</TabsTrigger>
                    </TabsList>
                    <TabsContent value="facebook" className="mt-4">
                      <div className="border rounded-md p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-muted"></div>
                          <div>
                            <div className="font-medium">Your Page</div>
                            <div className="text-xs text-muted-foreground">Just now</div>
                          </div>
                        </div>
                        <p className="text-sm">Your content will appear here...</p>
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center text-sm text-muted-foreground">
                          Media Preview
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="instagram" className="mt-4">
                      <div className="border rounded-md p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-muted"></div>
                          <div className="font-medium">your_account</div>
                        </div>
                        <div className="aspect-square bg-muted rounded-md flex items-center justify-center text-sm text-muted-foreground">
                          Media Preview
                        </div>
                        <p className="text-sm">Your content will appear here...</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="twitter" className="mt-4">
                      <div className="border rounded-md p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-muted"></div>
                          <div>
                            <div className="font-medium">Your Name</div>
                            <div className="text-xs text-muted-foreground">@your_handle</div>
                          </div>
                        </div>
                        <p className="text-sm">Your content will appear here...</p>
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center text-sm text-muted-foreground">
                          Media Preview
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
