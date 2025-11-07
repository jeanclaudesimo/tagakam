<template>
  <section id="about" class="py-20 bg-gradient-to-b from-white to-gray-50">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Image Side -->
        <div class="relative group">
          <div class="absolute -inset-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl"></div>
          <div class="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
              alt="Über uns"
              class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
            >
          </div>
        </div>

        <!-- Content Side -->
        <div>
          <h2 class="section-title mb-6">
            Über uns – <span class="gradient-text">TaGaKaM&Co</span>
          </h2>
          <p class="text-lg text-gray-700 mb-6 leading-relaxed">
            Willkommen bei <strong>TaGaKaM&Co</strong>, Ihrem vertrauenswürdigen Spezialisten für maßgeschneiderte Business-Partnerschaften. Mit jahrelanger Erfahrung bieten wir Ihnen innovative Lösungen in den Bereichen Technologie, Immobilien und Reisen.
          </p>
          <p class="text-lg text-gray-700 mb-8 leading-relaxed">
            Unser Ziel ist es, Ihre geschäftlichen Bedürfnisse zu verstehen und Ihnen maßgeschneiderte Dienstleistungen anzubieten, die Ihre Effizienz steigern und Ihre Ziele unterstützen.
          </p>

          <div class="space-y-4">
            <div
              v-for="(service, index) in services"
              :key="index"
              class="flex items-start space-x-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <Icon :name="service.icon" class="text-2xl text-white" />
                </div>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ service.title }}</h3>
                <p class="text-gray-600">{{ service.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const services = [
  {
    icon: 'mdi:radar',
    title: 'NT LOCATOR',
    description: 'Wir bieten professionelle GPS-Installationen und moderne Videoüberwachungslösungen für maximale Sicherheit.'
  },
  {
    icon: 'mdi:home',
    title: 'NT DREAM HOUSE',
    description: 'Unser Immobilienservice hilft Ihnen bei der Suche, dem Kauf und der Vermietung von Immobilien.'
  },
  {
    icon: 'mdi:airplane',
    title: 'Easy Fly Global',
    description: 'Easy Fly Global begleitet Sie auf Ihren Geschäftsreisen, Kreuzfahrten und Aufenthalten.'
  }
]
</script>
