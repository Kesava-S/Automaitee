export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const webhookBase = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
  if (!webhookBase) {
    return res.status(500).json({ error: 'Webhook URL not configured' })
  }

  const username = req.headers['x-admin-user'] || ''
  const token = req.headers['x-admin-token'] || ''

  const serviceEndpoints = {
    'book-consultation': 'fetch-consultation',
    'book-silentchurn': 'fetch-silentchurn',
  }

  const service = req.query.service || 'book-consultation'
  const endpoint = serviceEndpoints[service]

  if (!endpoint) {
    return res.status(400).json({ error: `Unknown service: ${service}` })
  }  

  try {
    const response = await fetch(`${webhookBase}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-user': username,
        'x-admin-token': token,
      },
    })

    if (response.status === 401) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (!response.ok) {
      throw new Error(`n8n responded with ${response.status}`)
    }

    const data = await response.json()
    return res.status(200).json(data)
  } catch (err) {
    console.error(`[admin/consultations] ${endpoint} failed:`, err.message)
    return res.status(500).json({ error: 'Failed to fetch consultations', details: err.message })
  }
}
