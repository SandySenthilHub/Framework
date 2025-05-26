import React from 'react';
import { Card } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown, RefreshCw, Globe, BarChart3 } from 'lucide-react';

const CurrencyManagement: React.FC = () => {
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.0000, change: '0.00%', volume: '$2.4B', status: 'active' },
    { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.9245, change: '+0.12%', volume: '$1.2B', status: 'active' },
    { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.7891, change: '-0.08%', volume: '$890M', status: 'active' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.3456, change: '+0.05%', volume: '$445M', status: 'active' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.5234, change: '-0.15%', volume: '$278M', status: 'active' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 149.8500, change: '+0.22%', volume: '$567M', status: 'active' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', rate: 0.8967, change: '-0.03%', volume: '$189M', status: 'active' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', rate: 1.3478, change: '+0.18%', volume: '$234M', status: 'active' },
  ];

  const exchangeStats = [
    { label: 'Active Currencies', value: '8', icon: DollarSign },
    { label: 'Daily Volume', value: '$6.2B', icon: BarChart3 },
    { label: 'Exchange Rate Updates', value: '24/7', icon: RefreshCw },
    { label: 'Global Markets', value: '21', icon: Globe },
  ];

  const rateHistory = [
    { currency: 'EUR/USD', rate: '0.9245', change: '+0.12%', trend: 'up' },
    { currency: 'GBP/USD', rate: '0.7891', change: '-0.08%', trend: 'down' },
    { currency: 'USD/JPY', rate: '149.85', change: '+0.22%', trend: 'up' },
    { currency: 'USD/CAD', rate: '1.3456', change: '+0.05%', trend: 'up' },
    { currency: 'AUD/USD', rate: '0.6567', change: '-0.15%', trend: 'down' },
  ];

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-green-600';
    if (change.startsWith('-')) return 'text-red-600';
    return 'text-gray-600';
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Currency Management</h1>
        <div className="text-sm text-muted-foreground">Exchange rates & currency operations</div>
      </div>

      {/* Currency Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {exchangeStats.map((stat, index) => (
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

      {/* Currency Exchange Rates */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Live Exchange Rates</h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4" />
            <span>Last updated: 2 minutes ago</span>
          </div>
        </div>
        <div className="space-y-3">
          {currencies.map((currency, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">{currency.symbol}</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{currency.code}</h3>
                  <p className="text-sm text-muted-foreground">{currency.name}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-foreground">{currency.rate}</p>
                  <p className="text-muted-foreground">Rate</p>
                </div>
                <div className="text-center">
                  <p className={`font-semibold ${getChangeColor(currency.change)}`}>{currency.change}</p>
                  <p className="text-muted-foreground">24h Change</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{currency.volume}</p>
                  <p className="text-muted-foreground">Volume</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Rate History & Trends */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Major Currency Pairs</h2>
        <div className="space-y-3">
          {rateHistory.map((pair, index) => {
            const TrendIcon = getTrendIcon(pair.trend);
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <TrendIcon className={`h-6 w-6 ${pair.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                  <div>
                    <h3 className="font-medium text-foreground">{pair.currency}</h3>
                    <p className="text-sm text-muted-foreground">Major pair</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="font-semibold text-foreground">{pair.rate}</p>
                    <p className="text-sm text-muted-foreground">Current Rate</p>
                  </div>
                  <div className="text-center">
                    <p className={`font-semibold ${getChangeColor(pair.change)}`}>{pair.change}</p>
                    <p className="text-sm text-muted-foreground">24h Change</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Currency Operations */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Currency Operations Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <DollarSign className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-900 dark:text-green-100">Foreign Exchange</h3>
            <p className="text-2xl font-bold text-green-800 dark:text-green-200">$4.8B</p>
            <p className="text-sm text-green-700 dark:text-green-300">Monthly FX volume</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <RefreshCw className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Rate Updates</h3>
            <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">1,440</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">Daily rate refreshes</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <Globe className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-purple-900 dark:text-purple-100">Market Coverage</h3>
            <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">99.8%</p>
            <p className="text-sm text-purple-700 dark:text-purple-300">Global market uptime</p>
          </div>
        </div>
      </Card>

      {/* Risk Management */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Risk Management</h2>
        <div className="space-y-3">
          <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
            <h3 className="font-medium text-green-900 dark:text-green-100">Currency Exposure</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Within acceptable risk limits across all major currencies</p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Hedging Strategy</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">Active hedging covers 85% of foreign currency exposure</p>
          </div>
          <div className="p-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg">
            <h3 className="font-medium text-orange-900 dark:text-orange-100">Volatility Alert</h3>
            <p className="text-sm text-orange-700 dark:text-orange-300">GBP showing increased volatility - monitoring closely</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CurrencyManagement;