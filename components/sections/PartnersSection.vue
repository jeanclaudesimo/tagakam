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
          v-for="(partner, index) in partners"
          :key="index"
          class="group bg-white rounded-xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex items-center justify-center"
          :style="`animation-delay: ${index * 0.1}s`"
        >
          <div class="relative w-full h-24 flex items-center justify-center">
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
// Import Partner Logos
import shop365Logo from '~/assets/images/partner/365Shop.5039ddaf.webp'
import easyFlyLogo from '~/assets/images/partner/EasyFlyGloballogo.2f7da692.webp'
import tagakamLogo from '~/assets/images/partner/LogoFaTagakam&Co.3ca181ee.webp'
import logoRondLogo from '~/assets/images/partner/LogoRond.91bf44ec.webp'
import dreamHouseLogo from '~/assets/images/partner/NTDreamHouse.123ddd8c.webp'
import globalTransitLogo from '~/assets/images/partner/NTGlobalTransit.b8d58dfc.webp'
import locatorLogo from '~/assets/images/partner/NTLocator.bcc93d0d.webp'

// Partner-Logos
const partners = [
  {
    name: 'NT Global Transit',
    logo: globalTransitLogo
  },
  {
    name: '365 Shop & Services',
    logo: shop365Logo
  },
  {
    name: 'Easy Fly Global',
    logo: easyFlyLogo
  },
  {
    name: 'NT Dream House',
    logo: dreamHouseLogo
  },
  {
    name: 'NT Locator',
    logo: locatorLogo
  },
  {
    name: 'TaGaKaM & Co',
    logo: tagakamLogo
  },
  {
    name: 'Logo Rond',
    logo: logoRondLogo
  }
]
</script>
