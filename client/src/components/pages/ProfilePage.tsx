import React from 'react';
import { Card } from '@/components/ui/card';
import { User, Mail, Phone, Shield, Calendar, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">User Profile</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
          <Edit className="h-4 w-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-xl font-bold">
                  {currentUser?.displayName?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{currentUser?.displayName || 'User'}</h3>
                <p className="text-muted-foreground">Call Center Analyst</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{currentUser?.username || 'user@ceruleansolutions.com'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-medium text-foreground">Senior Analyst</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Joined</p>
                  <p className="font-medium text-foreground">January 2023</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Activity Stats */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Activity Stats</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Dashboards Created</p>
              <p className="text-2xl font-bold text-foreground">12</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Reports Generated</p>
              <p className="text-2xl font-bold text-foreground">89</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Login</p>
              <p className="text-sm font-medium text-foreground">Today, 9:30 AM</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { action: 'Created Contact Center Dashboard', time: '2 hours ago' },
            { action: 'Updated Mobile Banking KPIs', time: '1 day ago' },
            { action: 'Generated Performance Report', time: '3 days ago' },
            { action: 'Modified Agent Analytics View', time: '1 week ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-foreground">{activity.action}</span>
              <span className="text-sm text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;