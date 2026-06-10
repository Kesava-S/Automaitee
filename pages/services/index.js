import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Reveal } from '../../components/Reveal';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

export default function Services() {
    const router = useRouter();
    const [showComparison, setShowComparison] = useState(false);
    const [showMicro, setShowMicro] = useState(false);
    const [showFullFunnel, setShowFullFunnel] = useState(false);

    useEffect(() => {
        if (router.isReady && router.query.openMicro === 'true') {
            setShowMicro(true);
            setTimeout(() => {
                const element = document.getElementById('our-solutions');
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        }
    }, [router.isReady, router.query]);

    return (
        <>
            <Head>
                <title>Done-For-You Marketing Automation | Automaitee</title>
                <meta name="description" content="Done-for-you AI marketing automation for London small businesses. Generate leads, respond instantly, and track results automatically, starting from £49/month." />
            </Head>

            {/* HERO SECTION */}
            <div style={{ paddingTop: '120px', paddingBottom: '60px', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', background: 'linear-gradient(180deg, #1d1d1f 0%, #434344 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', maxWidth: '900px', margin: '0 auto 1.5rem' }}>
                        Done-For-You AI Marketing Automation for London Small Businesses
                    </h1>
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
                            We fix them. Automatically.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* SECTION 2 - Our Solutions */}
            <section id="our-solutions" style={{ padding: '80px 0', backgroundColor: '#fbfbfd', scrollMarginTop: '100px' }}>
                <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <Reveal width="100%">
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1d1d1f' }}>Our Solutions</h2>
                            <p style={{ fontSize: '1.1rem', color: '#515154', maxWidth: '700px', margin: '0.5rem auto 0' }}>
                                We build custom marketing automation systems that run your lead generation, customer responses, and performance reporting on autopilot.
                            </p>
                        </div>
                    </Reveal>

                    {/* Dropdown 1: Micro Automation Services */}
                    <Reveal width="100%">
                        <div style={{ marginBottom: '2rem' }}>
                            <button 
                                onClick={() => setShowMicro(!showMicro)}
                                aria-expanded={showMicro}
                                aria-controls="micro-services-content"
                                style={{ 
                                    width: '100%', 
                                    background: '#fff', 
                                    border: '1px solid #e5e5ea', 
                                    padding: '24px 32px', 
                                    borderRadius: '16px', 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center', 
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1d1d1f', margin: 0 }}>Micro Automation Services</h3>
                                    <p style={{ fontSize: '1rem', color: '#515154', margin: '0.5rem 0 0' }}>Targeted, specific automation tools that solve one problem perfectly.</p>
                                </div>
                                <div style={{ color: '#0071e3', paddingLeft: '20px' }}>
                                    {showMicro ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
                                </div>
                            </button>

                            {showMicro && (
                                <div id="micro-services-content" style={{ padding: '2rem 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                    {/* Beauty Salons Option */}
                                    <Link href="/industries/beauty-salons" style={{ textDecoration: 'none' }}>
                                        <div className="card micro-saas-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '2rem', border: '1px solid #e5e5ea', borderRadius: '16px', backgroundColor: '#fff', transition: 'all 0.3s' }}>
                                            <div style={{ background: '#f5f5f7', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                                <span role="img" aria-label="scissors" style={{ fontSize: '1.5rem' }}>✂️</span>
                                            </div>
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: '#1d1d1f' }}>SilentChurn for Beauty Salons</h3>
                                            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#34c759', marginBottom: '1rem' }}>£49 / month</div>
                                            <p style={{ color: '#515154', marginBottom: '1rem', flexGrow: 1, lineHeight: '1.6' }}>
                                                Your regulars are quietly leaving. We bring them back automatically. A simple, zero-management tool to recover lost revenue.
                                             </p>
                                            <div style={{ marginTop: '1rem', color: '#0071e3', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                View Details <span>→</span>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Card 2: Post-Visit Loyalty & Feedback Loop */}
                                    <Link href="/book-consultation" style={{ textDecoration: 'none' }}>
                                        <div className="card micro-saas-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '2rem', border: '1px solid #e5e5ea', borderRadius: '16px', backgroundColor: '#fff', transition: 'all 0.3s' }}>
                                            <div style={{ background: '#fff8e1', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                                <span role="img" aria-label="star" style={{ fontSize: '1.5rem' }}>⭐</span>
                                            </div>
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: '#1d1d1f' }}>Post-Visit Loyalty &amp; Feedback Loop</h3>
                                            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#34c759', marginBottom: '1rem' }}>£49 / month</div>
                                            <p style={{ color: '#515154', marginBottom: '1rem', flexGrow: 1, lineHeight: '1.6' }}>
                                                Turn every meal into a return visit. Automatically collect feedback and route happy customers to Google Reviews, while catching unhappy ones before they post publicly.
                                            </p>
                                            <div style={{ marginTop: '1rem', color: '#0071e3', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                Book a Free Consultation <span>→</span>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Card 3: Allergen Compliance Checker */}
                                    <Link href="/book-consultation" style={{ textDecoration: 'none' }}>
                                        <div className="card micro-saas-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '2rem', border: '1px solid #e5e5ea', borderRadius: '16px', backgroundColor: '#fff', transition: 'all 0.3s' }}>
                                            <div style={{ background: '#fff3e0', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                                <span role="img" aria-label="warning" style={{ fontSize: '1.5rem' }}>⚠️</span>
                                            </div>
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: '#1d1d1f' }}>Allergen Compliance Checker</h3>
                                            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#34c759', marginBottom: '1rem' }}>£49 / month</div>
                                            <p style={{ color: '#515154', marginBottom: '1rem', flexGrow: 1, lineHeight: '1.6' }}>
                                                Automatically verify every menu item against the 14 major allergens. Catch non-compliant items the moment your menu changes, before they become a legal liability. <em style={{ color: '#86868b', fontStyle: 'normal' }}>Natasha's Law compliant.</em>
                                            </p>
                                            <div style={{ marginTop: '1rem', color: '#0071e3', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                Book a Free Consultation <span>→</span>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Card 4: No-Show & Reservation Recovery Bot */}
                                    <Link href="/book-consultation" style={{ textDecoration: 'none' }}>
                                        <div className="card micro-saas-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '2rem', border: '1px solid #e5e5ea', borderRadius: '16px', backgroundColor: '#fff', transition: 'all 0.3s' }}>
                                            <div style={{ background: '#e8f5e9', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                                <span role="img" aria-label="calendar" style={{ fontSize: '1.5rem' }}>📅</span>
                                            </div>
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: '#1d1d1f' }}>No-Show &amp; Reservation Recovery Bot</h3>
                                            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#34c759', marginBottom: '1rem' }}>£49 / month</div>
                                            <p style={{ color: '#515154', marginBottom: '1rem', flexGrow: 1, lineHeight: '1.6' }}>
                                                When a reservation is cancelled, the bot contacts your waitlist, matches party size, and fills the table, all within 15 minutes, with zero manual effort.
                                            </p>
                                            <div style={{ marginTop: '1rem', color: '#0071e3', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                Book a Free Consultation <span>→</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </Reveal>

                    {/* Dropdown 2: Full Funnel Systems */}
                    <Reveal width="100%" delay={0.1}>
                        <div style={{ marginBottom: '2rem' }}>
                            <button 
                                onClick={() => setShowFullFunnel(!showFullFunnel)}
                                aria-expanded={showFullFunnel}
                                aria-controls="full-funnel-services-content"
                                style={{ 
                                    width: '100%', 
                                    background: '#fff', 
                                    border: '1px solid #e5e5ea', 
                                    padding: '24px 32px', 
                                    borderRadius: '16px', 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center', 
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1d1d1f', margin: 0 }}>Full Funnel Systems</h3>
                                    <p style={{ fontSize: '1rem', color: '#515154', margin: '0.5rem 0 0' }}>Comprehensive automation for lead generation, response, and reporting.</p>
                                </div>
                                <div style={{ color: '#0071e3', paddingLeft: '20px' }}>
                                    {showFullFunnel ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
                                </div>
                            </button>

                            {showFullFunnel && (
                                <>
                                    <div id="full-funnel-services-content" className="grid" style={{ padding: '2rem 0' }}>
                                    {/* Starter Package */}
                                    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '2rem', border: '1px solid #e5e5ea', borderRadius: '16px', backgroundColor: '#fff' }}>
                                        <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#1d1d1f' }}>STARTER</h3>
                                        <p style={{ color: '#86868b', marginBottom: '1rem', flexGrow: 0 }}>Best for businesses just getting started with automation</p>
                                        <p style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '2rem' }}>Monthly retainer from £600/month</p>
                                        
                                        <div style={{ marginBottom: '2rem' }}>
                                            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#1d1d1f' }}>What happens automatically every day:</h4>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                {[
                                                    "Your ads on Google and Meta are monitored, so you get an instant alert if spend goes over budget",
                                                    "Every lead that comes in gets a personalised reply within 60 seconds, sent by email and WhatsApp",
                                                    "Your Google Business Profile stays active with weekly posts published for you",
                                                    "New reviews are flagged the moment they appear, allowing you to respond before they affect your reputation",
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
                                        
                                        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e5ea', textAlign: 'center' }}>
                                            <Link href="/services/starter" style={{ color: '#0071e3', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                                Learn More &amp; View Details <span>→</span>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Pro Package */}
                                    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '2rem', border: '2px solid #0071e3', borderRadius: '16px', backgroundColor: '#fff', position: 'relative' }}>
                                        <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#0071e3', color: '#fff', padding: '4px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>POPULAR</div>
                                        <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#1d1d1f' }}>PRO</h3>
                                        <p style={{ color: '#86868b', marginBottom: '1rem', flexGrow: 0 }}>Best for businesses ready to scale with a full automated marketing engine</p>
                                        <p style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '2rem', color: '#0071e3' }}>Monthly retainer from £1,200/month</p>
                                        
                                        <div style={{ marginBottom: '2rem' }}>
                                            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#1d1d1f' }}>Everything in Starter, plus:</h4>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                {[
                                                    "All four ad platforms connected, including Google, Meta, LinkedIn, and TikTok",
                                                    "AI-powered chatbot that handles complex conversations naturally across all channels",
                                                    "Automated booking system where customers book, get confirmed, and receive reminders without you involved",
                                                    "Review requests sent automatically after every completed booking or purchase",
                                                    "Overdue invoice reminders sent automatically",
                                                    "AI-written weekly report providing a plain English summary of what worked, what did not, and what to do next week",
                                                    "Full attribution tracking to see exactly which ad brought which customer"
                                                ].map((item, i) => (
                                                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.8rem', color: '#515154' }}>
                                                        <Check size={20} color="#0071e3" style={{ marginRight: '10px', marginTop: '2px', flexShrink: 0 }} />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid #e5e5ea', textAlign: 'center' }}>
                                            <Link href="/services/pro" style={{ color: '#0071e3', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                                Learn More &amp; View Details <span>→</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline inside Full Funnel */}
                                <div style={{ paddingTop: '4rem', borderTop: '1px solid #e5e5ea', marginTop: '4rem' }}>
                                    <Reveal width="100%">
                                        <h2 style={{ fontSize: '2rem', marginBottom: '3rem', textAlign: 'center' }}>What to expect</h2>
                                    </Reveal>
                                    <div className="timeline" style={{ maxWidth: '800px', margin: '0 auto' }}>
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

                                {/* Comparison Table inside Full Funnel */}
                                <div style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
                                    <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                        <button 
                                            onClick={() => setShowComparison(!showComparison)}
                                            aria-expanded={showComparison}
                                            aria-controls="comparison-table-content"
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
                                                <div id="comparison-table-content" style={{ marginTop: '2rem', overflowX: 'auto', textAlign: 'left' }}>
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
                                                                ["Chatbot", "Keyword-based", "AI-powered with natural conversation"],
                                                                ["Channels", "FB + Insta + WhatsApp", "All channels unified"],
                                                                ["Booking automation", "No", "Yes: Calendar, confirmation, and reminders"],
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
                                </div>
                                </>
                            )}
                        </div>
                    </Reveal>
                </div>
            </section>


            {/* SECTION: Built lean. Built to last. */}
            <section style={{ padding: '80px 0', backgroundColor: '#fcfcfd' }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <Reveal width="100%">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'center', color: '#1d1d1f' }}>Built lean. Built to last.</h2>
                        <p style={{ fontSize: '1.1rem', color: '#515154', marginBottom: '1.5rem', lineHeight: '1.7', textAlign: 'center' }}>
                            Most marketing agencies stack your business with tools you half-use and fully pay for. A CRM you never open. A scheduling platform that duplicates what your phone already does. A reporting dashboard that takes 20 minutes to understand.
                        </p>
                        <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1d1d1f', marginBottom: '1.5rem', textAlign: 'center' }}>
                            We deliberately build without them.
                        </p>
                        <p style={{ fontSize: '1.1rem', color: '#515154', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                            Every automation we build uses tools you already have like Google, Gmail, WhatsApp, connected by custom workflows we build specifically for your business. No unnecessary subscriptions. No software you pay for but never master. No digital clutter.
                        </p>
                        <p style={{ fontSize: '1.1rem', color: '#515154', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                            This is not just about saving you money, though you will save between £300 and £800 per month compared to a typical agency and SaaS tool stack. It is about building systems that are lightweight, transparent, and genuinely useful rather than impressive on paper.
                        </p>
                        <p style={{ fontSize: '1.1rem', color: '#515154', marginBottom: '3rem', lineHeight: '1.7' }}>
                            Fewer tools means fewer things to break. Fewer logins means less confusion. And a business running on lean, purposeful automation is a business that scales cleanly.
                        </p>
                    </Reveal>

                    <Reveal width="100%">
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#1d1d1f' }}>What we replace and what you save:</h3>
                        <div style={{ overflowX: 'auto', marginBottom: '3rem' }}>
                            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                                <thead>
                                    <tr style={{ background: '#f5f5f7' }}>
                                        <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #e5e5ea', width: '33%' }}>What most agencies add</th>
                                        <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #e5e5ea', width: '33%' }}>What we use instead</th>
                                        <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #e5e5ea', width: '33%', color: '#116c4c' }}>Typical monthly saving</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ["CRM software", "Google Sheets", "£50 – £300"],
                                        ["Email marketing platform", "Gmail via automation", "£30 – £150"],
                                        ["Social scheduling tool", "Direct platform publishing", "£50 – £100"],
                                        ["Ad reporting dashboard", "Weekly Drive report", "£100 – £800"],
                                        ["Chatbot platform", "Custom AI chatbot", "£50 – £300"],
                                        ["Booking tool", "Google Calendar automation", "£20 – £80"],
                                        ["Review management tool", "Google Business Profile API", "£50 – £200"]
                                    ].map((row, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid #e5e5ea' }}>
                                            <td style={{ padding: '16px', color: '#515154' }}>{row[0]}</td>
                                            <td style={{ padding: '16px', color: '#1d1d1f', fontWeight: '500' }}>{row[1]}</td>
                                            <td style={{ padding: '16px', color: '#116c4c', fontWeight: 'bold' }}>{row[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Reveal>

                    <Reveal width="100%">
                        <p style={{ fontSize: '1.1rem', color: '#1d1d1f', lineHeight: '1.7', textAlign: 'center', fontWeight: '500', backgroundColor: '#f5f5f7', padding: '24px', borderRadius: '12px' }}>
                            Every Monday morning, a plain English performance report lands in your Google Drive. No dashboard to log into. No charts to decode. Just open it, read it in three minutes, and know exactly what your marketing did last week and what to do next.
                        </p>
                    </Reveal>
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
                .micro-saas-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 24px rgba(0, 113, 227, 0.1) !important;
                    border-color: #0071e3 !important;
                }
            `}</style>
        </>
    );
}
