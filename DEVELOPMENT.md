# Development Guide

## Project Overview

UDLA Space Booking is a full-stack web application built with Next.js 14, React, and TypeScript. It enables authorized university users to book spaces online and provides administrators with comprehensive management tools.

## Architecture

### Pages Structure
- **Public Pages** (`/app`):
  - `/` - Landing page with hero, space categories, booking process, and contact
  - `/book` - Multi-step booking flow (Client component with state management)

- **Admin Pages** (`/app/admin`):
  - `/admin` - Dashboard with metrics and quick actions
  - `/admin/reservations` - Reservation management with search, filter, and CSV export
  - `/admin/spaces` - Space management with search and CRUD operations

### Component Architecture
All booking-related components are Client Components (`'use client'`) to handle form state and user interactions:
- `IDValidation` - Step 1: User authorization
- `SpaceSelection` - Step 2: Browse and select spaces
- `DateTimeSelection` - Step 3: Choose date and time slots
- `ReservationDetails` - Step 4: Collect user information
- `BookingSummary` - Step 5: Review and pricing calculation
- `BookingConfirmation` - Step 6: Confirmation screen

Layout components use Server or Client rendering as appropriate.

## Data Models

### Applicant
```typescript
interface Applicant {
  id: string          // Unique ID (e.g., "123456")
  name: string
  email: string
  phone: string
  department?: string
}
```

### Space
```typescript
interface Space {
  id: number
  name: string
  category: string
  capacity: number
  rate: number        // Per hour
  image: string
  description: string
  location: string
  calendarEmail: string
}
```

### Reservation
```typescript
interface Reservation {
  id: number
  applicantId: string
  spaceId: number
  start: string       // ISO 8601 datetime
  end: string         // ISO 8601 datetime
  status: string      // 'Confirmed', 'Pending', 'Cancelled', 'Completed'
  notes?: string
}
```

## Development Workflow

### Adding a New Feature

1. **Create Components** in `/components` for UI elements
2. **Add Pages** in `/app` for new routes
3. **Update Data Models** in `/lib/mockData.ts` if needed
4. **Test Locally** with `npm run dev`

### Example: Adding a New Admin Module

```typescript
// 1. Create component in /components/MyFeature.tsx
'use client'
import { useState } from 'react'

export default function MyFeature() {
  const [data, setData] = useState([])
  
  // Your component logic
  return <div>...</div>
}

// 2. Create page at /app/admin/myfeature/page.tsx
import MyFeature from '@/components/MyFeature'

export default function MyFeaturePage() {
  return <MyFeature />
}

// 3. Add navigation link in /app/admin/layout.tsx
<Link href="/admin/myfeature">My Feature</Link>
```

## State Management

Currently using React's built-in `useState` for form and UI state. For larger applications, consider:
- **React Context API** - For shared state across components
- **Zustand** - Lightweight state management
- **Redux** - For complex state management

Example with Context:
```typescript
// Create context for booking state
const BookingContext = createContext()

// Use in booking page
const [bookingState, setBookingState] = useState({
  applicantId: '',
  spaceId: null,
  // ...
})
```

## Database Integration

Currently using mock data in `/lib/mockData.ts`. To integrate a real database:

### 1. Create API Routes
```typescript
// app/api/spaces/route.ts
export async function GET() {
  const spaces = await db.spaces.findAll()
  return Response.json(spaces)
}

export async function POST(request: Request) {
  const data = await request.json()
  const space = await db.spaces.create(data)
  return Response.json(space)
}
```

### 2. Update Components to Use API
```typescript
'use client'
import { useEffect, useState } from 'react'

export default function SpaceSelection() {
  const [spaces, setSpaces] = useState([])
  
  useEffect(() => {
    fetch('/api/spaces')
      .then(res => res.json())
      .then(data => setSpaces(data))
  }, [])
  
  return (
    // Use spaces state
  )
}
```

### 3. Support Databases
- **PostgreSQL** with Prisma - Recommended for production
- **MongoDB** with Mongoose
- **Firebase** with Firestore

