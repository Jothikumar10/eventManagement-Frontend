import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Analytics() {
  const [data, setData] = useState({
    totalRevenue: 12450,
    ticketSales: 840,
    growthRate: 12.5,
    activeEvents: 8,
    userDemographics: [
      { label: "Tech", value: 45 },
      { label: "Business", value: 30 },
      { label: "Art", value: 25 },
    ],
  });

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-10 space-y-10">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase">
            Platform <span className="text-yellow-400">Insights</span>
          </h1>
          <p className="text-gray-500 text-sm font-medium">Real-time performance metrics for EventHub.</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-2xl flex items-center gap-3">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Live Updates Enabled</span>
        </div>
      </div>

      {/* --- TOP TIERS STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnalyticCard 
          label="Total Revenue" 
          value={`$${data.totalRevenue.toLocaleString()}`} 
          trend="+8.2%" 
          isPositive={true} 
        />
        <AnalyticCard 
          label="Tickets Issued" 
          value={data.ticketSales} 
          trend="+14.1%" 
          isPositive={true} 
        />
        <AnalyticCard 
          label="Avg. Growth" 
          value={`${data.growthRate}%`} 
          trend="-2.4%" 
          isPositive={false} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* --- REGISTRATION VELOCITY (Main Chart Area) --- */}
        <div className="lg:col-span-8 bg-gray-900/40 border border-gray-800 rounded-[2.5rem] p-8 relative overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-black uppercase tracking-tight">Registration Velocity</h2>
            <select className="bg-black border border-gray-700 text-xs font-bold rounded-lg px-3 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          
          {/* Mock Chart Visualization */}
          <div className="h-64 w-full flex items-end justify-between gap-2 px-2">
            {[40, 70, 45, 90, 65, 80, 100].map((height, i) => (
              <div key={i} className="flex-1 group relative">
                <div 
                  style={{ height: `${height}%` }} 
                  className="w-full bg-gradient-to-t from-yellow-400/20 to-yellow-400 rounded-t-xl transition-all duration-500 group-hover:brightness-125"
                ></div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 font-bold uppercase">Day {i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- CATEGORY BREAKDOWN --- */}
        <div className="lg:col-span-4 bg-gray-900/40 border border-gray-800 rounded-[2.5rem] p-8">
          <h2 className="text-xl font-black uppercase tracking-tight mb-8">Interests</h2>
          <div className="space-y-6">
            {data.userDemographics.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="text-yellow-400">{item.value}%</span>
                </div>
                <div className="w-full bg-black h-2 rounded-full overflow-hidden border border-gray-800">
                  <div 
                    className="bg-yellow-400 h-full transition-all duration-1000" 
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-indigo-600/10 border border-indigo-500/20 rounded-3xl">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Pro Tip</p>
            <p className="text-xs text-gray-300 leading-relaxed">
              Tech events are currently seeing a **45% higher** conversion rate than Business workshops.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- SUB-COMPONENTS --- */

const AnalyticCard = ({ label, value, trend, isPositive }) => (
  <div className="bg-gray-900/30 border border-gray-800 p-8 rounded-[2.5rem] hover:border-gray-600 transition-colors group">
    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">{label}</p>
    <div className="flex items-end justify-between">
      <h3 className="text-4xl font-black text-white group-hover:text-yellow-400 transition-colors">{value}</h3>
      <div className={`px-3 py-1 rounded-full text-[10px] font-black ${isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
        {trend}
      </div>
    </div>
  </div>
);