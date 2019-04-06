import React from 'react';
import classes from './ListItem.module.scss';

class ListItem extends React.Component{

   getActiveClass = () => {
      return (this.props.currentActive) ? ' ' + classes.CurrentActive : '';
   }

   render(){
      return(
         <li className={classes.ListItem + this.getActiveClass()}>
            <button onClick={this.props.clickFn} className={classes.ListItemBtn}>
               {this.props.children}
            </button>
         </li>
      );
   }
}

export default ListItem;
