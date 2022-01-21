import React, { useCallback, useMemo, useRef, useState } from 'react';
// import {
//   MapContainer,
//   Marker,
//   Popup,
//   TileLayer,
//   Polyline,
//   Map,
// } from 'react-leaflet';

import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import './App.css';

function App() {
  const center = {
    lat: -6.182923326297751,
    lng: 106.93804429954233,
  };
  const state = {
    lat: -6.182923326297751,
    lng: 106.93804429954233,
    zoom: 11,
    data: [
      {
        from_lat: '-6.182923326297751',
        from_long: '106.93804429954299',
        id: '132512',
        to_lat: '12.92732',
        to_long: '77.63575',
      },
      {
        from_lat: '-5.182923326297799',
        from_long: '106.93804429954233',
        id: '132513',
        to_lat: '12.92768',
        to_long: '77.62664',
      },
    ],
  };
  const position = [state.lat, state.lng];

  const from_lat = state.data.map((start) => start.from_lat);
  const to_lat = state.data.map((to) => to.to_lat);

  const from_long = state.data.map((start) => start.from_long);
  const to_long = state.data.map((to) => to.to_long);

  return (
    <MapContainer
      // style={{ height: '100vh' }}
      center={center}
      zoom={state.zoom}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {state.data.map(({ id, from_lat, from_long, to_lat, to_long }) => {
        return (
          <Polyline
            key={id}
            positions={[
              [from_lat, from_long],
              [to_lat, to_long],
            ]}
            color={'blue'}
          />
        );
      })}
    </MapContainer>
  );
}

export default App;
