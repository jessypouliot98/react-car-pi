import React from 'react';
import MenuItem from './MenuItem/MenuItem';
import classes from './Menu.module.scss';

class Menu extends React.Component{

  render(){

    const aMenuItems = this.props.items.map((item, i) => (
      <MenuItem key={i} href={item.href}>{item.name}</MenuItem>
    ));

    return(
      <nav className={classes.Menu}>
        <ul className={classes.MenuList}>
          {aMenuItems}
        </ul>
      </nav>
    );
  }
}

export default Menu
