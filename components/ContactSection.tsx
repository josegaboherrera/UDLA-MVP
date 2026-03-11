export default function ContactSection() {
  return (
    <>
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-udla-black">Contáctenos</h2>
          <p className="text-center text-udla-gray mb-10 max-w-2xl mx-auto">
            Estamos aquí para ayudarte con tu reserva
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-udla-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-udla-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-udla-black mb-2">Email</h3>
              <p className="text-udla-gray">reservas@udla.edu.ec</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-udla-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-udla-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-udla-black mb-2">Teléfono</h3>
              <p className="text-udla-gray">(02) 397-1000</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-udla-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-udla-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-udla-black mb-2">Dirección</h3>
              <p className="text-udla-gray">Av. de los Granados E12-41 y Colimes</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-udla-black text-white py-10 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 100 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="30" fill="white" fontSize="28" fontWeight="bold" fontFamily="Arial, sans-serif">UDLA</text>
              </svg>
              <span className="text-white/60 text-sm">Universidad de Las Américas</span>
            </div>
            <div className="text-white/60 text-sm text-center">
              © {new Date().getFullYear()} UDLA. Todos los derechos reservados.
            </div>
            <div className="flex items-center gap-4">
              <a href="https://www.udla.edu.ec" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white text-sm transition">
                www.udla.edu.ec
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
