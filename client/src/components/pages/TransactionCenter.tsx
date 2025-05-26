import React from 'react';
import { Card } from '@/components/ui/card';
import { CreditCard, DollarSign, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle } from 'lucide-react';

const TransactionCenter: React.FC = () => {
  const transactionSummary = [
    { label: 'Total Transactions', value: '12,847', icon: CreditCard },
    { label: 'Transaction Value', value: '$3.2M', icon: DollarSign },
    { label: 'Successful Rate', value: '99.2%', icon: CheckCircle },
    { label: 'Avg Processing Time', value: '1.3s', icon: Clock },
  ];

  const recentTransactions = [
    {
      id: 'TXN-001234',
      type: 'Transfer',
      amount: '$2,450.00',
      from: 'John Smith',
      to: 'Savings Account',
      status: 'completed',
      timestamp: '2024-05-24 14:35:22'
    },
    {
      id: 'TXN-001235',
      type: 'Payment',
      amount: '$89.50',
      from: 'Sarah Johnson',
      to: 'Utility Company',
      status: 'pending',
      timestamp: '2024-05-24 14:32:18'
    },
    {
      id: 'TXN-001236',
      type: 'Deposit',
      amount: '$1,200.00',
      from: 'Employer Direct',
      to: 'Mike Chen',
      status: 'completed',
      timestamp: '2024-05-24 14:28:45'
    },
    {
      id: 'TXN-001237',
      type: 'Transfer',
      amount: '$550.75',
      from: 'Emily Davis',
      to: 'Investment Account',
      status: 'processing',
      timestamp: '2024-05-24 14:25:12'
    },
    {
      id: 'TXN-001238',
      type: 'Payment',
      amount: '$125.99',
      from: 'James Wilson',
      to: 'Credit Card',
      status: 'completed',
      timestamp: '2024-05-24 14:20:33'
    }
  ];

  const transactionTypes = [
    { type: 'Wire Transfers', count: 3456, volume: '$1.2M', avgAmount: '$347' },
    { type: 'Bill Payments', count: 4567, volume: '$890K', avgAmount: '$195' },
    { type: 'Direct Deposits', count: 2345, volume: '$780K', avgAmount: '$333' },
    { type: 'Investment Transfers', count: 1234, volume: '$560K', avgAmount: '$454' },
    { type: 'Loan Payments', count: 1245, volume: '$890K', avgAmount: '$715' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'pending': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'transfer': return ArrowUpRight;
      case 'deposit': return ArrowDownLeft;
      case 'payment': return CreditCard;
      default: return DollarSign;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Transaction Center</h1>
        <div className="text-sm text-muted-foreground">Transaction monitoring & management</div>
      </div>

      {/* Transaction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {transactionSummary.map((stat, index) => (
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

      {/* Recent Transactions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Recent Transactions</h2>
        <div className="space-y-3">
          {recentTransactions.map((transaction, index) => {
            const TransactionIcon = getTransactionIcon(transaction.type);
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <TransactionIcon className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-foreground">{transaction.id}</h3>
                    <p className="text-sm text-muted-foreground">{transaction.from} → {transaction.to}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="font-semibold text-foreground">{transaction.amount}</p>
                    <p className="text-xs text-muted-foreground">{transaction.type}</p>
                  </div>
                  <div className="text-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{transaction.timestamp}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Transaction Types Analysis */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Transaction Types Analysis</h2>
        <div className="space-y-4">
          {transactionTypes.map((type, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground">{type.type}</h3>
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Count</p>
                  <p className="font-semibold text-foreground">{type.count.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Volume</p>
                  <p className="font-semibold text-foreground">{type.volume}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Avg Amount</p>
                  <p className="font-semibold text-foreground">{type.avgAmount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Transaction Insights */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Transaction Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-900 dark:text-green-100">High Success Rate</h3>
            <p className="text-sm text-green-700 dark:text-green-300">99.2% of transactions complete successfully</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <Clock className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Fast Processing</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">Average processing time of 1.3 seconds</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <DollarSign className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-purple-900 dark:text-purple-100">Volume Growth</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300">15% increase in transaction volume this month</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TransactionCenter;