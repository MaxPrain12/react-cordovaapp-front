import React from "react";
import { Form, Container, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Footerbar from "./Footerbar";
import logo from '../Image/logoSVG.svg';
import '../Style/RegisterStyle.css';


class RegisterClass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Usuario: "",
            Correo: "",
            Contraseña: "",
            Sstatus: "",
            Sinfo: ""
        }


    }


    handleSubmit = (event) => {
        event.preventDefault()


        this.setState({
            Usuario: this.valorUser.value,
            Correo: this.valorCorre.value,
            Contraseña: this.valorContra.value
        })
        const info = {
            Username: this.valorUser.value,
            Password: this.valorContra.value,
            Email: this.valorCorre.value
        }


        if (info.Username === "" || info.Password === "" || info.Email === "") {

            Swal.fire("Aviso", "Debes rellenar todos los campos", "warning");

        } else {
            const regex =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            if (!info.Email || regex.test(info.Email) === false) {
                Swal.fire("Aviso", "Correo electronico no valido", "warning");
            } else {


                fetch('http://62.42.95.238:9648/register', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(info)
                }).then(response => response.json()
                ).then(data => {
                    this.setState({
                        Sinfo: data.body.mensaje,
                        Sstatus: data.body.CodeStatus
                    })



                    if (this.state.Sstatus === 200) {



                        Swal.fire("Good job!", this.state.Sinfo, "success");


                    } else if (this.state.Sstatus === 500) {
                        Swal.fire("Error!", this.state.Sinfo, "error");
                    }



                }).catch(err => console.log(err))

            }



        }

    }




    render() {
        return (
            <div>
                <img src={logo} alt='logo' id='logoRegis'/>
                <Container className="mt-5" fluid="lg" >
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Elegir nombre de usuario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre de usuario"
                                ref={(usuario) => (this.valorUser = usuario)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Correo Electrónico"
                                ref={(correo) => (this.valorCorre = correo)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                ref={(contraseña) => (this.valorContra = contraseña)}
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button size="lg" variant="primary" type="button" onClick={this.handleSubmit} >
                                Registrarse
                            </Button>
                        </div>


                    </Form>
                </Container>

                <Footerbar />
            </div>

        );
    }
}
export default RegisterClass;