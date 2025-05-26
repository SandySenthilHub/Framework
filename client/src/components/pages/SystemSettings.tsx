import React from 'react';
import { Card } from '@/components/ui/card';
import { Settings, Server, Database, Shield, Globe, Mail, Bell, Clock } from 'lucide-react';

const SystemSettings: React.FC = () => {
  const systemConfigurations = [
    {
      category: 'General Settings',
      icon: Settings,
      settings: [
        { name: 'System Name', value: 'Cerulean Solutions Platform', type: 'text' },
        { name: 'Default Timezone', value: 'UTC-5 (Eastern)', type: 'select' },
        { name: 'Date Format', value: 'MM/DD/YYYY', type: 'select' },
        { name: 'Session Timeout', value: '30 minutes', type: 'number' }
      ]
    },
    {
      category: 'Security Settings',
      icon: Shield,
      settings: [
        { name: 'Password Policy', value: 'Strong (12+ chars)', type: 'select' },
        { name: 'Two-Factor Auth', value: 'Enabled', type: 'toggle' },
        { name: 'Login Attempts', value: '5 attempts', type: 'number' },
        { name: 'IP Whitelist', value: 'Enabled', type: 'toggle' }
      ]
    },
    {
      category: 'Database Settings',
      icon: Database,
      settings: [
        { name: 'Connection Pool Size', value: '50 connections', type: 'number' },
        { name: 'Query Timeout', value: '30 seconds', type: 'number' },
        { name: 'Backup Frequency', value: 'Daily at 2:00 AM', type: 'schedule' },
        { name: 'Data Retention', value: '7 years', type: 'select' }
      ]
    },
    {
      category: 'Network Settings',
      icon: Globe,
      settings: [
        { name: 'API Rate Limit', value: '1000 req/min', type: 'number' },
        { name: 'CORS Policy', value: 'Restricted', type: 'select' },
        { name: 'SSL Certificate', value: 'Valid until 2025-05-24', type: 'info' },
        { name: 'Load Balancer', value: 'Round Robin', type: 'select' }
      ]
    }
  ];

  const notificationSettings = [
    { type: 'Email Notifications', enabled: true, frequency: 'Immediate', recipients: 12 },
    { type: 'SMS Alerts', enabled: true, frequency: 'Critical Only', recipients: 5 },
    { type: 'Slack Integration', enabled: true, frequency: 'Real-time', recipients: 1 },
    { type: 'Dashboard Alerts', enabled: true, frequency: 'Real-time', recipients: 0 },
  ];

  const maintenanceSchedule = [
    { task: 'Database Backup', schedule: 'Daily 2:00 AM', lastRun: '2024-05-24 02:00', status: 'completed' },
    { task: 'Log Rotation', schedule: 'Weekly Sunday 3:00 AM', lastRun: '2024-05-19 03:00', status: 'completed' },
    { task: 'Cache Cleanup', schedule: 'Daily 1:00 AM', lastRun: '2024-05-24 01:00', status: 'completed' },
    { task: 'Security Scan', schedule: 'Daily 4:00 AM', lastRun: '2024-05-24 04:00', status: 'completed' },
    { task: 'Performance Check', schedule: 'Hourly', lastRun: '2024-05-24 14:00', status: 'completed' },
  ];

  const systemLimits = [
    { parameter: 'Max Concurrent Users', current: 847, limit: 1000, usage: 85 },
    { parameter: 'API Calls per Hour', current: 45678, limit: 60000, usage: 76 },
    { parameter: 'Storage Usage', current: 2.4, limit: 5.0, usage: 48, unit: 'TB' },
    { parameter: 'Memory Usage', current: 34, limit: 64, usage: 53, unit: 'GB' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'running': return 'text-blue-600';
      case 'failed': return 'text-red-600';
      case 'pending': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage >= 90) return 'bg-red-500';
    if (usage >= 75) return 'bg-orange-500';
    if (usage >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">System Settings</h1>
        <div className="text-sm text-muted-foreground">Global system configuration</div>
      </div>

      {/* System Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {systemConfigurations.map((config, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <config.icon className="h-6 w-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-foreground">{config.category}</h2>
            </div>
            <div className="space-y-3">
              {config.settings.map((setting, settingIndex) => (
                <div key={settingIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-foreground">{setting.name}</h3>
                    <p className="text-sm text-muted-foreground">{setting.type}</p>
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {setting.value}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Notification Settings */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Bell className="h-6 w-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-foreground">Notification Settings</h2>
        </div>
        <div className="space-y-3">
          {notificationSettings.map((notification, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium text-foreground">{notification.type}</h3>
                  <p className="text-sm text-muted-foreground">Frequency: {notification.frequency}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  {notification.recipients > 0 && `${notification.recipients} recipients`}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  notification.enabled 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200'
                }`}>
                  {notification.enabled ? 'enabled' : 'disabled'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* System Limits */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Server className="h-6 w-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-foreground">System Limits & Usage</h2>
        </div>
        <div className="space-y-4">
          {systemLimits.map((limit, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground">{limit.parameter}</h3>
                <span className="text-sm text-muted-foreground">
                  {limit.current}{limit.unit || ''} / {limit.limit}{limit.unit || ''}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-muted rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${getUsageColor(limit.usage)}`}
                    style={{ width: `${limit.usage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-foreground">{limit.usage}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Maintenance Schedule */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="h-6 w-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-foreground">Maintenance Schedule</h2>
        </div>
        <div className="space-y-3">
          {maintenanceSchedule.map((task, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <h3 className="font-medium text-foreground">{task.task}</h3>
                <p className="text-sm text-muted-foreground">Schedule: {task.schedule}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Last run: {task.lastRun}</p>
                <span className={`text-sm font-medium ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Environment Information */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Environment Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <Server className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Application Version</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">v2.4.1 (Build 2024.05.24)</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <Database className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-900 dark:text-green-100">Database Version</h3>
            <p className="text-sm text-green-700 dark:text-green-300">PostgreSQL 15.2</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <Globe className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-purple-900 dark:text-purple-100">Environment</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300">Production</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SystemSettings;