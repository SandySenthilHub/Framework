import React from 'react';
import { Card } from '@/components/ui/card';
import { Smartphone, CreditCard, Users, DollarSign, TrendingUp, Shield } from 'lucide-react';

const MobileBankingDashboard: React.FC = () => {
  const realTimeMetrics = [
    { label: 'Active Users', value: '12,847', icon: Users, color: 'text-blue-600' },
    { label: 'Transactions/Hour', value: '3,421', icon: CreditCard, color: 'text-green-600' },
    { label: 'Total Volume', value: '$2.4M', icon: DollarSign, color: 'text-purple-600' },
    { label: 'Success Rate', value: '99.2%', icon: Shield, color: 'text-green-600' },
  ];

  const transactionData = [
    { type: 'Money Transfer', count: '1,234', volume: '$654K', avgAmount: '$530' },
    { type: 'Bill Payment', count: '987', volume: '$234K', avgAmount: '$237' },
    { type: 'Account Top-up', count: '756', volume: '$189K', avgAmount: '$250' },
    { type: 'Investment', count: '345', volume: '$890K', avgAmount: '$2,580' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Mobile Banking Analytics</h1>
        <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {realTimeMetrics.map((metric, index) => (
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

      {/* Transaction Analysis */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Transaction Analysis</h2>
        <div className="space-y-4">
          {transactionData.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{transaction.type}</h3>
                  <p className="text-sm text-muted-foreground">{transaction.count} transactions</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{transaction.volume}</p>
                <p className="text-sm text-muted-foreground">Avg: {transaction.avgAmount}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* User Behavior */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">User Behavior Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Peak Usage Hours</h3>
            <p className="text-xl font-bold text-foreground">2PM - 6PM</p>
            <p className="text-sm text-green-600">+15% from last week</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Avg Session Duration</h3>
            <p className="text-xl font-bold text-foreground">3m 45s</p>
            <p className="text-sm text-green-600">+8% improvement</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Feature Adoption</h3>
            <p className="text-xl font-bold text-foreground">78%</p>
            <p className="text-sm text-blue-600">New features used</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MobileBankingDashboard;