import React, { Fragment } from 'react';
import Swal from 'sweetalert2';
import '../Style/AddpublicStyle.css';
import { Form } from 'react-bootstrap';
import Compress from "browser-image-compression";

/*


Falta enviar datos del servidor para decir que la foto se ha subido correctamente


*/


class Addpublic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileS: null,
      url: null,
      /* hay que anadir un comprobante que te diga si se ha completado el proceso de subir los datos */
    }
    this.cargandoFuntion = this.cargandoFuntion.bind(this);
  }


  selectedHandler = (e) => {
    if (!this.state.fileS && !this.state.url) {
      this.setState({
        fileS: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    } else {
      Swal.fire("Error", "Ya existe un archivo", "error")
    }

  }
  sendHandler = () => {
    if (!this.state.fileS) {
      Swal.fire("Error!", "Selecciona un imagen", "error");
    } else {

      this.cargandoFuntion()

      const formdata = new FormData()
      const ImageDat = this.state.fileS



      // configuracion de l a compresion
      const options = {
        maxSizeMB: 0.5,
        useWebWorker: true
      }



      Compress(ImageDat, options)
        .then(compressedBlob => {

          const convertedBlobFile = new File([compressedBlob], ImageDat.name, { type: ImageDat.type, lastModified: Date.now() })

          formdata.append('image', convertedBlobFile)



          const info = {

            Id_user: localStorage.getItem('Id_user'),
            Text: this.valorDesc.value
          }

          fetch('http://62.42.95.238:9648/post/inf', {
            method: 'POST', headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
          })
            .then(res => res.text())
            .then(res => console.log(res))
            .catch(err => { console.error(err) })

          fetch('http://62.42.95.238:9648/post/img', {
            method: 'POST',
            body: formdata
          })
            .then(res => res.text())
            .then(res => console.log(res))
            .catch(err => { console.error(err) })

         
          

        })
        .catch(e => {
          Swal.fire("Error", "Error al comprimir el archivo", "error")
        })





    }
  }


  cargandoFuntion = () => {
    Swal.fire({
      title: 'Subiendo',
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 5000,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then(function (result) {
      
      if (result.dismiss === 'timer') {
        Swal.fire({
          title: 'Publicado Correctamente',
          icon: 'success',
          showConfirmButton: false
        })
      }
    }
    ).then(() => {
      this.setState(() => {
        return {
          fileS: null,
          url: null
        }
      })
    })
  }


  render() {


    if (!this.state.url) {
      return (
        <Fragment>

          <div className='container mt-2' style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            height: '20em',
          }}>
            <img src='/Image/undraw_upload_image_re_svxx.svg' style={{
              position: 'absolute',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '90%',
              zIndex: '-1',
              paddingTop: '25em',

            }} />

            <label htmlFor={'upload-button'}>
              <div className='chooseFile' style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                width: '20em',
                height: '4em',
                padding: 5,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: '#191645',
                borderRadius: 5,
                color: '#191645',
                backgroundColor: 'white',
              }}>
                <ion-icon name="images-outline" id="iconUploadFile"></ion-icon> Subir Foto
              </div>
            </label>

            <input type="file" id="upload-button" style={{ display: 'none' }}
              onChange={this.selectedHandler} accept='image/*' />


          </div>
        </Fragment>


      );

    } else {
      return (
        <Fragment>
          <div className='container mt-5'>
            <div className='card p-3' style={{
              borderColor: '#43C6AC',
            }}>

              <img src={this.state.url} alt='..' className='rounded mx-auto d-block mb-5' style={{
                height: '12em',
                width: 'auto',
              }} />

              <div className='row'>
                <div className='col-12'>
                  <Form >
                    <Form.Group className="mb-3" controlId="formBasicText">
                      <Form.Label>Descripción</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Escribe un pie de foto..."
                        ref={(desc) => (this.valorDesc = desc)}
                      />
                    </Form.Group>
                  </Form>


                </div>
                <div className='col-12'>
                  <button onClick={this.sendHandler} type='button' className='btn btn-primary col-12'>
                    Subir
                  </button>
                </div>
              </div>

            </div>
          </div>
        </Fragment>
      );

    }


  }
}
export default Addpublic;