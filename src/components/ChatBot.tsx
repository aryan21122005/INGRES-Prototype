import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot, User, MapPin } from 'lucide-react';
import { useMap } from '@/contexts/MapContext';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { GroundwaterDataService } from '@/services/GroundwaterDataService';
import { ComprehensiveGroundwaterService } from '@/services/ComprehensiveGroundwaterService';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  hasCharts?: boolean;
  hasMapAction?: boolean;
  location?: string;
}

interface LocationData {
  name: string;
  state: string;
  coordinates: { lat: number; lng: number };
  groundwaterData: {
    category: string;
    recharge: number;
    extraction: number;
    available: number;
    stageOfExtraction: number;
  };
  historicalData: Array<{
    year: string;
    recharge: number;
    extraction: number;
    category: string;
  }>;
  categoryDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const ChatBot = () => {
  const { focusOnLocation } = useMap();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your INGRES virtual assistant. I can help you with groundwater resource data, assessment reports, and answer questions about India\'s groundwater status. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  // Initialize comprehensive groundwater database on component mount
  React.useEffect(() => {
    ComprehensiveGroundwaterService.initialize();
  }, []);

  // Get comprehensive groundwater data from service
  const getAllLocationsData = () => {
    const locations: { [key: string]: LocationData } = {};
    
    // Get major cities from original service for detailed data
    GroundwaterDataService.getAllLocations().forEach(locationName => {
      const assessment = GroundwaterDataService.getLocationData(locationName);
      if (assessment) {
        locations[locationName] = {
          name: assessment.blockName,
          state: assessment.state,
          coordinates: assessment.coordinates,
          groundwaterData: {
            category: assessment.data.category,
            recharge: assessment.data.groundwaterRecharge,
            extraction: assessment.data.totalExtraction,
            available: assessment.data.annualExtractableResource,
            stageOfExtraction: assessment.data.stage_of_extraction,
          },
          historicalData: assessment.historical.map(h => ({
            year: h.year,
            recharge: h.recharge,
            extraction: h.extraction,
            category: h.category,
          })),
          categoryDistribution: [
            { name: 'Safe', value: 25, color: '#10b981' },
            { name: 'Semi-Critical', value: 35, color: '#f59e0b' },
            { name: 'Critical', value: 25, color: '#ef4444' },
            { name: 'Over-Exploited', value: 15, color: '#dc2626' },
          ],
        };
      }
    });
    
    return locations;
  };

  const locationsData: { [key: string]: LocationData } = getAllLocationsData();

  // Mock data for all blocks of India
  const allBlocksData = {
    totalBlocks: 6881,
    totalStates: 36,
    overallData: {
      totalRecharge: 421.16,
      totalExtraction: 253.49,
      totalAvailable: 398.08,
      avgStageOfExtraction: 63.7
    },
    categoryDistribution: [
      { name: 'Safe', value: 4685, percentage: 68.1, color: 'hsl(var(--safe))' },
      { name: 'Semi-Critical', value: 1064, percentage: 15.5, color: 'hsl(var(--semi-critical))' },
      { name: 'Critical', value: 416, percentage: 6.0, color: 'hsl(var(--critical))' },
      { name: 'Over-Exploited', value: 716, percentage: 10.4, color: 'hsl(var(--over-exploited))' }
    ],
    stateWiseData: [
      { state: 'Rajasthan', safe: 195, semiCritical: 45, critical: 15, overExploited: 8, total: 263 },
      { state: 'Uttar Pradesh', safe: 298, semiCritical: 52, critical: 18, overExploited: 32, total: 400 },
      { state: 'Madhya Pradesh', safe: 312, semiCritical: 38, critical: 12, overExploited: 21, total: 383 },
      { state: 'Gujarat', safe: 158, semiCritical: 42, critical: 28, overExploited: 98, total: 326 },
      { state: 'Maharashtra', safe: 245, semiCritical: 85, critical: 45, overExploited: 78, total: 453 },
      { state: 'Karnataka', safe: 198, semiCritical: 62, critical: 28, overExploited: 45, total: 333 },
      { state: 'Andhra Pradesh', safe: 156, semiCritical: 48, critical: 18, overExploited: 32, total: 254 },
      { state: 'Tamil Nadu', safe: 124, semiCritical: 58, critical: 42, overExploited: 89, total: 313 },
      { state: 'Punjab', safe: 45, semiCritical: 28, critical: 15, overExploited: 58, total: 146 },
      { state: 'Haryana', safe: 67, semiCritical: 35, critical: 22, overExploited: 48, total: 172 }
    ],
    historicalTrend: [
      { year: '2020-21', safe: 4789, semiCritical: 997, critical: 378, overExploited: 717 },
      { year: '2021-22', safe: 4745, semiCritical: 1015, critical: 389, overExploited: 732 },
      { year: '2022-23', safe: 4712, semiCritical: 1038, critical: 398, overExploited: 733 },
      { year: '2023-24', safe: 4698, semiCritical: 1051, critical: 406, overExploited: 726 },
      { year: '2024-25', safe: 4685, semiCritical: 1064, critical: 416, overExploited: 716 }
    ]
  };

  const sampleQueries = [
    "Show data for Bhopal",
    "View Mumbai groundwater data",
    "Delhi water status",
    "Pune extraction data",
    "Show data for all blocks of India"
  ];

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse.content,
        timestamp: new Date(),
        hasCharts: botResponse.hasCharts,
        hasMapAction: botResponse.hasMapAction,
        location: botResponse.location
      };
      setMessages(prev => [...prev, botMessage]);
      
