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
  const { width, height, placeData } = props;
  // console.log(placeData);

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

  function MapPlaces() {
    return placeData.map((place, index) => {
      const coords = { lat: place.x, lng: place.y };
      return (
        <Marker key={index} position={coords}>
          <Popup>
            {place.name} <br />
            {place.city}
          </Popup>
        </Marker>
      );
    });
  }

  return (
    <div className={`w-[${props.width}]% h-[${props.height}]vh`}>
      <MapContainer
        center={{ lat: 51.53592923078666, lng: -0.44769287109375006 }}
        zoom={7}
        style={{ height: `${props.height}vh`, width: `${props.width}%` }}
        scrollWheelZoom={true}
      >
        <PlaceMarker />
        <MapPlaces />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={{ lat: 51.505, lng: -0.09 }}>
          <Popup>Our office: Contact us here</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
