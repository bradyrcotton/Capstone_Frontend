import {Switch, Route, Redirect } from 'react-router-dom';
import React, {Component} from 'react';
import Login from './Login/login';
import axios from 'axios';


class App extends Component {
    state = {
        shooter: [],
        rifle: []
    }

    componentDidMount(){
        console.log("component did mount");
        this.getAllShooters();
        this.getAllRifles();
        
    }
    async getAllShooters(){
        let response = await axios.get('http://127.0.0.1:8000/shooter/');
        console.log('response', response)
        this.setState({
            
            shooter: response.data
        })
    }

    async getAllRifles(){
        let response = await axios.get('http://127.0.0.1:8000/rifle/');
        console.log('response', response)
        this.setState({
            
            rifle: response.data
        })
    }


    render(){
        return(
            <div className="App">
                <Switch>
                {/* <Route path="/" exact component={Home}/> */}
                <Route path="/login" component={Login} />
                </Switch>
            </div>
        )
    }
}
export default App;