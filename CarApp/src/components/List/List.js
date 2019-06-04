import React from 'react';
import ListItem from './ListItem/ListItem';
import classes from './List.module.scss';

class List extends React.Component{

   render(){
      const aItems = this.props.items[0].inputs.map((item, i) => (
        <ListItem key={i} {...item}/>
      ));
      
      return(
         <ul className={classes.ListContainer}>
            {aItems}
         </ul>
      );
   }
}

export default List;
