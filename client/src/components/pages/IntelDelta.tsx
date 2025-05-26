import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, BarChart3, Activity, Zap, Target } from 'lucide-react';

const IntelDelta: React.FC = () => {
  const deltaMetrics = [
    { metric: 'Call Volume', current: '2,847', previous: '2,634', delta: '+8.1%', trend: 'up' },
    { metric: 'Resolution Rate', current: '87.3%', previous: '84.1%', delta: '+3.2%', trend: 'up' },
    { metric: 'Avg Handle Time', current: '4m 32s', previous: '4m 18s', delta: '+5.4%', trend: 'down' },
    { metric: 'Customer Satisfaction', current: '4.6/5', previous: '4.4/5', delta: '+4.5%', trend: 'up' },
  ];

  const weeklyComparison = [
    { week: 'Week 1', calls: 1890, satisfaction: 4.2, resolution: 82 },
    { week: 'Week 2', calls: 2134, satisfaction: 4.4, resolution: 85 },
    { week: 'Week 3', calls: 2456, satisfaction: 4.6, resolution: 87 },
    { week: 'Week 4', calls: 2847, satisfaction: 4.6, resolution: 89 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Intel Delta Analytics</h1>
        <div className="text-sm text-muted-foreground">Performance delta analysis</div>
      </div>

      {/* Delta Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {deltaMetrics.map((metric, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">{metric.metric}</h3>
              {metric.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </div>
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">{metric.current}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Previous: {metric.previous}</span>
                <span className={`text-xs font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.delta}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Weekly Trend Analysis */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          4-Week Performance Delta
        </h2>
        <div className="space-y-4">
          {weeklyComparison.map((week, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground">{week.week}</h3>
                <span className="text-sm text-muted-foreground">{week.calls} calls</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Satisfaction</p>
                  <p className="font-medium text-foreground">{week.satisfaction}/5</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Resolution</p>
                  <p className="font-medium text-foreground">{week.resolution}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Delta vs Prev</p>
                  <p className={`font-medium ${index > 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {index > 0 ? `+${((week.calls - weeklyComparison[index-1].calls) / weeklyComparison[index-1].calls * 100).toFixed(1)}%` : 'Baseline'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Delta Insights */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <Activity className="h-5 w-5 mr-2" />
          Delta Analysis Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">Positive Trends</h3>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• Call volume increased 8.1% - growing customer base</li>
              <li>• Resolution rate improved 3.2% - better agent training</li>
              <li>• Customer satisfaction up 4.5% - service quality gains</li>
            </ul>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
            <h3 className="font-medium text-orange-900 dark:text-orange-100 mb-2">Areas for Improvement</h3>
            <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
              <li>• Handle time increased 5.4% - needs optimization</li>
              <li>• Peak hour congestion affecting response times</li>
              <li>• Consider additional agent training for efficiency</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Predictive Delta */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <Target className="h-5 w-5 mr-2" />
          Predicted Next Week Delta
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-blue-900 dark:text-blue-100">+12%</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">Expected Call Volume</p>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-green-900 dark:text-green-100">+2%</p>
            <p className="text-sm text-green-700 dark:text-green-300">Resolution Rate</p>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <Activity className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-purple-900 dark:text-purple-100">-3%</p>
            <p className="text-sm text-purple-700 dark:text-purple-300">Handle Time</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default IntelDelta;