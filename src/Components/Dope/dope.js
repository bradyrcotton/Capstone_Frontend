import React, { Component } from 'react';
import axios from 'axios';


class Dope extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            caliber: 0,
            scopeAdjustment: 0,
            distance: 0,
            currentZero: 0,
            shooter: 0,
         }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        
            
            // console.log(
            //     'inside callback',
            //     this.state.shooter
            //     )
            // );
            // console.log(
            //     'outside callback',
            //     this.state.shooter
            //     );
    };
    
    // componentDidUpdate(prevProps, prevState){
    //     debugger;
    //     console.log(
    //         'component did update',
    //         this.state.shooter
    //     )
    
    // }
    async createNewDope(dope){
        debugger;
        await axios.post('http://127.0.0.1:8000/dope/',dope);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(event){
        event.preventDefault();
        const dope = {
            caliber:this.state.caliber,
            scopeAdjustment:this.state.scopeAdjustment,
            distance: this.state.distance,
            currentZero:this.state.currentZero,
            shooter: this.state.shooter

        }
        console.log('dope',dope)
        let pshooter = localStorage.getItem('shooter');
        let shooter = parseInt(pshooter)
        this.setState({shooter: shooter});
        if (this.state.shooter === 0){
            debugger;
            alert('If you are sure the data you entered is correct press Add Dope again.')
        }
          
        if (this.state.shooter != 0){    
        this.createNewDope(dope)
        alert('Dope Added')
    }
    }
    
    
    render() { 
        
        
        console.log(
                'outside callback',
                this.state.shooter
                );
        return ( <div>
            <form className='blackbox-form' onSubmit={this.handleSubmit}>
                <table>
                <tbody>
                <tr>
                    <td>
                <label>Caliber:</label>
                    </td>
                    <td>
                <input className="box" type='number' name='caliber' onChange={this.handleChange} value={this.state.caliber}></input>
                    </td>
                </tr>
                <tr>
                    <td>
                <label>Scope Adjustment:</label>
                    </td>
                    <td>
                <input className="box" type='number' name='scopeAdjustment' onChange={this.handleChange} value={this.state.scopeAdjustment}></input>
                    </td>
                </tr>
                <tr>
                    <td>
                <label>Distance:</label>
                    </td>
                    <td>
                <input className="box" type='number' name='distance' onChange={this.handleChange} value={this.state.distance}></input>
                    </td>
                </tr>
                <tr>
                    <td>
                <label>Current Zero:</label>
                    </td>
                    <td>
                <input className="box" type='number' name='currentZero' onChange={this.handleChange} value={this.state.currentZero}></input>
                    </td>
                </tr>
                </tbody>
                </table>
                <input className="add" type="submit" value='Add Dope'/>
            </form>
            </div> 
            );
    }
}
 
export default Dope;




















