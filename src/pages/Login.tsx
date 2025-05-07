
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(id, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/70">
      <Card className="w-[350px] border-border/30 bg-card/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Quest Editor</CardTitle>
          <p className="text-center text-muted-foreground">Enter your credentials to continue</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="id" className="text-sm font-medium">
                ID
              </label>
              <Input
                id="id"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                className="bg-card/50"
                placeholder="Enter your ID"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-card/50"
                placeholder="Enter your password"
              />
            </div>
            <Button type="submit" className="w-full flex items-center justify-center gap-2">
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
