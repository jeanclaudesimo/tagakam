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

    // Get API token for authentication
    const { getApiToken } = await import('~/server/utils/apiAuth')
    const token = await getApiToken(event)

    if (!token) {
      throw createError({
        statusCode: 500,
        message: 'API authentication failed - please configure API_LOGIN_EMAIL and API_LOGIN_PASSWORD'
      })
    }

    const config = useRuntimeConfig(event)
    const apiUrl = config.public.portalApiUrl as string

    // Daten an portal.digitalssolutions.de senden
    const response = await $fetch(`${apiUrl}/contact/submit`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: {
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
