import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Target, AlertCircle, CheckCircle, Clock, Users } from 'lucide-react';

const KpiDashboard: React.FC = () => {
  const criticalKpis = [
    { name: 'Service Level', current: '94.2%', target: '95%', status: 'warning', trend: '+2.1%' },
    { name: 'Average Handle Time', current: '4m 32s', target: '4m 00s', status: 'warning', trend: '+5%' },
    { name: 'First Call Resolution', current: '87.3%', target: '85%', status: 'success', trend: '+2.1%' },
    { name: 'Customer Satisfaction', current: '4.6/5', target: '4.5/5', status: 'success', trend: '+0.1' },
    { name: 'Abandon Rate', current: '3.2%', target: '<5%', status: 'success', trend: '-0.8%' },
    { name: 'Occupancy Rate', current: '78%', target: '80%', status: 'warning', trend: '-2%' },
  ];

  const mobileBankingKpis = [
    { name: 'Transaction Success Rate', current: '99.2%', target: '99%', status: 'success', trend: '+0.3%' },
    { name: 'App Response Time', current: '1.2s', target: '<2s', status: 'success', trend: '-0.3s' },
    { name: 'Daily Active Users', current: '45.7K', target: '40K', status: 'success', trend: '+12%' },
    { name: 'Login Success Rate', current: '97.8%', target: '98%', status: 'warning', trend: '-0.5%' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">KPI Performance Dashboard</h1>
        <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</div>
      </div>

      {/* Critical Contact Center KPIs */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <Target className="h-5 w-5 mr-2 text-red-600" />
          Critical Contact Center KPIs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {criticalKpis.map((kpi, index) => (
            <Card key={index} className="p-4 border-l-4 border-l-primary">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground">{kpi.name}</h3>
                {kpi.status === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-foreground">{kpi.current}</span>
                  <span className={`text-sm ${kpi.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.trend}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Target: {kpi.target}</p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${kpi.status === 'success' ? 'bg-green-600' : 'bg-orange-600'}`}
                    style={{ width: `${Math.min(parseFloat(kpi.current) / parseFloat(kpi.target) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Mobile Banking KPIs */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
          Mobile Banking Performance KPIs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mobileBankingKpis.map((kpi, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground">{kpi.name}</h3>
                {kpi.status === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-foreground">{kpi.current}</span>
                  <span className={`text-sm ${kpi.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.trend}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Target: {kpi.target}</p>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* KPI Alerts */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
          KPI Alerts & Recommendations
        </h2>
        <div className="space-y-3">
          <div className="p-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg">
            <h3 className="font-medium text-orange-900 dark:text-orange-100">Service Level Below Target</h3>
            <p className="text-sm text-orange-700 dark:text-orange-300">Current service level is 94.2%, below the 95% target. Consider adding more agents during peak hours.</p>
          </div>
          <div className="p-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg">
            <h3 className="font-medium text-orange-900 dark:text-orange-100">Handle Time Increasing</h3>
            <p className="text-sm text-orange-700 dark:text-orange-300">Average handle time has increased to 4m 32s. Review agent training programs and call complexity.</p>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
            <h3 className="font-medium text-green-900 dark:text-green-100">Excellent First Call Resolution</h3>
            <p className="text-sm text-green-700 dark:text-green-300">FCR rate of 87.3% exceeds target. Great job on agent training and knowledge base updates!</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default KpiDashboard;