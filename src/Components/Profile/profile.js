import React, { Component } from 'react';
import axios from 'axios';
import './profile.css';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={
            value:'',
            rifle:[],
            caliber:null,
            scopeAdjustment:null,
            ammoWeight:null,
            barrelLength:null,
            currentZero:null,
            windSpeed:null,
            boreToSight:null,
            shotAngle:null,
            shooter:null,
            shooterId:" "
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        let shooterId = localStorage.getItem('shooter');
        this.setState({ shooterId : shooterId });
        console.log('locsl', this.state.shooterId)
        debugger;
        let pshooterId = parseInt(shooterId)
        this.props.filterRifles(pshooterId)
        
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
             
            console.log('filter', this.props.filteredRifles)
            return (
            <div>
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
                        <label>Ammo Weight:</label>
                            </td>
                            <td>
                        <input type='number' name='ammoWeight' onChange={this.handleChange} value={this.state.ammoWeight}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                        <label>Barrel Length:</label>
                            </td>
                            <td>
                        <input type='number' name='barrelLength' onChange={this.handleChange} value={this.state.barrelLength}></input>
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
                        <tr>
                            <td>
                        <label>Wind Speed:</label>
                            </td>
                            <td>
                        <input type='number' name='windSpeed' onChange={this.handleChange} value={this.state.windSpeed}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                        <label>Bore to Sight:</label>
                            </td>
                            <td>
                        <input type='number' name='boreToSight' onChange={this.handleChange} value={this.state.boreToSight}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                        <label>Shot Angle:</label>
                            </td>
                            <td>
                        <input type='number' name='shotAngle' onChange={this.handleChange} value={this.state.shotAngle}></input>
                            </td>
                        </tr>
                        </tbody>
                        </table>
                        <input type="submit" value='Add Rifle Build'/>
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