import React from 'react';
import {Howl, Howler} from 'howler';
import Sort from '../functions/Sort';
import Converter from '../functions/Converter';
import { Socket } from './';

const { Provider, Consumer } = React.createContext();

class AudioProvider extends React.Component{

   CONTEXT = null;
   ANALYSER = null;
   PLAYER = null;
   SOCKET = null;
   HOST = 'http://localhost:3001/';
   DEFAULT_ALBUM_ART = '/wallpaper/album_art.png';

   state = {
      songList: [],
      playlist: [],
      currentAudioID: 0,
      playState: false,
      albumArt: '',
   }

   togglePlay = (play = null) => {
      if(this.PLAYER !== null){
         const playing = this.PLAYER.playing();
         let state = playing;

         if(play || !playing){
            this.PLAYER.play();
            state = true;
         } else if(!play || playing) {
            this.PLAYER.pause();
            state = false;
         }

         this.setState({ playState: state});

         return state;
      }
      return false;
   }

   switchAudio = (dir = true) => {
      const id = this.state.currentAudioID;
      const listLength = this.state.playlist.length;
      let newID = id;

      if(!dir){
         //prev
         console.log('previous');
         if(id === 0){
            newID = listLength - 1;
         } else {
            newID = id - 1;
         }
      } else {
         //next
         console.log('next');
         if(id === listLength - 1){
            newID = 0;
         } else {
            newID = id + 1;
         }
      }


      this.setState({
         currentAudioID: newID,
      });

      this.setAudio(newID);
   }

   selectAudio = (song) => {
      console.log(song);
      const playlistSongID = this.state.playlist.findIndex( item => {
         return (item === song);
      });

      if(playlistSongID >= 0){
         this.setState({
            currentAudioID: playlistSongID,
         });

         this.setAudio(playlistSongID);
      } else {
         console.error('Song id isn\'t in playlist');
      }
   }

   scrubAudio = (time = null) => {
      if(this.PLAYER !== null){
         if(time !== null){
            const duration = this.PLAYER.duration();
            this.PLAYER.seek(time * duration);
         } else {
            return {
               current: this.PLAYER.seek(),
               total: this.PLAYER.duration(),
            };
         }
      } else {
         return false;
      }
   }

   getAlbumArt = (audioObj) => {
     let albumArt = this.DEFAULT_ALBUM_ART;
     this.setState({ albumArt: albumArt });

     const song = audioObj ? audioObj : this.state.playlist[this.state.currentAudioID];

     if(song){
       const file = song.path + '/' + song.file;
       this.SOCKET.getAlbumArt(file).then(img => {
         if(img){
           const img64 = Converter.arrayBufferToBase64(img.data, 'data:' + img.format + ';base64,');
           albumArt = img64;
         }
         this.setState({ albumArt: albumArt });
       });
     }

   }

   setAudio = (id) => {
      console.log('Mounting audio file');

      if(this.PLAYER) this.PLAYER.stop();

      const audioObj = this.state.playlist[id];
      if(this.state.playlist.length > 0){
         this.getAlbumArt(audioObj);
         const file = audioObj.path + '/' + audioObj.file;
         this.PLAYER = new Howl({
            src: file,
            autoplay: true,
            onload: (e) => {
               this.ANALYSER = Howler.ctx.createAnalyser();
               Howler.masterGain.connect(this.ANALYSER);
               this.setState({ mediaState: true });
            },
            onend: (e) => {
               this.switchAudio(true);
            }
         });
      }
   }

   audioData = () => {
      if(this.PLAYER !== null){
         if(this.PLAYER.playing() && this.ANALYSER !== null){
            this.ANALYSER.fftSize = 2048;
            const bufferLength = this.ANALYSER.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            this.ANALYSER.getByteFrequencyData(dataArray)

            return dataArray;
         }
      }
      return false;
   }

   loadSongsFromSource = (aSrc) => {
     const promise = new Promise((resolve, reject) => {
       console.log('Requesting Server to load songs');
       this.SOCKET.refreshSongLibrary(aSrc).then(data => {
         this.setLibrary(data);
         resolve(true);
       });
     });

     return promise;
   }

   fetchSongList = () => {
      console.log('Fetching audio library from server');
      this.SOCKET.getSongs().then(data => this.setLibrary(data));
   }

   setLibrary = (data) => {
     if(data === null) data = [];
     const songList = Sort.quickSortObject(data, 'title', 'ASC');
     this.setState({
        songList: songList,
     });

     this.setPlaylist();
   }

   setPlaylist = () => {
      console.log('Setting playlist');
      const playlist = Sort.randomSort(this.state.songList);
      this.setState({
         currentAudioID: 0,
         playlist: playlist,
      });

      this.setAudio(this.state.currentAudioID);
   }

   componentDidMount(){
      this.CONTEXT = new AudioContext();
      this.SOCKET = new Socket();
      this.SOCKET.connect(this.HOST)
      .then(status => this.loadSongsFromSource([
        '/media/jessy/MyPassport/Music',
      ]))
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
   }

   render(){
      return(
         <Provider value={{
            mediaList: this.state.songList,
            playlist: this.state.playlist,
            currentAudioID: this.state.currentAudioID,
            audioDataFn: this.audioData,
            albumArt: this.state.albumArt,
            scrubMediaFn: this.scrubAudio,
            togglePlayFn: this.togglePlay,
            switchMediaFn: this.switchAudio,
            selectMediaFn: this.selectAudio,
            mediaState: (this.PLAYER !== null ? this.PLAYER.playing() : false),
         }}>
            {this.props.children}
         </Provider>
      );
   }
}

export {AudioProvider, Consumer as AudioConsumer};
