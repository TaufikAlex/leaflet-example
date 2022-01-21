import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
// import RoutineMachine from './RoutingMachine';

const Map = (props) => {
  const center = [-6.182923326297751, 106.93804429954233];
  const radius = [700];
  const [state, setState] = React.useState({
    lat: '',
    long: '',
    acc: '',
  });

  // const GetPosition = (position) => {
  //   const {
  //     latitude,
  //     longitude,
  //     // accuracy
  //   } = position.coords;

  //   setState({
  //     lat: latitude,
  //     long: longitude,
  //     // acc: accuracy
  //   });

  //   return position;
  // };

  // if (!navigator.geolocation) {
  //   console.log('Your Browser its not support!');
  // } else {
  //   navigator.geolocation.getCurrentPosition(GetPosition);
  // }

  const fillBlueOptions = { fillColor: 'red' };

  React.useEffect(() => {}, []);

  const [mobil, setMobil] = React.useState({
    latBase: -6.1841776,
    longBase: 105.90904,
    latTowing: -6.1841776,
    longTowing: 105.917,
  });

  // Lat: -6.1841776 Long : 106.9004588

  const HandleMath = (new_lat, new_long) => {
    const distance =
      1.609344 * // convert kilometer
      3963 * // awalnya miles
      Math.acos(
        Math.sin(mobil.latBase) * Math.sin(new_lat) +
          Math.cos(mobil.latBase) *
            Math.cos(new_lat) *
            Math.cos(new_long - mobil.longBase)
      );

    let hasil;

    // 5.74 perbandingan dari radius dengan jarak antar 2 latitude , longitude.
    if ((distance / radius) * 100 > 5.74) {
      hasil = 'diluar';
    } else {
      hasil = 'didalam';
    }

    // if (hasil === 'diluar') {
    //   console.log('malinggg!!!!');
    // }

    return hasil;
  };

  useEffect(() => {
    let new_lat = mobil.latBase;
    let new_long = mobil.longBase;
    let range = 0;
    setInterval(() => {
      HandleMath(new_lat, new_long);
      if (range < 635) {
        setMobil({
          ...mobil,
          latTowing: new_lat,
          longTowing: new_long,
        });
        new_lat = new_lat + 0.00001;
        range += 1;
      } else {
        new_lat = mobil.latBase;
        new_long = mobil.longBase;
        range = 0;
      }
    }, 50);
  }, []);

  return (
    <MapContainer
      dragging={true}
      animate={true}
      doubleClickZoom={false}
      id="mapId"
      zoom={14}
      center={[-6.1841776, 105.9]}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={[mobil.latTowing, mobil.longTowing]}>
        <Popup>{`Your Location222222 : Lat: ${state.lat} Long : ${state.long}`}</Popup>
      </Marker>
      <Marker position={[mobil.latBase, mobil.longBase]}>
        <Popup>{`Your Location : Lat: ${state.lat} Long : ${state.long}`}</Popup>
      </Marker>
      <Circle
        center={[-6.1841776, 105.90904]}
        pathOptions={fillBlueOptions}
        radius={radius}
      />
    </MapContainer>
  );
};

export default Map;
