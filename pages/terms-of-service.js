import Head from 'next/head'

export default function TermsOfService() {
    return (
        <>
            <Head>
                <title>Terms of Service | Kondamaal Automations</title>
            </Head>

            <div className="container" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem' }}>Terms of Service</h1>

                <div style={{ maxWidth: '800px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                    <p style={{ marginBottom: '1.5rem' }}>Last Updated: {new Date().toLocaleDateString()}</p>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>1. Agreement to Terms</h2>
                        <p>By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with these terms, you are prohibited from using or accessing this site or using any other services provided by Kondamaal Automations.</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>2. Use License</h2>
                        <p>Permission is granted to temporarily download one copy of the materials (information or software) on Kondamaal Automations' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                            <li>modify or copy the materials;</li>
                            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                            <li>attempt to decompile or reverse engineer any software contained on Kondamaal Automations' website;</li>
                            <li>remove any copyright or other proprietary notations from the materials; or</li>
                            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>3. Disclaimer</h2>
                        <p>The materials on Kondamaal Automations' website are provided on an 'as is' basis. Kondamaal Automations makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>4. Limitations</h2>
                        <p>In no event shall Kondamaal Automations or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Kondamaal Automations' website, even if Kondamaal Automations or a Kondamaal Automations authorized representative has been notified orally or in writing of the possibility of such damage.</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>5. Governing Law</h2>
                        <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
                    </section>
                </div>
            </div>
        </>
    )
}
