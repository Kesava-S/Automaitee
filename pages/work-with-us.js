import Head from 'next/head'
import { Reveal } from '../components/Reveal'
import Link from 'next/link'

export default function WorkWithUs() {
    return (
        <>
            <Head>
                <title>Work With Us | Automaitee Digital</title>
                <meta name="description" content="Discover life at Automaitee Digital and explore open roles to join our team." />
            </Head>

            <div style={{ paddingTop: '120px', paddingBottom: '60px', textAlign: 'center' }}>
                <div className="container">
                    <Reveal width="100%">
                        <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(180deg, #1d1d1f 0%, #434344 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Life at Automaitee Digital
                        </h1>
                    </Reveal>
                    <Reveal width="100%" delay={0.2}>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
                            We are team of passionate automation engineers, designers, and innovators focused on simplifying the complex.
                            At Automaitee Digital, we value a transparent, proactive, and collaborative work environment. We believe in building personalized solutions that empower businesses to work smarter, not harder. Join us in shaping the future of meaningful AI automation!
                        </p>
                    </Reveal>
                </div>
            </div>

            <section className="services-section" style={{ background: '#fbfbfd' }}>
                <div className="container">
                    <Reveal width="100%">
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2 className="section-title">Open Roles</h2>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                                Ready to make an impact? Explore our current openings below.
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid">
                        <Reveal>
                            <div className="card" style={{ height: '100%', padding: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: '600' }}>Automation in Revenue Operations Intern</h3>
                                    <span style={{ background: '#e0ece0', color: '#116c4c', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Internship</span>
                                </div>

                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                                    <strong>Details:</strong> 3 months unpaid (Starts May)
                                </div>

                                <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                                    <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Requirements:</h4>
                                    <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                                        <li style={{ marginBottom: '0.5rem' }}>Bachelor’s degree in Computer Science or related field with strong analytical skills.</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Basic knowledge of CRMs, especially HubSpot.</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Understanding of APIs, JSON, and backend processes for automation.</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Familiarity with international payment platforms.</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Basic analytics skills (Google Data Analytics concepts, Excel, dashboards).</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Logical thinking and strong attention to detail.</li>
                                    </ul>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                    <Link href="/apply?role=Automation+in+Revenue+Operations+Intern" style={{ color: '#0071e3', fontWeight: 'bold' }}>Apply Now →</Link>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal width="100%">
                        <div style={{ textAlign: 'center', marginTop: '5rem', padding: '3rem 2rem', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '700' }}>Don't see a fit?</h2>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                                We are always looking for driven individuals. Send us your resume and a quick overview of how you can contribute to our vision.
                            </p>
                            <a href="mailto:careers@automaitee.com" className="cta-button">
                                Email Us: careers@automaitee.com
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    )
}
