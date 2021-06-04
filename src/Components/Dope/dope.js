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
         }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(event){
        event.preventDefault();
        const rifle = {
            caliber:this.state.caliber,
            scopeAdjustment:this.state.scopeAdjustment,
            distance: this.state.distance,
            currentZero:this.state.currentZero,
        }
        this.createNewRifle(rifle)
        
    }
    
    
    render() { 
        return ( <div>
            <form className='blackbox-form' onSubmit={this.handleSubmit}>
                <table>
                <tbody>
                <tr>
                    <td>
                <label>Caliber:</label>
                    </td>
                    <td>
                <input type='number' name='caliber' onChange={this.handleChange} value={this.state.caliber}></input>
                    </td>
                </tr>
                <tr>
                    <td>
                <label>Scope Adjustment:</label>
                    </td>
                    <td>
                <input type='number' name='scopeAdjustment' onChange={this.handleChange} value={this.state.scopeAdjustment}></input>
                    </td>
                </tr>
                <tr>
                    <td>
                <label>Distance:</label>
                    </td>
                    <td>
                <input type='number' name='distance' onChange={this.handleChange} value={this.state.distance}></input>
                    </td>
                </tr>
                <tr>
                    <td>
                <label>Current Zero:</label>
                    </td>
                    <td>
                <input type='number' name='currentZero' onChange={this.handleChange} value={this.state.currentZero}></input>
                    </td>
                </tr>
                </tbody>
                </table>
                <input type="submit" value='Add Dope'/>
            </form>
            </div> 
            );
    }
}
 
export default Dope;




















