
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Lock, User, AlertCircle } from 'lucide-react';

const CMSLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Check for too many failed attempts
    const storedFailedAttempts = parseInt(localStorage.getItem('failed-login-attempts') || '0');
    if (storedFailedAttempts >= 5) {
      setError('Too many failed attempts. Please try again later.');
      return;
    }

    const success = await login(username, password);
    if (!success) {
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);
      setError('Invalid credentials. Please try again.');
      
      // Clear form on multiple failures for security
      if (newFailedAttempts >= 3) {
        setUsername('');
        setPassword('');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gryd-soft/5 flex items-center justify-center p-8">
      <Card className="w-full max-w-md border-gryd-soft/20">
        <CardHeader className="text-center">
          <CardTitle className="headline text-gryd-text flex items-center justify-center gap-2">
            <Lock className="w-6 h-6" />
            CMS Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="caption text-gryd-soft mb-2 block">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gryd-soft w-4 h-4" />
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.trim())}
                  className="pl-10 border-gryd-soft/20 focus:border-gryd-accent"
                  maxLength={50}
                  autoComplete="username"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <label className="caption text-gryd-soft mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gryd-soft w-4 h-4" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-gryd-soft/20 focus:border-gryd-accent"
                  maxLength={100}
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <p className="caption text-red-700">{error}</p>
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-gryd-accent hover:bg-gryd-accent/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Login'}
            </Button>
          </form>
          
          {/* Security notice instead of exposed credentials */}
          <div className="mt-6 p-4 bg-gryd-soft/10 rounded-lg">
            <p className="caption text-gryd-soft text-center">
              🔒 Secure CMS Access
            </p>
            <p className="caption text-gryd-soft/70 text-center text-xs mt-1">
              Contact administrator for access credentials
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CMSLogin;
