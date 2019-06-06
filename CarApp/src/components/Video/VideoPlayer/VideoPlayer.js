import React from 'react';
import { AppContext } from '../../../providers';
import classes from './VideoPlayer.module.scss';

class VideoPlayer extends React.Component{

  static contextType = AppContext;

  componentDidMount(){
    this.PLAYER = this.context.video.PLAYER;
    this.PLACEHOLDER = document.getElementById('video-placeholder');
    this.PLACEHOLDER.appendChild(this.PLAYER);
  }

  render(){
  return(
    <div id='video-placeholder' className={classes.VideoContainer}></div>
  );
  }
}

export default VideoPlayer
