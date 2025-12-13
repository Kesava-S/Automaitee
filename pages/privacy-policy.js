import Head from 'next/head'

export default function PrivacyPolicy() {
    return (
        <>
            <Head>
                <title>Privacy Policy | Kondamaal Automations</title>
            </Head>

            <div className="container" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem' }}>Privacy Policy</h1>

                <div style={{ maxWidth: '800px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                    <p style={{ marginBottom: '1.5rem' }}>Last Updated: {new Date().toLocaleDateString()}</p>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>1. Introduction</h2>
                        <p>Kondamaal Automations ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>2. Data We Collect</h2>
                        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>3. How We Use Your Data</h2>
                        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal or regulatory obligation.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>4. Data Security</h2>
                        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>5. Contact Us</h2>
                        <p>If you have any questions about this privacy policy or our privacy practices, please contact us at: support@kondamaal.com</p>
                    </section>
                </div>
            </div>
        </>
    )
}
