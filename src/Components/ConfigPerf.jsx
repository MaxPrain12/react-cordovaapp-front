import React from 'react';
import { Form, InputGroup, Button, FormControl } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Compress from "browser-image-compression";


class ConfigPerf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileS: null,
            Info: []
        }
    }


    selectedHandler = (e) => {
        if (!this.state.fileS) {
            this.setState({
                fileS: e.target.files[0]
            });
        }
    }

    async componentDidMount() {
        fetch('http://62.42.95.238:9648/get/allusername', {
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

    sendHandler = () => {
        const UsernameChage = this.valorUser.value;
        if (!this.state.fileS && UsernameChage === '') {
            Swal.fire("Error!", "Rellena el campo a cambiar", "error");
        } else if (this.state.fileS && UsernameChage === '') {
            const formdata = new FormData()
            const ImageDat = this.state.fileS

            const options = {
                maxSizeMB: 0.5,
                useWebWorker: true
            }

            Compress(ImageDat, options)
                .then(compressedBlob => {

                    const convertedBlobFile = new File([compressedBlob], ImageDat.name, { type: ImageDat.type, lastModified: Date.now() })

                    formdata.append('image', convertedBlobFile)

                    const usuarioLogued = localStorage.getItem('Id_user');

                    fetch('http://62.42.95.238:9648/post/imgperf' + '?id_user=' + usuarioLogued, {
                        method: 'POST',
                        body: formdata
                    })
                        .then(res => res.text())
                        .then(res => {

                            fetch('http://62.42.95.238:9648/get/perfimgch' + '?id_user=' + usuarioLogued, {
                                method: 'GET',
                            })
                                .then(res => res.json())
                                .then(res => {
                                    localStorage.setItem('perfilimg', res.urlImg)
                                    this.redirectfuntion()
                                })
                                .catch(err => console.log(err))

                        })
                        .catch(err => console.log(err))

                })
                .catch(e => {
                    console.log(e);
                })
        } else if (!this.state.fileS && UsernameChage !== '') {
            if (this.state.Info.find(FindName => FindName.Username === UsernameChage)) {
                Swal.fire(
                    'Error!',
                    'Nombre de usuario en uso',
                    'error'
                );
            } else {
                const usuarioLo = localStorage.getItem('Id_user');

                fetch('http://62.42.95.238:9648/post/username' + '?id_user=' + usuarioLo + '&username=' + UsernameChage, {
                    method: 'POST',
                })
                    .then(res => res.text())
                    .then(res => {
                        if (res === 'ok') {
                            localStorage.setItem('Username', UsernameChage)
                            this.redirectfuntion()
                        }
                    })
                    .catch(err => console.log(err))
            }
        } else if (this.state.fileS && UsernameChage !== '') {


            if (this.state.Info.find(FindName => FindName.Username === UsernameChage)) {
                Swal.fire(
                    'Error!',
                    'Nombre de usuario en uso',
                    'error'
                );
            } else {
                const usuarioLo = localStorage.getItem('Id_user');

                fetch('http://62.42.95.238:9648/post/username' + '?id_user=' + usuarioLo + '&username=' + UsernameChage, {
                    method: 'POST',
                })
                    .then(res => res.text())
                    .then(res => {
                        if (res === 'ok') {
                            localStorage.setItem('Username', UsernameChage)

                            const formdata = new FormData()
                            const ImageDat = this.state.fileS

                            const options = {
                                maxSizeMB: 0.5,
                                useWebWorker: true
                            }

                            Compress(ImageDat, options)
                                .then(compressedBlob => {

                                    const convertedBlobFile = new File([compressedBlob], ImageDat.name, { type: ImageDat.type, lastModified: Date.now() })

                                    formdata.append('image', convertedBlobFile)

                                    const usuarioLogued = localStorage.getItem('Id_user');

                                    fetch('http://62.42.95.238:9648/post/imgperf' + '?id_user=' + usuarioLogued, {
                                        method: 'POST',
                                        body: formdata
                                    })
                                        .then(res => res.text())
                                        .then(res => {

                                            fetch('http://62.42.95.238:9648/get/perfimgch' + '?id_user=' + usuarioLogued, {
                                                method: 'GET',
                                            })
                                                .then(res => res.json())
                                                .then(res => {
                                                    localStorage.setItem('perfilimg', res.urlImg)
                                                    this.redirectfuntion()
                                                })
                                                .catch(err => console.log(err))

                                        })
                                        .catch(err => console.log(err))

                                })
                                .catch(e => {
                                    console.log(e);
                                })
                        }
                    })
                    .catch(err => console.log(err))
            }


        }
    }

    redirectfuntion = () => {
        window.location.replace('/Perfil')
    }


    render() {
        return (
            <div className='container mt-2'>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Cambiar nombre de usuario</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            <FormControl
                                placeholder={localStorage.getItem('Username')}
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                ref={(usuario) => (this.valorUser = usuario)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formFileSm" className="mb-3">
                        <Form.Label>Cambiar foto de perfil</Form.Label>
                        <Form.Control type="file" size="sm" accept='image/*'
                            onChange={this.selectedHandler}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={this.sendHandler}>
                        Guardar Cambios
                    </Button>
                </Form>
            </div>
        );
    }
}
export default ConfigPerf;