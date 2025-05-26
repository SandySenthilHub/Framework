import React from 'react';
import { Card } from '@/components/ui/card';
import { Building2, Users, MapPin, Phone, Mail, TrendingUp } from 'lucide-react';

const Companies: React.FC = () => {
  const companies = [
    {
      name: 'Cerulean Bank Holdings',
      type: 'Parent Company',
      employees: 2847,
      locations: 45,
      revenue: '$2.4B',
      status: 'active',
      founded: '1995',
      headquarters: 'New York, NY'
    },
    {
      name: 'Cerulean Retail Banking',
      type: 'Subsidiary',
      employees: 1230,
      locations: 28,
      revenue: '$890M',
      status: 'active',
      founded: '2001',
      headquarters: 'Chicago, IL'
    },
    {
      name: 'Cerulean Investment Services',
      type: 'Subsidiary',
      employees: 456,
      locations: 8,
      revenue: '$340M',
      status: 'active',
      founded: '2005',
      headquarters: 'Boston, MA'
    },
    {
      name: 'Cerulean Digital Banking',
      type: 'Division',
      employees: 234,
      locations: 3,
      revenue: '$156M',
      status: 'expanding',
      founded: '2018',
      headquarters: 'San Francisco, CA'
    },
    {
      name: 'Cerulean Insurance Corp',
      type: 'Subsidiary',
      employees: 567,
      locations: 12,
      revenue: '$278M',
      status: 'active',
      founded: '2010',
      headquarters: 'Atlanta, GA'
    }
  ];

  const companyStats = [
    { label: 'Total Companies', value: '5', icon: Building2 },
    { label: 'Total Employees', value: '5,334', icon: Users },
    { label: 'Global Locations', value: '96', icon: MapPin },
    { label: 'Combined Revenue', value: '$4.1B', icon: TrendingUp },
  ];

  const departments = [
    { name: 'Customer Service', employees: 1456, companies: 5 },
    { name: 'Operations', employees: 987, companies: 4 },
    { name: 'Technology', employees: 834, companies: 5 },
    { name: 'Risk Management', employees: 445, companies: 3 },
    { name: 'Compliance', employees: 278, companies: 5 },
    { name: 'Human Resources', employees: 234, companies: 4 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'expanding': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'restructuring': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Companies</h1>
        <div className="text-sm text-muted-foreground">Corporate structure & organization</div>
      </div>

      {/* Company Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {companyStats.map((stat, index) => (
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

      {/* Company List */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Corporate Structure</h2>
        <div className="space-y-4">
          {companies.map((company, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <Building2 className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-foreground">{company.name}</h3>
                    <p className="text-sm text-muted-foreground">{company.type} • Founded {company.founded}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(company.status)}`}>
                  {company.status}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Employees</p>
                  <p className="font-semibold text-foreground">{company.employees.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Locations</p>
                  <p className="font-semibold text-foreground">{company.locations}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Revenue</p>
                  <p className="font-semibold text-foreground">{company.revenue}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Headquarters</p>
                  <p className="font-semibold text-foreground">{company.headquarters}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Department Distribution */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Department Distribution</h2>
        <div className="space-y-3">
          {departments.map((dept, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Users className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-foreground">{dept.name}</h3>
                  <p className="text-sm text-muted-foreground">Across {dept.companies} companies</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{dept.employees.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">employees</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Company Performance */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Performance Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-900 dark:text-green-100">Revenue Growth</h3>
            <p className="text-2xl font-bold text-green-800 dark:text-green-200">+12.4%</p>
            <p className="text-sm text-green-700 dark:text-green-300">Year over year growth</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <Users className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Workforce Expansion</h3>
            <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">+8.7%</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">Employee growth rate</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <MapPin className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-purple-900 dark:text-purple-100">Market Presence</h3>
            <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">96</p>
            <p className="text-sm text-purple-700 dark:text-purple-300">Global locations</p>
          </div>
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Corporate Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Phone className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium text-foreground">Corporate Headquarters</h3>
            </div>
            <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
            <p className="text-sm text-muted-foreground">Mon-Fri 9:00 AM - 6:00 PM EST</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium text-foreground">Corporate Communications</h3>
            </div>
            <p className="text-sm text-muted-foreground">corporate@ceruleanbank.com</p>
            <p className="text-sm text-muted-foreground">investor.relations@ceruleanbank.com</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Companies;