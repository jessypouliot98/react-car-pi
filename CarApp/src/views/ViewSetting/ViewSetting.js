import React from 'react';
import { List, Back, Apply } from '../../components/';
import { AppContext } from '../../providers/';

class ViewSetting extends React.Component {

  static contextType = AppContext;

  SETTINGS = [
    {
      section: 'Configs',
      inputs: [
        {
          name: 'Weather Location ID',
          type: 'string',
          default: this.context.location.id,
          placeholder: 'OpenWeatherMap city id',
          callback: (v) => this.setCityID(v),
        },{
          name: 'Music Sources',
          type: 'string',
          default: this.context.audio.AUDIO_LIST.paths ? this.context.audio.AUDIO_LIST.paths.join(';') : undefined,
          callback: (v) => this.setAudioSources(v),
        },
      ],
    }
  ];

  INPUTS = {
    locationID: '',
    audioSources: [],
  };

  state = {
    applyReady: false,
    openWeatherMap: {},
    musicSources: [],
  }

  setCityID = (value) => {
    this.INPUTS.locationID = value;

    this.setState({ applyReady: true });
  }

  setAudioSources = (value) => {
    const aSrc = value.split(';');
    this.INPUTS.audioSources = aSrc;

    this.setState({ applyReady: true });
  }

  applyChanges = () => {
    if(this.INPUTS.audioSources.length > 0) this.context.audio.setLibrary(this.INPUTS.audioSources);
    if(this.INPUTS.locationID.length > 0) this.context.updateLocationFn({ id: this.INPUTS.locationID });
  }

  render(){
    return(
      <React.Fragment>
        <Back/>
        <List items={this.SETTINGS}/>
        <Apply callback={this.applyChanges} enabled={this.state.applyReady}/>
      </React.Fragment>
    );
  }
}

export default ViewSetting
