import React from 'react';
import Leaflet from 'leaflet';
import { Col, Row } from '../../components';
import { AppContext } from '../../providers';
import MapsInfoBar from './MapsInfoBar/MapsInfoBar';
import MapsRouteSettings from './MapsRouteSettings/MapsRouteSettings';
import classes from './Maps.module.scss';
import './Leaflet.scss';

class Maps extends React.Component{

  static contextType = AppContext;

  componentDidMount(){
    this.context.maps.initialise();
    this.MAP = this.context.maps.MAP;
  }

  render(){
    const centerButton = !this.context.maps.MAP_CENTERED ? (
      <button onClick={this.context.maps.reCenter} className={classes.MapsRecenter}>Center</button>
    ) : (
      <React.Fragment/>
    )

    return(
      <React.Fragment>
        <MapsInfoBar itinerary={this.context.maps.ROUTE.itinerary}/>
        <MapsRouteSettings geoSearchFn={this.context.maps.geoSearch} setRouteFn={this.context.maps.setRoute}/>
        {centerButton}
        <div id="map-placeholder" className={classes.MapContainer}></div>
      </React.Fragment>
    );
  }
}

export default Maps;
