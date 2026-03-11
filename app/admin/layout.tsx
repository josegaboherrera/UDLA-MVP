'use client'

import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="relative w-72 bg-[#001b47] text-white">
        <div className="border-b border-white/20 p-8">
          <div className="mb-4 flex items-center gap-3">
            <img src="/udla-logo.svg" alt="Logo UDLA" className="h-11 w-11 rounded bg-white p-1" />
            <h1 className="text-2xl font-bold">UDLA Admin</h1>
          </div>
          <p className="text-sm text-blue-100">Sistema de Gestión de Espacios</p>
        </div>

        <nav className="mt-6 space-y-3 px-4">
          <Link href="/admin" className="block rounded px-4 py-3 transition hover:bg-white/10">
            📊 Tablero
          </Link>
          <Link href="/admin/applicants" className="block rounded px-4 py-3 transition hover:bg-white/10">
            👥 IDs Autorizados
          </Link>
          <Link href="/admin/reservations" className="block rounded px-4 py-3 transition hover:bg-white/10">
            📅 Reservas
          </Link>
          <Link href="/admin/spaces" className="block rounded px-4 py-3 transition hover:bg-white/10">
            🏢 Espacios
          </Link>
          <Link href="/admin/pricing-rules" className="block rounded px-4 py-3 transition hover:bg-white/10">
            💰 Reglas de Precios
          </Link>
        </nav>

        <div className="absolute bottom-8 left-0 right-0 border-t border-white/20 px-4 pt-4">
          <a href="/" className="block px-4 py-3 text-sm text-blue-100 transition hover:text-white">
            ← Volver al Sitio Público
          </a>
        </div>
      </aside>

      <main className="flex-1 bg-[#f5f8fc]">
        <div className="container mx-auto px-8">{children}</div>
      </main>
    </div>
  )
}
