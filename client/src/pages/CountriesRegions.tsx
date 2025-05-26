import React from 'react';
import { Card } from '@/components/ui/card';
import { Globe, MapPin, Users, Building, Flag, TrendingUp } from 'lucide-react';

const CountriesRegions: React.FC = () => {
  const regions = [
    {
      name: 'North America',
      countries: 3,
      customers: 245678,
      revenue: '$1.8B',
      growth: '+12%',
      timeZones: 4,
      headquarters: 'New York, USA'
    },
    {
      name: 'Europe',
      countries: 8,
      customers: 189432,
      revenue: '$1.2B',
      growth: '+18%',
      timeZones: 3,
      headquarters: 'London, UK'
    },
    {
      name: 'Asia Pacific',
      countries: 6,
      customers: 156789,
      revenue: '$890M',
      growth: '+25%',
      timeZones: 5,
      headquarters: 'Singapore'
    },
    {
      name: 'Latin America',
      countries: 4,
      customers: 98765,
      revenue: '$445M',
      growth: '+15%',
      timeZones: 3,
      headquarters: 'São Paulo, Brazil'
    }
  ];

  const countries = [
    { name: 'United States', code: 'US', region: 'North America', customers: 156789, offices: 45, status: 'active' },
    { name: 'Canada', code: 'CA', region: 'North America', customers: 67890, offices: 12, status: 'active' },
    { name: 'Mexico', code: 'MX', region: 'North America', customers: 20999, offices: 5, status: 'active' },
    { name: 'United Kingdom', code: 'GB', region: 'Europe', customers: 89765, offices: 18, status: 'active' },
    { name: 'Germany', code: 'DE', region: 'Europe', customers: 45678, offices: 8, status: 'active' },
    { name: 'France', code: 'FR', region: 'Europe', customers: 34567, offices: 6, status: 'active' },
    { name: 'Singapore', code: 'SG', region: 'Asia Pacific', customers: 78901, offices: 3, status: 'active' },
    { name: 'Australia', code: 'AU', region: 'Asia Pacific', customers: 56789, offices: 7, status: 'active' },
  ];

  const systemStats = [
    { label: 'Total Regions', value: '4', icon: Globe },
    { label: 'Active Countries', value: '21', icon: Flag },
    { label: 'Global Customers', value: '690K', icon: Users },
    { label: 'Office Locations', value: '104', icon: Building },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'restricted': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Countries & Regions</h1>
        <div className="text-sm text-muted-foreground">Global presence management</div>
      </div>

      {/* Global Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => (
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

      {/* Regional Overview */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Regional Performance</h2>
        <div className="space-y-4">
          {regions.map((region, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-foreground">{region.name}</h3>
                    <p className="text-sm text-muted-foreground">HQ: {region.headquarters}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-green-600">{region.growth}</span>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Countries</p>
                  <p className="font-semibold text-foreground">{region.countries}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Customers</p>
                  <p className="font-semibold text-foreground">{region.customers.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Revenue</p>
                  <p className="font-semibold text-foreground">{region.revenue}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time Zones</p>
                  <p className="font-semibold text-foreground">{region.timeZones}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Country Details */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Country Operations</h2>
        <div className="space-y-3">
          {countries.map((country, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Flag className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{country.name} ({country.code})</h3>
                  <p className="text-sm text-muted-foreground">{country.region}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-foreground">{country.customers.toLocaleString()}</p>
                  <p className="text-muted-foreground">Customers</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{country.offices}</p>
                  <p className="text-muted-foreground">Offices</p>
                </div>
                <div className="text-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(country.status)}`}>
                    {country.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Regional Insights */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Global Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-900 dark:text-green-100">Fastest Growth</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Asia Pacific region leading with 25% growth rate</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <Users className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Largest Market</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">North America with 245K+ customers</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <Globe className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-purple-900 dark:text-purple-100">Global Reach</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300">Operations across 21 countries and 4 continents</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CountriesRegions;