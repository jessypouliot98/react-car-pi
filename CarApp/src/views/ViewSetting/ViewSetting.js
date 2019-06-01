import React from 'react';
import { List } from '../../components/';

class ViewSetting extends React.Component {
  render(){
    return(
      <React.Fragment>
        <h1>dsdsd</h1>
        <List firstTitle="name" secondTitle="name" list={[
          {
            name: 'Test',
          }
        ]}/>
      </React.Fragment>
    );
  }
}

export default ViewSetting
