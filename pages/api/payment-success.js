import crypto from 'crypto'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const {
    razorpay_payment_id,
    razorpay_subscription_id,
    razorpay_signature,
    // token payload fields
    name, email, phone, company, companyName,
    consultationId, bookingDate, bookingTime, duration,
  } = req.body || {}

  if (!razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing Razorpay payment fields' })
  }

  // Verify Razorpay signature
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keySecret) {
    return res.status(500).json({ error: 'Razorpay secret not configured' })
  }

  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
    .digest('hex')

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ error: 'Invalid payment signature' })
  }

  // Notify n8n
  const webhookBase = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
  if (webhookBase) {
    try {
      await fetch(`${webhookBase}/payment-success`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_payment_id,
          razorpay_subscription_id,
          name,
          email,
          phone,
          company: company || companyName,
          consultationId,
          bookingDate,
          bookingTime,
          duration,
          paidAt: new Date().toISOString(),
        }),
      })
    } catch (err) {
      // Non-fatal — payment is confirmed, n8n notification failure shouldn't block the user
      console.error('[payment-success] n8n notification failed:', err.message)
    }
  }

  return res.status(200).json({ success: true })
}
