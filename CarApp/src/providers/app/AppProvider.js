import React from 'react';
// import Sort from '../../functions/Sort';
// import Converter from '../../functions/Converter';
import WeatherWidget from '../widget/WeatherWidget/WeatherWidget';
import { Socket } from '../';

const Context = React.createContext();
const { Consumer } = Context;

class AppProvider extends React.Component{

  HOST = 'http://localhost:3001/';

  state = {
    isLoading: true,
    audioLibrary: {},
    videoLibrary: {},
    location: {},
    weather: {},
  }

  getAudioLibrary = async() => {
    const library = await this.SOCKET.getSongs();
    this.setState({ audioLibrary: library });

    return library;
  }

  updateAudioLibrary = (aSrc) => {
    this.SOCKET.refreshSongLibrary(aSrc)
    .then(library => {
      this.setState({ audioLibrary: library });
    });
  }

  updateLocation = (id) => {
    this.SOCKET.setLocation(id)
    .then(location => {
      this.setState({ location: location });
      this.WEATHER.setLocation(location.id);
    });
  }

  getLocation = async() => {
    const location = await this.SOCKET.getLocation();
    this.setState({ location: location });

    return location;
  }

  initialise = async() => {
    this.SOCKET = new Socket();
    await this.SOCKET.connect(this.HOST);
    await this.getAudioLibrary();
    const location = await this.getLocation();
    this.WEATHER = new WeatherWidget(this);
    await this.WEATHER.setLocation(location.id);

    return true;
  }

  componentDidMount(){
    this.setState({ isLoading: true });

    this.initialise()
    .then(() => {
      this.setState({ isLoading: false })
    });
  }

  render(){
    const content = this.state.isLoading ? (
      <React.Fragment/>
    ) : (
      this.props.children
    );

    return(
      <Context.Provider value={{
        updateAudioLibraryFn: this.updateAudioLibrary,
        audioLibrary: this.state.audioLibrary,
        updateLocationFn: this.updateLocation,
        location: this.state.location,
        weather: this.state.weather,
      }}>
        {content}
      </Context.Provider>
    );
  }
}

export {AppProvider, Consumer as AppConsumer, Context as AppContext};
