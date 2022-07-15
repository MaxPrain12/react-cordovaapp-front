import React, { Fragment } from "react";
import Swal from 'sweetalert2';
import '../Style/PerfilImgJS.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Navigate } from "react-router-dom";


class PerfilImages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Info: [],
            updatelist: false,
            publisc: '',
            cargandoTs: false,
            pageNumber: 1,
            endingLink: 0,
            hasMore: false,
            clickChatbubble: false
        }
        this.Searchallquerys = this.Searchallquerys.bind(this);
    }

    async componentDidMount() {
        const usuarioLogued = this.props.Id_user

        fetch('http://127.0.0.1:9648/get/userpublicimg' + '?id_user=' + usuarioLogued, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(res => {
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

                if (this.state.publisc !== '') {
                    localStorage.setItem('Publicaciones', this.state.publisc);
                } else {
                    localStorage.setItem('Publicaciones', 0);
                }

            })
            .catch(err => { console.log(err) })




    }





    async componentDidUpdate() {
        if (this.state.publisc !== '') {
            localStorage.setItem('Publicaciones', this.state.publisc);
        } else {
            localStorage.setItem('Publicaciones', 0);
        }

        if (this.state.updatelist) {
            const usuarioLogued = this.props.Id_user

            fetch('http://127.0.0.1:9648/get/userpublicimg' + '?id_user=' + usuarioLogued, {
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
                            publisc: res[0].numOfResults
                        })
                    }


                })
                .catch(err => { console.log(err) })
            this.setState({
                publisc: 0
            })


            if (this.state.publisc !== '') {
                localStorage.setItem('Publicaciones', this.state.publisc);
            } else {
                localStorage.setItem('Publicaciones', 0);
            }

            this.setState({
                updatelist: false
            })
            window.location.reload()
        }

    }


    Selectedpublic(item) {
        fetch('http://127.0.0.1:9648/get/allmegustapubli' + '?id_post=' + item.data.Id_post, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(res => {
                Swal.fire({
                    title: 'Me Gusta ' + res[0].likes,
                    text: item.data.Text,
                    imageUrl: item.data.urlImg,
                    imageWidth: 'auto',
                    imageHeight: 'auto',
                    imageAlt: item.data.CreationDate,
                    showCancelButton: true,
                    cancelButtonText: 'Cerrar',
                    showDenyButton: true,
                    denyButtonText: 'Eliminar',
                    confirmButtonText: 'Comentarios'
                }).then((result) => {
                    if (result.isDenied) {
                        this.DeleteData(item);
                    }
                    if (result.isConfirmed) {
                        this.GotoComents(item)
                    }
                })
            })
            .catch(err => { console.log(err) })

    }
    GotoComents(item) {
        localStorage.setItem('focusIdPublic', JSON.stringify(item.data))
        this.setState({
            clickChatbubble: true
        })
    }

    DeleteData = (item) => {
        fetch('http://127.0.0.1:9648/delete/public' + '?id_post=' + item.data.Id_post, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }).then(res => res.text())
            .then(res => console.log(res))
            .catch(err => { console.log(err) })

        this.setState({
            updatelist: true
        })
    }


    Searchallquerys = () => {
        setTimeout(() => {
            const usuarioLogued = localStorage.getItem('Id_user')
            this.setState({
                pageNumber: this.state.pageNumber + 1
            })
            if (this.state.pageNumber <= this.state.endingLink) {

                fetch('http://127.0.0.1:9648/get/userpublicimg' + '?id_user=' + usuarioLogued + '&page=' + this.state.pageNumber, {
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
                <InfiniteScroll
                    dataLength={this.state.Info.length} //This is important field to render the next data
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
            </Fragment>
        );

    }
}
export default PerfilImages;
