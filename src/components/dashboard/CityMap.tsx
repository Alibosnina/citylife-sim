import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CityData } from '@/lib/simulation';
import { cn } from '@/lib/utils';
import { getTrafficLevelColor } from '@/utils/formatters';

interface CityMapProps {
  trafficData: CityData['traffic'];
  className?: string;
}

export function CityMap({ trafficData, className }: CityMapProps) {
  const congestionLevel = trafficData.congestionLevel;
  const trafficColor = getTrafficLevelColor(congestionLevel);
  
  return (
    <Card className={cn("city-card border-white/10 h-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-city-gray-light">City Traffic Map</CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-hidden aspect-square flex items-center justify-center">
        <div className="relative w-full h-full p-4">
          {/* City grid layout */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 p-4">
            {Array.from({ length: 36 }).map((_, i) => {
              const row = Math.floor(i / 6);
              const col = i % 6;
              const isCenter = (row >= 2 && row <= 3) && (col >= 2 && col <= 3);
              const isMainRoad = row === 2 || row === 3 || col === 2 || col === 3;
              
              // Dynamic road opacity based on traffic
              const roadOpacity = isMainRoad 
                ? Math.min(0.5 + (congestionLevel / 100) * 0.5, 1) 
                : 0.3;
              
              return (
                <div
                  key={i}
                  className={cn(
                    "rounded transition-all duration-500",
                    isCenter 
                      ? "bg-white/20" // City center
                      : isMainRoad 
                        ? "bg-white/10" // Main roads
                        : (row + col) % 2 === 0 
                          ? "bg-white/5" // Buildings
                          : "bg-transparent" // Empty space
                  )}
                  style={{
                    boxShadow: isMainRoad ? `0 0 10px ${trafficColor}` : 'none',
                    opacity: isMainRoad ? roadOpacity : 0.7
                  }}
                />
              );
            })}
          </div>
          
          {/* Traffic visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-full h-[2px] bg-white/30 absolute top-1/2 transform -translate-y-1/2"
              style={{ 
                boxShadow: `0 0 15px ${trafficColor}`,
                opacity: Math.min(0.4 + (congestionLevel / 100) * 0.6, 1)
              }}
            />
            <div 
              className="h-full w-[2px] bg-white/30 absolute left-1/2 transform -translate-x-1/2"
              style={{ 
                boxShadow: `0 0 15px ${trafficColor}`,
                opacity: Math.min(0.4 + (congestionLevel / 100) * 0.6, 1)
              }}
            />
          </div>
          
          {/* Moving dots representing vehicles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: Math.min(20, Math.ceil(trafficData.vehiclesOnRoad / 1000)) }).map((_, i) => {
              const isHorizontal = i % 2 === 0;
              const position = (i * 10) % 100; // Spread them along the road
              const delay = i * 0.2; // Stagger the animation
              const duration = 10 - (congestionLevel / 20); // Traffic speed based on congestion
              
              return (
                <div 
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-white"
                  style={{
                    top: isHorizontal ? '50%' : `${position}%`,
                    left: isHorizontal ? `${position}%` : '50%',
                    transform: 'translate(-50%, -50%)',
                    animation: `${isHorizontal ? 'moveHorizontal' : 'moveVertical'} ${duration}s linear infinite`,
                    animationDelay: `${delay}s`,
                    opacity: 0.7,
                    boxShadow: `0 0 5px ${trafficColor}`
                  }}
                />
              );
            })}
          </div>
          
          {/* Added inline styles using keyframes in the global CSS */}
        </div>
      </CardContent>
    </Card>
  );
}