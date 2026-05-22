export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  

  const { username, password } = req.body || {}

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' })
  }

  const webhookBase = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL

  try {
    const verifyRes = await fetch(`${webhookBase}/verify-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    const verifyData = await verifyRes.json()
    
    const verified = verifyRes.ok && (verifyData.verified === true || verifyData.success === true)

    if (!verified) {
      return res.status(401).json({
        success: false,
        message: verifyData.message || 'Invalid username or password',
      })
    }

    // Return n8n token to client for future verified requests
    return res.status(200).json({ success: true, username, token: verifyData.token || null })
  } catch (err) {
    // n8n unreachable — fall back to local env var credentials
    console.warn('[admin/login] verify-admin unreachable, using local fallback:', err.message)
    const adminUsername = process.env.ADMIN_USERNAME || 'admin'
    const adminPassword = process.env.ADMIN_PASSWORD || 'automaitee2026'
    if (username === adminUsername && password === adminPassword) {
      return res.status(200).json({ success: true, username, token: null })
    }
    return res.status(401).json({ success: false, message: 'Invalid username or password' })
  }
}
