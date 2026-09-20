import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const requestedNext = searchParams.get('next') ?? '/'
  const next = requestedNext.startsWith('/') ? requestedNext : '/'
  const callbackError = searchParams.get('error_description') || searchParams.get('error')

  if (callbackError) {
    const target = new URL(next, origin)
    target.searchParams.set('error', callbackError)
    return NextResponse.redirect(target)
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') // x-forwarded-host is a link to the real host
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that origin is localhost:3000
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  const target = new URL(next === '/' ? '/login' : next, origin)
  target.searchParams.set('error', 'invalid_recovery_link')
  return NextResponse.redirect(target)
}
