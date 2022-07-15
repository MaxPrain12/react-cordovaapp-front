import React, { useState, useEffect } from 'react';

export const DateParse = (props) => {
    let [dateF, setDateF] = useState('');

    useEffect(() => {

        var d = new Date(props.item);
        var today = new Date();

        var ms =  today.getTime() - d.getTime();
        var calc =  (ms / ( 1000 * 60)) / 60
        
        if(calc < 24 ) {
            if (calc < 1 ) {
                calc = calc * 60
                if (calc < 1 ) {
                    calc = calc * 60
                    setDateF(dateF = calc.toFixed(0) + ' s');
    
                }else {
                    setDateF(dateF = calc.toFixed(0) + ' min');
                }


            }else {
                setDateF(dateF = calc.toFixed(0) + ' h');
            }

        }else{
            calc = calc / 24
            if (calc < 7 ) {

                setDateF(dateF = calc.toFixed(0) + ' d');

            }else {
                calc = calc / 7
               
                setDateF(dateF = calc.toFixed(0) + ' sem');
            }

            
        }
        


    });

    return (
        <span>
            {dateF}
        </span>

    );
}