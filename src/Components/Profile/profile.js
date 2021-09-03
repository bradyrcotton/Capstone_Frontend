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
            rifleName:null,
            shooter:null,
            shooterId:localStorage.getItem('shooter')
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // debugger;
        let shooterId = localStorage.getItem('shooter');
        this.setState({ shooterId : shooterId });
        console.log('locsl', this.state.shooterId);
        let pshooterId = parseInt(shooterId);
        this.props.filterRifles(pshooterId);
    }
    addToStorage(id){
        localStorage.setItem('rifle', id );
        
}
    async createNewRifle(rifle){
        await axios.post('http://127.0.0.1:8000/rifle/',rifle);
        this.props.filterRifles();
        this.setState({
            shooterId: this.props.shooterId
        })
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
            rifleName:this.state.rifleName,
            shooter: this.props.location.state.shooter
        }
        this.createNewRifle(rifle)
        
    }
    
  


render() {
    if (localStorage.getItem("shooter") === null ){
        window.location ='/'
    }
    
    let rifles = [this.props.filteredRifles];
    
               
             
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
                        <label>Ammo Weight:</label>
                            </td>
                            <td>
                        <input className="box" type='number' name='ammoWeight' onChange={this.handleChange} value={this.state.ammoWeight}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                        <label>Barrel Length:</label>
                            </td>
                            <td>
                        <input className="box" type='number' name='barrelLength' onChange={this.handleChange} value={this.state.barrelLength}></input>
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
                        <tr>
                            <td>
                        <label>Wind Speed:</label>
                            </td>
                            <td>
                        <input className="box" type='number' name='windSpeed' onChange={this.handleChange} value={this.state.windSpeed}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                        <label>Bore to Sight:</label>
                            </td>
                            <td>
                        <input className="box" type='number' name='boreToSight' onChange={this.handleChange} value={this.state.boreToSight}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                        <label>Shot Angle:</label>
                            </td>
                            <td>
                        <input className="box" type='number' name='shotAngle' onChange={this.handleChange} value={this.state.shotAngle}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                        <label>Rifle Name:</label>
                            </td>
                            <td>
                        <input className="box" type='text' name='rifleName' onChange={this.handleChange} value={this.state.rifleName}></input>
                            </td>
                        </tr>
                        </tbody>
                        </table>
                        <input className="add" type="submit" value='Add Rifle Build'/>
                    </form>
                    <div>
                        <ul>
                            {this.props.filteredRifles.map((rifles) =>(
                                <button className="rifleSelect" onClick={() => this.addToStorage(rifles.id) }>
                                    {rifles.rifleName} 
                                </button>
                            ))}
                        </ul>
                    </div>
                    
                </div>
        );
        
    }
}
export default Profile;















