import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if accessing admin dashboard
  if (pathname.startsWith('/admin/dashboard')) {
    const session = request.cookies.get('admin_session')

    // If no session or empty token, redirect to login
    if (!session || !session.value || session.value.length < 10) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/dashboard/:path*'
}
