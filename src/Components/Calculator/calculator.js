import React, { Component } from 'react';

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
         
         
        t = (d*3-cz)/3020
        h= (.5*(32*(t)^2))*12
        console.log('calc',h)
        m = h / ((d/25)*.9)

    }
    render() { 
        return ( 
            <h1>Calculator</h1>
         );
    }
}
 
export default Calculator ;