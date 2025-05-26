import React from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Cpu, HardDrive, Wifi, CheckCircle, AlertTriangle, Activity } from 'lucide-react';

const SystemHealth: React.FC = () => {
  const healthMetrics = [
    { component: 'API Gateway', status: 'healthy', uptime: '99.9%', responseTime: '45ms', load: '23%' },
    { component: 'Database Cluster', status: 'healthy', uptime: '99.8%', responseTime: '12ms', load: '34%' },
    { component: 'Authentication Service', status: 'healthy', uptime: '100%', responseTime: '28ms', load: '18%' },
    { component: 'Call Processing Engine', status: 'warning', uptime: '98.7%', responseTime: '156ms', load: '78%' },
    { component: 'Analytics Pipeline', status: 'healthy', uptime: '99.5%', responseTime: '89ms', load: '45%' },
    { component: 'Notification Service', status: 'healthy', uptime: '99.7%', responseTime: '67ms', load: '29%' },
  ];

  const systemStats = [
    { label: 'Overall Health', value: '98.5%', icon: Heart },
    { label: 'Active Services', value: '24/24', icon: Activity },
    { label: 'Avg Response Time', value: '67ms', icon: Wifi },
    { label: 'System Uptime', value: '99.2%', icon: CheckCircle },
  ];

  const resourceUsage = [
    { resource: 'CPU Usage', current: 34, threshold: 80, status: 'normal' },
    { resource: 'Memory Usage', current: 67, threshold: 85, status: 'normal' },
    { resource: 'Disk Usage', current: 45, threshold: 90, status: 'normal' },
    { resource: 'Network I/O', current: 23, threshold: 70, status: 'normal' },
    { resource: 'Database Connections', current: 156, threshold: 200, status: 'normal' },
    { resource: 'Active Sessions', current: 847, threshold: 1000, status: 'normal' },
  ];

  const healthAlerts = [
    {
      type: 'warning',
      message: 'Call Processing Engine showing elevated response times',
      component: 'Processing Engine',
      time: '5 minutes ago',
      severity: 'medium'
    },
    {
      type: 'info',
      message: 'Scheduled maintenance completed successfully',
      component: 'Database Cluster',
      time: '2 hours ago',
      severity: 'low'
    },
    {
      type: 'resolved',
      message: 'Network latency issue resolved',
      component: 'API Gateway',
      time: '4 hours ago',
      severity: 'high'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'critical': return AlertTriangle;
      default: return Activity;
    }
  };

  const getUsageColor = (current: number, threshold: number) => {
    const percentage = (current / threshold) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-orange-50 border-orange-200 dark:bg-orange-950/30 dark:border-orange-800';
      case 'critical': return 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800';
      case 'resolved': return 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800';
      default: return 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">System Health</h1>
        <div className="text-sm text-muted-foreground">Real-time system health monitoring</div>
      </div>

      {/* Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-green-600" />
            </div>
          </Card>
        ))}
      </div>

      {/* Service Health Status */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Service Health Status</h2>
        <div className="space-y-4">
          {healthMetrics.map((service, index) => {
            const StatusIcon = getStatusIcon(service.status);
            return (
              <div key={index} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <StatusIcon className={`h-6 w-6 ${getStatusColor(service.status)}`} />
                    <div>
                      <h3 className="font-medium text-foreground">{service.component}</h3>
                      <p className="text-sm text-muted-foreground">Uptime: {service.uptime}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${getStatusColor(service.status)}`}>
                    {service.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Response Time</p>
                    <p className="font-semibold text-foreground">{service.responseTime}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Load</p>
                    <p className="font-semibold text-foreground">{service.load}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Resource Usage */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Resource Usage</h2>
        <div className="space-y-4">
          {resourceUsage.map((resource, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground">{resource.resource}</h3>
                <span className="text-sm text-muted-foreground">
                  {resource.current}/{resource.threshold}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-muted rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${getUsageColor(resource.current, resource.threshold)}`}
                    style={{ width: `${(resource.current / resource.threshold) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {Math.round((resource.current / resource.threshold) * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Health Alerts */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Health Alerts</h2>
        <div className="space-y-3">
          {healthAlerts.map((alert, index) => (
            <div key={index} className={`p-3 border rounded-lg ${getAlertColor(alert.type)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-orange-600" />}
                  {alert.type === 'resolved' && <CheckCircle className="h-5 w-5 text-green-600" />}
                  {alert.type === 'info' && <Activity className="h-5 w-5 text-blue-600" />}
                  <div>
                    <p className="font-medium text-foreground">{alert.message}</p>
                    <p className="text-sm text-muted-foreground">{alert.component} • {alert.time}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  alert.severity === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' :
                  alert.severity === 'medium' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200' :
                  'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                }`}>
                  {alert.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Metrics */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <Cpu className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-900 dark:text-green-100">CPU Performance</h3>
            <p className="text-2xl font-bold text-green-800 dark:text-green-200">34%</p>
            <p className="text-sm text-green-700 dark:text-green-300">Average utilization</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <HardDrive className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Storage Health</h3>
            <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">67%</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">Disk utilization</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <Wifi className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-purple-900 dark:text-purple-100">Network Health</h3>
            <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">99.8%</p>
            <p className="text-sm text-purple-700 dark:text-purple-300">Network uptime</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SystemHealth;