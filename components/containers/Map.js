import { MapContainer, Marker, Popup, TileLayer ,useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
// import { FaMapMarkedAlt } from 'react-icons/fa'
import { useEffect, useState } from 'react';
import L from 'leaflet';
const myIcon = new L.Icon({
    iconUrl: '/images/SMOR-512.png',
    
    
    iconSize: new L.Point(15, 15),

});
const LocationFinderDummy = (props) => {

    const map = useMapEvents({
        click(e) {
            console.log(e.latlng);
            props.setCord([e.latlng.lat,e.latlng.lng])
        },
        
    });
    return null;
};


const Map = (props) => {

    const [curr  , setCurr ] = useState();
    const [cord , setCord] = useState([0,0]);

    const [loaded, setLoaded] = useState(false);

    useEffect( ()=>{
      if(!loaded){
        setCord([props.currentloc[0],props.currentloc[1]])
      //  navigator.geolocation.getCurrentPosition((d)=>{console.log(d);setCord([d.coords.latitude,d.coords.longitude]); },()=>{} ,{enableHighAccuracy: true} ) 
        setLoaded(true)

      }
      
    })
    
    const lociqapikey = 'pk.f4d28c6a8470e30d29abbfd257863a07'
    const apiKey = 'RbI49y9cYQMEqrerTqxP5-7AHw6CWnVppIPRJpfRNXc'
    const accessToken = 'pk.eyJ1IjoicmFodWxrdW1hcjMxMTIiLCJhIjoiY2wyaHNveXBkMGc1aDNjcDl5N2Rib2Q4bCJ9.HucJLkUWIAv1XHY1d09ESg'
    const Tomtomapikey = 'uTJOgcQPSGdZvn59S6D9NWt7GynQpAAN'
    return (
<>
      {loaded ?
      <MapContainer   center={[props.currentloc[0],props.currentloc[1]]} zoom={15} scrollWheelZoom={false} style={{height: "100%", width: "100%"}} >

        <TileLayer
          //attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" //osm 

          // url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // google
          // subdomains={['mt0','mt1','mt2','mt3']}
          // maxZoom={20}
           
          // url={'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token='+accessToken } // mapbox
          // tileSize={512}
          // zoomOffset={-1}  //

          // url={'https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?&apiKey=908e1bbc2724478d90e6643e68e1cf64'} //geoapify

          // url={`https://2.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/512/png8?apiKey=${apiKey}&ppi=320`}
          
          // url ={`https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${lociqapikey}`} // lociq

          url={`https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=${Tomtomapikey}`}

        />
        <LocationFinderDummy setCord={(e)=>{setCord(e);props.getcoords(e) }} />

         <Marker position={[cord[0],cord[1]]} draggable={true} animate={true} icon={myIcon} > <Popup>{props.placename}</Popup></Marker>
        
        

      </MapContainer>
      :<></>}
      </>
    )
  }
  export default Map