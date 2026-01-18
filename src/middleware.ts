import {
  NextRequest, NextResponse,
} from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value
  const {
    pathname,
  } = req.nextUrl

  // Нет токена — ничего не делаем
  if (!token) {
    return NextResponse.next()
  }

  // --- 1. Пользователь заходит на корень сайта "/" ---
  if (pathname === '/' || pathname === '') {
    return NextResponse.redirect(new URL('/admin/subscribe', req.url))
  }

  // --- 2. Заходит на сам "/admin" ---
  if (pathname === '/admin' || pathname === '/admin/') {
    return NextResponse.redirect(new URL('/admin/subscribe', req.url))
  }

  // --- 3. Всё остальное пропускаем ---
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/admin/:path*'],
}
