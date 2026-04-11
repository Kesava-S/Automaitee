import '../styles/globals.css'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Script from 'next/script'



import { useState, useEffect } from 'react'
import BookingModal from '../components/BookingModal'
import ChatBot from '../components/ChatBot'
import FloatingShapes from '../components/FloatingShapes'
import { Menu, X } from 'lucide-react'
import { SparklesCore } from '../components/ui/sparkles'

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
                <title>Automaitee AI Digital Automation</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/logo.png" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Automaitee AI Digital Automation" />
                <meta property="og:image" content="https://automaitee.com/logo.png" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:image" content="https://automaitee.com/logo.png" />
            </Head>

            {/* Google Tag (gtag.js) */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-10FZYWH1VQ"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-10FZYWH1VQ');
                `}
            </Script>

            <nav className="navbar">
                <div className="container nav-content">
                    {/* Mobile Menu Button - Placed Left */}
                    <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                    <Link href="/" replace={router.pathname === '/'} className="logo">
                        <img src="/logo.png" alt="Automaitee Digital Logo" className="logo-image" loading="lazy" />
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
                <Component {...pageProps} openBookingModal={() => setIsBookingModalOpen(true)} />
            </main>

            {/* Curtain Reveal Footer Wrapper */}
            <div style={{ position: 'relative', height: '200px', width: '100%', clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}>
                <footer style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111111', color: 'white', zIndex: 0 }}>
                    <div className="container">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                            <p style={{ color: '#a1a1aa' }}>&copy; 2026 Automaitee Digital. All rights reserved.</p>
                            <div style={{ display: 'flex', gap: '2rem' }}>
                                <Link href="/privacy-policy" style={{ fontSize: '0.9rem', color: '#e4e4e7', textDecoration: 'none' }}>Privacy Policy</Link>
                                <Link href="/terms-of-service" style={{ fontSize: '0.9rem', color: '#e4e4e7', textDecoration: 'none' }}>Terms of Service</Link>
                                <a href="/book-consultation" onClick={openBookingModal} style={{ fontSize: '0.9rem', color: '#e4e4e7', cursor: 'pointer', textDecoration: 'none' }}>Book Consultation</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

                <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
                <ChatBot />
            </div>
        </>
    )
}

export default MyApp
