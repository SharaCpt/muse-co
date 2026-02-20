import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, hostname, protocol } = request.nextUrl

  // Enforce www prefix (non-www → www redirect to prevent duplicate content)
  if (
    hostname === 'museco.co.za' &&
    !hostname.startsWith('www.')
  ) {
    const url = request.nextUrl.clone()
    url.hostname = 'www.museco.co.za'
    return NextResponse.redirect(url, 301)
  }

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
  matcher: [
    // Match admin dashboard routes
    '/admin/dashboard/:path*',
    // Match all routes for www enforcement (exclude static files and API)
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ]
}
