import React from 'react';
import { Card } from '@/components/ui/card';
import { Inbox, Clock, CheckCircle, AlertTriangle, User, ArrowRight, Filter } from 'lucide-react';

const WorkflowInbox: React.FC = () => {
  const workflowTasks = [
    {
      id: 'WF-001',
      title: 'Customer Onboarding Review',
      description: 'New customer application requires manager approval',
      priority: 'high',
      status: 'pending',
      assignedTo: 'Sarah Johnson',
      dueDate: '2024-05-24 16:00',
      category: 'Onboarding',
      age: '2 hours'
    },
    {
      id: 'WF-002',
      title: 'Loan Application Processing',
      description: 'Commercial loan application for $250,000 needs verification',
      priority: 'critical',
      status: 'in-progress',
      assignedTo: 'Michael Chen',
      dueDate: '2024-05-24 15:30',
      category: 'Lending',
      age: '4 hours'
    },
    {
      id: 'WF-003',
      title: 'Account Closure Request',
      description: 'Corporate account closure with pending transactions',
      priority: 'medium',
      status: 'pending',
      assignedTo: 'Emily Davis',
      dueDate: '2024-05-25 10:00',
      category: 'Account Management',
      age: '1 day'
    },
    {
      id: 'WF-004',
      title: 'Fraud Investigation',
      description: 'Suspicious transaction pattern detected in account #789456',
      priority: 'critical',
      status: 'escalated',
      assignedTo: 'David Wilson',
      dueDate: '2024-05-24 14:00',
      category: 'Security',
      age: '6 hours'
    },
    {
      id: 'WF-005',
      title: 'Credit Limit Increase',
      description: 'Request for credit limit increase from $5,000 to $15,000',
      priority: 'low',
      status: 'pending',
      assignedTo: 'Lisa Anderson',
      dueDate: '2024-05-26 09:00',
      category: 'Credit',
      age: '3 hours'
    }
  ];

  const workflowStats = [
    { label: 'Active Tasks', value: '47', icon: Inbox },
    { label: 'Overdue Items', value: '8', icon: AlertTriangle },
    { label: 'Completed Today', value: '23', icon: CheckCircle },
    { label: 'Avg Processing Time', value: '2.4h', icon: Clock },
  ];

  const taskCategories = [
    { name: 'Onboarding', count: 12, percentage: 25, color: 'bg-blue-500' },
    { name: 'Lending', count: 8, percentage: 17, color: 'bg-green-500' },
    { name: 'Account Management', count: 15, percentage: 32, color: 'bg-purple-500' },
    { name: 'Security', count: 7, percentage: 15, color: 'bg-red-500' },
    { name: 'Credit', count: 5, percentage: 11, color: 'bg-orange-500' },
  ];

  const teamPerformance = [
    { member: 'Sarah Johnson', assigned: 8, completed: 6, avgTime: '1.8h', efficiency: '92%' },
    { member: 'Michael Chen', assigned: 6, completed: 5, avgTime: '2.1h', efficiency: '88%' },
    { member: 'Emily Davis', assigned: 9, completed: 7, avgTime: '2.5h', efficiency: '85%' },
    { member: 'David Wilson', assigned: 5, completed: 4, avgTime: '3.2h', efficiency: '78%' },
    { member: 'Lisa Anderson', assigned: 7, completed: 6, avgTime: '2.0h', efficiency: '90%' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'escalated': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Workflow Inbox</h1>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-3 py-2 border rounded-lg hover:bg-muted">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
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

      {/* Active Workflow Tasks */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Active Workflow Tasks</h2>
        <div className="space-y-4">
          {workflowTasks.map((task, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <Inbox className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-foreground">{task.title}</h3>
                    <p className="text-sm text-muted-foreground">{task.id} • {task.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Assigned To</p>
                  <p className="font-medium text-foreground">{task.assignedTo}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Due Date</p>
                  <p className="font-medium text-foreground">{task.dueDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Age</p>
                  <p className="font-medium text-foreground">{task.age}</p>
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <button className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                  <span>Process</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Task Categories */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Task Distribution</h2>
        <div className="space-y-4">
          {taskCategories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground">{category.name}</span>
                    <span className="text-sm text-muted-foreground">{category.count} tasks</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${category.color}`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Team Performance */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Team Performance</h2>
        <div className="space-y-3">
          {teamPerformance.map((member, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <User className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-foreground">{member.member}</h3>
                  <p className="text-sm text-muted-foreground">Team Member</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-6 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-foreground">{member.assigned}</p>
                  <p className="text-muted-foreground">Assigned</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{member.completed}</p>
                  <p className="text-muted-foreground">Completed</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{member.avgTime}</p>
                  <p className="text-muted-foreground">Avg Time</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-green-600">{member.efficiency}</p>
                  <p className="text-muted-foreground">Efficiency</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Workflow Insights */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Workflow Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <Clock className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Processing Time</h3>
            <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">2.4h</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">Average completion time</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-900 dark:text-green-100">Success Rate</h3>
            <p className="text-2xl font-bold text-green-800 dark:text-green-200">94%</p>
            <p className="text-sm text-green-700 dark:text-green-300">Tasks completed successfully</p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
            <AlertTriangle className="h-8 w-8 text-orange-600 mb-2" />
            <h3 className="font-medium text-orange-900 dark:text-orange-100">Escalation Rate</h3>
            <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">6%</p>
            <p className="text-sm text-orange-700 dark:text-orange-300">Tasks requiring escalation</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WorkflowInbox;