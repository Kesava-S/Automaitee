import Head from 'next/head'
import { Reveal } from '../components/Reveal'

export default function WorkWithUs() {
    const openings = [
        {
            title: "Growth Automation Intern",
            team: "Growth Automation",
            description: "Learn to pull data from campaigns via APIs of Ad Platforms, GMB, GA4 and LinkedIn. Build automation workflows.",
            qualifications: [
                "Pre-final year CS / IT / BCA / MCA student",
                "Knowledge of JSON and APIs",
                "Comfortable in learning new tools and AI"
            ]
        },
        {
            title: "Funnel Automation Intern",
            team: "Platform and Funnel Team",
            description: "Learn to build Automation in chatbots, websites, landing pages, email sequences, and CRM workflows and integrate them seamlessly. Manage SEO and social media automation.",
            qualifications: [
                "Pre Final year CS / IT / BCA / MCA student",
                "Basic coding knowledge — JS or APIs is a plus",
                "Interest in chatbots and AI tools"
            ]
        },
        {
            title: "Analytics & Reporting Intern",
            team: "Analytics & Reporting",
            description: "Learn and work with analytics like GA4 and Google Sheets. Build dashboards and weekly performance reports.",
            qualifications: [
                "Pre-final year Maths/ CS / IT / BCA / MCA student",
                "Strong with numbers and data",
                "Curious about analytics and AI"
            ]
        },
        {
            title: "R&D Intern",
            team: "Research & Development",
            positions: "2 positions",
            description: "Track AI updates daily on AI tools, Data Scraping tools, Marketing tools, ad platforms, and new tools. Test new AI features. Document the findings.",
            qualifications: [
                "Graduate Student",
                "Genuine interest in AI and proficient in English",
                "Self-driven learner"
            ]
        },
        {
            title: "Prompt Engineering Intern",
            team: "Floats across all teams",
            description: "Write and refine AI prompts for chatbots, reports, and workflows. Build a prompt library for the team.",
            qualifications: [
                "Strong English — linguistics or English background preferred",
                "Basic AI tool knowledge (ChatGPT or Claude)",
                "Any year — degree not strictly required if skills are strong"
            ]
        },
        {
            title: "Lead Research & Outreach Intern",
            team: "Outreach",
            description: "Research businesses. Data Scrapping, and Business Pitch preparation, Run cold email outreach.",
            qualifications: [
                "Pre-final year student - any stream",
                "Good written English",
                "Comfortable with research tools"
            ]
        }
    ];

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



                    <Reveal width="100%">
                        <div style={{ textAlign: 'center', marginTop: '5rem', marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--foreground)' }}>Direct Internship Openings</h3>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                                Apply directly for specific internship roles available at our Rajapalayam office.
                            </p>
                        </div>
                    </Reveal>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        {openings.map((job, index) => (
                            <Reveal key={index} delay={index * 0.1}>
                                <div className="card" style={{ padding: '2.5rem', textAlign: 'left', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, color: 'var(--foreground)' }}>
                                                {job.title} {job.positions && <span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--text-secondary)' }}>({job.positions})</span>}
                                            </h3>
                                            <h4 style={{ fontSize: '1.1rem', color: '#0071e3', fontWeight: '600', marginTop: '0.25rem', marginBottom: '1rem' }}>
                                                {job.team}
                                            </h4>
                                        </div>
                                        <span style={{ background: '#e0ece0', color: '#116c4c', padding: '0.35rem 0.85rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 'bold' }}>Internship</span>
                                    </div>
                                    
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <h5 style={{ fontSize: '1.05rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--foreground)' }}>What you will do:</h5>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                            {job.description}
                                        </p>
                                    </div>

                                    <div style={{ marginBottom: '2rem', flexGrow: 1 }}>
                                        <h5 style={{ fontSize: '1.05rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--foreground)' }}>Qualifications:</h5>
                                        <ul style={{ paddingLeft: '1.5rem', margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                            {job.qualifications.map((q, i) => (
                                                <li key={i} style={{ marginBottom: '0.25rem' }}>{q}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                                            <strong>Location:</strong> Office in Rajapalayam (Daily commute required)<br/>
                                            <strong>Deadline:</strong> 15th May 2026
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <a href={`mailto:careers@automaitee.com?subject=Application for ${job.title}`} className="cta-button" style={{ display: 'inline-block', width: '100%', boxSizing: 'border-box' }}>
                                                Apply via Email
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
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
