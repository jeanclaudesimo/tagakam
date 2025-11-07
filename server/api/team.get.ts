export default defineEventHandler(async (event) => {
  // Simulierte Team-Daten
  // In der Zukunft können diese aus einer echten Datenbank oder API kommen
  const team = [
    {
      id: 1,
      name: 'Dipl.-Ing Brice Tagakam',
      position: 'Geschäftsführer',
      email: 'b.tagakam@tagakam.de',
      avatar: null, // Optional: Pfad zu einem Avatar-Bild
      social: {
        twitter: '',
        facebook: '',
        linkedin: ''
      },
      active: true
    },
    {
      id: 2,
      name: 'Doriane Ngatchie',
      position: 'Praktikantin',
      email: 'd.ngatchie@tagakam.de',
      avatar: null,
      social: {
        twitter: '',
        facebook: '',
        linkedin: ''
      },
      active: true
    },
    {
      id: 3,
      name: 'Claude Simo',
      position: 'IT',
      email: 'it@tagakam.de',
      avatar: null,
      social: {
        twitter: '',
        facebook: '',
        linkedin: ''
      },
      active: true
    },
    {
      id: 4,
      name: 'Stephanie',
      position: 'Marketing',
      email: 'step@tagakam.de',
      avatar: null,
      social: {
        twitter: '',
        facebook: '',
        linkedin: ''
      },
      active: true
    }
  ]

  // Nur aktive Team-Mitglieder zurückgeben
  const activeTeam = team.filter(member => member.active)

  return {
    team: activeTeam,
    total: activeTeam.length
  }
})
