import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, User, Bot } from 'lucide-react';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm Automaitee, your AI assistant. How can I help you automate your business today?", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showWelcomePopup, setShowWelcomePopup] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Show welcome popup after delay
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) {
                setShowWelcomePopup(true);
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMessage = { id: Date.now(), text: inputText, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputText("");
        setIsTyping(true);

        // Simulate AI response delay
        setTimeout(() => {
            const botResponses = [
                "That's a great question about automation!",
                "We can certainly help you streamline that process.",
                "Automaitee specializes in exactly that kind of workflow.",
                "Would you like to book a consultation to discuss this further?",
                "Our AI agents can handle that task 24/7."
            ];
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

            const botMessage = {
                id: Date.now() + 1,
                text: randomResponse,
                sender: 'bot'
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Welcome Popup */}
            {showWelcomePopup && !isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '7rem',
                        right: '2rem',
                        backgroundColor: 'white',
                        padding: '1rem',
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                        zIndex: 9998,
                        maxWidth: '250px',
                        animation: 'fadeIn 0.5s ease-out',
                        border: '1px solid #f5f5f7'
                    }}
                >
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowWelcomePopup(false);
                            }}
                            style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                background: '#f5f5f7',
                                border: 'none',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#86868b'
                            }}
                        >
                            <X size={12} />
                        </button>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#1d1d1f', lineHeight: '1.4' }}>
                            👋 Hi! Need help automating your business? Chat with us!
                        </p>
                        {/* Little triangle pointer */}
                        <div style={{
                            position: 'absolute',
                            bottom: '-24px',
                            right: '20px',
                            width: 0,
                            height: 0,
                            borderLeft: '10px solid transparent',
                            borderRight: '10px solid transparent',
                            borderTop: '10px solid white'
                        }} />
                    </div>
                </div>
            )}

            {/* Floating Toggle Button */}
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                    setShowWelcomePopup(false);
                }}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#0071e3', // Apple/Tech Blue
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,113,227,0.3)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '7rem',
                        right: '2rem',
                        width: '380px',
                        height: '600px',
                        maxHeight: 'calc(100vh - 10rem)',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 9999,
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.4)',
                        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: '1.5rem',
                        background: 'linear-gradient(135deg, #0071e3 0%, #00c6fb 100%)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Sparkles size={24} color="white" />
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>Ask Automaitee</h3>
                            <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>AI Automation Expert</span>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div style={{
                        flex: 1,
                        padding: '1.5rem',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        backgroundColor: 'rgba(245, 245, 247, 0.5)'
                    }}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                style={{
                                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '85%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                                }}
                            >
                                <div style={{
                                    padding: '12px 16px',
                                    borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                                    backgroundColor: msg.sender === 'user' ? '#0071e3' : 'white',
                                    color: msg.sender === 'user' ? 'white' : '#1d1d1f',
                                    boxShadow: msg.sender === 'bot' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.5'
                                }}>
                                    {msg.text}
                                </div>
                                <span style={{
                                    fontSize: '0.7rem',
                                    color: '#86868b',
                                    marginTop: '4px',
                                    marginLeft: '8px',
                                    marginRight: '8px'
                                }}>
                                    {msg.sender === 'user' ? 'You' : 'Automaitee'}
                                </span>
                            </div>
                        ))}
                        {isTyping && (
                            <div style={{ alignSelf: 'flex-start', marginLeft: '1rem' }}>
                                <div style={{
                                    padding: '12px 16px',
                                    borderRadius: '20px 20px 20px 4px',
                                    backgroundColor: 'white',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                    display: 'flex',
                                    gap: '4px'
                                }}>
                                    <span className="dot-animate" style={{ width: '6px', height: '6px', background: '#86868b', borderRadius: '50%', animationDelay: '0s' }}></span>
                                    <span className="dot-animate" style={{ width: '6px', height: '6px', background: '#86868b', borderRadius: '50%', animationDelay: '0.2s' }}></span>
                                    <span className="dot-animate" style={{ width: '6px', height: '6px', background: '#86868b', borderRadius: '50%', animationDelay: '0.4s' }}></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} style={{
                        padding: '1rem',
                        backgroundColor: 'white',
                        borderTop: '1px solid rgba(0,0,0,0.05)',
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'center'
                    }}>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type a message..."
                            style={{
                                flex: 1,
                                padding: '12px 16px',
                                borderRadius: '24px',
                                border: '1px solid #e5e5e5',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#0071e3'}
                            onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                        />
                        <button
                            type="submit"
                            disabled={!inputText.trim() || isTyping}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: inputText.trim() ? '#0071e3' : '#f5f5f7',
                                color: inputText.trim() ? 'white' : '#86868b',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: inputText.trim() ? 'pointer' : 'default',
                                transition: 'all 0.2s'
                            }}
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            )}
            <style jsx global>{`
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .dot-animate {
                    animation: bounce 1.4s infinite ease-in-out both;
                }
                @keyframes bounce {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }
            `}</style>
        </>
    );
}
