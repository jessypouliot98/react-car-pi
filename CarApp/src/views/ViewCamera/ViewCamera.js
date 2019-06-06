import React from 'react';
import { Back, Camera } from '../../components/';
import { AppContext } from '../../providers/';

class ViewCamera extends React.Component {

  render(){
    return(
      <React.Fragment>
        <Back/>
        <Camera/>
      </React.Fragment>
    );
  }
}

export default ViewCamera
