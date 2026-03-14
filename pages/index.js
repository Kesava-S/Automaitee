import Link from 'next/link'
import Head from 'next/head'
import { faqs } from '../data/faqs'
import { Reveal } from '../components/Reveal'
import { IndustryMarquee } from '../components/IndustryMarquee'


const AnimatedText = ({ text, delayOffset = 0 }) => {
    return text.split(" ").map((word, i) => (
        <span
            key={i}
            className="animated-word"
            style={{
                animationDelay: `${delayOffset + i * 0.1}s`,
                marginRight: "0.25em"
            }}
        >
            {word}
        </span>
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
                <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Reveal>
                        <h1>
                            <AnimatedText text="Automation Designed For Your Business" />
                        </h1>
                    </Reveal>
                    <Reveal delay={0.5}>
                        <p style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '1.5rem auto', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            We build custom AI Agents — so your business runs smarter, not harder.
                        </p>
                    </Reveal>
                    <Reveal delay={0.7} width="100%">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
                            <Link href="/book-consultation" className="cta-button">
                                Book Automation Consultation
                            </Link>
                            <Link href="https://www.kondamaal.com/" target="_blank" rel="noopener noreferrer" className="cta-button" style={{ background: 'transparent', color: 'var(--text-primary)', border: '1px solid #000' }}>
                                Explore - Kondamaal Freelancers
                            </Link>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '-0.5rem' }}>
                                A new initiative by Automaitee
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

            <section className="sustainability-section" style={{ background: '#ffffff', padding: '5rem 0' }}>
                <div className="container">
                    <Reveal width="100%">
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Our Sustainability Approach</h2>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>In Marketing Automation</p>
                        </div>
                    </Reveal>
                    <div className="grid">
                        {[
                            {
                                title: "Sustainable Digital Marketing Automation",
                                desc: "At Automaitee Digital, we combine digital marketing automation, AI-driven workflows, and sustainable technology practices to help businesses grow efficiently while reducing unnecessary digital resource consumption. Our automation systems are designed to support small and medium businesses (SMEs) with scalable, energy-efficient marketing operations."
                            },
                            {
                                title: "Green Data Management",
                                desc: "Automaitee Digital promotes efficient data management for marketing automation by using lightweight tools such as Google Sheets and minimal databases for smaller campaigns. This approach reduces dependency on heavy cloud servers, lowers energy consumption, and ensures faster data processing for digital marketing workflows."
                            },
                            {
                                title: "Energy-Efficient Automation Systems",
                                desc: "Our marketing automation workflows are built using streamlined automation platforms such as n8n. By integrating campaign management, lead capture, and data synchronization within a single automation environment, we reduce the need for multiple heavy software systems, improving operational efficiency while lowering digital energy usage."
                            },
                            {
                                title: "Digital-First Marketing Strategies",
                                desc: "Automaitee Digital supports digital-first marketing campaigns that replace traditional printed promotions such as flyers and brochures. Using platforms like Google Ads, email marketing, and social media advertising, businesses can reach customers more effectively while reducing paper waste and transportation emissions."
                            },
                            {
                                title: "Data-Driven Campaign Optimization",
                                desc: "Our automation platform continuously analyzes marketing performance data to identify underperforming campaigns. Businesses can quickly adjust or pause campaigns to avoid unnecessary ad impressions, reduce computing resources, and improve marketing ROI through data-driven optimization."
                            },
                            {
                                title: "Customer Retention Through Automation",
                                desc: "Our AI-powered marketing automation workflows help businesses retain customers through automated email nurturing, loyalty campaigns, and personalized engagement. Focusing on customer retention reduces the need for constant lead acquisition, enabling businesses to grow sustainably while optimizing marketing resources."
                            }
                        ].map((item, index) => (
                            <Reveal key={index} delay={index * 0.1}>
                                <div className="card" style={{ height: '100%' }}>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
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
