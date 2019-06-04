import React from 'react';
import { Music, Back } from '../../components/';

class ViewMusic extends React.Component {

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
   {
      text: 'Artist',
      page: {
         list: 'mediaList',
         firstTitle: {
            property: 'artist',
            default: 'Unknown Artist',
         },
         secondTitle: null,
         sortBy: 'artist',
         group: true,
      },
   },
   {
      text: 'Album',
      page: {
         list: 'mediaList',
         firstTitle: {
            property: 'album',
            default: 'Unknown Album',
         },
         secondTitle: {
            property: 'artist',
            default: 'Unknown Artist',
         },
         sortBy: 'album',
         group: true,
      },
   },
   {
      text: 'Playlist',
      page: {
         list: 'playlist',
         firstTitle: {
            property: 'title',
            default: 'Unknown Title',
         },
         secondTitle: {
            property: 'artist',
            default: 'Unknown Artist',
         },
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
        <Music/>
      </React.Fragment>
    );
  }
}

export default ViewMusic
