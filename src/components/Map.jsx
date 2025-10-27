import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvent,
  useMap,
} from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import Link from "next/link";

export default function MyMap(props) {
  const { position, zoom } = props;

  console.log(props);

  function PlaceMarker() {
    const [position, setPosition] = useState(null);

    useMapEvent("click", (e) => {
      setPosition(e.latlng);
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>
          <div className="flex flex-col text-center">
            <Link href="/">Home</Link>
            <p>
              Lat: {position.lat} <br /> Lng: {position.lng}
            </p>
          </div>
        </Popup>
      </Marker>
    );
  }

  return (
    <div className={`w-[${props.width}]% h-[${props.height}]vh`}>
      <MapContainer
        center={{ lat: 53.5, lng: -1.509 }}
        zoom={8}
        style={{ height: `${props.height}vh`, width: `${props.width}%` }}
        scrollWheelZoom={true}
      >
        <PlaceMarker />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={{ lat: 51.505, lng: -0.09 }}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
