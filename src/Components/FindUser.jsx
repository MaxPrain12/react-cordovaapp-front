import React from 'react';
import { Navigate } from "react-router-dom";
import '../Style/FindUserStyle.css'

class FindUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UsuarioBusca: [],
      Info: [],
      busqueda: '',
      clickUser: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const usuarioLogued = localStorage.getItem('Id_user')
    fetch('http://127.0.0.1:9648/get/allusersinf' + '?id_user=' + usuarioLogued, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(res => this.setState({
        Info: res

      }))
      .catch(err => { console.log(err) })
  }



  handleChange = (e) => {
    this.setState({
      busqueda: e.target.value
    });
    this.filtrarBusqueda(e.target.value)
  }


  filtrarBusqueda = (valorBus) => {
    var result = this.state.Info.filter((item) => {
      if (item.Username.toString().toLowerCase().includes(valorBus.toLowerCase())) {
        return item
      }
    })
    this.setState({
      UsuarioBusca: result
    });
  }

  handleClick = (item) => {
    localStorage.setItem('UserDat', JSON.stringify(item))
    this.setState({
      clickUser: true
    })
  }


  render() {
    return (
      <div className='container mt-2' style={{
        background: '#FAFAFA'
      }}>
        <div className='containerInput'>
          <input
            className='form-control inputBuscar'
            value={this.state.busqueda}
            placeholder='Nombre de usuario'
            onChange={this.handleChange}
          />
        </div>
        {this.state.UsuarioBusca &&
          this.state.UsuarioBusca.map((item) => {
            return (
              <div className='doggelUser mt-2' key={item.Id_user} onClick={() => this.handleClick(item)}>
                <img src={item.urlImg} alt={item.urlImg} />
                <h1>{item.Username}</h1>
                <span >
                  {this.state.clickUser && (
                    <Navigate to="/Usuariofol" replace={true} />
                  )}
                  <ion-icon name="remove-outline" size='large'></ion-icon>
                  <ion-icon name="chevron-forward-outline" size='large' ></ion-icon>
                </span>
              </div>
            );
          })}
      </div>
    );
  }
}
export default FindUser;