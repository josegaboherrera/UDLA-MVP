import Link from 'next/link'

interface UDLABrandHeaderProps {
  showAdminLink?: boolean
}

export default function UDLABrandHeader({ showAdminLink = true }: UDLABrandHeaderProps) {
  return (
    <header className="udla-gradient border-b-2 border-[var(--udla-gold)] text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <img src="/udla-logo.svg" alt="Universidad de Las Américas (UDLA)" className="h-12 w-12 rounded" />
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-100">Universidad de Las Américas</p>
            <p className="text-2xl font-bold leading-none">UDLA Space Booking</p>
          </div>
        </Link>

        {showAdminLink && (
          <Link
            href="/admin"
            className="rounded border border-[var(--udla-gold)] bg-black/20 px-4 py-2 text-sm font-semibold hover:bg-black/35"
          >
            Portal administrativo
          </Link>
        )}
      </div>
    </header>
  )
}
