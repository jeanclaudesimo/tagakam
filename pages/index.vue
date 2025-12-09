<template>
  <div>
    <SectionsHeroSection />
    <SectionsAboutSection />
    <SectionsServicesSection />
    <ClientOnly>
      <SectionsTeamSection />
    </ClientOnly>
    <SectionsPartnersSection />
    <SectionsFaqSection />
    <SectionsContactSection />
  </div>
</template>

<script setup lang="ts">
// SEO Meta Tags für Hauptseite
useHead({
  title: 'TaGaKaM&Co - Ihr Business Partner Spezialist',
  meta: [
    { name: 'description', content: 'TaGaKaM&Co - Ihr vertrauenswürdiger Spezialist für maßgeschneiderte Business-Partnerschaften in den Bereichen Technologie, Immobilien und Reisen.' }
  ]
})
</script>
