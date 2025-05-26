import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  Brain,
  Phone,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Eye,
  Play,
  Volume2,
  MessageCircle,
  FileText,
  BarChart3,
  Target,
  Award,
  Headphones,
  Mic,
  PieChart,
  Settings,
  RefreshCw,
  Calendar
} from 'lucide-react';

interface ContactData {
  id: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  lastContact: string;
  contactType: 'inbound' | 'outbound';
  status: 'active' | 'resolved' | 'pending' | 'escalated';
  agent: string;
  department: string;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  notes: string;
}

interface CallAnalytics {
  totalCalls: number;
  avgCallDuration: number;
  sentimentScore: number;
  resolutionRate: number;
  escalationRate: number;
  customerSatisfaction: number;
  agentPerformance: number;
  issueCategories: { category: string; count: number; percentage: number }[];
}

interface SmartInsights {
  id: string;
  type: 'trend' | 'anomaly' | 'opportunity' | 'risk';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  actionRequired: boolean;
  timestamp: string;
}

interface CustomerJourney {
  id: string;
  customerName: string;
  touchpoints: {
    timestamp: string;
    channel: 'phone' | 'email' | 'chat' | 'web' | 'mobile';
    interaction: string;
    outcome: string;
    sentiment: number;
  }[];
  overallSentiment: number;
  resolutionStatus: 'resolved' | 'in-progress' | 'escalated';
}

