import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BellIcon, SearchIcon, SunIcon, UserIcon } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">SocFlow</span>
          </Link>
        </div>
        
        <div className="flex-1 px-2 mx-4">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="search" 
              placeholder="Search..." 
              className="w-full bg-muted/30 border-none rounded-full pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <SunIcon className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground relative">
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="text-right mr-2 hidden md:block">
              <p className="text-sm font-medium">April 15, 2025</p>
              <p className="text-xs text-muted-foreground">04:39 PM</p>
            </div>
            
            <Button variant="ghost" size="icon" className="rounded-full bg-primary/10 h-8 w-8">
              <span className="text-primary font-medium text-sm">U</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
