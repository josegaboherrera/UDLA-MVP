'use client'

export default function BookingProcess() {
  const steps = [
    { number: 1, title: 'Datos del Solicitante', description: 'Ingrese sus datos de identificación y facturación' },
    { number: 2, title: 'Selección de Espacio', description: 'Elija entre espacios disponibles' },
    { number: 3, title: 'Fecha y Hora', description: 'Seleccione su horario preferido' },
    { number: 4, title: 'Pago', description: 'Complete los detalles de pago' },
    { number: 5, title: 'Confirmación', description: 'Complete su reserva' },
  ]

  const handleStartBooking = () => {
    window.location.href = '/book'
  }

  return (
    <section className="bg-udla-gray-light py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-udla-black">Cómo Reservar</h2>
        <p className="text-center text-udla-gray mb-12 max-w-2xl mx-auto">
          Sigue estos sencillos pasos para reservar el espacio que necesitas
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step) => (
            <div
              key={step.number}
              onClick={handleStartBooking}
              className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition transform hover:scale-105 border-t-4 border-udla-red"
            >
              <div className="flex items-center mb-4">
                <div className="bg-udla-red text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-udla-black">{step.title}</h3>
              </div>
              <p className="text-udla-gray">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={handleStartBooking}
            className="bg-udla-red text-white px-10 py-4 rounded-lg font-semibold hover:bg-udla-red-dark transition shadow-lg"
          >
            Comenzar Reserva Ahora
          </button>
        </div>
      </div>
    </section>
  )
}
