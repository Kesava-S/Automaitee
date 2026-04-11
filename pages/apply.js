import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function Apply() {
    const router = useRouter()
    const { role } = router.query
    const displayedRole = role || "AI Marketing Automation Intern"

    const [step, setStep] = useState(1) // 1: popup 1, 2: popup 2, 3: popup 3, 4: form 1, 5: form 2, 6: success

    const [popups, setPopups] = useState({
        agreeToExpectations: false,
        understoodFee: false,
        clearFAQ: false,
    })

    const [formData, setFormData] = useState({
        degree: '',
        relatedCourseName: '',
        
        currentYear: '',
        monthsRemaining: '',
        aggregate65: '',
        attendance70: '',
        hasLaptop: '',

        codingLanguages: '',
        linkedin: '',
        github: '',
        aiTools: '',
        marketingTools: '',
        
        // Step 5 fields
        fullName: '',
        email: '',
        whatsapp: '',
        location: '',
        whyInternship: '',
        whatToLearn: '',
        paidTraining: '',
    })

    const [formErrors, setFormErrors] = useState({})
    const [submitStatus, setSubmitStatus] = useState('')

    const handlePopupChange = (e) => {
        setPopups({ ...popups, [e.target.name]: e.target.checked })
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: undefined }))
        }
    }

    const handlePopupNext = (requiredField, nextStep) => {
        if (!popups[requiredField]) {
            alert('You must check the agreement box to continue.')
            return
        }
        setStep(nextStep)
    }

    const validateStep4 = () => {
        const errors = {}
        if (!formData.degree) errors.degree = "Degree selection is required."
        if (formData.degree === 'related' && !formData.relatedCourseName.trim()) {
            errors.relatedCourseName = "Course name is required."
        }
        if (!formData.currentYear) errors.currentYear = "Current year is required."
        if (!formData.monthsRemaining) errors.monthsRemaining = "Required"
        if (!formData.aggregate65) errors.aggregate65 = "Required"
        if (!formData.attendance70) errors.attendance70 = "Required"
        if (!formData.hasLaptop) errors.hasLaptop = "Required"
        if (!formData.codingLanguages.trim()) errors.codingLanguages = "Required"

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleStep4Submit = (e) => {
        e.preventDefault()
        if (validateStep4()) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setStep(5)
        }
    }

    const validateStep5 = () => {
        const errors = {}
        if (!formData.fullName.trim()) errors.fullName = "Required"
        if (!formData.email.trim()) errors.email = "Required"
        if (!formData.whatsapp.trim()) errors.whatsapp = "Required"
        if (!formData.location.trim()) errors.location = "Required"
        if (!formData.whyInternship.trim()) errors.whyInternship = "Required"
        if (!formData.whatToLearn.trim()) errors.whatToLearn = "Required"
        if (!formData.paidTraining) errors.paidTraining = "Required"

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateStep5()) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }
        setSubmitStatus('submitting')
        
        // Simulating submission delay
        setTimeout(() => {
            setSubmitStatus('success')
            setStep(6)
        }, 1500)
    }

    // Styles
    const modalStyle = {
        background: 'white',
        maxWidth: '600px',
        width: '90%',
        margin: '100px auto',
        padding: '2.5rem',
        borderRadius: '1rem',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
    }
    const h2Style = { fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.25rem', color: '#1d1d1f' }
    const pStyle = { fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }
    const checkRow = { display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f5f5f7', padding: '1.25rem', borderRadius: '0.5rem', cursor: 'pointer' }
    const inputStyle = { width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #d2d2d7', fontSize: '1rem' }
    const fieldHeader = { fontWeight: '600', marginBottom: '0.5rem', display: 'block' }

    return (
        <>
            <Head>
                <title>Apply for {displayedRole} | Automaitee</title>
                <meta name="robots" content="noindex" />
            </Head>

            <div style={{ minHeight: '100vh', background: '#fbfbfd', paddingBottom: '60px' }}>
                <AnimatePresence mode="wait">
                    
                    {/* POPUP 1 */}
                    {step === 1 && (
                        <motion.div key="p1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} style={modalStyle}>
                            <h2 style={h2Style}>What we expect from you</h2>
                            <p style={pStyle}>
                                This programme demands genuine commitment. Live sessions are mandatory. You are allowed a maximum of one absence during the course, and only if you inform us before the session begins. Missing a session without prior notice results in immediate removal from the programme — no exceptions and no refund.
                            </p>
                            <p style={pStyle}>
                                We are not strict for the sake of being strict. We are strict because you will be working with real clients and real money. Professional discipline starts here.
                            </p>
                            <label style={checkRow}>
                                <input type="checkbox" name="agreeToExpectations" checked={popups.agreeToExpectations} onChange={handlePopupChange} style={{ transform: 'scale(1.2)' }} />
                                <span style={{ fontWeight: '500', color: '#1d1d1f' }}>I Agree</span>
                            </label>
                            <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                                <button className="cta-button" onClick={() => handlePopupNext('agreeToExpectations', 2)} style={{ padding: '0.8rem 2rem' }}>Next →</button>
                            </div>
                        </motion.div>
                    )}

                    {/* POPUP 2 */}
                    {step === 2 && (
                        <motion.div key="p2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} style={modalStyle}>
                            <h2 style={h2Style}>Course fee</h2>
                            <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f0fdf4', color: '#166534', borderRadius: '0.5rem', fontWeight: '600', fontSize: '1.1rem' }}>
                                ₹1,000 — one-time, non-refundable
                            </div>
                            <p style={pStyle}>
                                Shortlisted candidates will have to pay 1000 rupees to enroll the course.
                            </p>
                            <p style={pStyle}>
                                This covers your access to live sessions, real ad platform accounts, course materials, and task evaluations throughout the 1-month course. The fee is intentionally kept low to make this accessible. It is non-refundable because you are receiving real tool access and expert instruction from day one.
                            </p>
                            <label style={checkRow}>
                                <input type="checkbox" name="understoodFee" checked={popups.understoodFee} onChange={handlePopupChange} style={{ transform: 'scale(1.2)' }} />
                                <span style={{ fontWeight: '500', color: '#1d1d1f' }}>I Understood it.</span>
                            </label>
                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                                <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#0071e3', fontWeight: '600', cursor: 'pointer' }}>← Back</button>
                                <button className="cta-button" onClick={() => handlePopupNext('understoodFee', 3)} style={{ padding: '0.8rem 2rem' }}>Next →</button>
                            </div>
                        </motion.div>
                    )}

                    {/* POPUP 3 */}
                    {step === 3 && (
                        <motion.div key="p3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} style={{ ...modalStyle, maxWidth: '750px' }}>
                            <h2 style={h2Style}>Frequently asked questions</h2>
                            
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Is this a certificate course?</h4>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>No. This is a selection programme for a paid internship. You do not receive a certificate. You receive real skills, real experience, and if you perform well, a paid role on our team.</p>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>What happens if I am not selected after the course?</h4>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>You will receive a personalised email explaining why and what to work on. The ₹1,000 fee is non-refundable — you received a full month of live training on real platforms regardless of selection outcome.</p>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Can I attend if I am from a college not mentioned on the form?</h4>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Yes. The programme is open to eligible students from any college as long as you meet the eligibility criteria.</p>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Will sessions be recorded?</h4>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Yes. All live sessions are recorded and shared with enrolled participants only. However attendance to live sessions is still mandatory — recordings are for revision only, not a substitute for being present.</p>
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>When does the programme start?</h4>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Applications are open until seats are filled. Once the batch is confirmed, selected students will receive the schedule by email.</p>
                            </div>

                            <label style={checkRow}>
                                <input type="checkbox" name="clearFAQ" checked={popups.clearFAQ} onChange={handlePopupChange} style={{ transform: 'scale(1.2)' }} />
                                <span style={{ fontWeight: '500', color: '#1d1d1f' }}>I am clear</span>
                            </label>
                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                                <button onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: '#0071e3', fontWeight: '600', cursor: 'pointer' }}>← Back</button>
                                <button className="cta-button" onClick={() => handlePopupNext('clearFAQ', 4)} style={{ padding: '0.8rem 2rem' }}>Proceed to Application</button>
                            </div>
                        </motion.div>
                    )}

                    {/* FORM APPLICATION - STAGE 1 */}
                    {step === 4 && (
                        <motion.div key="p4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} style={{ maxWidth: '800px', margin: '80px auto', padding: '0 20px' }}>
                            <Link href="/work-with-us" style={{ color: '#0071e3', fontWeight: '600', display: 'inline-block', marginBottom: '1.5rem' }}>← Cancel Application</Link>
                            
                            <div style={{ background: 'white', padding: '3rem', borderRadius: '1rem', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                                <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Application Form</h1>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>{displayedRole}</p>

                                <form onSubmit={handleStep4Submit}>
                                    
                                    {/* GENERAL INFO */}
                                    <div style={{ marginBottom: '3rem' }}>
                                        <label style={fieldHeader}>Degree</label>
                                        <select name="degree" value={formData.degree} onChange={handleChange} style={{ ...inputStyle, borderColor: formErrors.degree ? '#d93025' : '#d2d2d7' }}>
                                            <option value="">Select Degree...</option>
                                            <option value="CS">Computer Science (CS)</option>
                                            <option value="IT">Information Technology (IT)</option>
                                            <option value="BCA">BCA</option>
                                            <option value="MCA">MCA</option>
                                            <option value="related">Related field</option>
                                        </select>
                                        {formErrors.degree && <div style={{ color: '#d93025', fontSize: '0.85rem', marginTop: '0.35rem' }}>{formErrors.degree}</div>}
                                        
                                        {formData.degree === 'related' && (
                                            <div style={{ marginTop: '1rem' }}>
                                                <label style={fieldHeader}>Course Name</label>
                                                <input type="text" name="relatedCourseName" value={formData.relatedCourseName} onChange={handleChange} style={{ ...inputStyle, borderColor: formErrors.relatedCourseName ? '#d93025' : '#d2d2d7' }} placeholder="Please specify your course name" />
                                                {formErrors.relatedCourseName && <div style={{ color: '#d93025', fontSize: '0.85rem', marginTop: '0.35rem' }}>{formErrors.relatedCourseName}</div>}
                                            </div>
                                        )}
                                    </div>

                                    {/* SECTION 1 */}
                                    <div style={{ marginBottom: '3rem' }}>
                                        <h3 style={{ fontSize: '1.35rem', fontWeight: '600', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.75rem' }}>Section 1: Academic Eligibility</h3>
                                        
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={fieldHeader}>Current Year</label>
                                            <select name="currentYear" value={formData.currentYear} onChange={handleChange} style={{ ...inputStyle, borderColor: formErrors.currentYear ? '#d93025' : '#d2d2d7' }}>
                                                <option value="">Select Current Year...</option>
                                                <option value="3rd Year (4-year course)">3rd year of 4-year course</option>
                                                <option value="2nd Year (3-year course)">2nd year of 3-year course</option>
                                                <option value="1st Year Masters">Masters 1st year</option>
                                            </select>
                                            {formErrors.currentYear && <div style={{ color: '#d93025', fontSize: '0.85rem', marginTop: '0.35rem' }}>{formErrors.currentYear}</div>}
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            {[
                                                { name: 'monthsRemaining', label: '6+ months academic year remaining' },
                                                { name: 'aggregate65', label: 'Aggregate 65% or above' },
                                                { name: 'attendance70', label: 'Attendance 70% or above' },
                                                { name: 'hasLaptop', label: 'I have a personal laptop and stable internet' }
                                            ].map(field => (
                                                <div key={field.name}>
                                                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: formErrors[field.name] ? '#d93025' : '#1d1d1f' }}>
                                                        {field.label} {formErrors[field.name] && <span style={{ color: '#d93025', fontWeight: 'normal', fontSize: '0.85rem' }}>* {formErrors[field.name]}</span>}
                                                    </label>
                                                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                                            <input type="radio" name={field.name} value="Yes" checked={formData[field.name] === 'Yes'} onChange={handleChange} />
                                                            Yes
                                                        </label>
                                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                                            <input type="radio" name={field.name} value="No" checked={formData[field.name] === 'No'} onChange={handleChange} />
                                                            No
                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* SECTION 2 */}
                                    <div style={{ marginBottom: '3rem' }}>
                                        <h3 style={{ fontSize: '1.35rem', fontWeight: '600', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.75rem' }}>Section 2: Skills & Background</h3>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={{ ...fieldHeader, color: formErrors.codingLanguages ? '#d93025' : '#1d1d1f' }}>Coding languages known (JS / API / JSON etc.) <span style={{ color: '#d93025' }}>*</span></label>
                                            <input type="text" name="codingLanguages" value={formData.codingLanguages} onChange={handleChange} style={{ ...inputStyle, borderColor: formErrors.codingLanguages ? '#d93025' : '#d2d2d7' }} placeholder="e.g. JavaScript, Python" />
                                            {formErrors.codingLanguages && <div style={{ color: '#d93025', fontSize: '0.85rem', marginTop: '0.35rem' }}>{formErrors.codingLanguages}</div>}
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={fieldHeader}>LinkedIn Profile <span style={{ color: '#86868b', fontWeight: 'normal' }}>(Optional)</span></label>
                                            <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} style={inputStyle} placeholder="https://linkedin.com/in/..." />
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={fieldHeader}>GitHub Profile <span style={{ color: '#86868b', fontWeight: 'normal' }}>(Optional)</span></label>
                                            <input type="url" name="github" value={formData.github} onChange={handleChange} style={inputStyle} placeholder="https://github.com/..." />
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={fieldHeader}>AI tools used independently <span style={{ color: '#86868b', fontWeight: 'normal' }}>(Optional)</span></label>
                                            <input type="text" name="aiTools" value={formData.aiTools} onChange={handleChange} style={inputStyle} placeholder="e.g. ChatGPT, Claude, Midjourney" />
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={fieldHeader}>Prior Online business marketing tool exposure <span style={{ color: '#86868b', fontWeight: 'normal' }}>(Optional)</span></label>
                                            <input type="text" name="marketingTools" value={formData.marketingTools} onChange={handleChange} style={inputStyle} placeholder="e.g. Google Ads, Meta Ads" />
                                        </div>
                                    </div>

                                    <div style={{ borderTop: '1px solid #eee', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                                        <button type="button" onClick={() => setStep(3)} style={{ background: 'none', border: 'none', color: '#0071e3', fontWeight: '600', cursor: 'pointer', padding: '1rem' }}>← Back</button>
                                        <button type="submit" className="cta-button" style={{ padding: '1rem 3rem' }}>
                                            Next →
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {/* FORM APPLICATION - STAGE 2 */}
                    {step === 5 && (
                        <motion.div key="p5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} style={{ maxWidth: '800px', margin: '80px auto', padding: '0 20px' }}>
                            <Link href="/work-with-us" style={{ color: '#0071e3', fontWeight: '600', display: 'inline-block', marginBottom: '1.5rem' }}>← Cancel Application</Link>
                            
                            <div style={{ background: 'white', padding: '3rem', borderRadius: '1rem', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                                <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Final Details</h1>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Just a few more things before you submit.</p>

                                <form onSubmit={handleSubmit}>
                                    <div className="responsive-grid" style={{ marginBottom: '1.5rem' }}>
                                        <div>
                                            <label style={{ ...fieldHeader, color: formErrors.fullName ? '#d93025' : '#1d1d1f' }}>Full Name <span style={{ color: '#d93025' }}>*</span></label>
                                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} style={{ ...inputStyle, borderColor: formErrors.fullName ? '#d93025' : '#d2d2d7' }} />
                                            {formErrors.fullName && <div style={{ color: '#d93025', fontSize: '0.85rem', marginTop: '0.35rem' }}>{formErrors.fullName}</div>}
                                        </div>
                                        <div>
                                            <label style={{ ...fieldHeader, color: formErrors.email ? '#d93025' : '#1d1d1f' }}>Email <span style={{ color: '#d93025' }}>*</span></label>
                                            <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ ...inputStyle, borderColor: formErrors.email ? '#d93025' : '#d2d2d7' }} />
                                            {formErrors.email && <div style={{ color: '#d93025', fontSize: '0.85rem', marginTop: '0.35rem' }}>{formErrors.email}</div>}
                                        </div>
                                    </div>

                                    <div className="responsive-grid" style={{ marginBottom: '1.5rem' }}>
                                        <div>
                                            <label style={{ ...fieldHeader, color: formErrors.whatsapp ? '#d93025' : '#1d1d1f' }}>WhatsApp Number <span style={{ color: '#d93025' }}>*</span></label>
                                            <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} style={{ ...inputStyle, borderColor: formErrors.whatsapp ? '#d93025' : '#d2d2d7' }} />
                                            {formErrors.whatsapp && <div style={{ color: '#d93025', fontSize: '0.85rem', marginTop: '0.35rem' }}>{formErrors.whatsapp}</div>}
                                        </div>
                                        <div>
                                            <label style={{ ...fieldHeader, color: formErrors.location ? '#d93025' : '#1d1d1f' }}>Location (City) <span style={{ color: '#d93025' }}>*</span></label>
                                            <input type="text" name="location" value={formData.location} onChange={handleChange} style={{ ...inputStyle, borderColor: formErrors.location ? '#d93025' : '#d2d2d7' }} />
                                            {formErrors.location && <div style={{ color: '#d93025', fontSize: '0.85rem', marginTop: '0.35rem' }}>{formErrors.location}</div>}
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <label style={{ ...fieldHeader, color: formErrors.whyInternship ? '#d93025' : '#1d1d1f' }}>Why do you want this internship? <span style={{ color: '#86868b', fontWeight: 'normal' }}>(Max 150 words)</span> <span style={{ color: '#d93025' }}>*</span></label>
                                        <textarea name="whyInternship" value={formData.whyInternship} onChange={handleChange} style={{ ...inputStyle, minHeight: '100px', resize: 'vertical', borderColor: formErrors.whyInternship ? '#d93025' : '#d2d2d7' }} />
                                        {formErrors.whyInternship && <div style={{ color: '#d93025', fontSize: '0.85rem', marginTop: '0.35rem' }}>{formErrors.whyInternship}</div>}
                                    </div>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <label style={{ ...fieldHeader, color: formErrors.whatToLearn ? '#d93025' : '#1d1d1f' }}>What do you expect to learn? <span style={{ color: '#86868b', fontWeight: 'normal' }}>(Max 150 words)</span> <span style={{ color: '#d93025' }}>*</span></label>
                                        <textarea name="whatToLearn" value={formData.whatToLearn} onChange={handleChange} style={{ ...inputStyle, minHeight: '100px', resize: 'vertical', borderColor: formErrors.whatToLearn ? '#d93025' : '#d2d2d7' }} />
                                        {formErrors.whatToLearn && <div style={{ color: '#d93025', fontSize: '0.85rem', marginTop: '0.35rem' }}>{formErrors.whatToLearn}</div>}
                                    </div>

                                    <div style={{ marginBottom: '2rem' }}>
                                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: formErrors.paidTraining ? '#d93025' : '#1d1d1f' }}>
                                            Willing to take paid training before internship <span style={{ color: '#d93025' }}>*</span> {formErrors.paidTraining && <span style={{ color: '#d93025', fontWeight: 'normal', fontSize: '0.85rem' }}>* {formErrors.paidTraining}</span>}
                                        </label>
                                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                                <input type="radio" name="paidTraining" value="Yes" checked={formData.paidTraining === 'Yes'} onChange={handleChange} />
                                                Yes
                                            </label>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                                <input type="radio" name="paidTraining" value="No" checked={formData.paidTraining === 'No'} onChange={handleChange} />
                                                No
                                            </label>
                                        </div>
                                    </div>

                                    <div style={{ borderTop: '1px solid #eee', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                                        <button type="button" onClick={() => setStep(4)} style={{ background: 'none', border: 'none', color: '#0071e3', fontWeight: '600', cursor: 'pointer', padding: '1rem' }}>← Back</button>
                                        <button type="submit" disabled={submitStatus === 'submitting'} className="cta-button" style={{ padding: '1rem 3rem', opacity: submitStatus === 'submitting' ? 0.7 : 1 }}>
                                            {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {/* SUCCESS SCREEN */}
                    {step === 6 && (
                        <motion.div key="p6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ maxWidth: '600px', margin: '120px auto', background: 'white', padding: '4rem 3rem', borderRadius: '1rem', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                            <div style={{ width: '80px', height: '80px', background: '#e0ece0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#116c4c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>Application Submitted!</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                                Thank you for applying to the {displayedRole} programme. Our team will review your application and be in touch soon.
                            </p>
                            <Link href="/" className="cta-button" style={{ display: 'inline-block' }}>
                                Return to Homepage
                            </Link>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </>
    )
}