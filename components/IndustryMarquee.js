
import React from 'react';

const industries = [
    "Hotels & Hospitality",
    "Clinics & Healthcare",
    "Gyms & Fitness Studios",
    "Restaurants & Cafés",
    "Real Estate Agencies",
    "Rental & Property Businesses",
    "Service Businesses"
];

// Duplicate the array to create the seamless loop effect
const marqueeItems = [...industries, ...industries, ...industries, ...industries];

export const IndustryMarquee = () => {
    return (
        <div style={{ padding: '6rem 0', background: '#fbfbfd', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
            <div className="container">
                <h2 className="section-title" style={{ marginBottom: '1rem' }}>Industries We Work With</h2>
            </div>

            <div className="marquee-container">
                <div className="marquee-track">
                    {marqueeItems.map((item, index) => (
                        <div key={index} className="marquee-item">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
