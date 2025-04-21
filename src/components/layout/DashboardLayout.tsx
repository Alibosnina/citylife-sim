import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, BarChart2, Settings as SettingsIcon } from "lucide-react";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    route: "/",
    match: (pathname: string) => pathname === "/"
  },
  {
    label: "City Overview",
    icon: <FileText className="h-5 w-5" />,
    route: "/city-overview",
    match: (pathname: string) => pathname.startsWith("/city-overview")
  },
  {
    label: "Policies",
    icon: <FileText className="h-5 w-5" />,
    route: "/policies",
    match: (pathname: string) => pathname.startsWith("/policies")
  },
  {
    label: "Analytics",
    icon: <BarChart2 className="h-5 w-5" />,
    route: "/analytics",
    match: (pathname: string) => pathname.startsWith("/analytics")
  },
  {
    label: "Settings",
    icon: <SettingsIcon className="h-5 w-5" />,
    route: "/settings",
    match: (pathname: string) => pathname.startsWith("/settings")
  },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen city-gradient text-white">
      <div className="fixed inset-0 bg-black/20 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="flex relative z-10">
        {/* Sidebar */}
        <aside 
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex h-screen flex-col city-card border-r border-white/10 transition-all duration-300",
            sidebarOpen ? "w-64" : "w-16"
          )}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
            <h1 className={cn("font-bold text-xl text-city-accent", !sidebarOpen && "opacity-0")}>
              CityLife
            </h1>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-white/10"
            >
              {sidebarOpen ? <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 19l-7-7 7-7"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 5l7 7-7 7"/></svg>}
            </Button>
          </div>

          <div className="flex flex-col gap-1 p-2 mt-2">
            {sidebarItems.map(({ label, icon, route, match }) => (
              <SidebarItem
                key={label}
                icon={icon}
                label={label}
                active={match(location.pathname)}
                collapsed={!sidebarOpen}
                route={route}
              />
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className={cn(
          "flex-1 transition-all duration-300 overflow-auto",
          sidebarOpen ? "ml-64" : "ml-16"
        )}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  route: string;
}

function SidebarItem({ icon, label, active = false, collapsed = false, route }: SidebarItemProps) {
  return (
    <Link to={route}>
      <div 
        className={cn(
          "flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors",
          active ? "bg-white/20" : "hover:bg-white/10"
        )}
      >
        <span className="text-xl">{icon}</span>
        {!collapsed && (
          <span className="ml-3 text-sm font-medium">{label}</span>
        )}
      </div>
    </Link>
  );
}