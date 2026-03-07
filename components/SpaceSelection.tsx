'use client'

import { Space } from '@/lib/mockData'
import { useState } from 'react'

interface SpaceSelectionProps {
  spaces: Space[]
  selectedSpaceId?: number
  selectedRentalPurpose?: string
  onSelect: (spaceId: number, rentalPurpose: string) => void
}

export default function SpaceSelection({ spaces, selectedSpaceId, selectedRentalPurpose, onSelect }: SpaceSelectionProps) {
  const [showPurposeForm, setShowPurposeForm] = useState(false)
  const [selectedPurpose, setSelectedPurpose] = useState<string>(selectedRentalPurpose || '')
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
    if (currentSelectedSpaceId && selectedPurpose) {
      onSelect(currentSelectedSpaceId, selectedPurpose)
      setShowPurposeForm(false)
    }
  }

  const handleCancelPurpose = () => {
    setShowPurposeForm(false)
    setSelectedPurpose('')
    setCurrentSelectedSpaceId(null)
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Paso 2: Seleccionar Espacio y Destino del Alquiler</h2>
      
      {!showPurposeForm ? (
        <div>
          <p className="text-gray-600 mb-6">Primero, selecciona el espacio que deseas reservar:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space) => (
              <div
                key={space.id}
                onClick={() => handleSpaceClick(space.id)}
                className={`p-6 border-2 rounded cursor-pointer transition ${
                  currentSelectedSpaceId === space.id && showPurposeForm
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">{space.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{space.category}</p>
                <p className="text-sm mb-2">{space.description}</p>
                <p className="text-sm text-gray-600">Capacidad: {space.capacity} personas</p>
                <p className="text-lg font-bold text-blue-600 mt-4">${space.rate}/hora</p>
              </div>
            ))}
          </div>
        </div>
      ) : currentSelectedSpace ? (
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
            <p className="text-gray-700">
              <strong>Espacio seleccionado:</strong> {currentSelectedSpace.name}
            </p>
            <p className="text-sm text-gray-600 mt-2">{currentSelectedSpace.description}</p>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-4">
              Destino del Alquiler <span className="text-red-600">*</span>
            </label>
            <p className="text-gray-600 mb-4">Selecciona el propósito por el cual deseas alquilar este espacio:</p>
            
            <select
              value={selectedPurpose}
              onChange={(e) => setSelectedPurpose(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg mb-6 focus:border-blue-600 focus:outline-none text-base"
            >
              <option value="">-- Selecciona un destino --</option>
              {currentSelectedSpace.rentalPurposes && currentSelectedSpace.rentalPurposes.map((purpose) => (
                <option key={purpose} value={purpose}>
                  {purpose}
                </option>
              ))}
            </select>

            <div className="flex gap-4">
              <button
                onClick={handleConfirmSelection}
                disabled={!selectedPurpose}
                className={`flex-1 p-3 rounded font-semibold transition ${
                  selectedPurpose
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                ✅ Confirmar Selección
              </button>
              <button
                onClick={handleCancelPurpose}
                className="flex-1 bg-gray-400 text-white p-3 rounded font-semibold hover:bg-gray-500 transition"
              >
                ❌ Cambiar Espacio
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}