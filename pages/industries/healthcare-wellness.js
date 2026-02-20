import Head from 'next/head'
import Link from 'next/link'

export default function HealthcareWellnessAutomation() {
    return (
        <>
            <Head>
                <title>Healthcare & Wellness Automation Solutions | Automaitee</title>
                <meta name="description" content="Streamline clinic, dental, physiotherapy, and wellness operations with custom automation. Automate appointments, EHR, billing, inventory, and telehealth workflows with Automaitee." />
            </Head>

            <div style={{ paddingTop: '120px', paddingBottom: '80px' }}>
                <div className="container">
                    <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', display: 'inline-block' }}>
                        ← Back to Home
                    </Link>

                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: '700', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                        Enhance Patient Care with Intelligent Automation
                    </h1>

                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '900px', lineHeight: '1.6', marginBottom: '2rem' }}>
                        Healthcare and wellness businesses face complex regulatory requirements, high administrative workloads, and patient care demands. Automaitee helps clinics, dental practices, physiotherapy centres, and wellness studios automate routine tasks, improve patient experience, and maintain compliance, allowing your staff to focus on what matters most: patient care.
                    </p>

                    <div style={{ marginBottom: '4rem', padding: '2rem', background: '#f8f9fa', borderRadius: '16px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1.5rem' }}>Why Healthcare Businesses Need Automation</h2>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: '#0071e3', fontSize: '1.2rem' }}>✓</span> Manual appointment scheduling and patient follow-ups are time-consuming and error-prone</li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: '#0071e3', fontSize: '1.2rem' }}>✓</span> Administrative tasks like billing, insurance claims, and record-keeping increase overhead</li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: '#0071e3', fontSize: '1.2rem' }}>✓</span> Inventory mismanagement can disrupt care delivery</li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: '#0071e3', fontSize: '1.2rem' }}>✓</span> Automation ensures regulatory compliance and operational consistency</li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: '#0071e3', fontSize: '1.2rem' }}>✓</span> Improves patient satisfaction through timely communication and accurate records</li>
                        </ul>
                    </div>

                    <h2 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '2rem' }}>Automation Opportunities in Healthcare & Wellness</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>1. Appointment Scheduling & Reminders</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Automated booking confirmations via SMS, WhatsApp, or email</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Reminder notifications reduce no-shows</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Integration with calendars and patient management systems</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>2. Electronic Health Record (EHR) Management</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Automated patient record creation, updates, and secure storage</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Trigger workflows for follow-ups, prescriptions, and lab results</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Maintain HIPAA/GDPR compliance with audit-ready logs</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>3. Billing & Insurance Claims Processing</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Generate invoices automatically based on appointments or treatments</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Streamline insurance claim submissions and tracking</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Reduce errors and administrative delays</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>4. Inventory & Supplies Tracking</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Monitor stock of medications, PPE, and consumables</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Auto-generate purchase orders or alerts for low stock</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Track expiry dates and manage reorder schedules</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>5. Telehealth & Remote Consultation Workflows</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Automate patient intake for virtual visits</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Schedule teleconsultations and send automated reminders</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Follow-up messages post-consultation for patient care</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1.5rem' }}>Practical Benefits You’ll See</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Faster appointment scheduling</strong> → reduced no-shows and improved patient flow</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Less administrative burden</strong> → staff focus on patient care</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Accurate billing and claims</strong> → fewer errors, faster reimbursements</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Optimized inventory</strong> → lower waste and better supply management</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Improved patient experience</strong> → automated reminders, follow-ups, and personalized communication</li>
                            </ul>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1.5rem' }}>Example Healthcare Businesses We Serve</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.75rem' }}>⚕️ Small clinics and dental practices</li>
                                <li style={{ marginBottom: '0.75rem' }}>💆‍♀️ Physiotherapy centres and wellness studios</li>
                                <li style={{ marginBottom: '0.75rem' }}>💻 Telehealth providers and remote care services</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '2rem', textAlign: 'center' }}>How Automaitee Works</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>1. Consultation</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>Understand clinic workflows, patient touchpoints, and regulatory needs</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>2. Design</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>Tailored workflow mapping for appointments, EHR, billing, and inventory</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>3. Implementation</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>Integrate with practice management software, calendars, EHR systems, and telehealth platforms</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>4. Optimization</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>Monitor automations, provide support, and refine workflows for efficiency</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '5rem', background: 'white', border: '1px solid var(--card-border)', borderRadius: '16px', overflow: 'hidden' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '600', padding: '2rem', borderBottom: '1px solid var(--card-border)', margin: 0 }}>Why Choose Automaitee Over DIY Tools?</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                            <div style={{ padding: '2rem', background: '#f8f9fa' }}>
                                <h3 style={{ fontSize: '1.2rem', color: '#86868b', marginBottom: '1.5rem' }}>DIY Tools (Zapier, Make)</h3>
                                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                    <li style={{ marginBottom: '1rem' }}>❌ Requires setup & maintenance</li>
                                    <li style={{ marginBottom: '1rem' }}>❌ Limited customization</li>
                                    <li style={{ marginBottom: '1rem' }}>❌ Pay-per-task pricing</li>
                                    <li style={{ marginBottom: '1rem' }}>❌ Generic automation</li>
                                    <li style={{ marginBottom: '1rem' }}>❌ Tool only</li>
                                </ul>
                            </div>
                            <div style={{ padding: '2rem', borderLeft: '1px solid var(--card-border)' }}>
                                <h3 style={{ fontSize: '1.2rem', color: '#0071e3', marginBottom: '1.5rem' }}>Automaitee</h3>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    <li style={{ marginBottom: '1rem', fontWeight: '500' }}>✅ Done-for-you, fully managed automation</li>
                                    <li style={{ marginBottom: '1rem', fontWeight: '500' }}>✅ Custom workflows for clinic and patient processes</li>
                                    <li style={{ marginBottom: '1rem', fontWeight: '500' }}>✅ Fixed/custom pricing — cost-effective long-term</li>
                                    <li style={{ marginBottom: '1rem', fontWeight: '500' }}>✅ Tailored for healthcare compliance and efficiency</li>
                                    <li style={{ marginBottom: '1rem', fontWeight: '500' }}>✅ Your automation partner, from setup to ongoing support</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: '4rem 2rem', background: '#f8f9fa', borderRadius: '20px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>Ready to Streamline Your Healthcare Operations?</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                            Automate appointments, patient records, billing, inventory, and telehealth workflows — all customized for your clinic or wellness business.
                        </p>
                        <Link href="/book-consultation" className="cta-button">
                            Book Your Free Consultation
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}
