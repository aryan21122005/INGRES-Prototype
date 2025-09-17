import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Home, Download, Layers, MapPin } from 'lucide-react';
import { useMap } from '@/contexts/MapContext';

const MapComponent = () => {
  const { focusedLocation, clearFocus } = useMap();

  return (
    <div className="relative flex-1">
      <Card className="h-full border-border">
        {/* Map Container */}
        <div className="relative h-full bg-gradient-to-br from-background to-muted overflow-hidden rounded-lg">
          {/* Simplified India Map Representation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[600px] h-[500px]">
              {/* India outline placeholder */}
              <svg viewBox="0 0 600 500" className="w-full h-full">
                {/* Simplified India shape with different colored regions */}
                <g>
                  {/* Safe regions (green) */}
                  <rect x="200" y="150" width="60" height="40" fill="hsl(var(--safe))" opacity="0.8" />
                  <rect x="300" y="180" width="80" height="60" fill="hsl(var(--safe))" opacity="0.8" />
                  <rect x="150" y="280" width="70" height="50" fill="hsl(var(--safe))" opacity="0.8" />
                  
                  {/* Semi-critical regions (blue) */}
                  <rect x="180" y="200" width="50" height="45" fill="hsl(var(--semi-critical))" opacity="0.8" />
                  <rect x="320" y="250" width="60" height="40" fill="hsl(var(--semi-critical))" opacity="0.8" />
                  
                  {/* Critical regions (yellow) */}
                  <rect x="250" y="250" width="40" height="35" fill="hsl(var(--critical))" opacity="0.8" />
                  <rect x="380" y="200" width="45" height="40" fill="hsl(var(--critical))" opacity="0.8" />
                  
                  {/* Over-exploited regions (red) */}
                  <rect x="180" y="250" width="50" height="40" fill="hsl(var(--over-exploited))" opacity="0.8" />
                  <rect x="280" y="200" width="45" height="35" fill="hsl(var(--over-exploited))" opacity="0.8" />
                  <rect x="220" y="300" width="55" height="45" fill="hsl(var(--over-exploited))" opacity="0.8" />
                  
              {/* Map outline */}
                  <path
                    d="M 150 150 Q 200 100 300 120 Q 400 110 450 150 Q 480 200 470 250 Q 460 300 440 350 Q 400 400 350 420 Q 300 450 250 440 Q 200 430 170 400 Q 140 350 130 300 Q 120 250 130 200 Q 140 150 150 150 Z"
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                  />
                  
                  {/* Bhopal marker when focused */}
                  {focusedLocation === 'Bhopal' && (
                    <>
                      <circle cx="260" cy="240" r="8" fill="hsl(var(--primary))" stroke="white" strokeWidth="2" />
                      <text x="275" y="245" className="text-xs font-semibold fill-primary">Bhopal</text>
                    </>
                  )}
                </g>
              </svg>
              
              {/* Location info panel when focused */}
              {focusedLocation && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <Card className="p-4 bg-card/95 backdrop-blur border-primary/20">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <div>
                          <h4 className="font-semibold">{focusedLocation}</h4>
                          <p className="text-xs text-muted-foreground">Focused Location</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={clearFocus}>
                        Clear
                      </Button>
                    </div>
                  </Card>
                </div>
              )}
              
              {/* Map legend */}
              <div className="absolute bottom-4 left-4">
                <Card className="p-3 bg-card/95 backdrop-blur">
                  <h4 className="text-sm font-semibold mb-2">Category</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-safe rounded"></div>
                      <span className="text-xs">Safe</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-semi-critical rounded"></div>
                      <span className="text-xs">Semi Critical</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-critical rounded"></div>
                      <span className="text-xs">Critical</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-over-exploited rounded"></div>
                      <span className="text-xs">Over Exploited</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-warning rounded"></div>
                      <span className="text-xs">Saline</span>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Scale indicator */}
              <div className="absolute bottom-4 right-4">
                <Card className="p-2 bg-card/95 backdrop-blur">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-8 h-0.5 bg-foreground"></div>
                    <span>500km</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Map Controls */}
          <div className="absolute top-4 left-4 space-y-2">
            <Button size="sm" variant="outline" className="bg-card/95 backdrop-blur">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="bg-card/95 backdrop-blur">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="bg-card/95 backdrop-blur">
              <Home className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Additional Tools */}
          <div className="absolute top-4 right-4 space-y-2">
            <Button size="sm" variant="outline" className="bg-card/95 backdrop-blur">
              <Layers className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="bg-card/95 backdrop-blur">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MapComponent;