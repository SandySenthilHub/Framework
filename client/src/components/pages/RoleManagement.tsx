import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield, Users, Key, Settings, CheckCircle, Edit } from 'lucide-react';

const RoleManagement: React.FC = () => {
  const roles = [
    {
      name: 'Super Administrator',
      description: 'Full system access and configuration',
      users: 3,
      permissions: ['All System Access', 'User Management', 'Security Settings'],
      status: 'active',
      level: 'system'
    },
    {
      name: 'Call Center Manager',
      description: 'Manage call center operations and staff',
      users: 8,
      permissions: ['Agent Management', 'Quality Review', 'Reports Access'],
      status: 'active',
      level: 'manager'
    },
    {
      name: 'Senior Agent',
      description: 'Experienced agent with mentoring capabilities',
      users: 23,
      permissions: ['Call Handling', 'Quality View', 'Training Access'],
      status: 'active',
      level: 'senior'
    },
    {
      name: 'Customer Service Agent',
      description: 'Standard customer service representative',
      users: 156,
      permissions: ['Call Handling', 'Customer Data View', 'Basic Reports'],
      status: 'active',
      level: 'standard'
    },
    {
      name: 'Quality Analyst',
      description: 'Review and analyze call quality metrics',
      users: 12,
      permissions: ['Quality Analytics', 'Call Recording Access', 'Performance Reports'],
      status: 'active',
      level: 'analyst'
    },
    {
      name: 'Technical Support',
      description: 'System technical support and maintenance',
      users: 7,
      permissions: ['System Monitoring', 'Technical Diagnostics', 'Backup Access'],
      status: 'active',
      level: 'technical'
    }
  ];

  const permissions = [
    { category: 'User Management', items: ['Create Users', 'Edit Users', 'Delete Users', 'Assign Roles'] },
    { category: 'Call Center Operations', items: ['Handle Calls', 'View Customer Data', 'Transfer Calls', 'Escalate Issues'] },
    { category: 'Quality Management', items: ['Review Calls', 'Score Agents', 'Create Reports', 'View Analytics'] },
    { category: 'System Administration', items: ['System Config', 'Security Settings', 'Backup Management', 'Audit Access'] },
    { category: 'Reporting & Analytics', items: ['View Reports', 'Export Data', 'Create Dashboards', 'Schedule Reports'] }
  ];

  const getRoleLevelColor = (level: string) => {
    switch (level) {
      case 'system': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      case 'manager': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200';
      case 'senior': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'analyst': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'technical': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Role Management</h1>
        <div className="text-sm text-muted-foreground">Define and manage user access levels</div>
      </div>

      {/* Role Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Roles</p>
              <p className="text-2xl font-bold text-foreground">6</p>
            </div>
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold text-foreground">209</p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Permission Groups</p>
              <p className="text-2xl font-bold text-foreground">5</p>
            </div>
            <Key className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Security Level</p>
              <p className="text-2xl font-bold text-foreground">High</p>
            </div>
            <CheckCircle className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Roles List */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">System Roles</h2>
        <div className="space-y-4">
          {roles.map((role, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-foreground">{role.name}</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getRoleLevelColor(role.level)}`}>
                    {role.level}
                  </span>
                  <Edit className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Assigned Users</p>
                  <p className="font-semibold text-foreground">{role.users} users</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Key Permissions</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {role.permissions.slice(0, 2).map((perm, idx) => (
                      <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded dark:bg-blue-900/30 dark:text-blue-200">
                        {perm}
                      </span>
                    ))}
                    {role.permissions.length > 2 && (
                      <span className="text-xs text-muted-foreground">+{role.permissions.length - 2} more</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Permission Categories */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Permission Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {permissions.map((category, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h3 className="font-medium text-foreground mb-3 flex items-center">
                <Settings className="h-4 w-4 mr-2 text-blue-600" />
                {category.category}
              </h3>
              <ul className="space-y-1">
                {category.items.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* Role Hierarchy */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Role Hierarchy & Access Levels</h2>
        <div className="space-y-3">
          <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg">
            <h3 className="font-medium text-red-900 dark:text-red-100">System Level</h3>
            <p className="text-sm text-red-700 dark:text-red-300">Full administrative access, system configuration, security management</p>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <h3 className="font-medium text-purple-900 dark:text-purple-100">Management Level</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300">Operational oversight, team management, strategic reporting</p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Senior Level</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">Advanced operational tasks, mentoring, quality assistance</p>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <h3 className="font-medium text-green-900 dark:text-green-100">Specialist Level</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Specialized functions, analytics, quality assurance</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-950/30 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Standard Level</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">Basic operations, customer service, standard reporting</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RoleManagement;