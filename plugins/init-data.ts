let initialized = false

export default defineNuxtPlugin({
  name: 'init-data',
  mode: 'client', // S'exécuter uniquement côté client
  async setup() {
    // Éviter les initialisations multiples
    if (initialized) {
      return
    }
    
    initialized = true

    // Attendre que le DOM soit complètement chargé
    if (typeof window !== 'undefined') {
      await new Promise<void>(resolve => {
        if (document.readyState === 'complete') {
          // Attendre encore un peu pour être sûr que tout est prêt
          setTimeout(() => resolve(), 200)
        } else {
          window.addEventListener('load', () => {
            setTimeout(() => resolve(), 200)
          }, { once: true })
        }
      })
    }

    const configStore = useConfigStore()
    const servicesStore = useServicesStore()
    const teamStore = useTeamStore()
    const faqStore = useFaqStore()

    try {
      // Fetch all data on app initialization (côté client uniquement)
      // Utiliser Promise.allSettled pour ne pas bloquer si une requête échoue
      await Promise.allSettled([
        configStore.fetchConfig(),
        servicesStore.fetchServices(),
        teamStore.fetchTeam(),
        faqStore.fetchFaqs()
      ])
    } catch (error) {
      console.error('[Init Data] Error fetching initial data:', error)
      // Ne pas bloquer l'application en cas d'erreur
    }
  }
})
