class ListingCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryId:0,
            make:'',
            model:'',
            price:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    });
}
handleSubmit(event) {   let id = parseInt(this.state.categoryId)
    let p = parseInt(this.state.price)
    console.log('MAKE', this.state.make)
    event.preventDefault();
    const vehicle = {
        categoryId: id,
        make: this.state.make,
        model: this.state.model,
        price: p
    }
    this.props.addNewListing(vehicle);
    this.setState({
        categoryId: 0,
        make: '',
        model: '',
        price:''

    });
    {alert('Listing Created')}
}
render() {
    return(
        <div>
            <hr />
            <center>
                <h3>Add New Listing!</h3>
                <h4>Categories:</h4>
                <h5>Cars = 1</h5>
                <h5>SUV = 2</h5>
                <h5>Trucks = 3</h5>
                </center>
            <form onSubmit={this.handleSubmit}>
                    <div>
                    <center>
                        <label >Make:</label>
                        <input type="text" name="make"
                        onChange={this.handleChange} />
                        </center>
                    </div>
                    <br></br>
                    <div>
                    <center>
                        <label>Model:</label>
                        <input type="text" name="model"
                        onChange={this.handleChange} />
                        </center>
                    </div>
                    <br></br>
                        <div>
                        <center>
                        <label >Price:</label>
                        <input type="text" name="price"
                        onChange={this.handleChange} />
                        </center>
                    </div>
                    <br></br>
                    <div>
                    <center>
                        <label>Category:</label>
                        <input type="number" name="categoryId"
                        onChange={this.handleChange} />
                        </center>
                    </div>
                    <br></br>
                    <div>
                    <center>
                        <input  type="submit" value="Add"  />
                        </center>
                    </div>
                </form>
        </div>
           
    );
}
}
export default ListingCreator;