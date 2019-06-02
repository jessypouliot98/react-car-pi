import React from 'react';
import { Col } from '../../';
import InputLink from './InputLink/InputLink';
import InputString from './InputString/InputString';
import InputBoolean from './InputBoolean/InputBoolean';
import classes from './ListItem.module.scss';

class ListItem extends React.Component{

   getInput = () => {
     let input;

     switch(this.props.type){
       case 'string':
         input = <InputString {...this.props}/>;
         break;
       case 'bool':
         input = <InputBoolean {...this.props}/>;
         break;
       case 'link':
         input = <InputLink {...this.props}/>;
         break;
       default:
         input = <div>Invalid Input Type: {this.props.type}</div>;
         break;
     }

     return input;
   }

   render(){
      const input = this.getInput();
      
      return(
         <li className={classes.ListItem}>
           <Col height={50}>
             {input}
           </Col>
         </li>
      );
   }
}

export default ListItem;
