export default defineEventHandler(async (event) => {
  try {
    // Formulardaten aus dem Request lesen
    const body = await readBody(event)

    const { name, email, phone, subject, message, honeypot } = body

    // Bot-Schutz: Honeypot-Feld darf nicht ausgefüllt sein
    if (honeypot && honeypot !== '') {
      console.warn('Bot detected: Honeypot field was filled')
      // Gib Erfolg zurück, aber sende keine E-Mail
      return {
        success: true,
        message: 'Ihre Nachricht wurde erfolgreich gesendet.'
      }
    }

    // Validierung
    if (!name || !email || !subject || !message) {
      throw createError({
        statusCode: 400,
        message: 'Bitte füllen Sie alle Pflichtfelder aus.'
      })
    }

    const config = useRuntimeConfig(event)
    const apiUrl = config.public.portalApiUrl as string
    const tenantKey = config.apiTenantKey || config.public.portalApiKey

    if (!tenantKey) {
      throw createError({
        statusCode: 500,
        message: 'API_TENANT_KEY is not configured'
      })
    }

    // Daten an portal.digitalssolutions.de senden
    // Le portal attend tenant_key dans le body selon l'exemple curl
    const response = await $fetch(`${apiUrl}/contact/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        tenant_key: tenantKey,
        name,
        email,
        phone: phone || '',
        subject,
        message
      },
      timeout: 15000, // 15 secondes timeout
      retry: 1, // Retry une fois en cas d'échec
      retryDelay: 1000 // Attendre 1 seconde avant le retry
    })

    return {
      success: true,
      message: 'Ihre Nachricht wurde erfolgreich gesendet.',
      data: response
    }
  } catch (error: any) {
    console.error('Contact form error:', error)

    // Fehlerbehandlung
    if (error.statusCode === 400) {
      throw createError({
        statusCode: 400,
        message: error.message || 'Ungültige Formulardaten.'
      })
    }

    // Log détaillé pour le débogage
    const status = error.statusCode || error.status || 500
    const message = error.message || error.data?.message || 'Ein Fehler ist beim Senden Ihrer Nachricht aufgetreten. Bitte versuchen Sie es später erneut.'

    console.error('[Contact API] Error details:', {
      status,
      message,
      details: error.data || error,
      url: error.url
    })

    throw createError({
      statusCode: status,
      message: message
    })
  }
})
