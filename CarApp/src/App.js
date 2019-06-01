import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { AudioProvider, VideoProvider } from './providers/';
import { ViewHome, ViewMusic, ViewVideo, ViewSetting } from './views/';
import classes from './App.module.scss';

class App extends Component {

   render() {
      return (
         <div className={classes.App}>
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
         </div>
      );
   }
}

export default withRouter(App);
