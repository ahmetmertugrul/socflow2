"use client";

import * as React from 'react';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { BlueskyIcon, FacebookIcon, InstagramIcon, LinkedinIcon, MediumIcon, PinterestIcon, TelegramIcon, ThreadsIcon, TiktokIcon, TumblrIcon, XIcon, YoutubeIcon } from '@/components/icons/SocialIcons';
import { useCalendar } from '@/context/calendar-context';
import { toast } from 'sonner';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  FileVideo,
  FileAudio,
  Hash,
  Sparkles,
  Clock,
  Send,
  Save,
  X,
  Plus,
  Paperclip
} from 'lucide-react';

// Custom All icon component
const AllIcon = () => (
  <div className="flex items-center justify-center">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
    </svg>
  </div>
);

// Social media platforms (alphabetically ordered)
const platforms = [
  { id: 'all', name: 'All', icon: AllIcon, color: 'bg-gray-500', enabled: true },
  { id: 'bluesky', name: 'Bluesky', icon: BlueskyIcon, color: 'bg-sky-500', enabled: true },
  { id: 'facebook', name: 'Facebook', icon: FacebookIcon, color: 'bg-blue-600', enabled: true },
  { id: 'instagram', name: 'Instagram', icon: InstagramIcon, color: 'bg-pink-600', enabled: true },
  { id: 'linkedin', name: 'LinkedIn', icon: LinkedinIcon, color: 'bg-blue-700', enabled: true },
  { id: 'medium', name: 'Medium', icon: MediumIcon, color: 'bg-black', enabled: true },
  { id: 'pinterest', name: 'Pinterest', icon: PinterestIcon, color: 'bg-red-600', enabled: true },
  { id: 'telegram', name: 'Telegram', icon: TelegramIcon, color: 'bg-blue-500', enabled: true },
  { id: 'threads', name: 'Threads', icon: ThreadsIcon, color: 'bg-black', enabled: true },
  { id: 'tiktok', name: 'TikTok', icon: TiktokIcon, color: 'bg-black', enabled: true },
  { id: 'tumblr', name: 'Tumblr', icon: TumblrIcon, color: 'bg-indigo-900', enabled: true },
  { id: 'twitter', name: 'X', icon: XIcon, color: 'bg-black', enabled: true },
  { id: 'youtube', name: 'YouTube', icon: YoutubeIcon, color: 'bg-red-600', enabled: true },
];

