import '../Style/HomeAllPublicStyle.css';
import React, { useState, useEffect, useRef } from 'react';


export const Nlikes = (props) => {

    let [nmegusta, setNmegusta] = useState(0);
    let [ras, setRas] = useState(false);


    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            fetch('http://127.0.0.1:9648/get/allmegustapubli' + '?id_post=' + props.Id_post, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .then(res => {
                    setNmegusta(nmegusta = res[0].likes)
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
        <div className='likes'>
            <h4>{nmegusta} Me Gusta</h4>
        </div>
    );

}