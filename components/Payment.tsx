'use client'

interface PaymentData {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardHolderName: string
}

interface PaymentProps {
  onSubmit: (data: PaymentData) => void
  amount: number
  spaceName: string
  rentalPurpose?: string
  eventName?: string
}

export default function Payment({ onSubmit, amount, spaceName, rentalPurpose, eventName }: PaymentProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: PaymentData = {
      cardNumber: formData.get('cardNumber') as string,
      expiryDate: formData.get('expiryDate') as string,
      cvv: formData.get('cvv') as string,
      cardHolderName: formData.get('cardHolderName') as string,
    }
    onSubmit(data)
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-udla-black">Paso 4: Información de Pago</h2>

      <div className="mb-6 p-4 bg-red-50 border border-udla-red/20 rounded-lg">
        <h3 className="font-semibold text-lg mb-2 text-udla-black">Resumen de la Reserva</h3>
        <p className="text-udla-gray-dark">Espacio: {spaceName}</p>
        {rentalPurpose && <p className="text-udla-gray-dark">Destino del Alquiler: {rentalPurpose}</p>}
        {eventName && <p className="text-udla-gray-dark">Evento: {eventName}</p>}
        <p className="text-2xl font-bold text-udla-red mt-2">${amount.toFixed(2)}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-udla-gray-dark">Número de Tarjeta</label>
          <input
            type="text"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-udla-red focus:ring-2 focus:ring-udla-red/20 focus:outline-none transition"
            required
            maxLength={19}
            pattern="[0-9\s]{13,19}"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-udla-gray-dark">Fecha de Expiración</label>
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-udla-red focus:ring-2 focus:ring-udla-red/20 focus:outline-none transition"
              required
              maxLength={5}
              pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-udla-gray-dark">CVV</label>
            <input
              type="text"
              name="cvv"
              placeholder="123"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-udla-red focus:ring-2 focus:ring-udla-red/20 focus:outline-none transition"
              required
              maxLength={4}
              pattern="[0-9]{3,4}"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-udla-gray-dark">Nombre del Titular</label>
          <input
            type="text"
            name="cardHolderName"
            placeholder="Como aparece en la tarjeta"
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-udla-red focus:ring-2 focus:ring-udla-red/20 focus:outline-none transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-udla-red text-white p-3 rounded-lg font-semibold hover:bg-udla-red-dark transition shadow-lg"
        >
          Procesar Pago y Confirmar Reserva
        </button>
      </form>
    </div>
  )
}
