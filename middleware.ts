import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Non-www → www is handled by Vercel at the infrastructure level (308).
  // We don't duplicate that here to avoid redirect chains.

  // Protect admin dashboard — require session cookie
  if (pathname.startsWith('/admin/dashboard')) {
    const session = request.cookies.get('admin_session')

    if (!session || !session.value || session.value.length < 10) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  // Only run middleware on admin routes — no need for broad matching
  matcher: ['/admin/dashboard/:path*'],
}
