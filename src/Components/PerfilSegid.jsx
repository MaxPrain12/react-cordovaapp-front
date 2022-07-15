import React, { Fragment } from 'react';
import { Navigate } from "react-router-dom";
import '../Style/Perfilstyle.css';
import '../Style/PerfilImgJS.css';
import { Button, Modal } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../Style/PefilfollowCon.css';


class PerfilSegid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Seguidores: '',
      Siguiendo: '',
      show: false,
      Inf: [],
      Info: [],
      updatelist: false,
      tesigo: true,
      InfFollow: [],
      statefollow: false,
      publisc: '',
      showModal: false,
      listFollow: [],
      listTitle: '',
      hasMore: false,
      pageNumber: 1,
      endingLink: 0,
      clickChatbubble: false,

    }
    this.Searchallquerys = this.Searchallquerys.bind(this);
    this.Segdel = this.Segdel.bind(this);
  }

  handleCloseModal = () => {

    this.setState({
      showModal: false,
    });
  }
  handleShowModalSeguiendo = () => {
    const storedNames = JSON.parse(localStorage.getItem("UserDat"));
    const usuarioLogued = storedNames.Id_user
    fetch('http://127.0.0.1:9648/get/listfollowing' + '?id_user=' + usuarioLogued, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        this.setState({
          listFollow: res,
          listTitle: 'Siguiendo',
          showModal: true
        });
      })
      .catch(err => { console.log(err) })


  }
  handleShowModalSeguidor = () => {
    const storedNames = JSON.parse(localStorage.getItem("UserDat"));
    const usuarioLogued = storedNames.Id_user
    console.log(usuarioLogued)
    fetch('http://127.0.0.1:9648/get/listfollowers' + '?id_user=' + usuarioLogued, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          listFollow: res,
          listTitle: 'Seguidores',
          showModal: true
        });
      })
      .catch(err => { console.log(err) })


  }
  handleClick = (item) => {
    const Id_user = parseInt(localStorage.getItem('Id_user'));
    if (Id_user === parseInt(item.Id_user)) {
      console.log('entro')
      window.location.replace('/Perfil')
    } else {
      localStorage.setItem('UserDat', JSON.stringify(item))
      window.location.reload()
    }

  }

  async componentDidMount() {
    var storedNames = JSON.parse(localStorage.getItem("UserDat"));
    this.setState({
      Inf: storedNames
    })
    const usuarioBus = storedNames.Id_user

    fetch('http://127.0.0.1:9648/get/follows' + '?id_user=' + usuarioBus, {
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


    fetch('http://127.0.0.1:9648/get/userpublicimg' + '?id_user=' + usuarioBus + '&page=' + this.state.pageNumber, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(res => {

        if (res !== null) {

          this.setState({
            Info: res,
            publisc: res[0].numOfResults,
            endingLink: res[0].endingLink,
          })


          if (this.state.pageNumber < this.state.endingLink) {
            this.setState({
              hasMore: true
            })
          }
        }


      })
      .catch(err => { console.log(err) })

    this.setState({
      publisc: '0',
    })




    fetch('http://127.0.0.1:9648/get/allifollow' + '?id_user=' + localStorage.getItem('Id_user'), {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(res => {
        this.setState({
          InfFollow: res

        })
        const found = this.state.InfFollow.filter(function (item) { return item.Id_segid === usuarioBus; });

        if (found[0]) {
          this.setState({
            tesigo: false
          })
        }

      })
      .catch(err => { console.log(err) })

  }


  async componentDidUpdate() {
    if (this.state.statefollow) {
      fetch('http://127.0.0.1:9648/get/follows' + '?id_user=' + this.state.Inf.Id_user, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(res => this.setState({
          Seguidores: res[0].Seguidores,
          Siguiendo: res[0].Siguiendo,
          statefollow: false
        }))
        .catch(err => { console.log(err) })
    }
  }

  Selectedpublic(item) {
    localStorage.setItem('focusIdPublic', JSON.stringify(item.data))
    this.setState({
      clickChatbubble: true
    })

  }



  Segdel = () => {

    if (this.state.tesigo) {
      //seguir

      fetch('http://127.0.0.1:9648/post/seguir' + '?id_user=' + localStorage.getItem('Id_user') + '&id_segid=' + this.state.Inf.Id_user, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
      })
        .then(res => res.text())
        .then(res => {

          console.log(res)
          this.setState({
            tesigo: false,
            statefollow: true
          })

        })
        .catch(err => console.log(err))




    } else {
      //dejar de seguir

      fetch('http://127.0.0.1:9648/delete/seguir' + '?id_user=' + localStorage.getItem('Id_user') + '&id_segid=' + this.state.Inf.Id_user, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
      })
        .then(res => res.text())
        .then(res => {

          console.log(res)
          this.setState({
            tesigo: true,
            statefollow: true
          })

        })
        .catch(err => console.log(err))

    }
  }



  Searchallquerys = () => {
    setTimeout(() => {
      this.setState(prevState => {
        return {
          ...prevState,
          pageNumber: prevState.pageNumber + 1
        }
      })

      if (this.state.pageNumber <= this.state.endingLink) {

        fetch('http://127.0.0.1:9648/get/userpublicimg' + '?id_user=' + this.state.Inf.Id_user + '&page=' + this.state.pageNumber, {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
        }).then(res => res.json())
          .then(res => {
            this.setState({
              Info: this.state.Info.concat(res)
            }
            )
          })
          .catch(err => { console.log(err) })

        this.setState({
          hasMore: true
        })

      } else {
        this.setState({
          hasMore: false
        })
      }
    }, 1500);
  }


  render() {
    return (

      <Fragment>
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.listTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.listFollow &&
              this.state.listFollow.map((item) => {
                return (
                  <div className='doggelUser1 mt-2' key={item.Id_user} onClick={() => this.handleClick(item)}>
                    <img src={item.urlImg} alt={item.urlImg} />
                    <h1>{item.Username}</h1>
                    <span >
                      <ion-icon name="remove-outline" size='large'></ion-icon>
                      <ion-icon name="chevron-forward-outline" size='large' ></ion-icon>
                    </span>
                  </div>
                );
              })}
          </Modal.Body>
        </Modal>
        <div className='container'>
          <div className='hubholder-2'>
            <div className='FollowsCon'>

              <div className='bloqNameFo'>
                <h1><img src={this.state.Inf.urlImg} alt={this.state.Inf.Username} />{this.state.Inf.Username}</h1>
              </div>
              <div className='FolAnWin'>
                <ul>
                  <li className="list-infofw">
                    <div className='fasW'>
                      <span className="text-infofw">{this.state.publisc}</span>
                      <span className="text-infofw">Publicaciones</span>
                    </div>
                  </li>

                  <li className="list-infofw">
                    <div className='fasW' onClick={this.handleShowModalSeguidor}>
                      <span className="text-infofw">{this.state.Seguidores}</span>
                      <span className="text-infofw">Seguidores</span>
                    </div>
                  </li>

                  <li className="list-infofw">
                    <div className='fasW' onClick={this.handleShowModalSeguiendo}>
                      <span className="text-infofw">{this.state.Siguiendo}</span>
                      <span className="text-infofw">Siguiendo</span>
                    </div>
                  </li>

                </ul>
              </div>

            </div>
            {this.state.tesigo &&

              <div className="d-grid gap-2" style={{
                marginLeft: '2em',
                marginRight: '2em',
                paddingBottom: '2em'
              }}>
                <Button size="lg" style={{
                  backgroundColor: '#191645',
                }} onClick={this.Segdel}>
                  Seguir
                </Button>
              </div>
            }
            {!this.state.tesigo &&

              <div className="d-grid gap-2" style={{
                marginLeft: '2em',
                marginRight: '2em',
                paddingBottom: '2em'
              }}>
                <Button size="lg" style={{
                  backgroundColor: '#191645',
                }} onClick={this.Segdel}>
                  Dejar de Seguir
                </Button>
              </div>
            }
          </div>
          <InfiniteScroll
            dataLength={this.state.Info.length}
            next={this.Searchallquerys}
            hasMore={this.state.hasMore}
            loader={<h4 style={{ textAlign: 'center', paddingBottom: '1em' }}>Cargando...</h4>}

          >
            <div className="container-fluid mt-3" style={{
              display: 'flex',
              flexWrap: 'wrap'

            }}>


              {this.state.Info.slice(0).map(item => {
                return (
                  <div key={item.data.Id_post} className="card" >
                    {this.state.clickChatbubble && (
                      <Navigate to="/coments" replace={true} />
                    )}
                    <img id="tamFoto" className="card-img-top" src={item.data.urlImg} alt={item.data.urlImg} onClick={() => this.Selectedpublic(item)} />
                  </div>
                );

              })}

            </div>
          </InfiniteScroll>

        </div>

      </Fragment>
    );
  }
}
export default PerfilSegid;
