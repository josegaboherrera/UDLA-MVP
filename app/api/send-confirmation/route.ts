import { NextResponse } from 'next/server'

interface ConfirmationPayload {
  to: string
  reservationNumber: string
  applicantName: string
  spaceName: string
  startDate: string
  startTime: string
  endTime: string
  totalAmount: string
  rentalPurpose?: string
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ConfirmationPayload

    if (!payload.to || !payload.reservationNumber || !payload.spaceName) {
      return NextResponse.json(
        { error: 'Datos incompletos para enviar el correo de confirmación.' },
        { status: 400 }
      )
    }

    // Simulación del envío de correo.
    // Aquí puedes integrar un proveedor real como Resend, SendGrid o SMTP.
    console.log('Correo de confirmación enviado:', {
      to: payload.to,
      subject: `Reserva confirmada ${payload.reservationNumber}`,
      body: `Hola ${payload.applicantName}, tu reserva para ${payload.spaceName} fue confirmada.`,
    })

    return NextResponse.json({ success: true, message: 'Correo enviado correctamente.' }, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: 'Ocurrió un error procesando el envío de correo.' },
      { status: 500 }
    )
  }
}
