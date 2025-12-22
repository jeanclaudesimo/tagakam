<template>
  <section id="partners" class="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="section-title">
          Unsere <span class="gradient-text">Partner</span>
        </h2>
        <p class="section-subtitle">
          Gemeinsam stark: Vertrauen Sie auf unser Netzwerk aus erstklassigen Partnern
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div
          v-for="(partner, index) in sortedPartners"
          :key="partner.id || index"
          class="group bg-white rounded-xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex items-center justify-center"
          :style="`animation-delay: ${index * 0.1}s`"
        >
          <a
            v-if="partner.website"
            :href="partner.website"
            target="_blank"
            rel="noopener noreferrer"
            class="relative w-full h-24 flex items-center justify-center"
          >
            <img
              :src="partner.logo"
              :alt="partner.name"
              class="max-w-full max-h-full object-contain transition-all duration-300"
            />
          </a>
          <div v-else class="relative w-full h-24 flex items-center justify-center">
            <img
              :src="partner.logo"
              :alt="partner.name"
              class="max-w-full max-h-full object-contain transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePartnersStore } from '~/stores/partners'

const partnersStore = usePartnersStore()

// Fetch partners on mount
onMounted(() => {
  partnersStore.fetchPartners()
})

// Get sorted partners from store
const sortedPartners = computed(() => partnersStore.sortedPartners)
</script>
