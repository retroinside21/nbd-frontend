'use client'

import Script from 'next/script'

export default function TelegramLoginButton() {
  return (
    <Script
      async
      src="https://telegram.org/js/telegram-widget.js?22"
      data-telegram-login="testnbdbotbot"
      data-size="large"
      data-auth-url="https://testbot.nobaddays.site/api/auth/telegram"
      data-request-access="write"
      strategy="afterInteractive"
    />
  )
}
