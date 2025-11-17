export interface ContactInfo {
  company_name: string
  address_line1: string
  address_line2: string | null
  postal_code: string
  city: string
  country: string
  phone: string
  email: string
  support_email: string
  website: string
  opening_hours: string | null
  social_links: SocialLinks | null
}

export interface SocialLinks {
  facebook?: string
  twitter?: string
  instagram?: string
  linkedin?: string
}

export interface SmtpConfig {
  host: string | null
  port: number | null
  username: string | null
  password: string | null
  encryption: string | null
  from_email: string
  from_name: string
}

export interface TenantInfo {
  id: number
  name: string
  domain: string
}

export interface ConfigResponse {
  contact: ContactInfo
  smtp: SmtpConfig
  tenant: TenantInfo
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user?: any
}

export interface Service {
  id: number
  title: string
  description: string
  detailedDescription: string
  icon: string
  image: string
  active: boolean
  serviceItems?: string[] // Liste des services détaillés pour chaque catégorie
}

export interface ServicesResponse {
  services: Service[]
  total: number
}

export interface TeamMember {
  id: number
  name: string
  position: string
  email: string
  avatar?: string | null
  social?: {
    twitter?: string
    facebook?: string
    linkedin?: string
  }
  active: boolean
}

export interface TeamResponse {
  team: TeamMember[]
  total: number
}

export interface FAQ {
  id: number
  question: string
  answer: string
  active: boolean
  order: number
}

export interface FAQResponse {
  faqs: FAQ[]
  total: number
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}
