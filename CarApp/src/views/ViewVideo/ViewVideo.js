import React from 'react';
import { Video, Back } from '../../components/';

class ViewVideo extends React.Component {

  render(){
    return(
      <React.Fragment>
        <Back/>
        <Video/>
      </React.Fragment>
    );
  }
}

export default ViewVideo
