import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { Offcanvas, Nav } from 'react-bootstrap';
import PerfilImages from "./PerfilImages";
import '../Style/Perfilstyle.css'
import { CMenu } from '../Data/CMenu';



class Perfil extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Seguidores: '',
      Siguiendo: '',
      show: false

    }

  }


  CerrarSesion() {
    localStorage.clear()
  }

  async componentDidMount() {
    const usuarioLogued = localStorage.getItem('Id_user')

    fetch('http://62.42.95.238:9648/get/follows' + '?id_user=' + usuarioLogued, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(res => this.setState({
        Seguidores: res[0].Seguidores,
        Siguiendo: res[0].Siguiendo
      }))
      .catch(err => { console.log(err) })
  }

  handleClose = () => this.setState({
    show: false,
  });
  handleShow = () => this.setState({
    show: true,
  });

  render() {
    return (
      <Fragment>
        <div className='container'>
          <Offcanvas show={this.state.show} onHide={this.handleClose} placement='end'>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Configuración</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='bodybarside'>
              <ul>
                {CMenu.map((item) => {
                  return (
                    <li key={item.id}>
                      <Nav.Link as={Link} to={item.path} className='taga'>
                        {item.icon}
                        <span className='texttitle'>{item.title}</span>
                      </Nav.Link>
                    </li>
                  );
                })}
                <li>
                  <Nav.Link href='/' onClick={this.CerrarSesion} className='taga'>
                    <ion-icon name="exit-outline" size='large' className='iconsegg'></ion-icon>
                    <span className='texttitle'>Cerrar Sesion</span>
                  </Nav.Link>
                </li>
              </ul>
            </Offcanvas.Body>
          </Offcanvas>
          <div className='hubholder'>
            <div className='FollowsCon'>

              <div className='bloqNameFo'>
                <h1><img src={localStorage.getItem('perfilimg')} alt={localStorage.getItem('Username')} />{localStorage.getItem('Username')} <ion-icon name="ellipsis-horizontal-outline" onClick={this.handleShow} size="large" ></ion-icon></h1>
              </div>
              <div className='FolAnWin'>
                <ul>
                  <li className="list-infofw">
                    <div className='fasW'>
                      <span className="text-infofw">{localStorage.getItem('Publicaciones')}</span>
                      <span className="text-infofw">Publicaciones</span>
                    </div>
                  </li>

                  <li className="list-infofw">
                    <div className='fasW'>
                      <span className="text-infofw">{this.state.Seguidores}</span>
                      <span className="text-infofw">Seguidores</span>
                    </div>
                  </li>

                  <li className="list-infofw">
                    <div className='fasW'>
                      <span className="text-infofw">{this.state.Siguiendo}</span>
                      <span className="text-infofw">Siguiendo</span>
                    </div>
                  </li>

                </ul>
              </div>

            </div>

          </div>
          <PerfilImages />

        </div>

      </Fragment>
    );
  }
}
export default Perfil;