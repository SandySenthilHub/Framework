import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowRight, GitBranch, Phone, Clock, Users, Target } from 'lucide-react';

const CallFlowAnalytics: React.FC = () => {
  const flowSteps = [
    { step: 'Initial Greeting', completion: '98%', avgTime: '8s', exits: '2%' },
    { step: 'Main Menu', completion: '89%', avgTime: '12s', exits: '11%' },
    { step: 'Service Selection', completion: '76%', avgTime: '18s', exits: '13%' },
    { step: 'Authentication', completion: '94%', avgTime: '25s', exits: '6%' },
    { step: 'Task Completion', completion: '87%', avgTime: '95s', exits: '13%' },
  ];

  const pathAnalysis = [
    { path: 'Balance → Transfer', frequency: '34%', success: '92%', avgTime: '2m 45s' },
    { path: 'Balance → Bill Pay', frequency: '28%', success: '89%', avgTime: '3m 12s' },
    { path: 'Main Menu → Agent', frequency: '16%', success: '78%', avgTime: '1m 23s' },
    { path: 'Bills → Payment History', frequency: '22%', success: '95%', avgTime: '1m 56s' },
  ];

  const optimizationSuggestions = [
    {
      issue: 'High exit rate at Service Selection',
      impact: '13% call abandonment',
      suggestion: 'Simplify menu options from 6 to 4 choices',
      expectedImprovement: '+8% completion'
    },
    {
      issue: 'Authentication delays',
      impact: '25s average wait time',
      suggestion: 'Implement voice biometrics',
      expectedImprovement: '-40% auth time'
    },
    {
      issue: 'Task completion exits',
      impact: '13% partial completions',
      suggestion: 'Add confirmation prompts',
      expectedImprovement: '+15% success rate'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Call Flow Analytics</h1>
        <div className="text-sm text-muted-foreground">IVR path optimization insights</div>
      </div>

      {/* Flow Completion Analysis */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Call Flow Steps Analysis</h2>
        <div className="space-y-4">
          {flowSteps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{step.step}</h3>
                    <p className="text-sm text-muted-foreground">Avg time: {step.avgTime}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-green-600">{step.completion}</p>
                    <p className="text-muted-foreground">Completion</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-red-600">{step.exits}</p>
                    <p className="text-muted-foreground">Exit Rate</p>
                  </div>
                </div>
              </div>
              {index < flowSteps.length - 1 && (
                <div className="flex justify-center mt-2 mb-2">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Path Analysis */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Popular Call Paths</h2>
        <div className="space-y-3">
          {pathAnalysis.map((path, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <GitBranch className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-medium text-foreground">{path.path}</h3>
                  <p className="text-sm text-muted-foreground">Average duration: {path.avgTime}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-foreground">{path.frequency}</p>
                  <p className="text-muted-foreground">Frequency</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-green-600">{path.success}</p>
                  <p className="text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Optimization Opportunities */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Flow Optimization Opportunities</h2>
        <div className="space-y-4">
          {optimizationSuggestions.map((item, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">{item.issue}</h3>
                  <p className="text-sm text-red-600 mb-2">Impact: {item.impact}</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">
                    <strong>Suggestion:</strong> {item.suggestion}
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    <strong>Expected:</strong> {item.expectedImprovement}
                  </p>
                </div>
                <Target className="h-6 w-6 text-orange-600 ml-4" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Flow Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Overall Flow Efficiency</p>
              <p className="text-2xl font-bold text-foreground">76%</p>
            </div>
            <Phone className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Path Duration</p>
              <p className="text-2xl font-bold text-foreground">2m 34s</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Successful Completions</p>
              <p className="text-2xl font-bold text-foreground">7,234</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CallFlowAnalytics;