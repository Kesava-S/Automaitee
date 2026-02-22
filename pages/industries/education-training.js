import Head from 'next/head'
import Link from 'next/link'

export default function EducationTrainingAutomation() {
    return (
        <>
            <Head>
                <title>Education & Training Automation Solutions | Automaitee</title>
                <meta name="description" content="Automate enrolment, fee processing, attendance, online course delivery, and student engagement for tutoring centres, coaching institutes, and language schools with Automaitee." />
                <meta name="keywords" content="Education automation solutions, Tutoring centre workflow automation, LMS automation, Online course delivery automation, Student enrolment automation, Attendance tracking automation, Automated notifications for students" />
            </Head>

            <div style={{ paddingTop: '120px', paddingBottom: '80px' }}>
                <div className="container">
                    <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', display: 'inline-block' }}>
                        ← Back to Home
                    </Link>

                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: '700', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                        Streamline Education & Training Operations with Automation
                    </h1>

                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '900px', lineHeight: '1.6', marginBottom: '2rem' }}>
                        Managing a tutoring centre, private coaching institute, or language school involves administrative tasks, student engagement, and content delivery — often across multiple platforms. Automaitee helps educational businesses automate enrolment, attendance, course management, and notifications, allowing educators to focus on teaching and improving student outcomes.
                    </p>

                    <div style={{ marginBottom: '4rem', padding: '2rem', background: '#f8f9fa', borderRadius: '16px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1.5rem' }}>Why Education & Training Businesses Need Automation</h2>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: '#0071e3', fontSize: '1.2rem' }}>✓</span> Administrative tasks like enrolments, fees, and attendance take valuable time from educators</li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: '#0071e3', fontSize: '1.2rem' }}>✓</span> Student engagement and follow-ups are often inconsistent without automation</li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: '#0071e3', fontSize: '1.2rem' }}>✓</span> Manual grading, course delivery, and reporting are prone to errors</li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: '#0071e3', fontSize: '1.2rem' }}>✓</span> Automation ensures timely communication, accurate records, and better learning outcomes</li>
                        </ul>
                    </div>

                    <h2 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '2rem' }}>Automation Opportunities in Education & Training</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>1. Enrolment & Fee Processing</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Automatic student registration and record creation</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Payment tracking and automated reminders for due fees</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Integration with accounting systems and CRM</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>2. Attendance Tracking</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Capture attendance automatically via LMS, QR codes, or online sessions</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Generate reports for teachers and management</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Identify student participation trends for follow-ups</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>3. Learning Management Systems (LMS) Automation</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Auto-enrol students in relevant courses</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Assign lessons, resources, and assessments based on schedules</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Track progress and send performance updates to students and parents</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>4. Online Course Delivery & Assessments</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Schedule and deliver webinars, video lessons, or live sessions automatically</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Automate grading and feedback for quizzes and assignments</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Trigger notifications for completed modules or pending tasks</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>5. Automated Reminders & Notifications</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Class reminders, assignment deadlines, and exam schedules</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Personalized communication for attendance or performance alerts</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Notifications via email, SMS, or messaging platforms</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1.5rem' }}>Practical Benefits You’ll See</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Reduced administrative workload</strong> → educators focus on teaching</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Accurate fee and enrolment tracking</strong> → fewer errors and faster processing</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Better student engagement</strong> → automated reminders and follow-ups</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Consistent course delivery</strong> → improved learning outcomes</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Actionable insights</strong> → reports for performance and participation trends</li>
                            </ul>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1.5rem' }}>Example Education Businesses We Serve</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.75rem' }}>📚 Tutoring centres and private coaching institutes</li>
                                <li style={{ marginBottom: '0.75rem' }}>🗣️ Small language schools and online learning providers</li>
                                <li style={{ marginBottom: '0.75rem' }}>🛠️ Skill development and training centres</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '2rem', textAlign: 'center' }}>How Automaitee Works</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>1. Consultation</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>Understand enrolment, class schedules, and student workflows</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>2. Design</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>Tailored workflows for enrolments, LMS, attendance, and notifications</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>3. Implementation</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>Integrate with LMS, payment gateways, calendar tools, and communication platforms</p>
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
                                    <li style={{ marginBottom: '1rem', fontWeight: '500' }}>✅ Tailored to education workflows and student engagement</li>
                                    <li style={{ marginBottom: '1rem', fontWeight: '500' }}>✅ Fixed/custom pricing — cost-effective long-term</li>
                                    <li style={{ marginBottom: '1rem', fontWeight: '500' }}>✅ Optimized for enrolment, attendance, and course delivery</li>
                                    <li style={{ marginBottom: '1rem', fontWeight: '500' }}>✅ Your automation partner, from setup to ongoing support</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: '4rem 2rem', background: '#f8f9fa', borderRadius: '20px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>Ready to Automate Your Education Operations?</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                            Automate enrolments, fees, attendance, LMS workflows, and student notifications — all customized for your training or tutoring centre.
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
