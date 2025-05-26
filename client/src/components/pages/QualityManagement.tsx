import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield, Star, CheckCircle, AlertTriangle, FileText, Headphones } from 'lucide-react';

const QualityManagement: React.FC = () => {
  const qualityScores = [
    { agent: 'Mike Chen', score: 89, calls: 42, improvement: '+2%' },
    { agent: 'Emily Davis', score: 95, calls: 39, improvement: '+8%' },
    { agent: 'James Wilson', score: 87, calls: 36, improvement: '-1%' },
  ];

  const evaluationCriteria = [
    { criteria: 'Call Opening', weight: '15%', avgScore: 4.2 },
    { criteria: 'Problem Resolution', weight: '25%', avgScore: 4.1 },
    { criteria: 'Product Knowledge', weight: '20%', avgScore: 3.9 },
    { criteria: 'Communication Skills', weight: '20%', avgScore: 4.3 },
    { criteria: 'Call Closing', weight: '10%', avgScore: 4.0 },
    { criteria: 'Compliance', weight: '10%', avgScore: 4.5 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Quality Management System</h1>
        <div className="text-sm text-muted-foreground">Call monitoring & evaluation</div>
      </div>

      {/* Quality Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Calls Monitored</p>
              <p className="text-2xl font-bold text-foreground">847</p>
            </div>
            <Headphones className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Quality Score</p>
              <p className="text-2xl font-bold text-foreground">4.2/5</p>
            </div>
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Compliance Rate</p>
              <p className="text-2xl font-bold text-foreground">96.7%</p>
            </div>
            <Shield className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Coaching Sessions</p>
              <p className="text-2xl font-bold text-foreground">23</p>
            </div>
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Agent Quality Scores */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Agent Quality Scores</h2>
        <div className="space-y-3">
          {qualityScores.map((agent, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-sm">{agent.agent.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{agent.agent}</h3>
                  <p className="text-sm text-muted-foreground">{agent.calls} calls evaluated</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">{agent.score}/100</p>
                  <p className="text-sm text-muted-foreground">Quality Score</p>
                </div>
                <div className="text-center">
                  <p className={`text-sm font-medium ${agent.improvement.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {agent.improvement}
                  </p>
                  <p className="text-sm text-muted-foreground">vs Last Month</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Evaluation Criteria */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Evaluation Criteria Performance</h2>
        <div className="space-y-4">
          {evaluationCriteria.map((criteria, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground">{criteria.criteria}</h3>
                <span className="text-sm text-muted-foreground">Weight: {criteria.weight}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(criteria.avgScore / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-foreground">{criteria.avgScore}/5</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quality Alerts */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Quality Alerts & Actions</h2>
        <div className="space-y-3">
          <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-red-900 dark:text-red-100">Low Compliance Score</h3>
                <p className="text-sm text-red-700 dark:text-red-300">Agent Mike Chen scored 2.1/5 on compliance</p>
              </div>
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
          </div>
          <div className="p-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-orange-900 dark:text-orange-100">Training Required</h3>
                <p className="text-sm text-orange-700 dark:text-orange-300">3 agents need product knowledge refresher</p>
              </div>
              <FileText className="h-5 w-5 text-orange-600" />
            </div>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-green-900 dark:text-green-100">Excellent Performance</h3>
                <p className="text-sm text-green-700 dark:text-green-300">Emily Davis achieved 95/100 quality score</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QualityManagement;