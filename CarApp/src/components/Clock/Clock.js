import React from 'react';
import classes from './Clock.module.scss';

class Clock extends React.Component{

  state = {
    time: {},
  }

  getTime = () => {
    let morning;

    const date = new Date();

    let hour = date.getHours();
    if(this.props.format === '12'){
      if(hour > 12) {
        hour = hour % 12;
      }
    }

    let min = date.getMinutes();
    if(min.toString().length === 1) min = '0' + min;

    const time = { hour, min, morning };

    this.setState({ time });
  }

  componentDidMount(){
    this.getTime();
    const sec = 1000;
    this.LOOP = setInterval(() => this.getTime(), sec);
  }

  componentWillUnmount(){
    clearInterval(this.LOOP);
  }

  render(){

    const time = this.state.time;

    return(
      <div className={classes.Clock}>
        {time.hour}:{time.min}
      </div>
    );
  }
}

export default Clock
