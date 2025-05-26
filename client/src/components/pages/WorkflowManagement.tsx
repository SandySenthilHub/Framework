import React from 'react';
import { Card } from '@/components/ui/card';
import { GitBranch, Play, Pause, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const WorkflowManagement: React.FC = () => {
  const workflows = [
    {
      name: 'Customer Onboarding',
      status: 'active',
      totalSteps: 8,
      completedToday: 23,
      avgDuration: '12m 34s',
      successRate: 94.2,
      lastRun: '5 minutes ago'
    },
    {
      name: 'Call Quality Review',
      status: 'active',
      totalSteps: 5,
      completedToday: 67,
      avgDuration: '3m 45s',
      successRate: 98.1,
      lastRun: '2 minutes ago'
    },
    {
      name: 'Escalation Process',
      status: 'paused',
      totalSteps: 6,
      completedToday: 8,
      avgDuration: '7m 23s',
      successRate: 91.7,
      lastRun: '45 minutes ago'
    },
    {
      name: 'Account Closure',
      status: 'active',
      totalSteps: 12,
      completedToday: 4,
      avgDuration: '18m 12s',
      successRate: 89.3,
      lastRun: '1 hour ago'
    },
    {
      name: 'Training Assignment',
      status: 'active',
      totalSteps: 4,
      completedToday: 15,
      avgDuration: '2m 56s',
      successRate: 96.8,
      lastRun: '8 minutes ago'
    }
  ];

  const workflowStats = [
    { label: 'Active Workflows', value: '4', icon: Play },
    { label: 'Completed Today', value: '117', icon: CheckCircle },
    { label: 'Avg Success Rate', value: '94%', icon: GitBranch },
    { label: 'Total Runtime', value: '4h 23m', icon: Clock },
  ];

  const stepAnalysis = [
    { step: 'Customer Verification', completions: 45, avgTime: '2m 12s', errorRate: '1.2%' },
    { step: 'Data Collection', completions: 42, avgTime: '3m 45s', errorRate: '2.8%' },
    { step: 'Account Setup', completions: 38, avgTime: '5m 23s', errorRate: '4.1%' },
    { step: 'Documentation', completions: 34, avgTime: '1m 56s', errorRate: '0.9%' },
    { step: 'Final Review', completions: 31, avgTime: '2m 34s', errorRate: '1.5%' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'paused': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return Play;
      case 'paused': return Pause;
      case 'error': return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Workflow Management</h1>
        <div className="text-sm text-muted-foreground">Business process automation</div>
      </div>

      {/* Workflow Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {workflowStats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
        ))}
      </div>

      {/* Active Workflows */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Workflow Status</h2>
        <div className="space-y-4">
          {workflows.map((workflow, index) => {
            const StatusIcon = getStatusIcon(workflow.status);
            return (
              <div key={index} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <StatusIcon className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-foreground">{workflow.name}</h3>
                      <p className="text-sm text-muted-foreground">{workflow.totalSteps} steps • Last run: {workflow.lastRun}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(workflow.status)}`}>
                    {workflow.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Completed Today</p>
                    <p className="font-semibold text-foreground">{workflow.completedToday}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Avg Duration</p>
                    <p className="font-semibold text-foreground">{workflow.avgDuration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Success Rate</p>
                    <p className="font-semibold text-green-600">{workflow.successRate}%</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Step Performance Analysis */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Step Performance Analysis</h2>
        <div className="space-y-3">
          {stepAnalysis.map((step, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{step.step}</h3>
                  <p className="text-sm text-muted-foreground">{step.completions} completions today</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-foreground">{step.avgTime}</p>
                  <p className="text-muted-foreground">Avg Time</p>
                </div>
                <div className="text-center">
                  <p className={`font-semibold ${parseFloat(step.errorRate) < 2 ? 'text-green-600' : 'text-orange-600'}`}>
                    {step.errorRate}
                  </p>
                  <p className="text-muted-foreground">Error Rate</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Workflow Insights */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Process Optimization Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-900 dark:text-green-100">High Performance</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Quality Review workflow maintains 98.1% success rate</p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
            <AlertTriangle className="h-8 w-8 text-orange-600 mb-2" />
            <h3 className="font-medium text-orange-900 dark:text-orange-100">Needs Attention</h3>
            <p className="text-sm text-orange-700 dark:text-orange-300">Account Setup step has 4.1% error rate - review required</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <GitBranch className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Process Efficiency</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">Training workflows complete 96.8% faster than baseline</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WorkflowManagement;