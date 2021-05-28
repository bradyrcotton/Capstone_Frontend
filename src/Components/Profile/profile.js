import React, { Component } from 'react';
import './profile.css'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={
            shot:''
            
        }
        debugger;
        console.log(props);
    }
    render() {
        // let shooter = shooter;
        return (
            <div className="profile">Hello
            {/* {console.log('profile', shooter)} */}
            </div>
        );
    }
}
export default Profile;