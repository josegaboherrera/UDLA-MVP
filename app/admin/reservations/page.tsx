'use client'

import { mockReservations, mockApplicants, mockSpaces } from '@/lib/mockData'
import { useState } from 'react'

export default function ReservationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredReservations = mockReservations.filter((res) => {
    const applicant = mockApplicants.find((a) => a.id === res.applicantId)
    const matchesSearch =
      applicant?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.id.toString().includes(searchTerm) ||
      res.applicantId.includes(searchTerm)
    const matchesStatus = filterStatus === 'all' || res.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleExportToExcel = () => {
    // Create CSV content
    const headers = [
      'Reservation ID',
      'Date',
      'Applicant',
      'ID Number',
      'Space',
      'Category',
      'Start Time',
      'End Time',
      'Duration (hours)',
      'Rate/hour',
      'Total Amount',
      'Status',
      'Notes',
    ]

    const rows = filteredReservations.map((res) => {
      const applicant = mockApplicants.find((a) => a.id === res.applicantId)
      const space = mockSpaces.find((s) => s.id === res.spaceId)
      const start = new Date(res.start)
      const end = new Date(res.end)
      const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
      const totalAmount = (space?.rate || 0) * durationHours

      return [
        res.id,
        start.toLocaleDateString(),
        applicant?.name || 'N/A',
        res.applicantId,
        space?.name || 'N/A',
        space?.category || 'N/A',
        start.toLocaleTimeString(),
        end.toLocaleTimeString(),
        durationHours,
        space?.rate || 0,
        totalAmount.toFixed(2),
        res.status,
        res.notes || '',
      ]
    })

    // Create CSV string
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `reservations-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="py-20">
      <h1 className="text-3xl font-bold mb-8">Gestión de Reservas</h1>

      {/* Filter and Search */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <input
              type="text"
              placeholder="Buscar por nombre, ID o número de reserva..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
            >
              <option value="all">Todos los Estados</option>
              <option value="Confirmed">Confirmada</option>
              <option value="Pending">Pendiente</option>
              <option value="Cancelled">Cancelada</option>
              <option value="Completed">Completada</option>
            </select>
          </div>
          <button
            onClick={handleExportToExcel}
            className="bg-green-600 text-white p-3 rounded hover:bg-green-700 font-semibold"
          >
            📥 Exportar a Excel
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Mostrando {filteredReservations.length} de {mockReservations.length} reservas
        </p>
      </div>

      {/* Reservations Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 text-left font-semibold">ID</th>
              <th className="p-4 text-left font-semibold">Solicitante</th>
              <th className="p-4 text-left font-semibold">Cédula</th>
              <th className="p-4 text-left font-semibold">Correo Electrónico</th>
              <th className="p-4 text-left font-semibold">Teléfono</th>
              <th className="p-4 text-left font-semibold">Espacio</th>
              <th className="p-4 text-left font-semibold">Inicio</th>
              <th className="p-4 text-left font-semibold">Fin</th>
              <th className="p-4 text-left font-semibold">ID Pago</th>
              <th className="p-4 text-left font-semibold">Estado</th>
              <th className="p-4 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.length > 0 ? (
              filteredReservations.map((res) => {
                const applicant = mockApplicants.find((a) => a.id === res.applicantId)
                const space = mockSpaces.find((s) => s.id === res.spaceId)
                return (
                  <tr key={res.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{res.id}</td>
                    <td className="p-4">{applicant?.name}</td>
                    <td className="p-4 font-semibold text-blue-600">{applicant?.id}</td>
                    <td className="p-4 text-sm">{applicant?.email}</td>
                    <td className="p-4">{applicant?.phone}</td>
                    <td className="p-4">{space?.name}</td>
                    <td className="p-4">{new Date(res.start).toLocaleString()}</td>
                    <td className="p-4">{new Date(res.end).toLocaleString()}</td>
                    <td className="p-4 font-semibold">PAY-{res.id}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          res.status === 'Confirmed'
                            ? 'bg-green-100 text-green-800'
                            : res.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {res.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="text-blue-600 hover:underline mr-3">Editar</button>
                      <button className="text-red-600 hover:underline">Eliminar</button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={11} className="p-4 text-center text-gray-500">
                  No se encontraron reservas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}