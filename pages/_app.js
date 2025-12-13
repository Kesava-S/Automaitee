import '../styles/globals.css'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as Sentry from "@sentry/nextjs";
import { DefaultSeo, OrganizationJsonLd, WebPageJsonLd } from 'next-seo';
import SEO from '../next-seo.config';

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user
                setUser(currentUser ?? null)
            }
        )

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    return (
        <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
            <DefaultSeo {...SEO} />
            <OrganizationJsonLd
                type="Organization"
                id="https://kondamaal.com/#organization"
                name="Kondamaal Automations"
                url="https://kondamaal.com/"
                logo="https://kondamaal.com/logo.png"
                contactPoint={[
                    {
                        telephone: '+1-555-555-5555',
                        contactType: 'customer service',
                    },
                ]}
                sameAs={['https://www.facebook.com/kondamaal', 'https://www.linkedin.com/company/kondamaal']}
            />
            <WebPageJsonLd
                description="Streamline your business processes with intelligent automation."
                id="https://kondamaal.com/#website"
                lastReviewed="2025-12-13T16:00:00Z"
                reviewedBy={{
                    type: 'Person',
                    name: 'Kondamaal Admin',
                }}
            />

            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/logo.png" />
                <link rel="apple-touch-icon" href="/logo.png" />
            </Head>

            <nav className="navbar">
                <div className="logo" id="nav-logo" onClick={() => router.push('/')}>
                    <img src="/logo.png" alt="Kondamaal AutoTech Logo" className="logo-img" />
                    <div className="logo-text">
                        <span>Kondamaal Business Automation</span>
                    </div>
                </div>
                <div className="nav-links">
                    <Link href="/" className={`nav-btn ${router.pathname === '/' ? 'active' : ''}`}>Home</Link>
                    <Link href="/services" className={`nav-btn ${router.pathname === '/services' ? 'active' : ''}`}>Services</Link>
                    <Link href="/careers" className={`nav-btn ${router.pathname === '/careers' ? 'active' : ''}`}>Careers</Link>

                    {!user ? (
                        <Link href="/login" className={`nav-btn ${router.pathname === '/login' ? 'active' : ''}`}>Login</Link>
                    ) : (
                        <button onClick={handleLogout} className="nav-btn">Logout</button>
                    )}
                </div>
            </nav>

            <main id="app">
                <Component {...pageProps} user={user} />
            </main>
        </Sentry.ErrorBoundary>
    )
}

export default MyApp
