import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ana sayfa, login veya signup sayfalarına gelen istekleri dashboard'a yönlendir
  const url = request.nextUrl.clone();
  
  if (url.pathname === '/' || url.pathname === '/login' || url.pathname === '/signup') {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/signup'],
};
