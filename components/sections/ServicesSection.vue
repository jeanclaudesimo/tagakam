<template>
  <section id="services" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="section-title">
          Warum <span class="gradient-text">TaGaKaM&Co</span>?
        </h2>
        <p class="section-subtitle">
          Durch unsere vielseitige Expertise und unser Engagement bieten wir Ihnen Lösungen, die genau auf Ihre Bedürfnisse zugeschnitten sind. Vertrauen Sie auf unser Know-how, um Ihre geschäftlichen Herausforderungen zu meistern.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
        >
          <!-- Image -->
          <div class="relative h-64 overflow-hidden">
            <img
              :src="service.image"
              :alt="service.title"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>

          <!-- Content -->
          <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div class="flex items-center space-x-3 mb-3">
              <div class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                <Icon :name="service.icon" class="text-2xl" />
              </div>
              <h3 class="text-2xl font-bold">{{ service.title }}</h3>
            </div>
            <p class="text-white/90 leading-relaxed">{{ service.description }}</p>
          </div>

          <!-- Hover overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-secondary-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div class="text-center p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <Icon :name="service.icon" class="text-6xl text-white mb-4 mx-auto" />
              <h3 class="text-2xl font-bold text-white mb-3">{{ service.title }}</h3>
              <p class="text-white/90">{{ service.detailedDescription }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useServicesStore } from '~/stores/services'

const servicesStore = useServicesStore()
const services = computed(() => servicesStore.activeServices)
</script>
