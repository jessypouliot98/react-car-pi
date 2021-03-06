import React from 'react';
import classes from './Timestamp.module.scss';

class Timestamp extends React.Component{

   state = {
      currentTime: 0,
      totalTime: 0,
   }

   displayTime = (time) => {
      const min = Math.floor(time / 60);
      const sec = Math.floor(time % 60);

      if(time >= 0){
         return min + ':' + ((sec < 10) ? '0' + sec : sec);
      } else {
         return '0:00';
      }
   }

   update = () => {
      const mediaTime = this.props.mediaCtx.scrubMedia();

      this.setState({
         currentTime: mediaTime.current,
         totalTime: mediaTime.total,
      });

      this.LOOP = requestAnimationFrame(this.update);
   }

   componentDidMount(){
      this.update();
   }

   componentWillUnmount(){
     cancelAnimationFrame(this.LOOP);
   }

   render(){
      return(
         <div className={classes.TimestampContainer}>
            <span className={classes.Timestamp}>{this.displayTime(this.state.currentTime)} / {this.displayTime(this.state.totalTime)}</span>
         </div>
      );
   }
}

export default Timestamp
