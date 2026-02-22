import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm Automaitee, your AI assistant. How can I help you automate your business today?", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showWelcomePopup, setShowWelcomePopup] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

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
        if (!inputText.trim() || isTyping) return;

        const userMessage = { id: Date.now(), text: inputText, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputText;
        setInputText("");
        setIsTyping(true);

        // Check if sessionId already exists
        let sessionId = localStorage.getItem("automaitee_session");

        if (!sessionId) {
            sessionId = "user_" + Date.now();
            localStorage.setItem("automaitee_session", sessionId);
        }

        try {
            // ✅ Calls local Next.js API proxy — no CORS issues
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: currentInput,
                    sessionId: sessionId,
                    timestamp: new Date().toISOString(),
                    // Include conversation history for context (optional)
                    history: messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }))
                }),
            });

            if (!response.ok) {
                throw new Error(`Webhook responded with status ${response.status}`);
            }

            const data = await response.json();

            // n8n typically returns data in various shapes — handle common ones:
            // { output: "..." } | { message: "..." } | { text: "..." } | { response: "..." } | plain string
            let replyText =
                data?.output ||
                data?.message ||
                data?.text ||
                data?.response ||
                data?.reply ||
                (typeof data === 'string' ? data : null) ||
                "Sorry, I couldn't parse the response. Please check your n8n workflow output.";

            // If the value is an object (e.g. nested), stringify it as a fallback
            if (typeof replyText === 'object') {
                replyText = JSON.stringify(replyText);
            }

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: replyText,
                sender: 'bot'
            }]);
        } catch (error) {
            console.error("n8n webhook error:", error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: `⚠️ Failed to reach the automation server. ${error.message}`,
                sender: 'bot',
                isError: true
            }]);
        } finally {
            setIsTyping(false);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
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
                            👋 Hey! Want to simplify your business or personal tasks with automation? Chat with us!
                        </p>
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
                    backgroundColor: '#0071e3',
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
                                    backgroundColor: msg.isError
                                        ? '#fff3f3'
                                        : msg.sender === 'user'
                                            ? '#0071e3'
                                            : 'white',
                                    color: msg.isError
                                        ? '#cc0000'
                                        : msg.sender === 'user'
                                            ? 'white'
                                            : '#1d1d1f',
                                    boxShadow: msg.sender === 'bot' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.5',
                                    border: msg.isError ? '1px solid #ffcccc' : 'none'
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
                            <div style={{ alignSelf: 'flex-start', marginLeft: '0' }}>
                                <div style={{
                                    padding: '12px 16px',
                                    borderRadius: '20px 20px 20px 4px',
                                    backgroundColor: 'white',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                    display: 'flex',
                                    gap: '4px',
                                    alignItems: 'center'
                                }}>
                                    <span className="dot-animate" style={{ width: '6px', height: '6px', background: '#86868b', borderRadius: '50%', display: 'inline-block', animationDelay: '0s' }}></span>
                                    <span className="dot-animate" style={{ width: '6px', height: '6px', background: '#86868b', borderRadius: '50%', display: 'inline-block', animationDelay: '0.2s' }}></span>
                                    <span className="dot-animate" style={{ width: '6px', height: '6px', background: '#86868b', borderRadius: '50%', display: 'inline-block', animationDelay: '0.4s' }}></span>
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
                            ref={inputRef}
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type a message..."
                            disabled={isTyping}
                            style={{
                                flex: 1,
                                padding: '12px 16px',
                                borderRadius: '24px',
                                border: '1px solid #e5e5e5',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                backgroundColor: isTyping ? '#f9f9f9' : 'white'
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
                                backgroundColor: inputText.trim() && !isTyping ? '#0071e3' : '#f5f5f7',
                                color: inputText.trim() && !isTyping ? 'white' : '#86868b',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: inputText.trim() && !isTyping ? 'pointer' : 'default',
                                transition: 'all 0.2s'
                            }}
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            )}

            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
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