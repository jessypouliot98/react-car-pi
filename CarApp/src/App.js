import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { AudioProvider, VideoProvider, AppProvider } from './providers/';
import { ViewHome, ViewMusic, ViewVideo, ViewSetting } from './views/';
import './App.scss';

class App extends Component {

   render() {
      return (
         <div className="App">
           <AppProvider>
             <AudioProvider>
                <VideoProvider>
                   <Switch>
                      <Route from="/music" exact component={ViewMusic}/>
                      <Route from="/video" exact component={ViewVideo}/>
                      <Route from="/settings" exact component={ViewSetting}/>
                      <Route from="/" exact component={ViewHome}/>
                      <Redirect to="/"/>
                   </Switch>
                </VideoProvider>
             </AudioProvider>
           </AppProvider>
         </div>
      );
   }
}

export default withRouter(App);
