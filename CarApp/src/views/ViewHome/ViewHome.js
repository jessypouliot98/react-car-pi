import React from 'react';
import { Menu, Clock } from '../../components/';

class ViewHome extends React.Component {
  render(){
    return(
      <React.Fragment>
        <Clock format="12"/>
        <Menu items={[
          {
            name: 'Music',
            href: '/music'
          },{
            name: 'Video',
            href: '/video'
          },{
            name: 'Photo',
            href: '/photo'
          },{
            name: 'Settings',
            href: '/settings'
          },
        ]}/>
      </React.Fragment>
    );
  }
}

export default ViewHome
