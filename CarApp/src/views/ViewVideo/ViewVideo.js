import React from 'react';
import { Video, Back } from '../../components/';

class ViewVideo extends React.Component {

  MUSIC_BUTTONS = [
   {
      text: 'Title',
      page: {
         list: 'mediaList',
         firstTitle: {
            property: 'title',
            default: 'Unknown Title',
         },
         secondTitle: {
            property: 'artist',
            default: 'Unknown Artist',
         },
         sortBy: 'title',
      },
   },
  ];

  state = {
    windowBtn: 'Menu',
    windowVisibility: false,
  }

  toggleWindow = () => {
    const opened = this.state.windowVisibility;

    const btn = opened ? 'List' : 'Close';

    this.setState({
      windowBtn: btn,
      windowVisibility: !opened,
    });
  }

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
