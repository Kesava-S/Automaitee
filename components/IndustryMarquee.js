import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Building, HeartPulse, Dumbbell, Home, Briefcase, Key } from 'lucide-react';

const industries = [
    { name: "Hospitality & Food Services", icon: <Building size={20} />, desc: "Custom automation solutions for hotels, restaurants, cafes, and boutique hospitality businesses.", link: "/industries/hospitality-food-services" },
    { name: "Clinics & Healthcare", icon: <HeartPulse size={20} />, desc: "Streamline patient scheduling, automated reminders, and seamless EHR data entry.", link: "#" },
    { name: "Gyms & Fitness Studios", icon: <Dumbbell size={20} />, desc: "Automate memberships, class bookings, and targeted client engagement.", link: "#" },
    { name: "Real Estate Agencies", icon: <Home size={20} />, desc: "Manage leads, schedule viewings, and automate follow-ups for higher conversions.", link: "#" },
    { name: "Rental & Property Businesses", icon: <Key size={20} />, desc: "Automate rent collection reminders, maintenance requests, and tenant onboarding.", link: "#" },
    { name: "Service Businesses", icon: <Briefcase size={20} />, desc: "Enhance quotes, invoicing, and service dispatching effortlessly.", link: "#" }
];

// Duplicate the array to create the seamless loop effect
const marqueeItems = [...industries, ...industries, ...industries, ...industries];

export const IndustryMarquee = () => {
    const [activeIndustry, setActiveIndustry] = useState(null);

    return (
        <div className="industry-marquee-wrapper">
            <div className="container">
                <h2 className="section-title" style={{ marginBottom: '2rem' }}>Industries We Work With</h2>
            </div>

            <div className="marquee-container" style={{ overflow: 'hidden', paddingBottom: '30px', paddingTop: '10px' }}>
                <div className={`marquee-track ${activeIndustry ? 'paused' : ''}`}>
                    {marqueeItems.map((item, index) => {
                        const isActive = activeIndustry?.name === item.name;
                        return (
                            <div
                                key={index}
                                className={`industry-pill ${isActive ? 'active' : ''}`}
                                onClick={() => setActiveIndustry(isActive ? null : item)}
                            >
                                <div className="pill-content">
                                    <span className="pill-icon">{item.icon}</span>
                                    <span className="pill-name">{item.name}</span>
                                    <span className="pill-arrow">
                                        <ChevronDown size={18} />
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={`dropdown-wrapper ${activeIndustry ? 'open' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'center', padding: activeIndustry ? '20px 20px 40px 20px' : '0 20px' }}>
                    {activeIndustry && (
                        <div className="industry-dropdown">
                            <div className="dropdown-icon-wrapper">
                                {activeIndustry.icon}
                            </div>
                            <h3 className="dropdown-title">{activeIndustry.name}</h3>
                            <p className="dropdown-desc">{activeIndustry.desc}</p>
                            {activeIndustry.link !== "#" ? (
                                <Link href={activeIndustry.link} className="cta-button" style={{ padding: '12px 32px', fontSize: '1rem' }}>
                                    Learn More
                                </Link>
                            ) : (
                                <button className="cta-button disabled-btn" style={{ padding: '12px 32px', fontSize: '1rem' }} disabled>
                                    Coming Soon
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .industry-marquee-wrapper {
                    padding: 6rem 0 2rem 0;
                    background: #fbfbfd;
                    border-top: 1px solid var(--card-border);
                    border-bottom: 1px solid var(--card-border);
                    position: relative;
                }

                .marquee-track.paused {
                    animation-play-state: paused !important;
                }
                
                .industry-pill {
                    display: inline-flex;
                    margin: 0 1rem;
                    background: white;
                    border: 1px solid #e5e5e5;
                    border-radius: 50px;
                    padding: 12px 24px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
                    user-select: none;
                }
                
                .industry-pill:hover, .industry-pill.active {
                    transform: translateY(-4px) scale(1.02);
                    box-shadow: 0 12px 24px rgba(0, 113, 227, 0.15);
                    border-color: #0071e3;
                    background: #f0f7ff;
                    color: #0071e3;
                }
                
                .pill-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .pill-icon {
                    display: flex;
                    align-items: center;
                    color: inherit;
                }
                
                .pill-name {
                    font-size: 1.1rem;
                    font-weight: 600;
                    white-space: nowrap;
                    color: inherit;
                }
                
                .pill-arrow {
                    display: flex;
                    align-items: center;
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                .industry-pill.active .pill-arrow {
                    transform: rotate(180deg);
                }
                
                .dropdown-wrapper {
                    height: 0;
                    overflow: hidden;
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    opacity: 0;
                }
                
                .dropdown-wrapper.open {
                    height: auto;
                    opacity: 1;
                }
                
                .industry-dropdown {
                    background: white;
                    padding: 3rem;
                    border-radius: 24px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.08);
                    max-width: 650px;
                    width: 100%;
                    text-align: center;
                    border: 1px solid rgba(0, 113, 227, 0.1);
                    position: relative;
                    animation: slideUpFade 0.4s ease-out;
                }
                
                .dropdown-icon-wrapper {
                    width: 60px;
                    height: 60px;
                    background: #f0f7ff;
                    color: #0071e3;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem auto;
                }

                .dropdown-title {
                    margin-bottom: 1rem;
                    color: var(--foreground);
                    font-size: 1.75rem;
                    font-weight: 700;
                }
                
                .dropdown-desc {
                    color: var(--text-secondary);
                    margin-bottom: 2.5rem;
                    line-height: 1.6;
                    font-size: 1.15rem;
                }
                
                .disabled-btn {
                    opacity: 0.5;
                    cursor: not-allowed;
                    background: #d2d2d7;
                    box-shadow: none;
                }
                .disabled-btn:hover {
                    transform: none;
                    box-shadow: none;
                }

                @keyframes slideUpFade {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};
