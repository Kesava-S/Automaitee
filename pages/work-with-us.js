import Head from 'next/head'
import { Reveal } from '../components/Reveal'
import Link from 'next/link'
import { useState } from 'react'

export default function WorkWithUs() {
    const [showWorkflow, setShowWorkflow] = useState(false)
    return (
        <>
            <Head>
                <title>Work With Us | Automaitee Digital</title>
                <meta name="description" content="Discover life at Automaitee Digital and explore open roles to join our team." />
            </Head>

            <div style={{ paddingTop: '120px', paddingBottom: '60px', textAlign: 'center' }}>
                <div className="container">
                    <Reveal width="100%">
                        <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(180deg, #1d1d1f 0%, #434344 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Life at Automaitee Digital
                        </h1>
                    </Reveal>
                    <Reveal width="100%" delay={0.2}>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
                            We are a team of passionate automation engineers, designers, and innovators focused on simplifying work and empowering people with AI.
                            At Automaitee Digital, we value a transparent, proactive, and collaborative work environment where people can do the best work of their careers. You’ll get to work on exciting projects, innovate across industries, and help build personalized automation solutions that empower businesses to work smarter, not harder. Join us in shaping the future of meaningful AI automation.
                        </p>
                    </Reveal>
                </div>
            </div>

            <section className="services-section" style={{ background: '#fbfbfd' }}>
                <div className="container">
                    <Reveal width="100%">
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2 className="section-title">Open Roles</h2>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                                Ready to make an impact? Explore our current openings below.
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid">
                        <Reveal>
                            <div className="card" style={{ padding: '2.5rem', textAlign: 'left', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.75rem', fontWeight: '700', margin: 0, color: 'var(--foreground)' }}>
                                            Internship Selection Program
                                        </h3>
                                        <h4 style={{ fontSize: '1.25rem', color: '#0071e3', fontWeight: '600', marginTop: '0.25rem', marginBottom: '1rem' }}>
                                            AI Marketing Automation Intern
                                        </h4>
                                    </div>
                                    <span style={{ background: '#e0ece0', color: '#116c4c', padding: '0.35rem 0.85rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 'bold' }}>Internship</span>
                                </div>
                                
                                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem', maxWidth: '800px' }}>
                                    A structured 3-stage programme to select, train, and place the best CS students as AI Marketing Automation Interns at Automaitee Digital.
                                </p>

                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
                                    <button 
                                        onClick={() => setShowWorkflow(!showWorkflow)} 
                                        className="cta-button" 
                                        style={{ padding: '0.75rem 1.5rem', fontWeight: '600', background: showWorkflow ? '#f8fafc' : 'transparent', color: showWorkflow ? '#64748b' : 'var(--text-primary)', border: showWorkflow ? '1px solid #cbd5e1' : '1px solid #c7c7cc', cursor: 'pointer' }}
                                    >
                                        How It Works
                                    </button>
                                </div>

                                {/* Application Process Flow */}
                                {showWorkflow && (
                                    <div id="workflow" style={{ marginBottom: '2.5rem', padding: '1.75rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                                        <h5 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--foreground)' }}>Application Workflow</h5>
                                        
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
                                            {/* Vertical line connecting parts */}
                                            <div style={{ position: 'absolute', left: '15px', top: '10px', bottom: '10px', width: '2px', background: '#cbd5e1', zIndex: 0 }}></div>
                                            
                                            {[
                                                { title: "Submit Form", desc: "Students submit the form on the website" },
                                                { title: "Eligibility Screen", desc: "Eligibility is automatically screened" },
                                                { title: "Acknowledgement", desc: "Acknowledgement email is sent" },
                                                { title: "Program Fee", desc: "Pay ₹1000" },
                                                { title: "Course", desc: "1 month course with real time tasks" },
                                                { title: "Live Evaluation", desc: "Best performers called for live evaluation" },
                                                { title: "Training", desc: "Selected students enter 2 month Training" },
                                                { title: "Internship Selection", desc: "Top performers confirmed for Internship based on performance" }
                                            ].map((step, idx) => (
                                                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0071e3', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0, fontSize: '0.9rem', boxShadow: '0 0 0 4px #f8fafc' }}>
                                                        {idx + 1}
                                                    </div>
                                                    <div style={{ paddingTop: '5px' }}>
                                                        <div style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--foreground)', lineHeight: '1.2' }}>{step.title}</div>
                                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.35rem' }}>{step.desc}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Eligibility Criteria */}
                                <div id="eligibility" style={{ marginBottom: '2rem' }}>
                                    <h5 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--foreground)' }}>Eligibility Criteria (Required)</h5>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Applicants must meet all of the following requirements:</p>
                                    <ul style={{ paddingLeft: '1.5rem', margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                        <li style={{ marginBottom: '0.5rem' }}>Currently enrolled in Computer Science, IT, BCA, MCA, or a related degree programme</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Middle-year undergraduate students or first-year master’s students only <br/><span style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>(Final-semester students are not eligible, as the program requires sufficient time and commitment)</span></li>
                                        <li style={{ marginBottom: '0.5rem' }}>Minimum 65% aggregate in current academic performance</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Minimum 70% attendance in current college</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Must have a personal laptop (shared or lab computers are not acceptable)</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Must have a stable internet connection at home for live online sessions</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Basic understanding of at least one programming language, APIs, or JSON</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Must be available for 8 hours per week throughout the 1-month course</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Must attend all live sessions</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Maximum 1 absence allowed with prior notice before the session starts</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Missing a session without prior notice will result in immediate disqualification</li>
                                    </ul>
                                </div>

                                {/* Preferred Qualifications */}
                                <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#fbfbfd', borderRadius: '0.75rem', border: '1px solid var(--card-border)' }}>
                                    <h5 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--foreground)' }}>Preferred Qualifications (Not Mandatory)</h5>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>These will increase selection chances:</p>
                                    <ul style={{ paddingLeft: '1.5rem', margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                        <li style={{ marginBottom: '0.5rem' }}>Active GitHub profile with personal or academic projects</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Basic exposure to digital marketing tools (Meta Ads Manager, Google Ads, etc.)</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Knowledge of JavaScript, APIs, or JSON</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Experience using AI tools independently (Claude Code, Claude Cowork, Claude Skills, etc.)</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Any freelance work or side projects showing initiative and self-driven learning</li>
                                    </ul>
                                </div>

                                {/* May Reduce Selection Chances */}
                                <div style={{ marginBottom: '2rem' }}>
                                    <h5 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '1rem', color: '#f5a623' }}>May Reduce Selection Chances</h5>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>These do not disqualify, but may reduce selection chances if competition is high:</p>
                                    <ul style={{ paddingLeft: '1.5rem', margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                        <li style={{ marginBottom: '0.5rem' }}>No coding exposure</li>
                                        <li style={{ marginBottom: '0.5rem' }}>No GitHub or personal portfolio</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Academic performance below 65%</li>
                                        <li style={{ marginBottom: '0.5rem' }}>College attendance below 75% (may indicate lower commitment)</li>
                                    </ul>
                                </div>

                                {/* Automatic Disqualification */}
                                <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#fffcfc', borderRadius: '0.75rem', border: '1px solid #fee2e2' }}>
                                    <h5 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '1rem', color: '#d93025' }}>Automatic Disqualification (No Exceptions)</h5>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Applicants will be automatically rejected if any of the following apply:</p>
                                    <ul style={{ paddingLeft: '1.5rem', margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                        <li style={{ marginBottom: '0.5rem' }}>Not from CS, IT, BCA, MCA, or related field</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Final-semester student with less than 6 months remaining</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Academic aggregate below 65%</li>
                                        <li style={{ marginBottom: '0.5rem' }}>College attendance below 70%</li>
                                        <li style={{ marginBottom: '0.5rem' }}>No personal laptop</li>
                                        <li style={{ marginBottom: '0.5rem' }}>No stable home internet connection</li>
                                        <li style={{ marginBottom: '0.5rem' }}>No basic coding knowledge</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Missing a live session without prior notice during the course</li>
                                    </ul>
                                </div>

                                <p style={{ color: 'var(--foreground)', fontWeight: '500', fontSize: '1rem', marginBottom: '2.5rem', padding: '1rem', background: '#f5f5f7', borderRadius: '0.5rem' }}>
                                    This opportunity is designed for committed students who are willing to learn quickly and actively participate throughout the program.
                                </p>

                                <div style={{ textAlign: 'center' }}>
                                    <Link href="/apply?role=AI+Marketing+Automation+Intern" className="cta-button">
                                        Apply Now
                                    </Link>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal width="100%">
                        <div style={{ textAlign: 'center', marginTop: '5rem', padding: '3rem 2rem', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '700' }}>Don't see a fit?</h2>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                                We are always looking for driven individuals. Send us your resume and a quick overview of how you can contribute to our vision.
                            </p>
                            <a href="mailto:careers@automaitee.com" className="cta-button">
                                Email Us: careers@automaitee.com
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    )
}
