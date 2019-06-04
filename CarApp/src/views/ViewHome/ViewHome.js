import React from 'react';
import { Menu, Clock, Row, Col, Weather } from '../../components/';
import { AppContext } from '../../providers/';

class ViewHome extends React.Component {

  static contextType = AppContext;

  render(){
    return(
      <React.Fragment>
        <Row height={180} justifyContent="center">
          <Col>
            <Clock format="12"/>
          </Col>
          <Col>
            <Weather locationID={this.context.locationID}/>
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
