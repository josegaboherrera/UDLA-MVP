import { mockApplicants } from '@/lib/mockData'

'use client'

interface IDValidationProps {
  onValidate: (applicantId: string) => void
  error?: string
}

export default function IDValidation({ onValidate, error }: IDValidationProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const id = formData.get('id') as string
    onValidate(id)
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Paso 1: Validar Tu ID</h2>
      <p className="text-gray-600 mb-6">Ingresa tu número de identificación para continuar con la reserva.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Número de Identificación</label>
          <input
            type="text"
            name="id"
            placeholder="Ingresa tu ID de 6 dígitos"
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700"
        >
          Validar y Continuar
        </button>
      </form>
      <p className="text-xs text-gray-500 mt-4">IDs de Demo: 123456, 789012</p>
    </div>
  )
}