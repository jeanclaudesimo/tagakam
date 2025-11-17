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

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden flex flex-col"
        >
          <!-- Image -->
          <div class="relative h-48 overflow-hidden">
            <img
              :src="service.image"
              :alt="service.title"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-primary-600/80 to-transparent"></div>
            <!-- Icon on image -->
            <div class="absolute top-4 left-4">
              <div class="w-14 h-14 bg-white/95 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg">
                <Icon :name="service.icon" class="text-3xl text-primary-600" />
              </div>
            </div>
          </div>

          <!-- Content - Always visible -->
          <div class="flex-1 p-6 flex flex-col">
            <h3 class="text-2xl font-bold text-gray-900 mb-3">{{ service.title }}</h3>
            <p class="text-gray-700 leading-relaxed mb-4">{{ service.description }}</p>
            
            <!-- Liste des services détaillés - Always visible -->
            <div v-if="service.serviceItems && service.serviceItems.length > 0" class="flex-1">
              <ul class="list-disc list-inside space-y-2 text-sm text-gray-600">
                <li v-for="(item, itemIndex) in service.serviceItems" :key="itemIndex" class="leading-relaxed">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Hover overlay with detailed description -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary-600/95 to-secondary-600/95 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-y-auto">
            <div class="p-6 h-full flex flex-col">
              <div class="text-center mb-4">
                <Icon :name="service.icon" class="text-6xl text-white mb-4 mx-auto" />
                <h3 class="text-2xl font-bold text-white mb-3">{{ service.title }}</h3>
                <p class="text-white/90 mb-4 leading-relaxed">{{ service.detailedDescription }}</p>
              </div>
              <!-- Liste des services détaillés dans l'overlay -->
              <div v-if="service.serviceItems && service.serviceItems.length > 0" class="flex-1">
                <ul class="list-disc list-inside space-y-2 text-sm text-white/90 text-left max-w-md mx-auto">
                  <li v-for="(item, itemIndex) in service.serviceItems" :key="itemIndex" class="leading-relaxed">
                    {{ item }}
                  </li>
                </ul>
              </div>
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
