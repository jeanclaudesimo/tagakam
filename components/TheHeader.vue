<template>
  <header class="fixed w-full top-0 z-50 transition-all duration-300" :class="{ 'bg-white/95 backdrop-blur-md shadow-lg': isScrolled, 'bg-transparent': !isScrolled }">
    <!-- Top Bar -->
    <div v-if="!isScrolled" class="bg-gradient-to-r from-secondary-800 to-secondary-900 text-white py-2">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center text-sm">
          <div class="flex items-center space-x-6">
            <a :href="`mailto:${contact?.email || 'info@tagakam.de'}`" class="flex items-center space-x-2 hover:text-primary-200 transition-colors">
              <Icon name="mdi:email" class="text-lg" />
              <span>{{ contact?.email || 'info@tagakam.de' }}</span>
            </a>
            <a :href="`tel:${contact?.phone || '02212981393'}`" class="flex items-center space-x-2 hover:text-primary-200 transition-colors">
              <Icon name="mdi:phone" class="text-lg" />
              <span>{{ contact?.phone || '0221 2981 3937' }}</span>
            </a>
          </div>
          <div class="hidden md:flex items-center space-x-4">
            <a href="#" class="hover:text-primary-200 transition-colors" aria-label="Twitter">
              <Icon name="mdi:twitter" class="text-lg" />
            </a>
            <a href="#" class="hover:text-primary-200 transition-colors" aria-label="Facebook">
              <Icon name="mdi:facebook" class="text-lg" />
            </a>
            <a href="#" class="hover:text-primary-200 transition-colors" aria-label="Instagram">
              <Icon name="mdi:instagram" class="text-lg" />
            </a>
            <a href="#" class="hover:text-primary-200 transition-colors" aria-label="LinkedIn">
              <Icon name="mdi:linkedin" class="text-lg" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation -->
    <nav class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <a href="#home" class="flex items-center group">
          <div class="bg-white rounded-lg px-3 py-2 shadow-md transform group-hover:scale-105 transition-all duration-300 group-hover:shadow-lg">
            <img
              :src="logo"
              alt="TaGaKaM&Co Logo"
              class="h-12 w-auto object-contain"
            >
          </div>
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <a
            v-for="item in menuItems"
            :key="item.href"
            :href="item.href"
            class="font-medium transition-colors hover:text-primary-600"
            :class="isScrolled ? 'text-gray-700' : 'text-white'"
          >
            {{ item.label }}
          </a>
          <a
            href="#contact"
            class="btn-primary"
          >
            Kontakt
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-lg"
          :class="isScrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'"
          aria-label="Toggle menu"
        >
          <Icon :name="mobileMenuOpen ? 'mdi:close' : 'mdi:menu'" class="text-2xl" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="mobileMenuOpen"
          class="md:hidden mt-4 py-4 space-y-3 bg-white rounded-lg shadow-xl border border-gray-100"
        >
          <a
            v-for="item in menuItems"
            :key="item.href"
            :href="item.href"
            @click="mobileMenuOpen = false"
            class="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
          >
            {{ item.label }}
          </a>
          <a
            href="#contact"
            @click="mobileMenuOpen = false"
            class="block mx-4 px-4 py-2 bg-primary-600 text-white text-center rounded-lg hover:bg-primary-700 transition-colors"
          >
            Kontakt
          </a>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useConfigStore } from '~/stores/config'
import logo from '~/assets/logo/LogoFaTagakam&Co.jpeg'

const configStore = useConfigStore()
const contact = computed(() => configStore.contact)

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const menuItems = [
  { label: 'Willkommen', href: '#home' },
  { label: 'Über uns', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Partner', href: '#partners' },
  { label: 'FAQ', href: '#faq' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
