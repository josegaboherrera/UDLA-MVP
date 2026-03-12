'use client'

export default function BookingProcess() {
  const steps = [
    { number: 1, title: 'Datos del Solicitante', description: 'Ingrese sus datos personales' },
    { number: 2, title: 'Selección de Espacio', description: 'Elija entre espacios disponibles' },
    { number: 3, title: 'Fecha y Hora', description: 'Seleccione su horario preferido' },
    { number: 4, title: 'Pago', description: 'Complete los detalles de pago' },
    { number: 5, title: 'Confirmación', description: 'Complete su reserva' },
  ]

  const handleStartBooking = () => {
    window.location.href = '/book'
  }

  return (
    <section className="bg-[#0a1224] py-20">
      <div className="container mx-auto">
        <div className="mb-10 flex items-center justify-center gap-3">
          <img src="/udla-logo.svg" alt="Logo UDLA" className="h-10 w-10" />
          <h2 className="text-3xl font-bold text-center text-white">Cómo Reservar</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step) => (
            <div
              key={step.number}
              onClick={handleStartBooking}
              className="udla-surface p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="bg-[var(--udla-gold)] text-[#111827] rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              </div>
              <p className="text-slate-300">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button onClick={handleStartBooking} className="udla-button-primary px-8 py-3 rounded-lg font-semibold transition">
            Comenzar Reserva Ahora
          </button>
        </div>
      </div>
    </section>
  )
}
