import React from 'react';
import { Card } from '@/components/ui/card';
import { Zap, Gauge, Wifi, Server, AlertTriangle, CheckCircle } from 'lucide-react';

const AppPerformanceMetrics: React.FC = () => {
  const performanceMetrics = [
    { label: 'App Load Time', value: '2.3s', status: 'good', target: '<3s', icon: Zap },
    { label: 'API Response Time', value: '145ms', status: 'excellent', target: '<200ms', icon: Server },
    { label: 'Network Latency', value: '89ms', status: 'good', target: '<100ms', icon: Wifi },
    { label: 'Crash Rate', value: '0.02%', status: 'excellent', target: '<0.1%', icon: Gauge },
  ];

  const apiEndpoints = [
    { endpoint: '/api/account/balance', avgResponse: '92ms', uptime: '99.9%', calls: '45K' },
    { endpoint: '/api/transfer/send', avgResponse: '234ms', uptime: '99.7%', calls: '23K' },
    { endpoint: '/api/bills/payment', avgResponse: '187ms', uptime: '99.8%', calls: '18K' },
    { endpoint: '/api/auth/login', avgResponse: '156ms', uptime: '99.9%', calls: '32K' },
    { endpoint: '/api/transactions/history', avgResponse: '312ms', uptime: '99.6%', calls: '41K' },
  ];

  const devicePerformance = [
    { device: 'iPhone 14/15', avgLoad: '1.8s', memUsage: '45MB', crashes: '0.01%' },
    { device: 'Samsung Galaxy S23', avgLoad: '2.1s', memUsage: '52MB', crashes: '0.02%' },
    { device: 'iPhone 12/13', avgLoad: '2.4s', memUsage: '48MB', crashes: '0.01%' },
    { device: 'OnePlus 11', avgLoad: '2.3s', memUsage: '49MB', crashes: '0.03%' },
    { device: 'Google Pixel 7', avgLoad: '2.6s', memUsage: '46MB', crashes: '0.02%' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">App Performance Metrics</h1>
        <div className="text-sm text-muted-foreground">Real-time mobile app monitoring</div>
      </div>

      {/* Core Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <metric.icon className={`h-6 w-6 ${getStatusColor(metric.status)}`} />
              <span className={`text-xs px-2 py-1 rounded-full ${
                metric.status === 'excellent' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                metric.status === 'good' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' :
                'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200'
              }`}>
                {metric.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="text-xl font-bold text-foreground">{metric.value}</p>
              <p className="text-xs text-muted-foreground">Target: {metric.target}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* API Performance */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">API Performance Monitoring</h2>
        <div className="space-y-3">
          {apiEndpoints.map((api, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Server className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{api.endpoint}</h3>
                  <p className="text-sm text-muted-foreground">{api.calls} calls today</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-foreground">{api.avgResponse}</p>
                  <p className="text-muted-foreground">Avg Response</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-green-600">{api.uptime}</p>
                  <p className="text-muted-foreground">Uptime</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Device Performance Breakdown */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Device Performance Breakdown</h2>
        <div className="space-y-3">
          {devicePerformance.map((device, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-foreground">{device.device}</h3>
                <div className="flex items-center space-x-2">
                  {parseFloat(device.crashes) < 0.05 ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Load Time</p>
                  <p className="font-semibold text-foreground">{device.avgLoad}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Memory Usage</p>
                  <p className="font-semibold text-foreground">{device.memUsage}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Crash Rate</p>
                  <p className={`font-semibold ${parseFloat(device.crashes) < 0.05 ? 'text-green-600' : 'text-orange-600'}`}>
                    {device.crashes}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Alerts */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Performance Alerts & Optimizations</h2>
        <div className="space-y-3">
          <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-green-900 dark:text-green-100">Excellent Performance</h3>
                <p className="text-sm text-green-700 dark:text-green-300">All core metrics within target ranges</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-900 dark:text-blue-100">Optimization Opportunity</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">Transaction history API could be 10% faster with caching</p>
              </div>
              <Gauge className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AppPerformanceMetrics;