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
                            We are a team of passionate automation engineers, designers, and innovators focused on simplifying work and empowering people with AI.
                            At Automaitee Digital, we value a transparent, proactive, and collaborative work environment where people can do the best work of their careers. You’ll get to work on exciting projects, innovate across industries, and help build personalized automation solutions that empower businesses to work smarter, not harder. Join us in shaping the future of meaningful AI automation.
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
                            <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                                    There are currently no open roles available. Please check back later!
                                </p>
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
