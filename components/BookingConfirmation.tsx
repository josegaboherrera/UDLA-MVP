'use client'

interface ConfirmationProps {
  reservationNumber: string
  spaceName: string
  applicantName: string
  applicantEmail: string
  startDate: string
  startTime: string
  endTime: string
  totalAmount: string
  rentalPurpose?: string
  emailStatus: 'idle' | 'sending' | 'sent' | 'error'
  emailError?: string
}

export default function BookingConfirmation({
  reservationNumber,
  spaceName,
  applicantName,
  applicantEmail,
  startDate,
  startTime,
  endTime,
  totalAmount,
  rentalPurpose,
  emailStatus,
  emailError,
}: ConfirmationProps) {
  const getEmailMessage = () => {
    if (emailStatus === 'sending') {
      return 'Enviando correo de confirmación...'
    }

    if (emailStatus === 'sent') {
      return `Se ha enviado un correo de confirmación a ${applicantEmail}.`
    }

    if (emailStatus === 'error') {
      return `No se pudo enviar el correo de confirmación: ${emailError || 'Error desconocido.'}`
    }

    return 'Preparando el envío del correo de confirmación.'
  }

  return (
    <div className="udla-surface p-8 rounded-lg shadow-lg max-w-2xl mx-auto text-center">
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

      <p className="text-slate-300 mb-6">Tu reserva ha sido registrada exitosamente.</p>

      <div className="bg-slate-900 p-6 rounded mb-6 border border-slate-700">
        <h3 className="text-lg font-semibold mb-4">Detalles de la Reserva</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-300">Número de Reserva:</span>
            <span className="font-bold text-[var(--udla-gold)]">{reservationNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-300">Solicitante:</span>
            <span>{applicantName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-300">Espacio:</span>
            <span>{spaceName}</span>
          </div>
          {rentalPurpose && (
            <div className="flex justify-between">
              <span className="text-slate-300">Destino del Alquiler:</span>
              <span>{rentalPurpose}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-slate-300">Fecha:</span>
            <span>{new Date(startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-300">Hora:</span>
            <span>{startTime} - {endTime}</span>
          </div>
          <div className="border-t pt-3 flex justify-between font-bold">
            <span>Monto Total:</span>
            <span className="text-[var(--udla-gold)]">${totalAmount}</span>
          </div>
        </div>
      </div>

      <p className={`text-sm mb-8 ${emailStatus === 'error' ? 'text-red-600' : 'text-slate-300'}`}>
        {getEmailMessage()}
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => window.location.href = '/'}
          className="flex-1 udla-button-primary p-3 rounded font-semibold"
        >
          Volver a Inicio
        </button>
        <button
          onClick={() => window.location.href = '/book'}
          className="flex-1 udla-button-secondary p-3 rounded font-semibold"
        >
          Hacer Otra Reserva
        </button>
      </div>
    </div>
  )
}
