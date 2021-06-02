import React, { Component } from 'react';
import getDistance from 'geolib/es/getDistance';
import { getPreciseDistance } from 'geolib';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            drop:null
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
    }
    render() { 
        return ( 
            <h1>Calculator</h1>
         );
    }
}
 
export default Calculator ;