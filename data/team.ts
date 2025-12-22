import type { TeamMember } from '~/types/api'

// Fallback local data - matches API data format
export const teamData: TeamMember[] = [
  {
    id: 14,
    name: 'Martina Sascha',
    position: 'Kredit & Versicherungsberater',
    email: 'm.sascha@tagakam.de',
    avatar: null,
    social: undefined,
    active: true
  },
  {
    id: 15,
    name: 'Sefa Altisap',
    position: 'Strom & Gas Berater',
    email: 'a.altisap@tagakam.de',
    avatar: null,
    social: undefined,
    active: true
  },
  {
    id: 9,
    name: 'Dipl.-Ing Brice Tagakam',
    position: 'Geschäftsführer',
    email: 'b.tagakam@tagakam.de',
    avatar: 'https://minio.digitalssolutions.de:9001/tagakam/team/avatars/6913a0374ccf30.38745342_te__le__chargement.jpeg',
    social: {
      linkedin: 'https://www.linkedin.com/in/brice-tagakam'
    },
    active: true
  },
  {
    id: 10,
    name: 'Doriane Ngatchie',
    position: 'Praktikantin',
    email: 'd.ngatchie@tagakam.de',
    avatar: null,
    social: undefined,
    active: true
  },
  {
    id: 11,
    name: 'Claude Simo',
    position: 'IT',
    email: 'it@tagakam.de',
    avatar: null,
    social: undefined,
    active: true
  },
  {
    id: 12,
    name: 'Melizie Nganté',
    position: 'Kundenservice',
    email: 'm.ngante@tagakam.de',
    avatar: null,
    social: undefined,
    active: true
  }
]
