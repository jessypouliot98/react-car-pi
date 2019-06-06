import React from 'react';
import { Link } from 'react-router-dom';
import classes from './MenuItem.module.scss';

class MenuItem extends React.Component{

  render(){
    return(
      <li className={classes.MenuItem}>
        <Link to={this.props.href} className={classes.MenuLink}>
          {this.props.children}
        </Link>
      </li>
    );
  }
}

export default MenuItem
