'use client'

interface ReservationDetailsProps {
  applicantId: string
  onSubmit: (details: ReservationDetailsData) => void
  initialData?: Partial<ReservationDetailsData>
}

export interface ReservationDetailsData {
  fullName: string
  email: string
  phone: string
  billingName: string
  billingId: string
  department: string
  purpose: string
  notes: string
}

export default function ReservationDetails({ applicantId, onSubmit, initialData }: ReservationDetailsProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const details: ReservationDetailsData = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      billingName: formData.get('billingName') as string,
      billingId: formData.get('billingId') as string,
      department: formData.get('department') as string,
      purpose: formData.get('purpose') as string,
      notes: formData.get('notes') as string,
    }
    onSubmit(details)
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Paso 4: Detalles de la Reserva</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Nombre Completo *</label>
            <input
              type="text"
              name="fullName"
              defaultValue={initialData?.fullName}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Correo Electrónico *</label>
            <input
              type="email"
              name="email"
              defaultValue={initialData?.email}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Teléfono *</label>
            <input
              type="tel"
              name="phone"
              defaultValue={initialData?.phone}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Departamento</label>
            <input
              type="text"
              name="department"
              defaultValue={initialData?.department}
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Nombre de Facturación *</label>
            <input
              type="text"
              name="billingName"
              defaultValue={initialData?.billingName}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">ID de Facturación *</label>
            <input
              type="text"
              name="billingId"
              defaultValue={initialData?.billingId}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-semibold mb-2">Propósito de la Reserva *</label>
          <input
            type="text"
            name="purpose"
            placeholder="ej. Conferencia, Clase, Capacitación"
            defaultValue={initialData?.purpose}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-semibold mb-2">Notas Adicionales</label>
          <textarea
            name="notes"
            defaultValue={initialData?.notes}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Información adicional..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700 mt-6"
        >
          Continuar al Resumen
        </button>
      </form>
    </div>
  )
}