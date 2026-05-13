import Link from 'next/link'
import Head from 'next/head'
import { faqs } from '../data/faqs'
import { Reveal } from '../components/Reveal'
import { IndustryMarquee } from '../components/IndustryMarquee'
import { SparklesCore } from '../components/ui/sparkles'
import AnimatedTextCycle from '../components/ui/animated-text-cycle'




export default function Home() {
    return (
        <>
            <Head>
                <title>AI Marketing Automation for London Small Businesses | Automaitee</title>
                <meta name="description" content="Affordable business automation solutions. Simplify marketing, sales, process, and reporting with AI automation and reduce workforce costs." />

                <meta property="og:title" content="Automaitee | AI & Business Automation" />
                <meta property="og:description" content="Affordable business automation solutions. Simplify marketing, sales, process, and reporting with AI automation and reduce workforce costs." />
                <meta property="og:url" content="https://www.automaitee.com/" />

                <meta name="twitter:title" content="Automaitee | AI & Business Automation" />
                <meta name="twitter:description" content="Affordable business automation solutions. Simplify marketing, sales, process, and reporting with AI automation and reduce workforce costs." />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "Automaitee AI Digital Automation",
                            "url": "https://www.automaitee.com",
                            "logo": "https://www.automaitee.com/og-image.png",
                            "description": "Affordable business automation solutions. Simplify marketing, sales, process, and reporting with AI automation.",
                            "email": "support@automaitee.com",
                            "sameAs": [
                                    "https://www.facebook.com/profile.php?id=61588731975851",
                                    "https://www.instagram.com/automaitee_digital/"
                                ]
                        })
                    }}
                />
            </Head>

            <section className="hero" style={{ position: 'sticky', top: 0, zIndex: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}>
                    <SparklesCore
                        id="tsparticleshero"
                        background="transparent"
                        minSize={0.4}
                        maxSize={1.5}
                        particleDensity={150}
                        className="w-full h-full"
                        particleColor="#0071e3"
                    />
                    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', background: 'radial-gradient(circle at top, transparent 10%, #fbfbfd 90%)' }}></div>
                </div>
                <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Reveal>

                        <h1 style={{ 
                            background: "linear-gradient(180deg, #1d1d1f 0%, #434344 100%)", 
                            WebkitBackgroundClip: "text", 
                            backgroundClip: "text", 
                            WebkitTextFillColor: "transparent",
                            maxWidth: "1000px",
                            margin: "0 auto"
                        }}>
                            Automation Personalised For Small Businesses in London
                        </h1>
                    </Reveal>
                    <Reveal delay={0.5}>
                        <div style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '1.5rem auto', color: 'var(--text-secondary)', lineHeight: '1.6', textAlign: 'center' }}>
                            The Automations are <AnimatedTextCycle 
                                words={[
                                    "Transparent",
                                    "Personal",
                                    "Monitored",
                                    "Continuously Optimized",
                                    "secure and GDPR-compliant.",
                                    "smart and value-driven.",
                                    "UK-focused and market-savvy."
                                ]} 
                                interval={3000} 
                                style={{ 
                                    fontWeight: '600',
                                    background: "linear-gradient(180deg, #1d1d1f 0%, #434344 100%)",
                                    WebkitBackgroundClip: "text",
                                    backgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
                                }}
                            />
                        </div>
                    </Reveal>
                    <Reveal delay={0.6}>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '0.5rem' }}>
                            Save 10+ hours a week on marketing operations — without hiring a team.
                        </p>
                    </Reveal>
                    <Reveal delay={0.7} width="100%">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
                            <Link href="/services?openMicro=true" style={{
                                display: 'inline-block',
                                background: '#e8f2fc',
                                color: '#0071e3',
                                padding: '6px 16px',
                                borderRadius: '20px',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                letterSpacing: '0.5px',
                                textDecoration: 'none'
                            }}>
                                Automation starts from just £79
                            </Link>
                            <Link href="/services" className="cta-button">
                                View Services
                            </Link>
                            <Link href="https://www.kondamaal.com/" target="_blank" rel="noopener noreferrer" className="cta-button" style={{ background: 'transparent', color: 'var(--text-primary)', border: '1px solid #000' }}>
                                Hire AI Automation Talent
                            </Link>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '-0.5rem', maxWidth: '400px', textAlign: 'center', lineHeight: '1.5' }}>
                                Kondamaal — hire monitored remote freelancers for your AI automation, quality-assured by an expert mentor.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* The Rest of the Page acts as a curtain raising over the Hero */}
            <div className="hero-reveal-container" style={{ position: 'relative', zIndex: 10, background: '#fbfbfd', borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem', boxShadow: '0 -20px 40px rgba(0,0,0,0.05)' }}>
                <section className="services-section" style={{ paddingTop: '6rem' }}>
                    <div className="container">
                    <Reveal width="100%">
                        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>What we automate</h2>
                            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
                                We build intelligent AI agents that work alongside your team, automating routine tasks and helping your business operate faster, smarter, and more efficiently.
                            </p>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '3rem' }}>
                                To explore how automation can transform your workflows, visit our Services page to discover the solutions we offer. You can then outline your specific automation requirements and book a consultation by submitting the form. Our automation engineers will review your needs and get back to you promptly with tailored recommendations.
                            </p>
                            <Link href="/services" className="cta-button">
                                View Services
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>


            <section className="services-section">
                <div className="container">
                    <Reveal width="100%">
                        <div style={{ textAlign: 'center' }}>
                            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Why Automaitee</h2>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '4rem' }}>AI Marketing Automation Technology for London Small Businesses</p>
                        </div>
                    </Reveal>
                    <div className="grid">
                        <Reveal>
                            <div className="card" style={{ height: '100%' }}>
                                <h3>Customised, But Cost Effective</h3>
                                <p>We offer tailored pricing based on service needs, delivering the best quality at the most affordable rates.</p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div className="card" style={{ height: '100%' }}>
                                <h3>24/7 Operation</h3>
                                <p>Our automated systems work round the clock, ensuring your business never sleeps.</p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <div className="card" style={{ height: '100%' }}>
                                <h3>Transparent</h3>
                                <p>Workflows are transparent and personalized for your business.</p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.6}>
                            <div className="card" style={{ height: '100%' }}>
                                <h3>60-Second Lead Response</h3>
                                <p>Every lead gets a personalised reply within 60 seconds — automatically by email and WhatsApp. No more losing customers to a slow reply.</p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
            <section className="services-section" style={{ background: 'rgba(251, 251, 253, 0.4)' }}>
                <div className="container">
                    <Reveal width="100%">
                        <h2 className="section-title">Frequently Asked Questions</h2>
                    </Reveal>
                    <div className="grid" style={{ marginBottom: '3rem' }}>
                        {faqs.filter(f => [3, 5, 8].includes(f.id)).map((faq, i) => (
                            <Reveal key={faq.id} delay={i * 0.1}>
                                <div className="card" style={{ height: '100%' }}>
                                    <h3>{faq.question}</h3>
                                    <p>{faq.answer}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal width="100%">
                        <div style={{ textAlign: 'center' }}>
                            <Link href="/faq" style={{ color: '#0071e3', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                View all FAQs <span>→</span>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            <IndustryMarquee />
            </div>
        </>
    )
}