export function ContentEditor() {
  const { addScheduledContent } = useCalendar();
  const [activeTab, setActiveTab] = useState('create');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviewUrls, setMediaPreviewUrls] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Add media file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setMediaFiles([...mediaFiles, ...newFiles]);
      
      // Create preview URLs
      const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
      setMediaPreviewUrls([...mediaPreviewUrls, ...newPreviewUrls]);
    }
  };
  
  // Remove media file
  const removeMedia = (index: number) => {
    const newFiles = [...mediaFiles];
    const newPreviewUrls = [...mediaPreviewUrls];
    
    // Clean up preview URL
    URL.revokeObjectURL(newPreviewUrls[index]);
    
    newFiles.splice(index, 1);
    newPreviewUrls.splice(index, 1);
    
    setMediaFiles(newFiles);
    setMediaPreviewUrls(newPreviewUrls);
  };
  
  // Add tag
  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };
  
  // Remove tag
  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };
  
  // Add tag with Enter key
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };
  
  // Toggle platform selection
  const togglePlatform = (platformId: string) => {
    if (platformId === 'all') {
      // Eu011fer tu00fcm platformlar zaten seu00e7iliyse, hepsini kapat
      const allPlatformIds = platforms.filter(p => p.id !== 'all' && p.enabled).map(p => p.id);
      const allSelected = allPlatformIds.every(id => selectedPlatforms.includes(id));
      
      if (allSelected) {
        // Tu00fcm platformlaru0131n seu00e7imini kalu0131du0131r
        setSelectedPlatforms([]);
      } else {
        // Tu00fcm platformlaru0131 seu00e7
        setSelectedPlatforms(allPlatformIds);
      }
    } else {
      setSelectedPlatforms(prev => prev.includes(platformId) ? prev.filter(id => id !== platformId) : [...prev, platformId]);
    }
  };
  
  // Text formatting functions
  const formatText = (format: string) => {
    switch (format) {
      case 'bold':
        // Bold formatting logic
        break;
      case 'italic':
        // Italic formatting logic
        break;
      case 'underline':
        // Underline formatting logic
        break;
      default:
        break;
    }
  };
  
  // Generate content with AI
  const generateAIContent = () => {
    // This will be integrated with Groq or another AI API later
    setContent("This content was generated by AI. Real AI integration will be implemented later.");
  };
  
  // Get calendar context
  // Publish content immediately
  const handlePublish = () => {
    // Publishing logic will be implemented here
    console.log({
      title,
      content,
      tags,
      selectedPlatforms,
      mediaFiles: mediaFiles.map(f => f.name)
    });
    
    toast.success('Content published successfully!');
  };
  
  // Schedule content for later
  const handleSchedule = () => {
    if (!scheduledDate || !scheduledTime) {
      toast.error('Please select a date and time for scheduling');
      return;
    }
    
    // Get the first line of content as title or use a default
    const contentLines = content.split('\n');
    const contentTitle = contentLines[0].trim() || 'Scheduled Post';
    
    // Calculate end time (1 hour after start)
    const [hours, minutes] = scheduledTime.split(':');
    const endHour = (parseInt(hours) + 1) % 24;
    const endTime = `${endHour.toString().padStart(2, '0')}:${minutes}`;
    
    // Create a unique ID
    const id = `content-${Date.now()}`;
    
    // Get platform IDs from selected platforms
    const platformIds = selectedPlatforms.map(platform => {
      const found = platforms.find(p => p.id === platform);
      return found ? found.name : platform;
    });
    
    // Add to calendar
    addScheduledContent({
      id,
      title: contentTitle,
      content,
      platforms: platformIds,
      startTime: scheduledTime,
      endTime,
      date: scheduledDate,
      color: '#ec4899' // pink color for social media posts
    });
    
    toast.success('Content scheduled successfully!');
  };  
    // Clear form after successful publish
    // setContent('');
    // setTitle('');
    // setTags([]);
    // setMediaFiles([]);
    // setMediaPreviewUrls([]);
    // setScheduledDate('');
    // setScheduledTime('');
  
  // Cleanup function
  useEffect(() => {
    return () => {
      // Clean up preview URLs when component unmounts
      mediaPreviewUrls.forEach((url: string) => URL.revokeObjectURL(url));
    };
  }, [mediaPreviewUrls]);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
      <Tabs defaultValue="create" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Create Content</TabsTrigger>
          <TabsTrigger value="ai">Create with AI</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create" className="mt-4">
          <Card>
            <CardContent>
              <div className="space-y-4">
                {/* Content Editor */}
                <div className="space-y-2">
                  <Label>Content</Label>
                  <div className="border rounded-md p-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => formatText('bold')}
                      >
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => formatText('italic')}
                      >
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => formatText('underline')}
                      >
                        <Underline className="h-4 w-4" />
                      </Button>
                      <div className="w-px h-8 bg-border" />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => formatText('bulletList')}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => formatText('numberedList')}
                      >
                        <ListOrdered className="h-4 w-4" />
                      </Button>
                      <div className="w-px h-8 bg-border" />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => formatText('alignLeft')}
                      >
                        <AlignLeft className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => formatText('alignCenter')}
                      >
                        <AlignCenter className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => formatText('alignRight')}
                      >
                        <AlignRight className="h-4 w-4" />
                      </Button>
                      <div className="w-px h-8 bg-border" />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => formatText('link')}
                      >
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => formatText('video')}
                      >
                        <FileVideo className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => formatText('audio')}
                      >
                        <FileAudio className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea 
                      placeholder="What's on your mind?" 
                      className="min-h-[200px] border-0 focus-visible:ring-0 p-0 resize-none" 
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                      multiple
                    />
                    
                    {/* Media Preview */}
                    {mediaFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <Label>Media</Label>
                        <div className="flex flex-wrap gap-2">
                          {mediaPreviewUrls.map((url, index) => (
                            <div key={index} className="relative">
                              <img 
                                src={url} 
                                alt={`Preview ${index}`} 
                                className="h-20 w-20 object-cover rounded-md" 
                              />
                              <Button
                                variant="destructive"
                                size="icon"
                                className="h-5 w-5 absolute -top-2 -right-2 rounded-full"
                                onClick={() => removeMedia(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            className="h-20 w-20 flex flex-col items-center justify-center rounded-md border-dashed"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Plus className="h-6 w-6 mb-1" />
                            <span className="text-xs">Add Media</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="px-3 py-1">
                        <span className="mr-1"># {tag}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-4 w-4 p-0 ml-1" 
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <div className="flex">
                        <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                          <Hash className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input 
                          placeholder="Add tag" 
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          onKeyDown={handleTagKeyDown}
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    <Button onClick={addTag}>Add</Button>
                  </div>
                </div>
                
                {/* Platform Selection */}
                <div className="space-y-2">
                  <Label>Platforms</Label>
                  <div className="border rounded-md p-4">
                    <ScrollArea className="h-auto">
                      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(13, 1fr)' }}>
                        {platforms.map(platform => {
                          const isSelected = selectedPlatforms.includes(platform.id);
                          return (
                            <div 
                              key={platform.id} 
                              className={cn(
                                "flex-shrink-0 flex flex-col items-center justify-center gap-1 p-1 rounded-md cursor-pointer transition-colors w-full h-20",
                                isSelected ? "bg-primary/10 border border-primary/30" : "hover:bg-muted",
                                !platform.enabled && "opacity-50 cursor-not-allowed"
                              )}
                              onClick={() => platform.enabled && togglePlatform(platform.id)}
                            >
                              <div className={cn("p-1 rounded-full flex items-center justify-center", platform.color)} style={{width: '36px', height: '36px'}}>
                                {platform.id === 'all' ? (
                                  <AllIcon />
                                ) : (
                                  <div className="h-5 w-5 text-white flex items-center justify-center">
                                    {React.createElement(platform.icon)}
                                  </div>
                                )}
                              </div>
                              <span className="text-xs font-medium text-center w-full">{platform.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
                  
                {/* Scheduling */}
                <div className="space-y-2">
                  <Label>Scheduling</Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1">
                      <Input 
                        type="date" 
                        value={scheduledDate} 
                        onChange={(e) => setScheduledDate(e.target.value)} 
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="flex-1">
                      <Input 
                        type="time" 
                        value={scheduledTime} 
                        onChange={(e) => setScheduledTime(e.target.value)} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleSchedule} disabled={!scheduledDate || !scheduledTime}>
                  <Clock className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
                <Button onClick={handlePublish} disabled={content.trim() === ''}>
                  <Send className="h-4 w-4 mr-2" />
                  Sent
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Content with AI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-prompt">AI Prompt</Label>
                  <Textarea 
                    id="ai-prompt" 
                    placeholder="Describe what kind of content you want the AI to create..." 
                    className="min-h-[100px]" 
                  />
                </div>
                
                <div className="flex justify-center">
                  <Button onClick={generateAIContent}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Content
                  </Button>
                </div>
                
                {content && (
                  <div className="space-y-2 mt-4">
                    <Label>Generated Content</Label>
                    <div className="p-4 rounded-md border bg-muted/20">
                      <p className="whitespace-pre-wrap">{content}</p>
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button variant="outline" onClick={() => setActiveTab('create')}>
                        Continue Editing
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
