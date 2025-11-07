<template>
  <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image with overlay -->
    <div class="absolute inset-0">
      <img
        :src="headerImage"
        alt="TaGaKaM&Co Header"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-br from-primary-900/70 via-primary-900/60 to-black/70"></div>
      <!-- Animated background patterns for depth -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style="animation-delay: 2s"></div>
        <div class="absolute bottom-1/4 left-1/3 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style="animation-delay: 4s"></div>
      </div>
    </div>

    <div class="relative z-10 container mx-auto px-4 py-32">
      <div class="text-center mb-16 animate-fade-in">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-down">
          Willkommen bei <span class="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">TaGaKaM&Co</span>
        </h1>
        <p class="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto animate-slide-up">
          Ihr Business Partner Spezialist für maßgeschneiderte Lösungen in Technologie, Immobilien und Reisen
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style="animation-delay: 0.2s">
          <a href="#services" class="btn-primary text-lg px-8 py-4">
            Unsere Services
          </a>
          <a href="#contact" class="btn-outline bg-white/10 border-white text-white hover:bg-white hover:text-blue-900 text-lg px-8 py-4">
            Kontakt aufnehmen
          </a>
        </div>
      </div>

      <!-- Service Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl animate-slide-up"
          :style="`animation-delay: ${0.3 + index * 0.1}s`"
        >
          <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
            <Icon :name="service.icon" class="text-3xl text-white" />
          </div>
          <h3 class="text-xl font-bold text-white mb-3">{{ service.title }}</h3>
          <p class="text-primary-100">{{ service.description }}</p>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <a href="#about" class="flex flex-col items-center text-white/70 hover:text-white transition-colors">
        <span class="text-sm mb-2">Mehr erfahren</span>
        <Icon name="mdi:chevron-down" class="text-3xl" />
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useServicesStore } from '~/stores/services'
import headerImage from '~/assets/images/header/header.5ab36199.webp'

const servicesStore = useServicesStore()
const services = computed(() => servicesStore.activeServices.slice(0, 3))
</script>
