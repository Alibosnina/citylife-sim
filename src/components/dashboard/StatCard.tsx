import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
  onClick?: () => void;
  footer?: React.ReactNode;
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  trendValue,
  className,
  onClick,
  footer
}: StatCardProps) {
  return (
    <Card 
      className={cn(
        "city-card border-white/10 h-full overflow-hidden transition-all duration-300 hover:shadow-xl animate-fade-in",
        onClick && "cursor-pointer hover:translate-y-[-2px]",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-city-gray-light">{title}</CardTitle>
        {icon && <div className="text-city-accent">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        
        {trend && (
          <p className={cn(
            "text-xs font-medium mt-1",
            trend === 'up' && "text-city-success",
            trend === 'down' && "text-city-danger",
            trend === 'neutral' && "text-city-gray"
          )}>
            {trend === 'up' && '↑ '}
            {trend === 'down' && '↓ '}
            {trend === 'neutral' && '→ '}
            {trendValue}
          </p>
        )}
        
        {footer && (
          <div className="mt-4 pt-2 border-t border-white/10 text-xs text-city-gray-light">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  );
}