import React, { Component } from 'react';
import getDistance from 'geolib/es/getDistance';
import { getPreciseDistance } from 'geolib';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            t : 0, // flight time to target
            h : 0, //drop in inches
            d : 0, // distance in yards      
            cz : 0 , // current zero
            m : 0, // number of mil adjustment needed 
            c : 0, // number of "clicks" needed to adjust
            sc : 0, // scope type in clicks "4 or 10"
            y : 0, // for converting meters to yards 
            shooterId : 0,
            bTable: [],
            yards: [],
            blank:''
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
    for (let i=0; i < 40; i++){
        let r = 25*i
        this.rangeCardYards(r)
        if (r === 0){
            r = 25
        }
        
        this.calculate(r)
       
        
    }
   
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
         
    

    t = (d*3-cz)/3000
    h= (.5*(32*(t)^2))*12
    m = h / ((d/25)*.9)
    c = (m*sc)/1.5;
    c=Math.round(c);
        
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
    refreshPage() {
        window.location.reload();
      }
    render() {
        if (localStorage.getItem("shooter") === null ){
            window.location ='/'
        } 
        return ( 
            <div>
                
            <form className='blackbox-form' onSubmit={this.handleSubmit}>
                        <table>
                        <tbody>
                        <tr>
                            <td>
                        <label>Range:</label>
                            </td>
                            <td>
                        <input className="uBox" type='number' name='blank' onChange={this.handleChange} value={this.state.blank}></input>
                            </td>
                        </tr>
                        </tbody>
                        </table>
                        <input className="calc" type="submit" value='Calculate' onClick={() =>this.calculate(this.state.d)}/>
                        </form>
                        <h2>Adjustment for Range: {this.state.c} Clicks </h2>
                        <ul>
                            {this.props.filteredRifles.map((rifles, index) =>(
                                <button className="calc" onClick={() => this.addToStorage(rifles.id)}>
                                    Rifle, {rifles.id} 
                                </button>
                            ))}
                        </ul>
                        <button className="calc" onClick={() => this.ballisticsTable()}>Table</button>
                        <button className="calc" onClick={this.refreshPage}>Clear</button>
                                <table className="table table-dark table-striped">
                                    <thead>
                                    <tr>
                                        <th>yards</th>
                                        <th>clicks</th>
                                    </tr>
                                    </thead>
                                    {this.state.bTable.map((ranges, index )=> (
                                    <tbody>
                                        <tr>
                                            <td>{index + 1  * 25}</td>
                                            <td>{[ranges]}</td>
                                        </tr>
                                    </tbody>
                                ))}
                                </table>
                        </div>
         );
    }
}

export default Calculator ;




