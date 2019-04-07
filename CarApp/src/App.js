import React, { Component } from 'react';
import { Music, Video, Window, WindowButton, PageList, List } from './components/';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { AudioProvider, VideoProvider } from './providers/';
import classes from './App.module.scss';

class App extends Component {

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
      windowPage: (<React.Fragment></React.Fragment>),
      windowFnParam: 'music-list',
      pageVisibility: false,
   }

   openWindow = (name = undefined) => {
      const getPage = () => {
         switch(name){
            case 'music-list':
               return {
                  page: (
                     <PageList page="Music" buttons={this.MUSIC_BUTTONS}/>
                  ),
                  btn: 'close',
                  btnParam: null,
                  visibility: true,
               };
            case null:
            case undefined:
            default:
               return {
                  page: (<React.Fragment></React.Fragment>),
                  btn: 'menu',
                  btnParam: 'music-list',
                  visibility: false,
               };
         }
      }
      const { page, visibility, btn, btnParam } = getPage();

      this.setState({
         windowBtn: btn,
         windowPage: page,
         windowFnParam: btnParam,
         pageVisibility: visibility,
      });
   }

   componentDidMount(){
      this.openWindow('music-list');
   }

   render() {
      return (
         <div className={classes.App}>
         <AudioProvider>
            <VideoProvider>
               <Switch>
                  <Route from="/music" exact render={() => (
                        <Music app={this}/>
                  )}/>
                  <Route from="/video" exact render={() => (
                        <Video app={this} autoplay={true}/>
                  )}/>
                  <Redirect from="/" to="/music"/>
               </Switch>

               <Window hidden={!this.state.pageVisibility}>
                  {this.state.windowPage}
               </Window>
               <WindowButton clickFn={() => this.openWindow(this.state.windowFnParam)}>
                  {this.state.windowBtn}
               </WindowButton>
            </VideoProvider>
         </AudioProvider>
         </div>
      );
   }
}

export default withRouter(App);
