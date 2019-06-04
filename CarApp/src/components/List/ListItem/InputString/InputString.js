import React from 'react';
import { Row, Col } from '../../../';
import classes from './InputString.module.scss';

class InputString extends React.Component{

  componentDidMount(){
    this.INPUT = document.getElementById(this.props.name);
    this.INPUT.value = this.props.default ? this.props.default : '';
  }

   render(){
      return(
        <div className={classes.Container}>
          <Row>
            <Col>
              <label htmlFor={this.props.name} className={classes.InputLabel}>{this.props.name}</label>
            </Col>
            <input id={this.props.name} type="text" placeholder={this.props.placeholder ? this.props.placeholder : 'Enter value for: ' + this.props.name} onChange={(e) => this.props.callback(e.target.value)} className={classes.InputString}/>
          </Row>
        </div>
      );
   }
}

export default InputString
