import React, { useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import { services } from '../../data/services'
import { Reveal } from '../../components/Reveal'
import { Building, HeartPulse, Dumbbell, Briefcase, Key, Megaphone, ChevronDown } from 'lucide-react';

const industries = [
    { name: "Hospitality & Food Services", icon: <Building size={32} />, desc: "Custom automation solutions for hotels, restaurants, cafes, and boutique hospitality businesses.", link: "/industries/hospitality-food-services" },
    { name: "Healthcare & Wellness", icon: <HeartPulse size={32} />, desc: "Streamline patient scheduling, automated reminders, and seamless EHR data entry.", link: "/industries/healthcare-wellness" },
    { name: "Gyms & Fitness Studios", icon: <Dumbbell size={32} />, desc: "Automate memberships, class bookings, and targeted client engagement.", link: "/industries/gyms-fitness-studios" },
    { name: "Education & Training", icon: <Briefcase size={32} />, desc: "Automate enrolment, fee processing, attendance, and student engagement.", link: "/industries/education-training" },
    { name: "Rental & Property Businesses", icon: <Key size={32} />, desc: "Automate rent collection reminders, maintenance requests, and tenant onboarding.", link: "/industries/rental-property-businesses" },
    { name: "Marketing & Advertising", icon: <Megaphone size={32} />, desc: "Automate social media, email campaigns, analytics, and customer segmentation.", link: "/industries/marketing-advertising" }
];

export default function Services() {
    const [openSection, setOpenSection] = useState('products');

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
                        <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(180deg, #1d1d1f 0%, #434344 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Automations</h1>
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

                    {/* Products Section */}
                    <div className="accordion-item">
                        <button
                            className={`accordion-header ${openSection === 'products' ? 'active' : ''}`}
                            onClick={() => toggleSection('products')}
                        >
                            <h2 style={{ fontSize: '2rem', margin: 0 }}>Products</h2>
                            <ChevronDown className="accordion-icon" size={28} />
                        </button>
                        <div className={`accordion-content ${openSection === 'products' ? 'open' : ''}`}>
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

                    {/* Business Automations Section */}
                    <div className="accordion-item">
                        <button
                            className={`accordion-header ${openSection === 'business' ? 'active' : ''}`}
                            onClick={() => toggleSection('business')}
                        >
                            <h2 style={{ fontSize: '2rem', margin: 0 }}>Business Automations</h2>
                            <ChevronDown className="accordion-icon" size={28} />
                        </button>
                        <div className={`accordion-content ${openSection === 'business' ? 'open' : ''}`}>
                            <div className="grid" style={{ paddingTop: '1rem', paddingBottom: '1.5rem' }}>
                                {industries.map((industry, index) => (
                                    <Reveal key={industry.name} delay={index * 0.1} width="100%">
                                        <Link href={industry.link} className="card" style={{ display: 'block', height: '100%' }}>
                                            <div style={{ marginBottom: '1rem', color: '#0071e3', background: 'rgba(0, 113, 227, 0.05)', display: 'inline-flex', padding: '12px', borderRadius: '12px' }}>
                                                {industry.icon}
                                            </div>
                                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{industry.name}</h2>
                                            <p style={{ color: 'var(--text-secondary)' }}>{industry.desc}</p>

                                            <div style={{ marginTop: '1.5rem', color: '#0071e3', fontWeight: '500', fontSize: '0.9rem' }}>
                                                Learn more →
                                            </div>
                                        </Link>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Personal Automations Section */}
                    <div className="accordion-item">
                        <button
                            className={`accordion-header ${openSection === 'personal' ? 'active' : ''}`}
                            onClick={() => toggleSection('personal')}
                        >
                            <h2 style={{ fontSize: '2rem', margin: 0 }}>Personal Automations</h2>
                            <ChevronDown className="accordion-icon" size={28} />
                        </button>
                        <div className={`accordion-content ${openSection === 'personal' ? 'open' : ''}`}>
                            <div className="grid" style={{ paddingTop: '1rem', paddingBottom: '1.5rem' }}>
                                <Reveal delay={0.2} width="100%">
                                    <div className="card">
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Coming Soon</h3>
                                        <p style={{ color: 'var(--text-secondary)' }}>We are working on bringing personal automation services to you.</p>
                                    </div>
                                </Reveal>
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
