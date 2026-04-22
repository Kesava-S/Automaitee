import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Reveal } from '../../components/Reveal';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

export default function Services() {
    const [showComparison, setShowComparison] = useState(false);

    return (
        <>
            <Head>
                <title>Done-For-You Marketing Automation | Automaitee</title>
            </Head>

            {/* HERO SECTION */}
            <div style={{ paddingTop: '120px', paddingBottom: '60px', textAlign: 'center' }}>
                <div className="container">
                    <Reveal width="100%">
                        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', background: 'linear-gradient(180deg, #1d1d1f 0%, #434344 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', maxWidth: '900px', margin: '0 auto 1.5rem' }}>
                            Done-For-You
                        </h1>
                    </Reveal>
                    <Reveal width="100%" delay={0.2}>
                        <p style={{ 
                            fontSize: '1.25rem', 
                            maxWidth: '700px', 
                            margin: '0 auto',
                            color: '#515154',
                            lineHeight: '1.6'
                        }}>
                            We build automated marketing systems that generate leads, respond instantly, and report results, without you lifting a finger.
                        </p>
                    </Reveal>
                </div>
            </div>

            {/* SECTION 1 - The Problem */}
            <section style={{ padding: '60px 0', backgroundColor: '#f5f5f7' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <Reveal width="100%">
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>The Problem</h2>
                        <p style={{ fontSize: '1.1rem', color: '#1d1d1f', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                            Running a small business in London means wearing every hat. You are managing the team, serving customers, and somehow supposed to be running ads, replying to enquiries, and tracking what is working, all at the same time.
                        </p>
                        <p style={{ fontSize: '1.1rem', color: '#1d1d1f', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                            Most businesses lose leads simply because nobody replied fast enough. Most waste ad spend because nobody is watching the numbers closely enough. Most have no idea which channel is actually bringing customers in.
                        </p>
                        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0071e3', textAlign: 'center', marginTop: '2rem' }}>
                            We fix all three. Automatically.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* SECTION 2 - What we do */}
            <section style={{ padding: '80px 0' }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                    <Reveal width="100%">
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1.4', background: 'linear-gradient(90deg, #116c4c 0%, #0071e3 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            We build custom marketing automation systems that run your lead generation, customer responses, and performance reporting on autopilot, so you can focus on running your business.
                        </h2>
                    </Reveal>
                </div>
            </section>

            {/* SECTION 3 - Packages */}
            <section style={{ padding: '60px 0', backgroundColor: '#fbfbfd' }}>
                <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div className="grid">
                        {/* Starter Package */}
                        <Reveal delay={0.1}>
                            <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '2rem', border: '1px solid #e5e5ea', borderRadius: '16px', backgroundColor: '#fff' }}>
                                <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#1d1d1f' }}>STARTER</h3>
                                <p style={{ color: '#86868b', marginBottom: '1rem', flexGrow: 0 }}>Best for businesses just getting started with automation</p>
                                <p style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '2rem' }}>Monthly retainer from £600/month</p>
                                
                                <div style={{ marginBottom: '2rem' }}>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#1d1d1f' }}>What happens automatically every day:</h4>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {[
                                            "Your ads on Google and Meta are monitored — you get an instant alert if spend goes over budget",
                                            "Every lead that comes in gets a personalised reply within 60 seconds — by email and WhatsApp",
                                            "Your Google Business Profile stays active with weekly posts published for you",
                                            "New reviews are flagged the moment they appear — so you can respond before they affect your reputation",
                                            "Every Monday you receive a clean report showing exactly how your marketing performed last week"
                                        ].map((item, i) => (
                                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.8rem', color: '#515154' }}>
                                                <Check size={20} color="#0071e3" style={{ marginRight: '10px', marginTop: '2px', flexShrink: 0 }} />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid #e5e5ea' }}>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#1d1d1f' }}>What you get:</h4>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {[
                                            "2 ad platforms connected (Google Ads + Meta Ads)",
                                            "Instant lead response via email and WhatsApp",
                                            "Automated chatbot on Facebook, Instagram, and WhatsApp",
                                            "Google Business Profile automation",
                                            "Weekly performance report delivered to your inbox"
                                        ].map((item, i) => (
                                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem', fontWeight: '500' }}>
                                                <span style={{ color: '#0071e3', marginRight: '8px' }}>•</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Reveal>

                        {/* Pro Package */}
                        <Reveal delay={0.2}>
                            <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '2rem', border: '2px solid #0071e3', borderRadius: '16px', backgroundColor: '#fff', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#0071e3', color: '#fff', padding: '4px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>POPULAR</div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#1d1d1f' }}>PRO</h3>
                                <p style={{ color: '#86868b', marginBottom: '1rem', flexGrow: 0 }}>Best for businesses ready to scale with a full automated marketing engine</p>
                                <p style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '2rem', color: '#0071e3' }}>Monthly retainer from £1,200/month</p>
                                
                                <div style={{ marginBottom: '2rem' }}>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#1d1d1f' }}>Everything in Starter, plus:</h4>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {[
                                            "All four ad platforms connected — Google, Meta, LinkedIn, and TikTok",
                                            "AI-powered chatbot that handles complex conversations naturally across all channels",
                                            "Automated booking system — customers book, get confirmed, and receive reminders without you involved",
                                            "Review requests sent automatically after every completed booking or purchase",
                                            "Overdue invoice reminders sent automatically",
                                            "AI-written weekly report — plain English summary of what worked, what did not, and what to do next week",
                                            "Full attribution tracking — see exactly which ad brought which customer"
                                        ].map((item, i) => (
                                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.8rem', color: '#515154' }}>
                                                <Check size={20} color="#0071e3" style={{ marginRight: '10px', marginTop: '2px', flexShrink: 0 }} />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* SECTION 4 - Timeline */}
            <section style={{ padding: '80px 0' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <Reveal width="100%">
                        <h2 style={{ fontSize: '2rem', marginBottom: '3rem', textAlign: 'center' }}>What to expect</h2>
                    </Reveal>
                    <div className="timeline">
                        {[
                            { time: "Week 1–2", desc: "We set up your system, connect your platforms, and configure everything to your business." },
                            { time: "Week 3–4", desc: "Your system goes live. Leads start being captured and responded to automatically. Your first weekly report arrives." },
                            { time: "Month 2", desc: "You start seeing which channels are performing. We optimise based on real data." },
                            { time: "Month 3 onwards", desc: "The system runs itself. You focus on the business. We monitor, refine, and improve." }
                        ].map((step, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <div style={{ display: 'flex', marginBottom: '2rem', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: '150px', fontWeight: 'bold', color: '#0071e3', fontSize: '1.1rem', paddingTop: '4px' }}>
                                        {step.time}
                                    </div>
                                    <div style={{ flex: 1, paddingLeft: '1.5rem', borderLeft: '2px solid #e5e5ea', paddingBottom: '1rem' }}>
                                        <p style={{ margin: 0, fontSize: '1.1rem', color: '#1d1d1f' }}>{step.desc}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 5 - Comparison Table Modal/Accordion */}
            <section style={{ padding: '0 0 80px 0' }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                    <button 
                        onClick={() => setShowComparison(!showComparison)}
                        style={{ 
                            background: '#1d1d1f', 
                            color: '#fff', 
                            border: 'none', 
                            padding: '16px 32px', 
                            fontSize: '1.1rem', 
                            borderRadius: '30px', 
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'all 0.3s'
                        }}
                    >
                        Compare Starter vs Pro
                        {showComparison ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>

                    {showComparison && (
                        <Reveal>
                            <div style={{ marginTop: '2rem', overflowX: 'auto', textAlign: 'left' }}>
                                <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                                    <thead>
                                        <tr style={{ background: '#f5f5f7' }}>
                                            <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #e5e5ea', width: '33%' }}>Feature</th>
                                            <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #e5e5ea', width: '33%' }}>Starter</th>
                                            <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #e5e5ea', width: '33%', color: '#0071e3' }}>Pro</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            ["Ad platforms", "Google + Meta", "Google + Meta + LinkedIn + TikTok"],
                                            ["Instant lead reply", "Email + WhatsApp", "Email + WhatsApp"],
                                            ["Chatbot", "Keyword-based", "AI-powered — natural conversation"],
                                            ["Channels", "FB + Insta + WhatsApp", "All channels unified"],
                                            ["Booking automation", "No", "Yes — Calendar + confirmation + reminder"],
                                            ["Review requests", "No", "Automated after every booking"],
                                            ["Invoice reminders", "No", "Automated Day 3, Day 7, Day 14"],
                                            ["Reporting", "Weekly KPI email", "AI-written weekly summary + strategy brief"],
                                            ["Attribution tracking", "Basic", "Full ad-to-conversion chain"],
                                            ["Monthly retainer", "From £600/month", "From £1,200/month", true]
                                        ].map((row, i) => (
                                            <tr key={i} style={{ borderBottom: '1px solid #e5e5ea' }}>
                                                <td style={{ padding: '16px', fontWeight: row[3] ? 'bold' : 'normal', color: '#1d1d1f' }}>{row[0]}</td>
                                                <td style={{ padding: '16px', color: '#515154', fontWeight: row[3] ? 'bold' : 'normal' }}>{row[1]}</td>
                                                <td style={{ padding: '16px', color: '#1d1d1f', fontWeight: 'bold' }}>{row[2]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Reveal>
                    )}
                </div>
            </section>

            {/* SECTION 6 - CTA */}
            <section style={{ padding: '100px 0', backgroundColor: '#0071e3', color: '#fff', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <Reveal>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Book your free consultation</h2>
                        <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', opacity: 0.9, lineHeight: '1.6' }}>
                            Not sure which package is right for you? Book a free 30-minute consultation. We will review your current setup, identify where you are losing leads, and recommend exactly what your business needs.
                        </p>
                        <Link href="/book-consultation" style={{ 
                            display: 'inline-block',
                            background: '#fff', 
                            color: '#0071e3', 
                            padding: '16px 32px', 
                            fontSize: '1.1rem', 
                            fontWeight: 'bold',
                            borderRadius: '30px',
                            textDecoration: 'none',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
                        }}>
                            Book Free Consultation
                        </Link>
                    </Reveal>
                </div>
            </section>

            <style jsx>{`
                .grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }
                @media (min-width: 768px) {
                    .grid {
                        grid-template-columns: 1fr 1fr;
                    }
                }
                .comparison-table th, .comparison-table td {
                    font-size: 0.95rem;
                }
                @media (min-width: 768px) {
                    .comparison-table th, .comparison-table td {
                        font-size: 1.05rem;
                    }
                }
            `}</style>
        </>
    );
}
