import React from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DataItem {
  label: string;
  value: string;
  unit?: string;
  expandable?: boolean;
}

const DataPanel = () => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const dataItems: DataItem[] = [
    {
      label: 'Annual Extractable Ground Water Resources (BCM)',
      value: '381.65',
      unit: 'BCM'
    },
    {
      label: 'Ground Water Extraction for all uses (BCM)',
      value: '238.45',
      unit: 'BCM'
    },
    {
      label: 'Rainfall (mm)',
      value: '1,068.72',
      unit: 'mm'
    },
    {
      label: 'Ground Water Recharge (BCM)',
      value: '421.16',
      unit: 'BCM',
      expandable: true
    },
    {
      label: 'Natural Discharges (BCM)',
      value: '37.69',
      unit: 'BCM',
      expandable: true
    },
    {
      label: 'Annual Extractable Ground Water Resources (BCM)',
      value: '381.65',
      unit: 'BCM',
      expandable: true
    },
    {
      label: 'Ground Water Extraction (BCM)',
      value: '238.45',
      unit: 'BCM',
      expandable: true
    }
  ];

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div className="w-80 bg-card border-l border-border">
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Area of Focus: INDIA (COUNTRY)
          </h2>
          <p className="text-sm text-muted-foreground">YEAR: 2024-2025</p>
        </div>

        <div className="space-y-3">
          <Card className="p-4">
            <h3 className="font-medium text-foreground mb-2">INDIA</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Annual Extractable Ground Water Resources (BCM)</p>
                <p className="font-bold text-primary text-lg">381.65</p>
              </div>
              <div>
                <p className="text-muted-foreground">Ground Water Extraction for all uses (BCM)</p>
                <p className="font-bold text-accent text-lg">238.45</p>
              </div>
            </div>
          </Card>

          <div className="space-y-2">
            {dataItems.map((item, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-primary">{item.value}</p>
                  </div>
                  {item.expandable && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(item.label)}
                      className="p-1"
                    >
                      {expandedItems.includes(item.label) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
                {item.expandable && expandedItems.includes(item.label) && (
                  <div className="mt-2 pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Additional details and breakdown for {item.label} would be displayed here.
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <Card className="p-3 bg-muted">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">STATE</span>
              <div className="flex gap-2 text-xs">
                <span>Annual Rainfall (mm)</span>
                <span>Extractable Ground Water Resources (bcm)</span>
                <span>Ground Water Extraction (bcm)</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataPanel;