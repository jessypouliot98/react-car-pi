import React from 'react';
import classes from './WindowButton.module.scss';

class WindowButton extends React.Component{
   render() {
      return(
         <button className={classes.WindowButton} onClick={this.props.clickFn}>
            {this.props.children}
         </button>
      );
   }
}

export default WindowButton
