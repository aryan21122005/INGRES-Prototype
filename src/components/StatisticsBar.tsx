import React from 'react';
import { Card } from '@/components/ui/card';

interface StatItem {
  label: string;
  value: number;
  color: string;
}

const StatisticsBar = () => {
  const stats: StatItem[] = [
    { label: 'Total', value: 6057, color: 'bg-foreground' },
    { label: 'Safe', value: 4322, color: 'bg-safe' },
    { label: 'Semi-Critical', value: 734, color: 'bg-semi-critical' },
    { label: 'Critical', value: 198, color: 'bg-critical' },
    { label: 'Over-Exploited', value: 716, color: 'bg-over-exploited' },
    { label: 'Saline', value: 89, color: 'bg-warning' }
  ];

  return (
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${stat.color}`}></div>
              <span className="text-sm font-medium text-foreground">{stat.label}</span>
              <span className="text-sm font-bold text-foreground">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsBar;