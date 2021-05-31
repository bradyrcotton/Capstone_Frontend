import {Switch, Route, Redirect } from 'react-router-dom';
import Register from './Register/register';
import Profile from './Profile/profile';
import React, {Component} from 'react';
import Login from './Login/login';
import axios from 'axios';



class App extends Component {
    state = {
        shooter: [],
        rifle: [],
        userName: [],
        password: []
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
        console.log('state',this.state.shooter);
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
                <Route path="/login" render={props => <Login {...props} shooter={this.state.shooter} getAllShooters={() => this.getAllShooters()}/>}/>
                <Route path='/register' component={Register}/>
                <Route path='/profile' render={props => <Profile {...props} rifle={this.state.rifle} getAllRifles={() => this.getAllRifles()}/>}/>
                </Switch>
                {/* <Login shooter={this.state.shooter} getAllShooters={() => this.getAllShooters()}/> */}
                
            </div>
        )
    }
}
export default App;