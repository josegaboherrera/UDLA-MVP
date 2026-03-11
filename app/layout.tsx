import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Reserva de Espacios | UDLA',
  description: 'Sistema de reservas de espacios universitarios - Universidad de Las Américas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  )
}
