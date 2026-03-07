export interface Applicant {
  id: string
  name: string
  email: string
  phone: string
  department?: string
}

export interface Space {
  id: number
  name: string
  category: string
  capacity: number
  rate: number
  image: string
  description: string
  location: string
  calendarEmail: string
  rentalPurposes: string[]
}

export interface Reservation {
  id: number
  applicantId: string
  spaceId: number
  start: string
  end: string
  status: string
  notes?: string
}

export const mockApplicants: Applicant[] = [
  {
    id: '123456',
    name: 'John Doe',
    email: 'john.doe@udla.edu',
    phone: '(555) 123-4567',
    department: 'Engineering',
  },
  {
    id: '789012',
    name: 'Jane Smith',
    email: 'jane.smith@udla.edu',
    phone: '(555) 987-6543',
    department: 'Business',
  },
  {
    id: '345678',
    name: 'Robert Johnson',
    email: 'robert.johnson@udla.edu',
    phone: '(555) 456-7890',
    department: 'Sciences',
  },
]

export const mockSpaces: Space[] = [
  {
    id: 1,
    name: 'Auditorium A',
    category: 'Auditoriums',
    capacity: 200,
    rate: 150,
    image: '/spaces/auditorium.jpg',
    description: 'Large auditorium with modern AV equipment, stage, and seating for 200 people',
    location: 'Building A, 3rd Floor',
    calendarEmail: 'auditoriumA@udla.edu',
    rentalPurposes: ['Conferencias', 'Seminarios', 'Presentaciones', 'Actos académicos', 'Conciertos'],
  },
  {
    id: 2,
    name: 'Gym Court 1',
    category: 'Sports Courts',
    capacity: 50,
    rate: 75,
    image: '/spaces/gym.jpg',
    description: 'Full-size basketball court with professional equipment',
    location: 'Sports Complex',
    calendarEmail: 'gym1@udla.edu',
    rentalPurposes: ['Prácticas deportivas', 'Entrenamientos', 'Partidos', 'Campeonatos'],
  },
  {
    id: 3,
    name: 'Classroom 101',
    category: 'Classrooms',
    capacity: 35,
    rate: 50,
    image: '/spaces/classroom.jpg',
    description: 'Standard classroom with whiteboard, projector, and comfortable seating',
    location: 'Building B, 1st Floor',
    calendarEmail: 'classroom101@udla.edu',
    rentalPurposes: ['Clases', 'Talleres', 'Capacitaciones', 'Exámenes', 'Reuniones de estudio'],
  },
  {
    id: 4,
    name: 'Auditorium B',
    category: 'Auditoriums',
    capacity: 150,
    rate: 120,
    image: '/spaces/auditorium.jpg',
    description: 'Medium-sized auditorium with professional lighting and sound system',
    location: 'Building C, 2nd Floor',
    calendarEmail: 'auditoriumB@udla.edu',
    rentalPurposes: ['Conferencias', 'Seminarios', 'Presentaciones', 'Actos académicos', 'Cine'],
  },
  {
    id: 5,
    name: 'Tennis Court',
    category: 'Sports Courts',
    capacity: 4,
    rate: 60,
    image: '/spaces/tennis.jpg',
    description: 'Outdoor tennis court with professional-grade surface',
    location: 'Sports Complex',
    calendarEmail: 'tennis@udla.edu',
    rentalPurposes: ['Prácticas deportivas', 'Entrenamientos', 'Partidos amistosos', 'Torneos'],
  },
  {
    id: 6,
    name: 'Meeting Room 201',
    category: 'Classrooms',
    capacity: 15,
    rate: 30,
    image: '/spaces/meeting.jpg',
    description: 'Intimate meeting room with conference table and video conferencing equipment',
    location: 'Building A, 2nd Floor',
    calendarEmail: 'meetingroom201@udla.edu',
    rentalPurposes: ['Reuniones de negocios', 'Videoconferencias', 'Sesiones de trabajo', 'Reuniones departamentales'],
  },
]

export const mockReservations: Reservation[] = [
  {
    id: 1,
    applicantId: '123456',
    spaceId: 1,
    start: '2026-03-15T10:00:00Z',
    end: '2026-03-15T12:00:00Z',
    status: 'Confirmed',
    notes: 'Lecture on AI and Machine Learning',
  },
  {
    id: 2,
    applicantId: '789012',
    spaceId: 2,
    start: '2026-03-16T14:00:00Z',
    end: '2026-03-16T16:00:00Z',
    status: 'Pending',
    notes: 'Basketball practice',
  },
  {
    id: 3,
    applicantId: '345678',
    spaceId: 3,
    start: '2026-03-17T08:00:00Z',
    end: '2026-03-17T10:00:00Z',
    status: 'Confirmed',
    notes: 'Weekly team meeting',
  },
]