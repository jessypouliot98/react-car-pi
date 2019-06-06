import React from 'react';
import { Col, Row, List } from '../../../components';
import classes from './MapsRouteSettings.module.scss';

class MapsRouteSettings extends React.Component{

  state = {
    isOpened: false,
    pointA: {
      value: this.props.pointA || '',
      autocomplete: [],
    },
    pointB: {
      value: this.props.pointB || '',
      autocomplete: [],
    },
  }

  SETTINGS = [
    {
      section: 'Routing',
      inputs: [
        {
          name: 'From address',
          type: 'string',
          placeholder: 'enter address',
          callback: (v) => this.setPointA(v),
          default: this.state.pointA.value,
          autocomplete: () => this.state.pointA.autocomplete,
          autocompleteProp: 'label',
        },{
          name: 'To address',
          type: 'string',
          placeholder: 'enter address',
          callback: (v) => this.setPointB(v),
          autocomplete: () => this.state.pointB.autocomplete,
          autocompleteProp: 'label',
        },
      ],
    }
  ];

  setPointA = async(v) => {
    const q = await this.props.geoSearchFn(v);
    this.setState({
      pointA: {
        value: v,
        autocomplete: q,
      }
    });
  }

  setPointB = async(v) => {
    const q = await this.props.geoSearchFn(v);
    this.setState({
      pointB: {
        value: v,
        autocomplete: q,
      }
    });
  }

  setRoute = () => {
    const a = this.state.pointA.value;
    const b = this.state.pointB.value;

    if(a && b) this.props.setRouteFn([a, b]);
  }

  toggleSettings = () => {
    console.log(true);
    this.setState({ isOpened: !this.state.isOpened });
  }

  render(){
    console.log();

    const settings = this.state.isOpened ? (
      <div className={classes.MapsRouteSettings}>
        <button onClick={this.setRoute} className={classes.ApplySettingsButton}>Apply</button>
        <List items={this.SETTINGS}/>
      </div>
    ) : (
      <React.Fragment/>
    );

    return(
      <React.Fragment>
        <button onClick={this.toggleSettings} className={classes.OpenSettingsButton}>Route</button>
        {settings}
      </React.Fragment>
    );
  }
}

export default MapsRouteSettings;
