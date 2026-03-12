'use client'

export default function Hero() {
  const handleStartBooking = () => {
    window.location.href = '/book'
  }

  return (
    <section className="udla-gradient text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <img src="/udla-logo.svg" alt="Logo UDLA" className="mx-auto mb-6 h-20 w-20" />
        <p className="mb-2 text-sm uppercase tracking-[0.25em] text-blue-100">Campus UDLA</p>
        <h1 className="text-4xl font-bold mb-4">Reserva de Espacios Universitarios</h1>
        <p className="text-xl mb-8 text-blue-100">
          Solicite auditorios, canchas deportivas, aulas y más con una experiencia visual alineada a la marca UDLA.
        </p>
        <button onClick={handleStartBooking} className="udla-button-primary rounded-lg px-8 py-3 font-semibold transition">
          Comenzar Reserva
        </button>
      </div>
    </section>
  )
}
