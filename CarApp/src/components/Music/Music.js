import React from 'react';
import { MediaControls } from '../';
import ArtWork from './ArtWork/ArtWork';
import MusicInfo from './MusicInfo/MusicInfo';
import AudioVisualizer from './AudioVisualizer/AudioVisualizer';
import { AudioConsumer } from '../../providers';
import classes from './Music.module.scss';

class Music extends React.Component{

   render(){
      return (
         <AudioConsumer>
            {(audioProps) => {
               return(
                  <React.Fragment>
                     <div className={classes.AudioVisualizerContainer}>
                        <AudioVisualizer bars={{
                           count: 70,
                           margin: 3,
                           color: 'rgba(255, 255, 255, 1)',
                        }} audioDataFn={audioProps.audioDataFn}/>
                     </div>
                     <div className={classes.ArtWorkContainer}>
                        <ArtWork file={audioProps.getAlbumArtFn()}/>
                     </div>
                     <div className={classes.MusicInfoContainer}>
                        <MusicInfo song={audioProps.playlist[audioProps.currentAudioID]}/>
                     </div>
                     <div className={classes.MediaControlsContainer}>
                        <MediaControls mediaCtx={audioProps} autoHide={false}/>
                     </div>
                  </React.Fragment>
               );
            }}
         </AudioConsumer>
      );
   }
}

export default Music
