import React from 'react';
import MapComponent from '../components/MapComponent';


function App() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <header className="w-full bg-gray-800 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Interactive Map with Bivariate Legend</h1>
      </header>

      <main className="flex-1 w-full flex justify-center items-center">
        <MapComponent />
      </main>

    </div>
  );
}

export default App;
