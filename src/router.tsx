import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AppPage from './pages/AppPage';
import SupportPage from './pages/SupportPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

const router = createBrowserRouter([
    { path: '/', element: <LandingPage /> },
    { path: '/app', element: <AppPage /> },
    { path: '/support', element: <SupportPage /> },
    { path: '/privacy', element: <PrivacyPage /> },
    { path: '/terms', element: <TermsPage /> },
]);

export default router;
