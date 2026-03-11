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
  eventName?: string
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
  eventName,
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

      <p className="text-udla-gray mb-6">Tu reserva ha sido registrada exitosamente.</p>

      <div className="bg-udla-gray-light p-6 rounded-lg mb-6 text-left">
        <h3 className="text-lg font-semibold mb-4 text-udla-black">Detalles de la Reserva</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-udla-gray">Número de Reserva:</span>
            <span className="font-bold text-udla-red">{reservationNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-udla-gray">Solicitante:</span>
            <span className="text-udla-black">{applicantName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-udla-gray">Espacio:</span>
            <span className="text-udla-black">{spaceName}</span>
          </div>
          {rentalPurpose && (
            <div className="flex justify-between">
              <span className="text-udla-gray">Destino del Alquiler:</span>
              <span className="text-udla-black">{rentalPurpose}</span>
            </div>
          )}
          {eventName && (
            <div className="flex justify-between">
              <span className="text-udla-gray">Nombre del Evento:</span>
              <span className="text-udla-black">{eventName}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-udla-gray">Fecha:</span>
            <span className="text-udla-black">{new Date(startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-udla-gray">Hora:</span>
            <span className="text-udla-black">{startTime} - {endTime}</span>
          </div>
          <div className="border-t border-gray-300 pt-3 flex justify-between font-bold">
            <span className="text-udla-black">Monto Total:</span>
            <span className="text-udla-red">${totalAmount}</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-udla-gray mb-8">
        Se ha enviado un correo de confirmación a tu dirección de correo registrada.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => window.location.href = '/'}
          className="flex-1 bg-udla-red text-white p-3 rounded-lg font-semibold hover:bg-udla-red-dark transition shadow-lg"
        >
          Volver a Inicio
        </button>
        <button
          onClick={() => window.location.href = '/book'}
          className="flex-1 bg-udla-gray text-white p-3 rounded-lg font-semibold hover:bg-udla-gray-dark transition"
        >
          Hacer Otra Reserva
        </button>
      </div>
    </div>
  )
}
