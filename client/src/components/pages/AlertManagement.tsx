import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Bell, CheckCircle, Clock, Users, Settings } from 'lucide-react';

const AlertManagement: React.FC = () => {
  const activeAlerts = [
    {
      id: 'ALT-001',
      title: 'High Call Volume Detected',
      severity: 'high',
      category: 'Operations',
      description: 'Call volume exceeded threshold of 200 calls/hour',
      timestamp: '2024-05-24 14:35:22',
      status: 'active',
      assignedTo: 'Operations Team'
    },
    {
      id: 'ALT-002',
      title: 'Database Connection Pool Warning',
      severity: 'medium',
      category: 'Infrastructure',
      description: 'Connection pool usage at 85% capacity',
      timestamp: '2024-05-24 14:28:15',
      status: 'investigating',
      assignedTo: 'IT Team'
    },
    {
      id: 'ALT-003',
      title: 'Agent Performance Alert',
      severity: 'low',
      category: 'Quality',
      description: 'Agent satisfaction score below 4.0',
      timestamp: '2024-05-24 14:15:30',
      status: 'acknowledged',
      assignedTo: 'QA Team'
    },
    {
      id: 'ALT-004',
      title: 'Security Login Attempt',
      severity: 'critical',
      category: 'Security',
      description: 'Multiple failed login attempts from external IP',
      timestamp: '2024-05-24 14:10:45',
      status: 'escalated',
      assignedTo: 'Security Team'
    }
  ];

  const alertStats = [
    { label: 'Active Alerts', value: '12', icon: AlertTriangle },
    { label: 'Resolved Today', value: '28', icon: CheckCircle },
    { label: 'Avg Response Time', value: '3.2m', icon: Clock },
    { label: 'Team Assignments', value: '5', icon: Users },
  ];

  const alertRules = [
    { name: 'Call Volume Threshold', condition: '>200 calls/hour', severity: 'high', enabled: true },
    { name: 'Response Time Alert', condition: '>5 seconds avg', severity: 'medium', enabled: true },
    { name: 'Agent Availability', condition: '<80% available', severity: 'medium', enabled: true },
    { name: 'System CPU Usage', condition: '>85% for 5min', severity: 'high', enabled: true },
    { name: 'Failed Login Attempts', condition: '>5 attempts/min', severity: 'critical', enabled: true },
    { name: 'Customer Satisfaction', condition: '<4.0 rating', severity: 'low', enabled: false },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      case 'investigating': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      case 'acknowledged': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'escalated': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Alert Management</h1>
        <div className="text-sm text-muted-foreground">System alerts & notifications</div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {alertStats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-orange-600" />
            </div>
          </Card>
        ))}
      </div>

      {/* Active Alerts */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Active Alerts</h2>
        <div className="space-y-4">
          {activeAlerts.map((alert, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                  <div>
                    <h3 className="font-medium text-foreground">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground">{alert.id} • {alert.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(alert.status)}`}>
                    {alert.status}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Assigned to: {alert.assignedTo}</span>
                <span className="text-muted-foreground">{alert.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Alert Rules Configuration */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Alert Rules</h2>
        <div className="space-y-3">
          {alertRules.map((rule, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Settings className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-foreground">{rule.name}</h3>
                  <p className="text-sm text-muted-foreground">Condition: {rule.condition}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(rule.severity)}`}>
                  {rule.severity}
                </span>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    rule.enabled 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200'
                  }`}>
                    {rule.enabled ? 'enabled' : 'disabled'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Notification Channels */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Notification Channels</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <Bell className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Email Alerts</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">Real-time email notifications to team leads</p>
            <p className="text-xs text-blue-600 mt-1">Active: 12 recipients</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <Users className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-900 dark:text-green-100">Slack Integration</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Instant alerts to operations channel</p>
            <p className="text-xs text-green-600 mt-1">Connected: #ops-alerts</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <AlertTriangle className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-purple-900 dark:text-purple-100">SMS Escalation</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300">Critical alerts sent via SMS</p>
            <p className="text-xs text-purple-600 mt-1">Emergency contacts: 5</p>
          </div>
        </div>
      </Card>

      {/* Alert Analytics */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Alert Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-foreground mb-3">Alert Volume by Severity</h3>
            <div className="space-y-2">
              {[
                { severity: 'Critical', count: 3, color: 'bg-red-500' },
                { severity: 'High', count: 8, color: 'bg-orange-500' },
                { severity: 'Medium', count: 15, color: 'bg-yellow-500' },
                { severity: 'Low', count: 12, color: 'bg-blue-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm text-foreground">{item.severity}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-3">Response Time Metrics</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Average Response:</span>
                <span className="text-foreground font-medium">3.2 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Critical Response:</span>
                <span className="text-foreground font-medium">45 seconds</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Resolution Rate:</span>
                <span className="text-foreground font-medium">94%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">False Positives:</span>
                <span className="text-foreground font-medium">2.1%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AlertManagement;