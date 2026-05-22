import Head from 'next/head'
import Link from 'next/link'
import { Reveal } from '../../components/Reveal'
import { Check } from 'lucide-react'

export default function BeautySalons({ openBookingModal }) {
    return (
        <>
            <Head>
                <title>SilentChurn for Beauty Salons | Automaitee</title>
                <meta name="description" content="We bring your regulars back — automatically. SilentChurn sends personalised WhatsApp messages to beauty salon customers when they go quiet." />
                <meta property="og:title" content="SilentChurn for Beauty Salons | Automaitee" />
                <meta property="og:description" content="We bring your regulars back — automatically. SilentChurn sends personalised WhatsApp messages to beauty salon customers when they go quiet." />
                <meta property="og:url" content="https://www.automaitee.com/industries/beauty-salons" />
                <meta name="twitter:title" content="SilentChurn for Beauty Salons | Automaitee" />
                <meta name="twitter:description" content="We bring your regulars back — automatically. SilentChurn sends personalised WhatsApp messages to beauty salon customers when they go quiet." />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Service",
                            "name": "Customer Retention Automation for Beauty Salons",
                            "description": "We bring your regulars back — automatically. SilentChurn sends personalised WhatsApp messages to beauty salon customers when they go quiet.",
                            "serviceType": "AI Marketing Automation",
                            "url": "https://www.automaitee.com/industries/beauty-salons",
                            "provider": {
                                "@type": "LocalBusiness",
                                "name": "Automaitee",
                                "url": "https://www.automaitee.com",
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": "London",
                                    "addressCountry": "GB"
                                }
                            },
                            "areaServed": {
                                "@type": "City",
                                "name": "London"
                            }
                        })
                    }}
                />
            </Head>

            {/* HERO / RO SECTION */}
            <div style={{ paddingTop: '120px', paddingBottom: '80px', textAlign: 'center', backgroundColor: '#fbfbfd' }}>
                <div className="container">
                    <Reveal width="100%">
                        <p style={{ fontSize: '1rem', fontWeight: '600', color: '#0071e3', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                            For UK beauty salons — nails, hair, lashes & brows
                        </p>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1', color: '#1d1d1f' }}>
                            Beauty Salon Customer Retention — Automated WhatsApp Win-Back
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#515154', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
                            SilentChurn watches your customer visit patterns around the clock. The moment a regular goes quiet, it sends them a warm, personalised WhatsApp message — written by AI, sent automatically, timed perfectly. No apps to manage. No chasing. No extra work for you.
                        </p>
                    </Reveal>

                    <Reveal width="100%" delay={0.2}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
                            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 14px rgba(0,0,0,0.05)', flex: '1 1 250px', maxWidth: '300px' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1d1d1f', marginBottom: '0.5rem' }}>35%</div>
                                <div style={{ fontSize: '0.95rem', color: '#515154' }}>of regulars leave silently every year</div>
                            </div>
                            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 14px rgba(0,0,0,0.05)', flex: '1 1 250px', maxWidth: '300px' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0071e3', marginBottom: '0.5rem' }}>28%</div>
                                <div style={{ fontSize: '0.95rem', color: '#515154' }}>win-back rate with the right message at the right time</div>
                            </div>
                            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 14px rgba(0,0,0,0.05)', flex: '1 1 250px', maxWidth: '300px' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#34c759', marginBottom: '0.5rem' }}>£400+</div>
                                <div style={{ fontSize: '0.95rem', color: '#515154' }}>average monthly revenue recovered per salon</div>
                            </div>
                        </div>

                        <Link href="https://wa.me/447570546554?text=Hi,%20I'm%20interested%20in%20SilentChurn%20for%20my%20salon" target="_blank" rel="noopener noreferrer" className="cta-button" style={{ fontSize: '1.1rem', padding: '16px 32px' }}>
                            WhatsApp us to get started →
                        </Link>
                    </Reveal>
                </div>
            </div>

            {/* THE PROBLEM SECTION */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <Reveal width="100%">
                        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                                You work hard to get customers in. Then they just... disappear.
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: '#515154', lineHeight: '1.7', marginBottom: '1rem' }}>
                                Most salon owners only realise a regular is gone when the diary is quiet and a month has passed. By then, she has usually found somewhere else.
                            </p>
                            <p style={{ fontSize: '1.1rem', color: '#515154', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                                It is not because she was unhappy. Life got busy. She forgot to rebook. And nobody reached out.
                            </p>
                            <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1d1d1f' }}>
                                That is the gap SilentChurn fills.
                            </p>
                        </div>
                    </Reveal>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <Reveal delay={0.1}>
                            <div className="card" style={{ height: '100%', padding: '2rem', background: '#f8f9fa', borderRadius: '16px', border: '1px solid #e5e5ea' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#1d1d1f' }}>No booking system? No problem.</h3>
                                <p style={{ color: '#515154', lineHeight: '1.6' }}>
                                    Most independent beauty salons do not use a booking app — and they do not need one. SilentChurn works with walk-in salons using a simple QR code on the till or a quick WhatsApp tap from the owner after each appointment.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div className="card" style={{ height: '100%', padding: '2rem', background: '#f8f9fa', borderRadius: '16px', border: '1px solid #e5e5ea' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#1d1d1f' }}>Not another app to learn.</h3>
                                <p style={{ color: '#515154', lineHeight: '1.6' }}>
                                    There is no dashboard to log into every day. No complicated setup. Once it is running, it works silently in the background while you focus on your clients.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <div className="card" style={{ height: '100%', padding: '2rem', background: '#f8f9fa', borderRadius: '16px', border: '1px solid #e5e5ea' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#1d1d1f' }}>Every message feels personal.</h3>
                                <p style={{ color: '#515154', lineHeight: '1.6' }}>
                                    Each win-back message is written fresh by AI using the customer's real name, how long it has been, and their visit history. It reads like a text from the owner — not a mass marketing blast.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section style={{ padding: '80px 0', backgroundColor: '#f5f5f7' }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <Reveal width="100%">
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '4rem', textAlign: 'center' }}>
                            Set it up once. We monitor it for you.
                        </h2>
                    </Reveal>

                    <div className="timeline">
                        {[
                            { step: "Step 1 — Customers get added to your list", desc: "After each appointment, your customer scans a QR code at the till (10 seconds), or you send a quick WhatsApp message. That is all the input the system ever needs from you." },
                            { step: "Step 2 — The system learns their visit pattern", desc: "SilentChurn tracks how often each customer usually visits and builds a personal rhythm for every single client. Not a generic 4-week reminder — based on her actual behaviour." },
                            { step: "Step 3 — It spots when someone goes quiet", desc: "Every night, the system checks every customer. If someone is overdue based on their personal pattern, they are flagged automatically." },
                            { step: "Step 4 — A personalised WhatsApp goes out", desc: "AI writes a warm, natural message and sends it from your salon's WhatsApp Business number. No action needed from you.", example: `"Hey Priya! It's been a little while since your last visit 😊 We've got some slots this week if you fancy coming in — just reply here and we'll sort you out."` },
                            { step: "Step 5 — If no reply, one more message with an offer", desc: "Seven days later, if she has not responded, one final message goes out with a small gesture — like 10% off or a free nail art design. After that, the system stops. No spam, ever." },
                            { step: "Step 6 — Weekly results report to your WhatsApp", desc: "Every week you get a summary: messages sent, customers recovered, and revenue saved." }
                        ].map((item, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <div style={{ display: 'flex', marginBottom: '3rem', alignItems: 'flex-start' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0071e3', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', flexShrink: 0, marginTop: '5px' }}>
                                        {i + 1}
                                    </div>
                                    <div style={{ flex: 1, paddingLeft: '1.5rem' }}>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#1d1d1f' }}>{item.step}</h3>
                                        <p style={{ margin: 0, fontSize: '1.1rem', color: '#515154', lineHeight: '1.6' }}>{item.desc}</p>
                                        {item.example && (
                                            <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff', borderRadius: '8px', borderLeft: '4px solid #34c759', fontStyle: 'italic', color: '#1d1d1f' }}>
                                                {item.example}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHAT'S INCLUDED SECTION */}
            <section style={{ padding: '80px 0' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <Reveal width="100%">
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center' }}>
                            Everything included. No hidden extras.
                        </h2>
                    </Reveal>

                    <div style={{ background: '#fff', border: '1px solid #e5e5ea', borderRadius: '20px', padding: '3rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {[
                                "Automated nightly churn detection",
                                "AI-written personalised WhatsApp messages — unique every time, never a template",
                                "Two-message win-back sequence with follow-up offer",
                                "QR code setup for walk-in salons — no booking software needed",
                                "Owner WhatsApp visit logging — log a visit in 5 seconds",
                                "Automatic opt-out handling — STOP is always respected instantly",
                                "Weekly WhatsApp performance report",
                                "Full setup and onboarding by Automaitee Digital",
                                "Ongoing support — we are always a WhatsApp away"
                            ].map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.2rem', fontSize: '1.1rem', color: '#1d1d1f' }}>
                                    <Check size={24} color="#0071e3" style={{ marginRight: '15px', flexShrink: 0, marginTop: '2px' }} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e5ea', textAlign: 'center', fontWeight: '600', color: '#1d1d1f', fontSize: '1.1rem' }}>
                            Works with all walk-in salons. No booking system required.
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING SECTION */}
            <section style={{ padding: '80px 0', backgroundColor: '#fcfcfd' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <Reveal width="100%">
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                            Pricing
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: '#515154', marginBottom: '3rem', lineHeight: '1.6' }}>
                            Own your own customer database in just 3 months.
                        </p>

                        <div style={{ background: '#fff', border: '2px solid #0071e3', borderRadius: '24px', padding: '4rem 2rem', boxShadow: '0 15px 40px rgba(0,113,227,0.1)', maxWidth: '500px', margin: '0 auto' }}>
                            <div style={{ fontSize: '4rem', fontWeight: '800', color: '#1d1d1f', marginBottom: '1rem', lineHeight: '1' }}>
                                £49<span style={{ fontSize: '1.25rem', color: '#86868b', fontWeight: '500' }}> / month</span>
                            </div>
                            <p style={{ fontSize: '1.1rem', color: '#515154', marginBottom: '2rem', lineHeight: '1.6' }}>
                                Everything included. No setup fee. No long-term contract. Cancel any time.
                            </p>

                            <div style={{ padding: '1.5rem', background: '#f5f5f7', borderRadius: '12px', marginBottom: '2.5rem', fontSize: '0.95rem', color: '#1d1d1f', lineHeight: '1.6' }}>
                                For a salon charging £60 per appointment, recovering just one client per month more than pays for itself. Most salons recover 4 to 6 per month.
                            </div>

                            <Link href="https://wa.me/447570546554?text=Hi,%20I'm%20interested%20in%20SilentChurn%20for%20my%20salon" target="_blank" rel="noopener noreferrer" className="cta-button" style={{ display: 'block', width: '100%', fontSize: '1.1rem', padding: '18px', marginBottom: '1rem' }}>
                                WhatsApp us to get started →
                            </Link>
                            <button
                                onClick={openBookingModal}
                                style={{
                                    display: 'block', width: '100%', fontSize: '1rem', padding: '16px',
                                    background: 'transparent', color: '#0071e3',
                                    border: '1.5px solid #0071e3', borderRadius: '980px',
                                    fontWeight: '600', cursor: 'pointer', letterSpacing: '0.01em',
                                }}
                            >
                                Book a Free Consultation →
                            </button>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* RESULTS / SOCIAL PROOF SECTION */}
            <section style={{ padding: '80px 0' }}>
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <Reveal width="100%">
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '3rem', textAlign: 'center' }}>
                            What salons using SilentChurn see
                        </h2>
                    </Reveal>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                        <Reveal delay={0.1}>
                            <div style={{ textAlign: 'center', padding: '2rem', background: '#f8f9fa', borderRadius: '16px' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0071e3', marginBottom: '0.5rem' }}>4–6</div>
                                <div style={{ fontSize: '1rem', color: '#515154', lineHeight: '1.5' }}>customers recovered per month on average</div>
                            </div>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div style={{ textAlign: 'center', padding: '2rem', background: '#f8f9fa', borderRadius: '16px' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0071e3', marginBottom: '0.5rem' }}>29%</div>
                                <div style={{ fontSize: '1rem', color: '#515154', lineHeight: '1.5' }}>of win-back messages result in a rebooked appointment</div>
                            </div>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <div style={{ textAlign: 'center', padding: '2rem', background: '#f8f9fa', borderRadius: '16px' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0071e3', marginBottom: '0.5rem' }}>£350+</div>
                                <div style={{ fontSize: '1rem', color: '#515154', lineHeight: '1.5' }}>in recovered revenue per month</div>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal width="100%">
                        <div style={{ background: '#1d1d1f', color: '#fff', padding: '3rem', borderRadius: '20px', textAlign: 'center', position: 'relative' }}>
                            <div style={{ fontSize: '4rem', color: '#333', position: 'absolute', top: '10px', left: '20px', lineHeight: '1', fontFamily: 'Georgia, serif' }}>"</div>
                            <p style={{ fontSize: '1.25rem', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
                                I had no idea how many regulars I was losing until I saw the weekly report. Within the first month I had 5 customers back who I thought had just moved on. It paid for itself in week one.
                            </p>
                            <div style={{ fontWeight: '600', color: '#a1a1aa' }}>
                                — Salon owner, East London
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section style={{ padding: '80px 0', backgroundColor: '#f5f5f7' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <Reveal width="100%">
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '3rem', textAlign: 'center' }}>
                            Questions you might have
                        </h2>
                    </Reveal>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {[
                            { q: "Do I need a booking system?", a: "No. SilentChurn is built specifically for walk-in salons. You log visits with a 5-second WhatsApp message or your customers scan a QR code at the till." },
                            { q: "Will my customers know it is automated?", a: "The messages are written by AI to sound natural and personal. They come from your salon's own WhatsApp Business number. Most customers think it is a personal message from you." },
                            { q: "What if a customer does not want messages?", a: "They simply reply STOP. The system removes them permanently and immediately. No one is ever chased or spammed." },
                            { q: "How long does setup take?", a: "We handle the full setup. Most salons are live within 3 to 5 business days." },
                            { q: "Is there a contract?", a: "No. Month to month. Cancel any time with no penalty." },
                            { q: "What do I actually have to do?", a: "Just log each visit — either via QR code or a quick WhatsApp message. Everything else is fully automated." }
                        ].map((faq, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', border: '1px solid #e5e5ea' }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.8rem', color: '#1d1d1f' }}>{faq.q}</h3>
                                    <p style={{ margin: 0, color: '#515154', lineHeight: '1.6' }}>{faq.a}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA SECTION */}
            <section style={{ padding: '100px 0', backgroundColor: '#0071e3', color: '#fff', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <Reveal>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                            Ready to stop losing your regulars?
                        </h2>
                        <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.9, lineHeight: '1.6' }}>
                            Join beauty salons across the UK who are quietly winning back customers every single week — without lifting a finger.
                        </p>
                        <Link href="https://wa.me/447570546554?text=Hi,%20I'm%20interested%20in%20SilentChurn%20for%20my%20salon" target="_blank" rel="noopener noreferrer" style={{ 
                            display: 'inline-block',
                            background: '#fff', 
                            color: '#0071e3', 
                            padding: '18px 36px', 
                            fontSize: '1.1rem', 
                            fontWeight: 'bold',
                            borderRadius: '30px',
                            textDecoration: 'none',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                            marginBottom: '1.5rem'
                        }}>
                            WhatsApp us now — £49/mo, no contract →
                        </Link>
                        <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                            Automaitee Digital · London · automateedigital.com
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    )
}
