'use client'

interface ApplicantData {
  nombres: string
  apellidos: string
  cedula: string
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
      nombres: formData.get('nombres') as string,
      apellidos: formData.get('apellidos') as string,
      cedula: formData.get('cedula') as string,
      correo: formData.get('correo') as string,
      telefono: formData.get('telefono') as string,
    }
    onSubmit(data)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Datos del Solicitante
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ingrese sus datos personales para reservar un espacio
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="nombres" className="sr-only">
                Nombres
              </label>
              <input
                id="nombres"
                name="nombres"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Nombres"
                defaultValue={initialData?.nombres}
              />
            </div>
            <div>
              <label htmlFor="apellidos" className="sr-only">
                Apellidos
              </label>
              <input
                id="apellidos"
                name="apellidos"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Apellidos"
                defaultValue={initialData?.apellidos}
              />
            </div>
            <div>
              <label htmlFor="cedula" className="sr-only">
                Cédula
              </label>
              <input
                id="cedula"
                name="cedula"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Cédula"
                defaultValue={initialData?.cedula}
              />
            </div>
            <div>
              <label htmlFor="correo" className="sr-only">
                Correo Electrónico
              </label>
              <input
                id="correo"
                name="correo"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Correo Electrónico"
                defaultValue={initialData?.correo}
              />
            </div>
            <div>
              <label htmlFor="telefono" className="sr-only">
                Teléfono
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Teléfono"
                defaultValue={initialData?.telefono}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}