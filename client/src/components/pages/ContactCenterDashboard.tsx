import React from 'react';
import { Card } from '@/components/ui/card';
import { Phone, Users, Clock, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';

const ContactCenterDashboard: React.FC = () => {
  const realTimeMetrics = [
    { label: 'Active Calls', value: '47', icon: Phone, color: 'text-blue-600' },
    { label: 'Agents Online', value: '23/30', icon: Users, color: 'text-green-600' },
    { label: 'Queue Wait Time', value: '2m 15s', icon: Clock, color: 'text-orange-600' },
    { label: 'SLA Compliance', value: '94.2%', target: '95%', icon: CheckCircle, color: 'text-green-600' },
  ];

  const kpis = [
    { name: 'Average Handle Time', value: '4m 32s', target: '4m 00s', trend: '+5%' },
    { name: 'First Call Resolution', value: '87.3%', target: '85%', trend: '+2.1%' },
    { name: 'Customer Satisfaction', value: '4.6/5', target: '4.5/5', trend: '+0.1' },
    { name: 'Abandon Rate', value: '3.2%', target: '<5%', trend: '-0.8%' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Contact Center Dashboard</h1>
        <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {realTimeMetrics.map((metric, index) => (
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

      {/* KPI Performance */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">{kpi.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-foreground">{kpi.value}</span>
                <span className={`text-sm ${kpi.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.trend}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Target: {kpi.target}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Agent Performance */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Top Performing Agents</h2>
        <div className="space-y-3">
          {[
            { name: 'Sarah Johnson', calls: 47, avgTime: '3m 45s', satisfaction: '4.8/5' },
            { name: 'Mike Chen', calls: 42, avgTime: '4m 12s', satisfaction: '4.7/5' },
            { name: 'Emily Davis', calls: 39, avgTime: '3m 58s', satisfaction: '4.6/5' },
          ].map((agent, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-sm">{agent.name.charAt(0)}</span>
                </div>
                <span className="font-medium text-foreground">{agent.name}</span>
              </div>
              <div className="flex space-x-6 text-sm text-muted-foreground">
                <span>{agent.calls} calls</span>
                <span>{agent.avgTime} avg</span>
                <span>{agent.satisfaction} rating</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ContactCenterDashboard;