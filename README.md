# UDLA Space Booking

A modern full-stack web application for booking rentable university spaces. This application allows authorized users to reserve auditoriums, sports courts, classrooms, and other university facilities online.

## Features

### Public Booking Platform
- **Landing Page**: Professional homepage with space categories and booking process overview
- **6-Step Booking Flow**:
  1. **ID Validation**: Verify authorized users
  2. **Space Selection**: Browse available spaces with details and pricing
  3. **Date & Time Selection**: Choose available slots
  4. **Reservation Details**: Provide applicant and billing information
  5. **Summary Review**: See pricing breakdown and final details
  6. **Confirmation**: Receive reservation number and confirmation

### Admin Dashboard
- **Dashboard Overview**: Total reservations, upcoming bookings, revenue estimates
- **Reservation Management**:
  - Search, filter, and sort reservations
  - Edit and delete reservations
  - Export to Excel for billing purposes
- **Space Management**:
  - Create, edit, and delete rentable spaces
  - Manage space details (name, category, capacity, rate, location)
  - Upload space images
- **User Management**: Manage authorized applicants and their access rights
- **Pricing Configuration**: Define general rates, discounts, and special pricing rules
- **Calendar Integration**: Link spaces to calendar systems and manage availability

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **UI**: React with Tailwind CSS
- **Language**: TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Components**: Custom reusable React components

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
  layout.tsx              # Root layout
  page.tsx                # Landing page
  globals.css             # Global Tailwind styles
  book/
    page.tsx              # Multi-step booking flow
  admin/
    layout.tsx            # Admin sidebar layout
    page.tsx              # Admin dashboard
    reservations/
      page.tsx            # Reservation management
    spaces/
      page.tsx            # Space management

components/
  Hero.tsx               # Landing page hero section
  SpaceCategories.tsx    # Space categories display
  BookingProcess.tsx     # 6-step booking process overview
  ContactSection.tsx     # Contact information
  IDValidation.tsx       # Step 1: ID validation form
  SpaceSelection.tsx     # Step 2: Space selection
  DateTimeSelection.tsx  # Step 3: Date & time picker
  ReservationDetails.tsx # Step 4: User details form
  BookingSummary.tsx     # Step 5: Review & pricing
  BookingConfirmation.tsx # Step 6: Confirmation screen

lib/
  mockData.ts            # Mock data for testing

public/                  # Static assets
```

## Demo Users

For testing the booking flow, use these demo IDs:
- `123456` - John Doe (Engineering)
- `789012` - Jane Smith (Business)
- `345678` - Robert Johnson (Sciences)

## Available Spaces

The system includes 6 sample spaces:
1. **Auditorium A** - 200 people, $150/hour
2. **Gym Court 1** - 50 people, $75/hour
3. **Classroom 101** - 35 people, $50/hour
4. **Auditorium B** - 150 people, $120/hour
5. **Tennis Court** - 4 people, $60/hour
6. **Meeting Room 201** - 15 people, $30/hour

## Pricing System

The application supports flexible pricing:
- **Base Rate**: Per-space hourly rate
- **Discounts**: Percentage or fixed discounts
- **Applicant-Specific Rates**: Special rates by ID number
- **Location-Based Rates**: Special rates for premium spaces

Pricing is calculated automatically during booking and displayed in the summary.

## Excel Export

Reservation data can be exported to CSV (compatible with Excel) including:
- Reservation details
- Applicant information
- Space details
- Date, time, and duration
- Pricing breakdown
- Reservation status
- Notes

This is perfect for billing and financial tracking.

## Admin Features

### Dashboard Metrics
- Total number of reservations
- Upcoming reservations count
- Revenue estimates
- Most booked spaces
- Reservation status breakdown

### Reservation Management
- Advanced search and filtering
- Sort by date, applicant, space, or status
- Edit reservation details
- Cancel or delete reservations
- Export to Excel for billing

### Space Management
- Grid view of all spaces
- Search and filter capabilities
- Edit space details
- Manage pricing per space
- Image upload support (placeholder ready)
- Calendar/availability linking

## Development Notes

### Client vs Server Components
- Pages with forms and state use `'use client'` directive
- Server components used for data fetching (ready for API integration)

### Ready for Integration
The architecture is prepared for:
- **Database Backend**: Replace mock data with real API calls
- **Authentication**: Add user/admin authentication
- **Calendar API**: Integrate with Google Calendar or Outlook
- **Payment Processing**: Add payment gateway for billing
- **Email Notifications**: Send booking confirmations

### Styling
- Uses Tailwind CSS utility classes
- Responsive design for mobile, tablet, and desktop
- Blue color scheme for institutional trust
- Consistent spacing and typography

## Building for Production

```bash
npm run build
npm start
```

## License

MIT