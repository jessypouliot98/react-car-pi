import React from 'react';
import { Music, Back } from '../../components/';

class ViewMusic extends React.Component {

  render(){
    return(
      <React.Fragment>
        <Back/>
        <Music/>
      </React.Fragment>
    );
  }
}

export default ViewMusic
