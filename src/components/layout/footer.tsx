import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t py-4 text-sm text-muted-foreground bg-background">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span>&copy; {new Date().getFullYear()} SocFlow. All rights reserved.</span>
        </div>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
