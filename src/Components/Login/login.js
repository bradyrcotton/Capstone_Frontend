import React, {Component} from "react";
import "./login.css";
import Profile from "../Profile/profile";
import { Switch, Route } from "react-router-dom";

 


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      shooterId:0,
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
      console.log(this.props);
      // debugger;
  }
  
  
    handleSubmit(event) {
    
        
          
        
    
    event.preventDefault();
    // debugger;
    for (let i=0; i<this.props.shooter.length; i++){
      if (this.state.userName === this.props.shooter[i].userName && this.state.password === this.props.shooter[i].password){
        console.log('submit',this.props.shooter[i].id);
        
        let shooterId = this.props.shooter[i].id;
          this.setState({
            shooterId: shooterId
          })
        
          return(
            window.loctaion='/profile'
        );
      }
      else{
        alert('Invalid Username and/or Password. Please try again or register');
      }
    }
  }
 

  render() {
    return (                   
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Username:</label>
                    <input type='text' name='userName' onChange={this.handleChange} value={this.state.userName}></input>
                    <label>Password:</label>
                    <input type='text' name='password' onChange={this.handleChange} value={this.state.password}></input>
                    <input type="submit" value='Login'/>
                </form>
              <Switch>
              <Route path='/profile' render={props => <Profile {...props} shooter={this.state.shooterId}/>}/>
              </Switch>
            </div>
    )
}       
}
export default Login;