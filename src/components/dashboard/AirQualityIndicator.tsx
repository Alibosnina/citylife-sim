import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getAirQualityLabel, getAirQualityColor } from '@/utils/formatters';

interface AirQualityIndicatorProps {
  value: number;
  className?: string;
}

export function AirQualityIndicator({ value, className }: AirQualityIndicatorProps) {
  const label = getAirQualityLabel(value);
  const color = getAirQualityColor(value);
  
  return (
    <Card className={cn("city-card border-white/10", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-city-gray-light">Air Quality</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div 
            className="w-32 h-32 rounded-full flex items-center justify-center mb-4"
            style={{ 
              background: `radial-gradient(circle, ${color}80 0%, transparent 70%)`,
              boxShadow: `0 0 30px ${color}50`
            }}
          >
            <span className="text-4xl font-bold">{Math.round(value)}</span>
          </div>
          
          <div className="text-lg font-medium" style={{ color }}>
            {label}
          </div>
          
          <div className="mt-4 w-full">
            <div className="flex justify-between">
              <span className="text-xs text-city-gray-light">Good</span>
              <span className="text-xs text-city-gray-light">Hazardous</span>
            </div>
            <div className="h-2 w-full mt-1 rounded-full bg-city-surface-dark relative overflow-hidden">
              <div 
                className="absolute top-0 h-full"
                style={{ 
                  width: `${Math.min(100, (value / 300) * 100)}%`,
                  background: `linear-gradient(to right, #10B981, #F59E0B, #F97316, #EF4444, #8B5CF6)`
                }}
              />
              <div 
                className="absolute top-0 h-full w-1 bg-white"
                style={{ 
                  left: `${Math.min(100, (value / 300) * 100)}%`,
                  transform: 'translateX(-50%)'
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}