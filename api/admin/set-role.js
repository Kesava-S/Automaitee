const admin = require('../../lib/firebaseAdmin');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Missing Authorization header' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);

        // Check if caller is authorized to set roles
        // Allow if caller has 'owner' role OR matches a specific OWNER_EMAIL env var (for bootstrapping)
        const isOwner = decodedToken.role === 'owner';
        const isSuperAdmin = process.env.OWNER_EMAIL && decodedToken.email === process.env.OWNER_EMAIL;

        if (!isOwner && !isSuperAdmin) {
            return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
        }

        const { targetUid, role } = req.body;
        if (!targetUid || !role) {
            return res.status(400).json({ error: 'Missing targetUid or role' });
        }

        const validRoles = ['owner', 'admin', 'manager', 'employee', 'client'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }

        await admin.auth().setCustomUserClaims(targetUid, { role });

        // Also update Firestore user document if it exists, to keep it in sync for UI
        // (Optional, but good for consistency if the app reads from Firestore)
        try {
            await admin.firestore().collection('users').doc(targetUid).set({ role }, { merge: true });
        } catch (fsError) {
            console.warn('Failed to sync role to Firestore:', fsError);
        }

        res.status(200).json({ message: `Role ${role} assigned to user ${targetUid}` });

    } catch (error) {
        console.error('Error setting role:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
