import React from 'react';
import { Card } from '@/components/ui/card';
import { Settings, Bell, Shield, Palette, Database, Monitor } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const settingsCategories = [
    {
      title: 'General Settings',
      icon: Settings,
      items: [
        { name: 'Dashboard Refresh Rate', value: '30 seconds', description: 'How often data refreshes automatically' },
        { name: 'Default View', value: 'Contact Center', description: 'Landing page when you sign in' },
        { name: 'Time Zone', value: 'EST (UTC-5)', description: 'Display time zone for all data' },
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { name: 'Real-time Alerts', value: 'Enabled', description: 'Get notified of critical system events' },
        { name: 'Email Reports', value: 'Daily', description: 'Frequency of automated email reports' },
        { name: 'Performance Alerts', value: 'Threshold: 95%', description: 'Alert when metrics exceed thresholds' },
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { name: 'Two-Factor Authentication', value: 'Enabled', description: 'Additional security for your account' },
        { name: 'Session Timeout', value: '8 hours', description: 'Auto logout after inactivity' },
        { name: 'Data Access Level', value: 'Full Access', description: 'Your current permission level' },
      ]
    },
    {
      title: 'Display',
      icon: Palette,
      items: [
        { name: 'Theme', value: 'Auto (System)', description: 'Light, dark, or follow system setting' },
        { name: 'Charts Style', value: 'Modern', description: 'Visual style for all charts and graphs' },
        { name: 'Density', value: 'Comfortable', description: 'Amount of information shown per view' },
      ]
    },
    {
      title: 'Data Sources',
      icon: Database,
      items: [
        { name: 'Contact Center DB', value: 'Connected', description: 'Primary call center database connection' },
        { name: 'Mobile Banking API', value: 'Connected', description: 'Banking transaction data source' },
        { name: 'IVR Analytics', value: 'Connected', description: 'Interactive voice response system data' },
      ]
    },
    {
      title: 'System',
      icon: Monitor,
      items: [
        { name: 'Cache Settings', value: 'Smart Caching', description: 'Optimize performance with intelligent caching' },
        { name: 'Export Format', value: 'Excel + PDF', description: 'Default format for data exports' },
        { name: 'Backup Frequency', value: 'Weekly', description: 'How often your settings are backed up' },
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settingsCategories.map((category, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <category.icon className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">{category.title}</h2>
            </div>
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="ml-4">
                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors">
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Reset Dashboard</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">Return all dashboards to default layout</p>
          </button>
          <button className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-950/50 transition-colors">
            <h3 className="font-medium text-green-900 dark:text-green-100">Export Settings</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Download your current configuration</p>
          </button>
          <button className="p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-950/50 transition-colors">
            <h3 className="font-medium text-orange-900 dark:text-orange-100">System Health</h3>
            <p className="text-sm text-orange-700 dark:text-orange-300">Check all system connections</p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;