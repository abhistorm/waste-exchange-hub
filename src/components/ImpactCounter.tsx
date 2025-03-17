
import React, { useState, useEffect } from 'react';
import { RefreshCcw, Zap, TreeDeciduous, Recycle } from 'lucide-react';
import { cn } from '@/lib/utils';

type ImpactData = {
  wasteDiverted: number;
  co2Saved: number;
  treesEquivalent: number;
  successfulExchanges: number;
};

// These would eventually come from an API
const initialImpactData: ImpactData = {
  wasteDiverted: 15780, // in kg
  co2Saved: 4356, // in kg
  treesEquivalent: 218,
  successfulExchanges: 842,
};

// Simulate real-time increase rate (would be replaced by real data)
const rateOfIncrease = {
  wasteDiverted: 2.5, // kg per second
  co2Saved: 0.75, // kg per second
  treesEquivalent: 0.05, // trees per second
  successfulExchanges: 0.08, // exchanges per second
};

interface ImpactCounterProps {
  className?: string;
}

const ImpactCounter = ({ className }: ImpactCounterProps) => {
  const [impact, setImpact] = useState<ImpactData>(initialImpactData);
  const [isLive, setIsLive] = useState<boolean>(true);

  useEffect(() => {
    // Update counters in real-time to simulate live data
    if (!isLive) return;

    const interval = setInterval(() => {
      setImpact(prev => ({
        wasteDiverted: prev.wasteDiverted + rateOfIncrease.wasteDiverted,
        co2Saved: prev.co2Saved + rateOfIncrease.co2Saved,
        treesEquivalent: prev.treesEquivalent + rateOfIncrease.treesEquivalent,
        successfulExchanges: prev.successfulExchanges + rateOfIncrease.successfulExchanges,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isLive]);

  // Format numbers with commas and appropriate precision
  const formatNumber = (num: number, precision = 0) => {
    return num.toFixed(precision).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-medium text-gray-700 flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className={`${isLive ? 'animate-ping' : ''} absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75`}></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Live Impact Tracker
        </h3>
        <button 
          onClick={() => setIsLive(!isLive)} 
          className="text-xs flex items-center gap-1 text-gray-500 hover:text-primary transition-colors"
        >
          {isLive ? 'Pause' : 'Resume'} <RefreshCcw className="h-3 w-3" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass p-3 rounded-lg flex flex-col items-center justify-center">
          <Recycle className="h-5 w-5 text-blue-500 mb-1" />
          <span className="text-xl font-bold text-gray-800">{formatNumber(impact.wasteDiverted, 0)}<span className="text-xs font-normal ml-1">kg</span></span>
          <span className="text-xs text-gray-600">Waste Diverted</span>
        </div>
        
        <div className="glass p-3 rounded-lg flex flex-col items-center justify-center">
          <Zap className="h-5 w-5 text-yellow-500 mb-1" />
          <span className="text-xl font-bold text-gray-800">{formatNumber(impact.co2Saved, 0)}<span className="text-xs font-normal ml-1">kg</span></span>
          <span className="text-xs text-gray-600">CO₂ Saved</span>
        </div>
        
        <div className="glass p-3 rounded-lg flex flex-col items-center justify-center">
          <TreeDeciduous className="h-5 w-5 text-green-500 mb-1" />
          <span className="text-xl font-bold text-gray-800">{formatNumber(impact.treesEquivalent, 0)}</span>
          <span className="text-xs text-gray-600">Trees Equivalent</span>
        </div>
        
        <div className="glass p-3 rounded-lg flex flex-col items-center justify-center">
          <div className="text-xl font-bold text-gray-800">{formatNumber(impact.successfulExchanges, 0)}</div>
          <span className="text-xs text-gray-600">Exchanges</span>
        </div>
      </div>
    </div>
  );
};

export default ImpactCounter;
