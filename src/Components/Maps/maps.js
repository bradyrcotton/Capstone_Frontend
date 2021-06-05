import React from "react";
import getDistance from 'geolib/es/getDistance';
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
  width:"100vw",
  height:"75vh",
};
const center = {
  lat:36.066631802416566,
  lng:-93.72612898997339,
};
const mapOptions = {
  mapTypeId: 'satellite'
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: true,
  satellite: true, 

}

const clicks = {
  t : 0, // flight time to target
  h : 0, //drop in inches
  d : 0, // distance in yards      
  cz : 100, // current zero
  m : 0, // number of mil adjustment needed 
  c : 0, // number of "clicks" needed to adjust
  sc : 10, // scope type in clicks "4 or 10"
  y : 0, // for converting meters to yards 
  dist: null, // distance
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

  
return (<div>
  {console.log('selected', selected)}
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
        setSelected(marker)
        clicks.dist= getPreciseDistance(
          {latitude: marker.lat, longitude:marker.lng},
          {latitude:36.066631802416566, longitude:-93.72612898997339},
          
          )
          console.log(marker.lat, marker.lng)
          console.log(clicks.dist)
          clicks.t = 0 // flight time to target
          clicks.h = 0 //drop in inches
          clicks.d = 0 // distance in yards      
          // clicks.cz = 0, // current zero
          clicks.m = 0 // number of mil adjustment needed 
          clicks.c = 0 // number of "clicks" needed to adjust
          // clicks.sc = 0, // scope type in clicks "4 or 10"
          clicks.y = 0 // for converting meters to yards 
          // clicks.dist = 0, // distance
          clicks.y = clicks.dist * 1.0936133 // converting distance from meters to yards
          clicks.y=Math.round(clicks.y);
          console.log('yards',clicks.y)
          if(clicks.y !== 0){
            clicks.d=clicks.y
          }
          console.log('conyards',clicks.d)
          clicks.t = ((clicks.d*3)-clicks.cz)/3020
          console.log('time',clicks.t)
          clicks.h= (.5*(32*(clicks.t)^2))*12
          console.log('drop',clicks.h)
          clicks.m = clicks.h / ((clicks.d/25)*.9)
          console.log('mils',clicks.m)
          clicks.c = (clicks.m*clicks.sc)/2;
          clicks.c=Math.round(clicks.c);
              console.log('dist', clicks.c)
      }}
       />)}
       {selected ? (
       <InfoWindow position={{lat: selected.lat, lng: selected.lng }} onCloseClick={() => {setSelected(null);}}>
         <div>
           <h2>{clicks.c} Clicks</h2>
           <h4>{clicks.y} Yards</h4>
           <p>Marked {formatRelative(selected.time, new Date())} </p>
         </div> 
       </InfoWindow>) : null}

   </GoogleMap>
   <button className='add' onClick={refreshPage}>Reset</button>
</div>);
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

function refreshPage() {
  window.location.reload();
}

