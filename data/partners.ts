import type { Partner } from '~/types/api'

// Fallback local data - matches API data format exactly
export const partnersData: Partner[] = [
  {
    id: 1,
    name: 'UPS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/United_Parcel_Service_logo_2014.svg/200px-United_Parcel_Service_logo_2014.svg.png',
    website: 'https://www.ups.com',
    description: 'United Parcel Service - Weltweiter Paketdienst',
    sortOrder: 1
  },
  {
    id: 2,
    name: 'DHL',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/DHL_Logo.svg/200px-DHL_Logo.svg.png',
    website: 'https://www.dhl.de',
    description: 'DHL - Deutsche Post Logistik',
    sortOrder: 2
  },
  {
    id: 3,
    name: 'DPD',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/DPD_logo_%282015%29.svg/200px-DPD_logo_%282015%29.svg.png',
    website: 'https://www.dpd.de',
    description: 'DPD - Dynamic Parcel Distribution',
    sortOrder: 3
  },
  {
    id: 4,
    name: 'GLS',
    logo: '/images/partner/gls.svg',
    website: 'https://www.gls-group.eu',
    description: 'GLS - General Logistics Systems',
    sortOrder: 4
  },
  {
    id: 5,
    name: 'Grimaldi Lines',
    logo: 'https://www.grimaldi-lines.com/wp-content/uploads/2019/06/grimaldilines.png',
    website: 'https://www.grimaldi-lines.com',
    description: 'Grimaldi Lines - Seefrachtverkehr',
    sortOrder: 5
  },
  {
    id: 6,
    name: 'Sallaum Lines',
    logo: '/images/partner/sallaumlines.svg',
    website: 'https://www.sallaumlines.com',
    description: 'Sallaum Lines - Ro-Ro Shipping',
    sortOrder: 6
  },
  {
    id: 7,
    name: 'Hapag-Lloyd',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Hapag-Lloyd_Logo.svg/200px-Hapag-Lloyd_Logo.svg.png',
    website: 'https://www.hapag-lloyd.com',
    description: 'Hapag-Lloyd - Container Shipping',
    sortOrder: 7
  },
  {
    id: 8,
    name: 'CMA CGM',
    logo: 'https://www.cma-cgm.com/Images-pxp/v3-1/logo/CMACGM-h57.svg',
    website: 'https://www.cma-cgm.com',
    description: 'CMA CGM - Container Shipping',
    sortOrder: 8
  },
  {
    id: 9,
    name: 'NT Global Transit',
    logo: '/images/partner/ntglobaltransit.webp',
    website: 'https://www.nt-globaltransit.com',
    description: 'Transport & Logistiklösungen',
    sortOrder: 9
  },
  {
    id: 10,
    name: '365 Shop & Services',
    logo: '/images/partner/365shop.webp',
    website: 'https://www.365shopservices.de',
    description: 'Shop & Service Partner',
    sortOrder: 10
  },
  {
    id: 11,
    name: 'Easy Fly Global',
    logo: '/images/partner/easyfly.webp',
    website: 'https://www.easyflyglobal.com',
    description: 'Flüge & Reiseveranstaltungen',
    sortOrder: 11
  },
  {
    id: 12,
    name: 'NT Dream House',
    logo: '/images/partner/ntdreamhouse.webp',
    website: 'https://www.nt-dreamhouse.de',
    description: 'Immobilien & Unterkünfte',
    sortOrder: 12
  },
  {
    id: 13,
    name: 'NT Locator',
    logo: '/images/partner/ntlocator.webp',
    website: 'https://www.nt-locator.de',
    description: 'Standort & Service',
    sortOrder: 13
  },
  {
    id: 14,
    name: 'TaGaKaM & Co',
    logo: '/images/partner/tagakam.webp',
    website: 'https://www.tagakam.de',
    description: 'Ihr Business Partner Spezialist',
    sortOrder: 14
  },
  {
    id: 15,
    name: 'Logo Rond',
    logo: '/images/partner/logorond.webp',
    website: null,
    description: null,
    sortOrder: 15
  }
]
