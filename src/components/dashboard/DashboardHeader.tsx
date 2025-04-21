import React from 'react';
import { CityData } from '@/lib/simulation';
import { formatDate } from '@/utils/formatters';

interface DashboardHeaderProps {
  cityData: CityData;
}

export function DashboardHeader({ cityData }: DashboardHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-white mb-2">CityLife Dashboard</h1>
      <p className="text-city-gray-light">
        Virtual Smart City Simulator - {formatDate(cityData.time)}
      </p>
    </div>
  );
}