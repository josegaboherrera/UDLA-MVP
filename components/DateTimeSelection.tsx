'use client'

import { useState, useMemo } from 'react'

interface DateTimeSelectionProps {
  onSelect: (startDate: string, startTime: string, endTime: string) => void
  selected?: { startDate: string; startTime: string; endTime: string }
}

export default function DateTimeSelection({ onSelect, selected }: DateTimeSelectionProps) {
  const [selectedDate, setSelectedDate] = useState(selected?.startDate || '')
  const [selectedStartTime, setSelectedStartTime] = useState(selected?.startTime || '')
  const [selectedEndTime, setSelectedEndTime] = useState(selected?.endTime || '')
  const [error, setError] = useState('')

  // Get today's date in YYYY-MM-DD format
  const today = useMemo(() => {
    const now = new Date()
    return now.toISOString().split('T')[0]
  }, [])

  // Get current time in HH:MM format
  const getCurrentTime = () => {
    const now = new Date()
    return now.toTimeString().slice(0, 5)
  }

  // Check if selected date is today
  const isToday = selectedDate === today

  // Get minimum start time (if today, use current time, otherwise 00:00)
  const minStartTime = isToday ? getCurrentTime() : '00:00'

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    // Validate date is not in the past
    if (selectedDate < today) {
      setError('No puedes seleccionar una fecha pasada.')
      return
    }

    // Validate times if today
    if (isToday) {
      const currentTime = getCurrentTime()
      if (selectedStartTime < currentTime) {
        setError('La hora de inicio no puede ser anterior a la hora actual.')
        return
      }
    }

    // Validate end time is after start time
    if (selectedEndTime <= selectedStartTime) {
      setError('La hora de fin debe ser posterior a la hora de inicio.')
      return
    }

    onSelect(selectedDate, selectedStartTime, selectedEndTime)
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-udla-black">Paso 3: Seleccionar Fecha y Hora</h2>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-udla-gray-dark">Fecha</label>
          <input
            type="date"
            name="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value)
              setError('')
            }}
            min={today}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-udla-red focus:ring-2 focus:ring-udla-red/20 focus:outline-none transition"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-udla-gray-dark">Hora de Inicio</label>
            <input
              type="time"
              name="startTime"
              value={selectedStartTime}
              onChange={(e) => {
                setSelectedStartTime(e.target.value)
                setError('')
              }}
              min={minStartTime}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-udla-red focus:ring-2 focus:ring-udla-red/20 focus:outline-none transition"
              required
            />
            {isToday && (
              <p className="text-xs text-udla-gray mt-1">Hora minima: {minStartTime}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-udla-gray-dark">Hora de Fin</label>
            <input
              type="time"
              name="endTime"
              value={selectedEndTime}
              onChange={(e) => {
                setSelectedEndTime(e.target.value)
                setError('')
              }}
              min={selectedStartTime || minStartTime}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-udla-red focus:ring-2 focus:ring-udla-red/20 focus:outline-none transition"
              required
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-udla-red text-white p-3 rounded-lg font-semibold hover:bg-udla-red-dark transition shadow-lg"
        >
          Confirmar y Continuar
        </button>
      </form>
    </div>
  )
}
