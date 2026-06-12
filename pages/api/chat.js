export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL}/chatbot`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            throw new Error(`n8n responded with status ${response.status}`);
        }

        // Read as text first — n8n "Respond to Webhook" with text mode sends plain text
        const rawText = await response.text();

        // Try to parse as JSON, fallback to wrapping plain text
        let data;
        try {
            data = JSON.parse(rawText);
        } catch {
            // n8n returned plain text (e.g. {{ $json.output }} in text mode)
            data = { output: rawText };
        }

        res.status(200).json(data);

    } catch (error) {
        console.error("Proxy error:", error.message);
        res.status(500).json({ error: error.message });
    }
}