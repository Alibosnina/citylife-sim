import { CityData } from '@/lib/simulation';

export function formatNumber(value: number, decimals = 0, prefix = '', suffix = ''): string {
  return `${prefix}${value.toFixed(decimals)}${suffix}`;
}

export function formatPercentage(value: number, decimals = 0): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatCurrency(value: number, decimals = 0): string {
  return `$${value.toFixed(decimals)}M`;
}

export function formatDate(time: CityData['time']): string {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  return `${months[time.month - 1]} ${time.day}, ${time.year}`;
}

export function getAirQualityLabel(aqi: number): string {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
}

export function getAirQualityColor(aqi: number): string {
  if (aqi <= 50) return '#10B981'; // Green
  if (aqi <= 100) return '#F59E0B'; // Yellow
  if (aqi <= 150) return '#F97316'; // Orange
  if (aqi <= 200) return '#EF4444'; // Red
  if (aqi <= 300) return '#8B5CF6'; // Purple
  return '#7F1D1D'; // Maroon
}

export function getTrafficLevelLabel(level: number): string {
  if (level <= 20) return 'Light';
  if (level <= 40) return 'Moderate';
  if (level <= 60) return 'Heavy';
  if (level <= 80) return 'Very Heavy';
  return 'Gridlock';
}

export function getTrafficLevelColor(level: number): string {
  if (level <= 20) return '#10B981'; // Green
  if (level <= 40) return '#34D399'; // Light Green 
  if (level <= 60) return '#F59E0B'; // Yellow
  if (level <= 80) return '#F97316'; // Orange
  return '#EF4444'; // Red
}

export function getHappinessLabel(level: number): string {
  if (level <= 20) return 'Unhappy';
  if (level <= 40) return 'Concerned';
  if (level <= 60) return 'Content';
  if (level <= 80) return 'Happy';
  return 'Very Happy';
}

export function getHappinessColor(level: number): string {
  if (level <= 20) return '#EF4444'; // Red 
  if (level <= 40) return '#F97316'; // Orange
  if (level <= 60) return '#F59E0B'; // Yellow
  if (level <= 80) return '#34D399'; // Light Green
  return '#10B981'; // Green
}