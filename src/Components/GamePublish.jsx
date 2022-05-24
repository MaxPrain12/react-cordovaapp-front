import React from 'react';
import Unity, { UnityContext } from "react-unity-webgl";

class GamePublish extends React.Component {
  constructor(props) {
    super(props);
    this.unityContext = new UnityContext({
      loaderUrl: "../GamesPublish/Build/Build/Build.loader.js",
      dataUrl: "../GamesPublish/Build/Build/Build.data",
      frameworkUrl: "../GamesPublish/Build/Build/Build.framework.js",
      codeUrl: "../GamesPublish/Build/Build/Build.wasm",
    });
    this.state = {
      Gamevisibility: false
    }
  }

  componentDidMount() {

    this.unityContext.on("canvas", function (canvas) {
      canvas.width = 1920;
      canvas.height = 1080;
    })

  }

  handleOnClickInitgame = () => {
    this.setState({
      Gamevisibility: true,
    })
    var elem = document.getElementById('initgamebutton');
    elem.style.visibility= "hidden";
  }
  handleOnClickFullscreen = () => {
    this.unityContext.setFullscreen(true)
  }
  handleOnClickClose = () => {
    this.setState({
      Gamevisibility: false,
    })
    var elem = document.getElementById('initgamebutton');
    elem.style.visibility= "visible";
  }

  render() {
    return (
      <div className='container mt-2'>
        <button id='initgamebutton' onClick={this.handleOnClickInitgame}>Iniciar el juego</button>
        {this.state.Gamevisibility === true &&
          <div>
            <button onClick={this.handleOnClickFullscreen}>FullScreen</button>
            <button onClick={this.handleOnClickClose}>Cerrar Juego</button>
            <Unity ref={this.gameunity} unityContext={this.unityContext} matchWebGLToCanvasSize={false}
              style={{
                width: "100%",
                height: "auto",
              }} />
          </div>
        }

      </div>
    );
  }
}
export default GamePublish;