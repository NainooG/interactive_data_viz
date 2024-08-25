"use client";
import React from 'react';

const Legend = () => {
  return (
    <div className="absolute bottom-10 left-10 bg-white p-4 border-2 border-gray-300 rounded shadow-lg">
      <div className="text-center mb-2 font-bold">Bivariate Legend</div>
      <div className="flex">
        <div className="flex flex-col">
          <div className="flex-1">High % POC</div>
          <div className="flex-1"></div>
          <div className="flex-1">Low % POC</div>
        </div>
        <div className="flex flex-col">
          <div className="flex-1 bg-[#3b4994]"></div>
          <div className="flex-1 bg-[#8c62aa]"></div>
          <div className="flex-1 bg-[#be64ac]"></div>
        </div>
        <div className="flex flex-col">
          <div className="flex-1 bg-[#5698b9]"></div>
          <div className="flex-1 bg-[#a5add3]"></div>
          <div className="flex-1 bg-[#dfb0d6]"></div>
        </div>
        <div className="flex flex-col">
          <div className="flex-1 bg-[#5ac8c8]"></div>
          <div className="flex-1 bg-[#ace4e4]"></div>
          <div className="flex-1 bg-[#e8e8e8]"></div>
        </div>
        <div className="flex flex-col">
          <div className="flex-1">High Access</div>
          <div className="flex-1"></div>
          <div className="flex-1">Low Access</div>
        </div>
      </div>
    </div>
  );
};

export default Legend;
