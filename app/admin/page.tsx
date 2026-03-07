'use client'

import { mockReservations, mockSpaces } from '@/lib/mockData'
import Link from 'next/link'

export default function AdminPage() {
  const total = mockReservations.length
  const confirmed = mockReservations.filter((r) => r.status === 'Confirmed').length
  const pending = mockReservations.filter((r) => r.status === 'Pending').length
  const cancelled = mockReservations.filter((r) => r.status === 'Cancelled').length

  const upcoming = mockReservations.filter(
    (r) => new Date(r.start) > new Date() && r.status === 'Confirmed'
  ).length

  const revenue = mockReservations.reduce((sum, r) => {
    const space = mockSpaces.find((s) => s.id === r.spaceId)
    const start = new Date(r.start)
    const end = new Date(r.end)
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    return sum + (space?.rate || 0) * hours
  }, 0)

  const mostBookedSpace = mockSpaces.reduce(
    (max, space) => {
      const count = mockReservations.filter((r) => r.spaceId === space.id).length
      return count > (max.count || 0) ? { space, count } : max
    },
    { space: mockSpaces[0], count: 0 }
  )

  return (
    <div className="py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Tablero de Administrador</h1>
        <p className="text-gray-600 mt-2">Bienvenido a Gestión de Espacios UDLA</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total de Reservas</p>
              <p className="text-3xl font-bold mt-2">{total}</p>
            </div>
            <div className="text-4xl">📋</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Próximas (Próximos 7 Días)</p>
              <p className="text-3xl font-bold mt-2">{upcoming}</p>
            </div>
            <div className="text-4xl">🗓️</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Ingresos (Estimados)</p>
              <p className="text-3xl font-bold mt-2">${revenue.toFixed(0)}</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Confirmadas</p>
              <p className="text-3xl font-bold mt-2 text-green-600">{confirmed}</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pendientes</p>
              <p className="text-3xl font-bold mt-2 text-yellow-600">{pending}</p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </div>
      </div>

      {/* Status Breakdown and Most Booked Space */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Status Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Estado de Reservas</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-600 rounded-full mr-3"></div>
                <span>Confirmadas</span>
              </div>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-4" style={{ width: '200px' }}>
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(confirmed / total) * 100}%` }}
                  />
                </div>
                <span className="font-bold">{confirmed}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-600 rounded-full mr-3"></div>
                <span>Pendientes</span>
              </div>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-4" style={{ width: '200px' }}>
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: `${(pending / total) * 100}%` }}
                  />
                </div>
                <span className="font-bold">{pending}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-600 rounded-full mr-3"></div>
                <span>Canceladas</span>
              </div>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-4" style={{ width: '200px' }}>
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: `${(cancelled / total) * 100}%` }}
                  />
                </div>
                <span className="font-bold">{cancelled}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Most Booked Space */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Espacio Más Reservado</h2>
          {mostBookedSpace.space && (
            <div>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-blue-900">{mostBookedSpace.space.name}</h3>
                <p className="text-sm text-blue-700 mt-1">{mostBookedSpace.space.category}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Reservas:</span>
                  <span className="font-bold">{mostBookedSpace.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacidad:</span>
                  <span className="font-bold">{mostBookedSpace.space.capacity} personas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tarifa:</span>
                  <span className="font-bold">${mostBookedSpace.space.rate}/hora</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            href="/admin/applicants"
            className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded text-center font-semibold transition"
          >
            👥 Gestionar IDs
          </Link>
          <Link
            href="/admin/reservations"
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded text-center font-semibold transition"
          >
            📅 Reservas
          </Link>
          <Link
            href="/admin/spaces"
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded text-center font-semibold transition"
          >
            🏢 Espacios
          </Link>
          <button className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded text-center font-semibold transition">
            💾 Exportar Datos
          </button>
        </div>
      </div>
    </div>
  )
}