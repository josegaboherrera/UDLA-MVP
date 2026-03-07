import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'UDLA Space Booking',
  description: 'Book university spaces online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}