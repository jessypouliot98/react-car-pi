import React from 'react';
import { Col, Row } from '../../../../components';
import classes from './MapsItinerary.module.scss';

class MapsItinerary extends React.Component{

  ITINERARY = [];
  INDEX = 0;

  render(){
    const itinerary = this.props.itinerary;
    const hasItinerary = (Object.values(itinerary).length > 0);
    if(hasItinerary){
      const instructions = itinerary.instructions;

      return(
        <React.Fragment>
          <div className={classes.MapsItinerary}>
            <div className={classes.RouteDirection}>
              <Col>
                {instructions[this.INDEX].modifier}
              </Col>
            </div>
            <div className={classes.RouteRoadDistance}>{instructions[this.INDEX].distance}km</div>
            <Col>
              <div className={classes.RouteRoad}>
                {instructions[this.INDEX].road}
                <span className={classes.RouteRoadDirection}>{instructions[this.INDEX].direction}</span>
              </div>
              <div className={classes.RouteNextRoad}>
                {instructions[this.INDEX + 1].road}
              </div>
            </Col>
          </div>
        </React.Fragment>
      );
    } else {
      return(
       <React.Fragment/>
     );
    }
  }
}

export default MapsItinerary;
