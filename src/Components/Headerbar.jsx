import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../Image/logoSVGs.svg';


class Headerbar extends React.Component {



    render() {
        return (
            <Navbar fixed="top" expand="lg" style={{
                borderBottom: '1px solid rgba(0, 0, 0, 0.308)',
                backgroundColor: '#191645'
            }}>
                <Container>
                    <Navbar.Brand href="#!" style={{
                        color: 'white',
                        fontFamily: 'monospace',
                        textTransform: 'uppercase'
                    }}>

                        <img src={logo} alt='logo' style={{
                            height: '1.5em',
                            paddingRight: '0.2em'
                        }} />
                        ShotShare
                    </Navbar.Brand>
                    <Nav>

                    </Nav>
                </Container>
            </Navbar>

        );
    }
}




export default Headerbar;