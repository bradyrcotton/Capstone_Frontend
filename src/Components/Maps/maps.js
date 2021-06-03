import React from "react";
import { getPreciseDistance } from 'geolib';
import{
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import {formatRelative} from "date-fns";

// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox"
import "@reach/combobox/styles.css";

const libraries = ["places"];
const mapContainerStyle = {
  width:"75vw",
  height:"75vh",
};
const center ={
  lat:36.066631802416566,
  lng:-93.72612898997339,
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: true, 

}

export default function GMap() {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey:"AIzaSyDQVpu7B088F0hrDQXlroaGVSvcd0jSJaw",
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  const panTo = React.useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng})
    mapRef.current.setZoom(18);
  }, []);
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  
return <div>
  {/* <h1>
    Marker Your Target{" "}
    <span role="img" aria-label="target" >
    🎯
    </span>
  </h1> */}
  <Locate panTo={panTo} />
  <GoogleMap 
  mapContainerStyle={mapContainerStyle} 
  zoom= {12} 
  center={center}
  options = {options}
  onLoad={onMapLoad}
  onClick={(event) => {
    console.log(event.latLng.lat(),event.latLng.lng())
    setMarkers(current => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      }
    ])

  }}
   >
     {markers.map(marker => <Marker key={marker.time.toISOString()}
      position={{lat: marker.lat, lng:marker.lng }}
      onClick={() => {
        setSelected(marker);
      }}
       />)}
       {selected ? (<InfoWindow position={{lat: selected.lat, lng: selected.lng }} 
       onCloseClick={() => {
         setSelected(null);
       }} 
       >
         <div>
           <h2>Target Marked!</h2>
           <p>Marked {formatRelative(selected.time, new Date())} </p>
         </div>
       </InfoWindow>) : null}
   </GoogleMap>
</div>;
}
function Locate({panTo}) {
  return(
  <button className="locate" 
  onClick={() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => null
     );
  }}>
    <span role="img" aria-label="target"  >
    🎯
    </span>
    </button>
  );
}
let t = 0; // flight time to target
let h = 0; //drop in inches
let d = 500; // distance in yards      
let cz = 300; // current zero
let m = 0; // number of mil adjustment needed 
let c = 0; // number of "clicks" needed to adjust
let sc = 10; // scope type in clicks "4 or 10"
let y = 0; // for converting meters to yards 

let dist = getPreciseDistance(
    {latitude:36.06663921879466, longitude:-93.72614005669182},
    {latitude:36.067271, longitude:-93.721822}
    )
y = dist * 1.0936133 // converting distance from meters to yards
if(y !== 0){
    d=y
}
t = (d*3-cz)/3020
h= (.5*(32*(t)^2))*12
m = h / ((d/25)*.9)
c = m*sc;
c=Math.round(c);
    console.log('dist', dist)
    debugger;
