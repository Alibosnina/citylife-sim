import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CityData } from '@/lib/simulation';
import { cn } from '@/lib/utils';

interface EnergyGaugeProps {
  energyData: CityData['energy'];
  className?: string;
}

export function EnergyGauge({ energyData, className }: EnergyGaugeProps) {
  const { electricityUsage, peakDemand, renewablePercentage } = energyData;
  
  // Calculate usage percentage against peak demand
  const usagePercentage = Math.min(100, (electricityUsage / peakDemand) * 100);
  
  // Determine gauge color based on usage percentage
  const getGaugeColor = () => {
    if (usagePercentage < 60) return '#10B981';
    if (usagePercentage < 80) return '#F59E0B';
    return '#EF4444';
  };
  
  const gaugeColor = getGaugeColor();
  
  // Calculate angle for gauge needle
  const needleRotation = (usagePercentage / 100) * 180 - 90;
  
  // Calculate renewable and non-renewable segments
  const renewableAngle = (renewablePercentage / 100) * 180;
  const nonRenewableAngle = 180 - renewableAngle;
  
  return (
    <Card className={cn("city-card border-white/10 h-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-city-gray-light">Energy Usage</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-full max-w-[200px] aspect-square">
          {/* Gauge background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Semi-circle background */}
              <div 
                className="absolute bottom-0 left-0 right-0 mx-auto w-full h-1/2 rounded-t-full bg-city-surface-dark"
                style={{ overflow: 'hidden' }}
              />
              
              {/* Renewable energy segment */}
              <div 
                className="absolute bottom-0 left-0 w-full h-1/2 origin-bottom"
                style={{ 
                  transform: `rotate(${-90}deg)`,
                  overflow: 'hidden'
                }}
              >
                <div 
                  className="absolute bottom-0 left-0 w-full h-full bg-city-success"
                  style={{ 
                    transform: `rotate(${renewableAngle}deg)`,
                    transformOrigin: 'bottom center',
                    opacity: 0.6
                  }}
                />
              </div>
              
              {/* Non-renewable energy segment */}
              <div 
                className="absolute bottom-0 left-0 w-full h-1/2 origin-bottom"
                style={{ 
                  transform: `rotate(${renewableAngle - 90}deg)`,
                  overflow: 'hidden'
                }}
              >
                <div 
                  className="absolute bottom-0 left-0 w-full h-full bg-city-danger"
                  style={{ 
                    transform: `rotate(${nonRenewableAngle}deg)`,
                    transformOrigin: 'bottom center',
                    opacity: 0.6
                  }}
                />
              </div>
              
              {/* Gauge ticks */}
              {Array.from({ length: 11 }).map((_, i) => {
                const rotation = (i / 10) * 180 - 90;
                const isMajor = i % 5 === 0;
                
                return (
                  <div 
                    key={i}
                    className={cn(
                      "absolute bottom-0 left-1/2 transform -translate-x-1/2 origin-bottom",
                      isMajor ? "h-3 w-1" : "h-1.5 w-0.5"
                    )}
                    style={{ 
                      transform: `rotate(${rotation}deg) translateY(-100%)`,
                      backgroundColor: 'rgba(255, 255, 255, 0.5)'
                    }}
                  />
                );
              })}
              
              {/* Gauge labels */}
              <div className="absolute bottom-0 left-0 transform -translate-x-2 text-xs text-city-gray-light">
                0
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-xs text-city-gray-light">
                {Math.round(peakDemand / 2)}
              </div>
              <div className="absolute bottom-0 right-0 transform translate-x-2 text-xs text-city-gray-light">
                {Math.round(peakDemand)}
              </div>
              
              {/* Gauge needle */}
              <div 
                className="absolute bottom-0 left-1/2 h-[calc(50%-10px)] w-1 bg-white origin-bottom rounded-t"
                style={{ 
                  transform: `translateX(-50%) rotate(${needleRotation}deg)`,
                  boxShadow: `0 0 5px ${gaugeColor}`,
                  transition: 'transform 1s cubic-bezier(0.2, 0, 0.4, 1)'
                }}
              >
                <div 
                  className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-white"
                  style={{ boxShadow: `0 0 5px ${gaugeColor}` }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 w-full">
          <div className="flex justify-between items-center text-sm">
            <span className="text-city-gray-light">Usage:</span>
            <span className="font-medium">{Math.round(electricityUsage)} MW</span>
          </div>
          <div className="flex justify-between items-center mt-1 text-sm">
            <span className="text-city-gray-light">Peak:</span>
            <span className="font-medium">{Math.round(peakDemand)} MW</span>
          </div>
          <div className="flex justify-between items-center mt-1 text-sm">
            <span className="text-city-gray-light">Renewable:</span>
            <span className="font-medium text-city-success">{Math.round(renewablePercentage)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}