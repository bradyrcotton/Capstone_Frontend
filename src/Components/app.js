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
        bTable: [],
        dope: [],
        filteredDope: [],
        selectedRifle:[]
    }
    componentDidMount(){
        console.log("component did mount");
        this.getAllShooters();
        this.getAllRifles.bind(this);
        this.getAllRifles();
        this.filterRifles.bind(this);
        this.getAllDope();
        this.filterSelectedRifle.bind(this);
        
        
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

    
    
    filterRifles(shooterId){
        this.getAllRifles();
        

        let rifle = this.state.rifle;

        let i=0;
        let filteredRifles = this.state.rifle.filter((rifle) =>{
            for( let j=0; j < this.state.rifle.length; j++){
                if (this.state.rifle[i].shooter === shooterId){
                    i++
                    return true;
                    }
                else{
                    i++
                    return false;
                    }
                }
            })
        
    
        this.setState({
            filteredRifles : filteredRifles
        })
        
    }
    filterSelectedRifle(rifleId){
        this.getAllRifles();
        this.filterRifles();
        let i = 0
        let selectedRifle = this.state.filteredRifles.filter((rifle) =>{
            for( let j=0; j < this.state.filteredRifles.length; j++){
                if (this.state.rifle[i].id === rifleId){
                    i++
                    return true;
                    }
                else{
                    i++
                    return false;
                    }
                }
            })
        
        
        this.setState({
            selectedRifle : selectedRifle
        })
        console.log('select',this.state.selectedRifle)
    }
    async getAllDope(){
        let response = await axios.get('http://127.0.0.1:8000/dope/');
        console.log('dopeResponse', response)
        this.setState({
            
            dope: response.data
        })
    }
    filterDope(shooterId){
        let intShooter = parseInt(shooterId)
        let dope = this.state.dope;
        let i=0;
        let filteredDope = this.state.dope.filter((dope) =>{
            if (this.state.dope[i].shooter === intShooter){
                i++
                return true;
            }
            else{
                i++
                return false;
            }
        })
        this.setState({
            filteredDope : filteredDope
        })
        console.log('filteredDope',this.state.filteredDope)
    }
        


    render(){
        
        
        return(
            
            
            
            
            <div className="App">
                <Navigation/>
                <Switch>
                <Route path="/" exact render={props => <Login {...props} shooter={this.state.shooter} getAllShooters={() => this.getAllShooters()}/>}/>
                <Route path='/register' component={Register}/>
                <Route path='/profile' render={props => <Profile {...props} filteredRifles={this.state.filteredRifles} filterRifles={this.filterRifles.bind(this)} getAllRifles={() => this.getAllRifles()}/>}/>
                <Route path='/calculator' render={props => <Calculator {...props} filteredRifles={this.state.filteredRifles} filterRifles={this.filterRifles.bind(this)} selectedRifle={this.state.selectedRifle} filterSelectedRifle={this.filterSelectedRifle.bind(this)} getAllRifles={() => this.getAllRifles()}/> }/>
                <Route path='/map' render={props => <GMap {...props} filteredRifles={this.state.filteredRifles}/>}/>
                <Route path='/dope' render={props => <Dope {...props} filterDope={this.filterDope.bind(this)}  filteredDope={this.state.filteredDope} getAllDope={() =>this.getAllDope()} />}/>
                <Route path="/logout" component={Logout} />
                </Switch>
            </div>
        )
    }
}
export default App;

