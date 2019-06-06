import React from 'react';
import { Row, Col } from '../../../';
import classes from './InputBoolean.module.scss';

class InputBoolean extends React.Component{
   render(){
      return(
        <div className={classes.Container}>
          <Row>
            <Col>
              <label htmlFor={this.props.name} className={classes.InputLabel}>{this.props.name}</label>
            </Col>
            <div className={classes.InputButton}>
              <label htmlFor={this.props.name} className={classes.InputSwitch}>
                <input id={this.props.name} type="checkbox" className={classes.InputBoolean} defaultChecked={this.props.default} onChange={(e) => this.props.callback(e.target.checked)}/>
                <span className={classes.InputSlider}></span>
              </label>
            </div>
          </Row>
        </div>
      );
   }
}

export default InputBoolean
