import React from 'react';
import { Card } from '@/components/ui/card';
import { Database, Table, Link, Settings, CheckCircle, AlertTriangle } from 'lucide-react';

const EntityFramework: React.FC = () => {
  const entities = [
    { name: 'Customer', fields: 15, relationships: 8, status: 'active', lastUpdated: '2024-05-24' },
    { name: 'Account', fields: 12, relationships: 6, status: 'active', lastUpdated: '2024-05-23' },
    { name: 'Transaction', fields: 18, relationships: 4, status: 'active', lastUpdated: '2024-05-24' },
    { name: 'Agent', fields: 11, relationships: 5, status: 'active', lastUpdated: '2024-05-22' },
    { name: 'Call', fields: 22, relationships: 7, status: 'active', lastUpdated: '2024-05-24' },
    { name: 'Quality_Score', fields: 9, relationships: 3, status: 'active', lastUpdated: '2024-05-23' },
  ];

  const relationships = [
    { from: 'Customer', to: 'Account', type: 'One-to-Many', status: 'valid' },
    { from: 'Account', to: 'Transaction', type: 'One-to-Many', status: 'valid' },
    { from: 'Agent', to: 'Call', type: 'One-to-Many', status: 'valid' },
    { from: 'Call', to: 'Customer', type: 'Many-to-One', status: 'valid' },
    { from: 'Call', to: 'Quality_Score', type: 'One-to-One', status: 'valid' },
    { from: 'Agent', to: 'Quality_Score', type: 'One-to-Many', status: 'valid' },
  ];

  const schemaHealth = [
    { metric: 'Entity Integrity', status: 'healthy', value: '100%' },
    { metric: 'Referential Integrity', status: 'healthy', value: '99.8%' },
    { metric: 'Data Consistency', status: 'warning', value: '98.2%' },
    { metric: 'Index Optimization', status: 'healthy', value: '95.4%' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-orange-600';
      case 'error': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Entity Framework</h1>
        <div className="text-sm text-muted-foreground">Database schema & entity management</div>
      </div>

      {/* Schema Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Entities</p>
              <p className="text-2xl font-bold text-foreground">6</p>
            </div>
            <Database className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Relationships</p>
              <p className="text-2xl font-bold text-foreground">6</p>
            </div>
            <Link className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Fields</p>
              <p className="text-2xl font-bold text-foreground">87</p>
            </div>
            <Table className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Schema Health</p>
              <p className="text-2xl font-bold text-foreground">99%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Entity List */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Database Entities</h2>
        <div className="space-y-3">
          {entities.map((entity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Database className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-medium text-foreground">{entity.name}</h3>
                  <p className="text-sm text-muted-foreground">Last updated: {entity.lastUpdated}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-foreground">{entity.fields}</p>
                  <p className="text-muted-foreground">Fields</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{entity.relationships}</p>
                  <p className="text-muted-foreground">Relations</p>
                </div>
                <div className="text-center">
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                    {entity.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Entity Relationships */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Entity Relationships</h2>
        <div className="space-y-3">
          {relationships.map((rel, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Link className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-foreground">{rel.from} → {rel.to}</h3>
                  <p className="text-sm text-muted-foreground">{rel.type} relationship</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                  {rel.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Schema Health */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Schema Health Status</h2>
        <div className="space-y-3">
          {schemaHealth.map((health, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Settings className={`h-6 w-6 ${getStatusColor(health.status)}`} />
                <div>
                  <h3 className="font-medium text-foreground">{health.metric}</h3>
                  <p className="text-sm text-muted-foreground">Database integrity check</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-semibold text-foreground">{health.value}</p>
                  <p className="text-sm text-muted-foreground">Status</p>
                </div>
                {health.status === 'healthy' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Framework Configuration */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Framework Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <Database className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Connection Pooling</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">Max connections: 100, Active: 23</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <Settings className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-900 dark:text-green-100">Query Optimization</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Lazy loading enabled, caching active</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EntityFramework;