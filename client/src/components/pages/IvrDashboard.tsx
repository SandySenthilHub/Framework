import React from 'react';
import { Card } from '@/components/ui/card';
import { Phone, MessageSquare, Clock, TrendingUp, Users, Settings } from 'lucide-react';

const IvrDashboard: React.FC = () => {
  const ivrMetrics = [
    { label: 'Total IVR Calls', value: '8,945', change: '+14%', icon: Phone },
    { label: 'Self-Service Rate', value: '72%', change: '+8%', icon: MessageSquare },
    { label: 'Avg Call Duration', value: '2m 15s', change: '-12%', icon: Clock },
    { label: 'Menu Completion', value: '85%', change: '+5%', icon: TrendingUp },
  ];

  const menuOptions = [
    { option: '1. Account Balance', usage: '34%', calls: '3,041' },
    { option: '2. Transfer Funds', usage: '28%', calls: '2,504' },
    { option: '3. Bill Payment', usage: '22%', calls: '1,968' },
    { option: '4. Speak to Agent', usage: '16%', calls: '1,432' },
  ];

  const callRouting = [
    { route: 'Account Services', calls: '3,456', avgWait: '15s', resolution: '89%' },
    { route: 'Technical Support', calls: '2,134', avgWait: '45s', resolution: '76%' },
    { route: 'Billing Inquiries', calls: '1,876', avgWait: '23s', resolution: '92%' },
    { route: 'New Customer', calls: '1,479', avgWait: '12s', resolution: '94%' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">IVR Dashboard</h1>
        <div className="text-sm text-muted-foreground">Interactive Voice Response analytics</div>
      </div>

      {/* IVR Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {ivrMetrics.map((metric, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                <p className="text-sm text-green-600">{metric.change}</p>
              </div>
              <metric.icon className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
        ))}
      </div>

      {/* Menu Usage Analysis */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">IVR Menu Usage</h2>
        <div className="space-y-3">
          {menuOptions.map((menu, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{menu.option}</h3>
                  <p className="text-sm text-muted-foreground">{menu.calls} total calls</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-foreground">{menu.usage}</p>
                <p className="text-sm text-muted-foreground">Usage Rate</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Call Routing Performance */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Call Routing Performance</h2>
        <div className="space-y-3">
          {callRouting.map((route, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground">{route.route}</h3>
                <span className="text-sm text-muted-foreground">{route.calls} calls</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Avg Wait Time</p>
                  <p className="font-semibold text-foreground">{route.avgWait}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Resolution Rate</p>
                  <p className="font-semibold text-green-600">{route.resolution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* IVR Performance Insights */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Performance Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <Users className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-900 dark:text-green-100">High Self-Service</h3>
            <p className="text-sm text-green-700 dark:text-green-300">72% of calls resolved without agent</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <Clock className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Faster Navigation</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">Call duration reduced by 12%</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-purple-900 dark:text-purple-100">Menu Optimization</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300">85% menu completion rate achieved</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default IvrDashboard;