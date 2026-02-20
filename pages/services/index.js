import Link from 'next/link'
import Head from 'next/head'
import { services } from '../../data/services'
import { Reveal } from '../../components/Reveal'
import { Building, HeartPulse, Dumbbell, Briefcase, Key, Megaphone } from 'lucide-react';

const industries = [
    { name: "Hospitality & Food Services", icon: <Building size={32} />, desc: "Custom automation solutions for hotels, restaurants, cafes, and boutique hospitality businesses.", link: "/industries/hospitality-food-services" },
    { name: "Healthcare & Wellness", icon: <HeartPulse size={32} />, desc: "Streamline patient scheduling, automated reminders, and seamless EHR data entry.", link: "/industries/healthcare-wellness" },
    { name: "Gyms & Fitness Studios", icon: <Dumbbell size={32} />, desc: "Automate memberships, class bookings, and targeted client engagement.", link: "/industries/gyms-fitness-studios" },
    { name: "Education & Training", icon: <Briefcase size={32} />, desc: "Automate enrolment, fee processing, attendance, and student engagement.", link: "/industries/education-training" },
    { name: "Rental & Property Businesses", icon: <Key size={32} />, desc: "Automate rent collection reminders, maintenance requests, and tenant onboarding.", link: "/industries/rental-property-businesses" },
    { name: "Marketing & Advertising", icon: <Megaphone size={32} />, desc: "Automate social media, email campaigns, analytics, and customer segmentation.", link: "/industries/marketing-advertising" }
];

export default function Services() {
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

            <section className="services-section">
                <div className="container">
                    <Reveal width="100%">
                        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Business Automations</h2>
                    </Reveal>
                    <div className="grid">
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

                    <Reveal width="100%">
                        <h2 style={{ fontSize: '2rem', marginTop: '4rem', marginBottom: '2rem' }}>Products</h2>
                    </Reveal>
                    <div className="grid">
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

                    <Reveal width="100%">
                        <h2 style={{ fontSize: '2rem', marginTop: '4rem', marginBottom: '2rem' }}>Personal Automations</h2>
                    </Reveal>
                    <div className="grid">
                        <Reveal delay={0.2} width="100%">
                            <div className="card">
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Coming Soon</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>We are working on bringing personal automation services to you.</p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    )
}
