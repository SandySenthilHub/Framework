import React from 'react';
import { Card } from '@/components/ui/card';
import { Phone, Clock, TrendingUp, AlertCircle, BarChart3, Volume2 } from 'lucide-react';

const CallAnalytics: React.FC = () => {
  const callMetrics = [
    { label: 'Total Calls Today', value: '2,847', icon: Phone, color: 'text-blue-600' },
    { label: 'Avg Call Duration', value: '5m 23s', icon: Clock, color: 'text-green-600' },
    { label: 'Call Volume Trend', value: '+12%', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Dropped Calls', value: '23', icon: AlertCircle, color: 'text-red-600' },
  ];

  const hourlyData = [
    { hour: '9AM', calls: 145, avgDuration: '4m 12s' },
    { hour: '10AM', calls: 189, avgDuration: '5m 34s' },
    { hour: '11AM', calls: 234, avgDuration: '6m 11s' },
    { hour: '12PM', calls: 298, avgDuration: '4m 56s' },
    { hour: '1PM', calls: 276, avgDuration: '5m 23s' },
    { hour: '2PM', calls: 312, avgDuration: '5m 45s' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Call Analytics</h1>
        <div className="text-sm text-muted-foreground">Real-time call data analysis</div>
      </div>

      {/* Call Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {callMetrics.map((metric, index) => (
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

      {/* Hourly Call Analysis */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Hourly Call Volume Analysis
        </h2>
        <div className="space-y-3">
          {hourlyData.map((data, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">{data.hour}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{data.calls} Calls</p>
                  <p className="text-sm text-muted-foreground">Volume for this hour</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{data.avgDuration}</p>
                <p className="text-sm text-muted-foreground">Avg Duration</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Call Quality Analysis */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <Volume2 className="h-5 w-5 mr-2" />
          Call Quality Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Audio Quality Score</h3>
            <p className="text-2xl font-bold text-green-600">8.7/10</p>
            <p className="text-sm text-green-600">Excellent quality</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Connection Issues</h3>
            <p className="text-2xl font-bold text-orange-600">2.3%</p>
            <p className="text-sm text-orange-600">Within acceptable range</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Echo/Noise Reports</h3>
            <p className="text-2xl font-bold text-blue-600">0.8%</p>
            <p className="text-sm text-blue-600">Very low incidents</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CallAnalytics;