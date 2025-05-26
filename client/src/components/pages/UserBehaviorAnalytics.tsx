import React from 'react';
import { Card } from '@/components/ui/card';
import { Smartphone, Users, Activity, Clock, TrendingUp, Eye } from 'lucide-react';

const UserBehaviorAnalytics: React.FC = () => {
  const behaviorMetrics = [
    { label: 'Daily Active Users', value: '24,847', change: '+12%', icon: Users },
    { label: 'Session Duration', value: '8m 34s', change: '+15%', icon: Clock },
    { label: 'Screen Views/Session', value: '4.2', change: '+8%', icon: Eye },
    { label: 'Feature Adoption', value: '67%', change: '+23%', icon: Activity },
  ];

  const topFeatures = [
    { feature: 'Balance Check', usage: '89%', sessions: '21,456' },
    { feature: 'Money Transfer', usage: '76%', sessions: '18,234' },
    { feature: 'Bill Payment', usage: '64%', sessions: '15,432' },
    { feature: 'Investment Tracker', usage: '45%', sessions: '10,876' },
    { feature: 'Loan Calculator', usage: '32%', sessions: '7,654' },
  ];

  const userJourney = [
    { step: 'App Launch', users: '24,847', dropoff: '0%' },
    { step: 'Login/Auth', users: '23,156', dropoff: '6.8%' },
    { step: 'Dashboard View', users: '22,543', dropoff: '2.6%' },
    { step: 'Feature Selection', users: '19,876', dropoff: '11.8%' },
    { step: 'Transaction Complete', users: '18,234', dropoff: '8.3%' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">User Behavior Analytics</h1>
        <div className="text-sm text-muted-foreground">Mobile app engagement insights</div>
      </div>

      {/* Behavior Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {behaviorMetrics.map((metric, index) => (
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

      {/* Feature Usage Analytics */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Feature Usage Analytics</h2>
        <div className="space-y-4">
          {topFeatures.map((feature, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{feature.feature}</h3>
                  <p className="text-sm text-muted-foreground">{feature.sessions} sessions</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{feature.usage}</p>
                <p className="text-sm text-muted-foreground">Usage Rate</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* User Journey Flow */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">User Journey Flow</h2>
        <div className="space-y-3">
          {userJourney.map((step, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{step.step}</h3>
                  <p className="text-sm text-muted-foreground">{step.users} users</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${step.dropoff === '0%' ? 'text-green-600' : 'text-red-600'}`}>
                  {step.dropoff} dropoff
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Behavioral Insights */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Behavioral Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <TrendingUp className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Peak Usage Hours</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">9-11 AM and 7-9 PM show highest activity</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <Users className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-900 dark:text-green-100">User Retention</h3>
            <p className="text-sm text-green-700 dark:text-green-300">73% return within 7 days of first use</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <Activity className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-purple-900 dark:text-purple-100">Session Patterns</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300">Users prefer quick transactions over browsing</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserBehaviorAnalytics;