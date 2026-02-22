import Head from 'next/head'
import Link from 'next/link'

export default function GymFitnessStudioAutomation() {
    return (
        <>
            <Head>
                <title>Gym & Fitness Studio Automation Solutions | Automaitee</title>
                <meta name="description" content="Streamline memberships, class bookings, trainer schedules, and client communication with Automaitee’s custom automation solutions for gyms and fitness studios." />
            </Head>

            <div style={{ paddingTop: '120px', paddingBottom: '80px' }}>
                <div className="container">
                    <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', display: 'inline-block' }}>
                        ← Back to Home
                    </Link>

                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: '700', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                        Boost Efficiency and Member Experience with Gym Automation
                    </h1>

                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '900px', lineHeight: '1.6', marginBottom: '2rem' }}>
                        Running a gym or fitness studio involves managing memberships, schedules, payments, and client engagement — often across multiple apps and spreadsheets. Automaitee helps fitness businesses automate administrative tasks, optimize operations, and improve member satisfaction, so your team can focus on training and growth.
                    </p>

                    <div style={{ marginBottom: '4rem', padding: '2rem', background: '#f8f9fa', borderRadius: '16px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1.5rem' }}>Why Gyms & Fitness Studios Need Automation</h2>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: '#0071e3', fontSize: '1.2rem' }}>✓</span> Manual scheduling and membership management is time-consuming and error-prone</li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: '#0071e3', fontSize: '1.2rem' }}>✓</span> Payment tracking, renewals, and reminders require constant attention</li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: '#0071e3', fontSize: '1.2rem' }}>✓</span> Marketing and lead follow-up often fall behind, reducing membership growth</li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: '#0071e3', fontSize: '1.2rem' }}>✓</span> Automation ensures consistent communication, better member retention, and efficient operations</li>
                        </ul>
                    </div>

                    <h2 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '2rem' }}>Automation Opportunities in Gyms & Fitness Studios</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>1. Membership & Subscription Management</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Automatic registration, renewals, and reminders</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Track membership status and send alerts for expiring subscriptions</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Sync membership data with CRM and billing systems</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>2. Class & Trainer Scheduling</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Online booking and waitlist management</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Automatic updates to trainers and members</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Notifications for cancellations, reschedules, or full classes</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>3. Attendance Tracking & Reporting</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Track check-ins and class attendance automatically</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Generate weekly/monthly reports for trainers and management</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Identify underutilized classes or peak hours for better planning</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>4. Payment & Billing Automation</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Automate recurring payments and invoicing</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Send reminders for failed payments or expiring cards</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Integration with Stripe, PayPal, or local payment gateways</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>5. Member Engagement & Marketing</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Automated onboarding messages for new members</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Promotional campaigns for classes, events, or personal training</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Follow-up messages for inactive members or trial members</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>6. Advanced / AI-enhanced Automation</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Personalized workout reminders and recommendations</li>
                                <li style={{ marginBottom: '0.5rem' }}>• AI chatbot for answering member queries 24/7</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Integrate wearable device data into dashboards for performance tracking</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1.5rem' }}>Practical Benefits You’ll See</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Reduced administrative workload</strong> → trainers focus on members</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Fewer missed payments</strong> → higher revenue collection</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Optimized class schedules</strong> → improved space and staff utilization</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Better member engagement</strong> → higher retention and satisfaction</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Insights</strong> from attendance and subscription data → smarter business decisions</li>
                            </ul>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1.5rem' }}>Example Businesses We Serve</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.75rem' }}>🏢 Boutique gyms and fitness centers</li>
                                <li style={{ marginBottom: '0.75rem' }}>🧘‍♀️ Yoga, pilates, and wellness studios</li>
                                <li style={{ marginBottom: '0.75rem' }}>🏋️‍♂️ Personal training and group class studios</li>
                                <li style={{ marginBottom: '0.75rem' }}>🏢 Small to mid-sized fitness chains</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '2rem', textAlign: 'center' }}>How Automaitee Works</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>1. Consultation</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>Map your current operations, member workflows, and pain points</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>2. Design</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>Build workflows for bookings, payments, schedules, and marketing</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>3. Implementation</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>Integrate with membership software, calendars, CRM, and communication tools</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>4. Optimization</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>Monitor automations, provide ongoing support, and refine workflows for efficiency</p>
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
                                    <li style={{ marginBottom: '1rem', fontWeight: '500' }}>✅ Tailored to gym operations and member workflows</li>
                                    <li style={{ marginBottom: '1rem', fontWeight: '500' }}>✅ Fixed/custom pricing — cost-effective long-term</li>
                                    <li style={{ marginBottom: '1rem', fontWeight: '500' }}>✅ Optimized for memberships, scheduling, and billing</li>
                                    <li style={{ marginBottom: '1rem', fontWeight: '500' }}>✅ Your automation partner, from setup to ongoing support</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: '4rem 2rem', background: '#f8f9fa', borderRadius: '20px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>Ready to Streamline Your Gym Operations?</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                            Automate memberships, class schedules, trainer assignments, billing, and member communications — all customized for your gym or fitness studio.
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
