import dynamic from 'next/dynamic';

// Dynamically import the React Router app disabling SSR to prevent server-side DOM mismatches
const App = dynamic(() => import('../../src/App'), { ssr: false });

export default function PortalPage() {
  return <App />;
}
