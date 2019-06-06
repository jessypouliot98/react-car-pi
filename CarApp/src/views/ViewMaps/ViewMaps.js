import React from 'react';
import { Maps, Back } from '../../components/';
import { AppContext } from '../../providers/';

class ViewMaps extends React.Component {

  static contextType = AppContext;

  render(){
    return(
      <React.Fragment>
        <Back/>
        <Maps/>
      </React.Fragment>
    );
  }
}

export default ViewMaps
