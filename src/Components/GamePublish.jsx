import React from 'react';
import { GamePlay } from './GameFuntions';
import { GamesData } from '../Data/GamesData';
import { Card, Button } from 'react-bootstrap';
import '../Style/GamePublishStyle.css';
import { Navigate } from "react-router-dom";

class GamePublish extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Gamevisibility: false,
      parentId: '',
      openGame: false,
      clickUser: false,
      info: []
    }

  }

  handleOnClickInitgame = (item) => {
    this.setState({
      Gamevisibility: true,
      parentId: item.id,
      openGame: true
    })
  }
  handleOnClickClosegame = (item) => {
    this.setState({
      Gamevisibility: false,
      parentId: item.id,
      openGame: false
    })
  }

  handleClick = (item) => {
    const Id_user = parseInt(localStorage.getItem('Id_user'));
    if (Id_user === parseInt(item.Id_user)) {
      console.log('entro')
      window.location.replace('/Perfil')
    } else {
      fetch('http://127.0.0.1:9648/get/oneusersinf' + '?id_user=' + item.Id_user, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
      }).then(res => res.json())
        .then(res => {
         
          this.setState({
            clickUser: true,
            info: res
          })
          localStorage.setItem('UserDat', JSON.stringify(this.state.info[0]))
        })
        .catch(err => { console.log(err) })

    }

  }

  render() {
    return (
      <div className='container mt-2'>
        <div className='GamesCustoms'>
          {GamesData.map((item) => {
            return (
              <div key={item.id} className='otherCards'>
                <Card className="text-center">
                  <Card.Header>{item.title}</Card.Header>
                  <Card.Img variant="top" src={item.imggameUrl} style={{
                    width: '80%',
                    margin: 'auto'
                  }} />
                  <Card.Body>
                    <Card.Title>{item.autor}</Card.Title>
                    <Card.Text>
                      {item.desc}
                    </Card.Text>
                    {this.state.Gamevisibility === true && this.state.parentId === item.id &&
                      <GamePlay loaderUrl={item.loaderUrl} dataUrl={item.dataUrl} frameworkUrl={item.frameworkUrl} codeUrl={item.codeUrl} />
                    }
                    {this.state.openGame && this.state.parentId === item.id ? (
                      <Button variant="primary" onClick={() => this.handleOnClickClosegame(item)}>Cerrar juego</Button>

                    ) : (
                      <Button variant="primary" onClick={() => this.handleOnClickInitgame(item)}>Iniciar el juego</Button>
                    )

                    }

                  </Card.Body>
                  <Card.Footer className="text-muted" onClick={() => this.handleClick(item)}>Shotshare del Creador
                    {this.state.clickUser && (
                      <Navigate to="/Usuariofol" replace={true} />
                    )}
                  </Card.Footer>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default GamePublish;