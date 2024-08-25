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
      
      <div className="flex flex-col items-center">
        {/* Color grid */}
        <div className="grid grid-cols-3 grid-rows-3 gap-1">
          <div className="bg-[#3b4994] w-8 h-8"></div>
          <div className="bg-[#8c62aa] w-8 h-8"></div>
          <div className="bg-[#be64ac] w-8 h-8"></div>
          <div className="bg-[#5698b9] w-8 h-8"></div>
          <div className="bg-[#a5add3] w-8 h-8"></div>
          <div className="bg-[#dfb0d6] w-8 h-8"></div>
          <div className="bg-[#5ac8c8] w-8 h-8"></div>
          <div className="bg-[#ace4e4] w-8 h-8"></div>
          <div className="bg-[#e8e8e8] w-8 h-8"></div>
        </div>

        {/* X-axis label */}
        <div className="flex justify-between w-full mt-2">
          <span className="text-sm" style={{ color: 'black' }}>Low % POC</span>
          <span className="text-sm" style={{ color: 'black' }}>High % POC</span>
        </div>
      </div>

      {/* Y-axis label */}
      <div className="flex justify-between w-full mt-2">
        <span className="text-sm" style={{ color: 'black' }}>Low Access</span>
        <span className="text-sm" style={{ color: 'black' }}>High Access</span>
      </div>
    </div>
  );
};

export default Legend;
