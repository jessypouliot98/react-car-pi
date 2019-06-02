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
      morning = true;
      if(hour > 12) {
        morning = false;
        hour = hour % 12;
      }
    }

    const min = date.getMinutes();

    const time = { hour, min, morning };
    
    this.setState({ time });
  }

  componentDidMount(){
    this.getTime();
    const sec = 1000;
    setInterval(() => this.getTime(), sec);
  }

  render(){

    const time = this.state.time;

    return(
      <div className={classes.Clock}>
        {time.hour}:{time.min}{time.morning === true ? 'AM' : time.moring === false ? 'PM' : ''}
      </div>
    );
  }
}

export default Clock
