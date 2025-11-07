<template>
  <section id="team" class="py-20 bg-gradient-to-b from-gray-50 to-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="section-title">
          Unser <span class="gradient-text">Team</span>
        </h2>
        <p class="section-subtitle">
          Ihre Partner für Erfolg. Mit Leidenschaft und Engagement arbeiten wir daran, maßgeschneiderte Lösungen zu entwickeln, die Ihre geschäftlichen Ziele unterstützen.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(member, index) in team"
          :key="index"
          class="group"
        >
          <div class="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
            <!-- Avatar -->
            <div class="relative h-64 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center overflow-hidden">
              <div class="w-32 h-32 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <Icon name="mdi:account" class="text-7xl text-white" />
              </div>
              <!-- Social Links Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <div class="flex space-x-3">
                  <a href="#" class="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Icon name="mdi:twitter" class="text-white text-xl" />
                  </a>
                  <a href="#" class="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Icon name="mdi:facebook" class="text-white text-xl" />
                  </a>
                  <a href="#" class="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Icon name="mdi:linkedin" class="text-white text-xl" />
                  </a>
                </div>
              </div>
            </div>

            <!-- Info -->
            <div class="p-6 text-center">
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ member.name }}</h3>
              <p class="text-primary-600 font-semibold mb-2">{{ member.position }}</p>
              <a :href="`mailto:${member.email}`" class="text-sm text-gray-600 hover:text-primary-600 transition-colors flex items-center justify-center space-x-1">
                <Icon name="mdi:email" class="text-base" />
                <span>{{ member.email }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTeamStore } from '~/stores/team'

const teamStore = useTeamStore()
const team = computed(() => teamStore.activeMembers)
</script>
