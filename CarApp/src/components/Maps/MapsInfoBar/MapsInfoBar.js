import React from 'react';
import { Col, Row } from '../../../components';
import MapsItinerary from './MapsItinerary/MapsItinerary';
import classes from './MapsInfoBar.module.scss';

class MapsInfoBar extends React.Component{

  render(){
    return(
      <React.Fragment>
        <div className={classes.MapsInfoBar}>
          <MapsItinerary itinerary={this.props.itinerary}/>
        </div>
      </React.Fragment>
    );
  }
}

export default MapsInfoBar;
