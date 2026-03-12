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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 udla-surface rounded-xl p-8">
        <div>
          <img src="/udla-logo.svg" alt="Logo UDLA" className="mx-auto h-16 w-16" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Datos del Solicitante</h2>
          <p className="mt-2 text-center text-sm text-slate-300">Ingrese sus datos personales para reservar un espacio</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {[
              ['nombres', 'Nombres', initialData?.nombres, 'text'],
              ['apellidos', 'Apellidos', initialData?.apellidos, 'text'],
              ['cedula', 'Cédula', initialData?.cedula, 'text'],
              ['correo', 'Correo Electrónico', initialData?.correo, 'email'],
              ['telefono', 'Teléfono', initialData?.telefono, 'tel'],
            ].map(([name, placeholder, value, type], idx) => (
              <div key={name}>
                <input
                  id={name}
                  name={name}
                  type={type}
                  required
                  className={`appearance-none relative block w-full px-3 py-2 border border-slate-600 bg-slate-900 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--udla-gold)] focus:z-10 sm:text-sm ${
                    idx === 0 ? 'rounded-t-md' : idx === 4 ? 'rounded-b-md' : ''
                  }`}
                  placeholder={placeholder}
                  defaultValue={value as string | undefined}
                />
              </div>
            ))}
          </div>

          {error && (
            <div className="rounded-md bg-red-950/50 border border-red-700 p-4">
              <div className="text-sm text-red-200">{error}</div>
            </div>
          )}

          <div>
            <button type="submit" className="udla-button-primary relative w-full py-2 px-4 text-sm font-medium rounded-md">
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
