import React from 'react';
import classes from './ListGroupItem.module.scss';

class ListGroupItem extends React.Component{

   state = {
      opened: false,
   }

   getActiveClass = () => {
      return (this.props.currentActive) ? ' ' + classes.CurrentActive : '';
   }

   toggleContent = () => {
      this.setState({ opened: !this.state.opened });
   }

   render(){
      const firstTitle = (
         <div className={classes.PrimaryName}>
            { this.props.titles.firstTitle }
         </div>
      );
      const secondTitle = this.props.titles.secondTitle ? (
         <div className={classes.SecondaryName}>
            { this.props.titles.secondTitle }
         </div>
      ) : (
         <React.Fragment/>
      );
      const aItems = this.props.group.content.map((item, i) => {
         return(
            <li key={i} className={classes.ListGroupItem}>
               <button onClick={() => this.props.clickFn(item)} className={classes.ListGroupItemBtn}>
                  { item.title }
               </button>
            </li>
         );
      });
      const listContent = this.state.opened ? (
         <li className={classes.ListGroupItem}>
            <ul className={classes.ListGroup}>
               { aItems }
            </ul>
         </li>
      ) : (
         <React.Fragment/>
      );

      return(
         <React.Fragment>
            <li className={classes.ListGroupItemTitle}>
               <button onClick={this.toggleContent} className={classes.ListGroupItemBtn}>
                  { firstTitle }
                  { secondTitle }
               </button>
            </li>
            { listContent }
         </React.Fragment>
      );
   }
}

export default ListGroupItem;
