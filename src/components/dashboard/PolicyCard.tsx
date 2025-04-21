import React from 'react';
import { Policy } from '@/lib/simulation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BadgeCheck, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PolicyCardProps {
  policy: Policy;
  onActivate: (id: string) => void;
  disabled?: boolean;
}

export function PolicyCard({ policy, onActivate, disabled }: PolicyCardProps) {
  const isImplementing = policy.active && policy.implementationProgress < 100;
  const isActive = policy.active && policy.implementationProgress >= 100;

  return (
    <Card className={cn(
      "city-card border-white/10 overflow-hidden transition-all duration-300",
      isActive && "border-city-accent/50",
      disabled && "opacity-50"
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-white">
            {policy.name}
          </CardTitle>
          <div className="text-xs font-medium px-2 py-1 rounded-full bg-city-surface-dark">
            {policy.category.charAt(0).toUpperCase() + policy.category.slice(1)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-city-gray-light">{policy.description}</p>
        
        <div className="flex items-center justify-between mt-3 text-sm">
          <span>Cost:</span>
          <span className="font-semibold text-city-warning">${policy.cost}M</span>
        </div>

        {isImplementing && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-city-gray-light flex items-center">
                <Clock size={12} className="mr-1" /> Implementation Progress
              </span>
              <span className="text-xs font-medium">{Math.round(policy.implementationProgress)}%</span>
            </div>
            <Progress value={policy.implementationProgress} className="h-1.5" />
          </div>
        )}

        {isActive && policy.implementationProgress >= 100 && (
          <div className="mt-2 flex items-center text-city-success text-sm">
            <BadgeCheck size={16} className="mr-1" /> Policy Active
          </div>
        )}
      </CardContent>
      <CardFooter className={cn(
        "bg-city-surface-dark border-t border-white/5 px-4 py-2",
        isActive && "bg-city-accent/10"
      )}>
        <Button
          onClick={() => onActivate(policy.id)}
          variant="outline"
          disabled={policy.active || disabled}
          className={cn(
            "w-full transition-all",
            !policy.active && !disabled && "hover:bg-city-accent hover:text-white"
          )}
        >
          {policy.active ? 'Implemented' : 'Implement Policy'}
        </Button>
      </CardFooter>
    </Card>
  );
}