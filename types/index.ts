export interface Business {
  id: string
  name: string
  description: string
  location: string
  images: string[]
  industry: string
  size: 'startup' | 'small' | 'medium' | 'large'
  founded: number
  website?: string
  contactEmail: string
  workCulture: WorkCultureTag[]
  createdAt: Date
  updatedAt: Date
}

export interface Talent {
  id: string
  name: string
  email: string
  phone?: string
  location: string
  experience: number
  skills: string[]
  personality: PersonalityTag[]
  workCulturePreference: WorkCultureTag[]
  availability: 'immediate' | '2-weeks' | '1-month' | 'flexible'
  bio: string
  portfolio?: string[]
  resume?: string
  hourlyRate?: number
  rating: number
  completedJobs: number
  createdAt: Date
  updatedAt: Date
}

export interface Job {
  id: string
  businessId: string
  title: string
  description: string
  requirements: string[]
  salary: {
    min: number
    max: number
    currency: string
    period: 'hourly' | 'daily' | 'weekly' | 'monthly'
  }
  contractDuration: string
  location: string
  skillset: string[]
  workCulture: WorkCultureTag[]
  status: 'open' | 'in-progress' | 'completed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

export interface Match {
  id: string
  businessId: string
  talentId: string
  jobId?: string
  status: 'pending' | 'accepted' | 'rejected'
  businessLiked: boolean
  talentLiked: boolean
  matchedAt?: Date
  createdAt: Date
}

export interface Chat {
  id: string
  matchId: string
  participants: string[]
  messages: Message[]
  lastMessageAt: Date
  createdAt: Date
}

export interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  read: boolean
}

export interface BusinessReview {
  id: string
  businessId: string
  talentId: string
  rating: number
  comment: string
  createdAt: Date
}

export type WorkCultureTag = 
  | 'autocratic'
  | 'democratic'
  | 'collaborative'
  | 'hierarchical'
  | 'flat'
  | 'agile'
  | 'traditional'
  | 'innovative'
  | 'remote-friendly'
  | 'office-based'
  | 'flexible-hours'
  | 'structured-hours'

export type PersonalityTag = 
  | 'team-worker'
  | 'independent'
  | 'leader'
  | 'creative'
  | 'analytical'
  | 'detail-oriented'
  | 'big-picture'
  | 'communicative'
  | 'introverted'
  | 'extroverted'
  | 'adaptable'
  | 'consistent'

export interface User {
  id: string
  email: string
  type: 'business' | 'talent'
  profileId: string
  createdAt: Date
  lastLoginAt: Date
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}
