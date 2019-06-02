import React from 'react';
import classes from './Row.module.scss';

class Row extends React.Component {

  height = () => {
    return {
      height: this.props.height + 'px',
    }
  }

  render(){
    return(
      <div className={classes.Row} style={this.height()}>
        {this.props.children}
      </div>
    );
  }
}

export default Row
