import React, { Fragment } from "react";
import Swal from 'sweetalert2';
import '../Style/PerfilImgJS.css';



class PerfilImages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Info: [],
            updatelist: false,
        }

    }

    async componentDidMount() {
        const usuarioLogued = localStorage.getItem('Id_user')

        fetch('http://62.42.95.238:9648/get/userpublicimg'+'?id_user='+usuarioLogued, {
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

        if(this.state.updatelist) {
            const usuarioLogued = localStorage.getItem('Id_user')

            fetch('http://62.42.95.238:9648/get/userpublicimg'+'?id_user='+usuarioLogued, {
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

                this.setState({
                    updatelist: false
                })  
        }
    }


    Selectedpublic (item) {
        Swal.fire({
            text: item.Text,
            imageUrl: item.urlImg,
            imageWidth: 'auto',
            imageHeight: '15.625em',
            imageAlt: item.CreationDate,
            showDenyButton: true,
            denyButtonText: 'DELETE',
            showConfirmButton: false
          }).then ((result) => {
              if (result.isDenied) {
                this.DeleteData(item);
              }
          })
    }

    DeleteData = (item) => {
        fetch('http://62.42.95.238:9648/delete/public' + '?id_post=' + item.Id_post, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }).then(res => res.text())
        .then(res => console.log(res) )
        .catch(err => { console.log(err) })

        this.setState({
            updatelist: true
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
