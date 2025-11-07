export default defineEventHandler(async (event) => {
  // Simulation: Diese Daten würden normalerweise von einer echten API kommen
  // Sie können diese später durch echte API-Calls ersetzen

  const services = [
    {
      id: 1,
      title: 'NTglobaltransit',
      description: 'Internationaler Güterverkehr in Deutschland und Europa',
      detailedDescription: 'Wir bieten Ihnen professionelle GPS-Installationen und hochmoderne Videoüberwachungssysteme, die Ihre Logistikprozesse optimieren und Ihre Sicherheit gewährleisten.',
      icon: 'mdi:truck',
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=600&fit=crop',
      active: true
    },
    {
      id: 2,
      title: '365Shop&Services',
      description: 'Hochwertige Afro-Produkte und Autoteile zu fairen Preisen',
      detailedDescription: 'Bei 365Shop&Services finden Sie eine breite Auswahl an hochwertigen Afro-Produkten und Autoteilen – alles, was Sie brauchen, zu fairen Preisen mit erstklassigem Service.',
      icon: 'mdi:cart',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      active: true
    },
    {
      id: 3,
      title: 'EasyFlyGlobal',
      description: 'Begleitung bei Geschäftsreisen und Kreuzfahrten',
      detailedDescription: 'Mit Easy Fly Global organisieren wir Ihre Geschäftsreisen, Kreuzfahrten und Aufenthalte. Wir kümmern uns um alle Details, damit Sie sich auf das Wesentliche konzentrieren können.',
      icon: 'mdi:airplane',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop',
      active: true
    },
    {
      id: 4,
      title: 'Star Gebäudereinigung',
      description: 'Professionelle Gebäudereinigung in Köln',
      detailedDescription: 'Ihr Partner für Sauberkeit und Werterhalt. Wir bieten maßgeschneiderte Reinigungslösungen für Büros, Wohnanlagen und Gewerbeobjekte mit höchster Qualität.',
      icon: 'mdi:broom',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop',
      active: true
    }
  ]

  return {
    services: services.filter(s => s.active),
    total: services.filter(s => s.active).length
  }
})
