import React from 'react';
import { Link } from 'react-router-dom';
import { AudioConsumer } from '../../providers';
import { List } from '../';
import Sort from '../../functions/Sort';
import classes from './PageList.module.scss';

class PageList extends React.Component{

   state = {
      listContent: [],
      groupSame: false,
      titles: null,
   }

   switchPage = (page, ctx) => {
      let content = [];
      if(!page.group){
         content = (page.sortBy ? Sort.quickSortObject(ctx[page.list], page.sortBy) : ctx[page.list]);
      } else {
         if(page.sortBy === null){
            console.error('You can\'t group without also sorting.');
            return;
         }

         content = Sort.groupSortObject(ctx[page.list], page.sortBy, true);
      }

      this.setState({
         listContent: content,
         groupSame: page.group ? page.group : false,
         titles: {
            firstTitle: page.firstTitle,
            secondTitle: page.secondTitle,
         }
      });
   }

   getFirstTitle = () => {
      return (this.state.titles ? {
         property: this.state.titles.firstTitle.property,
         default: this.state.titles.firstTitle.default,
      } : null);
   }

   getSecondTitle = () => {
      return (this.state.titles && this.state.titles.secondTitle ? {
         property: this.state.titles.secondTitle.property,
         default: this.state.titles.secondTitle.default,
      } : null);
   }

   render(){
      return(
         <AudioConsumer>
            {(context) => {

               const aBtns = this.props.buttons.map((btn, i) => (
                  <button key={i} className={classes.NavBtn} onClick={() => this.switchPage(btn.page, context)}>
                     <div className={classes.NavItem}>{btn.text}</div>
                  </button>
               ));

               return(
                  <div className={classes.PageListContainer}>
                     <nav className={classes.PageListNavContainer}>
                        <div className={classes.NavContainer}>
                           { aBtns }
                        </div>
                     </nav>
                     <div className={classes.ListContainer}>
                        <List
                           context={context}
                           list={this.state.listContent}
                           group={this.state.groupSame}
                           selectedItem={context.playlist[context.currentAudioID]}
                           firstTitle={this.getFirstTitle()}
                           secondTitle={this.getSecondTitle()}
                        />
                     </div>
                  </div>
               );
            }}
         </AudioConsumer>
      );
   }
}

export default PageList;
