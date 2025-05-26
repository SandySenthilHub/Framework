import React from 'react';
import { Card } from '@/components/ui/card';
import { Brain, Target, Zap, TrendingUp, BookOpen, Lightbulb } from 'lucide-react';

const AiMlPlaybook: React.FC = () => {
  const mlModels = [
    { name: 'Call Outcome Predictor', accuracy: '91.2%', status: 'Production', lastTrained: '2 days ago' },
    { name: 'Customer Churn Model', accuracy: '87.8%', status: 'Production', lastTrained: '1 week ago' },
    { name: 'Agent Performance Predictor', accuracy: '84.3%', status: 'Testing', lastTrained: '3 days ago' },
    { name: 'Queue Time Optimizer', accuracy: '93.1%', status: 'Production', lastTrained: '5 days ago' },
  ];

  const playbooks = [
    { 
      title: 'High Value Customer Detection', 
      trigger: 'Customer calls with billing inquiry', 
      action: 'Route to premium support team',
      success: '94% customer retention'
    },
    { 
      title: 'Escalation Prevention', 
      trigger: 'Sentiment drops below 3/10', 
      action: 'Suggest supervisor intervention',
      success: '67% escalation reduction'
    },
    { 
      title: 'Upselling Opportunity', 
      trigger: 'Customer satisfaction > 8/10', 
      action: 'Present relevant product offers',
      success: '23% conversion rate'
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">AI/ML Playbook Center</h1>
        <div className="text-sm text-muted-foreground">Intelligent automation strategies</div>
      </div>

      {/* ML Model Performance */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <Brain className="h-5 w-5 mr-2" />
          Machine Learning Models
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mlModels.map((model, index) => (
            <Card key={index} className="p-4 border-l-4 border-l-blue-500">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground">{model.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  model.status === 'Production' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {model.status}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Accuracy: <span className="font-medium text-foreground">{model.accuracy}</span></p>
                <p className="text-sm text-muted-foreground">Last trained: {model.lastTrained}</p>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Active Playbooks */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <BookOpen className="h-5 w-5 mr-2" />
          Active AI Playbooks
        </h2>
        <div className="space-y-4">
          {playbooks.map((playbook, index) => (
            <Card key={index} className="p-4 bg-muted/30">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-foreground">{playbook.title}</h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Active</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Trigger:</p>
                  <p className="text-foreground">{playbook.trigger}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Action:</p>
                  <p className="text-foreground">{playbook.action}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Success Rate:</p>
                  <p className="text-green-600 font-medium">{playbook.success}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* AI Recommendations */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <Lightbulb className="h-5 w-5 mr-2" />
          AI-Generated Recommendations
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Optimize Agent Scheduling</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
              ML analysis suggests adding 2 agents during 2-4 PM window to reduce wait times by 23%
            </p>
            <div className="flex space-x-2">
              <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded">Implement</button>
              <button className="text-xs border border-blue-600 text-blue-600 px-3 py-1 rounded">Review Details</button>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
            <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">New Training Module</h3>
            <p className="text-sm text-green-700 dark:text-green-300 mb-2">
              Create focused training on "Billing Dispute Resolution" - could improve FCR by 15%
            </p>
            <div className="flex space-x-2">
              <button className="text-xs bg-green-600 text-white px-3 py-1 rounded">Create Module</button>
              <button className="text-xs border border-green-600 text-green-600 px-3 py-1 rounded">See Analysis</button>
            </div>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg">
            <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Customer Journey Optimization</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">
              Implement proactive callback system for customers waiting 3 minutes
            </p>
            <div className="flex space-x-2">
              <button className="text-xs bg-purple-600 text-white px-3 py-1 rounded">Deploy</button>
              <button className="text-xs border border-purple-600 text-purple-600 px-3 py-1 rounded">Simulate Impact</button>
            </div>
          </div>
        </div>
      </Card>

      {/* Performance Metrics */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          AI Impact Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">+18%</p>
            <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">-32%</p>
            <p className="text-sm text-muted-foreground">Average Handle Time</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">+45%</p>
            <p className="text-sm text-muted-foreground">First Call Resolution</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">$2.4M</p>
            <p className="text-sm text-muted-foreground">Annual Cost Savings</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AiMlPlaybook;