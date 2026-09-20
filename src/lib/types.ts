import { Database } from '@/types/supabase'

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Entity Types
export type Professional = Tables<'professionals'>
export type Client = Tables<'clients'>
export type Appointment = Tables<'appointments'>
export type AvailabilityRule = Tables<'availability_rules'>

// Custom/Composite Types
export type AppointmentWithClient = Appointment & {
  clients: Client | null
}

export type ProfessionalProfile = Professional & {
  availability_rules: AvailabilityRule[]
}
