import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MapContextType {
  focusedLocation: string | null;
  coordinates: { lat: number; lng: number } | null;
  focusOnLocation: (location: string, coordinates?: { lat: number; lng: number }) => void;
  clearFocus: () => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};

interface MapProviderProps {
  children: ReactNode;
}

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [focusedLocation, setFocusedLocation] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const focusOnLocation = (location: string, coords?: { lat: number; lng: number }) => {
    setFocusedLocation(location);
    if (coords) {
      setCoordinates(coords);
    }
  };

  const clearFocus = () => {
    setFocusedLocation(null);
    setCoordinates(null);
  };

  return (
    <MapContext.Provider value={{ focusedLocation, coordinates, focusOnLocation, clearFocus }}>
      {children}
    </MapContext.Provider>
  );
};