const ContactCenterIntelligence: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('contacts');
  const [searchTerm, setSearchTerm] = useState('');

  // Contact management data
  const contacts: ContactData[] = [
    {
      id: 'contact-001',
      customerName: 'John Anderson',
      phoneNumber: '+1-555-0123',
      email: 'john.anderson@email.com',
      lastContact: '2025-05-23T14:30:00Z',
      contactType: 'inbound',
      status: 'active',
      agent: 'Sarah Johnson',
      department: 'Technical Support',
      priority: 'high',
      tags: ['VIP', 'Technical Issue', 'Escalation'],
      notes: 'Customer experiencing connectivity issues with premium service. Requires senior technical support.'
    },
    {
      id: 'contact-002',
      customerName: 'Lisa Rodriguez',
      phoneNumber: '+1-555-0124',
      email: 'lisa.rodriguez@email.com',
      lastContact: '2025-05-23T13:45:00Z',
      contactType: 'inbound',
      status: 'resolved',
      agent: 'Michael Chen',
      department: 'Billing Support',
      priority: 'medium',
      tags: ['Billing', 'Payment Issue'],
      notes: 'Billing inquiry resolved. Payment plan established.'
    },
    {
      id: 'contact-003',
      customerName: 'David Kim',
      phoneNumber: '+1-555-0125',
      email: 'david.kim@email.com',
      lastContact: '2025-05-23T12:15:00Z',
      contactType: 'outbound',
      status: 'pending',
      agent: 'Emily Rodriguez',
      department: 'Customer Service',
      priority: 'low',
      tags: ['Follow-up', 'Survey'],
      notes: 'Scheduled follow-up call for satisfaction survey.'
    }
  ];

  // Call analytics data
  const analytics: CallAnalytics = {
    totalCalls: 2847,
    avgCallDuration: 367,
    sentimentScore: 0.72,
    resolutionRate: 87.3,
    escalationRate: 8.7,
    customerSatisfaction: 4.3,
    agentPerformance: 89.2,
    issueCategories: [
      { category: 'Technical Support', count: 1247, percentage: 43.8 },
      { category: 'Billing Issues', count: 854, percentage: 30.0 },
      { category: 'Account Management', count: 426, percentage: 15.0 },
      { category: 'Product Information', count: 213, percentage: 7.5 },
      { category: 'Complaints', count: 107, percentage: 3.7 }
    ]
  };

  // Smart insights
  const insights: SmartInsights[] = [
    {
      id: 'insight-001',
      type: 'trend',
      title: 'Increasing Technical Support Calls',
      description: 'Technical support calls increased by 23% in the last week, primarily related to connectivity issues.',
      impact: 'high',
      confidence: 94,
      actionRequired: true,
      timestamp: '2025-05-23T14:00:00Z'
    },
    {
      id: 'insight-002',
      type: 'opportunity',
      title: 'Self-Service Opportunity',
      description: '67% of billing inquiries could be resolved through enhanced self-service options.',
      impact: 'medium',
      confidence: 87,
      actionRequired: false,
      timestamp: '2025-05-23T13:30:00Z'
    },
    {
      id: 'insight-003',
      type: 'anomaly',
      title: 'Unusual Call Pattern Detected',
      description: 'Spike in calls from specific area code suggests potential service outage.',
      impact: 'high',
      confidence: 92,
      actionRequired: true,
      timestamp: '2025-05-23T12:45:00Z'
    }
  ];

  // Customer journey data
  const customerJourneys: CustomerJourney[] = [
    {
      id: 'journey-001',
      customerName: 'John Anderson',
      touchpoints: [
        {
          timestamp: '2025-05-20T10:00:00Z',
          channel: 'web',
          interaction: 'Visited support page',
          outcome: 'Downloaded troubleshooting guide',
          sentiment: 0.6
        },
        {
          timestamp: '2025-05-21T14:30:00Z',
          channel: 'chat',
          interaction: 'Initiated live chat',
          outcome: 'Partial resolution provided',
          sentiment: 0.4
        },
        {
          timestamp: '2025-05-23T14:30:00Z',
          channel: 'phone',
          interaction: 'Called technical support',
          outcome: 'In progress',
          sentiment: 0.3
        }
      ],
      overallSentiment: 0.43,
      resolutionStatus: 'in-progress'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Activity className="h-4 w-4 text-blue-500" />;
      case 'resolved': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'escalated': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <XCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      active: 'default',
      resolved: 'secondary',
      pending: 'outline',
      escalated: 'destructive'
    };
    return variants[status] || 'secondary';
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, any> = {
      high: 'destructive',
      medium: 'default',
      low: 'secondary'
    };
    return variants[priority] || 'secondary';
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend': return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case 'anomaly': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'opportunity': return <Target className="h-4 w-4 text-green-500" />;
      case 'risk': return <XCircle className="h-4 w-4 text-orange-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'phone': return <Phone className="h-4 w-4 text-blue-500" />;
      case 'email': return <FileText className="h-4 w-4 text-purple-500" />;
      case 'chat': return <MessageCircle className="h-4 w-4 text-green-500" />;
      case 'web': return <BarChart3 className="h-4 w-4 text-orange-500" />;
      case 'mobile': return <Phone className="h-4 w-4 text-indigo-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSentimentColor = (score: number) => {
    if (score >= 0.7) return 'text-green-600';
    if (score >= 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredContacts = contacts.filter(contact =>
    contact.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phoneNumber.includes(searchTerm) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contact Center Intelligence</h1>
          <p className="text-muted-foreground">
            Comprehensive contact management and intelligent analytics for superior customer experience
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filter
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Intelligence Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Contacts</p>
                <p className="text-2xl font-bold">{analytics.totalCalls.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolution Rate</p>
                <p className="text-2xl font-bold">{analytics.resolutionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sentiment Score</p>
                <p className={`text-2xl font-bold ${getSentimentColor(analytics.sentimentScore)}`}>
                  {(analytics.sentimentScore * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer Satisfaction</p>
                <p className="text-2xl font-bold">{analytics.customerSatisfaction}/5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="contacts">Contact Hub</TabsTrigger>
          <TabsTrigger value="analytics">Call Intelligence</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="journey">Customer Journey</TabsTrigger>
          <TabsTrigger value="transcription">Speech Analytics</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          <TabsTrigger value="predictions">Predictive Analytics</TabsTrigger>
          <TabsTrigger value="automation">Smart Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Contact Management</CardTitle>
                  <CardDescription>Comprehensive contact tracking and interaction history</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search contacts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                  <Button className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    New Contact
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.customerName}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{contact.phoneNumber}</div>
                          <div className="text-xs text-muted-foreground">{contact.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(contact.lastContact).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={contact.contactType === 'inbound' ? 'default' : 'secondary'}>
                          {contact.contactType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(contact.status)}
                          <Badge variant={getStatusBadge(contact.status)}>
                            {contact.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityBadge(contact.priority)}>
                          {contact.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{contact.agent}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Call Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Average Call Duration</span>
                    <span className="font-semibold">{formatTime(analytics.avgCallDuration)}</span>
                  </div>
                  <Progress value={(analytics.avgCallDuration / 600) * 100} />

                  <div className="flex justify-between items-center">
                    <span>Resolution Rate</span>
                    <span className="font-semibold text-green-600">{analytics.resolutionRate}%</span>
                  </div>
                  <Progress value={analytics.resolutionRate} />

                  <div className="flex justify-between items-center">
                    <span>Escalation Rate</span>
                    <span className="font-semibold text-orange-600">{analytics.escalationRate}%</span>
                  </div>
                  <Progress value={analytics.escalationRate} />

                  <div className="flex justify-between items-center">
                    <span>Agent Performance</span>
                    <span className="font-semibold text-blue-600">{analytics.agentPerformance}%</span>
                  </div>
                  <Progress value={analytics.agentPerformance} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Issue Categories Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.issueCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{category.category}</span>
                        <span className="text-sm font-semibold">{category.count} ({category.percentage}%)</span>
                      </div>
                      <Progress value={category.percentage} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-3 border rounded">
                  <p className="text-2xl font-bold text-green-600">↑ 12%</p>
                  <p className="text-sm text-muted-foreground">Resolution Rate</p>
                </div>
                <div className="text-center p-3 border rounded">
                  <p className="text-2xl font-bold text-blue-600">↓ 8%</p>
                  <p className="text-sm text-muted-foreground">Avg Handle Time</p>
                </div>
                <div className="text-center p-3 border rounded">
                  <p className="text-2xl font-bold text-purple-600">↑ 15%</p>
                  <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
                </div>
                <div className="text-center p-3 border rounded">
                  <p className="text-2xl font-bold text-orange-600">↓ 5%</p>
                  <p className="text-sm text-muted-foreground">Escalation Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>Intelligent analysis and actionable recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight) => (
                  <div key={insight.id} className="border rounded p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        {getInsightIcon(insight.type)}
                        <div>
                          <h4 className="font-semibold">{insight.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(insight.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={insight.impact === 'high' ? 'destructive' : insight.impact === 'medium' ? 'default' : 'secondary'}>
                          {insight.impact} impact
                        </Badge>
                        <Badge variant="outline">
                          {insight.confidence}% confidence
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm">{insight.description}</p>

                    {insight.actionRequired && (
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Action required: This insight requires immediate attention from the management team.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm">
                        Take Action
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journey" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Journey Mapping</CardTitle>
              <CardDescription>Track customer interactions across all touchpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {customerJourneys.map((journey) => (
                  <div key={journey.id} className="border rounded p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{journey.customerName}</h4>
                        <p className="text-sm text-muted-foreground">
                          Overall Sentiment: 
                          <span className={`ml-2 font-semibold ${getSentimentColor(journey.overallSentiment)}`}>
                            {(journey.overallSentiment * 100).toFixed(0)}%
                          </span>
                        </p>
                      </div>
                      <Badge variant={journey.resolutionStatus === 'resolved' ? 'default' : 'secondary'}>
                        {journey.resolutionStatus}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-medium">Journey Timeline</h5>
                      {journey.touchpoints.map((touchpoint, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 border rounded">
                          {getChannelIcon(touchpoint.channel)}
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{touchpoint.interaction}</p>
                                <p className="text-sm text-muted-foreground">{touchpoint.outcome}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-muted-foreground">
                                  {new Date(touchpoint.timestamp).toLocaleString()}
                                </p>
                                <p className={`text-sm font-semibold ${getSentimentColor(touchpoint.sentiment)}`}>
                                  {(touchpoint.sentiment * 100).toFixed(0)}% sentiment
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transcription" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Speech Analytics</CardTitle>
              <CardDescription>Live transcription and conversation analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Live Transcription Status</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border rounded">
                      <p className="text-2xl font-bold text-green-600">94.7%</p>
                      <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                    </div>
                    <div className="text-center p-3 border rounded">
                      <p className="text-2xl font-bold text-blue-600">89</p>
                      <p className="text-sm text-muted-foreground">Active Sessions</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Language Detection</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>English</span>
                      <span className="font-semibold">78%</span>
                    </div>
                    <Progress value={78} />
                    <div className="flex justify-between items-center">
                      <span>Spanish</span>
                      <span className="font-semibold">15%</span>
                    </div>
                    <Progress value={15} />
                    <div className="flex justify-between items-center">
                      <span>French</span>
                      <span className="font-semibold">7%</span>
                    </div>
                    <Progress value={7} />
                  </div>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Call ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>Keywords</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">#CALL-001</TableCell>
                    <TableCell>John Anderson</TableCell>
                    <TableCell>Sarah Johnson</TableCell>
                    <TableCell>English</TableCell>
                    <TableCell>96.3%</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">billing</Badge>
                        <Badge variant="outline" className="text-xs">refund</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">#CALL-002</TableCell>
                    <TableCell>Maria Garcia</TableCell>
                    <TableCell>Carlos Martinez</TableCell>
                    <TableCell>Spanish</TableCell>
                    <TableCell>92.8%</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">soporte</Badge>
                        <Badge variant="outline" className="text-xs">técnico</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Sentiment Analysis</CardTitle>
              <CardDescription>Real-time emotion detection and customer satisfaction monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 border rounded">
                  <p className="text-2xl font-bold text-green-600">72%</p>
                  <p className="text-sm text-muted-foreground">Positive Sentiment</p>
                  <p className="text-xs text-green-600">↑ 5% vs last week</p>
                </div>
                <div className="text-center p-4 border rounded">
                  <p className="text-2xl font-bold text-yellow-600">21%</p>
                  <p className="text-sm text-muted-foreground">Neutral Sentiment</p>
                  <p className="text-xs text-gray-600">↓ 2% vs last week</p>
                </div>
                <div className="text-center p-4 border rounded">
                  <p className="text-2xl font-bold text-red-600">7%</p>
                  <p className="text-sm text-muted-foreground">Negative Sentiment</p>
                  <p className="text-xs text-red-600">↓ 3% vs last week</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Emotion Distribution</h4>
                  <div className="space-y-3">
                    {[
                      { emotion: 'Satisfied', percentage: 45, color: 'text-green-600' },
                      { emotion: 'Frustrated', percentage: 23, color: 'text-red-600' },
                      { emotion: 'Neutral', percentage: 18, color: 'text-gray-600' },
                      { emotion: 'Confused', percentage: 14, color: 'text-yellow-600' }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{item.emotion}</span>
                          <span className={`text-sm font-semibold ${item.color}`}>{item.percentage}%</span>
                        </div>
                        <Progress value={item.percentage} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Real-time Sentiment Alerts</h4>
                  <div className="space-y-3">
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Negative Sentiment Alert:</strong> Call #CALL-003 showing declining satisfaction
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Positive Trend:</strong> Agent Sarah Johnson consistently achieving high satisfaction scores
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-4">Sentiment Timeline</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Call ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Start Sentiment</TableHead>
                      <TableHead>End Sentiment</TableHead>
                      <TableHead>Change</TableHead>
                      <TableHead>Key Emotions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono">#CALL-001</TableCell>
                      <TableCell>John Anderson</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Negative (0.2)</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">Positive (0.8)</Badge>
                      </TableCell>
                      <TableCell className="text-green-600 font-semibold">↑ +0.6</TableCell>
                      <TableCell>Frustrated → Satisfied</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono">#CALL-002</TableCell>
                      <TableCell>Lisa Rodriguez</TableCell>
                      <TableCell>
                        <Badge variant="outline">Neutral (0.5)</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">Positive (0.7)</Badge>
                      </TableCell>
                      <TableCell className="text-green-600 font-semibold">↑ +0.2</TableCell>
                      <TableCell>Neutral → Happy</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Analytics Engine</CardTitle>
              <CardDescription>AI-powered forecasting and trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Call Volume Predictions</h4>
                  <div className="space-y-3">
                    <div className="border rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Next Hour</span>
                        <Badge variant="default">High Confidence</Badge>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">187 calls</p>
                      <p className="text-sm text-muted-foreground">±12 calls (94% accuracy)</p>
                    </div>
                    <div className="border rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Tomorrow Peak</span>
                        <Badge variant="secondary">Medium Confidence</Badge>
                      </div>
                      <p className="text-2xl font-bold text-purple-600">234 calls</p>
                      <p className="text-sm text-muted-foreground">10:00 AM - 11:00 AM (87% accuracy)</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Customer Behavior Predictions</h4>
                  <div className="space-y-3">
                    <div className="border rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Churn Risk</span>
                        <Badge variant="destructive">High Risk</Badge>
                      </div>
                      <p className="text-2xl font-bold text-red-600">23 customers</p>
                      <p className="text-sm text-muted-foreground">Predicted to churn this month</p>
                    </div>
                    <div className="border rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Escalation Likelihood</span>
                        <Badge variant="secondary">Moderate</Badge>
                      </div>
                      <p className="text-2xl font-bold text-orange-600">8.7%</p>
                      <p className="text-sm text-muted-foreground">Current calls may escalate</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Staffing Recommendations</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time Period</TableHead>
                      <TableHead>Predicted Volume</TableHead>
                      <TableHead>Current Staff</TableHead>
                      <TableHead>Recommended Staff</TableHead>
                      <TableHead>Action Needed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>11:00 AM - 12:00 PM</TableCell>
                      <TableCell>245 calls</TableCell>
                      <TableCell>15 agents</TableCell>
                      <TableCell>18 agents</TableCell>
                      <TableCell>
                        <Badge variant="destructive">+3 agents needed</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2:00 PM - 3:00 PM</TableCell>
                      <TableCell>156 calls</TableCell>
                      <TableCell>12 agents</TableCell>
                      <TableCell>10 agents</TableCell>
                      <TableCell>
                        <Badge variant="secondary">-2 agents surplus</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Intelligent Automation Hub</CardTitle>
              <CardDescription>Smart workflows and automated response systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Active Automations</h4>
                  <div className="space-y-3">
                    <div className="border rounded p-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Auto-Response System</span>
                        <Badge variant="default">Running</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Automated responses for common inquiries
                      </p>
                      <p className="text-xs text-green-600 mt-2">
                        Resolved 247 inquiries today (87% success rate)
                      </p>
                    </div>
                    
                    <div className="border rounded p-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Smart Call Routing</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        AI-powered call distribution based on agent skills
                      </p>
                      <p className="text-xs text-blue-600 mt-2">
                        12% improvement in first-call resolution
                      </p>
                    </div>

                    <div className="border rounded p-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Sentiment Monitoring</span>
                        <Badge variant="default">Live</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Real-time emotion detection and alerts
                      </p>
                      <p className="text-xs text-purple-600 mt-2">
                        Prevented 15 potential escalations today
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Automation Performance</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border rounded">
                      <p className="text-2xl font-bold text-green-600">89.3%</p>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                    </div>
                    <div className="text-center p-3 border rounded">
                      <p className="text-2xl font-bold text-blue-600">34%</p>
                      <p className="text-sm text-muted-foreground">Cost Reduction</p>
                    </div>
                    <div className="text-center p-3 border rounded">
                      <p className="text-2xl font-bold text-purple-600">1,247</p>
                      <p className="text-sm text-muted-foreground">Automated Actions</p>
                    </div>
                    <div className="text-center p-3 border rounded">
                      <p className="text-2xl font-bold text-orange-600">2.3s</p>
                      <p className="text-sm text-muted-foreground">Avg Response Time</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-medium">Workflow Suggestions</h5>
                    <Alert>
                      <Brain className="h-4 w-4" />
                      <AlertDescription>
                        <strong>New Automation Opportunity:</strong> 67% of billing inquiries follow similar patterns - consider creating automated workflow
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Automation Rules Engine</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rule Name</TableHead>
                      <TableHead>Trigger Condition</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Success Rate</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">VIP Customer Route</TableCell>
                      <TableCell>Customer tier = VIP</TableCell>
                      <TableCell>Route to senior agent queue</TableCell>
                      <TableCell>94.7%</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Negative Sentiment Alert</TableCell>
                      <TableCell>Sentiment score &lt; 0.3</TableCell>
                      <TableCell>Notify supervisor</TableCell>
                      <TableCell>87.2%</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContactCenterIntelligence;