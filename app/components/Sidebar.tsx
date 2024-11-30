'use client';

import Link from 'next/link';
import { Home, Settings, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { usePathname } from 'next/navigation';

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Paprika Studio</h2>
          <div className="space-y-1">
            <Link href="/">
              <Button 
                variant={pathname === "/" ? "secondary" : "ghost"} 
                className="w-full justify-start"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href="/user">
              <Button 
                variant={pathname === "/user" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <User className="mr-2 h-4 w-4" />
                Employee
              </Button>
            </Link>
            <Link href="/admin">
              <Button 
                variant={pathname === "/admin" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Settings className="mr-2 h-4 w-4" />
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 