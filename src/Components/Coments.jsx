import React from 'react';
import '../Style/ComentsStyle.css';
import { AllComents } from './Allcomentsfun';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

class Coments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Info: [],
            nmegusta: 0,
            busqueda: '',
            clicklikeNumber: 0,
            clicklike: false,
        }
    }

    componentDidMount() {
        this.setState({
            Info: JSON.parse(localStorage.getItem("focusIdPublic")),
        })
        const data = JSON.parse(localStorage.getItem("focusIdPublic"));
        const id_post = data.Id_post;
        fetch('http://127.0.0.1:9648/get/allmegustapubli' + '?id_post=' + id_post, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    nmegusta: res[0].likes
                })
            })
            .catch(err => { console.log(err) })
    }
    handleChange = (e) => {
        this.setState({
            busqueda: e.target.value,
            clicklike: false
        });
    }

    ClickSendComment = () => {


        if (this.state.busqueda !== '') {
            this.setState({
                clicklike: true
            })

            fetch('http://127.0.0.1:9648/post/comentarios' + '?id_user=' + localStorage.getItem('Id_user') + '&id_post=' + this.state.Info.Id_post + '&coment=' + this.state.busqueda, {
                method: 'POST',
            })
                .then(res => res.text())
                .then(res => {
                    this.setState({
                        busqueda: '',
                        clicklikeNumber: 1,
                    });
                })
                .catch(err => console.log(err))

        }
    }


    render() {
        return (
            <div className='parrsss'>
                <div className='comentimg' >
                    <img src={this.state.Info.urlImg} alt={this.state.Info.Id_post} />
                </div>
                <div className='comentbox' >
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={this.state.Info.Username} src={this.state.Info.fotoPerf} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={this.state.Info.Username}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {this.state.nmegusta} Like
                                        </Typography>
                                        {" — "}{this.state.Info.Text}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                    <div className='imputboxcoment'>

                        <div className="input-group">
                            <input
                                className='form-control comentsAAs'
                                placeholder='Añade un comentario...'
                                value={this.state.busqueda}
                                onChange={this.handleChange}
                            />
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.ClickSendComment}>Publicar</button>
                        </div>


                    </div>
                    <div className='comentsboxmsg'>
                        <AllComents clicklike={this.state.clicklike} clicklikeNumber={this.state.clicklikeNumber} />
                    </div>
                </div>
            </div>
        );
    }
}
export default Coments;