import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { blogs } from '../data/blogs'

export default function Blogs() {
    return (
        <>
            <Head>
                <title>Blog | Automaitee AI Digital Automation</title>
                <meta name="description" content="Latest insights on AI, Automation, and Business Growth." />
            </Head>

            <section className="hero">
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h1>
                        <span className="word-wrapper">
                            <span className="animated-word" style={{ animationDelay: '0s' }}>Latest </span>
                        </span>
                        <span className="word-wrapper">
                            <span className="animated-word" style={{ animationDelay: '0.1s' }}>Insights </span>
                        </span>
                    </h1>
                    <p style={{ animation: 'fadeIn 0.8s ease-out 0.4s backwards' }}>
                        Transforming Business with AI &#38; Automation
                    </p>
                </div>
            </section>

            <section className="services-section">
                <div className="container">
                    <div className="grid">
                        {blogs.map((blog, index) => (
                            <motion.div
                                key={blog.id}
                                className="card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                            >
                                <div style={{
                                    height: '200px',
                                    overflow: 'hidden',
                                    borderRadius: '12px',
                                    marginBottom: '1.5rem',
                                    backgroundColor: '#f5f5f7'
                                }}>
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        loading="lazy"
                                    />
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#0071e3', fontWeight: '600', marginBottom: '0.5rem' }}>
                                        {blog.date} • {blog.author}
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', lineHeight: '1.3' }}>
                                        {blog.title}
                                    </h3>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
                                        {blog.excerpt}
                                    </p>
                                    <Link href={`/blog/${blog.id}`} className="cta-button" style={{
                                        alignSelf: 'flex-start',
                                        padding: '10px 24px',
                                        fontSize: '0.9rem',
                                        textDecoration: 'none'
                                    }}>
                                        Read Article
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
