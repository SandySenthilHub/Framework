import React from 'react';
import { Card } from '@/components/ui/card';
import { Users, Star, TrendingUp, Clock, Award, MessageSquare } from 'lucide-react';

const Teams: React.FC = () => {
  const teams = [
    {
      name: 'Customer Support Team A',
      lead: 'Sarah Johnson',
      members: 12,
      performance: 94,
      avgHandleTime: '3m 45s',
      satisfaction: 4.8,
      callsToday: 247,
      specialization: 'General Support'
    },
    {
      name: 'Technical Support Team',
      lead: 'Mike Chen',
      members: 8,
      performance: 91,
      avgHandleTime: '6m 12s',
      satisfaction: 4.6,
      callsToday: 134,
      specialization: 'Technical Issues'
    },
    {
      name: 'VIP Customer Team',
      lead: 'Emily Davis',
      members: 6,
      performance: 97,
      avgHandleTime: '4m 23s',
      satisfaction: 4.9,
      callsToday: 89,
      specialization: 'Premium Support'
    },
    {
      name: 'Billing & Accounts Team',
      lead: 'James Wilson',
      members: 10,
      performance: 88,
      avgHandleTime: '4m 56s',
      satisfaction: 4.5,
      callsToday: 198,
      specialization: 'Financial Queries'
    },
    {
      name: 'Quality Assurance Team',
      lead: 'Lisa Rodriguez',
      members: 5,
      performance: 95,
      avgHandleTime: '2m 30s',
      satisfaction: 4.7,
      callsToday: 67,
      specialization: 'Call Monitoring'
    }
  ];

  const teamStats = [
    { label: 'Total Teams', value: '5', icon: Users },
    { label: 'Total Members', value: '41', icon: Star },
    { label: 'Avg Performance', value: '93%', icon: TrendingUp },
    { label: 'Calls Today', value: '735', icon: MessageSquare },
  ];

  const topPerformers = [
    { name: 'Sarah Johnson', team: 'Support Team A', score: 97, calls: 45 },
    { name: 'Emily Davis', team: 'VIP Team', score: 96, calls: 32 },
    { name: 'Lisa Rodriguez', team: 'QA Team', score: 95, calls: 28 },
    { name: 'Mike Chen', team: 'Technical Team', score: 94, calls: 41 },
  ];

  const getPerformanceColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 90) return 'text-blue-600';
    if (score >= 85) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Teams</h1>
        <div className="text-sm text-muted-foreground">Team management & performance</div>
      </div>

      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {teamStats.map((stat, index) => (
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

      {/* Teams Overview */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Team Performance Overview</h2>
        <div className="space-y-4">
          {teams.map((team, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-foreground">{team.name}</h3>
                    <p className="text-sm text-muted-foreground">Led by {team.lead} • {team.specialization}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-lg font-bold ${getPerformanceColor(team.performance)}`}>
                    {team.performance}%
                  </span>
                  <Award className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Members</p>
                  <p className="font-semibold text-foreground">{team.members}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Avg Handle Time</p>
                  <p className="font-semibold text-foreground">{team.avgHandleTime}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Satisfaction</p>
                  <p className="font-semibold text-foreground">{team.satisfaction}/5</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Calls Today</p>
                  <p className="font-semibold text-foreground">{team.callsToday}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Performers */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Top Performers Today</h2>
        <div className="space-y-3">
          {topPerformers.map((performer, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-gold to-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">#{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{performer.name}</h3>
                  <p className="text-sm text-muted-foreground">{performer.team}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className={`text-lg font-bold ${getPerformanceColor(performer.score)}`}>{performer.score}%</p>
                  <p className="text-xs text-muted-foreground">Performance</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{performer.calls}</p>
                  <p className="text-xs text-muted-foreground">Calls</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Team Insights */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Team Performance Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-900 dark:text-green-100">Highest Performance</h3>
            <p className="text-sm text-green-700 dark:text-green-300">VIP Customer Team leads with 97% performance rating</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <Clock className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Fastest Resolution</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">QA Team averages 2m 30s handle time</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <Star className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-purple-900 dark:text-purple-100">Best Satisfaction</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300">VIP Team maintains 4.9/5 customer satisfaction</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Teams;