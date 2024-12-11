import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const path = req.nextUrl.pathname;

  // Define protected routes
  const protectedRoutes = ['/'];
  const authRoutes = ['/login'];
  // Redirect to login if trying to access protected route without authentication
  if (protectedRoutes.includes(path) && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Redirect to dashboard if authenticated user tries to access login
  if (authRoutes.includes(path) && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/']
}