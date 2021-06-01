import { findByText } from '@testing-library/dom';
import React, { Component } from 'react';
import Login from '../Login/login'
import './profile.css'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={
            value:'',
            rifle:[]
            
        }
        console.log('profile',this.props.location.state.shooter);
        console.log('RIFLE',this.props.rifle);
        
        this.setState({
            rifle : this.props.rifle
        });
        
        debugger;
        this.props.filterRifles(this.props.location.state.shooter)
        console.log('filter', this.props.filteredRifles)

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
    };
   
    render() {
        debugger;
        
            let i = this.props.location.state.shooter
        
        return (
            <div className="profile">Hello
            
            <h1>{this.props.filteredRifles[0].id}</h1>
            
            </div>
        
            );
        
    }
}
export default Profile;