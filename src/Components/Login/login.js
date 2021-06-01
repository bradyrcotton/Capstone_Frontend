import React, {Component} from "react";
import "./login.css";
import Profile from "../Profile/profile";
import { Switch, Route, Link, Redirect } from "react-router-dom";

 


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      shooterId: 0,
      userName:'',
      password:'',
     }
     
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
    
    

    
    
    handleSubmit(event) {
    event.preventDefault();

    
    for (let i=0; i<this.props.shooter.length; i++){
      if (this.state.userName === this.props.shooter[i].userName && this.state.password === this.props.shooter[i].password){
        console.log('submit',this.props.shooter[i].id);
        let shooterId = this.props.shooter[i].id;       
        console.log('redirect');
          // debugger;
          if (shooterId !== 0){
            return(
            this.props.history.push('/profile', {shooter: shooterId})
            )
          }
        }
    }
  }
 

  render() {
    return (                   
            <div>
                <form  onSubmit={this.handleSubmit}>
                    <label>Username:</label>
                    <input type='text' name='userName' onChange={this.handleChange} value={this.state.userName}></input>
                    <label>Password:</label>
                    <input type='text' name='password' onChange={this.handleChange} value={this.state.password}></input>
                    <input type="submit" value='Login'/>
                    
                </form>
            </div>
    )
}       
}
export default Login;