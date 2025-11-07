export default defineNuxtPlugin(async () => {
  const configStore = useConfigStore()
  const servicesStore = useServicesStore()
  const teamStore = useTeamStore()
  const faqStore = useFaqStore()

  // Load all data - this runs on both server and client
  await Promise.all([
    configStore.fetchConfig(),
    servicesStore.fetchServices(),
    teamStore.fetchTeam(),
    faqStore.fetchFaqs()
  ])
})
