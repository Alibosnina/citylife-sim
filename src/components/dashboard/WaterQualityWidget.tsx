import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CityData } from '@/lib/simulation';
import { cn } from '@/lib/utils';

interface WaterQualityWidgetProps {
  waterData: CityData['water'];
  className?: string;
}

export function WaterQualityWidget({ waterData, className }: WaterQualityWidgetProps) {
  const { qualityIndex, reservoirLevel, consumption } = waterData;
  
  // Generate water wave animation
  const waveHeight = 100 - reservoirLevel; // Invert: lower water level = higher wave position
  
  return (
    <Card className={cn("city-card border-white/10", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-city-gray-light">Water Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Reservoir visualization */}
          <div className="relative w-24 h-36 border border-white/20 rounded-lg overflow-hidden">
            <div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-1000"
              style={{ 
                height: `${reservoirLevel}%`,
                opacity: 0.7
              }}
            >
              {/* Waves */}
              <div 
                className="absolute top-0 left-0 w-full h-6 bg-white/30"
                style={{ 
                  transform: `translateY(-50%) translateX(-50%) rotate(-5deg)`,
                  animation: 'moveHorizontal 3s linear infinite'
                }}
              />
              <div 
                className="absolute top-0 left-0 w-full h-4 bg-white/20"
                style={{ 
                  transform: `translateY(-30%) translateX(-30%) rotate(3deg)`,
                  animation: 'moveHorizontal 2s linear reverse infinite'
                }}
              />
            </div>
            
            {/* Level markings */}
            <div className="absolute inset-0 flex flex-col justify-between py-2 px-1">
              <span className="text-xs text-white/70">100%</span>
              <span className="text-xs text-white/70">50%</span>
              <span className="text-xs text-white/70">0%</span>
            </div>
            
            <div className="absolute bottom-2 right-2 bg-city-surface-dark px-2 py-1 rounded text-sm">
              {Math.round(reservoirLevel)}%
            </div>
          </div>
          
          {/* Water metrics */}
          <div className="flex-1">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-city-gray-light">Water Quality</span>
                  <span className="text-sm font-medium">{qualityIndex.toFixed(1)}%</span>
                </div>
                <Progress 
                  value={qualityIndex} 
                  className="h-2"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-city-gray-light">Daily Consumption</span>
                  <span className="text-sm font-medium">{consumption.toFixed(1)} ML</span>
                </div>
                <Progress 
                  value={(consumption / 300) * 100} 
                  className="h-2"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-city-gray-light">Treatment Capacity</span>
                  <span className="text-sm font-medium">{waterData.treatmentCapacity.toFixed(1)} ML</span>
                </div>
                <Progress 
                  value={(waterData.treatmentCapacity / 400) * 100} 
                  className="h-2"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}