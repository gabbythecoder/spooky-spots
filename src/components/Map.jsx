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
import Link from "next/link";
import L from "leaflet";

const customGhostIcon = L.icon({
  iconUrl: "leaflet/images/ghost-icon.png",
  iconRetinaUrl: "leaflet/images/ghost-icon-2x.png",
  shadowUrl: "/leaflet/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MyMap(props) {
  const { width, height, placeData } = props;

  function PlaceMarker() {
    const [position, setPosition] = useState(null);

    useMapEvent("click", (e) => {
      setPosition(e.latlng);
    });

    return position === null ? null : (
      <Marker position={position} icon={customGhostIcon}>
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
        <Marker key={index} position={coords} icon={customGhostIcon}>
          <Popup>
            <div className="flex flex-col items-center">
              <Link href={`/${place.endpoint}`} tabIndex={0}>
                {place.name}
              </Link>
              {place.city}
            </div>
          </Popup>
        </Marker>
      );
    });
  }

  return (
    <div className="flex justify-center">
      <MapContainer
        center={{ lat: 52.69683795165007, lng: -1.4563741087682107 }}
        zoom={7}
        style={{ height: `${props.height}vh`, width: `${props.width}%` }}
        scrollWheelZoom={true}
      >
        <MapPlaces />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={{ lat: 51.505, lng: -0.09 }} icon={customGhostIcon}>
          <Popup>Our office: Contact us here</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
