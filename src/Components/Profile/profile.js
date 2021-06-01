import { findByText } from '@testing-library/dom';
import React, { Component } from 'react';
import Login from '../Login/login';
import axios from 'axios';
import './profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={
            value:'',
            rifle:[],
            caliber:0,
            scopeAdjustment:0,
            ammoWeight:0,
            barrelLength:0,
            currentZero:0,
            windSpeed:0,
            boreToSight:0,
            shotAngle:0,
            shooter:0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
        this.props.filterRifles(this.props.location.state.shooter)
        debugger;
        console.log('filter', this.props.filteredRifles)
        
    }
    async createNewRifle(rifle){
        await axios.post('http://127.0.0.1:8000/rifle/',rifle);
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
            ammoWeight:this.state.ammoWeight,
            barrelLength:this.state.barrelLength,
            currentZero:this.state.currentZero,
            windSpeed:this.state.windSpeed,
            boreToSight:this.state.boreToSight,
            shotAngle:this.state.shotAngle,
            shooter: this.props.location.state.shooter
        }
        this.createNewRifle(rifle)
    }

    
    render() {
        
        
        return (
            <div>
                    
                    <form onSubmit={this.handleSubmit}>
                        <label>Caliber:</label>
                        <input type='number' name='caliber' onChange={this.handleChange} value={this.state.caliber}></input>
                        <label>Scope Adjustment:</label>
                        <input type='number' name='scopeAdjustment' onChange={this.handleChange} value={this.state.scopeAdjustment}></input>
                        <label>Ammo Weight:</label>
                        <input type='number' name='ammoWeight' onChange={this.handleChange} value={this.state.ammoWeight}></input>
                        <label>Barrel Length:</label>
                        <input type='number' name='barrelLength' onChange={this.handleChange} value={this.state.barrelLength}></input>
                        <label>Current Zero:</label>
                        <input type='number' name='currentZero' onChange={this.handleChange} value={this.state.currentZero}></input>
                        <label>Wind Speed:</label>
                        <input type='number' name='windSpeed' onChange={this.handleChange} value={this.state.windSpeed}></input>
                        <label>Bore to Sight:</label>
                        <input type='number' name='boreToSight' onChange={this.handleChange} value={this.state.boreToSight}></input>
                        <label>Shot Angle:</label>
                        <input type='number' name='shotAngle' onChange={this.handleChange} value={this.state.shotAngle}></input>
                       






                        <input type="submit" value='Add Rifle'/>
                    </form>
                </div>
        
        );
        
    }
}
export default Profile;















// for (let i=0; i<this.props.rifle.length; i++){
//     if (this.props.rifle[i].shooter === this.props.location.state.shooter){
//         console.log('cal',this.props.rifle[i].caliber);
//         debugger;
//         rifles = this.props.rifle[i]
//         this.setState({
       
//         rifle: rifles
        
        
        
//     });
        
//     }
// }