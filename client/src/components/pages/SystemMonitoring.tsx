import React from 'react';
import { Card } from '@/components/ui/card';
import { Server, Cpu, HardDrive, Wifi, AlertTriangle, CheckCircle } from 'lucide-react';

const SystemMonitoring: React.FC = () => {
  const systemHealth = [
    { component: 'Application Server', status: 'healthy', uptime: '99.8%', cpu: '34%', memory: '67%' },
    { component: 'Database Server', status: 'healthy', uptime: '99.9%', cpu: '28%', memory: '58%' },
    { component: 'Load Balancer', status: 'healthy', uptime: '100%', cpu: '12%', memory: '23%' },
    { component: 'Redis Cache', status: 'warning', uptime: '98.5%', cpu: '45%', memory: '78%' },
  ];

  const networkMetrics = [
    { metric: 'Bandwidth Usage', value: '2.4 GB/hr', threshold: '5 GB/hr', status: 'normal' },
    { metric: 'Active Connections', value: '847', threshold: '1000', status: 'normal' },
    { metric: 'Response Time', value: '145ms', threshold: '500ms', status: 'good' },
    { metric: 'Packet Loss', value: '0.02%', threshold: '1%', status: 'excellent' },
  ];

  const alerts = [
    { type: 'warning', message: 'Redis memory usage approaching 80%', time: '5 minutes ago' },
    { type: 'info', message: 'Scheduled maintenance completed successfully', time: '2 hours ago' },
    { type: 'resolved', message: 'Database connection pool optimized', time: '4 hours ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-blue-600';
    }
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
        <h1 className="text-2xl font-bold text-foreground">System Monitoring</h1>
        <div className="text-sm text-muted-foreground">Real-time infrastructure monitoring</div>
      </div>

      {/* System Health Overview */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">System Health Status</h2>
        <div className="space-y-4">
          {systemHealth.map((system, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Server className={`h-8 w-8 ${getStatusColor(system.status)}`} />
                <div>
                  <h3 className="font-medium text-foreground">{system.component}</h3>
                  <p className="text-sm text-muted-foreground">Uptime: {system.uptime}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-muted-foreground">Status</p>
                  <p className={`font-semibold ${getStatusColor(system.status)}`}>{system.status}</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">CPU</p>
                  <p className="font-semibold text-foreground">{system.cpu}</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Memory</p>
                  <p className="font-semibold text-foreground">{system.memory}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Network Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {networkMetrics.map((metric, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Wifi className={`h-6 w-6 ${getStatusColor(metric.status)}`} />
              <span className={`text-xs px-2 py-1 rounded-full ${
                metric.status === 'excellent' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                metric.status === 'good' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' :
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
              }`}>
                {metric.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{metric.metric}</p>
              <p className="text-xl font-bold text-foreground">{metric.value}</p>
              <p className="text-xs text-muted-foreground">Threshold: {metric.threshold}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Resource Usage */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Resource Usage Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <Cpu className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900 dark:text-blue-100">CPU Average</h3>
            <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">32%</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">Across all servers</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <HardDrive className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-900 dark:text-green-100">Memory Usage</h3>
            <p className="text-2xl font-bold text-green-800 dark:text-green-200">58%</p>
            <p className="text-sm text-green-700 dark:text-green-300">Within normal range</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <Server className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-purple-900 dark:text-purple-100">Disk Space</h3>
            <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">67%</p>
            <p className="text-sm text-purple-700 dark:text-purple-300">Storage utilization</p>
          </div>
        </div>
      </Card>

      {/* System Alerts */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Recent Alerts</h2>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div key={index} className={`p-3 border rounded-lg ${getAlertColor(alert.type)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-orange-600" />}
                  {alert.type === 'resolved' && <CheckCircle className="h-5 w-5 text-green-600" />}
                  {alert.type === 'info' && <Server className="h-5 w-5 text-blue-600" />}
                  <div>
                    <p className="font-medium text-foreground">{alert.message}</p>
                    <p className="text-sm text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SystemMonitoring;