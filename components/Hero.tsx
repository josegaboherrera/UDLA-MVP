'use client'

export default function Hero() {
  const handleStartBooking = () => {
    window.location.href = '/book'
  }

  return (
    <section className="bg-udla-red text-white">
      {/* Header with logo */}
      <header className="bg-udla-black py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 100 40" className="h-10 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="30" fill="white" fontSize="28" fontWeight="bold" fontFamily="Arial, sans-serif">UDLA</text>
            </svg>
            <div className="hidden sm:block border-l border-white/30 pl-3">
              <span className="text-white/80 text-sm">Reserva de Espacios</span>
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <a href="/" className="text-white/80 hover:text-white text-sm transition">Inicio</a>
            <a href="/book" className="text-white/80 hover:text-white text-sm transition">Reservar</a>
            <a href="/admin" className="text-white/80 hover:text-white text-sm transition">Admin</a>
          </nav>
        </div>
      </header>

      {/* Hero content */}
      <div className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Reserva de Espacios Universitarios
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto text-pretty">
            Reserve auditorios, canchas deportivas, aulas y más para sus eventos académicos y corporativos.
          </p>
          <button
            onClick={handleStartBooking}
            className="bg-white text-udla-red px-10 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg shadow-lg hover:shadow-xl"
          >
            Comenzar Reserva
          </button>
        </div>
      </div>
    </section>
  )
}
