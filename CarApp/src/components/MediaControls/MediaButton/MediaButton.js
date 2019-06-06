import React from 'react';
import classes from './MediaButton.module.scss';

class MediaButton extends React.Component{

   getButtonName = (btn) => {
      switch(btn){
         case 'Pause':
         case 'Play':
            return !this.props.mediaCtx.mediaState ? 'Play' : 'Pause';
         default:
            return btn;
      }
   }

   clickHandler = () => {
      switch(this.props.type){
         case 'Prev':
            this.previous();
            break;
         case 'Pause':
         case 'Play':
            this.togglePlay();
            break;
         case 'Next':
            this.next();
            break;
         default:
            console.error('No function is defined for the associated type of your MediaButton');
            break;
      }
   }

   previous = () => {
      this.props.mediaCtx.switchMedia(false);
   }

   togglePlay = () => {
      const state = this.props.mediaCtx.togglePlay();
      this.setState({
         playState: state,
      });
   }

   next = () => {
      this.props.mediaCtx.switchMedia(true);
   }

   keyBinds = (e) => {
      e.preventDefault();
      switch(e.keyCode){
         case 32:
            this.togglePlay();
            break;
         default:
      }
   }

   componentDidMount(){
      document.addEventListener('keyup', e => this.keyBinds(e));
   }

   render(){
      return (
         <button onClick={this.clickHandler} className={classes.MediaButton}>
            {this.getButtonName(this.props.type)}
         </button>
      );
   }
}

export default MediaButton
