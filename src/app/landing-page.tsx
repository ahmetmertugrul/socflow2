import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/logo.svg" 
                alt="SocFlow Logo" 
                width={32} 
                height={32}
                className="rounded-md"
              />
              <span className="text-xl font-bold">SocFlow</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">Features</Link>
            <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">Pricing</Link>
            <Link href="#faq" className="text-sm font-medium hover:underline underline-offset-4">FAQ</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-24 md:py-32 flex flex-col items-center text-center space-y-8">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Manage All Your Social Media In One Place
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-[700px] mx-auto">
            Schedule posts, analyze performance, and create content with AI assistance across all major social platforms.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" className="px-8">Get Started</Button>
          </Link>
          <Link href="#demo">
            <Button size="lg" variant="outline" className="px-8">Watch Demo</Button>
          </Link>
        </div>
        <div className="relative w-full max-w-5xl mt-16 aspect-video rounded-lg overflow-hidden border bg-muted/50">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Dashboard Preview Image
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-24 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Powerful Features</h2>
          <p className="text-muted-foreground md:text-lg max-w-[700px] mx-auto">
            Everything you need to manage your social media presence effectively and efficiently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 border rounded-lg">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Content Calendar</h3>
            <p className="text-muted-foreground">Schedule posts across multiple platforms with our intuitive calendar interface.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 border rounded-lg">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M12 16V12L14 14" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Auto-Scheduling</h3>
            <p className="text-muted-foreground">Set it and forget it. Our platform posts your content at the optimal times for engagement.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 border rounded-lg">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M21 15V6" />
                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M12 12H3" />
                <path d="M16 6H3" />
                <path d="M12 18H3" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">AI Content Creation</h3>
            <p className="text-muted-foreground">Generate engaging content with our AI assistant tailored for each social platform.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container flex flex-col items-center text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Ready to Streamline Your Social Media?</h2>
          <p className="text-muted-foreground md:text-lg max-w-[600px]">
            Join thousands of content creators and businesses who save time and boost engagement with SocFlow.
          </p>
          <Link href="/signup">
            <Button size="lg" className="px-8">Start Your Free Trial</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 mt-auto">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/logo.svg" 
                alt="SocFlow Logo" 
                width={24} 
                height={24}
                className="rounded-md"
              />
              <span className="font-bold">SocFlow</span>
            </Link>
            <span className="text-muted-foreground text-sm ml-4">&copy; {new Date().getFullYear()} SocFlow. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
