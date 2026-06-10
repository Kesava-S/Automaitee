import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import dynamic from 'next/dynamic';

const ChatWindow = dynamic(() => import('./ChatWindow'), { ssr: false });

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowWelcomePopup(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

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
      {isOpen && <ChatWindow />}

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