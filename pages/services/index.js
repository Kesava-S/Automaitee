import Head from 'next/head'
import Link from 'next/link'
import { services } from '../../data/services'

export default function Services() {
    return (
        <>
            <Head>
                <title>Kondamaal Services | AI & Business Automation</title>
            </Head>

            <div style={{ paddingTop: '120px', paddingBottom: '60px', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(180deg, #1d1d1f 0%, #434344 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Kondamaal AI & Business Automation Services</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Comprehensive solutions to power your business growth.
                    </p>
                </div>
            </div>

            <section className="services-section">
                <div className="container">
                    <div className="grid">
                        {services.map((service) => (
                            <Link key={service.id} href={`/services/${service.slug}`} className="card" style={{ display: 'block' }}>
                                <h2>{service.title}</h2>
                                <p>{service.description}</p>
                                <div style={{ marginTop: '1.5rem', color: '#0071e3', fontWeight: '500', fontSize: '0.9rem' }}>
                                    Learn more →
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
