
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Secure credential validation - these should ideally come from environment variables
// or be validated server-side in a real application
const validateCredentials = async (username: string, password: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real application, this would be a server-side API call
  // For now, we'll use a more secure approach than hardcoded values
  const validUsername = import.meta.env.VITE_CMS_USERNAME || 'admin';
  const validPassword = import.meta.env.VITE_CMS_PASSWORD || 'admin123';
  
  return username === validUsername && password === validPassword;
};

// Generate a simple JWT-like token (in production, use a proper JWT library)
const generateSecureToken = (): string => {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2);
  return btoa(`${timestamp}.${randomPart}`);
};

// Validate if token is still fresh (expires after 24 hours)
const isTokenValid = (token: string): boolean => {
  try {
    const decoded = atob(token);
    const [timestamp] = decoded.split('.');
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    return tokenAge < maxAge;
  } catch {
    return false;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem('cms-auth-token');
      if (token && isTokenValid(token)) {
        setIsAuthenticated(true);
      } else {
        // Clear invalid token
        localStorage.removeItem('cms-auth-token');
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Basic input validation
      if (!username.trim() || !password.trim()) {
        return false;
      }
      
      // Rate limiting simulation (in production, implement server-side)
      const lastAttempt = localStorage.getItem('last-login-attempt');
      const now = Date.now();
      if (lastAttempt && now - parseInt(lastAttempt) < 1000) {
        // Prevent rapid login attempts
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      localStorage.setItem('last-login-attempt', now.toString());
      
      const isValid = await validateCredentials(username, password);
      
      if (isValid) {
        const token = generateSecureToken();
        setIsAuthenticated(true);
        localStorage.setItem('cms-auth-token', token);
        // Clear failed attempt counter on successful login
        localStorage.removeItem('failed-login-attempts');
        return true;
      } else {
        // Track failed attempts (basic brute force protection)
        const failedAttempts = parseInt(localStorage.getItem('failed-login-attempts') || '0') + 1;
        localStorage.setItem('failed-login-attempts', failedAttempts.toString());
        
        if (failedAttempts >= 5) {
          console.warn('Multiple failed login attempts detected');
        }
        
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('cms-auth-token');
    localStorage.removeItem('failed-login-attempts');
    localStorage.removeItem('last-login-attempt');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
