import React from 'react';
import '../Style/HomeAllPublicStyle.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LikeFuntion } from '../Components/LikeFuntions';
import { Navigate } from "react-router-dom";


class HomeAllPublic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Info: [],
            hasMore: false,
            pageNumber: 1,
            endingLink: 0,
            Megusta: 'heart-outline',
            clickUser: false
        }
        this.MorePubli = this.MorePubli.bind(this);
    }


    async componentDidMount() {
        fetch('http://127.0.0.1:9648/get/mainpublish' + '?id_user=' + localStorage.getItem('Id_user'), {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    Info: res,
                    endingLink: res[0].endingLink,
                })

                if (this.state.pageNumber < this.state.endingLink) {
                    this.setState({
                        hasMore: true
                    })
                }

            })
            .catch(err => { console.log(err) })
    }


    MorePubli = () => {
        setTimeout(() => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    pageNumber: prevState.pageNumber + 1
                }
            })

            if (this.state.pageNumber <= this.state.endingLink) {

                fetch('http://127.0.0.1:9648/get/mainpublish' + '?id_user=' + localStorage.getItem('Id_user') + '&page=' + this.state.pageNumber, {
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

    handleClick = (item) => {

        const Id_user = parseInt(localStorage.getItem('Id_user'));
        if (Id_user === parseInt(item.data.Id_user)) {
          console.log('entro')
          window.location.replace('/Perfil')
        } else {
            const UserDat = {
                Id_user: item.data.Id_user,
                Username: item.data.Username,
                urlImg: item.data.fotoPerf
            }
    
            localStorage.setItem('UserDat', JSON.stringify(UserDat))
            this.setState({
                clickUser: true
            })
        }

    }

    render() {
        if (this.state.Info !== null) {

            return (
                <div className='divParacentrar'>
                    <InfiniteScroll
                        dataLength={this.state.Info.length}
                        next={this.MorePubli}
                        hasMore={this.state.hasMore}
                        loader={<h4 style={{ textAlign: 'center', paddingBottom: '1em' }}>Cargando...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center', paddingBottom: '1em' }}>
                                <b>Has visto todas las publicaciones!!</b>
                            </p>
                        }
                    >
                        {this.state.Info.map(item => {
                            return (
                                <div className='nota' key={item.data.Id_post}>
                                    {this.state.clickUser && (
                                        <Navigate to="/Usuariofol" replace={true} />
                                    )}
                                    <div className='headerpublifoto' >
                                        <img src={item.data.fotoPerf} alt={item.data.fotoPerf} onClick={() => this.handleClick(item)} />
                                        <h1 onClick={() => this.handleClick(item)} >{item.data.Username}</h1>
                                    </div>
                                    <div className='mainFotoPubli'>
                                        <img src={item.data.urlImg} alt={item.data.urlImg} />
                                    </div>
                                    <LikeFuntion Id_post={item.data.Id_post} Username={item.data.Username} Text={item.data.Text} data={item.data} />
                                </div>
                            );
                        })}

                    </InfiniteScroll>
                </div>

            );

        } else {

            return (
                <div>
                    <h1>Comienza a seguir</h1>
                </div>

            );

        }

    }
}
export default HomeAllPublic;