import React, { useState, useEffect } from 'react';
import Unity, { UnityContext } from "react-unity-webgl";
import { Button } from 'react-bootstrap';



export const GamePlay = (props) => {

    let [info, setInfo] = useState([]);

    const unityContext = new UnityContext({
        loaderUrl: props.loaderUrl,
        dataUrl: props.dataUrl,
        frameworkUrl: props.frameworkUrl,
        codeUrl: props.codeUrl,
    });

    useEffect(() => {
        unityContext.on("canvas", function (canvas) {
            canvas.width = 1920;
            canvas.height = 1080;
        })

    })

    const handleOnClickFullscreen = () => {
        unityContext.setFullscreen(true)
    }


    return (
        <div>
            <Button variant="primary" className='mb-2' onClick={handleOnClickFullscreen}>FullScreen</Button>
            <Unity unityContext={unityContext} matchWebGLToCanvasSize={false}
                style={{
                    width: "100%",
                    height: "auto",
                }} />
        </div>
    );

}
