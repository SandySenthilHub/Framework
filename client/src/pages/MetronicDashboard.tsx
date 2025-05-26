import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import MetronicHeader from '@/components/layout/MetronicHeader';
import MetronicSidebar from '@/components/layout/MetronicSidebar';
import MetronicDashboard from '@/pages/MetronicDashboard';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Dashboard from '@/components/dashboard/Dashboard';
import ContactCenterDashboard from '@/components/pages/ContactCenterDashboard';
import MobileBankingDashboard from '@/components/pages/MobileBankingDashboard';
import AgentPerformancePage from '@/components/pages/AgentPerformancePage';
import ProfilePage from '@/components/pages/ProfilePage';
import SettingsPage from '@/components/pages/SettingsPage';
import CallAnalytics from '@/components/pages/CallAnalytics';
import BackendAnalytics from '@/components/pages/BackendAnalytics';
import KpiDashboard from '@/components/pages/KpiDashboard';
import ChartDashboard from '@/components/pages/ChartDashboard';
import CognitiveServices from '@/components/pages/CognitiveServices';
import AiMlPlaybook from '@/components/pages/AiMlPlaybook';
import QualityManagement from '@/components/pages/QualityManagement';
import IntelligenceHub from '@/components/pages/IntelligenceHub';
import IntelDelta from '@/components/pages/IntelDelta';
import TransactionAnalytics from '@/components/pages/TransactionAnalytics';
import UserBehaviorAnalytics from '@/components/pages/UserBehaviorAnalytics';
import AppPerformanceMetrics from '@/components/pages/AppPerformanceMetrics';
import IvrDashboard from '@/components/pages/IvrDashboard';
import CallFlowAnalytics from '@/components/pages/CallFlowAnalytics';
import IvrPerformanceMetrics from '@/components/pages/IvrPerformanceMetrics';
import IvrOptimization from '@/components/pages/IvrOptimization';
import UserManagement from '@/components/pages/UserManagement';
import SystemMonitoring from '@/components/pages/SystemMonitoring';
import RoleManagement from '@/components/pages/RoleManagement';
import TenantManagement from '@/components/pages/TenantManagement';
import PermissionManagement from '@/components/pages/PermissionManagement';
import AuditLogs from '@/components/pages/AuditLogs';
import Teams from '@/components/pages/Teams';
import EntityFramework from '@/components/pages/EntityFramework';
import WorkflowManagement from '@/components/pages/WorkflowManagement';
import Companies from '@/components/pages/Companies';
import TransactionCenter from '@/components/pages/TransactionCenter';
import CountriesRegions from '@/components/pages/CountriesRegions';
import CurrencyManagement from '@/components/pages/CurrencyManagement';
import LanguageManagement from '@/components/pages/LanguageManagement';
import SystemHealth from '@/components/pages/SystemHealth';
import AlertManagement from '@/components/pages/AlertManagement';
import WorkflowInbox from '@/components/pages/WorkflowInbox';
import SystemSettings from '@/components/pages/SystemSettings';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <MetronicHeader 
        isDark={isDark}
        toggleTheme={toggleTheme}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Sidebar */}
      <MetronicSidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 min-h-screen">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/kpi-dashboard">
            {() => <KpiDashboard />}
          </Route>
          <Route path="/chart-dashboard">
            {() => <ChartDashboard />}
          </Route>
          <Route path="/contact-center">
            {() => <ContactCenterDashboard />}
          </Route>
          <Route path="/mobile-banking">
            {() => <MobileBankingDashboard />}
          </Route>
          <Route path="/ivr-analytics">
            {() => <div className="p-6"><h1 className="text-2xl font-bold">IVR Analytics Center</h1><p>Interactive Voice Response system analytics and optimization.</p></div>}
          </Route>
          <Route path="/cognitive-services">
            {() => <CognitiveServices />}
          </Route>
          <Route path="/ai-playbook">
            {() => <AiMlPlaybook />}
          </Route>
          <Route path="/settings">
            {() => <SettingsPage />}
          </Route>
          <Route path="/profile">
            {() => <ProfilePage />}
          </Route>
          
          {/* Contact Center Routes */}
          <Route path="/contact-center/dashboard">
            {() => <ContactCenterDashboard />}
          </Route>
          <Route path="/contact-center/analytics">
            {() => <CallAnalytics />}
          </Route>
          <Route path="/contact-center/agents">
            {() => <AgentPerformancePage />}
          </Route>
          <Route path="/contact-center/quality">
            {() => <QualityManagement />}
          </Route>
          <Route path="/contact-center/backend">
            {() => <BackendAnalytics />}
          </Route>
          <Route path="/contact-center/intelligence">
            {() => <IntelligenceHub />}
          </Route>
          <Route path="/contact-center/intel-delta">
            {() => <IntelDelta />}
          </Route>
          
          {/* Mobile Banking Routes */}
          <Route path="/mobile-banking/dashboard">
            {() => <MobileBankingDashboard />}
          </Route>
          <Route path="/mobile-banking/transactions">
            {() => <TransactionAnalytics />}
          </Route>
          <Route path="/mobile-banking/users">
            {() => <UserBehaviorAnalytics />}
          </Route>
          <Route path="/mobile-banking/performance">
            {() => <AppPerformanceMetrics />}
          </Route>
          
          {/* IVR Analytics Routes */}
          <Route path="/ivr-analytics/dashboard">
            {() => <IvrDashboard />}
          </Route>
          <Route path="/ivr-analytics/call-flow">
            {() => <CallFlowAnalytics />}
          </Route>
          <Route path="/ivr-analytics/performance">
            {() => <IvrPerformanceMetrics />}
          </Route>
          <Route path="/ivr-analytics/optimization">
            {() => <IvrOptimization />}
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin/users">
            {() => <UserManagement />}
          </Route>
          <Route path="/admin/teams">
            {() => <Teams />}
          </Route>
          <Route path="/admin/roles">
            {() => <RoleManagement />}
          </Route>
          <Route path="/admin/tenants">
            {() => <TenantManagement />}
          </Route>
          <Route path="/admin/entity-framework">
            {() => <EntityFramework />}
          </Route>
          <Route path="/admin/workflow">
            {() => <WorkflowManagement />}
          </Route>
          <Route path="/admin/companies">
            {() => <Companies />}
          </Route>
          <Route path="/admin/transaction-center">
            {() => <TransactionCenter />}
          </Route>
          <Route path="/admin/permissions">
            {() => <PermissionManagement />}
          </Route>
          <Route path="/admin/audit">
            {() => <AuditLogs />}
          </Route>
          
          {/* System Management Routes */}
          <Route path="/system/countries">
            {() => <CountriesRegions />}
          </Route>
          <Route path="/system/currency">
            {() => <CurrencyManagement />}
          </Route>
          <Route path="/system/languages">
            {() => <LanguageManagement />}
          </Route>
          <Route path="/system/health">
            {() => <SystemHealth />}
          </Route>
          <Route path="/system/audit">
            {() => <AuditLogs />}
          </Route>
          <Route path="/system/alerts">
            {() => <AlertManagement />}
          </Route>
          <Route path="/system/inbox">
            {() => <WorkflowInbox />}
          </Route>
          <Route path="/system/settings">
            {() => <SystemSettings />}
          </Route>
          
          {/* 404 */}
          <Route component={() => (
            <div className="p-6 text-center">
              <h1 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h1>
              <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
            </div>
          )} />
        </Switch>
      </main>

      <Toaster />
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <DashboardProvider>
            <AppLayout />
          </DashboardProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;