import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Globe, User, Settings, HelpCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Central Ground Water Board</h1>
                <p className="text-sm text-muted-foreground">
                  Department of WR, RD & GR, Ministry of Jal Shakti, Government of India
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Globe className="h-4 w-4 mr-2" />
              English
            </Button>
            <Button variant="outline" size="sm">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </Button>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
        </div>

        {/* Assessment Info Bar */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Card className="px-3 py-2 bg-primary text-primary-foreground">
              <span className="text-sm font-medium">Assessment year: 2024-2025</span>
            </Card>
            <div className="text-sm text-muted-foreground">
              Area of Focus: <span className="font-medium text-foreground">INDIA (COUNTRY)</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;