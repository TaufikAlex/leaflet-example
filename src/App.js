import React from 'react';
import './App.css';
import Map from './Map';
import RealtimeMaps from './RealtimeMaps';
function App() {
  return (
    <div className="leaflet-container">
      {/* <Map /> */}
      <RealtimeMaps />
    </div>
  );
}

export default App;
