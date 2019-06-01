import React from 'react';
import { Link } from 'react-router-dom';
import classes from './MenuItem.module.scss';

class MenuItem extends React.Component{

  setBackground = (value) => {
    let color = 'transparent';
    if(value.hex) color = value.hex;
    console.log(color);

    return {
      backgroundColor: color,
    };
  }

  render(){
    return(
      <li className={classes.MenuItem}>
        <Link to={this.props.href} className={classes.MenuLink} style={this.setBackground({ hex: '#ff00f0'})}>
          {this.props.children}
        </Link>
      </li>
    );
  }
}

export default MenuItem
