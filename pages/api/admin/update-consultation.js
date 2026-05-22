const SERVICE_ENDPOINTS = {
  'book-consultation': 'book-consultation',
  'book-silentchurn': 'book-silentchurn',
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const webhookBase = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
  if (!webhookBase) {
    return res.status(500).json({ error: 'Webhook URL not configured' })
  }

  const username = req.headers['x-admin-user'] || ''
  const token = req.headers['x-admin-token'] || ''

  const { rowNumber, name, email, phone, company, bookingDate, bookingTime, duration, companyName, exp, status, service } = req.body || {}

  if (!rowNumber || !status || !service) {
    return res.status(400).json({ error: 'rowNumber, status and service are required' })
  }

  const endpoint = SERVICE_ENDPOINTS[service]
  if (!endpoint) {
    return res.status(400).json({ error: `Unknown service: ${service}` })
  }

  try {
    const response = await fetch(`${webhookBase}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-user': username,
        'x-admin-token': token,
      },
      body: JSON.stringify({ rowNumber, name, email, phone, company, bookingDate, bookingTime, duration, companyName, exp, status, service }),
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
    console.error(`[admin/update-consultation] ${endpoint} failed:`, err.message)
    return res.status(500).json({ error: 'Failed to update consultation', details: err.message })
  }
}
