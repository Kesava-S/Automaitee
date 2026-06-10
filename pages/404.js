import Link from 'next/link'
import Head from 'next/head'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Automaitee</title>
      </Head>
      <div className="error-container">
        <div className="error-card">
          <h1 className="animated-text font-404">404</h1>
          <h2 className="error-subtitle">Page Not Found</h2>
          <p className="error-description">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link href="/" className="cta-button" style={{ textDecoration: 'none' }}>
            Go Back Home
          </Link>
        </div>
      </div>

      <style jsx>{`
        .error-container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rem 2rem;
          min-height: 60vh;
          text-align: center;
        }
        .error-card {
          max-width: 600px;
          animation: fadeInUp 0.6s ease-out;
        }
        .font-404 {
          font-size: 6rem;
          margin-bottom: 1rem;
          font-weight: 800;
          line-height: 1;
        }
        .error-subtitle {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
          color: #1d1d1f;
        }
        .error-description {
          color: #6e6e73;
          font-size: 1.1rem;
          margin: 0 auto 2.5rem;
          max-width: 480px;
          line-height: 1.6;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
