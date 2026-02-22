import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';

export default function BookingModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        countryCode: '+1',
        companyName: '',
        industry: '',
        goal: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        whatsapp: '',
        companyName: '',
        industry: '',
        goal: '',
        dateTime: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setIsSuccess(false);
            setIsSubmitting(false);
            setErrors({
                name: '',
                email: '',
                whatsapp: '',
                companyName: '',
                industry: '',
                goal: '',
                dateTime: ''
            });
        }
    }, [isOpen]);

    const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const generateTimeSlots = () => {
        return [
            "10:00",
            "11:00",
            "12:00",
            "13:00"
        ];
    };

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'name':
                if (!value.trim()) {
                    error = 'Name is required';
                } else if (value.trim().length < 2) {
                    error = 'Name must be at least 2 characters';
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    error = 'Name should only contain letters';
                }
                break;

            case 'email':
                if (!value.trim()) {
                    error = 'Email is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Please enter a valid email address';
                }
                break;

            case 'whatsapp':
                if (!value.trim()) {
                    error = 'WhatsApp number is required';
                } else if (!/^[\d\s\-\(\)]+$/.test(value)) {
                    error = 'Please enter a valid phone number';
                } else {
                    const digitsOnly = value.replace(/\D/g, '');
                    if (digitsOnly.length < 10) {
                        error = 'Phone number must be at least 10 digits';
                    } else if (digitsOnly.length > 15) {
                        error = 'Phone number cannot exceed 15 digits';
                    }
                }
                break;

            case 'companyName':
                if (value.trim() && value.trim().length < 2) {
                    error = 'Company name must be at least 2 characters';
                }
                break;

            case 'industry':
                // Optional field, no validation needed
                break;

            case 'goal':
                if (value.trim() && value.trim().length < 10) {
                    error = 'Please provide more details (at least 10 characters)';
                }
                break;

            default:
                break;
        }

        return error;
    };

    const handleDateClick = (day) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setSelectedDate(newDate);
        setSelectedTime(null); // Reset time when date changes
        // Clear date/time error when date is selected
        setErrors(prev => ({ ...prev, dateTime: '' }));
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Validate on change
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
        // Clear date/time error when time is selected
        setErrors(prev => ({ ...prev, dateTime: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields before submitting
        const newErrors = {};
        let hasErrors = false;

        // Validate form fields
        Object.keys(formData).forEach(key => {
            if (key !== 'countryCode') { // Skip countryCode validation
                const error = validateField(key, formData[key]);
                newErrors[key] = error;
                if (error) hasErrors = true;
            }
        });

        // Validate date and time selection
        if (!selectedDate || !selectedTime) {
            newErrors.dateTime = 'Please select both date and time';
            hasErrors = true;
        }

        setErrors(prev => ({ ...prev, ...newErrors }));

        if (hasErrors) {
            return;
        }

        setIsSubmitting(true);

        // Combine country code with phone number
        const fullWhatsAppNumber = `${formData.countryCode}${formData.whatsapp.replace(/\D/g, '')}`;

        const payload = {
            name: formData.name,
            email: formData.email,
            whatsapp: fullWhatsAppNumber,
            countryCode: formData.countryCode,
            companyName: formData.companyName,
            industry: formData.industry,
            goal: formData.goal,
            bookingDate: selectedDate ? selectedDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) : '',
            bookingTime: selectedTime,
            timestamp: new Date().toISOString()
        };

        // console.log('Submitting payload:', payload);

        try {
            // N8N Webhook URL
            const webhookUrl = `${process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL}/book-consultation`;

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // console.log('Booking submitted successfully');
            setFormData({
                name: '',
                email: '',
                whatsapp: '',
                countryCode: '+1',
                companyName: '',
                industry: '',
                goal: ''
            })
            setSelectedDate(null)
            setSelectedTime(null)
            setErrors({
                name: '',
                email: '',
                whatsapp: '',
                companyName: '',
                industry: '',
                goal: '',
                dateTime: ''
            });
            setIsSuccess(true);
        } catch (error) {
            console.error('Booking failed:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                {isSuccess ? (
                    <div className="success-view">
                        <div className="success-icon">
                            <Check size={48} color="white" />
                        </div>
                        <h2>Booking Request Sent!</h2>
                        <p>We've received your request. Our team will confirm your appointment shortly via WhatsApp/Email.</p>
                        <button className="cta-button" onClick={onClose}>Close</button>
                    </div>
                ) : (
                    <div className="booking-grid">
                        {/* Left Column: Form */}
                        <div className="form-column">
                            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
                                Automaitee Digital - AI Automation
                            </h3>
                            <h2 className="animated-text" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                                Schedule a time to talk
                            </h2>
                            <form onSubmit={handleSubmit} id="bookingForm">
                                <div className="form-group">
                                    <label>Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Your Name"
                                        className={errors.name ? 'error' : ''}
                                    />
                                    {errors.name && <span className="error-message">{errors.name}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Your Mail ID"
                                        className={errors.email ? 'error' : ''}
                                    />
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>
                                <div className="form-group">
                                    <label>WhatsApp *</label>
                                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                                        <select
                                            name="countryCode"
                                            value={formData.countryCode}
                                            onChange={handleInputChange}
                                            style={{
                                                width: '110px',
                                                padding: '12px',
                                                borderRadius: '8px',
                                                border: '1px solid #e5e5e5',
                                                backgroundColor: '#f5f5f7',
                                                fontSize: '0.95rem'
                                            }}
                                        >
                                            <option value="+1">+1 (US)</option>
                                            <option value="+44">+44 (UK)</option>
                                            <option value="+91">+91 (IN)</option>
                                            <option value="+61">+61 (AU)</option>
                                            <option value="+971">+971 (AE)</option>
                                            <option value="+65">+65 (SG)</option>
                                            <option value="+33">+33 (FR)</option>
                                            <option value="+49">+49 (DE)</option>
                                        </select>
                                        <div style={{ flex: 1 }}>
                                            <input
                                                type="tel"
                                                name="whatsapp"
                                                value={formData.whatsapp}
                                                onChange={handleInputChange}
                                                placeholder="Phone Number"
                                                className={errors.whatsapp ? 'error' : ''}
                                                style={{ width: '100%' }}
                                            />
                                        </div>
                                    </div>
                                    {errors.whatsapp && <span className="error-message">{errors.whatsapp}</span>}
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Company</label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            placeholder="Company Name"
                                            className={errors.companyName ? 'error' : ''}
                                        />
                                        {errors.companyName && <span className="error-message">{errors.companyName}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>Industry</label>
                                        <select
                                            name="industry"
                                            value={formData.industry}
                                            onChange={handleInputChange}
                                            className={errors.industry ? 'error' : ''}
                                        >
                                            <option value="">Select...</option>
                                            <option value="Education">Education</option>
                                            <option value="Finance">Finance</option>
                                            <option value="Real Estate">Real Estate</option>
                                            <option value="Hospitality">Hospitality</option>
                                            <option value="Marketing / Advertising">Marketing / Advertising</option>
                                            <option value="E-commerce">E-commerce</option>
                                            <option value="Manufacturing / Industrial">Manufacturing / Industrial</option>
                                            <option value="Healthcare">Healthcare</option>
                                            <option value="Others">Others</option>
                                        </select>
                                        {errors.industry && <span className="error-message">{errors.industry}</span>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Goal</label>
                                    <textarea
                                        name="goal"
                                        rows="2"
                                        value={formData.goal}
                                        onChange={handleInputChange}
                                        placeholder="What do you want to automate?"
                                        className={errors.goal ? 'error' : ''}
                                    ></textarea>
                                    {errors.goal && <span className="error-message">{errors.goal}</span>}
                                </div>
                            </form>
                        </div>

                        {/* Right Column: Calendar */}
                        <div className="calendar-column">
                            <div className="calendar-header">
                                <button onClick={handlePrevMonth}><ChevronLeft size={20} /></button>
                                <h3>{months[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
                                <button onClick={handleNextMonth}><ChevronRight size={20} /></button>
                            </div>

                            <div className="calendar-grid">
                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                                    <div key={d} className="calendar-day-header">{d}</div>
                                ))}
                                {Array(firstDayOfMonth(currentMonth)).fill(null).map((_, i) => (
                                    <div key={`empty-${i}`} />
                                ))}
                                {Array(daysInMonth(currentMonth)).fill(null).map((_, i) => {
                                    const day = i + 1;
                                    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                                    const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                                    const isToday = date.toDateString() === new Date().toDateString();

                                    // Disable past dates and today
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    const isDisabled = date <= today;

                                    return (
                                        <button
                                            key={day}
                                            className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                                            onClick={() => handleDateClick(day)}
                                            type="button"
                                            disabled={isDisabled}
                                            style={isDisabled ? { opacity: 0.3, cursor: 'not-allowed' } : {}}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>

                            {selectedDate && (
                                <div className="time-slots">
                                    <h4>Available Times for {selectedDate.toLocaleDateString()} (GMT)</h4>
                                    <div className="slots-grid">
                                        {generateTimeSlots().map(time => (
                                            <button
                                                key={time}
                                                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                                                onClick={() => handleTimeSelect(time)}
                                                type="button"
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {errors.dateTime && (
                                <div style={{ marginTop: '10px' }}>
                                    <span className="error-message">{errors.dateTime}</span>
                                </div>
                            )}
                            <br />
                            <div className="modal-footer">
                                <button
                                    type="submit"
                                    form="bookingForm"
                                    className="submit-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .error-message {
                    display: block;
                    color: #ef4444;
                    font-size: 0.875rem;
                    margin-top: 0.375rem;
                    font-weight: 400;
                }

                .form-group input.error,
                .form-group select.error,
                .form-group textarea.error {
                    border-color: #ef4444;
                }

                .form-group input.error:focus,
                .form-group select.error:focus,
                .form-group textarea.error:focus {
                    border-color: #ef4444;
                    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
                }
            `}</style>
        </div>
    );
}