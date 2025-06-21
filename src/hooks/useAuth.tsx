
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Parse the JWT payload
const parseJwt = (token: string) => {
  try {
    const base64 = token.split('.')[1];
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

// Validate token expiration
const isTokenValid = (token: string): boolean => {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return false;
  return Date.now() / 1000 < payload.exp;
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
      
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
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
