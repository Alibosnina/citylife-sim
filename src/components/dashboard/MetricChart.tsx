import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface MetricChartProps {
  title: string;
  data: Array<{ timestamp: number; value: number }>;
  color?: string;
  height?: number;
  className?: string;
  unit?: string;
  timeFormat?: 'hour' | 'day' | 'month';
}

export function MetricChart({
  title,
  data,
  color = "#0EA5E9",
  height = 200,
  className,
  unit = '',
  timeFormat = 'hour'
}: MetricChartProps) {
  const formattedData = data.map(point => ({
    time: new Date(point.timestamp),
    value: point.value
  }));

  const getTimeFormat = () => {
    switch (timeFormat) {
      case 'hour':
        return (time: Date) => `${time.getHours()}:${String(time.getMinutes()).padStart(2, '0')}`;
      case 'day':
        return (time: Date) => `${time.getMonth() + 1}/${time.getDate()}`;
      case 'month':
        return (time: Date) => `${time.getMonth() + 1}/${time.getFullYear()}`;
      default:
        return (time: Date) => `${time.getHours()}:${String(time.getMinutes()).padStart(2, '0')}`;
    }
  };

  return (
    <Card className={cn("city-card border-white/10 animate-fade-in", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-city-gray-light">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={formattedData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id={`gradient-${title.replace(/\s+/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="time" 
                tick={{ fill: '#94A3B8', fontSize: 10 }}
                tickFormatter={getTimeFormat()}
                stroke="rgba(255,255,255,0.1)"
              />
              <YAxis 
                tick={{ fill: '#94A3B8', fontSize: 10 }}
                tickFormatter={value => `${value}${unit}`}
                stroke="rgba(255,255,255,0.1)"
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E293B', borderColor: 'rgba(255,255,255,0.1)' }}
                labelStyle={{ color: '#F8FAFC' }}
                formatter={(value) => [`${value}${unit}`, '']}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                fillOpacity={1}
                fill={`url(#gradient-${title.replace(/\s+/g, '-')})`} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}