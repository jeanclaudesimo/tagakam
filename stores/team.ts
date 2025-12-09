import { defineStore } from 'pinia'
import type { TeamMember, TeamResponse } from '~/types/api'
import { teamData } from '~/data/team'

export const useTeamStore = defineStore('team', {
  state: () => ({
    team: teamData as TeamMember[], // Initialiser avec les données locales pour éviter les problèmes d'hydratation
    loading: false,
    error: null as string | null,
    fetched: false // Flag pour éviter les appels multiples
  }),

  getters: {
    activeMembers(): TeamMember[] {
      return this.team.filter(m => m.active)
    }
  },

  actions: {
    async fetchTeam(force = false) {
      // Éviter les appels multiples simultanés
      if (this.loading) {
        return
      }

      // Si déjà récupéré et pas de force, ne pas refaire l'appel
      if (this.fetched && !force) {
        return
      }

      // Ne pas faire d'appel API si on est côté serveur
      if (process.server) {
        this.fetched = true
        return
      }

      this.loading = true
      this.error = null

      try {
        // Appel à l'API du portal (uniquement côté client)
        const response = await $fetch<TeamResponse | TeamMember[]>('/api/portal/team')
        
        let apiTeamData: TeamMember[] = []
        
        if (response && typeof response === 'object') {
          if ('team' in response && Array.isArray((response as TeamResponse).team)) {
            apiTeamData = (response as TeamResponse).team
          } else if (Array.isArray(response)) {
            // Si la réponse est directement un tableau
            apiTeamData = response
          }
        }
        
        // Si la réponse contient des données, les utiliser, sinon garder les données locales
        if (apiTeamData.length > 0) {
          this.team = apiTeamData
        }
        // Sinon, on garde les données locales déjà initialisées
        
        this.fetched = true
      } catch (error: any) {
        console.warn('[Team Store] Failed to fetch team from API, keeping local data:', error.message || error)
        this.error = error.message || 'Failed to fetch team'
        // On garde les données locales déjà initialisées, pas besoin de les réassigner
        this.fetched = true // Marquer comme récupéré même en cas d'erreur pour éviter les boucles
      } finally {
        this.loading = false
      }
    }
  }
})
