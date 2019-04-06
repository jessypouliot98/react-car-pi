import React, { Component } from 'react';
import { Music, Video, Window, WindowButton, PageList, List } from './components/';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { AudioProvider, VideoProvider } from './providers/';
import classes from './App.module.scss';

class App extends Component {

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
                     <PageList page="Music">
                        <List/>
                     </PageList>
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
      // this.openWindow('list');
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
