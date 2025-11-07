<template>
  <section id="faq" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="section-title">
          Häufig gestellte <span class="gradient-text">Fragen</span>
        </h2>
        <p class="section-subtitle">
          Wir wissen, dass bei der Auswahl eines zuverlässigen Partners viele Fragen aufkommen können. Hier finden Sie Antworten auf die häufigsten Fragen.
        </p>
      </div>

      <div class="max-w-3xl mx-auto space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-start space-x-4 flex-1">
              <div class="flex-shrink-0 mt-1">
                <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <Icon name="mdi:help-circle" class="text-white text-xl" />
                </div>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 pr-8">{{ faq.question }}</h3>
            </div>
            <Icon
              :name="openFaq === index ? 'mdi:chevron-up' : 'mdi:chevron-down'"
              class="text-2xl text-primary-600 flex-shrink-0 transition-transform duration-300"
              :class="{ 'rotate-180': openFaq === index }"
            />
          </button>

          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-96 opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="max-h-96 opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div v-show="openFaq === index" class="px-6 pb-6">
              <div class="pl-12 text-gray-600 leading-relaxed">
                {{ faq.answer }}
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFaqStore } from '~/stores/faq'

const faqStore = useFaqStore()
const faqs = computed(() => faqStore.activeFaqs)

const openFaq = ref<number | null>(0)

const toggleFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? null : index
}
</script>
