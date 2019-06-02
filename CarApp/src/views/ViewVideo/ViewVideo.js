import React from 'react';
import { Video, Window, WindowButton } from '../../components/';

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
        <Video/>
        <Window hidden={!this.state.windowVisibility}>
        
        </Window>
        <WindowButton clickFn={() => this.toggleWindow()}>
          {this.state.windowBtn}
        </WindowButton>
      </React.Fragment>
    );
  }
}

export default ViewVideo
