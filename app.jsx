import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { ModeProvider } from '@/lib/ModeContext';
import { SubscriptionProvider } from '@/lib/SubscriptionContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import AppLayout from '@/components/layout/AppLayout';
import Dashboard from '@/pages/Dashboard';
import BrandAssets from '@/pages/BrandAssets';
import StyleGuide from '@/pages/StyleGuide';
import Content from '@/pages/Content';
import Analytics from '@/pages/Analytics';
import Checkout from '@/pages/Checkout';
import ViewGuide from '@/pages/ViewGuide';
import NewProject from '@/pages/NewProject';
import PersonalDashboard from '@/pages/personal/PersonalDashboard';
import Aesthetic from '@/pages/personal/Aesthetic';
import Goals from '@/pages/personal/Goals';
import SocialPresence from '@/pages/personal/SocialPresence';
import Journal from '@/pages/personal/Journal';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/brand-assets" element={<BrandAssets />} />
          <Route path="/style-guide" element={<StyleGuide />} />
          <Route path="/content" element={<Content />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/personal" element={<PersonalDashboard />} />
          <Route path="/personal/aesthetic" element={<Aesthetic />} />
          <Route path="/personal/goals" element={<Goals />} />
          <Route path="/personal/social" element={<SocialPresence />} />
          <Route path="/personal/journal" element={<Journal />} />
          <Route path="/guide" element={<ViewGuide />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <SubscriptionProvider>
      <ModeProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <ScrollToTop />
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </ModeProvider>
      </SubscriptionProvider>
    </AuthProvider>
  )
}

export default App
