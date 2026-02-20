import Head from 'next/head'
import Link from 'next/link'

export default function HospitalityAutomation() {
    return (
        <>
            <Head>
                <title>Hospitality & Food Services Automation Solutions | Automaitee</title>
                <meta name="description" content="Custom automation solutions for hotels, restaurants, cafes, and boutique hospitality businesses. Streamline bookings, staff schedules, POS, and guest communication with Automaitee." />
            </Head>

            <div style={{ paddingTop: '120px', paddingBottom: '80px' }}>
                <div className="container">
                    <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', display: 'inline-block' }}>
                        ← Back to Home
                    </Link>

                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: '700', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                        Transform Your Hospitality Business with Intelligent Automation
                    </h1>

                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '900px', lineHeight: '1.6', marginBottom: '2rem' }}>
                        Running a hotel, restaurant, café, or boutique property can be labor-intensive and time-sensitive. Automaitee helps hospitality businesses automate repetitive tasks, improve guest experiences, and reduce costs. From instant booking responses to dynamic staff scheduling, we tailor workflows specifically for your business.
                    </p>

                    <div style={{ marginBottom: '4rem', padding: '2rem', background: '#f8f9fa', borderRadius: '16px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1.5rem' }}>Why Hospitality Businesses Need Automation</h2>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: '#0071e3', fontSize: '1.2rem' }}>✓</span> Labor-intensive operations require consistency and efficiency</li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: '#0071e3', fontSize: '1.2rem' }}>✓</span> Guest satisfaction depends on timely communication and smooth operations</li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: '#0071e3', fontSize: '1.2rem' }}>✓</span> Optimizing staff time and reducing operational errors increases profitability</li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: '#0071e3', fontSize: '1.2rem' }}>✓</span> Automation enables scalable growth without extra hires</li>
                        </ul>
                    </div>

                    <h2 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '2rem' }}>Automation Opportunities for Hospitality & Food Services</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>1. Booking & Reservation Automation</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Instant online booking confirmations via WhatsApp, email, or SMS</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Automated reminders to reduce no-shows</li>
                                <li style={{ marginBottom: '0.5rem' }}>• CRM integration to track guest data and booking history</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>2. POS & Inventory Management</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Sync POS with reservations and kitchen orders</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Track inventory in real-time and automate purchase alerts</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Reduce food waste and prevent stockouts</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>3. Guest Engagement & Loyalty</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Collect feedback automatically after stays or dining experiences</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Personalized offers for returning guests</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Automate loyalty program points and redemption notifications</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>4. Staff Scheduling & Operations</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Auto-generate staff rosters based on bookings and occupancy forecasts</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Alerts for schedule changes or shift swaps</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Monitor staff workload and optimize efficiency</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>5. Kitchen & Delivery Workflow Automation</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Automatic order ticketing for kitchen and delivery teams</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Real-time updates on order status to staff and customers</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Integrated reporting for faster decision-making</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1.5rem' }}>Practical Benefits You’ll See</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Faster response</strong> to guest inquiries → higher booking conversions</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Reduced manual work</strong> → free staff time for better service</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Accurate inventory</strong> and purchase management → lower costs</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Consistent guest experience</strong> → improved reviews and loyalty</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Data-driven insights</strong> → smarter business decisions</li>
                            </ul>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1.5rem' }}>Example Businesses We Serve</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.75rem' }}>☕ Cafes and small restaurants</li>
                                <li style={{ marginBottom: '0.75rem' }}>🏨 Boutique hotels and B&Bs</li>
                                <li style={{ marginBottom: '0.75rem' }}>🏡 Vacation rental properties and villas</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '2rem', textAlign: 'center' }}>How Automaitee Works</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>1. Consultation</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>We map your current workflows and identify automation opportunities.</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>2. Design</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>Custom automation workflows are tailored to your business logic.</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>3. Implementation</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>Seamless integration with booking engines, POS, CRM, and channels.</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>4. Optimization</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>Continuous monitoring and adjustments to maximize efficiency.</p>
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
                                    <li style={{ marginBottom: '1rem' }}>❌ Generic solutions</li>
                                    <li style={{ marginBottom: '1rem' }}>❌ Tool only</li>
                                </ul>
                            </div>
                            <div style={{ padding: '2rem', borderLeft: '1px solid var(--card-border)' }}>
                                <h3 style={{ fontSize: '1.2rem', color: '#0071e3', marginBottom: '1.5rem' }}>Automaitee</h3>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    <li style={{ marginBottom: '1rem', fontWeight: '500' }}>✅ Done-for-you, fully managed automation</li>
                                    <li style={{ marginBottom: '1rem', fontWeight: '500' }}>✅ Tailored to your exact workflow</li>
                                    <li style={{ marginBottom: '1rem', fontWeight: '500' }}>✅ Fixed/custom pricing — cost-effective long-term</li>
                                    <li style={{ marginBottom: '1rem', fontWeight: '500' }}>✅ Optimized for hospitality operations</li>
                                    <li style={{ marginBottom: '1rem', fontWeight: '500' }}>✅ Your automation partner</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: '4rem 2rem', background: '#f8f9fa', borderRadius: '20px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>Ready to Streamline Your Hospitality Operations?</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                            Automate bookings, guest communication, staff scheduling, and inventory management — all customized for your business.
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
