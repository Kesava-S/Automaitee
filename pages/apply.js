import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Reveal } from '../components/Reveal'
import { motion } from 'framer-motion'
import { Check, ChevronRight, UploadCloud } from 'lucide-react'

const steps = [
    { id: 1, title: 'Careers Profile' },
    { id: 2, title: 'Role Information' },
    { id: 3, title: 'Voluntary Self-Identification' },
    { id: 4, title: 'Review & Apply' }
]

export default function Apply() {
    const router = useRouter()
    const { role } = router.query
    const defaultRole = "Automation in Revenue Operations Intern"

    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        resume: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        coverLetter: '',
        linkedin: '',
        portfolio: '',
        gender: '',
        race: '',
        veteran: ''
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, files } = e.target
        if (type === 'file') {
            setFormData(prev => ({ ...prev, [name]: files[0] }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length))
    const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1))

    const handleSubmit = (e) => {
        e.preventDefault()
        // In a real app, you would send this to a backend API
        console.log("Submitting:", formData)
        setIsSubmitted(true)
    }

    if (isSubmitted) {
        return (
            <div style={{ paddingTop: '150px', paddingBottom: '100px', textAlign: 'center', minHeight: '80vh' }}>
                <Head>
                    <title>Application Submitted | Automaitee</title>
                </Head>
                <div className="container">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'white', padding: '4rem', borderRadius: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', maxWidth: '600px', margin: '0 auto' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#e0ece0', color: '#116c4c', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
                            <Check size={40} />
                        </div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Application Submitted!</h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Thank you for applying for the <strong>{role || defaultRole}</strong> role. Our team will review your application and get back to you soon.
                        </p>
                        <Link href="/" className="cta-button">
                            Return to Home
                        </Link>
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Apply for {role || defaultRole} | Automaitee</title>
                <meta name="robots" content="noindex" />
            </Head>

            <div style={{ paddingTop: '120px', paddingBottom: '60px', background: '#fbfbfd', minHeight: '100vh' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>

                    <div style={{ marginBottom: '2rem' }}>
                        <Link href="/work-with-us" style={{ color: '#0071e3', fontSize: '1rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            &larr; Back to Open Roles
                        </Link>
                        <h1 style={{ fontSize: '2.5rem', marginTop: '1rem', fontWeight: '700' }}>
                            {role || defaultRole}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Application Form</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '3rem', alignItems: 'start' }}>

                        {/* Sidebar Progress */}
                        <div style={{ position: 'sticky', top: '120px', background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {steps.map((step, index) => {
                                    const isActive = currentStep === step.id
                                    const isCompleted = currentStep > step.id
                                    return (
                                        <li key={step.id} style={{ display: 'flex', alignItems: 'center', marginBottom: index !== steps.length - 1 ? '1.5rem' : '0', color: isActive ? '#000' : isCompleted ? '#116c4c' : 'var(--text-secondary)', fontWeight: isActive ? '600' : '400', transition: 'all 0.3s ease' }}>
                                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: isActive ? '#0071e3' : isCompleted ? '#e0ece0' : '#f5f5f7', color: isActive ? 'white' : isCompleted ? '#116c4c' : 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                                {isCompleted ? <Check size={16} /> : step.id}
                                            </div>
                                            {step.title}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        {/* Form Content */}
                        <div style={{ background: 'white', padding: '3rem', borderRadius: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                            <form onSubmit={handleSubmit}>

                                {currentStep === 1 && (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: '600' }}>{steps[0].title}</h2>

                                        <div style={{ marginBottom: '2rem' }}>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Resume / CV *</label>
                                            <div style={{ border: '2px dashed #d2d2d7', borderRadius: '0.5rem', padding: '2rem', textAlign: 'center', background: '#fbfbfd', cursor: 'pointer', position: 'relative' }}>
                                                <input type="file" name="resume" onChange={handleChange} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} required={!formData.resume} />
                                                <UploadCloud size={32} style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }} />
                                                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                                                    {formData.resume ? formData.resume.name : 'Drag & drop your resume here or click to upload'}
                                                </p>
                                                <p style={{ fontSize: '0.8rem', color: '#86868b', marginTop: '0.5rem' }}>PDF, DOCX up to 5MB</p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>First Name *</label>
                                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #d2d2d7', fontSize: '1rem' }} />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Last Name *</label>
                                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #d2d2d7', fontSize: '1rem' }} />
                                            </div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address *</label>
                                                <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #d2d2d7', fontSize: '1rem' }} />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone Number *</label>
                                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #d2d2d7', fontSize: '1rem' }} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 2 && (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: '600' }}>{steps[1].title}</h2>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Cover Letter / Why this role?</label>
                                            <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} rows="6" style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #d2d2d7', fontSize: '1rem', resize: 'vertical' }} placeholder="Tell us why you are a great fit..."></textarea>
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>LinkedIn Profile *</label>
                                            <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #d2d2d7', fontSize: '1rem' }} placeholder="https://linkedin.com/in/..." />
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Portfolio / Personal Website</label>
                                            <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #d2d2d7', fontSize: '1rem' }} placeholder="https://" />
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 3 && (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', fontWeight: '600' }}>{steps[2].title}</h2>
                                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>We are an equal opportunity employer. This information is voluntary, kept confidential, and not used in hiring decisions.</p>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Gender</label>
                                            <select name="gender" value={formData.gender} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #d2d2d7', fontSize: '1rem', background: 'white' }}>
                                                <option value="">Select an option</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Non-binary">Non-binary</option>
                                                <option value="Prefer not to say">Prefer not to say</option>
                                            </select>
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Race/Ethnicity</label>
                                            <select name="race" value={formData.race} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #d2d2d7', fontSize: '1rem', background: 'white' }}>
                                                <option value="">Select an option</option>
                                                <option value="Hispanic/Latino">Hispanic/Latino</option>
                                                <option value="White">White</option>
                                                <option value="Black/African American">Black/African American</option>
                                                <option value="Asian">Asian</option>
                                                <option value="Other">Other</option>
                                                <option value="Prefer not to say">Prefer not to say</option>
                                            </select>
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Veteran Status</label>
                                            <select name="veteran" value={formData.veteran} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #d2d2d7', fontSize: '1rem', background: 'white' }}>
                                                <option value="">Select an option</option>
                                                <option value="I am a protected veteran">I am a protected veteran</option>
                                                <option value="I am not a protected veteran">I am not a protected veteran</option>
                                                <option value="Prefer not to say">Prefer not to say</option>
                                            </select>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 4 && (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: '600' }}>{steps[3].title}</h2>

                                        <div style={{ background: '#f5f5f7', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
                                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontWeight: '600', borderBottom: '1px solid #d2d2d7', paddingBottom: '0.5rem' }}>Profile</h3>
                                            <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                                            <p><strong>Email:</strong> {formData.email}</p>
                                            <p><strong>Phone:</strong> {formData.phone}</p>
                                            <p><strong>Resume:</strong> {formData.resume ? formData.resume.name : 'Missing!'}</p>

                                            <h3 style={{ fontSize: '1.2rem', marginTop: '1.5rem', marginBottom: '1rem', fontWeight: '600', borderBottom: '1px solid #d2d2d7', paddingBottom: '0.5rem' }}>Role Info</h3>
                                            <p><strong>LinkedIn:</strong> {formData.linkedin}</p>
                                            {formData.portfolio && <p><strong>Portfolio:</strong> {formData.portfolio}</p>}
                                            {formData.coverLetter && <p><strong>Cover Letter:</strong> Provided</p>}

                                            <h3 style={{ fontSize: '1.2rem', marginTop: '1.5rem', marginBottom: '1rem', fontWeight: '600', borderBottom: '1px solid #d2d2d7', paddingBottom: '0.5rem' }}>Self-ID</h3>
                                            <p><strong>Gender:</strong> {formData.gender || 'Not specified'}</p>
                                            <p><strong>Race:</strong> {formData.race || 'Not specified'}</p>
                                            <p><strong>Veteran Status:</strong> {formData.veteran || 'Not specified'}</p>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Navigation */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
                                    {currentStep > 1 ? (
                                        <button type="button" onClick={handleBack} style={{ padding: '0.8rem 1.5rem', border: '1px solid #d2d2d7', background: 'white', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: '500', cursor: 'pointer' }}>
                                            Back
                                        </button>
                                    ) : <div></div>}

                                    {currentStep < steps.length ? (
                                        <button type="button" onClick={handleNext} style={{ padding: '0.8rem 1.5rem', background: '#0071e3', color: 'white', border: 'none', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            Save and Continue <ChevronRight size={18} />
                                        </button>
                                    ) : (
                                        <button type="submit" style={{ padding: '0.8rem 2rem', background: '#116c4c', color: 'white', border: 'none', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
                                            Submit Application
                                        </button>
                                    )}
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
