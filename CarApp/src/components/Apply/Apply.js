import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Apply.module.scss';

class Apply extends React.Component {

  render(){
    return this.props.enabled ? (
      <button onClick={this.props.callback} className={classes.Apply}>
        APPLY
      </button>
    ) : (
      <React.Fragment/>
    );
  }
}

export default withRouter(Apply)
