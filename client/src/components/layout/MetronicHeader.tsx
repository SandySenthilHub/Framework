import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboard } from '@/contexts/DashboardContext';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Moon, 
  Sun, 
  Menu,
  X
} from 'lucide-react';

interface MetronicHeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const MetronicHeader: React.FC<MetronicHeaderProps> = ({ 
  isDark, 
  toggleTheme, 
  sidebarOpen, 
  setSidebarOpen 
}) => {
  const { currentUser, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Define all menu items for search
  const allMenuItems = [
    // Main Dashboards
    { name: 'Dashboard', path: '/', category: 'Main' },
    { name: 'KPI Dashboard', path: '/kpi-dashboard', category: 'Main' },
    { name: 'Chart Dashboard', path: '/chart-dashboard', category: 'Main' },
    
    // Contact Center
    { name: 'Contact Center', path: '/contact-center', category: 'Contact Center' },
    { name: 'Agents', path: '/contact-center/agents', category: 'Contact Center' },
    { name: 'Calls', path: '/contact-center/calls', category: 'Contact Center' },
    { name: 'Supervisors', path: '/contact-center/supervisors', category: 'Contact Center' },
    { name: 'Analytics', path: '/contact-center/analytics', category: 'Contact Center' },
    { name: 'Quality', path: '/contact-center/quality', category: 'Contact Center' },
    { name: 'Backend', path: '/contact-center/backend', category: 'Contact Center' },
    { name: 'Intelligence', path: '/contact-center/intelligence', category: 'Contact Center' },
    { name: 'Intel Delta', path: '/contact-center/intel-delta', category: 'Contact Center' },
    
    // Quality & Intelligence
    { name: 'Quality Management', path: '/quality-management', category: 'Quality' },
    { name: 'Intelligence Hub', path: '/intelligence-hub', category: 'Intelligence' },
    { name: 'Cognitive Services', path: '/cognitive-services', category: 'Intelligence' },
    { name: 'AI ML Playbook', path: '/ai-playbook', category: 'Intelligence' },
    
    // Mobile Banking
    { name: 'Mobile Banking', path: '/mobile-banking/dashboard', category: 'Mobile Banking' },
    { name: 'Transactions', path: '/mobile-banking/transactions', category: 'Mobile Banking' },
    { name: 'Users', path: '/mobile-banking/users', category: 'Mobile Banking' },
    { name: 'Performance', path: '/mobile-banking/performance', category: 'Mobile Banking' },
    
    // IVR Analytics
    { name: 'IVR Dashboard', path: '/ivr-analytics/dashboard', category: 'IVR Analytics' },
    { name: 'Call Flow', path: '/ivr-analytics/call-flow', category: 'IVR Analytics' },
    { name: 'IVR Performance', path: '/ivr-analytics/performance', category: 'IVR Analytics' },
    { name: 'IVR Optimization', path: '/ivr-analytics/optimization', category: 'IVR Analytics' },
    
    // Administration
    { name: 'User Management', path: '/admin/users', category: 'Administration' },
    { name: 'Teams', path: '/admin/teams', category: 'Administration' },
    { name: 'Roles', path: '/admin/roles', category: 'Administration' },
    { name: 'Tenants', path: '/admin/tenants', category: 'Administration' },
    { name: 'Entity Framework', path: '/admin/entity-framework', category: 'Administration' },
    { name: 'Workflow Management', path: '/admin/workflow', category: 'Administration' },
    { name: 'Companies', path: '/admin/companies', category: 'Administration' },
    { name: 'Transaction Center', path: '/admin/transaction-center', category: 'Administration' },
    
    // System Management
    { name: 'Countries & Regions', path: '/system/countries', category: 'System Management' },
    { name: 'Currency Management', path: '/system/currency', category: 'System Management' },
    { name: 'Languages', path: '/system/languages', category: 'System Management' },
    { name: 'System Health', path: '/system/health', category: 'System Management' },
    { name: 'Audit Logs', path: '/system/audit', category: 'System Management' },
    { name: 'Alert Management', path: '/system/alerts', category: 'System Management' },
    { name: 'Workflow Inbox', path: '/system/inbox', category: 'System Management' },
    { name: 'System Settings', path: '/system/settings', category: 'System Management' },
    
    // Analytics
    { name: 'Transaction Analytics', path: '/transaction-analytics', category: 'Analytics' },
    { name: 'IntelDelta', path: '/inteldelta', category: 'Analytics' },
  ];

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    
    if (value.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    // Filter menu items based on search query
    const filtered = allMenuItems.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.category.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(filtered.slice(0, 8)); // Show max 8 results
    setShowSearchResults(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      // Navigate to first result
      window.location.href = searchResults[0].path;
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };

  const handleResultClick = (path: string) => {
    window.location.href = path;
    setShowSearchResults(false);
    setSearchQuery('');
    setShowMobileSearch(false);
  };

  const handleProfileClick = () => {
    // Close the user menu and navigate to profile page
    setShowUserMenu(false);
    window.location.href = '/profile';
  };

  const handleSettingsClick = () => {
    // Close the user menu and navigate to settings page
    setShowUserMenu(false);
    window.location.href = '/settings';
  };

  const notifications = [
    { id: 1, title: 'New call alert', message: 'High volume detected', time: '2m ago', type: 'warning' },
    { id: 2, title: 'System update', message: 'Maintenance completed', time: '1h ago', type: 'success' },
    { id: 3, title: 'Performance alert', message: 'Response time increased', time: '3h ago', type: 'error' },
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        {/* Left Side - Logo & Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CS</span>
            </div>
            <span className="hidden sm:block font-semibold text-foreground">Cerulean Solutions</span>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex relative">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search menus and pages..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => searchQuery && setShowSearchResults(true)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                className="pl-10 pr-4 py-2 w-64 lg:w-80 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  {searchResults.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleResultClick(item.path)}
                      className="px-4 py-3 hover:bg-accent cursor-pointer border-b border-border last:border-b-0"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                        </div>
                        <Search className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center space-x-2">
          {/* Mobile Search Button */}
          <button 
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-border">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                  <p className="text-sm text-muted-foreground">You have {notifications.length} new notifications</p>
                </div>
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="px-4 py-3 hover:bg-accent cursor-pointer border-b border-border last:border-b-0">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'success' ? 'bg-green-500' :
                          notification.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-border">
                  <button className="text-sm text-primary hover:underline">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-medium">
                  {currentUser?.displayName?.charAt(0) || 'U'}
                </span>
              </div>
              <span className="hidden sm:block text-sm font-medium text-foreground">
                {currentUser?.displayName || 'User'}
              </span>
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">{currentUser?.displayName}</p>
                  <p className="text-xs text-muted-foreground">{currentUser?.username || 'user@example.com'}</p>
                </div>
                <div className="py-1">
                  <button 
                    onClick={handleProfileClick}
                    className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </button>
                  <button 
                    onClick={handleSettingsClick}
                    className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </button>
                  <div className="border-t border-border my-1"></div>
                  <button 
                    onClick={logout}
                    className="w-full flex items-center px-4 py-2 text-sm text-destructive hover:bg-accent"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="bg-card border-b border-border p-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search dashboards, KPIs, analytics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowMobileSearch(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default MetronicHeader;