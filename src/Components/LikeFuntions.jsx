import '../Style/HomeAllPublicStyle.css';
import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { Nlikes } from '../Components/Nlike';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { DateParse } from './ParseDate';



export const LikeFuntion = (props) => {

    let [info, setInfo] = useState([]);
    let [bMegusta, setBMegusta] = useState('heart-outline');
    let [clicklike, setClicklike] = useState(false);
    let [clicklikeNumber, setClicklikeNumber] = useState(0);
    let [clickUser, setClickUser] = useState(false);


    useEffect(() => {
        if (info.length === 0) {
            console.log('entra')
            fetch('http://127.0.0.1:9648/get/allmegusta' + '?id_user=' + localStorage.getItem('Id_user'), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .then(res => {

                    setInfo(info = res)

                    const ilike = info.some(item => JSON.stringify(item.Id_post) === JSON.stringify(props.Id_post));
                    if (ilike) {

                        setBMegusta(bMegusta = 'heart-sharp')
                    }
                })
                .catch(err => { console.log(err) })

        }
    }, [])



    const handlecliklike = (item) => {
        setClicklike(clicklike = true)
        if (bMegusta === 'heart-outline') {
            fetch('http://127.0.0.1:9648/post/likegusta' + '?id_user=' + localStorage.getItem('Id_user') + '&id_post=' + item, {
                method: 'POST',
            })
                .then(res => res.text())
                .then(res => {
                    setBMegusta(bMegusta = 'heart-sharp')
                    setClicklikeNumber(clicklikeNumber = 1)

                })
                .catch(err => console.log(err))
        } else {
            fetch('http://127.0.0.1:9648/delete/dontgusta' + '?id_user=' + localStorage.getItem('Id_user') + '&id_post=' + item, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.text())
                .then(res => {
                    console.log(res)
                    setBMegusta(bMegusta = 'heart-outline')
                    setClicklikeNumber(clicklikeNumber = 2)
                })
                .catch(err => { console.log(err) })
        }
    }

    const navigateTo = (item) => {

        localStorage.setItem('focusIdPublic', JSON.stringify(item))
        setClickUser(true)
    }


    return (

        <div className='footerContentpubli'>
            <div className='iconsStyling'>
                <span className='heartstyle' >
                    <ion-icon name={bMegusta} size='large' onClick={() => handlecliklike(props.Id_post)}></ion-icon>
                </span>
                {clickUser && (
                    <Navigate to="/coments" replace={true} />
                )}
                <span className='chatstyle'>
                    <ion-icon name="chatbubble-outline" onClick={() => navigateTo(props.data)} size="large"></ion-icon>
                </span>
            </div>
            <Nlikes clicklike={clicklike} Id_post={props.Id_post} clicklikeNumber={clicklikeNumber} />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt={props.data.Username} src={props.data.fotoPerf} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={props.data.Username}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                 {<DateParse item={props.data.CreationDate} />}
                                </Typography>
                                {" — "}{props.data.Text}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        </div>
    );

}





