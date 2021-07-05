import React, { Component } from 'react';
import axios from 'axios';


class Dope extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            caliber: 0,
            scopeAdjustment: 0,
            distance: 0,
            currentZero: 0,
            shooter: 0,
            filteredDope: [],
         }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        
            
          
    };
    
    
    async createNewDope(dope){
        debugger;
        await axios.post('http://127.0.0.1:8000/dope/',dope);
    }
    dopeBook(){
        let pshooter = localStorage.getItem('shooter');
        let shooter = parseInt(pshooter)
        console.log('SHOOTER',shooter)
        if(shooter != 0){
        debugger;
        this.props.filterDope(pshooter)
        }
        
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleSubmit(event){
        event.preventDefault();
        const dope = {
            caliber:this.state.caliber,
            scopeAdjustment:this.state.scopeAdjustment,
            distance: this.state.distance,
            currentZero:this.state.currentZero,
            shooter: this.state.shooter

        }
        console.log('dope',dope)
        let pshooter = localStorage.getItem('shooter');
        let shooter = parseInt(pshooter)
        console.log('SHOOTER',shooter)
        if(shooter != 0){
        debugger;
        this.props.filterDope(pshooter)
        }
        this.setState({shooter: shooter});
        if (this.state.shooter === 0){
            alert('If you are sure the data you entered is correct press Add Dope again.')
        }
          
        if (this.state.shooter != 0){    
        this.createNewDope(dope)
        alert('Dope Added')
        this.props.getAllDope()
    }
    
        
    
    }
    refreshPage() {
        window.location.reload();
      }
      async deleteDope(dopeId){
          console.log('dopeId',dopeId)
        await axios.delete('http://127.0.0.1:8000/dope/'+dopeId+'/');
        this.props.getAllDope();
    }
    render() { 
        
      console.log('fdope',this.props.filteredDope)
        
        return ( <div>
            <form className='blackbox-form' onSubmit={this.handleSubmit}>
                <table>
                <tbody>
                <tr>
                    <td>
                <label>Caliber:</label>
                    </td>
                    <td>
                <input className="box" type='number' name='caliber' onChange={this.handleChange} value={this.state.caliber}></input>
                    </td>
                </tr>
                <tr>
                    <td>
                <label>Scope Adjustment:</label>
                    </td>
                    <td>
                <input className="box" type='number' name='scopeAdjustment' onChange={this.handleChange} value={this.state.scopeAdjustment}></input>
                    </td>
                </tr>
                <tr>
                    <td>
                <label>Distance:</label>
                    </td>
                    <td>
                <input className="box" type='number' name='distance' onChange={this.handleChange} value={this.state.distance}></input>
                    </td>
                </tr>
                <tr>
                    <td>
                <label>Current Zero:</label>
                    </td>
                    <td>
                <input className="box" type='number' name='currentZero' onChange={this.handleChange} value={this.state.currentZero}></input>
                    </td>
                </tr>
                </tbody>
                </table>
                <input className="add" type="submit" value='Add Dope'/>
            </form>
            <button className="calc" onClick={() => this.dopeBook()}>Dope Table</button>
            <button className="calc" onClick={this.refreshPage}>Update</button>
            <table className="table table-dark table-striped">
                                    <thead>
                                    <tr>
                                        <th>Caliber</th>
                                        <th>Scope Adjustments</th>
                                        <th>Distance</th>
                                        <th>Current Zero</th>
                                    </tr>
                                    </thead>
                                    {this.props.filteredDope.map((dope, index )=> (
                                    <tbody>
                                        <tr>
                                            <td>{dope.caliber}</td> 
                                            <td>{dope.scopeAdjustment}</td>
                                            <td>{dope.distance}</td> 
                                            <td>{dope.currentZero}</td>  
                                            <td><button className="delete" onClick={() => this.deleteDope(dope.id)}>Delete </button> </td>
                                        </tr>
                                    </tbody>
                                ))} 
                                </table>
            </div> 
            );
    }
}
 
export default Dope;




















