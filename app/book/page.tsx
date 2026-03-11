'use client'

import { useState } from 'react'
import { mockSpaces, mockApplicants } from '@/lib/mockData'
import ApplicantDataForm from '@/components/ApplicantDataForm'
import SpaceSelection from '@/components/SpaceSelection'
import DateTimeSelection from '@/components/DateTimeSelection'
import Payment from '@/components/Payment'
import BookingConfirmation from '@/components/BookingConfirmation'

interface PricingRule {
  id: number
  name: string
  spaceId: number
  baseRate: number
  peakRate: number
  bulkDiscount: number
  minHours: number
}

const pricingRules: PricingRule[] = [
  {
    id: 1,
    name: 'Auditorium A',
    spaceId: 1,
    baseRate: 150,
    peakRate: 200,
    bulkDiscount: 10,
    minHours: 4,
  },
  {
    id: 2,
    name: 'Gym Court 1',
    spaceId: 2,
    baseRate: 75,
    peakRate: 100,
    bulkDiscount: 5,
    minHours: 2,
  },
  {
    id: 3,
    name: 'Classroom 101',
    spaceId: 3,
    baseRate: 50,
    peakRate: 70,
    bulkDiscount: 5,
    minHours: 2,
  },
  {
    id: 4,
    name: 'Auditorium B',
    spaceId: 4,
    baseRate: 120,
    peakRate: 160,
    bulkDiscount: 10,
    minHours: 4,
  },
  {
    id: 5,
    name: 'Tennis Court',
    spaceId: 5,
    baseRate: 60,
    peakRate: 80,
    bulkDiscount: 15,
    minHours: 2,
  },
  {
    id: 6,
    name: 'Meeting Room 201',
    spaceId: 6,
    baseRate: 30,
    peakRate: 40,
    bulkDiscount: 5,
    minHours: 2,
  },
]

type BookingStep = 'applicant-data' | 'space-selection' | 'date-time' | 'payment' | 'confirmation'

interface ApplicantData {
  nombresCompletos: string
  cedulaRuc: string
  correo: string
  telefono: string
}

interface PaymentData {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardHolderName: string
}

