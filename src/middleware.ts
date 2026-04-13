import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({ request: req })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          res = NextResponse.next({ request: req })
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect /admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Redirect authenticated users away from /login
  if (req.nextUrl.pathname === '/login' && user) {
    const redirectTo = req.nextUrl.searchParams.get('redirectTo')
    const destination = redirectTo?.startsWith('/admin') ? redirectTo : '/admin'
    return NextResponse.redirect(new URL(destination, req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
