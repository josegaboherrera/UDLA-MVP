'use client'

import { Space } from '@/lib/mockData'
import { useState } from 'react'

interface SpaceSelectionProps {
  spaces: Space[]
  selectedSpaceId?: number
  selectedRentalPurpose?: string
  selectedEventName?: string
  onSelect: (spaceId: number, rentalPurpose: string, eventName: string) => void
}

export default function SpaceSelection({ spaces, selectedSpaceId, selectedRentalPurpose, selectedEventName, onSelect }: SpaceSelectionProps) {
  const [showPurposeForm, setShowPurposeForm] = useState(false)
  const [selectedPurpose, setSelectedPurpose] = useState<string>(selectedRentalPurpose || '')
  const [eventName, setEventName] = useState<string>(selectedEventName || '')
  const [currentSelectedSpaceId, setCurrentSelectedSpaceId] = useState<number | null>(null)
  
  const currentSelectedSpace = currentSelectedSpaceId ? spaces.find(s => s.id === currentSelectedSpaceId) : null

  const handleSpaceClick = (spaceId: number) => {
    const space = spaces.find(s => s.id === spaceId)
    if (space && space.rentalPurposes && space.rentalPurposes.length > 0) {
      setCurrentSelectedSpaceId(spaceId)
      setShowPurposeForm(true)
      setSelectedPurpose('')
    }
  }

  const handleConfirmSelection = () => {
    if (currentSelectedSpaceId && selectedPurpose && eventName.trim()) {
      onSelect(currentSelectedSpaceId, selectedPurpose, eventName.trim())
      setShowPurposeForm(false)
    }
  }

  const handleCancelPurpose = () => {
    setShowPurposeForm(false)
    setSelectedPurpose('')
    setEventName('')
    setCurrentSelectedSpaceId(null)
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-udla-black">Paso 2: Seleccionar Espacio y Destino del Alquiler</h2>
      
      {!showPurposeForm ? (
        <div>
          <p className="text-udla-gray mb-6">Primero, selecciona el espacio que deseas reservar:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space) => (
              <div
                key={space.id}
                onClick={() => handleSpaceClick(space.id)}
                className={`p-6 border-2 rounded-lg cursor-pointer transition hover:shadow-md ${
                  currentSelectedSpaceId === space.id && showPurposeForm
                    ? 'border-udla-red bg-red-50'
                    : 'border-gray-200 hover:border-udla-red'
                }`}
              >
                <h3 className="text-lg font-semibold mb-2 text-udla-black">{space.name}</h3>
                <p className="text-sm text-udla-red font-medium mb-2">{space.category}</p>
                <p className="text-sm mb-2 text-udla-gray-dark">{space.description}</p>
                <p className="text-sm text-udla-gray">Capacidad: {space.capacity} personas</p>
                <p className="text-lg font-bold text-udla-red mt-4">${space.rate}/hora</p>
              </div>
            ))}
          </div>
        </div>
      ) : currentSelectedSpace ? (
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-udla-red rounded-lg">
            <p className="text-udla-black">
              <strong>Espacio seleccionado:</strong> {currentSelectedSpace.name}
            </p>
            <p className="text-sm text-udla-gray mt-2">{currentSelectedSpace.description}</p>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-4 text-udla-black">
              Destino del Alquiler <span className="text-udla-red">*</span>
            </label>
            <p className="text-udla-gray mb-4">Selecciona el propósito por el cual deseas alquilar este espacio:</p>
            
            <select
              value={selectedPurpose}
              onChange={(e) => setSelectedPurpose(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg mb-6 focus:border-udla-red focus:ring-2 focus:ring-udla-red/20 focus:outline-none text-base"
            >
              <option value="">-- Selecciona un destino --</option>
              {currentSelectedSpace.rentalPurposes && currentSelectedSpace.rentalPurposes.map((purpose) => (
                <option key={purpose} value={purpose}>
                  {purpose}
                </option>
              ))}
            </select>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-4 text-udla-black">
                Nombre del Evento <span className="text-udla-red">*</span>
              </label>
              <p className="text-udla-gray mb-4">Ingresa el nombre del evento que realizarás:</p>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Ej: Conferencia de Tecnología 2026"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-udla-red focus:ring-2 focus:ring-udla-red/20 focus:outline-none text-base"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleConfirmSelection}
                disabled={!selectedPurpose || !eventName.trim()}
                className={`flex-1 p-3 rounded-lg font-semibold transition ${
                  selectedPurpose && eventName.trim()
                    ? 'bg-udla-red text-white hover:bg-udla-red-dark shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Confirmar Selección
              </button>
              <button
                onClick={handleCancelPurpose}
                className="flex-1 bg-udla-gray text-white p-3 rounded-lg font-semibold hover:bg-udla-gray-dark transition"
              >
                Cambiar Espacio
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
