import React from 'react';
import classes from './Camera.module.scss';

class Camera extends React.Component{

  componentDidMount(){
    this.initialise();
  }

  componentWillUnmount(){
    if(this.CAMERA){
      for(const stream of this.CAMERA.getTracks()){
        stream.stop();
      }
    }
    this.CAMERA = undefined;
  }

  initialise = () => {
    this.VIDEO = document.getElementById('camera-viewer');

    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.CAMERA = stream;
        this.VIDEO.srcObject = this.CAMERA;
        this.VIDEO.play();
      });
    }

  }

  render(){
    return(
      <React.Fragment>
        <div className={classes.Container}>
          <video id="camera-viewer" className={classes.Video}></video>
        </div>
      </React.Fragment>
    );
  }
}

export default Camera;
