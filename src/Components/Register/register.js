import React, {Component} from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


        async createNewShooter(user){
            await axios.post('http://127.0.0.1:8000/shooter/',user);
        }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const user = {
            userName: this.state.userName,
            password: this.state.password,
        }
        this.createNewShooter(user);
        window.location = '/login';
        

    }

    render() {
        return (                   
                <div>
                    
                    <form onSubmit={this.handleSubmit}>
                        <label>Username:</label>
                        <input type='text' name='userName' onChange={this.handleChange} value={this.state.userName}></input>
                        <label>Password:</label>
                        <input type='text' name='password' onChange={this.handleChange} value={this.state.password}></input>
                        <input type="submit" value='Register'/>
                    </form>
                </div>
        )
    }       
}

export default Register;