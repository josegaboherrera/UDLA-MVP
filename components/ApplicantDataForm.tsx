'use client'

interface ApplicantData {
  nombresCompletos: string
  cedulaRuc: string
  correo: string
  telefono: string
}

interface ApplicantDataFormProps {
  onSubmit: (data: ApplicantData) => void
  initialData?: ApplicantData
  error?: string
}

export default function ApplicantDataForm({ onSubmit, initialData, error }: ApplicantDataFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: ApplicantData = {
      nombresCompletos: formData.get('nombresCompletos') as string,
      cedulaRuc: formData.get('cedulaRuc') as string,
      correo: formData.get('correo') as string,
      telefono: formData.get('telefono') as string,
    }
    onSubmit(data)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-udla-black">
          Datos del Solicitante
        </h2>
        <p className="mt-2 text-sm text-udla-gray">
          Ingrese sus datos de identificación y facturación para reservar un espacio
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="nombresCompletos" className="block text-sm font-medium text-udla-gray-dark mb-1">
              Nombres Completos o Razón Social
            </label>
            <input
              id="nombresCompletos"
              name="nombresCompletos"
              type="text"
              required
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-udla-black rounded-lg focus:outline-none focus:ring-2 focus:ring-udla-red focus:border-udla-red transition"
              placeholder="Ingrese su nombre completo"
              defaultValue={initialData?.nombresCompletos}
            />
          </div>
          <div>
            <label htmlFor="cedulaRuc" className="block text-sm font-medium text-udla-gray-dark mb-1">
              Cédula o RUC
            </label>
            <input
              id="cedulaRuc"
              name="cedulaRuc"
              type="text"
              required
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-udla-black rounded-lg focus:outline-none focus:ring-2 focus:ring-udla-red focus:border-udla-red transition"
              placeholder="Ingrese su cédula o RUC"
              defaultValue={initialData?.cedulaRuc}
            />
          </div>
          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-udla-gray-dark mb-1">
              Correo Electrónico
            </label>
            <input
              id="correo"
              name="correo"
              type="email"
              required
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-udla-black rounded-lg focus:outline-none focus:ring-2 focus:ring-udla-red focus:border-udla-red transition"
              placeholder="correo@ejemplo.com"
              defaultValue={initialData?.correo}
            />
          </div>
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-udla-gray-dark mb-1">
              Teléfono
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              required
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-udla-black rounded-lg focus:outline-none focus:ring-2 focus:ring-udla-red focus:border-udla-red transition"
              placeholder="09XXXXXXXX"
              defaultValue={initialData?.telefono}
            />
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-udla-red hover:bg-udla-red-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-udla-red transition shadow-lg"
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  )
}
