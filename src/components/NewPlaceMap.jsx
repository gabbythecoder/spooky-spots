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
import { redirect } from "next/navigation";

export default function MyMap(props) {
  const { width, height } = props;
  const [position, setPosition] = useState({ lat: 0, lng: 0 });

  function PlaceMarker() {
    console.log(position.lat);

    useMapEvent("click", (e) => {
      setPosition(e.latlng);
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>
          <div className="flex flex-col text-center">
            <p>
              Lat: {position.lat} <br /> Lng: {position.lng}
            </p>
          </div>
        </Popup>
      </Marker>
    );
  }

  async function CreateNewPlace(formData) {
    const formValues = {
      endpoint: formData.get("endpoint"),
      name: formData.get("name"),
      owner_username: formData.get("owner_username"),
      x: formData.get("x"),
      y: formData.get("y"),
    };
    console.log(formValues);

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addnewplace`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formValues }),
    });

    redirect("/");
  }

  return (
    <>
      <form action={CreateNewPlace} className="flex flex-col gap-5">
        <div className="form-group">
          <label htmlFor="endpoint">Endpoint</label>
          <input type="text" name="endpoint" />
        </div>

        <div className="form-group">
          <label htmlFor="endpoint">Location Name</label>
          <input type="text" name="name" />
        </div>

        <div className="form-group">
          <label htmlFor="owner">Owners Username</label>
          <input type="text" name="owner_username" />
        </div>

        <div className="form-group">
          <input type="text" name="x" value={position.lat} readOnly />
          <input type="text" name="y" value={position.lng} readOnly />
        </div>

        <button type="submit">Create New Place</button>
      </form>
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
    </>
  );
}
