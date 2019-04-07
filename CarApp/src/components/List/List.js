import React from 'react';
import ListItem from './ListItem/ListItem';
import ListGroupItem from './ListGroupItem/ListGroupItem';
import classes from './List.module.scss';

class List extends React.Component{

   getTitle = (item, title) => {
      return (item[title.property] ? item[title.property] : title.default);
   }

   getListItem = () => {
      const aItems = this.props.list.map((item, i) => {
         const media = this.props.selectedItem;
         const selected = (item === media);

         return(
            <ListItem key={i} clickFn={() => this.props.context.selectMediaFn(item)} currentActive={selected}>
               <div className={classes.PrimaryName}>{this.getTitle(item, this.props.firstTitle)}</div>
               <div className={classes.SecondaryName}>{this.getTitle(item, this.props.secondTitle)}</div>
            </ListItem>
         );
      });

      return aItems;
   }

   getListGroupItem = () => {
      const aItems = this.props.list.map((groupItem, i) => {
         return(
            <ListGroupItem
               key={i}
               clickFn={(item) => this.props.context.selectMediaFn(item)}
               group={groupItem}
               titles={{
                  firstTitle: this.getTitle(groupItem, this.props.firstTitle),
                  secondTitle: this.props.secondTitle !== null ? this.getTitle(groupItem.content[0], this.props.secondTitle) : null,
               }}
            />
         );
      });

      return aItems;
   }

   render(){
      const aItems = !this.props.group ? this.getListItem() : this.getListGroupItem();

      return(
         <ul className={classes.ListContainer}>
            {aItems}
         </ul>
      );
   }
}

export default List;
