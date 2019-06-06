import React from 'react';
import classes from './Row.module.scss';

class Row extends React.Component {

  getStyle = () => {
    const style = {};
    if(this.props.height) style.height = this.props.height + 'px';
    if(this.props.justifyContent) style.justifyContent = this.props.justifyContent;

    return style;
  }

  render(){
    return(
      <div className={classes.Row} style={this.getStyle()}>
        {this.props.children}
      </div>
    );
  }
}

export default Row
