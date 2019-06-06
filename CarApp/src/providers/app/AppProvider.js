import React from 'react';
// import Sort from '../../functions/Sort';
// import Converter from '../../functions/Converter';
import WeatherWidget from '../widget/WeatherWidget/WeatherWidget';
import MapsWidget from '../widget/MapsWidget/MapsWidget';
import AudioWidget from '../widget/AudioWidget/AudioWidget';
import VideoWidget from '../widget/VideoWidget/VideoWidget';
import { Socket } from '../';

const Context = React.createContext();
const { Consumer } = Context;

class AppProvider extends React.Component{

  HOST = 'http://localhost:3001/';

  state = {
    isLoading: true,
    location: {},
    weather: {},
    mediaFocus: undefined,
    maps: {},
  }

  componentDidMount(){
    this.setState({ isLoading: true });

    this.initialise()
    .then(() => {
      this.setState({ isLoading: false })
    });
  }

  initialise = async() => {
    this.SOCKET = new Socket();
    await this.SOCKET.connect(this.HOST);
    await this.getAudioLibrary();
    const location = await this.getLocation();
    this.AUDIO = new AudioWidget(this);
    await this.AUDIO.getLibrary();
    this.VIDEO = new VideoWidget(this);
    await this.VIDEO.getLibrary();
    this.WEATHER = new WeatherWidget(this);
    await this.WEATHER.setLocation(location.id);
    this.MAPS = new MapsWidget(this);

    return;
  }

  mediaFocus = (type) => {
    if(type !== this.state.mediaFocus){
      if(this.state.mediaFocus === 'video'){
        this.VIDEO.pause();
      }
      else if(this.state.mediaFocus === 'audio'){
        this.AUDIO.pause();
      }
    }
    this.setState({ mediaFocus: type });
  }

  getAudioLibrary = async() => {
    const library = await this.SOCKET.getSongs();
    this.setState({ audioLibrary: library });

    return library;
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

  render(){
    const content = this.state.isLoading ? (
      <React.Fragment/>
    ) : (
      this.props.children
    );

    return(
      <Context.Provider value={{
        audio: this.AUDIO,
        video: this.VIDEO,
        updateLocationFn: this.updateLocation,
        location: this.state.location,
        weather: this.state.weather,
        maps: this.MAPS,
      }}>
        {content}
      </Context.Provider>
    );
  }
}

export {AppProvider, Consumer as AppConsumer, Context as AppContext};


/**
.then(status => this.loadSongsFromSource())
.then(status => this.SOCKET.inputListener({
  onRotate: (side) => {
    const time = this.scrubAudio();
    const percent = time.current / time.total;
    if(side){
      this.scrubAudio(Math.min(percent + 0.01, 1));
    }
    else {
      this.scrubAudio(Math.max(0, percent - 0.01));
    }
  },
  onPress: (bool) => {
    if(!bool) this.togglePlay();
  },
}));
this.getAlbumArt();
*/
