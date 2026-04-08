import Link from 'next/link'
import Head from 'next/head'
import { faqs } from '../data/faqs'
import { Reveal } from '../components/Reveal'
import { IndustryMarquee } from '../components/IndustryMarquee'
import { SparklesCore } from '../components/ui/sparkles'
import AnimatedTextCycle from '../components/ui/animated-text-cycle'


import { motion } from 'framer-motion';

const AnimatedText = ({ text, delayOffset = 0 }) => {
    const wordVariants = {
        hidden: { 
            y: -20,
            opacity: 0,
            filter: "blur(8px)"
        },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                delay: delayOffset + i * 0.1,
                duration: 0.4,
                ease: "easeOut"
            }
        })
    };

    return text.split(" ").map((word, i) => (
        <motion.span
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={wordVariants}
            style={{
                display: "inline-block",
                marginRight: "0.25em",
                background: "linear-gradient(180deg, #1d1d1f 0%, #434344 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent"
            }}
        >
            {word}
        </motion.span>
    ));
};

export default function Home() {
    return (
        <>
            <Head>
                <title>Automaitee | Digital AI Automation</title>
                <meta name="description" content="Affordable business automation solutions. Simplify marketing, sales, process, and reporting with AI automation and reduce workforce costs." />

                <meta property="og:title" content="Automaitee | AI & Business Automation" />
                <meta property="og:description" content="Affordable business automation solutions. Simplify marketing, sales, process, and reporting with AI automation and reduce workforce costs." />
                <meta property="og:url" content="https://automaitee.com/" />

                <meta name="twitter:title" content="Automaitee | AI & Business Automation" />
                <meta name="twitter:description" content="Affordable business automation solutions. Simplify marketing, sales, process, and reporting with AI automation and reduce workforce costs." />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "Automaitee AI Digital Automation",
                            "url": "https://automaitee.com",
                            "logo": "https://automaitee.com/logo.png",
                            "description": "Affordable business automation solutions. Simplify marketing, sales, process, and reporting with AI automation.",
                            "email": "support@automaitee.com",
                            "sameAs": []
                        })
                    }}
                />
            </Head>

            <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
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
                        <h1>
                            <AnimatedText text="Automation Personalised For Micro and SMEs In London" />
                        </h1>
                    </Reveal>
                    <Reveal delay={0.5}>
                        <div style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '1.5rem auto', color: 'var(--text-secondary)', lineHeight: '1.6', textAlign: 'center' }}>
                            The Automations are <AnimatedTextCycle 
                                words={[
                                    "flawless.",
                                    "secure and GDPR-compliant.",
                                    "transparent and easy-to-use.",
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
                    <Reveal delay={0.7} width="100%">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
                            <Link href="/services" className="cta-button">
                                View Services
                            </Link>
                            <Link href="https://www.kondamaal.com/" target="_blank" rel="noopener noreferrer" className="cta-button" style={{ background: 'transparent', color: 'var(--text-primary)', border: '1px solid #000' }}>
                                explore our talents
                            </Link>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '-0.5rem' }}>
                                Support Venture by Automaitee
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="services-section" style={{ background: '#fbfbfd' }}>
                <div className="container">
                    <Reveal width="100%">
                        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>What we automate</h2>
                            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
                                We build intelligent AI agents that work alongside your team, automating routine tasks and helping your business operate faster, smarter, and more efficiently.
                            </p>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '3rem' }}>
                                To explore how automation can transform your workflows, visit our Services page to discover the solutions we offer. You can then outline your specific automation requirements and book a consultation by submitting the form. Our automation consultants will review your needs and get back to you promptly with tailored recommendations.
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
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '4rem' }}>AI Automation partner for your business</p>
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
        </>
    )
}
