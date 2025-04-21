import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ArrowLeftIcon, ArrowRightIcon, PauseIcon, PlayIcon } from 'lucide-react';
import { CityData } from '@/lib/simulation';
import { formatDate } from '@/utils/formatters';

interface TimeControlsProps {
  cityTime: CityData['time'];
  timeAcceleration: number;
  isPaused: boolean;
  onPauseToggle: () => void;
  onSpeedChange: (speed: number) => void;
  onReset: () => void;
}

export function TimeControls({
  cityTime,
  timeAcceleration,
  isPaused,
  onPauseToggle,
  onSpeedChange,
  onReset
}: TimeControlsProps) {
  return (
    <div className="city-card border-white/10 p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onPauseToggle}
          className="text-white"
        >
          {isPaused ? <PlayIcon /> : <PauseIcon />}
        </Button>
        
        <div className="text-xl font-mono">
          {String(Math.floor(cityTime.hour)).padStart(2, '0')}:
          {String(Math.floor((cityTime.hour % 1) * 60)).padStart(2, '0')}
        </div>
        
        <div className="text-sm text-city-gray-light">
          {formatDate(cityTime)}
        </div>
      </div>
      
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <ArrowRightIcon size={12} className="text-city-gray-light" />
        <Slider
          value={[timeAcceleration]}
          min={1}
          max={10}
          step={1}
          onValueChange={(values) => onSpeedChange(values[0])}
          className="flex-1"
        />
        <ArrowRightIcon size={20} className="text-white" />
        
        <span className="text-sm min-w-[45px]">{timeAcceleration}x</span>
      </div>
      
      <Button variant="outline" onClick={onReset} className="text-xs">
        Reset Simulation
      </Button>
    </div>
  );
}