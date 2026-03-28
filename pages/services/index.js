import React, { useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import { services } from '../../data/services'
import { Reveal } from '../../components/Reveal'
import { ChevronDown } from 'lucide-react';


export default function Services() {
    const [openSection, setOpenSection] = useState('marketing');

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <>
            <Head>
                <title>Automaitee Services | AI & Business Automation</title>
            </Head>

            <div style={{ paddingTop: '120px', paddingBottom: '60px', textAlign: 'center' }}>
                <div className="container">
                    <Reveal width="100%">
                        <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(180deg, #1d1d1f 0%, #434344 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Automation for London & UK SMEs</h1>
                    </Reveal>
                    <Reveal width="100%" delay={0.2}>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                            Fully Customised For You | Your Business
                        </p>
                    </Reveal>
                </div>
            </div>

            <section className="services-section" style={{ paddingBottom: '100px' }}>
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>

                    {/* Marketing Automation Section */}
                    <div className="accordion-item">
                        <button
                            className={`accordion-header ${openSection === 'marketing' ? 'active' : ''}`}
                            onClick={() => toggleSection('marketing')}
                        >
                            <h2 style={{ fontSize: '2rem', margin: 0 }}>Marketing Automation</h2>
                            <ChevronDown className="accordion-icon" size={28} />
                        </button>
                        <div className={`accordion-content ${openSection === 'marketing' ? 'open' : ''}`}>
                            <div className="grid" style={{ paddingTop: '1rem', paddingBottom: '1.5rem' }}>
                                {services.map((service, index) => (
                                    <Reveal key={service.id} delay={index * 0.1} width="100%">
                                        <Link href={`/services/${service.slug}`} className="card" style={{ display: 'block', height: '100%' }}>
                                            <h2>{service.title}</h2>
                                            <p style={{ marginBottom: service.processSteps ? '1.5rem' : '0' }}>{service.description}</p>

                                            {service.processSteps && (
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
                                                    {service.processSteps.map((step, stepIndex) => (
                                                        <div key={stepIndex} style={{ display: 'flex', alignItems: 'center' }}>
                                                            <span style={{
                                                                background: 'rgba(0, 113, 227, 0.1)',
                                                                color: '#0071e3',
                                                                padding: '4px 10px',
                                                                borderRadius: '20px',
                                                                fontSize: '0.8rem',
                                                                fontWeight: '600',
                                                                whiteSpace: 'nowrap'
                                                            }}>
                                                                {step}
                                                            </span>
                                                            {stepIndex < service.processSteps.length - 1 && (
                                                                <span style={{ margin: '0 4px', color: '#86868b', fontSize: '0.9rem' }}>→</span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div style={{ marginTop: '1.5rem', color: '#0071e3', fontWeight: '500', fontSize: '0.9rem' }}>
                                                Learn more →
                                            </div>
                                        </Link>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <style jsx>{`
                .accordion-item {
                    margin-bottom: 2rem;
                    border-bottom: 1px solid var(--card-border);
                    padding-bottom: 1rem;
                }
                
                .accordion-header {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 1rem 0;
                    text-align: left;
                    color: var(--foreground);
                    transition: color 0.3s ease;
                }
                
                .accordion-header:hover {
                    color: #0071e3;
                }
                
                .accordion-icon {
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    color: inherit;
                }
                
                .accordion-header.active .accordion-icon {
                    transform: rotate(180deg);
                }
                
                .accordion-header.active {
                    color: #0071e3;
                }
                
                .accordion-content {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
                    opacity: 0;
                }
                
                .accordion-content.open {
                    max-height: 3000px; /* High max-height to accommodate grid contents */
                    opacity: 1;
                }
            `}</style>
        </>
    )
}
