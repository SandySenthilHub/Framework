import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, UserPlus, Mail, Phone, Building, Calendar, Shield, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

// User form schema based on UsersManagement table structure
const userFormSchema = z.object({
  universeID: z.number().min(1, 'Universe ID is required'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  middleName: z.string().optional(),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  fullNameLocal: z.string().optional(),
  nationalID: z.string().optional(),
  passportNumber: z.string().optional(),
  idExpiryDate: z.string().optional(),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().optional(),
  passwordHash: z.string().optional(),
  passwordSalt: z.string().optional(),
  isLocked: z.boolean().optional(),
  isEmailVerified: z.boolean().optional(),
  isPhoneVerified: z.boolean().optional(),
  status: z.enum(['Active', 'Inactive', 'Suspended', 'Deleted']),
  languageID: z.number().optional(),
  countryID: z.number().optional(),
  stateID: z.number().optional(),
  cityID: z.number().optional(),
  timeZone: z.string().optional(),
  createdBy: z.string().optional(),
  isActive: z.boolean().optional(),
});

type UserFormData = z.infer<typeof userFormSchema>;

interface User {
  UserID: number;
  UniverseID: number;
  FirstName: string;
  MiddleName?: string;
  LastName: string;
  FullNameLocal?: string;
  NationalID?: string;
  PassportNumber?: string;
  IDExpiryDate?: string;
  Username: string;
  Email: string;
  PhoneNumber?: string;
  IsLocked: boolean;
  LockoutEnd?: string;
  IsLoggedIn: boolean;
  FailedLoginAttempts: number;
  IsEmailVerified: boolean;
  IsPhoneVerified: boolean;
  Status: string;
  LanguageID?: number;
  CountryID?: number;
  StateID?: number;
  CityID?: number;
  TimeZone?: string;
  CreatedAt: string;
  CreatedBy?: string;
  UpdatedAt?: string;
  UpdatedBy?: string;
  LastLogin?: string;
  IsActive: boolean;
  IsDeleted: boolean;
}

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      universeID: 1,
      firstName: 'John',
      middleName: 'Michael',
      lastName: 'Doe',
      fullNameLocal: 'John Michael Doe',
      nationalID: '123456789',
      passportNumber: 'A12345678',
      idExpiryDate: '2030-12-31',
      username: 'jdoe',
      email: 'john.doe@ceruleansolutions.com',
      phoneNumber: '+1-555-0123',
      isLocked: false,
      isEmailVerified: true,
      isPhoneVerified: false,
      status: 'Active',
      languageID: 1,
      countryID: 1,
      stateID: 1,
      cityID: 1,
      timeZone: 'UTC',
      createdBy: 'System Admin',
      isActive: true,
    },
  });

  // Edit form
  const editForm = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
  });

  // Fetch users from Call_Center SQL Database
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['http://localhost:5000/api/framework/users'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/api/framework/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      return response.json();
    },
  });

  // Add user mutation
  const addUserMutation = useMutation({
    mutationFn: async (userData: UserFormData) => {
      const response = await fetch('http://localhost:5000/api/framework/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Failed to add user');
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['http://localhost:5000/api/framework/users'] });
      queryClient.refetchQueries({ queryKey: ['http://localhost:5000/api/framework/users'] });
      setIsAddDialogOpen(false);
      form.reset();
      
      toast({
        title: "User Added Successfully",
        description: `User has been added to the database with ID: ${data.userId}`,
      });
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async ({ userId, userData }: { userId: number; userData: UserFormData }) => {
      const response = await fetch(`http://localhost:5000/api/framework/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Failed to update user');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['http://localhost:5000/api/framework/users'] });
      queryClient.refetchQueries({ queryKey: ['http://localhost:5000/api/framework/users'] });
      setIsEditDialogOpen(false);
      setEditingUser(null);
      editForm.reset();
      
      toast({
        title: "User Updated Successfully",
        description: "User information has been updated in the database",
      });
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      const response = await fetch(`http://localhost:5000/api/framework/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete user');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['http://localhost:5000/api/framework/users'] });
      queryClient.refetchQueries({ queryKey: ['http://localhost:5000/api/framework/users'] });
      
      toast({
        title: "User Deleted Successfully",
        description: "User has been removed from the database",
      });
    },
  });

  // Filter users based on search and status
  const filteredUsers = users.filter((user: User) => {
    const matchesSearch = 
      user.FirstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.LastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.Username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.NationalID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.PassportNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.Status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const onSubmit = (data: UserFormData) => {
    addUserMutation.mutate(data);
  };

  const onEditSubmit = (data: UserFormData) => {
    if (editingUser) {
      updateUserMutation.mutate({ userId: editingUser.UserID, userData: data });
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    editForm.reset({
      universeID: user.UniverseID,
      firstName: user.FirstName,
      middleName: user.MiddleName || '',
      lastName: user.LastName,
      fullNameLocal: user.FullNameLocal || '',
      nationalID: user.NationalID || '',
      passportNumber: user.PassportNumber || '',
      idExpiryDate: user.IDExpiryDate || '',
      username: user.Username,
      email: user.Email,
      phoneNumber: user.PhoneNumber || '',
      isLocked: user.IsLocked,
      isEmailVerified: user.IsEmailVerified,
      isPhoneVerified: user.IsPhoneVerified,
      status: user.Status as any,
      languageID: user.LanguageID || 1,
      countryID: user.CountryID || 1,
      stateID: user.StateID || 1,
      cityID: user.CityID || 1,
      timeZone: user.TimeZone || 'UTC',
      createdBy: user.CreatedBy || 'System',
      isActive: user.IsActive,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      deleteUserMutation.mutate(userId);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Inactive': return 'secondary';
      case 'Pending': return 'outline';
      case 'Suspended': return 'destructive';
      default: return 'secondary';
    }
  };

  const stats = [
    { title: 'Total Users', value: users.length, icon: UserPlus, color: 'text-blue-600' },
    { title: 'Active Users', value: users.filter((u: User) => u.Status === 'Active').length, icon: Shield, color: 'text-green-600' },
    { title: 'Locked Users', value: users.filter((u: User) => u.IsLocked).length, icon: Calendar, color: 'text-yellow-600' },
    { title: 'Suspended Users', value: users.filter((u: User) => u.Status === 'Suspended').length, icon: Building, color: 'text-red-600' },
  ];

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage system users and their permissions</p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={() => queryClient.invalidateQueries({ queryKey: ['http://localhost:5000/api/framework/users'] })}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add New User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account with the required information.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-96 overflow-y-auto">
                  {/* Basic Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="universeID"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Universe ID</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter universe ID" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="middleName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Middle Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter middle name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                            <SelectItem value="Suspended">Suspended</SelectItem>
                            <SelectItem value="Deleted">Deleted</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                      disabled={addUserMutation.isPending}
                    >
                      {addUserMutation.isPending ? 'Adding...' : 'Add User'}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          {/* Edit User Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
                <DialogDescription>
                  Update user information in the database.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...editForm}>
                <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4 max-h-96 overflow-y-auto">
                  {/* Basic Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={editForm.control}
                      name="universeID"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Universe ID</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter universe ID" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={editForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editForm.control}
                      name="middleName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Middle Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter middle name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={editForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={editForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Identification */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={editForm.control}
                      name="nationalID"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>National ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter national ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editForm.control}
                      name="passportNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passport Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter passport number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Status and Verification */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={editForm.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Inactive">Inactive</SelectItem>
                              <SelectItem value="Suspended">Suspended</SelectItem>
                              <SelectItem value="Deleted">Deleted</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={editForm.control}
                      name="timeZone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Zone</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter time zone" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={editForm.control}
                      name="isEmailVerified"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="mt-1"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Email Verified</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={editForm.control}
                      name="isPhoneVerified"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="mt-1"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Phone Verified</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={editForm.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="mt-1"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Active</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsEditDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                      disabled={updateUserMutation.isPending}
                    >
                      {updateUserMutation.isPending ? 'Updating...' : 'Update User'}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users by name, email, username, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="w-full sm:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Users ({filteredUsers.length})</h2>
        </div>
        
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
              <p className="text-gray-500 dark:text-gray-400 mt-4">Loading users...</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((user: User) => (
                  <tr key={user.UserID} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                            <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                              {user.FirstName?.[0]}{user.LastName?.[0]}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.FirstName} {user.MiddleName} {user.LastName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            @{user.Username}
                          </div>
                          {user.NationalID && (
                            <div className="text-xs text-gray-400 dark:text-gray-500">
                              ID: {user.NationalID}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {user.Email}
                      </div>
                      {user.PhoneNumber && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {user.PhoneNumber}
                        </div>
                      )}
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        Email: {user.IsEmailVerified ? '✓ Verified' : '✗ Unverified'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">Universe: {user.UniverseID}</div>
                      {user.PassportNumber && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">Passport: {user.PassportNumber}</div>
                      )}
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        Country: {user.CountryID || 'N/A'} | State: {user.StateID || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <Badge variant={getStatusBadgeVariant(user.Status) as any}>
                          {user.Status}
                        </Badge>
                        {user.IsLocked && (
                          <div className="text-xs text-red-600 dark:text-red-400">🔒 Locked</div>
                        )}
                        {user.IsLoggedIn && (
                          <div className="text-xs text-green-600 dark:text-green-400">🟢 Online</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div>
                        {user.LastLogin ? new Date(user.LastLogin).toLocaleDateString() : 'Never'}
                      </div>
                      <div className="text-xs text-gray-400">
                        Created: {new Date(user.CreatedAt).toLocaleDateString()}
                      </div>
                      {user.FailedLoginAttempts > 0 && (
                        <div className="text-xs text-red-500">
                          Failed attempts: {user.FailedLoginAttempts}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteUser(user.UserID)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;