import React, { Component } from 'react';
import Login from '../Login/login'
import './profile.css'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={
            rifle:''
            
        }
        debugger;
        console.log('profile',this.props.location.state.shooter);
        console.log('RIFLE',this.props.rifle);
        
        for (let i=0; i<this.props.rifle.length; i++){
            if (this.props.rifle[i].shooter === this.props.location.state.shooter){
                console.log('cal',this.props.rifle[i].caliber);
            }
        }
    };
    
    render() {
        return (
            <div className="profile">Hello
            {console.log('profile', this.props.location.state.shooter)}
            </div>
        );
    }
}
export default Profile;