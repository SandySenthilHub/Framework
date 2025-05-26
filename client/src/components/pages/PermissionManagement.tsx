import React from 'react';
import { Card } from '@/components/ui/card';
import { Key, Lock, CheckCircle, XCircle, Shield, Users } from 'lucide-react';

const PermissionManagement: React.FC = () => {
  const permissionGroups = [
    {
      name: 'Call Center Operations',
      description: 'Core call handling and customer service permissions',
      permissions: [
        { name: 'Handle Incoming Calls', granted: true, critical: true },
        { name: 'Make Outbound Calls', granted: true, critical: false },
        { name: 'Transfer Calls', granted: true, critical: true },
        { name: 'Access Customer Records', granted: true, critical: true },
        { name: 'Update Customer Information', granted: false, critical: false },
        { name: 'Process Payments', granted: false, critical: true }
      ]
    },
    {
      name: 'Quality Management',
      description: 'Call monitoring and quality assurance permissions',
      permissions: [
        { name: 'Listen to Call Recordings', granted: true, critical: true },
        { name: 'Score Agent Performance', granted: false, critical: false },
        { name: 'Generate Quality Reports', granted: true, critical: false },
        { name: 'Access Quality Analytics', granted: true, critical: false },
        { name: 'Conduct Call Reviews', granted: false, critical: true },
        { name: 'Export Quality Data', granted: false, critical: false }
      ]
    },
    {
      name: 'System Administration',
      description: 'Administrative and configuration permissions',
      permissions: [
        { name: 'Manage User Accounts', granted: false, critical: true },
        { name: 'Configure System Settings', granted: false, critical: true },
        { name: 'Access Security Logs', granted: false, critical: true },
        { name: 'Backup System Data', granted: false, critical: true },
        { name: 'Monitor System Health', granted: true, critical: false },
        { name: 'Update System Software', granted: false, critical: true }
      ]
    },
    {
      name: 'Reporting & Analytics',
      description: 'Data access and reporting permissions',
      permissions: [
        { name: 'View Performance Reports', granted: true, critical: false },
        { name: 'Export Report Data', granted: false, critical: false },
        { name: 'Create Custom Dashboards', granted: false, critical: false },
        { name: 'Access Historical Data', granted: true, critical: false },
        { name: 'Schedule Automated Reports', granted: false, critical: false },
        { name: 'Share Reports Externally', granted: false, critical: true }
      ]
    }
  ];

  const securityPolicies = [
    {
      policy: 'Multi-Factor Authentication',
      status: 'enforced',
      description: 'Required for all administrative access',
      coverage: '100%'
    },
    {
      policy: 'Password Complexity',
      status: 'enforced',
      description: 'Minimum 12 characters with special characters',
      coverage: '100%'
    },
    {
      policy: 'Session Timeout',
      status: 'enforced',
      description: 'Automatic logout after 30 minutes of inactivity',
      coverage: '100%'
    },
    {
      policy: 'IP Restriction',
      status: 'partial',
      description: 'Limited to office and VPN IP ranges',
      coverage: '85%'
    },
    {
      policy: 'Data Encryption',
      status: 'enforced',
      description: 'AES-256 encryption for all sensitive data',
      coverage: '100%'
    }
  ];

  const accessMatrix = [
    { role: 'Super Admin', callOps: true, quality: true, sysAdmin: true, reporting: true },
    { role: 'Call Center Manager', callOps: true, quality: true, sysAdmin: false, reporting: true },
    { role: 'Senior Agent', callOps: true, quality: false, sysAdmin: false, reporting: false },
    { role: 'Quality Analyst', callOps: false, quality: true, sysAdmin: false, reporting: true },
    { role: 'Agent', callOps: true, quality: false, sysAdmin: false, reporting: false },
    { role: 'IT Support', callOps: false, quality: false, sysAdmin: true, reporting: false }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enforced': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'partial': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      case 'disabled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Permission Management</h1>
        <div className="text-sm text-muted-foreground">Access control & security policies</div>
      </div>

      {/* Permission Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Permission Groups</p>
              <p className="text-2xl font-bold text-foreground">4</p>
            </div>
            <Key className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Policies</p>
              <p className="text-2xl font-bold text-foreground">5</p>
            </div>
            <Shield className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Security Level</p>
              <p className="text-2xl font-bold text-foreground">High</p>
            </div>
            <Lock className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Compliance Rate</p>
              <p className="text-2xl font-bold text-foreground">97%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Permission Groups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {permissionGroups.map((group, index) => (
          <Card key={index} className="p-6">
            <h3 className="text-lg font-semibold mb-2 text-foreground">{group.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
            <div className="space-y-2">
              {group.permissions.map((permission, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <div className="flex items-center space-x-3">
                    {permission.granted ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm text-foreground">{permission.name}</span>
                    {permission.critical && (
                      <span className="text-xs px-1 py-0.5 bg-red-100 text-red-800 rounded dark:bg-red-900/30 dark:text-red-200">
                        Critical
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Security Policies */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Security Policies</h2>
        <div className="space-y-3">
          {securityPolicies.map((policy, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Shield className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-foreground">{policy.policy}</h3>
                  <p className="text-sm text-muted-foreground">{policy.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right text-sm">
                  <p className="font-semibold text-foreground">{policy.coverage}</p>
                  <p className="text-muted-foreground">Coverage</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(policy.status)}`}>
                  {policy.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Access Matrix */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Role-Based Access Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 text-foreground">Role</th>
                <th className="text-center p-3 text-foreground">Call Operations</th>
                <th className="text-center p-3 text-foreground">Quality Mgmt</th>
                <th className="text-center p-3 text-foreground">System Admin</th>
                <th className="text-center p-3 text-foreground">Reporting</th>
              </tr>
            </thead>
            <tbody>
              {accessMatrix.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 font-medium text-foreground">{row.role}</td>
                  <td className="text-center p-3">
                    {row.callOps ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mx-auto" />
                    )}
                  </td>
                  <td className="text-center p-3">
                    {row.quality ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mx-auto" />
                    )}
                  </td>
                  <td className="text-center p-3">
                    {row.sysAdmin ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mx-auto" />
                    )}
                  </td>
                  <td className="text-center p-3">
                    {row.reporting ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Access Control Summary */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Access Control Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <Users className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-900 dark:text-green-100">Granted Permissions</h3>
            <p className="text-2xl font-bold text-green-800 dark:text-green-200">14</p>
            <p className="text-sm text-green-700 dark:text-green-300">Active access rights</p>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
            <Lock className="h-8 w-8 text-red-600 mb-2" />
            <h3 className="font-medium text-red-900 dark:text-red-100">Restricted Permissions</h3>
            <p className="text-2xl font-bold text-red-800 dark:text-red-200">10</p>
            <p className="text-sm text-red-700 dark:text-red-300">Security restrictions</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <Shield className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Critical Controls</h3>
            <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">8</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">High-security items</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PermissionManagement;