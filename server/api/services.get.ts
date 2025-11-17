export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  
  try {
    // First, login to get token
    const loginResponse = await $fetch('https://portal.digitalssolutions.de/api/login', {
      method: 'POST',
      body: {
        email: config.apiLoginEmail,
        password: config.apiLoginPassword
      }
    })

    // Extract token from response
    const token = (loginResponse as any).token

    if (!token) {
      throw new Error('No token received from login')
    }

    // Then fetch services with the token
    const servicesResponse = await $fetch('https://portal.digitalssolutions.de/api/services', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    // Si l'API retourne des données, les utiliser
    // Sinon, retourner la simulation basée sur l'image
    if (servicesResponse && (servicesResponse as any).services && (servicesResponse as any).services.length > 0) {
      return servicesResponse
    }

    // Simulation des services exacts de l'image
    return {
      services: [
        {
          id: 1,
          title: '365 KFZ-Zulassung',
          description: 'Fahrzeugservice & Zulassungen',
          detailedDescription: 'Professionelle Dienstleistungen rund um Ihr Fahrzeug - von der Zulassung bis zum Service.',
          icon: 'mdi:car',
          image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop',
          active: true,
          serviceItems: [
            'Fahrzeugservice & Zulassungen',
            'Auto An-, Ab- und Ummeldung',
            'Autoschilder / Kennzeichen',
            'Fahrzeugüberführungen',
            'Kfz-Versicherungen',
            'Autoteile'
          ]
        },
        {
          id: 2,
          title: 'NT Global Transit',
          description: 'Transport & Logistiklösungen',
          detailedDescription: 'Umfassende Transport- und Logistiklösungen für nationale und internationale Transporte.',
          icon: 'mdi:truck',
          image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=600&fit=crop',
          active: true,
          serviceItems: [
            'Transport & logistiklösungen',
            'Import / Export',
            'Fahrzeuge & Container',
            'Lagerplatzvermietung',
            'Transportervermietungen',
            'Umzüge (privat & gewerblich)',
            'See- und Luftfracht'
          ]
        },
        {
          id: 3,
          title: 'EASYFLY GLOBAL',
          description: 'Flüge & Reiseveranstaltungen',
          detailedDescription: 'Ihr Partner für Flugtickets, Reiseplanung und individuelle Pauschalreisen weltweit.',
          icon: 'mdi:airplane',
          image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop',
          active: true,
          serviceItems: [
            'Flüge & Reiseveranstaltungen',
            'Flugtickets & Reiseplanung',
            'Unterkunft & Hotelreservierung',
            'Individuelle Pauschalreisen',
            'Visaservice',
            'Chauffeurservice'
          ]
        },
        {
          id: 4,
          title: 'NT DREAM HOUSE',
          description: 'Alles rund um Immobilien',
          detailedDescription: 'Ihr Spezialist für Immobilienvermittlung, Ferienwohnungen und Monteurunterkünfte.',
          icon: 'mdi:home',
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
          active: true,
          serviceItems: [
            'Alles rund um Immobilien',
            'Immobilienvermittlung',
            'Ferienwohnungen',
            'Monteurunterkünfte',
            'Monteurzimmer'
          ]
        },
        {
          id: 5,
          title: 'Ihr Kredit & Versicherungsvermittler',
          description: 'Versicherung, der Sie vertrauen können',
          detailedDescription: 'Umfassende Versicherungslösungen für alle Lebensbereiche - von der Krankenversicherung bis zur Reiseversicherung.',
          icon: 'mdi:shield-check',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
          active: true,
          serviceItems: [
            'Versicherung, der Sie vertrauen können',
            'Krankenversicherung',
            'Kfz Versicherung',
            'Gebäudeversicherung',
            'Reisevericherungen'
          ]
        }
      ],
      total: 5
    }
  } catch (error: any) {
    console.error('Server API error:', error)
    
    // En cas d'erreur, retourner quand même la simulation pour le développement
    return {
      services: [
        {
          id: 1,
          title: '365 KFZ-Zulassung',
          description: 'Fahrzeugservice & Zulassungen',
          detailedDescription: 'Professionelle Dienstleistungen rund um Ihr Fahrzeug - von der Zulassung bis zum Service.',
          icon: 'mdi:car',
          image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop',
          active: true,
          serviceItems: [
            'Fahrzeugservice & Zulassungen',
            'Auto An-, Ab- und Ummeldung',
            'Autoschilder / Kennzeichen',
            'Fahrzeugüberführungen',
            'Kfz-Versicherungen',
            'Autoteile'
          ]
        },
        {
          id: 2,
          title: 'NT Global Transit',
          description: 'Transport & Logistiklösungen',
          detailedDescription: 'Umfassende Transport- und Logistiklösungen für nationale und internationale Transporte.',
          icon: 'mdi:truck',
          image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=600&fit=crop',
          active: true,
          serviceItems: [
            'Transport & logistiklösungen',
            'Import / Export',
            'Fahrzeuge & Container',
            'Lagerplatzvermietung',
            'Transportervermietungen',
            'Umzüge (privat & gewerblich)',
            'See- und Luftfracht'
          ]
        },
        {
          id: 3,
          title: 'EASYFLY GLOBAL',
          description: 'Flüge & Reiseveranstaltungen',
          detailedDescription: 'Ihr Partner für Flugtickets, Reiseplanung und individuelle Pauschalreisen weltweit.',
          icon: 'mdi:airplane',
          image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop',
          active: true,
          serviceItems: [
            'Flüge & Reiseveranstaltungen',
            'Flugtickets & Reiseplanung',
            'Unterkunft & Hotelreservierung',
            'Individuelle Pauschalreisen',
            'Visaservice',
            'Chauffeurservice'
          ]
        },
        {
          id: 4,
          title: 'NT DREAM HOUSE',
          description: 'Alles rund um Immobilien',
          detailedDescription: 'Ihr Spezialist für Immobilienvermittlung, Ferienwohnungen und Monteurunterkünfte.',
          icon: 'mdi:home',
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
          active: true,
          serviceItems: [
            'Alles rund um Immobilien',
            'Immobilienvermittlung',
            'Ferienwohnungen',
            'Monteurunterkünfte',
            'Monteurzimmer'
          ]
        },
        {
          id: 5,
          title: 'Ihr Kredit & Versicherungsvermittler',
          description: 'Versicherung, der Sie vertrauen können',
          detailedDescription: 'Umfassende Versicherungslösungen für alle Lebensbereiche - von der Krankenversicherung bis zur Reiseversicherung.',
          icon: 'mdi:shield-check',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
          active: true,
          serviceItems: [
            'Versicherung, der Sie vertrauen können',
            'Krankenversicherung',
            'Kfz Versicherung',
            'Gebäudeversicherung',
            'Reisevericherungen'
          ]
        }
      ],
      total: 5
    }
  }
})
