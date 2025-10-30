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
import { redirect } from "next/navigation";
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
  const { width, height } = props;
  const [position, setPosition] = useState({ lat: 0, lng: 0 });

  function PlaceMarker() {
    console.log(position.lat);

    useMapEvent("click", (e) => {
      setPosition(e.latlng);
    });

    return position === null ? null : (
      <Marker position={position} icon={customGhostIcon}>
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
    <section>
      <div>
        <h2 className="page-title">Add New Place</h2>
      </div>

      <div>
        <form action={CreateNewPlace} className="flex flex-col gap-2 mt-4">
            <label htmlFor="endpoint">Endpoint: </label>
            <input
              type="text"
              name="endpoint"
              id="endpoint"
              className="border-2 border-(--secondary-accent-colour) rounded-xl bg-(--card-colour) p-1 ml-2"
              required
            />
        
            <label htmlFor="endpoint">Location Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              className="border-2 border-(--secondary-accent-colour) rounded-xl bg-(--card-colour) p-1 ml-2"
              required
            />
          
            <label htmlFor="owner">Owners Username: </label>
            <input
              type="text"
              name="owner_username"
              id="owner_username"
              className="border-2 border-(--secondary-accent-colour) rounded-xl bg-(--card-colour) p-1 ml-2"
              required
            />

          <div className="text-center">
            <p className="text-lg">Location Coordinates</p>
            <label htmlFor="x">X:</label>
            <input
              type="text"
              name="x"
              value={position.lat}
              required
              readOnly
              className="border-2 border-(--secondary-accent-colour) rounded-xl bg-(--card-colour) p-1 m-2"
            />
            <label htmlFor="y">Y:</label>
            <input
              type="text"
              name="y"
              value={position.lng}
              required
              readOnly
              className="border-2 border-(--secondary-accent-colour) rounded-xl bg-(--card-colour) p-1 ml-2"
            />
          </div>

          <div className="flex justify-center">
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

          <div className="flex justify-center">
          <button
            type="submit"
            className="cursor-pointer rounded-[50px] border-2 border-(--secondary-accent-colour) py-[0.65rem] px-4 w-[180px] hover:bg-(--hover-colour) hover:border-(--hover-colour) hover:text-black bg-(--card-colour) mb-4 mt-3"
          >
            Create New Place
          </button>
          </div>
        </form>
      </div>
    </section>
  );
}
