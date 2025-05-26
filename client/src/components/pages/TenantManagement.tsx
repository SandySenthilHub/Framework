import React from 'react';
import { Card } from '@/components/ui/card';
import { Building, Users, Database, Settings, Globe, Shield } from 'lucide-react';

const TenantManagement: React.FC = () => {
  const tenants = [
    {
      name: 'Cerulean Bank - Main',
      domain: 'main.ceruleanbank.com',
      users: 234,
      status: 'active',
      plan: 'Enterprise',
      dataUsage: '2.4 GB',
      lastActivity: '2 minutes ago',
      region: 'US-East'
    },
    {
      name: 'Cerulean Bank - EU',
      domain: 'eu.ceruleanbank.com',
      users: 156,
      status: 'active',
      plan: 'Professional',
      dataUsage: '1.8 GB',
      lastActivity: '15 minutes ago',
      region: 'EU-West'
    },
    {
      name: 'Cerulean Investment Services',
      domain: 'invest.ceruleanbank.com',
      users: 89,
      status: 'active',
      plan: 'Professional',
      dataUsage: '947 MB',
      lastActivity: '1 hour ago',
      region: 'US-West'
    },
    {
      name: 'Cerulean Mobile Banking',
      domain: 'mobile.ceruleanbank.com',
      users: 67,
      status: 'maintenance',
      plan: 'Standard',
      dataUsage: '654 MB',
      lastActivity: '3 hours ago',
      region: 'US-Central'
    }
  ];

  const tenantStats = [
    { label: 'Active Tenants', value: '4', icon: Building },
    { label: 'Total Users', value: '546', icon: Users },
    { label: 'Data Storage', value: '5.8 GB', icon: Database },
    { label: 'Regions', value: '4', icon: Globe },
  ];

  const isolationSettings = [
    { setting: 'Database Isolation', status: 'enabled', description: 'Separate database schemas for each tenant' },
    { setting: 'Data Encryption', status: 'enabled', description: 'AES-256 encryption for tenant data' },
    { setting: 'Network Segmentation', status: 'enabled', description: 'Virtual network isolation per tenant' },
    { setting: 'Access Control', status: 'enabled', description: 'Role-based access with tenant boundaries' },
    { setting: 'Audit Logging', status: 'enabled', description: 'Separate audit trails for each tenant' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'maintenance': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200';
      case 'Professional': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'Standard': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
      default: return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Tenant Management</h1>
        <div className="text-sm text-muted-foreground">Multi-tenant configuration & isolation</div>
      </div>

      {/* Tenant Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {tenantStats.map((stat, index) => (
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

      {/* Tenant List */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Active Tenants</h2>
        <div className="space-y-4">
          {tenants.map((tenant, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <Building className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-foreground">{tenant.name}</h3>
                    <p className="text-sm text-muted-foreground">{tenant.domain}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(tenant.status)}`}>
                    {tenant.status}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPlanColor(tenant.plan)}`}>
                    {tenant.plan}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Users</p>
                  <p className="font-semibold text-foreground">{tenant.users}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Data Usage</p>
                  <p className="font-semibold text-foreground">{tenant.dataUsage}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Activity</p>
                  <p className="font-semibold text-foreground">{tenant.lastActivity}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Region</p>
                  <p className="font-semibold text-foreground">{tenant.region}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Data Isolation & Security */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Data Isolation & Security</h2>
        <div className="space-y-3">
          {isolationSettings.map((setting, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Shield className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-medium text-foreground">{setting.setting}</h3>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                {setting.status}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Regional Distribution */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Regional Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <Globe className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Americas</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">US-East, US-West, US-Central regions</p>
            <p className="text-lg font-bold text-blue-800 dark:text-blue-200">3 tenants</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <Globe className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-900 dark:text-green-100">Europe</h3>
            <p className="text-sm text-green-700 dark:text-green-300">EU-West region with GDPR compliance</p>
            <p className="text-lg font-bold text-green-800 dark:text-green-200">1 tenant</p>
          </div>
        </div>
      </Card>

      {/* Tenant Configuration */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Configuration Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <Settings className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-purple-900 dark:text-purple-100">Custom Branding</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300">Tenant-specific themes and logos</p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
            <Database className="h-8 w-8 text-orange-600 mb-2" />
            <h3 className="font-medium text-orange-900 dark:text-orange-100">Resource Limits</h3>
            <p className="text-sm text-orange-700 dark:text-orange-300">Storage and bandwidth quotas</p>
          </div>
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg">
            <Shield className="h-8 w-8 text-indigo-600 mb-2" />
            <h3 className="font-medium text-indigo-900 dark:text-indigo-100">Access Policies</h3>
            <p className="text-sm text-indigo-700 dark:text-indigo-300">Tenant-specific security rules</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TenantManagement;