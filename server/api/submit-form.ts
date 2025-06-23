export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const config = useRuntimeConfig()

  const response = await fetch(config.apiUrl, {
    method: 'POST',
    headers: {
      'serviceProvider': 'P10',
      'productName': 'ClinicalTrialMicrosite',
      'serviceType': 'LeadGen',
      'serviceName': 'Survey',
      'x-api-key': config.apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const result = await response.json()

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: result.message || 'API submission failed',
    })
  }

  return result
})