'use client'

import { useState, useMemo } from 'react'

interface DateTimeSelectionProps {
  onSelect: (startDate: string, startTime: string, endTime: string) => void
  selected?: { startDate: string; startTime: string; endTime: string }
}

// Generate time slots in 15-minute intervals
const generateTimeSlots = () => {
  const slots: string[] = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      slots.push(timeString)
    }
  }
  return slots
}

const TIME_SLOTS = generateTimeSlots()

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

  // Get current time rounded up to next 15-minute interval
  const getCurrentTimeRounded = () => {
    const now = new Date()
    const minutes = now.getMinutes()
    const roundedMinutes = Math.ceil(minutes / 15) * 15
    
    if (roundedMinutes === 60) {
      now.setHours(now.getHours() + 1)
      now.setMinutes(0)
    } else {
      now.setMinutes(roundedMinutes)
    }
    
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  }

  // Check if selected date is today
  const isToday = selectedDate === today

  // Filter available start times based on date
  const availableStartTimes = useMemo(() => {
    if (!isToday) return TIME_SLOTS
    const currentTimeRounded = getCurrentTimeRounded()
    return TIME_SLOTS.filter(time => time >= currentTimeRounded)
  }, [isToday, selectedDate])

  // Filter available end times (must be after start time)
  const availableEndTimes = useMemo(() => {
    if (!selectedStartTime) return TIME_SLOTS
    return TIME_SLOTS.filter(time => time > selectedStartTime)
  }, [selectedStartTime])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    // Validate date is not in the past
    if (selectedDate < today) {
      setError('No puedes seleccionar una fecha pasada.')
      return
    }

    // Validate end time is after start time
    if (selectedEndTime <= selectedStartTime) {
      setError('La hora de fin debe ser posterior a la hora de inicio.')
      return
    }

    onSelect(selectedDate, selectedStartTime, selectedEndTime)
  }

  // Reset end time if start time changes and end time is invalid
  const handleStartTimeChange = (newStartTime: string) => {
    setSelectedStartTime(newStartTime)
    if (selectedEndTime && selectedEndTime <= newStartTime) {
      setSelectedEndTime('')
    }
    setError('')
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
              setSelectedStartTime('')
              setSelectedEndTime('')
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
            <select
              name="startTime"
              value={selectedStartTime}
              onChange={(e) => handleStartTimeChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-udla-red focus:ring-2 focus:ring-udla-red/20 focus:outline-none transition"
              required
              disabled={!selectedDate}
            >
              <option value="">Seleccionar</option>
              {availableStartTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {!selectedDate && (
              <p className="text-xs text-udla-gray mt-1">Primero selecciona una fecha</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-udla-gray-dark">Hora de Fin</label>
            <select
              name="endTime"
              value={selectedEndTime}
              onChange={(e) => {
                setSelectedEndTime(e.target.value)
                setError('')
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-udla-red focus:ring-2 focus:ring-udla-red/20 focus:outline-none transition"
              required
              disabled={!selectedStartTime}
            >
              <option value="">Seleccionar</option>
              {availableEndTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {!selectedStartTime && selectedDate && (
              <p className="text-xs text-udla-gray mt-1">Primero selecciona hora de inicio</p>
            )}
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
