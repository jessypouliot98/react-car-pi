import React from 'react';
import { MediaControls } from '../';
import { VideoConsumer } from '../../providers';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import classes from './Video.module.scss';

class Video extends React.Component{
   render(){
      return (
         <VideoConsumer>
            {(videoProps) => {
               return(
               <React.Fragment>
                  <div className={classes.VideoPlayerContainer}>
                     <VideoPlayer file={videoProps.currentMediaSrcFn()}/>
                  </div>
                  <div className={classes.MediaControlsContainer}>
                     <MediaControls mediaCtx={videoProps} autoHide={true}/>
                  </div>
               </React.Fragment>
               );
            }}
         </VideoConsumer>
      );
   }
}

export default Video
