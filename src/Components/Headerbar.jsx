import React from "react";
import {Navbar, Container, Nav} from 'react-bootstrap';


class Headerbar extends React.Component{



    render(){
        return(
            <Navbar fixed="top" expand="lg" style={{
                borderBottom: '1px solid rgba(0, 0, 0, 0.308)',
                backgroundColor: '#191645'
            }}>
                <Container>
                    <Navbar.Brand href="#!" style={{
                        color:'white',
                        fontFamily: 'monospace',
                        textTransform: 'uppercase'
                    }}>
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