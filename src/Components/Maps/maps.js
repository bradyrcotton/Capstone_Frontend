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
import axios from 'axios';


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

  
  const myLatLng = React.useCallback(({lat, lng}) => {
    // myLat : ({lat})
    // myLng : ({lng})
    
  })

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
  if (localStorage.getItem("shooter") === null ){
    window.location ='/'
  }
  
return (<div>
  {console.log('selected', selected)}
  
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
        
        console.log ('myLat', myLatLng.myLat)
        navigator.geolocation.getCurrentPosition(
          (position) => {
            
            myLatLng({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            
          
            clicks.dist= getPreciseDistance(
              {latitude: marker.lat, longitude:marker.lng},
              {latitude:position.coords.latitude, longitude:position.coords.longitude},
              
              )
              console.log(clicks.dist)
              calculate();
              setSelected(marker)
            }
            );
            
              
              
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
    ????
    </span>
    </button>
  
  );
}

function refreshPage() {
  window.location.reload();
}
function calculate(){
  clicks.t = 0 // flight time to target
  clicks.h = 0 //drop in inches
  clicks.d = 0 // distance in yards      
  clicks.m = 0 // number of mil adjustment needed 
  clicks.c = 0 // number of "clicks" needed to adjust
  clicks.y = 0 // for converting meters to yards 
  clicks.y = clicks.dist * 1.0936133 // converting distance from meters to yards
  clicks.y=Math.round(clicks.y);
  console.log('yards',clicks.y)
  if(clicks.y !== 0){
    clicks.d=clicks.y
  }
  clicks.t = ((clicks.d*3)-clicks.cz)/3020
  clicks.h= (.5*(32*(clicks.t)^2))*12
  clicks.m = clicks.h / ((clicks.d/25)*.9)
  clicks.c = (clicks.m*clicks.sc)/2;
  clicks.c=Math.round(clicks.c);
  
  
  
  }