export default function BookPage() {
  const [currentStep, setCurrentStep] = useState<BookingStep>('applicant-data')
  const [applicantData, setApplicantData] = useState<ApplicantData>()
  const [selectedSpaceId, setSelectedSpaceId] = useState<number>()
  const [selectedRentalPurpose, setSelectedRentalPurpose] = useState<string>('')
  const [selectedEventName, setSelectedEventName] = useState<string>('')
  const [selectedDateTime, setSelectedDateTime] = useState<{ startDate: string; startTime: string; endTime: string }>({
    startDate: '',
    startTime: '',
    endTime: '',
  })
  const [paymentData, setPaymentData] = useState<PaymentData>()
  const [reservationNumber, setReservationNumber] = useState<string>('')
  const [validationError, setValidationError] = useState<string>('')

  const handleApplicantDataSubmit = (data: ApplicantData) => {
    // Validate that the cédula matches an authorized applicant
    const authorizedApplicant = mockApplicants.find(applicant => applicant.id === data.cedulaRuc)
    
    if (!authorizedApplicant) {
      setValidationError('Cédula o RUC no autorizado. Por favor contacte al administrador.')
      return
    }
    
    setApplicantData(data)
    setValidationError('')
    setCurrentStep('space-selection')
  }

  const handleSpaceSelect = (spaceId: number, rentalPurpose: string, eventName: string) => {
    setSelectedSpaceId(spaceId)
    setSelectedRentalPurpose(rentalPurpose)
    setSelectedEventName(eventName)
    setCurrentStep('date-time')
  }

  const handleDateTimeSelect = (startDate: string, startTime: string, endTime: string) => {
    setSelectedDateTime({ startDate, startTime, endTime })
    setCurrentStep('payment')
  }

  const handlePaymentSubmit = (data: PaymentData) => {
    setPaymentData(data)
    // Generate a reservation number
    const resNumber = `RES-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`
    setReservationNumber(resNumber)
    setCurrentStep('confirmation')
  }

  const selectedSpace = mockSpaces.find((s) => s.id === selectedSpaceId)
  const pricingRule = selectedSpaceId ? pricingRules.find(r => r.spaceId === selectedSpaceId) : null
  const durationHours = selectedSpace && selectedDateTime.startDate && selectedDateTime.startTime && selectedDateTime.endTime
    ? (new Date(`${selectedDateTime.startDate}T${selectedDateTime.endTime}`).getTime() -
       new Date(`${selectedDateTime.startDate}T${selectedDateTime.startTime}`).getTime()) / (1000 * 60 * 60)
    : 0
  const baseAmount = pricingRule ? durationHours * pricingRule.baseRate : 0
  const discount = pricingRule && durationHours >= pricingRule.minHours ? (baseAmount * pricingRule.bulkDiscount / 100) : 0
  const totalAmount = baseAmount - discount

  return (
    <div className="bg-udla-gray-light min-h-screen">
      {/* Header */}
      <header className="bg-udla-black py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <svg viewBox="0 0 100 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="30" fill="white" fontSize="28" fontWeight="bold" fontFamily="Arial, sans-serif">UDLA</text>
            </svg>
            <div className="hidden sm:block border-l border-white/30 pl-3">
              <span className="text-white/80 text-sm">Reserva de Espacios</span>
            </div>
          </a>
          <nav className="flex items-center gap-6">
            <a href="/" className="text-white/80 hover:text-white text-sm transition">Inicio</a>
            <a href="/admin" className="text-white/80 hover:text-white text-sm transition">Admin</a>
          </nav>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl py-10 px-4">
        {/* Progress Indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            {[
              { step: 'applicant-data', label: 'Datos' },
              { step: 'space-selection', label: 'Espacio' },
              { step: 'date-time', label: 'Fecha/Hora' },
              { step: 'payment', label: 'Pago' },
              { step: 'confirmation', label: 'Confirmación' },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep === item.step
                      ? 'bg-udla-red text-white'
                      : ['applicant-data', 'space-selection', 'date-time', 'payment', 'confirmation'].indexOf(
                          currentStep
                        ) > ['applicant-data', 'space-selection', 'date-time', 'payment', 'confirmation'].indexOf(item.step)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 text-udla-gray-dark'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-xs ml-2 text-udla-gray-dark">{item.label}</span>
                {index < 4 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      ['applicant-data', 'space-selection', 'date-time', 'payment', 'confirmation'].indexOf(currentStep) >
                      ['applicant-data', 'space-selection', 'date-time', 'payment', 'confirmation'].indexOf(item.step)
                        ? 'bg-green-600'
                        : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 'applicant-data' && (
          <ApplicantDataForm onSubmit={handleApplicantDataSubmit} initialData={applicantData} error={validationError} />
        )}

        {currentStep === 'space-selection' && applicantData && (
          <div>
            <div className="mb-6 text-center">
              <p className="text-gray-600">
                ¡Bienvenido, <strong>{applicantData.nombresCompletos}</strong>! Por favor selecciona un espacio para reservar.
              </p>
            </div>
            <SpaceSelection spaces={mockSpaces} selectedSpaceId={selectedSpaceId} selectedRentalPurpose={selectedRentalPurpose} selectedEventName={selectedEventName} onSelect={handleSpaceSelect} />
            <button
              onClick={() => setCurrentStep('applicant-data')}
              className="mt-6 mx-auto block bg-udla-gray text-white px-6 py-2 rounded hover:bg-udla-gray-dark transition"
            >
              Atrás
            </button>
          </div>
        )}

        {currentStep === 'date-time' && selectedSpace && applicantData && (
          <div>
            <div className="mb-6 text-center">
              <p className="text-gray-600">
                Seleccionaste: <strong>{selectedSpace.name}</strong>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Destino: <strong>{selectedRentalPurpose}</strong>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Evento: <strong>{selectedEventName}</strong>
              </p>
            </div>
            <DateTimeSelection onSelect={handleDateTimeSelect} selected={selectedDateTime} />
            <button
              onClick={() => setCurrentStep('space-selection')}
              className="mt-6 mx-auto block bg-udla-gray text-white px-6 py-2 rounded hover:bg-udla-gray-dark transition"
            >
              Atrás
            </button>
          </div>
        )}

        {currentStep === 'payment' && selectedSpace && applicantData && (
          <div>
            <Payment
              onSubmit={handlePaymentSubmit}
              amount={totalAmount}
              spaceName={selectedSpace.name}
              rentalPurpose={selectedRentalPurpose}
              eventName={selectedEventName}
            />
            <button
              onClick={() => setCurrentStep('date-time')}
              className="mt-6 mx-auto block bg-udla-gray text-white px-6 py-2 rounded hover:bg-udla-gray-dark transition"
            >
              Atrás
            </button>
          </div>
        )}

        {currentStep === 'confirmation' && applicantData && selectedSpace && (
          <BookingConfirmation
            reservationNumber={reservationNumber}
            spaceName={selectedSpace.name}
            applicantName={applicantData.nombresCompletos}
            startDate={selectedDateTime.startDate}
            startTime={selectedDateTime.startTime}
            endTime={selectedDateTime.endTime}
            totalAmount={totalAmount.toFixed(2)}
            rentalPurpose={selectedRentalPurpose}
            eventName={selectedEventName}
          />
        )}
      </div>
    </div>
  )
}
