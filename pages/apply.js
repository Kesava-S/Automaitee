import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, UploadCloud, FileText, User, Briefcase, Shield } from 'lucide-react'

const steps = [
    { id: 1, title: 'Careers Profile' },
    { id: 2, title: 'Role Information' },
    { id: 3, title: 'Voluntary Self-Identification' },
    { id: 4, title: 'Review & Apply' }
]

const requiredStar = { color: '#d93025', marginLeft: '3px', fontWeight: '700' }
const inputStyle = { width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #d2d2d7', fontSize: '1rem' }
const inputErrorStyle = { width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #d93025', fontSize: '1rem', background: '#fff8f8' }
const fieldErrorMsg = { margin: '0.3rem 0 0', fontSize: '0.78rem', color: '#d93025', fontWeight: '500' }

/* ── Resume Preloader ── */
function ResumePreloader() {
    return (
        <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(255,255,255,0.93)',
            borderRadius: '0.4rem',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '0.75rem', zIndex: 10,
            backdropFilter: 'blur(4px)',
        }}>
            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes pdot { 0%,80%,100%{transform:scale(0);opacity:.3} 40%{transform:scale(1);opacity:1} }
            `}</style>
            <div style={{ position: 'relative', width: 56, height: 56 }}>
                <svg viewBox="0 0 56 56" width="56" height="56"
                    style={{ animation: 'spin 1.1s linear infinite', position: 'absolute', top: 0, left: 0 }}>
                    <circle cx="28" cy="28" r="24" fill="none" stroke="#e8f0fe" strokeWidth="4" />
                    <circle cx="28" cy="28" r="24" fill="none" stroke="#0071e3" strokeWidth="4"
                        strokeDasharray="150" strokeDashoffset="110" strokeLinecap="round" />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                    <FileText size={20} color="#0071e3" />
                </div>
            </div>
            <p style={{ margin: 0, fontWeight: '600', fontSize: '0.95rem', color: '#1d1d1f' }}>Parsing your resume…</p>
            <div style={{ display: 'flex', gap: '5px' }}>
                {[0, 1, 2].map(i => (
                    <div key={i} style={{
                        width: 7, height: 7, borderRadius: '50%', background: '#0071e3',
                        animation: `pdot 1.2s ease-in-out ${i * 0.2}s infinite`
                    }} />
                ))}
            </div>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#86868b' }}>Auto-filling your details</p>
        </div>
    )
}

/* ── Review helpers ── */
function ReviewRow({ label, value, missing }) {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', padding: '0.45rem 0', borderBottom: '1px solid #ebebeb' }}>
            <span style={{ minWidth: 140, fontSize: '0.88rem', color: '#86868b', flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: '0.92rem', color: missing ? '#d93025' : '#1d1d1f', fontStyle: (!value && !missing) ? 'italic' : 'normal' }}>
                {value || (missing ? '⚠ Required – missing' : <span style={{ color: '#aeaeb2' }}>Not specified</span>)}
            </span>
        </div>
    )
}

function ReviewSection({ icon, title, onEdit, children }) {
    return (
        <div style={{ background: '#f5f5f7', borderRadius: '0.75rem', overflow: 'hidden', marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 1.4rem', background: '#ececec', borderBottom: '1px solid #d2d2d7' }}>
                {icon}
                <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{title}</span>
                <button type="button" onClick={onEdit}
                    style={{ marginLeft: 'auto', fontSize: '0.82rem', color: '#0071e3', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>
                    Edit
                </button>
            </div>
            <div style={{ padding: '0.6rem 1.4rem 0.9rem' }}>{children}</div>
        </div>
    )
}

/* ── Inline field error component ── */
function FieldError({ show, message }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    style={fieldErrorMsg}>
                    ⚠ {message}
                </motion.p>
            )}
        </AnimatePresence>
    )
}

export default function Apply() {
    const router = useRouter()
    const { role } = router.query
    const defaultRole = "Automation in Revenue Operations Intern"

    const [currentStep, setCurrentStep] = useState(1)
    const [isParsing, setIsParsing] = useState(false)
    const [resumeError, setResumeError] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState('')
    const [parseStatus, setParseStatus] = useState('')
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        resume: null,
        firstName: '', lastName: '',
        email: '', phone: '',
        coverLetter: '', linkedin: '', portfolio: '',
        gender: '', race: '', veteran: '',
        university: '', major: '', degree: '',
        startDate: '', endDate: '', gpa: ''
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    /* ── Resume upload + parse ── */
    const handleChange = async (e) => {
        const { name, value, type, files } = e.target
        if (type === 'file') {
            const file = files[0]
            setFormData(prev => ({ ...prev, [name]: file }))
            if (name === 'resume' && file) {
                setResumeError(false)
                setErrors(prev => { const e = { ...prev }; delete e.resume; return e })
                setIsParsing(true)
                setParseStatus('')
                try {
                    const payload = new FormData()
                    payload.append('resume', file, file.name)
                    payload.append('role', role || defaultRole)
                    payload.append('uploadedAt', new Date().toISOString())
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL}/resume-parse`,
                        { method: 'POST', body: payload }
                    )
                    if (!res.ok) throw new Error(`${res.status}`)
                    const result = await res.json()
                    setFormData(prev => ({
                        ...prev,
                        firstName:  result.firstName  || prev.firstName,
                        lastName:   result.lastName   || prev.lastName,
                        email:      result.email      || prev.email,
                        phone:      result.phone      || prev.phone,
                        linkedin:   result.linkedin   || prev.linkedin,
                        portfolio:  result.portfolio  || prev.portfolio,
                        university: result.university || prev.university,
                        major:      result.major      || prev.major,
                        degree:     result.degree     || prev.degree,
                        startDate:  result.startDate  || prev.startDate,
                        endDate:    result.endDate    || prev.endDate,
                        gpa:        result.gpa        || prev.gpa,
                    }))
                    setParseStatus('success')
                } catch (err) {
                    console.error('Resume webhook error:', err)
                    setParseStatus('error')
                } finally {
                    setIsParsing(false)
                }
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
            // Clear error for this field as soon as user types
            if (value.trim()) {
                setErrors(prev => { const e = { ...prev }; delete e[name]; return e })
            }
        }
    }

    /* ── Step 1 validation ── */
    const validateStep1 = () => {
        const e = {}
        if (!formData.resume)              e.resume     = 'Please upload your resume to continue.'
        if (!formData.firstName.trim())    e.firstName  = 'First name is required.'
        if (!formData.lastName.trim())     e.lastName   = 'Last name is required.'
        if (!formData.email.trim())        e.email      = 'Email address is required.'
        if (!formData.phone.trim())        e.phone      = 'Phone number is required.'
        if (!formData.university.trim())   e.university = 'University / Institution is required.'
        if (!formData.major.trim())        e.major      = 'Major / Field of study is required.'
        if (!formData.degree.trim())       e.degree     = 'Degree is required.'
        if (!formData.startDate.trim())    e.startDate  = 'Start date is required.'
        if (!formData.endDate.trim())      e.endDate    = 'Expected end date is required.'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    /* ── Step 2 validation ── */
    const validateStep2 = () => {
        const e = {}
        if (!formData.linkedin.trim()) e.linkedin = 'LinkedIn profile URL is required.'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleNext = () => {
        if (currentStep === 1) {
            const valid = validateStep1()
            setResumeError(!formData.resume)
            if (!valid) return
        }
        if (currentStep === 2) {
            if (!validateStep2()) return
        }
        setErrors({})
        setResumeError(false)
        setCurrentStep(prev => Math.min(prev + 1, steps.length))
    }

    const handleBack = () => {
        setErrors({})
        setCurrentStep(prev => Math.max(prev - 1, 1))
    }

    /* ── Final submit → career-form webhook as multipart/form-data (binary) ── */
    const handleSubmit = async () => {
        setIsSubmitting(true)
        setSubmitError('')
        try {
            const payload = new FormData()
            if (formData.resume) {
                payload.append('resume', formData.resume, formData.resume.name)
            }
            payload.append('role',        role || defaultRole)
            payload.append('submittedAt', new Date().toISOString())
            payload.append('firstName',   formData.firstName)
            payload.append('lastName',    formData.lastName)
            payload.append('email',       formData.email)
            payload.append('phone',       formData.phone)
            payload.append('linkedin',    formData.linkedin)
            payload.append('portfolio',   formData.portfolio   || '')
            payload.append('coverLetter', formData.coverLetter || '')
            payload.append('gender',      formData.gender      || '')
            payload.append('race',        formData.race        || '')
            payload.append('veteran',     formData.veteran     || '')
            payload.append('university',  formData.university  || '')
            payload.append('major',       formData.major       || '')
            payload.append('degree',      formData.degree      || '')
            payload.append('startDate',   formData.startDate   || '')
            payload.append('endDate',     formData.endDate     || '')
            payload.append('gpa',         formData.gpa         || '')
            payload.append('fileName',    formData.resume ? formData.resume.name : '')

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL}/career-form`,
                { method: 'POST', body: payload }
            )
            if (!res.ok) throw new Error(`Webhook failed: ${res.status}`)
            setIsSubmitted(true)
        } catch (err) {
            console.error('Submit error:', err)
            setSubmitError('Submission failed. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const errStyle = { fontSize: '0.78rem', color: '#d93025', marginTop: '0.3rem', display: 'block' }
    const Req = () => <span style={requiredStar}>*</span>
    const iErr = (f) => errors[f] ? inputErrorStyle : inputStyle

    /* ── Success screen ── */
    if (isSubmitted) {
        return (
            <div style={{ paddingTop: '150px', paddingBottom: '100px', textAlign: 'center', minHeight: '80vh' }}>
                <Head><title>Application Submitted | Automaitee</title></Head>
                <div className="container">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        style={{ background: 'white', padding: '4rem', borderRadius: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', maxWidth: '600px', margin: '0 auto' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#e0ece0', color: '#116c4c', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
                            <Check size={40} />
                        </div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Application Submitted!</h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            Thank you for applying for the <strong>{role || defaultRole}</strong> role. Our team will review your application and get back to you soon.
                        </p>
                        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
                            Our team is engaging in lots of projects, including reviewing your application.<br />
                            Given these circumstances, we can't share any individual feedback to candidates that don't move beyond the initial application review phase.
                        </p>
                        <Link href="/" className="cta-button">Return to Home</Link>
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

            <div style={{ paddingTop: '120px', paddingBottom: '60px', background: 'transparent', minHeight: '100vh' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>

                    <div style={{ marginBottom: '2rem' }}>
                        <Link href="/work-with-us" style={{ color: '#0071e3', fontSize: '1rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            &larr; Back to Open Roles
                        </Link>
                        <h1 style={{ fontSize: '2.5rem', marginTop: '1rem', fontWeight: '700' }}>{role || defaultRole}</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Application Form</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '3rem', alignItems: 'start' }}>

                        {/* ── Sidebar ── */}
                        <div style={{ position: 'sticky', top: '120px', background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {steps.map((step, index) => {
                                    const isActive = currentStep === step.id
                                    const isCompleted = currentStep > step.id
                                    return (
                                        <li key={step.id} style={{ display: 'flex', alignItems: 'center', marginBottom: index !== steps.length - 1 ? '1.5rem' : '0', color: isActive ? '#000' : isCompleted ? '#116c4c' : 'var(--text-secondary)', fontWeight: isActive ? '600' : '400', transition: 'all 0.3s ease' }}>
                                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: isActive ? '#0071e3' : isCompleted ? '#e0ece0' : '#f5f5f7', color: isActive ? 'white' : isCompleted ? '#116c4c' : 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem', fontSize: '0.9rem', fontWeight: 'bold', flexShrink: 0 }}>
                                                {isCompleted ? <Check size={16} /> : step.id}
                                            </div>
                                            {step.title}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        {/* ── Main content ── */}
                        <div style={{ background: 'white', padding: '3rem', borderRadius: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>

                            {/* ════ STEP 1 ════ */}
                            {currentStep === 1 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: '600' }}>{steps[0].title}</h2>

                                    {/* Resume upload */}
                                    <div style={{ marginBottom: '2rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Resume / CV <Req /></label>
                                        <div style={{ border: `2px dashed ${errors.resume || resumeError ? '#d93025' : '#d2d2d7'}`, borderRadius: '0.5rem', padding: '2rem', textAlign: 'center', background: errors.resume ? '#fff8f8' : '#fbfbfd', cursor: 'pointer', position: 'relative' }}>
                                            <input type="file" name="resume" accept=".pdf,.docx" onChange={handleChange} disabled={isParsing}
                                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: isParsing ? 'wait' : 'pointer' }} />
                                            <AnimatePresence>
                                                {isParsing && (
                                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                        style={{ position: 'absolute', inset: 0, borderRadius: '0.4rem', zIndex: 5 }}>
                                                        <ResumePreloader />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                            <div style={{ visibility: isParsing ? 'hidden' : 'visible' }}>
                                                {formData.resume ? (
                                                    <>
                                                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem auto' }}>
                                                            <Check size={20} color="#116c4c" />
                                                        </div>
                                                        <p style={{ margin: 0, color: '#1d1d1f', fontWeight: '600' }}>{formData.resume.name}</p>
                                                        <p style={{ fontSize: '0.8rem', color: '#86868b', marginTop: '0.5rem' }}>Click to replace</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <UploadCloud size={32} style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }} />
                                                        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Drag & drop your resume here or click to upload</p>
                                                        <p style={{ fontSize: '0.8rem', color: '#86868b', marginTop: '0.5rem' }}>PDF, DOCX up to 5MB</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <AnimatePresence>
                                            {parseStatus === 'success' && (
                                                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                    style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: '#116c4c' }}>
                                                    ✓ Fields auto-filled from your resume
                                                </motion.p>
                                            )}
                                            {parseStatus === 'error' && (
                                                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                    style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: '#d93025' }}>
                                                    ⚠ Could not auto-fill — please fill in manually.
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                        <FieldError show={!!errors.resume} message={errors.resume} />
                                    </div>

                                    {/* Name */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>First Name <Req /></label>
                                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} style={iErr('firstName')} />
                                            <FieldError show={!!errors.firstName} message={errors.firstName} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Last Name <Req /></label>
                                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} style={iErr('lastName')} />
                                            <FieldError show={!!errors.lastName} message={errors.lastName} />
                                        </div>
                                    </div>

                                    {/* Email / Phone */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address <Req /></label>
                                            <input type="email" name="email" value={formData.email} onChange={handleChange} style={iErr('email')} />
                                            <FieldError show={!!errors.email} message={errors.email} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone Number <Req /></label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={iErr('phone')} />
                                            <FieldError show={!!errors.phone} message={errors.phone} />
                                        </div>
                                    </div>

                                    {/* ── Education Section ── */}
                                    <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1.2rem', fontWeight: '600', paddingBottom: '0.5rem', borderBottom: '1px solid #eee' }}>Most Recent Education</h3>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>University / Institution <Req /></label>
                                        <input type="text" name="university" value={formData.university} onChange={handleChange} style={iErr('university')} />
                                        <FieldError show={!!errors.university} message={errors.university} />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Major / Field of Study <Req /></label>
                                            <input type="text" name="major" value={formData.major} onChange={handleChange} style={iErr('major')} />
                                            <FieldError show={!!errors.major} message={errors.major} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Degree <Req /></label>
                                            <input type="text" name="degree" value={formData.degree} onChange={handleChange} style={iErr('degree')} />
                                            <FieldError show={!!errors.degree} message={errors.degree} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Start Date <Req /></label>
                                            <input type="text" name="startDate" placeholder="e.g. Sep 2019" value={formData.startDate} onChange={handleChange} style={iErr('startDate')} />
                                            <FieldError show={!!errors.startDate} message={errors.startDate} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Expected End Date <Req /></label>
                                            <input type="text" name="endDate" placeholder="e.g. May 2023" value={formData.endDate} onChange={handleChange} style={iErr('endDate')} />
                                            <FieldError show={!!errors.endDate} message={errors.endDate} />
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                            GPA <span style={{ color: '#86868b', fontWeight: '400', fontSize: '0.88rem' }}>(optional)</span>
                                        </label>
                                        <input type="text" name="gpa" value={formData.gpa} onChange={handleChange}
                                            style={{ ...inputStyle, maxWidth: '300px' }} />
                                    </div>
                                </motion.div>
                            )}

                            {/* ════ STEP 2 ════ */}
                            {currentStep === 2 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: '600' }}>{steps[1].title}</h2>
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Cover Letter / Why this role?</label>
                                        <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} rows="6"
                                            style={{ ...inputStyle, resize: 'vertical' }} placeholder="Tell us why you are a great fit..." />
                                    </div>
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>LinkedIn Profile <Req /></label>
                                        <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange}
                                            style={iErr('linkedin')} placeholder="https://linkedin.com/in/..." />
                                        <FieldError show={!!errors.linkedin} message={errors.linkedin} />
                                    </div>
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Portfolio / Personal Website</label>
                                        <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange}
                                            style={inputStyle} placeholder="https://" />
                                    </div>
                                </motion.div>
                            )}

                            {/* ════ STEP 3 ════ */}
                            {currentStep === 3 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', fontWeight: '600' }}>{steps[2].title}</h2>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                                        We are an equal opportunity employer. This information is voluntary, kept confidential, and not used in hiring decisions.
                                    </p>
                                    {[
                                        { name: 'gender', label: 'Gender', options: ['Male', 'Female', 'Non-binary', 'Prefer not to say'] },
                                        { name: 'race', label: 'Race/Ethnicity', options: ['Hispanic/Latino', 'White', 'Black/African American', 'Asian', 'Other', 'Prefer not to say'] },
                                        { name: 'veteran', label: 'Veteran Status', options: ['I am a protected veteran', 'I am not a protected veteran', 'Prefer not to say'] },
                                    ].map(f => (
                                        <div key={f.name} style={{ marginBottom: '1.5rem' }}>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{f.label}</label>
                                            <select name={f.name} value={formData[f.name]} onChange={handleChange}
                                                style={{ ...inputStyle, background: 'white' }}>
                                                <option value="">Select an option</option>
                                                {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                                            </select>
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {/* ════ STEP 4 — Review & Apply ════ */}
                            {currentStep === 4 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <h2 style={{ fontSize: '1.8rem', marginBottom: '0.4rem', fontWeight: '600' }}>{steps[3].title}</h2>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.8rem', fontSize: '0.95rem' }}>
                                        Review your details below. Click <strong>Edit</strong> in any section to go back and make changes.
                                    </p>

                                    <ReviewSection icon={<User size={15} color="#0071e3" />} title="Careers Profile" onEdit={() => setCurrentStep(1)}>
                                        <ReviewRow label="Full Name" value={`${formData.firstName} ${formData.lastName}`.trim() || null} missing={!formData.firstName} />
                                        <ReviewRow label="Email" value={formData.email} missing={!formData.email} />
                                        <ReviewRow label="Phone" value={formData.phone} missing={!formData.phone} />
                                        <ReviewRow label="Resume"
                                            value={formData.resume
                                                ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                                                    <FileText size={13} color="#0071e3" />{formData.resume.name}
                                                </span>
                                                : null}
                                            missing={!formData.resume} />
                                        <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px dashed #d2d2d7' }}>
                                            <div style={{ fontWeight: '600', fontSize: '0.85rem', color: '#86868b', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Most Recent Education</div>
                                            <ReviewRow label="University" value={formData.university || null} missing={!formData.university} />
                                            <ReviewRow label="Major"      value={formData.major      || null} missing={!formData.major} />
                                            <ReviewRow label="Degree"     value={formData.degree     || null} missing={!formData.degree} />
                                            <ReviewRow label="Timeline"   value={(formData.startDate || formData.endDate) ? `${formData.startDate || '?'} - ${formData.endDate || '?'}` : null} missing={!formData.startDate && !formData.endDate} />
                                            <ReviewRow label="GPA"        value={formData.gpa        || null} />
                                        </div>
                                    </ReviewSection>

                                    <ReviewSection icon={<Briefcase size={15} color="#0071e3" />} title="Role Information" onEdit={() => setCurrentStep(2)}>
                                        <ReviewRow label="LinkedIn"     value={formData.linkedin}  missing={!formData.linkedin} />
                                        <ReviewRow label="Portfolio"    value={formData.portfolio  || null} />
                                        <ReviewRow label="Cover Letter" value={formData.coverLetter ? 'Provided ✓' : null} />
                                    </ReviewSection>

                                    <ReviewSection icon={<Shield size={15} color="#0071e3" />} title="Voluntary Self-Identification" onEdit={() => setCurrentStep(3)}>
                                        <ReviewRow label="Gender"         value={formData.gender  || null} />
                                        <ReviewRow label="Race/Ethnicity" value={formData.race    || null} />
                                        <ReviewRow label="Veteran Status" value={formData.veteran || null} />
                                    </ReviewSection>

                                    <AnimatePresence>
                                        {submitError && (
                                            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                style={{ margin: '0.5rem 0', fontSize: '0.88rem', color: '#d93025', background: '#fff0f0', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #fcc' }}>
                                                ⚠ {submitError}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>

                                    <p style={{ fontSize: '0.82rem', color: '#86868b', marginTop: '1.2rem', lineHeight: 1.6 }}>
                                        By submitting, you confirm all information is accurate. Fields marked
                                        <span style={requiredStar}> *</span> are required.
                                    </p>
                                </motion.div>
                            )}

                            {/* ── Navigation ── */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
                                {currentStep > 1
                                    ? <button type="button" onClick={handleBack}
                                        style={{ padding: '0.8rem 1.5rem', border: '1px solid #d2d2d7', background: 'white', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: '500', cursor: 'pointer' }}>
                                        Back
                                    </button>
                                    : <div />
                                }

                                {currentStep < steps.length && (
                                    <button type="button" onClick={handleNext} disabled={isParsing}
                                        style={{ padding: '0.8rem 1.5rem', background: isParsing ? '#a0c4e8' : '#0071e3', color: 'white', border: 'none', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: '500', cursor: isParsing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.2s' }}>
                                        Save and Continue <ChevronRight size={18} />
                                    </button>
                                )}

                                {currentStep === 4 && (
                                    <button type="button" onClick={handleSubmit} disabled={isSubmitting}
                                        style={{ padding: '0.8rem 2rem', background: isSubmitting ? '#6aab8a' : '#116c4c', color: 'white', border: 'none', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 'bold', cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', transition: 'background 0.2s' }}>
                                        {isSubmitting ? (
                                            <>
                                                <svg width="18" height="18" viewBox="0 0 56 56" style={{ animation: 'spin 1s linear infinite', flexShrink: 0 }}>
                                                    <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="5" />
                                                    <circle cx="28" cy="28" r="24" fill="none" stroke="white" strokeWidth="5"
                                                        strokeDasharray="150" strokeDashoffset="110" strokeLinecap="round" />
                                                </svg>
                                                Submitting…
                                            </>
                                        ) : 'Submit Application'}
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}