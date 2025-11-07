<template>
  <div>
    <NuxtRouteAnnouncer />
    <TheHeader />
    <main>
      <SectionsHeroSection />
      <SectionsAboutSection />
      <SectionsServicesSection />
      <SectionsTeamSection />
      <SectionsPartnersSection />
      <SectionsFaqSection />
      <SectionsContactSection />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useConfigStore } from '~/stores/config'
import { useServicesStore } from '~/stores/services'
import { useTeamStore } from '~/stores/team'
import { useFaqStore } from '~/stores/faq'

const configStore = useConfigStore()
const servicesStore = useServicesStore()
const teamStore = useTeamStore()
const faqStore = useFaqStore()

// Load all data on app mount
onMounted(async () => {
  await Promise.all([
    configStore.fetchConfig(),
    servicesStore.fetchServices(),
    teamStore.fetchTeam(),
    faqStore.fetchFaqs()
  ])
})
</script>
