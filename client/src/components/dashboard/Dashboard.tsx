import React, { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { Button } from '@/components/ui/button';
import { Save, BarChart3, Filter, Phone, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ChartWidget from './ChartWidget';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface DashboardProps {
  pageType: 'home' | 'contact_center' | 'mobile_banking';
}

const Dashboard: React.FC<DashboardProps> = ({ pageType }) => {
  const { isEditMode, saveDashboard, dashboards, activeDashboard } = useDashboard();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'contact_center' | 'mobile_banking'>('all');

  const handleSave = async () => {
    if (!activeDashboard) return;

    setIsSaving(true);
    try {
      await saveDashboard();
      toast({
        title: 'Dashboard saved',
        description: 'Your dashboard configuration has been saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error saving dashboard',
        description: 'There was an error saving your dashboard. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Enhanced KPI data with comprehensive metrics
  const kpiData = [
    {
      id: 'call_volume',
      name: 'Daily Call Volume',
      description: 'Total number of inbound calls received per day',
      type: 'contact_center',
      unit: 'calls',
      target: 2500,
      priority: 'critical'
    },
    {
      id: 'first_call_resolution',
      name: 'First Call Resolution',
      description: 'Percentage of calls resolved on first contact',
      type: 'contact_center',
      unit: '%',
      target: 85,
      priority: 'critical'
    },
    {
      id: 'agent_occupancy',
      name: 'Agent Occupancy Rate',
      description: 'Percentage of time agents spend handling calls',
      type: 'contact_center',
      unit: '%',
      target: 80,
      priority: 'high'
    },
    {
      id: 'aht',
      name: 'Average Handle Time',
      description: 'Average time taken to handle customer calls',
      type: 'contact_center',
      unit: 'minutes',
      target: 3.2,
      priority: 'critical'
    },
    {
      id: 'abandon_rate',
      name: 'Call Abandon Rate',
      description: 'Percentage of calls abandoned before being answered',
      type: 'contact_center',
      unit: '%',
      target: 5,
      priority: 'critical'
    },
    {
      id: 'csat_score',
      name: 'Customer Satisfaction',
      description: 'Overall customer satisfaction rating',
      type: 'contact_center',
      unit: 'score',
      target: 4.5,
      priority: 'high'
    },
    {
      id: 'mobile_transactions',
      name: 'Mobile Transactions',
      description: 'Daily mobile banking transaction volume',
      type: 'mobile_banking',
      unit: 'transactions',
      target: 15000,
      priority: 'critical'
    },
    {
      id: 'login_success_rate',
      name: 'Login Success Rate',
      description: 'Percentage of successful mobile app logins',
      type: 'mobile_banking',
      unit: '%',
      target: 98,
      priority: 'high'
    },
    {
      id: 'api_response_time',
      name: 'API Response Time',
      description: 'Average response time for banking APIs',
      type: 'mobile_banking',
      unit: 'ms',
      target: 250,
      priority: 'critical'
    },
    {
      id: 'fraud_detection',
      name: 'Fraud Detection Rate',
      description: 'Percentage of fraudulent transactions detected',
      type: 'mobile_banking',
      unit: '%',
      target: 99.5,
      priority: 'critical'
    },
    {
      id: 'app_crash_rate',
      name: 'App Crash Rate',
      description: 'Percentage of mobile app sessions ending in crashes',
      type: 'mobile_banking',
      unit: '%',
      target: 0.1,
      priority: 'medium'
    },
    {
      id: 'transaction_success',
      name: 'Transaction Success Rate',
      description: 'Percentage of successful transaction completions',
      type: 'mobile_banking',
      unit: '%',
      target: 99.8,
      priority: 'critical'
    }
  ];

  return (
    <div className="p-4">
      {/* Dashboard Controls */}
      <div className="mb-6 bg-card border rounded-lg p-4">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-foreground mb-1">Analytics Dashboard</h2>
            <p className="text-sm text-muted-foreground">Real-time insights for contact center and mobile banking operations</p>
          </div>

          <div className="flex flex-col space-y-3 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
            {/* Category Filter Buttons */}
            <div className="flex items-center space-x-2 bg-muted/50 p-1 rounded-lg">
              <Button
                variant={filterType === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilterType('all')}
                className="text-xs"
              >
                All Metrics
              </Button>
              <Button
                variant={filterType === 'contact_center' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilterType('contact_center')}
                className="text-xs"
              >
                <Phone className="mr-1 h-3 w-3" />
                Call Center
              </Button>
              <Button
                variant={filterType === 'mobile_banking' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilterType('mobile_banking')}
                className="text-xs"
              >
                <Smartphone className="mr-1 h-3 w-3" />
                Mobile Banking
              </Button>
            </div>

            {/* Search */}
            <div className="relative">
              <Input
                placeholder="Search metrics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>

            {/* Save Button */}
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
              size="sm"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {kpiData
          .filter(kpi => {
            // Filter by search term
            const matchesSearch = kpi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              kpi.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            // Filter by type
            const matchesType = filterType === 'all' || kpi.type === filterType;
            
            return matchesSearch && matchesType;
          })
          .map((kpi) => (
            <ChartWidget
              key={kpi.id}
              kpiDefinition={{
                ...kpi,
                calculation: `SELECT AVG(${kpi.id}) as value FROM metrics WHERE date >= DATEADD(day, -30, GETDATE())`,
                threshold: kpi.priority === 'critical' ? kpi.target * 0.9 : kpi.target * 0.8,
                isRealTime: kpi.priority === 'critical'
              }}
              chartType="area"
              showMetadata={true}
            />
          ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {kpiData.filter(k => filterType === 'all' || k.type === filterType).length}
            </div>
            <div className="text-sm text-muted-foreground">Total Metrics</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {kpiData.filter(k => (filterType === 'all' || k.type === filterType) && k.priority === 'critical').length}
            </div>
            <div className="text-sm text-muted-foreground">Critical KPIs</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {kpiData.filter(k => k.type === 'contact_center').length}
            </div>
            <div className="text-sm text-muted-foreground">Call Center</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {kpiData.filter(k => k.type === 'mobile_banking').length}
            </div>
            <div className="text-sm text-muted-foreground">Mobile Banking</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;