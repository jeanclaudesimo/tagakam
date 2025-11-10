export default defineEventHandler(async (event) => {
  try {
    // First, login to get token
    const loginResponse = await $fetch('https://portal.digitalssolutions.de/api/login', {
      method: 'POST',
      body: {
        email: 'claude@c-simweb.de',
        password: 'Da##29031990'
      }
    })

    // Extract token from response
    const token = (loginResponse as any).token

    if (!token) {
      throw new Error('No token received from login')
    }

    // Then fetch FAQs with the token
    const faqResponse = await $fetch('https://portal.digitalssolutions.de/api/faq', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    return faqResponse
  } catch (error: any) {
    console.error('Server API error:', error)

    // Return fallback data if API fails
    return {
      faqs: [
        {
          id: 1,
          question: 'Welche Dienstleistungen bietet TaGaKaM&Co an?',
          answer: 'Wir bieten eine breite Palette von Dienstleistungen, darunter GPS-Installation und Videoüberwachung, Immobilien- und Vermietungsdienste, Reisebuchungen über Easy Fly Global sowie den Verkauf von Afro-Produkten und Autoteilen über unseren 365Shop.',
          active: true,
          order: 1
        },
        {
          id: 2,
          question: 'Wie kann ich eine Geschäftsreise mit Easy Fly Global buchen?',
          answer: 'Über Easy Fly Global bieten wir Ihnen einen vollständigen Service für Ihre Geschäftsreisen, einschließlich Flugbuchungen, Hotelreservierungen und maßgeschneiderter Reiseplanung. Kontaktieren Sie uns, und wir erstellen das perfekte Reisepaket für Sie.',
          active: true,
          order: 2
        },
        {
          id: 3,
          question: 'Bieten Sie auch internationale Versanddienste an?',
          answer: 'Ja, für unseren 365Shop und die meisten Produkte bieten wir internationalen Versand an. Sie können bequem online bestellen, und wir sorgen dafür, dass Ihre Produkte sicher und schnell zu Ihnen geliefert werden.',
          active: true,
          order: 3
        },
        {
          id: 4,
          question: 'Wie funktioniert die GPS-Installation und Videoüberwachung?',
          answer: 'Unsere Experten kümmern sich um die Installation von GPS-Systemen für Ihre Flottenverwaltung sowie um die Einrichtung von Videoüberwachungssystemen zur Sicherung Ihrer Gebäude und Geschäfte. Wir bieten sowohl Einzel- als auch Komplettlösungen an.',
          active: true,
          order: 4
        },
        {
          id: 5,
          question: 'Wie kann ich mit TaGaKaM&Co in Kontakt treten?',
          answer: 'Sie können uns jederzeit über unsere Website, per E-Mail oder telefonisch erreichen. Unser Kundenservice-Team steht Ihnen bei allen Fragen zur Verfügung.',
          active: true,
          order: 5
        }
      ].filter(faq => faq.active).sort((a, b) => a.order - b.order),
      total: 5
    }
  }
})
