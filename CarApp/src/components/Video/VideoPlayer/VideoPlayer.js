import React from 'react';
import classes from './VideoPlayer.module.scss';

class VideoPlayer extends React.Component{

   getFile = () => {
      return this.props.file ? this.props.file : '';
   }

   render(){
      return(
         <video id="video-player" src={this.getFile()} autoPlay={true} poster="posterimage.jpg" className={classes.VideoPlayer}></video>
      );
   }
}

export default VideoPlayer
