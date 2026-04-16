import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get('host') || 'www.museco.co.za'

  // 1. Strip trailing slashes with ABSOLUTE URL redirect (single hop for Google)
  //    This runs AFTER Vercel's non-www→www redirect, so host is already www.
  //    By handling it here, we return a full absolute URL instead of a relative path.
  if (pathname !== '/' && pathname.endsWith('/')) {
    const cleanPath = pathname.slice(0, -1)
    const url = new URL(`https://${host}${cleanPath}`)
    url.search = request.nextUrl.search
    return NextResponse.redirect(url, 308)
  }

  // 2. Protect admin dashboard — require session cookie
  if (pathname.startsWith('/admin/dashboard')) {
    const session = request.cookies.get('admin_session')

    if (!session || !session.value || session.value.length < 10) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  // Match all routes for trailing slash handling + admin protection
  // Exclude static files and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)',
  ],
}
