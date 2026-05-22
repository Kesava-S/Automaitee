export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
console.log(req);

  const { email, name, consultationId } = req.body || {}

  if (!email) {
    return res.status(400).json({ error: 'email is required' })
  }

  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  const resolvedPlanId = process.env.RAZORPAY_PLAN_ID

  if (!keyId || !keySecret) {
    return res.status(500).json({ error: 'Razorpay credentials not configured' })
  }

  if (!resolvedPlanId) {
    return res.status(500).json({ error: 'Razorpay plan ID not configured' })
  }

  const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64')

  try {
    const response = await fetch('https://api.razorpay.com/v1/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify({
        plan_id: resolvedPlanId,
        total_count: 12,
        quantity: 1,
        customer_notify: 0,
        notes: {
          name,
          email,
          consultationId: String(consultationId || ''),
        },
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      throw new Error(err.error?.description || `Razorpay error (${response.status})`)
    }

    const data = await response.json()
    return res.status(200).json({ subscription_id: data.id })
  } catch (err) {
    console.error('[create-subscription]', err.message)
    return res.status(500).json({ error: err.message })
  }
}
