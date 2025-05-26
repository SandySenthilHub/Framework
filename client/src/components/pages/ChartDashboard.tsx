import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart3, LineChart, PieChart, TrendingUp, Activity, Calendar } from 'lucide-react';

const ChartDashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Chart Analytics Dashboard</h1>
        <div className="text-sm text-muted-foreground">Visual data insights</div>
      </div>

      {/* Chart Types Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-foreground">Call Volume Charts</h3>
              <p className="text-sm text-muted-foreground">Hourly, daily, and weekly call patterns</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <LineChart className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-foreground">Performance Trends</h3>
              <p className="text-sm text-muted-foreground">Agent metrics and KPI trends over time</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <PieChart className="h-8 w-8 text-purple-600" />
            <div>
              <h3 className="font-semibold text-foreground">Distribution Analysis</h3>
              <p className="text-sm text-muted-foreground">Call types, outcomes, and department breakdown</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Call Volume Chart Simulation */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Hourly Call Volume Chart
        </h2>
        <div className="space-y-3">
          {[
            { time: '9:00 AM', calls: 145, height: '45%' },
            { time: '10:00 AM', calls: 189, height: '60%' },
            { time: '11:00 AM', calls: 234, height: '75%' },
            { time: '12:00 PM', calls: 298, height: '95%' },
            { time: '1:00 PM', calls: 276, height: '88%' },
            { time: '2:00 PM', calls: 312, height: '100%' },
            { time: '3:00 PM', calls: 245, height: '78%' },
            { time: '4:00 PM', calls: 198, height: '63%' },
          ].map((data, index) => (
            <div key={index} className="flex items-end space-x-3 group">
              <div className="w-16 text-sm text-muted-foreground">{data.time}</div>
              <div className="flex-1 bg-muted rounded h-12 flex items-end relative">
                <div 
                  className="bg-blue-600 hover:bg-blue-700 rounded transition-all duration-300 cursor-pointer relative z-10"
                  style={{ height: data.height, width: '100%' }}
                  title={`${data.time}: ${data.calls} calls`}
                ></div>
                {/* Hover tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                  {data.calls} calls
                </div>
              </div>
              <div className="w-12 text-sm font-medium text-foreground">{data.calls}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Trend Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Weekly Performance Trends
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-foreground mb-3">Customer Satisfaction Trend</h3>
            <div className="space-y-2">
              {['Mon: 4.5/5', 'Tue: 4.6/5', 'Wed: 4.4/5', 'Thu: 4.7/5', 'Fri: 4.6/5', 'Sat: 4.8/5', 'Sun: 4.5/5'].map((day, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-sm text-muted-foreground">{day.split(':')[0]}</span>
                  <span className="font-medium text-foreground">{day.split(':')[1]}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-3">Average Handle Time Trend</h3>
            <div className="space-y-2">
              {['Mon: 4m 12s', 'Tue: 4m 23s', 'Wed: 4m 45s', 'Thu: 4m 18s', 'Fri: 4m 32s', 'Sat: 3m 56s', 'Sun: 4m 08s'].map((day, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-sm text-muted-foreground">{day.split(':')[0]}</span>
                  <span className="font-medium text-foreground">{day.split(':')[1]} {day.split(':')[2]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Chart Insights */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <Activity className="h-5 w-5 mr-2" />
          Chart Insights & Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Peak Hours Identified</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">Charts show consistent peak at 2 PM daily with 312 average calls</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <h3 className="font-medium text-green-900 dark:text-green-100">Weekend Performance</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Saturday shows highest satisfaction (4.8/5) and lowest handle time</p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
            <h3 className="font-medium text-orange-900 dark:text-orange-100">Trending Upward</h3>
            <p className="text-sm text-orange-700 dark:text-orange-300">Overall satisfaction trending up 8% over the past month</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChartDashboard;