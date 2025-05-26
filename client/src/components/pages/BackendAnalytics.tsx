import React from 'react';
import { Card } from '@/components/ui/card';
import { Database, Server, Cpu, HardDrive, Network, AlertTriangle } from 'lucide-react';

const BackendAnalytics: React.FC = () => {
  const systemMetrics = [
    { label: 'Database Response', value: '23ms', icon: Database, color: 'text-green-600' },
    { label: 'Server Load', value: '34%', icon: Server, color: 'text-blue-600' },
    { label: 'CPU Usage', value: '67%', icon: Cpu, color: 'text-orange-600' },
    { label: 'Storage Used', value: '2.3TB', icon: HardDrive, color: 'text-purple-600' },
  ];

  const apiPerformance = [
    { endpoint: '/api/calls/live', requests: '12,847', avgResponse: '45ms', errorRate: '0.2%' },
    { endpoint: '/api/agents/status', requests: '8,234', avgResponse: '23ms', errorRate: '0.1%' },
    { endpoint: '/api/analytics/kpi', requests: '5,691', avgResponse: '156ms', errorRate: '0.3%' },
    { endpoint: '/api/reports/generate', requests: '1,245', avgResponse: '2.3s', errorRate: '1.2%' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Backend System Analytics</h1>
        <div className="text-sm text-muted-foreground">System performance monitoring</div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              </div>
              <metric.icon className={`h-8 w-8 ${metric.color}`} />
            </div>
          </Card>
        ))}
      </div>

      {/* API Performance */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <Network className="h-5 w-5 mr-2" />
          API Performance Analysis
        </h2>
        <div className="space-y-3">
          {apiPerformance.map((api, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Network className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{api.endpoint}</p>
                  <p className="text-sm text-muted-foreground">{api.requests} requests today</p>
                </div>
              </div>
              <div className="flex space-x-6 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-foreground">{api.avgResponse}</p>
                  <p className="text-muted-foreground">Avg Response</p>
                </div>
                <div className="text-center">
                  <p className={`font-semibold ${parseFloat(api.errorRate) > 1 ? 'text-red-600' : 'text-green-600'}`}>
                    {api.errorRate}
                  </p>
                  <p className="text-muted-foreground">Error Rate</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* System Health */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          System Health Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Database Connections</h3>
            <p className="text-2xl font-bold text-green-600">247/250</p>
            <p className="text-sm text-green-600">Healthy connection pool</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Memory Usage</h3>
            <p className="text-2xl font-bold text-orange-600">68%</p>
            <p className="text-sm text-orange-600">Approaching threshold</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Queue Status</h3>
            <p className="text-2xl font-bold text-blue-600">234 jobs</p>
            <p className="text-sm text-blue-600">Processing normally</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BackendAnalytics;