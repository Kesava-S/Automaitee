import Head from 'next/head'
import { Reveal } from '../components/Reveal'

export default function Sustainability() {
    return (
        <>
            <Head>
                <title>Sustainability Practices | Automaitee</title>
                <meta name="description" content="Automaitee Digital combines digital marketing automation, AI-driven workflows, and sustainable technology practices." />
            </Head>

            <div style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
                <section className="sustainability-section" style={{ background: '#ffffff', padding: '5rem 0' }}>
                    <div className="container">
                        <Reveal width="100%">
                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <h1 className="section-title" style={{ marginBottom: '0.5rem', fontSize: '2.5rem' }}>Our Sustainability Approach</h1>
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
            </div>
        </>
    )
}
