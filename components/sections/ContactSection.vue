<template>
  <section id="contact" class="py-20 bg-gradient-to-b from-gray-50 to-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="section-title">
          Nehmen Sie <span class="gradient-text">Kontakt</span> mit uns auf
        </h2>
        <p class="section-subtitle">
          Wir freuen uns auf Ihre Nachricht und helfen Ihnen gerne weiter
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <!-- Contact Info -->
        <div class="space-y-6">
          <div
            v-for="(info, index) in contactInfo"
            :key="index"
            class="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="flex-shrink-0">
              <div class="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <Icon :name="info.icon" class="text-2xl text-white" />
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ info.title }}</h3>
              <div v-if="info.link">
                <a :href="info.link" class="text-gray-600 hover:text-primary-600 transition-colors">
                  {{ info.text }}
                </a>
              </div>
              <div v-else class="text-gray-600 whitespace-pre-line">
                {{ info.text }}
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="p-6 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl">
            <h3 class="text-xl font-bold text-white mb-4">Folgen Sie uns</h3>
            <div class="flex space-x-4">
              <a href="#" class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                <Icon name="mdi:twitter" class="text-2xl text-white" />
              </a>
              <a href="#" class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                <Icon name="mdi:facebook" class="text-2xl text-white" />
              </a>
              <a href="#" class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                <Icon name="mdi:instagram" class="text-2xl text-white" />
              </a>
              <a href="#" class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                <Icon name="mdi:linkedin" class="text-2xl text-white" />
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Vollständiger Name *</label>
              <input
                v-model="form.name"
                type="text"
                id="name"
                required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 outline-none transition-all"
                placeholder="Max Mustermann"
              >
            </div>

            <div>
              <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">E-Mail-Adresse *</label>
              <input
                v-model="form.email"
                type="email"
                id="email"
                required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 outline-none transition-all"
                placeholder="max@beispiel.de"
              >
            </div>

            <div>
              <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">Telefonnummer</label>
              <input
                v-model="form.phone"
                type="tel"
                id="phone"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 outline-none transition-all"
                placeholder="+49 123 456789"
              >
            </div>

            <div>
              <label for="subject" class="block text-sm font-semibold text-gray-700 mb-2">Betreff *</label>
              <input
                v-model="form.subject"
                type="text"
                id="subject"
                required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 outline-none transition-all"
                placeholder="Betreff Ihrer Nachricht"
              >
            </div>

            <div>
              <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">Nachricht *</label>
              <textarea
                v-model="form.message"
                id="message"
                rows="5"
                required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 outline-none transition-all resize-none"
                placeholder="Ihre Nachricht..."
              ></textarea>
            </div>

            <!-- Honeypot field - versteckt für echte Benutzer, sichtbar für Bots -->
            <div class="hidden" aria-hidden="true">
              <label for="website">Website (bitte leer lassen)</label>
              <input
                v-model="form.honeypot"
                type="text"
                id="website"
                name="website"
                tabindex="-1"
                autocomplete="off"
              >
            </div>

            <div class="flex items-start space-x-2">
              <input
                v-model="form.consent"
                type="checkbox"
                id="consent"
                required
                class="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-primary-500"
              >
              <label for="consent" class="text-sm text-gray-600">
                Ich stimme der Verarbeitung der gesammelten Daten im Rahmen der Geschäftsbeziehung zu. *
              </label>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full btn-primary py-4 text-lg flex items-center justify-center space-x-2"
              :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
            >
              <Icon v-if="isSubmitting" name="mdi:loading" class="animate-spin text-2xl" />
              <span>{{ isSubmitting ? 'Wird gesendet...' : 'Nachricht senden' }}</span>
            </button>
          </form>

          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
          >
            <div v-if="submitMessage" class="mt-4 p-4 rounded-lg" :class="submitSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
              {{ submitMessage }}
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useConfigStore } from '~/stores/config'

const configStore = useConfigStore()
const contact = computed(() => configStore.contact)

const contactInfo = computed(() => [
  {
    icon: 'mdi:map-marker',
    title: 'Adresse',
    text: `${contact.value?.address_line1 || 'Bergisch Gladbacher Str.427'}\n${contact.value?.postal_code || 'D-51067'} ${contact.value?.city || 'Köln'}\n${contact.value?.country || 'Deutschland'}`,
    link: null
  },
  {
    icon: 'mdi:phone',
    title: 'Telefon',
    text: contact.value?.phone || '0221 2981 3937',
    link: `tel:${(contact.value?.phone || '02212981393').replace(/\s/g, '')}`
  },
  {
    icon: 'mdi:email',
    title: 'E-Mail',
    text: contact.value?.email || 'info@tagakam.de',
    link: `mailto:${contact.value?.email || 'info@tagakam.de'}`
  }
])

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false,
  honeypot: '' // Bot-Schutz: Muss leer bleiben
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  submitMessage.value = ''

  try {
    // Bot-Schutz: Honeypot-Feld darf nicht ausgefüllt sein
    if (form.value.honeypot !== '') {
      console.warn('Bot detected: Honeypot field was filled')
      // Simuliere erfolgreiche Absendung für den Bot
      await new Promise(resolve => setTimeout(resolve, 1500))
      submitSuccess.value = true
      submitMessage.value = 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.'

      // Form zurücksetzen
      form.value = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        consent: false,
        honeypot: ''
      }
      return
    }

    // Sende Formulardaten an die API
    const response = await $fetch('/api/contact/submit', {
      method: 'POST',
      body: {
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        subject: form.value.subject,
        message: form.value.message
      }
    })

    submitSuccess.value = true
    submitMessage.value = 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.'

    // Reset form
    form.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      consent: false,
      honeypot: ''
    }
  } catch (error: any) {
    submitSuccess.value = false
    submitMessage.value = error.data?.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
