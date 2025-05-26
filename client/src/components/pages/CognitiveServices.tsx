import React from 'react';
import { Card } from '@/components/ui/card';
import { Brain, MessageSquare, Mic, Eye, FileText, Zap } from 'lucide-react';

const CognitiveServices: React.FC = () => {
  const services = [
    { name: 'Speech Recognition', status: 'Active', processed: '12,847', accuracy: '97.2%', icon: Mic },
    { name: 'Text Analytics', status: 'Active', processed: '8,234', accuracy: '94.8%', icon: FileText },
    { name: 'Sentiment Analysis', status: 'Active', processed: '15,691', accuracy: '89.3%', icon: MessageSquare },
    { name: 'Language Detection', status: 'Active', processed: '5,423', accuracy: '98.7%', icon: Brain },
  ];

  const insights = [
    { category: 'Customer Sentiment', positive: '67%', neutral: '28%', negative: '5%' },
    { category: 'Call Intent', billing: '34%', support: '28%', sales: '23%', other: '15%' },
    { category: 'Language Distribution', english: '78%', spanish: '15%', french: '4%', other: '3%' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Cognitive Services Analytics</h1>
        <div className="text-sm text-muted-foreground">AI-powered insights</div>
      </div>

      {/* Service Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <service.icon className="h-8 w-8 text-blue-600" />
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {service.status}
              </span>
            </div>
            <h3 className="font-semibold text-foreground mb-1">{service.name}</h3>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Processed: {service.processed}</p>
              <p className="text-sm font-medium text-foreground">Accuracy: {service.accuracy}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Real-time Processing */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <Zap className="h-5 w-5 mr-2" />
          Real-time Processing Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Current Processing Queue</h3>
            <div className="space-y-2">
              <div className="flex justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm">Speech to Text</span>
                <span className="text-sm font-medium">23 jobs</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm">Sentiment Analysis</span>
                <span className="text-sm font-medium">15 jobs</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm">Intent Recognition</span>
                <span className="text-sm font-medium">8 jobs</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Processing Speed</h3>
            <div className="space-y-2">
              <div className="flex justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm">Avg Response Time</span>
                <span className="text-sm font-medium text-green-600">1.2s</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm">Throughput</span>
                <span className="text-sm font-medium text-blue-600">450/min</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm">Error Rate</span>
                <span className="text-sm font-medium text-red-600">0.8%</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Resource Usage</h3>
            <div className="space-y-2">
              <div className="flex justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm">CPU Usage</span>
                <span className="text-sm font-medium">67%</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm">Memory</span>
                <span className="text-sm font-medium">2.3GB</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm">API Calls Today</span>
                <span className="text-sm font-medium">45.7K</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Cognitive Insights */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <Eye className="h-5 w-5 mr-2" />
          Cognitive Analytics Insights
        </h2>
        <div className="space-y-6">
          {insights.map((insight, index) => (
            <div key={index}>
              <h3 className="font-medium text-foreground mb-3">{insight.category}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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

      {/* API Integration Status */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">API Integration Status</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <div>
              <h3 className="font-medium text-green-900 dark:text-green-100">Azure Cognitive Services</h3>
              <p className="text-sm text-green-700 dark:text-green-300">All services operational - 99.9% uptime</p>
            </div>
            <span className="text-green-600 font-semibold">Connected</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <div>
              <h3 className="font-medium text-blue-900 dark:text-blue-100">Google Cloud AI</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">Speech and language APIs active</p>
            </div>
            <span className="text-blue-600 font-semibold">Connected</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <div>
              <h3 className="font-medium text-purple-900 dark:text-purple-100">Custom ML Models</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">Proprietary sentiment and intent models</p>
            </div>
            <span className="text-purple-600 font-semibold">Running</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CognitiveServices;