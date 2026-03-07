'use client'

import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white">
        <div className="p-8">
          <h1 className="text-2xl font-bold">UDLA Administrador</h1>
          <p className="text-slate-400 text-sm mt-2">Sistema de Gestión de Espacios</p>
        </div>

        <nav className="mt-8 space-y-4 px-4">
          <Link
            href="/admin"
            className="block px-4 py-3 rounded hover:bg-slate-700 transition"
          >
            📊 Tablero
          </Link>
          <Link
            href="/admin/applicants"
            className="block px-4 py-3 rounded hover:bg-slate-700 transition"
          >
            👥 IDs Autorizados
          </Link>
          <Link
            href="/admin/reservations"
            className="block px-4 py-3 rounded hover:bg-slate-700 transition"
          >
            📅 Reservas
          </Link>
          <Link
            href="/admin/spaces"
            className="block px-4 py-3 rounded hover:bg-slate-700 transition"
          >
            🏢 Espacios
          </Link>
          <Link
            href="/admin/pricing-rules"
            className="block px-4 py-3 rounded hover:bg-slate-700 transition"
          >
            💰 Reglas de Precios
          </Link>
          <div className="border-t border-slate-700 mt-6 pt-6">
            <div className="px-4 py-3 text-slate-400 text-sm">OTROS</div>
            <a href="#" className="block px-4 py-3 rounded hover:bg-slate-700 transition">
              ⚙️ Configuración
            </a>
          </div>
        </nav>

        <div className="absolute bottom-8 left-0 right-0 px-4 border-t border-slate-700 pt-4">
          <a href="/" className="block px-4 py-3 text-sm text-slate-400 hover:text-white transition">
            ← Volver al Sitio Público
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-8">
          {children}
        </div>
      </main>
    </div>
  )
}