import React from 'react';
import Header from '@/components/Header';
import StatisticsBar from '@/components/StatisticsBar';
import MapComponent from '@/components/MapComponent';
import DataPanel from '@/components/DataPanel';
import ChatBot from '@/components/ChatBot';
import { MapProvider } from '@/contexts/MapContext';

const Index = () => {
  return (
    <MapProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <StatisticsBar />
        
        <div className="flex flex-1">
          <MapComponent />
          <DataPanel />
        </div>
        
        <ChatBot />
      </div>
    </MapProvider>
  );
};

export default Index;
