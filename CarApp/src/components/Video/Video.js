import React from 'react';
import { MediaControls } from '../';
import { AppContext } from '../../providers';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import classes from './Video.module.scss';

class Video extends React.Component{

  static contextType = AppContext;

   render(){
      const videoProps = this.context.video;
      const video = videoProps.PLAYLIST.list[videoProps.PLAYLIST.id];
      return (
        <React.Fragment>
           <div className={classes.VideoPlayerContainer}>
              <VideoPlayer file={video}/>
           </div>
           <div className={classes.MediaControlsContainer}>
              <MediaControls mediaCtx={videoProps} autoHide={true}/>
           </div>
        </React.Fragment>
      );
   }
}

export default Video
