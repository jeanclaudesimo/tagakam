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

    // Get tenant API key from runtime config
    const config = useRuntimeConfig(event)
    const tenantKey = config.apiTenantKey

    if (!tenantKey) {
      throw createError({
        statusCode: 500,
        message: 'API_TENANT_KEY is not configured'
      })
    }

    // Daten an portal.digitalssolutions.de senden
    const response = await $fetch('https://portal.digitalssolutions.de/api/contact/submit', {
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
      }
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

    throw createError({
      statusCode: 500,
      message: 'Ein Fehler ist beim Senden Ihrer Nachricht aufgetreten. Bitte versuchen Sie es später erneut.'
    })
  }
})
