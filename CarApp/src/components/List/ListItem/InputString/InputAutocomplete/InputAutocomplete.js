import React from 'react';
import { Row, Col } from '../../../../';
import classes from './InputAutocomplete.module.scss';

class InputAutocomplete extends React.Component{

   render(){
     if(this.props.autocomplete && this.props.autocomplete() && this.props.active){
       const inputs = this.props.autocomplete().map((value, i) => (
         <div key={i} className={classes.Text} onMouseDown={() => {
           this.props.selectFn(value[this.props.autocompleteProp]);
           this.props.callback(value[this.props.autocompleteProp])
         }}>{value[this.props.autocompleteProp]}</div>
       ))
       return(
         <div className={classes.Container}>
           {inputs}
         </div>
       );
     } else {
       return(
         <React.Fragment/>
       );
     }
   }

}

export default InputAutocomplete
