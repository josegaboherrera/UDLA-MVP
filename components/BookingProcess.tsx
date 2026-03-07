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
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Cómo Reservar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step) => (
            <div
              key={step.number}
              onClick={handleStartBooking}
              className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
              </div>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={handleStartBooking}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Comenzar Reserva Ahora
          </button>
        </div>
      </div>
    </section>
  )
}