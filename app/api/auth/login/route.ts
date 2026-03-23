import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

// Simple in-memory rate limiting
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()
const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
         request.headers.get('x-real-ip') || 
         'unknown'
}

function isRateLimited(ip: string): boolean {
  const record = loginAttempts.get(ip)
  if (!record) return false
  
  if (Date.now() - record.lastAttempt > LOCKOUT_DURATION) {
    loginAttempts.delete(ip)
    return false
  }
  
  return record.count >= MAX_ATTEMPTS
}

function recordAttempt(ip: string): void {
  const record = loginAttempts.get(ip)
  if (record && Date.now() - record.lastAttempt < LOCKOUT_DURATION) {
    record.count++
    record.lastAttempt = Date.now()
  } else {
    loginAttempts.set(ip, { count: 1, lastAttempt: Date.now() })
  }
}

function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)
    
    // Check rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again in 15 minutes.' },
        { status: 429 }
      )
    }

    const { password } = await request.json()

    // Verify password
    if (password !== process.env.ADMIN_PASSWORD) {
      recordAttempt(ip)
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Generate secure session token
    const sessionToken = generateSessionToken()

    // Create session cookie with secure token
    const cookieStore = await cookies()
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours (reduced from 7 days)
      path: '/'
    })

    // Sign into Supabase Auth server-side (credentials never sent to browser)
    let supabaseSession = null
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data } = await supabase.auth.signInWithPassword({
        email: process.env.SUPABASE_ADMIN_EMAIL || 'admin@museco.co.za',
        password: process.env.SUPABASE_ADMIN_PASSWORD || '',
      })
      if (data?.session) {
        supabaseSession = {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        }
      }
    } catch {
      // Supabase auth is optional — admin session cookie still works for page access
    }

    // Clear failed attempts on success
    loginAttempts.delete(ip)

    return NextResponse.json({ success: true, supabaseSession })
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

// Logout endpoint
export async function DELETE() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('admin_session')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
}
