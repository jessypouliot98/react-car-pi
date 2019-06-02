import React from 'react';
import classes from './Col.module.scss';

class Col extends React.Component {

  height = () => {
    return {
      height: this.props.height + 'px',
    }
  }

  render(){
    return(
      <div className={classes.Col} style={this.height()}>
        {this.props.children}
      </div>
    );
  }
}

export default Col
