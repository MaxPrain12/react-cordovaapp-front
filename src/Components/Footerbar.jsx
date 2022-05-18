import React, { Fragment } from "react";
import '../Style/FooterStyle.css';
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { FooterItems } from '../Data/FooterItems';

class Footerbar extends React.Component {



    saveColorUbication = (e) => {
        e.target.style.color = '#43C6AC';
    }

    componentDidMount() {
        const list = document.querySelectorAll('.list');
        function activelink() {
            list.forEach((item) =>
                item.classList.remove('active'));
            this.classList.add('active');
        }
        list.forEach((item) =>
            item.addEventListener('click', activelink));

    }

    render() {
        if (localStorage.getItem('Username') !== null) {



            return (
                <Fragment>
                    <div className="navigation">
                        <ul>
                            {FooterItems.map((item) => {
                                return (
                                    <li className="list" key={item.id}>
                                        <Nav.Link as={Link} to={item.path} id="aStyle">
                                            <span className="icon">
                                                {item.icon}
                                            </span>
                                            <span className="text">{item.title}</span>
                                        </Nav.Link>
                                    </li>
                                );
                            })}
                            {/* <div className="indicator"></div> */}
                        </ul>
                    </div>

                </Fragment>
            );

        } else {

            if (window.location.pathname === '/RegisterClass') {
                return (

                    <div className="MainFooter">

                        <a className="outInfo">¿Tienes una cuenta? <Link to="/" className="outInfo2">Inicia Sesion</Link> </a>

                    </div>
                );

            } else {
                return (
                    <div className="MainFooter">

                        <a className="outInfo">¿No tienes una cuenta? <Link to="/RegisterClass" className="outInfo2">Regístrate.</Link> </a>

                    </div>

                );

            }

        }

    }
}
export default Footerbar;