import React, {Component} from 'react';


class Logout extends Component {
    componentDidMount(){
        console.log('nope lol')
        localStorage.clear()
        window.location ='/login'
    }
    render() {
        return null;
    }
}

export default Logout