'use client'

export default function Hero() {
  const handleStartBooking = () => {
    window.location.href = '/book'
  }

  return (
    <section className="udla-gradient text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.25em] text-blue-100">Campus UDLA</p>
        <h1 className="text-4xl font-bold mb-4">Reserva de Espacios Universitarios</h1>
        <p className="text-xl mb-8 text-blue-100">
          Solicite auditorios, canchas deportivas, aulas y más con una experiencia visual alineada a la marca UDLA.
        </p>
        <button
          onClick={handleStartBooking}
          className="rounded-lg border-2 border-[var(--udla-gold)] bg-[var(--udla-gold)] px-8 py-3 font-semibold text-[var(--udla-blue)] transition hover:bg-[#dab663]"
        >
          Comenzar Reserva
        </button>
      </div>
    </section>
  )
}
