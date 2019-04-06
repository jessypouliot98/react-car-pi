import React from 'react';
import { Link } from 'react-router-dom';
import classes from './PageList.module.scss';

class PageList extends React.Component{

   render(){
      return(
         <div className={classes.PageListContainer}>
            <nav className={classes.PageListNavContainer}>
               <div className={classes.NavContainer}>
                  <Link className={classes.NavLink} to="/songs">
                     <div className={classes.NavItem}>Songs</div>
                  </Link>
                  <Link className={classes.NavLink} to="/songs">
                     <div className={classes.NavItem}>Songs</div>
                  </Link>
                  <Link className={classes.NavLink} to="/songs">
                     <div className={classes.NavItem}>Songs</div>
                  </Link>
                  <Link className={classes.NavLink} to="/songs">
                     <div className={classes.NavItem}>Songs</div>
                  </Link>
               </div>
            </nav>
            <div className={classes.ListContainer}>
               {this.props.children}
            </div>
         </div>
      );
   }
}

export default PageList;