      // Focus on location if requested
      if (botResponse.hasMapAction && botResponse.location) {
        const locationData = locationsData[botResponse.location];
        handleViewLocation(botResponse.location, locationData?.coordinates);
      }
    }, 1000);
  };

  const generateBotResponse = (query: string): { content: string; hasCharts?: boolean; hasMapAction?: boolean; location?: string } => {
    const lowerQuery = query.toLowerCase();
    
    // Handle comprehensive block queries (6750+ blocks)
    if (lowerQuery.includes('all blocks') || lowerQuery.includes('6750') || lowerQuery.includes('6881') || lowerQuery.includes('overall india') || lowerQuery.includes('india statistics')) {
      const nationalSummary = ComprehensiveGroundwaterService.getNationalSummary();
      return {
        content: `📊 **National Groundwater Assessment (2024-25)**\n\n🏛️ **Total Coverage**: ${nationalSummary.totalBlocks.toLocaleString()} assessment units across ${nationalSummary.totalStates} states\n\n📈 **Category Distribution**:\n• Safe: ${nationalSummary.categories.Safe.toLocaleString()} blocks\n• Semi-Critical: ${nationalSummary.categories['Semi-Critical'].toLocaleString()} blocks\n• Critical: ${nationalSummary.categories.Critical.toLocaleString()} blocks\n• Over-Exploited: ${nationalSummary.categories['Over-Exploited'].toLocaleString()} blocks\n\n⚡ **Overall Status**: ${nationalSummary.overallStatus}\n💧 **Average Stage of Extraction**: ${nationalSummary.averageStageOfExtraction.toFixed(1)}%\n💧 **Total Extraction**: ${nationalSummary.totalExtraction.toFixed(1)} BCM\n💧 **Total Recharge**: ${nationalSummary.totalRecharge.toFixed(1)} BCM\n\n**Try asking**: "Show blocks in Maharashtra" or "Critical blocks in Punjab"`,
        hasCharts: true,
        hasMapAction: true,
        location: 'India'
      };
    }

    // Handle state-specific block queries
    const stateMatch = lowerQuery.match(/blocks? in (\w+[\s\w]*?)(?:\s|$|,)/);
    if (stateMatch) {
      const stateName = stateMatch[1].trim();
      const stateSummary = ComprehensiveGroundwaterService.getStateSummary(stateName);
      
      if (stateSummary) {
        return {
          content: `🏛️ **${stateSummary.state} Groundwater Blocks**\n\n📊 **Total Blocks**: ${stateSummary.totalBlocks.toLocaleString()}\n\n🎯 **Category Breakdown**:\n• Safe: ${stateSummary.categories.Safe} blocks\n• Semi-Critical: ${stateSummary.categories['Semi-Critical']} blocks\n• Critical: ${stateSummary.categories.Critical} blocks\n• Over-Exploited: ${stateSummary.categories['Over-Exploited']} blocks\n\n📈 **State Status**: ${stateSummary.overallStatus}\n💧 **Average Extraction**: ${stateSummary.averageStageOfExtraction.toFixed(1)}%\n💧 **Total Extraction**: ${stateSummary.totalExtraction.toFixed(1)} BCM\n💧 **Total Recharge**: ${stateSummary.totalRecharge.toFixed(1)} BCM\n\n**Try asking**: "Show critical blocks in ${stateSummary.state}" or "District wise data for ${stateSummary.state}"`,
          hasCharts: true
        };
      }
    }

    // Handle category-specific queries
    const categoryMatch = lowerQuery.match(/(safe|semi-critical|critical|over-exploited) blocks/);
    if (categoryMatch) {
      const category = categoryMatch[1];
      const categoryBlocks = ComprehensiveGroundwaterService.getBlocksByCategory(category);
      const stateDistribution: { [key: string]: number } = {};
      
      categoryBlocks.forEach(block => {
        stateDistribution[block.state] = (stateDistribution[block.state] || 0) + 1;
      });

      const topStates = Object.entries(stateDistribution)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([state, count]) => `• ${state}: ${count} blocks`)
        .join('\n');

      return {
        content: `🔍 **${category.charAt(0).toUpperCase() + category.slice(1)} Blocks Analysis**\n\n📊 **Total ${category} blocks**: ${categoryBlocks.length.toLocaleString()}\n\n🏛️ **Top 5 States**:\n${topStates}\n\n**Sample blocks**: ${categoryBlocks.slice(0, 3).map(b => `${b.blockName}, ${b.district}`).join('; ')}\n\n**Try asking**: "Show ${category} blocks in specific state" or "Map view of ${category} areas"`,
        hasCharts: true
      };
    }

    // Handle district-specific queries
    const districtMatch = lowerQuery.match(/(?:district|blocks in) (\w+[\s\w]*?)(?:\s|$|,)/);
    if (districtMatch) {
      const districtName = districtMatch[1].trim();
      const districtBlocks = ComprehensiveGroundwaterService.getBlocksByDistrict(districtName);
      
      if (districtBlocks.length > 0) {
        const categories = { 'Safe': 0, 'Semi-Critical': 0, 'Critical': 0, 'Over-Exploited': 0 };
        districtBlocks.forEach(block => categories[block.data.category]++);

        return {
          content: `🏘️ **${districtName} District Blocks**\n\n📊 **Total Blocks**: ${districtBlocks.length}\n\n🎯 **Status Distribution**:\n• Safe: ${categories.Safe} blocks\n• Semi-Critical: ${categories['Semi-Critical']} blocks\n• Critical: ${categories.Critical} blocks\n• Over-Exploited: ${categories['Over-Exploited']} blocks\n\n**Sample blocks**: ${districtBlocks.slice(0, 5).map(b => b.blockName).join(', ')}\n\n**Try asking**: "Show map of ${districtName}" or "Water quality in ${districtName}"`,
          hasCharts: true,
          hasMapAction: true,
          location: districtName
        };
      }
    }
    
    // Check for specific major cities in our detailed dataset
    const locations = Object.keys(locationsData);
    for (const location of locations) {
      if (lowerQuery.includes(location.toLowerCase())) {
        const data = locationsData[location];
        return {
          content: `**${data.name} Groundwater Assessment Data (2024-25)**\n\n**State:** ${data.state}\n**Current Status:** ${data.groundwaterData.category}\n**Annual Recharge:** ${data.groundwaterData.recharge} BCM\n**Current Extraction:** ${data.groundwaterData.extraction} BCM\n**Available Resources:** ${data.groundwaterData.available} BCM\n**Stage of Extraction:** ${data.groundwaterData.stageOfExtraction}%\n\n**Analysis:** ${getLocationAnalysis(data)}\n\n📊 **Charts and Map:** Detailed visualizations and map location are shown below.\n\n🗺️ **View Live Map:** Click the button below to open the official INGRES map for ${data.name}.`,
          hasCharts: true,
          hasMapAction: true,
          location: location
        };
      }
    }
    
    // Handle general state queries
    if (lowerQuery.includes('maharashtra')) {
      const stateSummary = ComprehensiveGroundwaterService.getStateSummary('Maharashtra');
      if (stateSummary) {
        return {
          content: `Maharashtra has ${stateSummary.totalBlocks} assessment blocks with mixed groundwater status. Current distribution: ${stateSummary.categories.Safe} Safe, ${stateSummary.categories['Semi-Critical']} Semi-Critical, ${stateSummary.categories.Critical} Critical, and ${stateSummary.categories['Over-Exploited']} Over-Exploited blocks. Overall status: ${stateSummary.overallStatus}.`
        };
      }
    } else if (lowerQuery.includes('rainfall')) {
      return {
        content: 'The rainfall data for 2024-2025 shows an annual rainfall of 1,068.72 mm for India. This rainfall contributes significantly to groundwater recharge (421.16 BCM annually). Regional variations exist, with some areas receiving above-average rainfall while others face deficits.'
      };
    } else if (lowerQuery.includes('over-exploited') || lowerQuery.includes('exploited')) {
      const nationalSummary = ComprehensiveGroundwaterService.getNationalSummary();
      return {
        content: `Over-exploited areas (shown in red on the map) are regions where groundwater extraction exceeds the annual recharge. From the current data, there are ${nationalSummary.categories['Over-Exploited'].toLocaleString()} such assessment units across India. These areas require immediate attention for sustainable groundwater management.`
      };
    } else if (lowerQuery.includes('recharge')) {
      return {
        content: 'Groundwater recharge is the process by which water moves downward from surface water to groundwater. In India, the annual groundwater recharge is 421.16 BCM, primarily from rainfall (1,068.72 mm annually) and other sources like irrigation return flows and canal seepage.'
      };
    }
    
    return {
      content: `I can help you with comprehensive groundwater data for India's ${ComprehensiveGroundwaterService.getNationalSummary().totalBlocks.toLocaleString()} assessment blocks!\n\n🔍 **Available Queries:**\n• **Comprehensive Data:** "Show all blocks data" or "India overall statistics"\n• **State-wise:** "Blocks in Maharashtra" or "Punjab groundwater blocks"\n• **Category-wise:** "Safe blocks" or "Over-exploited blocks"\n• **District-wise:** "Blocks in Pune district"\n• **Major Cities:** ${Object.keys(locationsData).slice(0, 5).join(', ')}\n\n**Try asking:** "Show all blocks data" or "Critical blocks in Rajasthan"`
    };
  };

  const getLocationAnalysis = (data: LocationData): string => {
    const { category, stageOfExtraction } = data.groundwaterData;
    
    if (category === 'Safe') {
      return `${data.name} shows a Safe status with extraction at ${stageOfExtraction}% of available resources. The groundwater situation is sustainable with current usage patterns.`;
    } else if (category === 'Semi-Critical') {
      return `${data.name} shows a Semi-Critical status with extraction at ${stageOfExtraction}% of available resources. Monitoring and sustainable practices are recommended.`;
    } else if (category === 'Critical') {
      return `${data.name} shows a Critical status with extraction at ${stageOfExtraction}% of available resources. Immediate conservation measures are needed.`;
    } else {
      return `${data.name} shows an Over-Exploited status with extraction at ${stageOfExtraction}% of available resources. Urgent intervention and water management strategies are required.`;
    }
  };

  const handleViewLocation = (location: string, coordinates?: { lat: number; lng: number }) => {
    focusOnLocation(location, coordinates);
  };

  const openIngresMap = (location: string) => {
    // Generate INGRES website URL for the specific location using the provided pattern
    const baseUrl = "https://ingres.iith.ac.in/gecdataonline/gis/INDIA";
    
    // Create URL parameters following the exact INGRES pattern
    const urlParams = [
      `locname=${location.toUpperCase()}`,
      `loctype=DISTRICT`,
      `view=ADMIN`,
      `locuuid=471dff0a-9b41-46f2-890d-179b2408ca4d`,
      `year=2024-2025`,
      `computationType=normal`,
      `component=recharge`,
      `period=annual`,
      `category=safe`,
      `mapOnClickParams=true`,
      `stateuuid=e7b3f02d-2497-4bcd-9e20-baa4b621822b`
    ];
    
    const fullUrl = `${baseUrl};${urlParams.join(';')}`;
    window.open(fullUrl, '_blank');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-primary shadow-glow hover:shadow-elegant transition-all duration-300"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[500px] shadow-elegant border-primary/20">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-gradient-primary text-primary-foreground p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <div>
                  <h3 className="font-semibold">INGRES Assistant</h3>
                  <p className="text-xs opacity-90">Groundwater Resource Expert</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-lg p-3 text-sm ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <div className="whitespace-pre-line">{message.content}</div>
                    
                    {/* Render charts for All India data */}
                    {message.hasCharts && message.location === 'India' && (
                      <div className="mt-4 space-y-4">
                        {/* Category Distribution Pie Chart */}
                        <div className="bg-card p-3 rounded-lg">
                          <h4 className="text-xs font-semibold mb-2">All India Category Distribution</h4>
                          <div className="h-32">
                            <ChartContainer
                              config={{
                                safe: { label: "Safe", color: "hsl(var(--safe))" },
                                semiCritical: { label: "Semi-Critical", color: "hsl(var(--semi-critical))" },
                                critical: { label: "Critical", color: "hsl(var(--critical))" },
                                overExploited: { label: "Over-Exploited", color: "hsl(var(--over-exploited))" }
                              }}
                            >
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={allBlocksData.categoryDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={20}
                                    outerRadius={40}
                                    dataKey="value"
                                    label={({ percentage }) => `${percentage}%`}
                                  >
                                    {allBlocksData.categoryDistribution.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                </PieChart>
                              </ResponsiveContainer>
                            </ChartContainer>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {allBlocksData.categoryDistribution.map((entry, index) => (
                              <div key={index} className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded" style={{ backgroundColor: entry.color }}></div>
                                <span className="text-xs">{entry.name}: {entry.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Historical Trend Chart */}
                        <div className="bg-card p-3 rounded-lg">
                          <h4 className="text-xs font-semibold mb-2">5-Year Category Trend</h4>
                          <div className="h-32">
                            <ChartContainer
                              config={{
                                safe: { label: "Safe", color: "hsl(var(--safe))" },
                                overExploited: { label: "Over-Exploited", color: "hsl(var(--over-exploited))" }
                              }}
                            >
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={allBlocksData.historicalTrend}>
                                  <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                                  <YAxis tick={{ fontSize: 10 }} />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Line type="monotone" dataKey="safe" stroke="hsl(var(--safe))" strokeWidth={2} name="Safe" />
                                  <Line type="monotone" dataKey="overExploited" stroke="hsl(var(--over-exploited))" strokeWidth={2} name="Over-Exploited" />
                                </LineChart>
                              </ResponsiveContainer>
                            </ChartContainer>
                          </div>
                        </div>

                        {/* Top 10 States Bar Chart */}
                        <div className="bg-card p-3 rounded-lg">
                          <h4 className="text-xs font-semibold mb-2">Top 10 States - Total Blocks</h4>
                          <div className="h-40">
                            <ChartContainer
                              config={{
                                total: { label: "Total Blocks", color: "hsl(var(--primary))" }
                              }}
                            >
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={allBlocksData.stateWiseData}>
                                  <XAxis 
                                    dataKey="state" 
                                    tick={{ fontSize: 8 }} 
                                    angle={-45}
                                    textAnchor="end"
                                    height={60}
                                  />
                                  <YAxis tick={{ fontSize: 10 }} />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Bar dataKey="total" fill="hsl(var(--primary))" />
                                </BarChart>
                              </ResponsiveContainer>
                            </ChartContainer>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Render charts for specific location data */}
                    {message.hasCharts && message.location && message.location !== 'India' && locationsData[message.location] && (
                      <div className="mt-4 space-y-4">
                        {(() => {
                          const locationData = locationsData[message.location];
                          return (
                            <>
                              {/* Location Recharge vs Extraction Chart */}
                              <div className="bg-card p-3 rounded-lg">
                                <h4 className="text-xs font-semibold mb-2">{locationData.name} - 5 Year Trend</h4>
                                <div className="h-32">
                                  <ChartContainer
                                    config={{
                                      recharge: { label: "Annual Recharge", color: "hsl(var(--primary))" },
                                      extraction: { label: "Extraction", color: "hsl(var(--destructive))" }
                                    }}
                                  >
                                    <ResponsiveContainer width="100%" height="100%">
                                      <LineChart data={locationData.historicalData}>
                                        <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                                        <YAxis tick={{ fontSize: 10 }} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Line type="monotone" dataKey="recharge" stroke="hsl(var(--primary))" strokeWidth={2} />
                                        <Line type="monotone" dataKey="extraction" stroke="hsl(var(--destructive))" strokeWidth={2} />
                                      </LineChart>
                                    </ResponsiveContainer>
                                  </ChartContainer>
                                </div>
                              </div>

                              {/* Location Category Distribution */}
                              <div className="bg-card p-3 rounded-lg">
                                <h4 className="text-xs font-semibold mb-2">{locationData.name} Area Category Distribution</h4>
                                <div className="h-32">
                                  <ChartContainer
                                    config={{
                                      safe: { label: "Safe", color: "hsl(var(--safe))" },
                                      semiCritical: { label: "Semi-Critical", color: "hsl(var(--semi-critical))" },
                                      critical: { label: "Critical", color: "hsl(var(--critical))" },
                                      overExploited: { label: "Over-Exploited", color: "hsl(var(--over-exploited))" }
                                    }}
                                  >
                                    <ResponsiveContainer width="100%" height="100%">
                                      <PieChart>
                                        <Pie
                                          data={locationData.categoryDistribution}
                                          cx="50%"
                                          cy="50%"
                                          innerRadius={20}
                                          outerRadius={40}
                                          dataKey="value"
                                          label={({ value }) => `${value}%`}
                                        >
                                          {locationData.categoryDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                          ))}
                                        </Pie>
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                      </PieChart>
                                    </ResponsiveContainer>
                                  </ChartContainer>
                                </div>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    )}

                    {/* View Location and INGRES Map Buttons */}
                    {message.hasMapAction && message.location && (
                      <div className="mt-3 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewLocation(message.location!, locationsData[message.location!]?.coordinates)}
                          className="flex items-center gap-1 text-xs"
                        >
                          <MapPin className="h-3 w-3" />
                          View {message.location} on Map
                        </Button>
                        {locationsData[message.location!] && (
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => openIngresMap(message.location!)}
                            className="flex items-center gap-1 text-xs"
                          >
                            🌐 View {message.location} INGRES Map
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                  {message.type === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Sample Queries */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <div className="text-xs text-muted-foreground mb-2">Try asking:</div>
              <div className="flex flex-wrap gap-1">
                {sampleQueries.slice(0, 3).map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendMessage(query)}
                    className="text-xs h-6 px-2"
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about groundwater data..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                size="icon"
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatBot;