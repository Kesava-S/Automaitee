import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

export default function Signup({ user }) {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', content: '' })

    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [user, router])

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage({})

        const { error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            setMessage({ type: 'error', content: error.message })
        } else {
            setMessage({ type: 'success', content: 'Signup successful! Please check your email for verification.' })
        }
        setLoading(false)
    }

    return (
        <>
            <NextSeo title="Sign Up" description="Create a new account with Kondamaal Automations." />
            <div className="view active" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
                    <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Sign Up</h1>

                    {message.content && (
                        <div style={{
                            padding: '0.75rem',
                            borderRadius: '4px',
                            marginBottom: '1rem',
                            backgroundColor: message.type === 'error' ? '#fee2e2' : '#dcfce7',
                            color: message.type === 'error' ? '#dc2626' : '#16a34a',
                            fontSize: '0.9rem'
                        }}>
                            {message.content}
                        </div>
                    )}

                    <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                            style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
                        >
                            {loading ? 'Sign Up' : 'Sign Up'}
                        </button>
                    </form>

                    <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#6b7280' }}>
                        Already have an account? <Link href="/login" style={{ color: '#2563eb', textDecoration: 'none' }}>Login</Link>
                    </p>
                </div>
            </div>
        </>
    )
}
