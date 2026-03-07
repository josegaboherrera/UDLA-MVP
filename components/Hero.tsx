'use client'

export default function Hero() {
  const handleStartBooking = () => {
    window.location.href = '/book'
  }

  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Reservar un Espacio Universitario</h1>
        <p className="text-xl mb-8">Reserve auditorios, canchas deportivas, aulas y más para sus eventos.</p>
        <button
          onClick={handleStartBooking}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Comenzar Reserva
        </button>
      </div>
    </section>
  )
}