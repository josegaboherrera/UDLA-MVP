export default function SpaceCategories() {
  const categories = [
    {
      name: 'Auditorios',
      description: 'Espacios amplios para conferencias y eventos con equipos AV profesionales',
      icon: '🎭',
    },
    {
      name: 'Canchas Deportivas',
      description: 'Gimnasios y canchas al aire libre para actividades deportivas',
      icon: '🏀',
    },
    {
      name: 'Aulas',
      description: 'Espacios educativos y de reuniones para capacitación y discusiones',
      icon: '📚',
    },
    {
      name: 'Otras Instalaciones',
      description: 'Laboratorios, bibliotecas, estudios y espacios especializados',
      icon: '🔬',
    },
  ]

  return (
    <section className="py-20 bg-[#070d1a]">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Categorías de Espacios Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div key={cat.name} className="udla-surface p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
              <div className="text-4xl mb-4">{cat.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{cat.name}</h3>
              <p className="text-slate-300">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
