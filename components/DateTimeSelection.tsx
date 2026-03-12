'use client'

interface DateTimeSelectionProps {
  onSelect: (startDate: string, startTime: string, endTime: string) => void
  selected?: { startDate: string; startTime: string; endTime: string }
}

export default function DateTimeSelection({ onSelect, selected }: DateTimeSelectionProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const startDate = formData.get('date') as string
    const startTime = formData.get('startTime') as string
    const endTime = formData.get('endTime') as string
    onSelect(startDate, startTime, endTime)
  }

  return (
    <div className="udla-surface p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Paso 3: Seleccionar Fecha y Hora</h2>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Fecha</label>
          <input
            type="date"
            name="date"
            defaultValue={selected?.startDate}
            className="w-full p-3 border border-slate-600 bg-slate-900 text-slate-100 rounded"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Hora de Inicio</label>
            <input
              type="time"
              name="startTime"
              defaultValue={selected?.startTime}
              className="w-full p-3 border border-slate-600 bg-slate-900 text-slate-100 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Hora de Fin</label>
            <input
              type="time"
              name="endTime"
              defaultValue={selected?.endTime}
              className="w-full p-3 border border-slate-600 bg-slate-900 text-slate-100 rounded"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full udla-button-primary p-3 rounded font-semibold"
        >
          Confirmar y Continuar
        </button>
      </form>
    </div>
  )
}