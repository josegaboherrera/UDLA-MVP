import type { Metadata } from 'next'
import UDLABrandHeader from '../components/UDLABrandHeader'
import './globals.css'

export const metadata: Metadata = {
  title: 'UDLA Space Booking',
  description: 'Sistema de reservas de espacios de la Universidad de Las Américas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <UDLABrandHeader />
        {children}
        <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-600">
          Universidad de Las Américas · Plataforma de reservas institucionales
        </footer>
      </body>
    </html>
  )
}
