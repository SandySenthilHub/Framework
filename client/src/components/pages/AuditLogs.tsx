import React from 'react';
import { Card } from '@/components/ui/card';
import { FileText, User, Shield, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const AuditLogs: React.FC = () => {
  const auditEvents = [
    {
      timestamp: '2024-05-24 14:35:22',
      user: 'Sarah Johnson',
      action: 'User Login',
      resource: 'System Access',
      status: 'success',
      ip: '192.168.1.45',
      details: 'Successful authentication via MFA'
    },
    {
      timestamp: '2024-05-24 14:32:18',
      user: 'Mike Chen',
      action: 'Role Assignment',
      resource: 'User Management',
      status: 'success',
      ip: '192.168.1.67',
      details: 'Assigned Senior Agent role to Emily Davis'
    },
    {
      timestamp: '2024-05-24 14:28:45',
      user: 'System',
      action: 'Data Backup',
      resource: 'Database',
      status: 'success',
      ip: 'localhost',
      details: 'Automated daily backup completed successfully'
    },
    {
      timestamp: '2024-05-24 14:25:12',
      user: 'James Wilson',
      action: 'Permission Change',
      resource: 'Access Control',
      status: 'warning',
      ip: '192.168.1.89',
      details: 'Attempted to access restricted quality reports'
    },
    {
      timestamp: '2024-05-24 14:20:33',
      user: 'Lisa Rodriguez',
      action: 'Configuration Update',
      resource: 'System Settings',
      status: 'success',
      ip: '192.168.1.23',
      details: 'Updated IVR menu timeout settings'
    },
    {
      timestamp: '2024-05-24 14:15:07',
      user: 'Admin System',
      action: 'Security Scan',
      resource: 'Security',
      status: 'success',
      ip: 'localhost',
      details: 'Automated security vulnerability scan completed'
    },
    {
      timestamp: '2024-05-24 14:10:44',
      user: 'Emily Davis',
      action: 'Data Export',
      resource: 'Customer Data',
      status: 'success',
      ip: '192.168.1.56',
      details: 'Exported customer satisfaction reports'
    },
    {
      timestamp: '2024-05-24 14:05:21',
      user: 'Unknown',
      action: 'Failed Login',
      resource: 'System Access',
      status: 'failed',
      ip: '203.45.67.89',
      details: 'Multiple failed login attempts detected'
    }
  ];

  const auditStats = [
    { label: 'Total Events', value: '1,247', icon: FileText },
    { label: 'Security Events', value: '23', icon: Shield },
    { label: 'User Actions', value: '892', icon: User },
    { label: 'System Events', value: '332', icon: CheckCircle },
  ];

  const eventCategories = [
    { category: 'Authentication', count: 156, trend: '+12%' },
    { category: 'Authorization', count: 89, trend: '+5%' },
    { category: 'Data Access', count: 234, trend: '+18%' },
    { category: 'Configuration', count: 45, trend: '-3%' },
    { category: 'System Operations', count: 178, trend: '+8%' },
  ];

  const complianceMetrics = [
    { metric: 'Data Retention', status: 'compliant', value: '90 days', requirement: 'SOX Compliance' },
    { metric: 'Access Logging', status: 'compliant', value: '100%', requirement: 'PCI DSS' },
    { metric: 'Encryption Status', status: 'compliant', value: 'AES-256', requirement: 'GDPR' },
    { metric: 'Audit Trail', status: 'compliant', value: 'Complete', requirement: 'SOX/PCI' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-orange-600';
      case 'failed': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'failed': return AlertTriangle;
      default: return FileText;
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'warning': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      case 'non-compliant': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Audit Logs</h1>
        <div className="text-sm text-muted-foreground">System activity tracking & compliance</div>
      </div>

      {/* Audit Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {auditStats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Audit Events */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Recent Audit Events</h2>
        <div className="space-y-3">
          {auditEvents.map((event, index) => {
            const StatusIcon = getStatusIcon(event.status);
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <StatusIcon className={`h-6 w-6 ${getStatusColor(event.status)}`} />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-foreground">{event.action}</h3>
                      <span className="text-sm text-muted-foreground">by {event.user}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.details}</p>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <p className="font-medium text-foreground">{event.timestamp}</p>
                  <p className="text-muted-foreground">{event.ip}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Event Categories */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Event Categories (Last 30 Days)</h2>
        <div className="space-y-3">
          {eventCategories.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-foreground">{category.category}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} events</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${category.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {category.trend}
                </p>
                <p className="text-sm text-muted-foreground">vs last month</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Compliance Dashboard */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Compliance Dashboard</h2>
        <div className="space-y-3">
          {complianceMetrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Shield className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-medium text-foreground">{metric.metric}</h3>
                  <p className="text-sm text-muted-foreground">{metric.requirement}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-semibold text-foreground">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">Current Status</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getComplianceColor(metric.status)}`}>
                  {metric.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Security Summary */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Security & Compliance Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-900 dark:text-green-100">Compliance Status</h3>
            <p className="text-2xl font-bold text-green-800 dark:text-green-200">98.7%</p>
            <p className="text-sm text-green-700 dark:text-green-300">Meeting all regulatory requirements</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <Clock className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Retention Period</h3>
            <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">90 Days</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">Automatic log retention policy</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <Shield className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-purple-900 dark:text-purple-100">Security Events</h3>
            <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">23</p>
            <p className="text-sm text-purple-700 dark:text-purple-300">Monitored and resolved</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AuditLogs;