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
    <div className="udla-surface p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Paso 2: Seleccionar Espacio y Destino del Alquiler</h2>
      
      {!showPurposeForm ? (
        <div>
          <p className="text-slate-300 mb-6">Primero, selecciona el espacio que deseas reservar:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space) => (
              <div
                key={space.id}
                onClick={() => handleSpaceClick(space.id)}
                className={`p-6 border-2 rounded cursor-pointer transition ${
                  currentSelectedSpaceId === space.id && showPurposeForm
                    ? 'border-[var(--udla-gold)] bg-[#1f2937]'
                    : 'border-slate-700 hover:border-[var(--udla-gold)]'
                }`}
              >
                <h3 className="text-lg font-semibold mb-2 text-white">{space.name}</h3>
                <p className="text-sm text-slate-400 mb-2">{space.category}</p>
                <p className="text-sm mb-2 text-slate-200">{space.description}</p>
                <p className="text-sm text-slate-400">Capacidad: {space.capacity} personas</p>
                <p className="text-lg font-bold text-[var(--udla-gold)] mt-4">${space.rate}/hora</p>
              </div>
            ))}
          </div>
        </div>
      ) : currentSelectedSpace ? (
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 p-4 bg-slate-900 border-l-4 border-[var(--udla-gold)] rounded">
            <p className="text-slate-200">
              <strong>Espacio seleccionado:</strong> {currentSelectedSpace.name}
            </p>
            <p className="text-sm text-slate-400 mt-2">{currentSelectedSpace.description}</p>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-4 text-white">
              Destino del Alquiler <span className="text-red-600">*</span>
            </label>
            <p className="text-slate-300 mb-4">Selecciona el propósito por el cual deseas alquilar este espacio:</p>
            
            <select
              value={selectedPurpose}
              onChange={(e) => setSelectedPurpose(e.target.value)}
              className="w-full p-3 border-2 border-slate-600 bg-slate-900 text-slate-100 rounded-lg mb-6 focus:border-[var(--udla-gold)] focus:outline-none text-base"
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
                    ? 'udla-button-primary'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                ✅ Confirmar Selección
              </button>
              <button
                onClick={handleCancelPurpose}
                className="flex-1 udla-button-secondary p-3 rounded font-semibold transition"
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