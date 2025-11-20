export default defineNuxtPlugin(async () => {
  const configStore = useConfigStore()
  const servicesStore = useServicesStore()
  const teamStore = useTeamStore()
  const faqStore = useFaqStore()

  // Fetch all data on app initialization
  await Promise.all([
    configStore.fetchConfig(),
    servicesStore.fetchServices(),
    teamStore.fetchTeam(),
    faqStore.fetchFaqs()
  ])
})
