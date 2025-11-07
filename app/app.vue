<template>
  <div>
    <NuxtRouteAnnouncer />
    <TheHeader />
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <FaqSection />
      <ContactSection />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useConfigStore } from '~/stores/config'

const configStore = useConfigStore()

// Load configuration on app mount
onMounted(async () => {
  await configStore.fetchConfig()
})
</script>
