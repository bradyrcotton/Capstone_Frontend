import React, { Component } from 'react';
import getDistance from 'geolib/es/getDistance';
import { getPreciseDistance } from 'geolib';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            t : 0, // flight time to target
            h : 0, //drop in inches
            d : 631, // distance in yards      
            cz : 100, // current zero
            m : 0, // number of mil adjustment needed 
            c : 0, // number of "clicks" needed to adjust
            sc : 10, // scope type in clicks "4 or 10"
            y : 0, // for converting meters to yards 
            shooterId : 0,
            bTable: [],
            yards: [],
         }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.calculate=this.calculate.bind(this);
        this.addNewItem=this.addNewItem.bind(this);

        let shooterId = localStorage.getItem('shooter');
        this.setState({ shooterId : shooterId });
        let pshooterId = parseInt(shooterId)
        this.props.filterRifles(pshooterId)
        console.log('filter',this.props.filteredRifles)
    }
    addToStorage(id){
        debugger;
        localStorage.setItem('rifle', id );
}
        
ballisticsTable(){
    for (let i=0; i < 41; i++){
        let r = 25*i
        this.rangeCardYards(r)
        if (r === 0){
            r = 25
        }
        // debugger;
        this.calculate(r)
       
        
    }
    // <div>
    //     {this.state.bTable.map(yards) => (yards)}
    // </div>
}
addNewItem = (c) => {
    let {bTable} = this.state;
    bTable.push(c);
    console.log('btable',this.state.bTable)
}
rangeCardYards = (r) => {
    let {yards} = this.state;
    yards.push(r);
    console.log('yards', this.state.yards)
}
calculate(range){
        let t = this.state.t; // flight time to target
        let h = this.state.h; //drop in inches
        let d = range; // distance in yards      
        let cz = this.state.cz; // current zero
        let m = this.state.m; // number of mil adjustment needed 
        let c = this.state.c; // number of "clicks" needed to adjust
        let sc = this.state.sc; // scope type in clicks "4 or 10"
         
    

    t = (d*3-cz)/3020
    h= (.5*(32*(t)^2))*12
    m = h / ((d/25)*.9)
    c = m*sc;
    c=Math.round(c);
        // debugger;
    this.setState({
        c:c
    })
    console.log(c)
    this.addNewItem(c)
}
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit(event){
        event.preventDefault();
        this.setState({d:this.state.d})   
    }
    // mapRange(){
    //     return this.state.bTable.map(range =>
    //         <Range
    //         key={range}
    //         range={range}
    //         />
    //         );
    // }
    render() { 
        return ( 
            <div>
                {/* <h1>Calculator</h1> */}
            <form className='blackbox-form' onSubmit={this.handleSubmit}>
                        <table>
                        <tbody>
                        <tr>
                            <td>
                        <label>Range:</label>
                            </td>
                            <td>
                        <input type='number' name='d' onChange={this.handleChange} value={this.state.d}></input>
                            </td>
                        </tr>
                        </tbody>
                        </table>
                        <input type="submit" value='Calculate' onClick={() =>this.calculate(this.state.d)}/>
                        </form>
                        <h2>Adjustment for Range: {this.state.c} </h2>
                        <ul>
                            {this.props.filteredRifles.map((rifles, index) =>(
                                <button onClick={() => this.addToStorage(rifles.id)}>
                                    Rifle, {rifles.id} 
                                </button>
                            ))}
                        </ul>
                        <button onClick={() => this.ballisticsTable()}>Table</button>
                            {this.state.bTable.map((ranges, index )=> (
                                <table className="table table-dark table-striped">
                                    <thead>
                                    <tr>
                                        <th>yards</th>
                                        <th>clicks</th>
                                    </tr>
                                    <tbody>
                                        <tr>
                                            <td>{index * 25}</td>
                                        </tr>
                                        <tr>
                                            <td>{[ranges]}</td>
                                        </tr>
                                    </tbody>
                                    </thead>
                                </table>
                                ))}
                        </div>
         );
    }
}

export default Calculator ;




// let t = 0; // flight time to target
        // let h = 0; //drop in inches
        // let d = 631; // distance in yards      
        // let cz = 300; // current zero
        // let m = 0; // number of mil adjustment needed 
        // let c = 0; // number of "clicks" needed to adjust
        // let sc = 10; // scope type in clicks "4 or 10"
        // let y = 0; // for converting meters to yards 