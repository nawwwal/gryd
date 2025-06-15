
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Lock, User } from 'lucide-react';

const CMSLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError('Invalid credentials');
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
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 border-gryd-soft/20 focus:border-gryd-accent"
                  required
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
                  required
                />
              </div>
            </div>
            {error && (
              <p className="caption text-red-500">{error}</p>
            )}
            <Button 
              type="submit" 
              className="w-full bg-gryd-accent hover:bg-gryd-accent/90 text-white"
            >
              Login
            </Button>
          </form>
          <div className="mt-6 p-4 bg-gryd-soft/10 rounded-lg">
            <p className="caption text-gryd-soft text-center">
              Default credentials: admin / admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CMSLogin;
