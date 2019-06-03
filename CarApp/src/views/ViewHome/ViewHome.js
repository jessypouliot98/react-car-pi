import React from 'react';
import { Menu, Clock, Row, Col, Weather } from '../../components/';
// import classes from './ViewHome.module.scss';

class ViewHome extends React.Component {
  render(){
    return(
      <React.Fragment>
        <Row height={150}>
          <Col>
            <Clock format="12"/>
          </Col>
          <Col>
            <Weather/>
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
