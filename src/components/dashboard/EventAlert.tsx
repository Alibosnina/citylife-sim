import React from 'react';
import { Event } from '@/lib/simulation';
import { cn } from '@/lib/utils';
import { AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface EventAlertProps {
  event: Event;
  onDismiss?: (id: string) => void;
}

export function EventAlert({ event, onDismiss }: EventAlertProps) {
  const getIcon = () => {
    switch (event.severity) {
      case 'info':
        return <Info className="h-4 w-4 text-city-info" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-city-warning" />;
      case 'critical':
        return <AlertCircle className="h-4 w-4 text-city-danger" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getBackgroundColor = () => {
    switch (event.severity) {
      case 'info':
        return 'bg-city-info/10 border-city-info/20';
      case 'warning':
        return 'bg-city-warning/10 border-city-warning/20';
      case 'critical':
        return 'bg-city-danger/10 border-city-danger/20';
      default:
        return 'bg-city-gray/10';
    }
  };

  return (
    <Alert className={cn(
      "relative animate-fade-in transition-all border",
      getBackgroundColor()
    )}>
      {onDismiss && (
        <button 
          onClick={() => onDismiss(event.id)} 
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X size={14} />
        </button>
      )}
      <div className="flex gap-3">
        {getIcon()}
        <div>
          <AlertTitle className="text-white">{event.title}</AlertTitle>
          <AlertDescription className="text-city-gray-light text-sm">
            {event.description}
          </AlertDescription>
          {event.duration > 0 && (
            <p className="text-xs mt-1 text-city-gray-light">
              Duration: {event.duration} hours
            </p>
          )}
        </div>
      </div>
    </Alert>
  );
}