/**
 * AIMascotSection — Clean, centered section introducing intelligent automation solutions.
 */

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const EASE = [0.25, 0, 0, 1]

export default function AIMascotSection() {
  const sectionRef = useRef()

  return (
    <section ref={sectionRef} className="services-section" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p style={{
            fontSize: '0.78rem',
            letterSpacing: '0.12em',
            fontWeight: 600,
            textTransform: 'uppercase',
            color: '#0071e3',
            marginBottom: '1rem',
          }}>
            Intelligent Automation
          </p>

          <h2 className="section-title" style={{ marginBottom: '1.5rem', fontSize: '2.5rem', fontWeight: '700' }}>
            What we automate
          </h2>

          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            We build intelligent AI agents that work alongside your team, automating routine tasks and helping your business operate faster, smarter, and more efficiently.
          </p>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2.5rem' }}>
            To explore how automation can transform your workflows, visit our Services page to discover the solutions we offer. Our automation engineers will review your needs and get back to you promptly with tailored recommendations.
          </p>

          <Link href="/services" className="cta-button">
            View Services
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
