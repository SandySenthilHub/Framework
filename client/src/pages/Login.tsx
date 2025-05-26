import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dummy authentication - accept any credentials
    if (isSignUp) {
      login({ id: 1, username: email, displayName: name || email, email });
    } else {
      login({ id: 1, username: email, displayName: email, email });
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-blue-700"></div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-4">
                <span className="text-primary font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold">Metronic</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Banking Call Center
              <br />
              Intelligence Platform
            </h1>
            <p className="text-lg opacity-90">
              Advanced analytics and insights for modern banking operations
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              Real-time contact center analytics
            </div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              Mobile banking performance insights
            </div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              AI-powered customer intelligence
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {isSignUp ? 'Create Account' : 'Welcome back'}
            </h2>
            <p className="text-muted-foreground">
              {isSignUp 
                ? 'Create your account to get started' 
                : 'Sign in to your account to continue'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-primary border-border rounded focus:ring-primary" />
                  <span className="ml-2 text-sm text-muted-foreground">Remember me</span>
                </label>
                <button type="button" className="text-sm text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary font-medium hover:underline"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>

          <div className="mt-8 text-center">
            <div className="text-xs text-muted-foreground">
              Demo credentials: Any email and password will work
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;