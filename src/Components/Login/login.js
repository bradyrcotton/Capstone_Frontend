import React, {Component} from "react";
import "./login.css";

 


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
        if (shooterId !== 0){
          let { shooter } = this.state;
          localStorage.setItem(shooter ='shooter', shooterId = shooterId);
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
                <form className='login'  onSubmit={this.handleSubmit}>
                    <label className="username">Username:</label>
                    <input className="uBox" type='text' name='userName' onChange={this.handleChange} value={this.state.userName}></input>
                    <br></br>
                    <label className="password">Password:</label>
                    <input className="pBox" type='text' name='password' onChange={this.handleChange} value={this.state.password}></input>
                    <br></br>
                    <input className='lButton' type="submit" value='Login'/> <button className="calc" onClick={() => window.location='/register'}>Register</button>
                    
                    
                </form>
            </div>
    )
}       
}
export default Login;