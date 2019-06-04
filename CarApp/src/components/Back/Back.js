import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Back.module.scss';

class Back extends React.Component {

  back = () => {
    this.props.history.goBack()
  }

  render(){
    return(
      <button onClick={() => this.back()} className={classes.Back}>
        BACK
      </button>
    );
  }
}

export default withRouter(Back)
