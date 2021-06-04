import { Navbar, Nav, Container } from 'react-bootstrap'
import Logo from '../Images/logo.png'
import './navbar.css'


const Navigation = () => {
    return(
            <Navbar collapseOnSelect fixed ='sticky' expand ='sm' bg='dark' variant='dark'>
                <Container>
                    <Navbar.Toggle aria-controls='responive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav>
                            <Nav.Link to="/"><img src={Logo} alt="logo" className="logo" /></Nav.Link>
                            <Nav.Link href='/'>Login</Nav.Link>
                            <Nav.Link href='/profile'>Profile</Nav.Link>
                            <Nav.Link href='/map'>Map</Nav.Link>
                            <Nav.Link href='/calculator'>Calculator</Nav.Link>
                            <Nav.Link href='/dope'>Dope</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    );
}

export default Navigation























































// import React, { Component } from 'react';
// import {menuItems} from './menuItems';
// import './navbar.css'

// class Navbar extends Component {
//     state = { active: false}

//     handleClick = () => {
//         this.setState({
//             active: !this.state.active
//         })
//     }

//     render(){
//         debugger;
//         return(
//             <nav className="NavbarItems">
//                 <h1 className="navbar-logo">Bullseye <i className="fab fa-react"></i></h1>
//                 <div className="menu-icon" onclick={this.handleClick}>
//                     <i className={this.state.active ? 'fas fa-times' : 'fas fa-bars'}></i>
//                 </div>
//                 <ul className={this.state.active ? 'nav-menu active' : 'nav-menu'}>
//                     {menuItems.map((item, index) => {
//                         return (
//                             <li key={index}>
//                                 <a className={item.cName} href={item.url}>
//                                 {item.title}
//                                 </a>
//                             </li>
//                         )
//                     })}
//                 </ul>
//             </nav>
//         )
//     }
// }
// export default Navbar