import React from 'react';
import classes from './Timeline.module.scss';

class Timeline extends React.Component{

   TIMELINE  = null;

   scrub = (e) => {
      const max = parseInt(e.target.getAttribute('max'));
      const value = e.target.value / max;

      this.props.mediaCtx.scrubMediaFn(value);
   }

   getMediaTime = () => {
      const mediaTime = this.props.mediaCtx.scrubMediaFn();
      const max = parseInt(this.TIMELINE.getAttribute('max'));

      if(mediaTime !== false && mediaTime.current && mediaTime.total){
         const value = mediaTime.current / mediaTime.total;
         this.TIMELINE.value = value * max;
      }
   }

   update = () => {
      requestAnimationFrame(this.update);
      this.getMediaTime();
   }

   componentDidMount(){
      this.TIMELINE = document.getElementById('timeline-bar');
      this.update();
   }

   render(){
      return(
         <input id="timeline-bar" type="range" max="1000000" className={classes.Timeline} onChange={this.scrub}/>
      );
   }
}

export default Timeline
