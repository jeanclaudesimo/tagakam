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

      // Use local data directly - no API call
      this.team = teamData
      this.loading = false
    }
  }
})
