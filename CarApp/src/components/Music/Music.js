import React from 'react';
import { MediaControls } from '../';
import ArtWork from './ArtWork/ArtWork';
import MusicInfo from './MusicInfo/MusicInfo';
import AudioVisualizer from './AudioVisualizer/AudioVisualizer';
import { AppContext } from '../../providers';
import classes from './Music.module.scss';

class Music extends React.Component{

  static contextType = AppContext;

   render(){
      const audioProps = this.context.audio;
      const audioFile = audioProps.PLAYLIST.list[audioProps.PLAYLIST.id];
      return (
        <React.Fragment>
           <div className={classes.AudioVisualizerContainer}>
              <AudioVisualizer bars={{
                 count: 70,
                 margin: 2,
                 color: 'rgba(255, 255, 255, 1)',
              }} audioDataFn={audioProps.audioData}/>
           </div>
           <div className={classes.ArtWorkContainer}>
              <ArtWork file={audioProps.PLAYLIST.artwork}/>
           </div>
           <div className={classes.MusicInfoContainer}>
              <MusicInfo song={audioFile}/>
           </div>
           <div className={classes.MediaControlsContainer}>
              <MediaControls mediaCtx={audioProps} autoHide={false}/>
           </div>
        </React.Fragment>
      );
   }
}

export default Music
