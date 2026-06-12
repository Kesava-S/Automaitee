import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function RouteGuard({ currentUser, clientData }) {
  const location = useLocation();

  // If not logged in -> redirect to /login
  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const isOnboardingPath = location.pathname === '/onboarding';

  // If logged in but onboarding is incomplete -> force redirect to /onboarding
  if (!clientData.onboardingComplete) {
    if (!isOnboardingPath) {
      return <Navigate to="/onboarding" replace />;
    }
  } else {
    // If onboarding is complete, redirect away from /onboarding to /dashboard
    if (isOnboardingPath) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Otherwise allow access to the protected route children via Outlet
  return <Outlet />;
}
