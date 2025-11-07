<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- Company Info -->
        <div>
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">T</span>
            </div>
            <span class="text-xl font-bold text-white">TaGaKaM<span class="text-primary-500">&Co</span></span>
          </div>
          <p class="text-sm mb-4">
            {{ contact?.address_line1 || 'Bergisch Gladbacher Str.427' }}<br>
            {{ contact?.postal_code || 'D-51067' }} {{ contact?.city || 'Köln' }}<br>
            {{ contact?.country || 'Deutschland' }}
          </p>
          <div class="space-y-2 text-sm">
            <a :href="`tel:${contact?.phone || '02212981393'}`" class="flex items-center space-x-2 hover:text-primary-400 transition-colors">
              <Icon name="mdi:phone" />
              <span>{{ contact?.phone || '0221 2981 3937' }}</span>
            </a>
            <a :href="`mailto:${contact?.email || 'info@tagakam.de'}`" class="flex items-center space-x-2 hover:text-primary-400 transition-colors">
              <Icon name="mdi:email" />
              <span>{{ contact?.email || 'info@tagakam.de' }}</span>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-semibold text-lg mb-4">Nützliche Links</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#home" class="hover:text-primary-400 transition-colors">Willkommen</a></li>
            <li><a href="#about" class="hover:text-primary-400 transition-colors">Über uns</a></li>
            <li><a href="#services" class="hover:text-primary-400 transition-colors">Services</a></li>
            <li><a href="#team" class="hover:text-primary-400 transition-colors">Team</a></li>
            <li><a href="#contact" class="hover:text-primary-400 transition-colors">Kontakt</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="text-white font-semibold text-lg mb-4">Legal</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-primary-400 transition-colors">Datenschutz</a></li>
            <li><a href="#" class="hover:text-primary-400 transition-colors">Impressum</a></li>
            <li><a href="#" class="hover:text-primary-400 transition-colors">AGB</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h4 class="text-white font-semibold text-lg mb-4">Newsletter</h4>
          <p class="text-sm mb-4">Bleiben Sie auf dem Laufenden mit unseren neuesten Updates.</p>
          <form @submit.prevent="handleNewsletterSubmit" class="space-y-2">
            <input
              v-model="newsletterEmail"
              type="email"
              placeholder="Ihre E-Mail"
              required
              class="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-white placeholder-gray-400"
            >
            <button type="submit" class="w-full btn-primary">
              Abonnieren
            </button>
          </form>
        </div>
      </div>

      <!-- Social Links -->
      <div class="flex justify-center items-center space-x-6 py-6 border-t border-gray-800">
        <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary-600 transition-colors" aria-label="Twitter">
          <Icon name="mdi:twitter" class="text-xl" />
        </a>
        <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary-600 transition-colors" aria-label="Facebook">
          <Icon name="mdi:facebook" class="text-xl" />
        </a>
        <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary-600 transition-colors" aria-label="Instagram">
          <Icon name="mdi:instagram" class="text-xl" />
        </a>
        <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary-600 transition-colors" aria-label="LinkedIn">
          <Icon name="mdi:linkedin" class="text-xl" />
        </a>
      </div>

      <!-- Copyright -->
      <div class="text-center text-sm pt-6 border-t border-gray-800">
        <p>© {{ new Date().getFullYear() }} <span class="text-white font-semibold">TaGaKaM&Co</span>. Alle Rechte vorbehalten.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useConfigStore } from '~/stores/config'

const configStore = useConfigStore()
const contact = computed(() => configStore.contact)

const newsletterEmail = ref('')

const handleNewsletterSubmit = () => {
  // Newsletter submission logic here
  console.log('Newsletter subscription for:', newsletterEmail.value)
  newsletterEmail.value = ''
  alert('Vielen Dank für Ihre Anmeldung!')
}
</script>
