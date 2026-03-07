'use client'

import { Space } from '@/lib/mockData'
import { ReservationDetailsData } from './ReservationDetails'

interface BookingSummaryProps {
  space: Space
  startDate: string
  startTime: string
  endTime: string
  details: ReservationDetailsData
  onConfirm: () => void
  onEdit: () => void
}

export default function BookingSummary({
  space,
  startDate,
  startTime,
  endTime,
  details,
  onConfirm,
  onEdit,
}: BookingSummaryProps) {
  // Calculate duration and total price
  const start = new Date(`${startDate}T${startTime}`)
  const end = new Date(`${startDate}T${endTime}`)
  const durationHours = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60) * 100) / 100
  const totalPrice = (space.rate * durationHours).toFixed(2)

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Paso 5: Resumen de Reserva</h2>

      <div className="space-y-6">
        {/* Space Information */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-3">Espacio</h3>
          <p className="text-gray-700"><strong>Nombre:</strong> {space.name}</p>
          <p className="text-gray-700"><strong>Categoría:</strong> {space.category}</p>
          <p className="text-gray-700"><strong>Capacidad:</strong> {space.capacity} personas</p>
          <p className="text-gray-700"><strong>Ubicación:</strong> {space.location}</p>
        </div>

        {/* Date & Time */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-3">Fecha y Hora</h3>
          <p className="text-gray-700"><strong>Fecha:</strong> {new Date(startDate).toLocaleDateString()}</p>
          <p className="text-gray-700"><strong>Inicio:</strong> {startTime}</p>
          <p className="text-gray-700"><strong>Fin:</strong> {endTime}</p>
          <p className="text-gray-700"><strong>Duración:</strong> {durationHours} horas</p>
        </div>

        {/* Applicant Info */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-3">Información del Solicitante</h3>
          <p className="text-gray-700"><strong>Nombre:</strong> {details.fullName}</p>
          <p className="text-gray-700"><strong>Correo:</strong> {details.email}</p>
          <p className="text-gray-700"><strong>Teléfono:</strong> {details.phone}</p>
          {details.department && <p className="text-gray-700"><strong>Departamento:</strong> {details.department}</p>}
          <p className="text-gray-700"><strong>Propósito:</strong> {details.purpose}</p>
        </div>

        {/* Billing Info */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-3">Información de Facturación</h3>
          <p className="text-gray-700"><strong>Nombre de Facturación:</strong> {details.billingName}</p>
          <p className="text-gray-700"><strong>ID de Facturación:</strong> {details.billingId}</p>
        </div>

        {/* Price Breakdown */}
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="text-lg font-semibold mb-3">Desglose de Precio</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tarifa por hora:</span>
              <span>${space.rate.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Duración:</span>
              <span>{durationHours} horas</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Monto Total:</span>
              <span className="text-blue-600">${totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {details.notes && (
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Notas Adicionales</h3>
            <p className="text-gray-700">{details.notes}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={onEdit}
            className="flex-1 bg-gray-400 text-white p-3 rounded font-semibold hover:bg-gray-500"
          >
            Volver a Editar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-green-600 text-white p-3 rounded font-semibold hover:bg-green-700"
          >
            Confirmar Reserva
          </button>
        </div>
      </div>
    </div>
  )
}