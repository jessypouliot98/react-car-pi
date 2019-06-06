import React from 'react';
import { Row } from '../../../';
import { Link } from 'react-router-dom';
import classes from './InputLink.module.scss';

class InputLink extends React.Component{
   render(){
      return(
        <div className={classes.Container}>
          <Row>
            <Link to={this.props.href} className={classes.InputLink}>{this.props.name}</Link>
          </Row>
        </div>
      );
   }
}

export default InputLink
