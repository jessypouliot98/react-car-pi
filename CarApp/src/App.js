import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { AppProvider } from './providers/';
import { ViewHome, ViewMusic, ViewVideo, ViewSetting, ViewMaps, ViewCamera } from './views/';
import './App.scss';

class App extends Component {

   render() {
      return (
         <div className="App">
           <AppProvider>
             <Switch>
                <Route from="/music" exact component={ViewMusic}/>
                <Route from="/video" exact component={ViewVideo}/>
                <Route from="/maps" exact component={ViewMaps}/>
                <Route from="/settings" exact component={ViewSetting}/>
                <Route from="/camera" exact component={ViewCamera}/>
                <Route from="/" exact component={ViewHome}/>
                <Redirect to="/"/>
             </Switch>
           </AppProvider>
         </div>
      );
   }
}

export default withRouter(App);
