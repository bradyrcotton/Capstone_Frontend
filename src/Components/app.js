import {Switch, Route, Redirect } from 'react-router-dom';
import Register from './Register/register';
import Profile from './Profile/profile';
import React, {Component} from 'react';
import Login from './Login/login';
import axios from 'axios';
import Calculator from './Calculator/calculator';
import Maps from './Maps/maps';



class App extends Component {
    state = {
        shooter: [],
        rifle: [],
        userName: [],
        password: [],
        filteredRifles: []
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
    
    // filterRifles(shooterId){
    //     // this.getAllRifles();
    //     // debugger;
    //     for (let i=0; i<this.state.rifle.length; i++){
    //         if (this.state.rifle[i].shooter === shooterId){
    //             console.log('app',this.state.rifle[i].caliber);
    //             debugger;
    //             let r = []
    //             r = this.state.rifle[i]
    //             this.setState({
    //                 filterRifles : r
    //             })
                
            
                
    //         }
    //     }
    // }

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
                <Switch>
                <Route path="/" exact render={props => <Login {...props} shooter={this.state.shooter} getAllShooters={() => this.getAllShooters()}/>}/>
                <Route path='/register' component={Register}/>
                <Route path='/profile' render={props => <Profile {...props} filteredRifles={this.state.filteredRifles} filterRifles={this.filterRifles.bind(this)} getAllRifles={() => this.getAllRifles()}/>}/>
                <Route path='/calculator' component={Calculator}/>
                <Route path='/map' component={Maps}/>
                </Switch>
                {/* <Profile filteredRifles={this.state.filteredRifles}/> */}
                
            </div>
        )
    }
}
export default App;