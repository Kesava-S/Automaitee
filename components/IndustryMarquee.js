import React from 'react';
import { Building, HeartPulse, Dumbbell, Home, Briefcase, Key, Megaphone } from 'lucide-react';

const industries = [
    { name: "Hospitality & Food Services", icon: <Building size={20} /> },
    { name: "Healthcare & Wellness", icon: <HeartPulse size={20} /> },
    { name: "Gyms & Fitness Studios", icon: <Dumbbell size={20} /> },
    { name: "Education & Training", icon: <Briefcase size={20} /> },
    { name: "Rental & Property Businesses", icon: <Key size={20} /> },
    { name: "Marketing & Advertising", icon: <Megaphone size={20} /> }
];

export const IndustryMarquee = () => {
    return (
        <div className="industry-marquee-wrapper">
            <div className="container">
                <h2 className="section-title" style={{ marginBottom: '2rem' }}>Industries We Work With</h2>
            </div>

            <div className="industries-grid" style={{ paddingBottom: '30px', paddingTop: '10px' }}>
                <div className="industries-wrap">
                    {industries.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="industry-pill"
                            >
                                <div className="pill-content">
                                    <span className="pill-icon">{item.icon}</span>
                                    <span className="pill-name">{item.name}</span>
                                </div>
                            </div>
                        );
                    })}
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

                .industries-wrap {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 1.5rem;
                }
                
                .industry-pill {
                    display: inline-flex;
                    background: white;
                    border: 1px solid #e5e5e5;
                    border-radius: 50px;
                    padding: 12px 24px;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
                    user-select: none;
                }
                
                .industry-pill:hover {
                    transform: translateY(-4px) scale(1.02);
                    box-shadow: 0 12px 24px rgba(0, 113, 227, 0.15);
                    border-color: #0071e3;
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

                @media (max-width: 768px) {
                    .industry-marquee-wrapper {
                        padding: 3rem 0 1rem 0;
                    }
                    .industries-wrap {
                        gap: 1rem;
                    }
                    .industry-pill {
                        padding: 10px 16px;
                    }
                    .pill-name {
                        font-size: 0.95rem;
                    }
                }
            `}</style>
        </div>
    );
};
