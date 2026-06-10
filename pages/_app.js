import '../styles/globals.css'
import '../src/index.css'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Script from 'next/script'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const BookingModal = dynamic(() => import('../components/BookingModal'), { ssr: false })
const ChatBot = dynamic(() => import('../components/ChatBot'), { ssr: false })
const FloatingShapes = dynamic(() => import('../components/FloatingShapes'), { ssr: false })
const SparklesCore = dynamic(() => import('../components/ui/sparkles').then(mod => mod.SparklesCore), { ssr: false })

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [bookingSource, setBookingSource] = useState('')

    const isPortal = router.pathname.startsWith('/portal') || router.asPath.startsWith('/portal')

    useEffect(() => {
        // Check if we should open the modal (e.g. redirected from /book-consultation)
        if (router.query.openModal === 'true') {
            setIsBookingModalOpen(true)
        }
    }, [router.query])

    const openBookingModal = (e) => {
        e.preventDefault()
        setIsBookingModalOpen(true)
        setIsMobileMenuOpen(false)
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <>
            <Head>
                <title>{isPortal ? "Automaitee Client Portal" : "Automaitee AI Digital Automation"}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/logo.png" />

                {/* Canonical Tag */}
                <link 
                    rel="canonical" 
                    href={`https://www.automaitee.com${router.asPath.split('?')[0] === '/' ? '/' : router.asPath.split('?')[0].replace(/\/$/, '')}`} 
                />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={isPortal ? "Automaitee Client Portal" : "Automaitee AI Digital Automation"} />
                <meta property="og:image" content="https://www.automaitee.com/og-image.png" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content="https://www.automaitee.com/og-image.png" />
            </Head>

            {/* Google Tag (gtag.js) */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-10FZYWH1VQ"
                strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-10FZYWH1VQ');
                `}
            </Script>

            {isPortal ? (
                <Component {...pageProps} />
            ) : (
                <>
                    <nav className="navbar">
                        <div className="container nav-content">
                            {/* Mobile Menu Button - Placed Left */}
                            <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
                                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>

                            <Link href="/" replace={router.pathname === '/'} className="logo">
                                <Image src="/logo.png" alt="Automaitee Digital Logo" className="logo-image" width={1024} height={682} priority />
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="nav-links desktop-only">
                                <Link href="/" replace={router.pathname === '/'} className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}>
                                    Home
                                </Link>
                                <Link href="/services" replace={router.pathname === '/services'} className={`nav-link ${router.pathname === '/services' ? 'active' : ''}`}>
                                    Services
                                </Link>
                                <Link href="/blog" replace={router.pathname === '/blog'} className={`nav-link ${router.pathname === '/blog' ? 'active' : ''}`}>
                                    Blog
                                </Link>
                                <Link href="/team" replace={router.pathname === '/team'} className={`nav-link ${router.pathname === '/team' ? 'active' : ''}`}>
                                    Team
                                </Link>
                                <Link href="/sustainability" replace={router.pathname === '/sustainability'} className={`nav-link ${router.pathname === '/sustainability' ? 'active' : ''}`}>
                                    Sustainability Practices
                                </Link>
                                <a href="/book-consultation" onClick={openBookingModal} className={`nav-link ${router.pathname === '/book-consultation' ? 'active' : ''}`} style={{ cursor: 'pointer' }}>
                                    Book Consultation
                                </a>
                            </div>
                        </div>

                        {/* Mobile Navigation Drawer */}
                        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                            <div className="mobile-menu-links">
                                <Link href="/" replace={router.pathname === '/'} onClick={() => setIsMobileMenuOpen(false)} className={`mobile-nav-link ${router.pathname === '/' ? 'active' : ''}`}>
                                    Home
                                </Link>
                                <Link href="/services" replace={router.pathname === '/services'} onClick={() => setIsMobileMenuOpen(false)} className={`mobile-nav-link ${router.pathname === '/services' ? 'active' : ''}`}>
                                    Services
                                </Link>
                                <Link href="/blog" replace={router.pathname === '/blog'} onClick={() => setIsMobileMenuOpen(false)} className={`mobile-nav-link ${router.pathname === '/blog' ? 'active' : ''}`}>
                                    Blog
                                </Link>
                                <Link href="/team" replace={router.pathname === '/team'} onClick={() => setIsMobileMenuOpen(false)} className={`mobile-nav-link ${router.pathname === '/team' ? 'active' : ''}`}>
                                    Team
                                </Link>
                                <Link href="/sustainability" replace={router.pathname === '/sustainability'} onClick={() => setIsMobileMenuOpen(false)} className={`mobile-nav-link ${router.pathname === '/sustainability' ? 'active' : ''}`}>
                                    Sustainability Practices
                                </Link>
                                <a href="/book-consultation" onClick={openBookingModal} className={`mobile-nav-link ${router.pathname === '/book-consultation' ? 'active' : ''}`}>
                                    Book Consultation
                                </a>
                            </div>
                        </div>
                    </nav>

                    <FloatingShapes />

                    <div style={{ position: 'relative', zIndex: 0 }}>
                        {router.pathname !== '/' && (
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '450px', zIndex: -1, overflow: 'hidden' }}>
                                <SparklesCore
                                    id="global-header-sparkles"
                                    background="transparent"
                                    minSize={0.4}
                                    maxSize={1.5}
                                    particleDensity={150}
                                    particleColor="#0071e3"
                                />
                                <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', background: 'radial-gradient(circle at top, transparent 10%, #fbfbfd 80%)' }}></div>
                            </div>
                        )}

                        <main style={{ position: 'relative', zIndex: 10, background: '#fbfbfd', minHeight: '100vh', paddingBottom: '40px', borderBottomLeftRadius: '2rem', borderBottomRightRadius: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                            <Component {...pageProps} openBookingModal={(source) => { setBookingSource(source || ''); setIsBookingModalOpen(true); }} />
                        </main>

                        <footer style={{ background: '#111111', color: 'white', padding: '6rem 0 2rem 0', position: 'relative', zIndex: 0 }}>
                            <div className="container">
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
                                    {/* Brand */}
                                    <div>
                                        <Link href="/" replace={router.pathname === '/'}>
                                            <Image src="/logo.png" alt="Automaitee" className="logo-image" width={1024} height={682} style={{ marginBottom: '1.5rem', marginLeft: 'auto', marginRight: 'auto' }} />
                                        </Link>
                                        <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontSize: '0.95rem' }}>Affordable business automation solutions. Simplify marketing, sales, process, and reporting with AI automation.</p>
                                    </div>
                                    
                                    {/* Pages */}
                                    <div>
                                        <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: '600' }}>Company</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                            <Link href="/" style={{ color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Home</Link>
                                            <Link href="/services" style={{ color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Services</Link>
                                            <Link href="/blog" style={{ color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Blog</Link>
                                            <Link href="/team" style={{ color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Team</Link>
                                            <Link href="/sustainability" style={{ color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Sustainability</Link>
                                        </div>
                                    </div>

                                    {/* Services */}
                                    <div>
                                        <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: '600' }}>Services</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                            <Link href="/services" style={{ color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Full Funnel Systems</Link>
                                            <Link href="https://www.automaitee.com/services" style={{ color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Starter Package</Link>
                                            <Link href="https://www.automaitee.com/services" style={{ color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Pro Package</Link>
                                            <Link href="/industries/beauty-salons" style={{ color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>SilentChurn for Salons</Link>
                                        </div>
                                    </div>

                                    {/* Contact */}
                                    <div>
                                        <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: '600' }}>Contact</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#a1a1aa', fontSize: '0.95rem' }}>
                                            <a href="mailto:support@automaitee.com" style={{ color: '#a1a1aa', textDecoration: 'none' }}>support@automaitee.com</a>
                                            <p style={{ margin: 0, lineHeight: '1.6' }}>Serving businesses in London, United Kingdom<br />India-based</p>
                                            <a href="/book-consultation" onClick={openBookingModal} style={{ color: '#0071e3', textDecoration: 'none', marginTop: '0.5rem', display: 'inline-block', fontWeight: '500' }}>Book a Consultation &rarr;</a>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ borderTop: '1px solid #333', paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                                    <p style={{ color: '#a1a1aa', margin: 0, fontSize: '0.9rem' }}>&copy; 2026 Automaitee Digital. All rights reserved.</p>
                                    <div style={{ display: 'flex', gap: '2rem' }}>
                                        <Link href="/privacy-policy" style={{ fontSize: '0.9rem', color: '#a1a1aa', textDecoration: 'none' }}>Privacy Policy</Link>
                                        <Link href="/terms-of-service" style={{ fontSize: '0.9rem', color: '#a1a1aa', textDecoration: 'none' }}>Terms of Service</Link>
                                        <Link href="/refund-policy" style={{ fontSize: '0.9rem', color: '#a1a1aa', textDecoration: 'none' }}>Refund Policy</Link>
                                        <Link href="/portal/login" style={{ fontSize: '0.9rem', color: '#a1a1aa', textDecoration: 'none' }}>Client</Link>
                                        <Link href="/portal/login" style={{ fontSize: '0.9rem', color: '#a1a1aa', textDecoration: 'none' }}>Admin</Link>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>

                    <BookingModal isOpen={isBookingModalOpen} onClose={() => { setIsBookingModalOpen(false); setBookingSource(''); }} source={bookingSource} />
                    <ChatBot />
                </>
            )}
        </>
    )
}

export default MyApp
