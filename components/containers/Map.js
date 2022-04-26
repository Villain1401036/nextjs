import { MapContainer, Marker, Popup, TileLayer ,useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { useState } from 'react';


const LocationFinderDummy = (props) => {

    const map = useMapEvents({
        click(e) {
            console.log(e.latlng);
            props.setCord(e.latlng)
        },
        
        
        
    });
    return null;
};
const Map = () => {

    const [cord , setCord] = useState(null);
    console.log(cord);
    return (
      <MapContainer center={[23.68754,86.148285]} zoom={13} scrollWheelZoom={false} style={{height: "40vh", width: "90%"}} >

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationFinderDummy setCord={(e)=>{setCord(e)}} />
        { cord != null && <Marker position={[cord.lat,cord.lng]} /> }
      </MapContainer>
    )
  }
  export default Map