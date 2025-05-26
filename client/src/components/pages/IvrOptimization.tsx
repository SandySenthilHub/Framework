import React from 'react';
import { Card } from '@/components/ui/card';
import { Target, TrendingUp, Lightbulb, Settings, CheckCircle, ArrowUpRight } from 'lucide-react';

const IvrOptimization: React.FC = () => {
  const optimizationTargets = [
    { metric: 'Call Completion Rate', current: '76%', target: '85%', priority: 'high' },
    { metric: 'Average Handle Time', current: '2m 15s', target: '1m 45s', priority: 'medium' },
    { metric: 'First Call Resolution', current: '72%', target: '80%', priority: 'high' },
    { metric: 'Menu Navigation Time', current: '18s', target: '12s', priority: 'medium' },
  ];

  const recommendations = [
    {
      title: 'Streamline Main Menu',
      description: 'Reduce options from 6 to 4 most-used services',
      impact: '+12% completion rate',
      effort: 'Low',
      timeline: '1 week'
    },
    {
      title: 'Voice Recognition Enhancement',
      description: 'Implement advanced speech-to-text for faster navigation',
      impact: '-30% navigation time',
      effort: 'High',
      timeline: '6 weeks'
    },
    {
      title: 'Smart Call Routing',
      description: 'AI-powered routing based on caller history',
      impact: '+15% first call resolution',
      effort: 'Medium',
      timeline: '4 weeks'
    },
    {
      title: 'Quick Balance Check',
      description: 'Add direct balance inquiry without authentication',
      impact: '+25% self-service rate',
      effort: 'Low',
      timeline: '2 weeks'
    }
  ];

  const abTestResults = [
    { test: 'Menu Order A vs B', winner: 'Version B', improvement: '+8% completion', confidence: '95%' },
    { test: 'Voice Prompt Speed', winner: 'Medium Speed', improvement: '+12% satisfaction', confidence: '87%' },
    { test: 'Authentication Flow', winner: 'PIN First', improvement: '-20% auth time', confidence: '92%' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'medium': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'Low': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'Medium': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'High': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">IVR Optimization</h1>
        <div className="text-sm text-muted-foreground">Menu optimization & efficiency improvements</div>
      </div>

      {/* Optimization Targets */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Performance Targets</h2>
        <div className="space-y-4">
          {optimizationTargets.map((target, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-foreground">{target.metric}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(target.priority)}`}>
                  {target.priority} priority
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Current</p>
                    <p className="font-semibold text-foreground">{target.current}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-blue-600" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Target</p>
                    <p className="font-semibold text-green-600">{target.target}</p>
                  </div>
                </div>
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Optimization Recommendations */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Optimization Recommendations</h2>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">{rec.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                  <p className="text-sm text-green-600 font-medium">Expected Impact: {rec.impact}</p>
                </div>
                <Lightbulb className="h-6 w-6 text-orange-600 ml-4" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getEffortColor(rec.effort)}`}>
                    {rec.effort} Effort
                  </span>
                  <span className="text-muted-foreground">Timeline: {rec.timeline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* A/B Test Results */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">A/B Test Results</h2>
        <div className="space-y-3">
          {abTestResults.map((test, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-medium text-foreground">{test.test}</h3>
                  <p className="text-sm text-muted-foreground">Winner: {test.winner}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">{test.improvement}</p>
                <p className="text-sm text-muted-foreground">{test.confidence} confidence</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Wins */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Quick Optimization Wins</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <Settings className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-900 dark:text-green-100">Menu Reordering</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Move popular options to top positions</p>
            <p className="text-xs text-green-600 mt-1">Impact: +8% efficiency</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <TrendingUp className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Timeout Adjustment</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">Optimize wait times for user input</p>
            <p className="text-xs text-blue-600 mt-1">Impact: +5% completion</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <Target className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-purple-900 dark:text-purple-100">Error Handling</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300">Improve error messages and recovery</p>
            <p className="text-xs text-purple-600 mt-1">Impact: +10% success rate</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default IvrOptimization;