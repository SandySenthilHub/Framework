import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboard } from '@/contexts/DashboardContext';
import { Edit2, User, BellIcon, ChevronDownIcon, HeadphonesIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemeSwitcher, ThemeSwitcherButton } from '@/components/theme/ThemeSwitcher';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const pageNames: Record<string, string> = {
  '/': 'Dashboard',
  '/contact-center': 'Contact Center Analytics',
  '/mobile-banking': 'Mobile Banking Analytics',
  '/ivr-analytics': 'IVR Analytics',
  '/cognitive-services': 'Cognitive Services',
  '/settings': 'Settings',
};

const Header: React.FC = () => {
  const [location] = useLocation();
  const { users, currentUser, setCurrentUser } = useAuth();
  const { isEditMode, setIsEditMode, timeRange, setTimeRange } = useDashboard();
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);

  const pageName = pageNames[location] || 'Contact Center & Mobile Banking Dashboard';
  const pageDescription = location === '/' 
    ? 'Overview of key performance metrics and analytics'
    : '';

  const [notifications] = useState<number>(3);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <HeadphonesIcon className="text-primary h-6 w-6 mr-2" />
          <span className="text-foreground font-semibold text-xl">{pageName}</span>
        </div>
        <div className="flex items-center space-x-4">
          {/* Time Range Selector */}
          <div className="hidden md:block">
            <Select 
              value={timeRange} 
              onValueChange={(value: string) => setTimeRange(value as any)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <BellIcon className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {notifications}
                </span>
              )}
            </Button>
          </div>
          
          {/* Theme Switcher */}
          <ThemeSwitcherButton onClick={() => setIsThemeDialogOpen(true)} />
          <ThemeSwitcher 
            isOpen={isThemeDialogOpen} 
            onClose={() => setIsThemeDialogOpen(false)} 
          />
          
          {/* Edit Dashboard Mode Toggle */}
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isEditMode 
                ? 'bg-primary text-primary-foreground shadow-lg' 
                : 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary'
              }`}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            <Edit2 className="h-4 w-4 mr-2 inline" />
            <span className="hidden md:inline">Customize</span>
          </button>
          
          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" alt="User avatar" />
                  <AvatarFallback>{currentUser?.displayName?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block">{currentUser?.displayName || 'User'}</span>
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Select 
                  value={currentUser?.username || ''} 
                  onValueChange={(value: string) => {
                    const user = users.find(u => u.username === value);
                    if (user) setCurrentUser(user);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Switch User" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map(user => (
                      <SelectItem key={user.id} value={user.username}>
                        {user.displayName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
