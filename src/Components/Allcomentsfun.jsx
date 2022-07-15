import React, { useState, useEffect, useRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { DateParse } from './ParseDate';

export const AllComents = (props) => {
    let [info, setInfo] = useState([]);
    const mounted = useRef();
    let [ras, setRas] = useState(false);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("focusIdPublic"));
        const id_post = data.Id_post;
        if (!mounted.current) {
            fetch('http://127.0.0.1:9648/get/allcoments' + '?id_post=' + id_post, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .then(res => {
                    setInfo(info = res)
                })
                .catch(err => { console.log(err) })

            mounted.current = true;
        } else {
            setRas(ras = props.clicklike)
            if (ras) {
                switch (props.clicklikeNumber) {
                    case 0:
                        setRas(ras = false)
                        mounted.current = false;
                        break;
                    case 1:
                        setRas(ras = false)
                        mounted.current = false;
                        break;
                    case 2:
                        setRas(ras = false)
                        mounted.current = false;
                        break;
                }
            }
        }
    });

    return (
        <div>
            {info &&
                info.map((item) => {
                   
                    return (
                        <List sx={{
                            width: '100%', maxWidth: 360, bgcolor: 'background.paper', height: 'auto'
                        }} key={item.Id_coment}>

                            <ListItem alignItems="flex-start">

                                <ListItemAvatar>
                                    <Avatar alt={item.Username} src={item.urlImg} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.Username}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {<DateParse item={item.CreationDate} />}
                                            </Typography>
                                            {" — "} {item.Comentario}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </List>
                    );
                })}

        </div>

    );
}