import { findByText } from '@testing-library/dom';
import React, { Component } from 'react';
import Login from '../Login/login';
import axios from 'axios';
import './maps.css';
import { Map, GoogleApiWrapper, Marker,InfoWindow } from 'google-maps-react'


class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showingInfoWindow: false,  
      activeMarker: {},          
      selectedPlace: {}
     }
  }
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  render() { // let url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=AIzaSyDQVpu7B088F0hrDQXlroaGVSvcd0jSJaw"
    // let url = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDQVpu7B088F0hrDQXlroaGVSvcd0jSJaw&q=current+location&zoom=9" 
    
    debugger;
    return (
    <div>
             <div className="map-container" >
                    {/* <Map
                    google={this.props.google}
                    zoom={14}
                    initialCenter={{ lat: 36.066631802416566, lng: -93.72612898997339 }}>
                    </Map>  */}
                    </div>
                    { <Map
          google={this.props.google}
          zoom={8}
          width="600"
          height="450"
          initialCenter={{ lat: 47.444, lng: -122.176}}
        />}

                    {/* <iframe
                        width="600"
                        height="450"
                        loading="lazy"
                        allowFullScreen
                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDQVpu7B088F0hrDQXlroaGVSvcd0jSJaw
                            &q=current+location&center=36.066631802416566,-93.72612898997339">
                    </iframe> */}
                    {/* <Map
        google={this.props.google}
        zoom={14}
        initialCenter={
          {
            lat: 36.066631802416566,
            lng: -93.72612898997339
          }
        }
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'Home'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map> */}
                    
                </div>
        );
        
    }
}
export default Maps;