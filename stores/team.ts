import { defineStore } from 'pinia'
import type { TeamMember } from '~/types/api'

export const useTeamStore = defineStore('team', {
  state: () => ({
    team: [] as TeamMember[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    activeMembers(): TeamMember[] {
      return this.team.filter(m => m.active)
    },

    isLoaded(): boolean {
      return this.team.length > 0
    }
  },

  actions: {
    setTeam(team: TeamMember[]) {
      this.team = team
      this.error = null
    },

    setError(error: string | null) {
      this.error = error
    },

    setLoading(loading: boolean) {
      this.loading = loading
    },

    async fetchTeam() {
      if (this.isLoaded) {
        return // Already loaded
      }

      this.setLoading(true)
      this.setError(null)

      try {
        const data = await $fetch('/api/team')
        this.setTeam((data as any).team || [])
      } catch (error: any) {
        console.error('Error fetching team:', error)
        this.setError(error.message || 'Failed to fetch team')
      } finally {
        this.setLoading(false)
      }
    }
  }
})
