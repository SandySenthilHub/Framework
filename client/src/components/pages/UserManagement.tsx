import React from 'react';
import { Card } from '@/components/ui/card';
import { Users, UserPlus, Shield, Activity, CheckCircle, AlertTriangle } from 'lucide-react';

const UserManagement: React.FC = () => {
  const userStats = [
    { label: 'Total Users', value: '347', change: '+12', icon: Users },
    { label: 'Active Sessions', value: '89', change: '+5', icon: Activity },
    { label: 'Pending Approvals', value: '7', change: '-2', icon: UserPlus },
    { label: 'Security Alerts', value: '2', change: '0', icon: Shield },
  ];

  const users = [
    { name: 'Sarah Johnson', role: 'Senior Agent', status: 'active', lastLogin: '2 hours ago', permissions: 'Full Access' },
    { name: 'Mike Chen', role: 'Supervisor', status: 'active', lastLogin: '30 minutes ago', permissions: 'Admin' },
    { name: 'Emily Davis', role: 'Agent', status: 'inactive', lastLogin: '2 days ago', permissions: 'Standard' },
    { name: 'James Wilson', role: 'Quality Analyst', status: 'active', lastLogin: '1 hour ago', permissions: 'QA Access' },
    { name: 'Lisa Rodriguez', role: 'Team Lead', status: 'active', lastLogin: '15 minutes ago', permissions: 'Team Admin' },
  ];

  const roleDistribution = [
    { role: 'Agents', count: 156, percentage: '45%' },
    { role: 'Supervisors', count: 23, percentage: '7%' },
    { role: 'Team Leads', count: 18, percentage: '5%' },
    { role: 'Analysts', count: 34, percentage: '10%' },
    { role: 'Administrators', count: 12, percentage: '3%' },
    { role: 'Others', count: 104, percentage: '30%' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">User Management</h1>
        <div className="text-sm text-muted-foreground">System user administration</div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {userStats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change} today</p>
              </div>
              <stat.icon className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
        ))}
      </div>

      {/* User List */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Active Users</h2>
        <div className="space-y-3">
          {users.map((user, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{user.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">Status</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">{user.lastLogin}</p>
                  <p className="text-xs text-muted-foreground">Last Login</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">{user.permissions}</p>
                  <p className="text-xs text-muted-foreground">Access Level</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Role Distribution */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Role Distribution</h2>
        <div className="space-y-3">
          {roleDistribution.map((role, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{role.role}</h3>
                  <p className="text-sm text-muted-foreground">{role.count} users</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{role.percentage}</p>
                <p className="text-sm text-muted-foreground">of total</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Security Alerts */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Security & Access Alerts</h2>
        <div className="space-y-3">
          <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-green-900 dark:text-green-100">Password Policy Compliant</h3>
                <p className="text-sm text-green-700 dark:text-green-300">All users have strong passwords updated within 90 days</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="p-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-orange-900 dark:text-orange-100">Inactive User Review</h3>
                <p className="text-sm text-orange-700 dark:text-orange-300">7 users haven't logged in for 30+ days - review required</p>
              </div>
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-900 dark:text-blue-100">Role Assignment Complete</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">All users have appropriate role assignments and permissions</p>
              </div>
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserManagement;