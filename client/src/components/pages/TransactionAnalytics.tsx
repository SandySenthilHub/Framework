import React from 'react';
import { Card } from '@/components/ui/card';
import { CreditCard, DollarSign, TrendingUp, Users, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const TransactionAnalytics: React.FC = () => {
  const transactionTypes = [
    { type: 'Money Transfer', count: '1,234', volume: '$654K', avgAmount: '$530', growth: '+12%' },
    { type: 'Bill Payment', count: '987', volume: '$234K', avgAmount: '$237', growth: '+8%' },
    { type: 'Account Top-up', count: '756', volume: '$189K', avgAmount: '$250', growth: '+15%' },
    { type: 'Investment', count: '345', volume: '$890K', avgAmount: '$2,580', growth: '+23%' },
    { type: 'Loan Payment', count: '234', volume: '$567K', avgAmount: '$2,423', growth: '+5%' },
  ];

  const hourlyTransactions = [
    { hour: '9AM', count: 145, value: '$42K' },
    { hour: '12PM', count: 298, value: '$89K' },
    { hour: '3PM', count: 234, value: '$67K' },
    { hour: '6PM', count: 189, value: '$54K' },
    { hour: '9PM', count: 76, value: '$23K' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Transaction Analytics</h1>
        <div className="text-sm text-muted-foreground">Real-time transaction insights</div>
      </div>

      {/* Transaction Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Transactions</p>
              <p className="text-2xl font-bold text-foreground">3,556</p>
            </div>
            <CreditCard className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Volume</p>
              <p className="text-2xl font-bold text-foreground">$2.53M</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold text-foreground">99.2%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold text-foreground">1,847</p>
            </div>
            <Users className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Transaction Types Analysis */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Transaction Types Performance</h2>
        <div className="space-y-4">
          {transactionTypes.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{transaction.type}</h3>
                  <p className="text-sm text-muted-foreground">{transaction.count} transactions</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-foreground">{transaction.volume}</p>
                  <p className="text-muted-foreground">Volume</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{transaction.avgAmount}</p>
                  <p className="text-muted-foreground">Avg Amount</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-green-600">{transaction.growth}</p>
                  <p className="text-muted-foreground">Growth</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Hourly Transaction Patterns */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Hourly Transaction Patterns</h2>
        <div className="space-y-3">
          {hourlyTransactions.map((hour, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-16 text-sm font-medium text-foreground">{hour.hour}</div>
                <div className="flex-1 bg-muted rounded h-8 flex items-center">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 rounded h-full flex items-center justify-center text-white text-xs font-medium"
                    style={{ width: `${(hour.count / 300) * 100}%`, minWidth: '60px' }}
                  >
                    {hour.count}
                  </div>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="font-semibold text-foreground">{hour.value}</p>
                <p className="text-xs text-muted-foreground">Transaction Value</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Transaction Flow Analysis */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Transaction Flow Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-foreground mb-3 flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-2 text-green-600" />
              Top Inflow Sources
            </h3>
            <div className="space-y-2">
              {['Salary Deposits: $1.2M', 'Investment Returns: $340K', 'Transfers In: $280K', 'Loan Disbursements: $190K'].map((item, index) => (
                <div key={index} className="flex justify-between p-2 bg-green-50 dark:bg-green-950/30 rounded">
                  <span className="text-sm text-green-800 dark:text-green-200">{item.split(':')[0]}</span>
                  <span className="text-sm font-medium text-green-900 dark:text-green-100">{item.split(':')[1]}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-3 flex items-center">
              <ArrowDownLeft className="h-4 w-4 mr-2 text-red-600" />
              Top Outflow Destinations
            </h3>
            <div className="space-y-2">
              {['Bill Payments: $890K', 'Money Transfers: $654K', 'Investments: $445K', 'Loan Payments: $234K'].map((item, index) => (
                <div key={index} className="flex justify-between p-2 bg-red-50 dark:bg-red-950/30 rounded">
                  <span className="text-sm text-red-800 dark:text-red-200">{item.split(':')[0]}</span>
                  <span className="text-sm font-medium text-red-900 dark:text-red-100">{item.split(':')[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TransactionAnalytics;