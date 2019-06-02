import React from 'react';
import { Menu, Clock, Row, Col } from '../../components/';
// import classes from './ViewHome.module.scss';

class ViewHome extends React.Component {
  render(){
    return(
      <React.Fragment>
        <Row>
          <Col>
            <Clock format="12"/>
          </Col>
        </Row>
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
