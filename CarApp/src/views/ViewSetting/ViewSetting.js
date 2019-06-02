import React from 'react';
import { List } from '../../components/';

class ViewSetting extends React.Component {

  SETTINGS = [
    {
      section: 'Configs',
      inputs: [
        {
          name: 'Music',
          type: 'link',
          href: '/music',
        },{
          name: 'Video',
          type: 'link',
          href: '/video',
        },{
          name: 'Turn on Bluetooth',
          type: 'bool',
          default: true,
          callback: (v) => console.log(v),
        },{
          name: 'Music Sources',
          type: 'string',
          default: undefined,
          callback: (v) => console.log(v),
        },
      ],
    }
  ];

  render(){
    return(
      <React.Fragment>
        <List items={this.SETTINGS}/>
      </React.Fragment>
    );
  }
}

export default ViewSetting
