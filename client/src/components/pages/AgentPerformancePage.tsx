import React from 'react';
import { Card } from '@/components/ui/card';
import { Users, Clock, Star, TrendingUp, Award, Target } from 'lucide-react';

const AgentPerformancePage: React.FC = () => {
  const topAgents = [
    { name: 'Sarah Johnson', id: 'A001', calls: 47, avgTime: '3m 45s', satisfaction: 4.8, resolution: '92%' },
    { name: 'Mike Chen', id: 'A002', calls: 42, avgTime: '4m 12s', satisfaction: 4.7, resolution: '89%' },
    { name: 'Emily Davis', id: 'A003', calls: 39, avgTime: '3m 58s', satisfaction: 4.6, resolution: '91%' },
    { name: 'James Wilson', id: 'A004', calls: 36, avgTime: '4m 25s', satisfaction: 4.5, resolution: '88%' },
    { name: 'Lisa Anderson', id: 'A005', calls: 34, avgTime: '3m 32s', satisfaction: 4.7, resolution: '93%' },
  ];

  const performanceMetrics = [
    { label: 'Total Agents', value: '30', icon: Users, color: 'text-blue-600' },
    { label: 'Avg Handle Time', value: '4m 15s', icon: Clock, color: 'text-orange-600' },
    { label: 'Avg Satisfaction', value: '4.6/5', icon: Star, color: 'text-yellow-600' },
    { label: 'First Call Resolution', value: '89.5%', icon: Target, color: 'text-green-600' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Agent Performance Analytics</h1>
        <div className="text-sm text-muted-foreground">Real-time data</div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => (
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

      {/* Agent Leaderboard */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <Award className="h-5 w-5 mr-2 text-yellow-600" />
          Top Performing Agents
        </h2>
        <div className="space-y-3">
          {topAgents.map((agent, index) => (
            <div key={agent.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-primary'
                }`}>
                  {index + 1}
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-sm">{agent.name.charAt(0)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{agent.name}</span>
                    <p className="text-sm text-muted-foreground">ID: {agent.id}</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-8 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-foreground">{agent.calls}</p>
                  <p className="text-muted-foreground">Calls</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{agent.avgTime}</p>
                  <p className="text-muted-foreground">Avg Time</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{agent.satisfaction}/5</p>
                  <p className="text-muted-foreground">Rating</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{agent.resolution}</p>
                  <p className="text-muted-foreground">Resolution</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Trends */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Performance Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Weekly Improvement</h3>
            <p className="text-xl font-bold text-green-600">+12.5%</p>
            <p className="text-sm text-muted-foreground">Customer satisfaction up</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Handle Time Reduction</h3>
            <p className="text-xl font-bold text-green-600">-8%</p>
            <p className="text-sm text-muted-foreground">Efficiency improved</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Training Completion</h3>
            <p className="text-xl font-bold text-blue-600">95%</p>
            <p className="text-sm text-muted-foreground">Agents certified</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AgentPerformancePage;