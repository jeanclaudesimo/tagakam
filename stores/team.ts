import { defineStore } from 'pinia'
import type { TeamMember } from '~/types/api'
import { teamData } from '~/data/team'

export const useTeamStore = defineStore('team', {
  state: () => ({
    team: [] as TeamMember[],
    loading: false,
    error: null as string | null
  }),

  getters: {
    activeMembers(): TeamMember[] {
      return this.team.filter(m => m.active)
    }
  },

  actions: {
    async fetchTeam() {
      this.loading = true
      this.error = null

      try {
        const api = usePortalAPI()
        const data = await api.getTeam()
        this.team = data.team || []
      } catch (error: any) {
        // Silently fall back to local data
        this.team = teamData
      } finally {
        this.loading = false
      }
    }
  }
})
