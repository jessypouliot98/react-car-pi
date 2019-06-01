import React from 'react';
import classes from './MusicInfo.module.scss';

class MusicInfo extends React.Component{
   getTitle = () => {
      return (this.props.song ? this.props.song.title : 'Undefined');
   }

   getArtist = () => {
      return (this.props.song ? this.props.song.artist : ' ');
   }

   getAlbum = () => {
      return (this.props.song ? this.props.song.album : ' ');
   }

   render(){
      return(
         <div className={classes.MusicInfoContainer}>
            <h2 className={classes.MusicInfoTitle}>{this.getTitle()}</h2>
            <h3 className={classes.MusicInfoArtist}>{this.getArtist()}</h3>
            <h3 className={classes.MusicInfoAlbum}>{this.getAlbum()}</h3>
         </div>
      );
   }
}

export default MusicInfo
