import React, { Fragment } from "react";
import Swal from 'sweetalert2';
import '../Style/PerfilImgJS.css';



class PerfilImages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Info: []
        }

    }

    async componentDidMount() {
        const usuarioLogued = localStorage.getItem('Id_user')

        fetch('http://62.42.95.238:9648/post/userpublicimg'+'?id_user='+usuarioLogued, {
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
    async componentDidUpdate() {
        localStorage.setItem('Publicaciones', this.state.Info.length);
    }


    Selectedpublic (item) {
        Swal.fire({
            title: item.Id_post,
            text: item.Text,
            imageUrl: item.urlImg,
            imageWidth: 'auto',
            imageHeight: '15.625em',
            imageAlt: item.CreationDate
          })
    }


    render() {

        return (

            <Fragment>
                <div className="container-fluid mt-3" style={{
                    display: 'flex',
                    flexWrap: 'wrap'

                }}>
                    {this.state.Info.slice(0).reverse().map(item => {
                        return (
                            <div key={item.Id_post} className="card" >
                                <img id="tamFoto" className="card-img-top" src={item.urlImg} alt={item.urlImg} onClick={() => this.Selectedpublic(item)}/>
                            </div>
                        );
                    })}


                </div>
            </Fragment>
        );

    }
}
export default PerfilImages;
