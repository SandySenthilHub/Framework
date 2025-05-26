import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import {
  BarChart3,
  Phone,
  Smartphone,
  Network,
  Brain,
  Settings,
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  LineChart,
  Cpu,
  Users,
  Building2,
  Shield,
  Globe,
  CreditCard,
  Activity,
  FileText,
  UserCheck,
  MapPin,
  Languages,
  AlertTriangle,
  Database,
  Workflow,
  UserPlus,
  Building,
  Briefcase,
  Target,
  TrendingUp,
  Crown,
  Server,
  X,
  GitBranch,
  Inbox,
  DollarSign,
  Heart,
  Key,
  Package,
  Mic,
  Layers,
  Settings2
} from 'lucide-react';

interface MetronicSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MetronicSidebar: React.FC<MetronicSidebarProps> = ({ isOpen, onClose }) => {
  const [location] = useLocation();
  const { currentTenant, tenants, setCurrentTenant } = useAuth();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    dashboard: true,
    contactCenter: false,
    mobileBanking: false,
    ivrAnalytics: false,
    admin: false,
    system: false
  });

  const isActive = (path: string) => location === path;

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuSections = [
    {
      id: 'analytics',
      title: 'Analytics',
      icon: TrendingUp,
      items: [
        { path: '/', label: 'Dashboard Overview', icon: BarChart3 },
        { path: '/kpi-dashboard', label: 'KPI Dashboard', icon: LayoutGrid },
        { path: '/chart-dashboard', label: 'Chart Dashboard', icon: LineChart },
        { path: '/cognitive-services', label: 'Cognitive Services', icon: Brain },
        { path: '/ai-playbook', label: 'AI/ML Playbook', icon: Cpu },
      ]
    },
    {
      id: 'contactCenter',
      title: 'Contact Center',
      icon: Phone,
      items: [
        { path: '/contact-center/dashboard', label: 'Dashboard', icon: BarChart3 },
        { path: '/contact-center/analytics', label: 'Call Analytics', icon: Phone },
        { path: '/contact-center/agents', label: 'Agent Performance', icon: Users },
        { path: '/contact-center/quality', label: 'Quality Management', icon: Shield },
        { path: '/contact-center/backend', label: 'Back End', icon: Database },
        { path: '/contact-center/intelligence', label: 'Intelligence', icon: Brain },
        { path: '/contact-center/intel-delta', label: 'Intel Delta', icon: Server },
      ]
    },
    {
      id: 'mobileBanking',
      title: 'Mobile Banking',
      icon: Smartphone,
      items: [
        { path: '/mobile-banking/dashboard', label: 'Mobile Dashboard', icon: BarChart3 },
        { path: '/mobile-banking/transactions', label: 'Transaction Analytics', icon: CreditCard },
        { path: '/mobile-banking/users', label: 'User Behavior', icon: Users },
        { path: '/mobile-banking/performance', label: 'App Performance', icon: TrendingUp },
      ]
    },
    {
      id: 'ivrAnalytics',
      title: 'IVR Analytics',
      icon: Network,
      items: [
        { path: '/ivr-analytics/dashboard', label: 'IVR Dashboard', icon: BarChart3 },
        { path: '/ivr-analytics/call-flow', label: 'Call Flow Analytics', icon: Workflow },
        { path: '/ivr-analytics/performance', label: 'Performance Metrics', icon: Activity },
        { path: '/ivr-analytics/optimization', label: 'Optimization', icon: Target },
      ]
    },
    {
      id: 'admin',
      title: 'Administration',
      icon: Crown,
      items: [
        { path: '/admin/users', label: 'User Management', icon: Users },
        { path: '/admin/teams', label: 'Teams', icon: UserPlus },
        { path: '/admin/roles', label: 'Roles & Permissions', icon: Shield },
        { path: '/admin/tenants', label: 'Tenant Management', icon: Building2 },
        { path: '/admin/entity-framework', label: 'Entity Framework', icon: Database },
        { path: '/admin/workflow', label: 'Workflow Management', icon: GitBranch },
        { path: '/admin/companies', label: 'Companies', icon: Building },
        { path: '/admin/transaction-center', label: 'Transaction Center', icon: CreditCard },
      ]
    },
    {
      id: 'system',
      title: 'System Management',
      icon: Settings,
      items: [
        { path: '/system/countries', label: 'Countries & Regions', icon: Globe },
        { path: '/system/currency', label: 'Currency Management', icon: DollarSign },
        { path: '/system/languages', label: 'Languages', icon: Languages },
        { path: '/system/health', label: 'System Health', icon: Heart },
        { path: '/system/audit', label: 'Audit Logs', icon: FileText },
        { path: '/system/alerts', label: 'Alert Management', icon: AlertTriangle },
        { path: '/system/inbox', label: 'Workflow Inbox', icon: Inbox },
        { path: '/system/settings', label: 'System Settings', icon: Settings },
      ]
    },
    {
      id: 'framework',
      title: 'Framework',
      icon: Package,
      items: [
        { path: '/framework/dashboard', label: 'Framework Dashboard', icon: BarChart3 },
        { path: '/framework/geographic', label: 'Geographic Management', icon: Globe },
        { path: '/framework/organizational', label: 'Organizational Structure', icon: Building2 },
        { path: '/framework/users', label: 'User Management', icon: Users },
        { path: '/framework/localization', label: 'Localization', icon: Languages },
        { path: '/framework/voice-auth', label: 'Voice Authentication', icon: Mic },
        { path: '/framework/system-assets', label: 'System Assets', icon: Layers },
        { path: '/framework/software-metering', label: 'Software Metering', icon: Settings2 },
        { path: '/framework/workflow-audit', label: 'Workflow & Audit', icon: Workflow },
      ]
    }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">CS</span>
          </div>
          <span className="font-bold text-lg text-foreground">Cerulean Solutions</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {menuSections.map((section) => (
          <div key={section.id} className="space-y-1">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg group transition-all"
            >
              <div className="flex items-center space-x-3">
                <section.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{section.title}</span>
              </div>
              {expandedSections[section.id] ? (
                <ChevronDown className="w-4 h-4 transition-transform" />
              ) : (
                <ChevronRight className="w-4 h-4 transition-transform" />
              )}
            </button>

            {/* Section Items */}
            {expandedSections[section.id] && (
              <div className="space-y-1 ml-6">
                {section.items.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <a 
                      className={`flex items-center space-x-3 p-3 rounded-lg text-sm transition-all ${
                        isActive(item.path) 
                          ? 'bg-primary text-primary-foreground shadow-sm' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                      onClick={() => {
                        if (window.innerWidth < 1024) {
                          onClose();
                        }
                      }}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Tenant Selector */}
      <div className="p-4 border-t border-border">
        <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
          Current Tenant
        </div>
        <select 
          className="w-full p-3 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          value={currentTenant?.id || ''}
          onChange={(e) => {
            const tenant = tenants.find(t => t.id === Number(e.target.value));
            if (tenant) setCurrentTenant(tenant);
          }}
        >


          {tenants.map(tenant => (
            <option key={tenant.id} value={tenant.id}>
              {tenant.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );


          // console.log("Tenants:", tenants);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-card border-r border-border h-screen fixed left-0 top-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
          <aside className="relative flex flex-col w-64 bg-card border-r border-border h-full">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
};

export default MetronicSidebar;