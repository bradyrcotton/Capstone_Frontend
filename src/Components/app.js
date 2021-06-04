import {Switch, Route, Redirect } from 'react-router-dom';
import Register from './Register/register';
import Profile from './Profile/profile';
import React, {Component} from 'react';
import Login from './Login/login';
import axios from 'axios';
import Calculator from './Calculator/calculator';
import GMap from './Maps/maps';
import Navigation from './Navbar/navbar';
import './app.css';
import Dope from './Dope/dope';
import Logout from './logout';




class App extends Component {
    state = {
        shooter: [],
        rifle: [],
        userName: [],
        password: [],
        filteredRifles: [],
        bTable: []
    }
    componentDidMount(){
        console.log("component did mount");
        this.getAllShooters();
        this.getAllRifles();
        this.filterRifles.bind(this)
        
    }
    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.filteredRifles !== this.state.filteredRifles) {
    //         console.log('pokemons state has changed.')
    //     }
    // }
    
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
        filterRifles(shooterId){
            let rifle = this.state.rifle;

            let i=0;
            let filteredRifles = this.state.rifle.filter((rifle) =>{
                if (this.state.rifle[i].shooter === shooterId){
                    i++
                    return true;
                }
                else{
                    i++
                    return false;
                }
            })
            this.setState({
                filteredRifles : filteredRifles
            })
            
        }
        


    render(){
        console.log(this.state.filteredRifles)
        
        return(
            
            <div className="App">
                <Navigation/>
                <Switch>
                <Route path="/" exact render={props => <Login {...props} shooter={this.state.shooter} getAllShooters={() => this.getAllShooters()}/>}/>
                <Route path='/register' component={Register}/>
                <Route path='/profile' render={props => <Profile {...props} filteredRifles={this.state.filteredRifles} filterRifles={this.filterRifles.bind(this)} getAllRifles={() => this.getAllRifles()}/>}/>
                <Route path='/calculator' render={props => <Calculator {...props} filteredRifles={this.state.filteredRifles} filterRifles={this.filterRifles.bind(this)} getAllRifles={() => this.getAllRifles()}/> }/>
                <Route path='/map' render={props => <GMap {...props} filteredRifles={this.state.filteredRifles}/>}/>
                <Route path='/dope' component={Dope}/>
                <Route path="/logout" component={Logout} />
                </Switch>
            </div>
        )
    }
}
export default App;