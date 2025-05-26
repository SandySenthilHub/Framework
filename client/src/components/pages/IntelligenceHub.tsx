import React from 'react';
import { Card } from '@/components/ui/card';
import { Brain, Zap, Target, TrendingUp, Eye, MessageSquare } from 'lucide-react';

const IntelligenceHub: React.FC = () => {
  const aiMetrics = [
    { label: 'Sentiment Analysis', value: '87%', icon: Brain, color: 'text-purple-600' },
    { label: 'Intent Recognition', value: '94%', icon: Target, color: 'text-green-600' },
    { label: 'Auto Resolution', value: '67%', icon: Zap, color: 'text-blue-600' },
    { label: 'Prediction Accuracy', value: '91%', icon: Eye, color: 'text-orange-600' },
  ];

  const insights = [
    { category: 'Customer Emotions', happy: '45%', neutral: '38%', frustrated: '17%' },
    { category: 'Call Outcomes', resolved: '78%', escalated: '12%', callback: '10%' },
    { category: 'Agent Efficiency', high: '23%', medium: '65%', low: '12%' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">AI Intelligence Hub</h1>
        <div className="text-sm text-muted-foreground">Advanced AI analytics</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {aiMetrics.map((metric, index) => (
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

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Intelligence Insights</h2>
        <div className="space-y-6">
          {insights.map((insight, index) => (
            <div key={index}>
              <h3 className="font-medium text-foreground mb-3">{insight.category}</h3>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(insight).filter(([key]) => key !== 'category').map(([key, value]) => (
                  <div key={key} className="p-3 bg-muted/50 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground capitalize">{key}</p>
                    <p className="text-lg font-bold text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">AI Recommendations</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Peak Hour Optimization</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">AI suggests adding 2 agents during 2-4 PM peak</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <h3 className="font-medium text-green-900 dark:text-green-100">Training Focus</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Product knowledge training could improve resolution by 15%</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default IntelligenceHub;