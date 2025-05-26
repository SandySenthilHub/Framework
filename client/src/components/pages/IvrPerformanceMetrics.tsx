import React from 'react';
import { Card } from '@/components/ui/card';
import { Gauge, Zap, Shield, Activity, CheckCircle, AlertTriangle } from 'lucide-react';

const IvrPerformanceMetrics: React.FC = () => {
  const systemMetrics = [
    { label: 'System Uptime', value: '99.8%', status: 'excellent', icon: CheckCircle },
    { label: 'Response Time', value: '1.2s', status: 'good', icon: Zap },
    { label: 'Concurrent Calls', value: '247', status: 'normal', icon: Activity },
    { label: 'Error Rate', value: '0.3%', status: 'excellent', icon: Shield },
  ];

  const performanceData = [
    { time: '08:00', calls: 45, responseTime: '1.1s', errors: 0 },
    { time: '10:00', calls: 89, responseTime: '1.3s', errors: 1 },
    { time: '12:00', calls: 156, responseTime: '1.8s', errors: 2 },
    { time: '14:00', calls: 203, responseTime: '2.1s', errors: 1 },
    { time: '16:00', calls: 187, responseTime: '1.6s', errors: 0 },
    { time: '18:00', calls: 134, responseTime: '1.4s', errors: 1 },
  ];

  const serverHealth = [
    { server: 'IVR-Primary-01', cpu: '34%', memory: '67%', status: 'healthy' },
    { server: 'IVR-Primary-02', cpu: '41%', memory: '72%', status: 'healthy' },
    { server: 'IVR-Backup-01', cpu: '12%', memory: '34%', status: 'standby' },
    { server: 'IVR-Database', cpu: '28%', memory: '58%', status: 'healthy' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'normal': return 'text-yellow-600';
      case 'warning': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getServerStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'standby': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'warning': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">IVR Performance Metrics</h1>
        <div className="text-sm text-muted-foreground">Real-time system monitoring</div>
      </div>

      {/* System Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {systemMetrics.map((metric, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <metric.icon className={`h-6 w-6 ${getStatusColor(metric.status)}`} />
              <span className={`text-xs px-2 py-1 rounded-full ${
                metric.status === 'excellent' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                metric.status === 'good' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' :
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
              }`}>
                {metric.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="text-xl font-bold text-foreground">{metric.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Hourly Performance Trends */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Hourly Performance Trends</h2>
        <div className="space-y-3">
          {performanceData.map((hour, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-16 text-sm font-medium text-foreground">{hour.time}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Calls</p>
                      <p className="font-semibold text-foreground">{hour.calls}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Response</p>
                      <p className="font-semibold text-foreground">{hour.responseTime}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Errors</p>
                      <p className={`font-semibold ${hour.errors === 0 ? 'text-green-600' : 'text-orange-600'}`}>
                        {hour.errors}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-32 bg-muted rounded h-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 rounded h-4"
                  style={{ width: `${Math.min((hour.calls / 250) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Server Health Status */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Server Health Status</h2>
        <div className="space-y-3">
          {serverHealth.map((server, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Gauge className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{server.server}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getServerStatusColor(server.status)}`}>
                    {server.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="text-center">
                  <p className="text-muted-foreground">CPU Usage</p>
                  <p className={`font-semibold ${parseInt(server.cpu) > 80 ? 'text-red-600' : 'text-foreground'}`}>
                    {server.cpu}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Memory</p>
                  <p className={`font-semibold ${parseInt(server.memory) > 85 ? 'text-red-600' : 'text-foreground'}`}>
                    {server.memory}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Alerts */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Performance Alerts</h2>
        <div className="space-y-3">
          <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-green-900 dark:text-green-100">System Running Optimally</h3>
                <p className="text-sm text-green-700 dark:text-green-300">All performance metrics within normal ranges</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-900 dark:text-blue-100">Peak Load Detected</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">Response time increased during 2-4 PM peak hours</p>
              </div>
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default IvrPerformanceMetrics;