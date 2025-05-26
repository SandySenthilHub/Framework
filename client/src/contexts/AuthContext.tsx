import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Tenant } from '@/lib/types';
import { apiRequest } from '@/lib/queryClient';

interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  currentTenant: Tenant | null;
  setCurrentTenant: (tenant: Tenant | null) => void;
  users: User[];
  tenants: Tenant[];
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  currentTenant: null,
  setCurrentTenant: () => {},
  users: [],
  tenants: [],
  isLoading: true,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load tenants on mount
 useEffect(() => {
  const loadTenants = async () => {
    try {
const response = await fetch('http://localhost:5000/api/tenants');
      console.log("Tenant fetch response status:", response.status);
      
      if (!response.ok) throw new Error('Failed to load tenants');

      const data = await response.json();
      console.log("Fetched tenants:", data);
      
      setTenants(data);

      // Set default tenant if none is selected
      if (!currentTenant && data.length > 0) {
        setCurrentTenant(data[0]);
      }
    } catch (err) {
      console.error('Failed to load tenants:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  loadTenants();
}, []);


  // Load users when tenant changes
  useEffect(() => {
    if (!currentTenant) return;

    const loadUsers = async () => {
      try {
        const response = await fetch(`/api/users?tenantId=${currentTenant.id}`);
        if (!response.ok) throw new Error('Failed to load users');
        
        const data = await response.json();
        setUsers(data);
        
        // Set default user if none is selected
        if (!currentUser && data.length > 0) {
          setCurrentUser(data[0]);
        }
      } catch (error) {
        console.error('Failed to load users:', error);
        // Initialize with default users if API fails
        const defaultUsers = [
          { id: 1, username: 'admin', displayName: 'Admin', role: 'admin', tenantId: currentTenant.id },
          { id: 2, username: 'hameed', displayName: 'Hameed', role: 'manager', tenantId: currentTenant.id },
          { id: 3, username: 'rishi', displayName: 'Rishi', role: 'analyst', tenantId: currentTenant.id }
        ];
        setUsers(defaultUsers);
        if (!currentUser) {
          setCurrentUser(defaultUsers[0]);
        }
      }
    };

    loadUsers();
  }, [currentTenant]);

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('isAuthenticated');
  };

  const isAuthenticated = !!currentUser;

  return (
    <AuthContext.Provider 
      value={{ 
        currentUser, 
        setCurrentUser, 
        currentTenant, 
        setCurrentTenant,
        users,
        tenants,
        isLoading,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
