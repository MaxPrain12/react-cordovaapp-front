import React from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../Style/LoginStyle.css';
import Footerbar from "./Footerbar";
import logo from '../Image/logoSVG.svg';
import HomeAllPublic from '../Components/HomeAllPublic';




class Login extends React.Component {
  constructor(props) {
    super(props);
  }


  handleSubmit = (event) => {
    event.preventDefault()

    const info = {
      Password: this.valorContra.value,
      Email: this.valorCorre.value
    }

    if (info.Password === "" || info.Email === "") {

      Swal.fire("Aviso", "Debes rellenar todos los campos", "warning");

    } else {

      const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      if (!info.Email || regex.test(info.Email) === false) {
        Swal.fire("Aviso", "Correo electronico no valido", "warning");
      } else {

        fetch('http://127.0.0.1:9648/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(info)
        }).then(response => response.json())
          .then(data => {
            if (data.body.CodeStatus === 500) {

              Swal.fire("Error!", data.body.mensaje, "error");

            } else if (data.body.CodeStatus === 400) {

              Swal.fire("Aviso", data.body.mensaje, "warning");

            } else if (data.body.CodeStatus === 200) {



              localStorage.setItem('Id_user', data.body.Id_user);
              localStorage.setItem('Username', data.body.Username);
              localStorage.setItem('Email', data.body.Email);
              localStorage.setItem('perfilimg', data.body.urlImg);


              window.location.reload()


            }
          }).catch(err => console.log(err))

      }


    }


  }



  render() {
    if (localStorage.getItem('Username') !== null) {

      return (
        <HomeAllPublic />
      );


    } else {

      return (
        <div>
          <img src={logo} alt='logo' id='logoLogin' />
          <Container className="mt-5" id="LoginS">
            <Form >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo Electr??nico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Correo Electr??nico"
                  ref={(correo) => (this.valorCorre = correo)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contrase??a</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contrase??a"
                  ref={(contrase??a) => (this.valorContra = contrase??a)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button size="lg" variant="primary" type="button" onClick={this.handleSubmit} >
                  Iniciar Sesion
                </Button>
              </div>
            </Form>


          </Container>
          <Footerbar />

        </div>



      );
    }

  }

}
export default Login;