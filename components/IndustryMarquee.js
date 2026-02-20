import React, { useState } from 'react';
import Link from 'next/link';

const industries = [
    { name: "Hospitality & Food Services", desc: "Custom automation solutions for hotels, restaurants, cafes, and boutique hospitality businesses.", link: "/industries/hospitality-food-services" },
    { name: "Clinics & Healthcare", desc: "Streamline patient scheduling, automated reminders, and seamless EHR data entry.", link: "#" },
    { name: "Gyms & Fitness Studios", desc: "Automate memberships, class bookings, and targeted client engagement.", link: "#" },
    { name: "Real Estate Agencies", desc: "Manage leads, schedule viewings, and automate follow-ups for higher conversions.", link: "#" },
    { name: "Rental & Property Businesses", desc: "Automate rent collection reminders, maintenance requests, and tenant onboarding.", link: "#" },
    { name: "Service Businesses", desc: "Enhance quotes, invoicing, and service dispatching effortlessly.", link: "#" }
];

// Duplicate the array to create the seamless loop effect
const marqueeItems = [...industries, ...industries, ...industries, ...industries];

export const IndustryMarquee = () => {
    const [activeIndustry, setActiveIndustry] = useState(null);

    return (
        <div style={{ padding: '6rem 0 2rem 0', background: '#fbfbfd', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)', position: 'relative' }}>
            <div className="container">
                <h2 className="section-title" style={{ marginBottom: '1rem' }}>Industries We Work With</h2>
            </div>

            <div className="marquee-container" style={{ overflow: 'hidden', paddingBottom: '20px' }}>
                <div className={`marquee-track ${activeIndustry ? 'paused' : ''}`} style={activeIndustry ? { animationPlayState: 'paused' } : {}}>
                    {marqueeItems.map((item, index) => (
                        <div
                            key={index}
                            className="marquee-item"
                            style={{ cursor: 'pointer', transition: 'all 0.3s ease', transform: activeIndustry?.name === item.name ? 'scale(1.05)' : 'scale(1)' }}
                            onClick={() => setActiveIndustry(activeIndustry?.name === item.name ? null : item)}
                        >
                            <span style={{ color: activeIndustry?.name === item.name ? '#0071e3' : 'inherit' }}>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{
                height: activeIndustry ? 'auto' : '0px',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: activeIndustry ? 1 : 0
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', padding: activeIndustry ? '20px 20px 40px 20px' : '0 20px' }}>
                    {activeIndustry && (
                        <div className="industry-dropdown" style={{
                            background: 'white',
                            padding: '2.5rem',
                            borderRadius: '24px',
                            boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                            maxWidth: '650px',
                            width: '100%',
                            textAlign: 'center',
                            border: '1px solid var(--card-border)'
                        }}>
                            <h3 style={{ marginBottom: '1rem', color: 'var(--foreground)', fontSize: '1.5rem', fontWeight: 600 }}>{activeIndustry.name}</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6', fontSize: '1.1rem' }}>{activeIndustry.desc}</p>
                            {activeIndustry.link !== "#" ? (
                                <Link href={activeIndustry.link} className="cta-button" style={{ padding: '12px 32px', fontSize: '1rem' }}>
                                    Learn More
                                </Link>
                            ) : (
                                <button className="cta-button" style={{ padding: '12px 32px', fontSize: '1rem', opacity: 0.5, cursor: 'not-allowed' }} disabled>
                                    Coming Soon
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .marquee-track.paused {
                    animation-play-state: paused !important;
                }
            `}</style>
        </div>
    );
};
