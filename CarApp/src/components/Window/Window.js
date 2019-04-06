import React from 'react';
import classes from './Window.module.scss';

class Window extends React.Component{

   isHidden = () => {
      if(this.props.hidden){
         return ' ' + classes.Hidden;
      }

      return '';
   }

   render(){
      return(
         <div className={classes.WindowContainer + this.isHidden()}>
            {this.props.children}
         </div>
      );
   }
}

export default Window;
