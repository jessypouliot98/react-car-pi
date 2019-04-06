import React from 'react';
import MediaButton from './MediaButton/MediaButton';
import Timeline from './Timeline/Timeline';
import Timestamp from './Timestamp/Timestamp';
import classes from './MediaControls.module.scss';

class MediaControls extends React.Component{

   autoHide = () => {
      if(this.props.autoHide){
         return ' ' + classes.AutoHide;
      } else {
         return '';
      }
   }

   render(){
      return (
         <div className={classes.MediaControlsContainer + this.autoHide()}>
            <div className={classes.MediaButtonContainer}>
               <div className={classes.MediaButton}>
                  <MediaButton mediaCtx={this.props.mediaCtx} type="Prev"/>
               </div>
               <div className={classes.MediaButton}>
                  <MediaButton mediaCtx={this.props.mediaCtx} type="Play"/>
               </div>
               <div className={classes.MediaButton}>
                  <MediaButton mediaCtx={this.props.mediaCtx} type="Next"/>
               </div>
            </div>
            <div className={classes.MediaTimelineContainer}>
               <div className={classes.MediaTimeline}>
                  <Timeline mediaCtx={this.props.mediaCtx}/>
               </div>
               <div className={classes.MediaTimestamp}>
                  <Timestamp mediaCtx={this.props.mediaCtx}/>
               </div>
            </div>
         </div>
      );
   }
}

export default MediaControls
