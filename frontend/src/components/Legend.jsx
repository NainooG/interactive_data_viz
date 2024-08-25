"use client";
import React from 'react';

const Legend = () => {
  return (
    <div 
      className="absolute bottom-20 left-10 bg-white p-6 border-2 border-gray-300 rounded shadow-lg z-50"
      style={{
        display: 'block',
        visibility: 'visible',
        zIndex: 1000,
        color: 'black',
        width: '250px',  // Increased width for more space
      }}
    >
      <div className="text-center mb-4 font-bold text-lg" style={{ color: 'black' }}>Bivariate Legend</div>
      
      <div className="flex items-center justify-between">
        {/* Y-axis label on the left */}
        <div className="flex flex-col justify-between text-sm" style={{ textAlign: 'right', marginRight: '12px' }}>
          <span style={{ marginBottom: '26px', marginTop: '8px' }}>High % POC</span>
          <span style={{ marginTop: '26px' }}>Low % POC</span>
        </div>
        
        {/* Color grid */}
        <div className="flex flex-col">
          <div className="grid grid-cols-3 grid-rows-3">
            <div className="bg-[#3b4994] w-[50px] h-[50px]" />
            <div className="bg-[#8c62aa] w-[50px] h-[50px]" />
            <div className="bg-[#be64ac] w-[50px] h-[50px]" />
            <div className="bg-[#5698b9] w-[50px] h-[50px]" />
            <div className="bg-[#a5add3] w-[50px] h-[50px]" />
            <div className="bg-[#dfb0d6] w-[50px] h-[50px]" />
            <div className="bg-[#5ac8c8] w-[50px] h-[50px]" />
            <div className="bg-[#ace4e4] w-[50px] h-[50px]" />
            <div className="bg-[#e8e8e8] w-[50px] h-[50px]" />
          </div>

          {/* X-axis label below the grid */}
          <div className="flex justify-between w-full mt-2">
            <span className="text-sm" style={{ marginRight: '50px', color: 'black' }}>Low Access</span>
            <span className="text-sm" style={{ color: 'black' }}>High Access</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legend;