## Calendar Integration

To integrate with Google Calendar or Outlook for availability checking:

```typescript
// lib/calendarService.ts
export async function getAvailableSlots(
  calendarEmail: string,
  date: string
): Promise<TimeSlot[]> {
  // Implement calendar API call
  // Return available time slots for the date
}
```

Update `DateTimeSelection` to use real availability:
```typescript
useEffect(() => {
  if (selectedSpace) {
    getAvailableSlots(selectedSpace.calendarEmail, selectedDate)
      .then(slots => setAvailableSlots(slots))
  }
}, [selectedSpace, selectedDate])
```

## Authentication

To add user authentication (recommended for production):

### Using NextAuth.js
```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const handlers = NextAuth({
  providers: [
    Credentials({
      credentials: {
        id: {},
        password: {},
      },
      async authorize(credentials) {
        // Validate user credentials
        const user = await validateUser(credentials.id)
        return user || null
      },
    }),
  ],
})
```

Update booking page to check authentication:
```typescript
'use client'
import { useSession } from 'next-auth/react'

export default function BookPage() {
  const { data: session } = useSession()
  
  if (!session) {
    return <LoginPrompt />
  }
  
  return <BookingFlow />
}
```

## Payment Integration

For running booking payments:

```typescript
// lib/paymentService.ts
export async function processPayment(
  amount: number,
  applicantId: string
): Promise<PaymentResult> {
  // Integrate with Stripe, PayPal, or other provider
}

// In BookingConfirmation
const handlePayment = async () => {
  const result = await processPayment(totalAmount, applicantId)
  if (result.success) {
    completeReservation()
  }
}
```

## Email Notifications

To send booking confirmation emails:

```typescript
// lib/emailService.ts
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function sendConfirmationEmail(
  email: string,
  reservation: Reservation
) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Reservation Confirmation #${reservation.id}`,
    html: `<h1>Your reservation has been confirmed!</h1>...`,
  })
}
```

## Testing

### Unit Tests
```bash
npm install -D vitest @testing-library/react
```

Create test files alongside components:
```typescript
// components/__tests__/SpaceSelection.test.tsx
import { render, screen } from '@testing-library/react'
import SpaceSelection from '../SpaceSelection'

describe('SpaceSelection', () => {
  it('should display spaces', () => {
    render(<SpaceSelection spaces={mockSpaces} />)
    expect(screen.getByText('Auditorium A')).toBeInTheDocument()
  })
})
```

### E2E Tests
```bash
npm install -D cypress
```

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Docker
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=postgresql://user:password@localhost:5432/udla
CALENDAR_API_KEY=xxx
NOTIFICATION_EMAIL=support@udla.edu
```

## Performance Optimization

### Image Optimization
```typescript
import Image from 'next/image'

<Image
  src={space.image}
  alt={space.name}
  width={400}
  height={300}
  priority={false}
/>
```

### Code Splitting
Next.js automatically code-splits at the page level. For dynamic imports:
```typescript
const AdminDashboard = dynamic(
  () => import('@/components/AdminDashboard'),
  { loading: () => <p>Loading...</p> }
)
```

### Caching
```typescript
// app/api/spaces/route.ts
export async function GET() {
  const spaces = await fetch('...', {
    next: { revalidate: 3600 } // Cache for 1 hour
  })
}
```

## Useful Commands

```bash
# Development
npm run dev

# Build
npm run build

# Production start
npm start

# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

## Troubleshooting

### Issue: "Cannot find module"
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Issue: Hydration mismatch
- Ensure Client Components use `'use client'` directive
- Check for date/time mismatches between server and client

### Issue: Forms not submitting
- Verify `<form>` elements are in Client Components
- Check browser console for JavaScript errors

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org/)

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and test locally
3. Commit with clear messages: `git commit -m "Add feature description"`
4. Push to remote: `git push origin feature/my-feature`
5. Create a Pull Request

## License

MIT