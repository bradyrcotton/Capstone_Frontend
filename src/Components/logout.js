import React, {Component} from 'react';


class Logout extends Component {
    componentDidMount(){
        console.log('nope lol')
        window.location ='/'
        localStorage.clear()
    }
    render() {
        return null;
    }
}

export default Logout