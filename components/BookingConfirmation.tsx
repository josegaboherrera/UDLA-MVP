'use client'

interface ConfirmationProps {
  reservationNumber: string
  spaceName: string
  applicantName: string
  startDate: string
  startTime: string
  endTime: string
  totalAmount: string
  rentalPurpose?: string
}

export default function BookingConfirmation({
  reservationNumber,
  spaceName,
  applicantName,
  startDate,
  startTime,
  endTime,
  totalAmount,
  rentalPurpose,
}: ConfirmationProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto text-center">
      <div className="mb-6">
        <div className="inline-block bg-green-100 p-4 rounded-full mb-4">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-green-600">¡Reserva Confirmada!</h2>
      </div>

      <p className="text-gray-600 mb-6">Tu reserva ha sido registrada exitosamente.</p>

      <div className="bg-gray-50 p-6 rounded mb-6">
        <h3 className="text-lg font-semibold mb-4">Detalles de la Reserva</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Número de Reserva:</span>
            <span className="font-bold text-blue-600">{reservationNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Solicitante:</span>
            <span>{applicantName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Espacio:</span>
            <span>{spaceName}</span>
          </div>
          {rentalPurpose && (
            <div className="flex justify-between">
              <span className="text-gray-600">Destino del Alquiler:</span>
              <span>{rentalPurpose}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Fecha:</span>
            <span>{new Date(startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Hora:</span>
            <span>{startTime} - {endTime}</span>
          </div>
          <div className="border-t pt-3 flex justify-between font-bold">
            <span>Monto Total:</span>
            <span className="text-blue-600">${totalAmount}</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-8">
        Se ha enviado un correo de confirmación a tu dirección de correo registrada.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => window.location.href = '/'}
          className="flex-1 bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700"
        >
          Volver a Inicio
        </button>
        <button
          onClick={() => window.location.href = '/book'}
          className="flex-1 bg-gray-300 text-gray-700 p-3 rounded font-semibold hover:bg-gray-400"
        >
          Hacer Otra Reserva
        </button>
      </div>
    </div>
  )
}