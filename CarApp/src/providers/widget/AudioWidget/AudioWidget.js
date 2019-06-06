import {Howl, Howler} from 'howler';
import Sort from '../../../functions/Sort';
import Converter from '../../../functions/Converter';

class AudioWidget{

  AUDIO_LIST = [];

  PLAYLIST = {
    id: 0,
    list: [],
    isPlaying: false,
  };

  DEFAULT_ALBUM_ART = '/wallpaper/album_art.png';

  constructor(context){
    this.CONTEXT = context;
    this.HOST = this.CONTEXT.HOST;
    this.SOCKET = this.CONTEXT.SOCKET;
    this.AUDIO = new AudioContext();
  }

  togglePlay = (play = null) => {
     if(this.PLAYER !== null){
        const playing = this.PLAYER.playing();
        let state = playing;

        if(!playing){
          state = this.play();
        } else {
          state = this.pause();
        }

        return state;
     }

     this.CONTEXT.forceUpdate();

     return false;
  }

  play = () => {
    this.PLAYER.play();
    this.CONTEXT.mediaFocus('audio');
    this.PLAYLIST.isPlaying = true;
    return true;
  }

  pause = () => {
    this.PLAYER.pause();
    this.PLAYLIST.isPlaying = false;
    return false;
  }

  switchMedia = (dir = true) => {
     const id = this.PLAYLIST.id;
     const listLength = this.PLAYLIST.list.length;
     let newID = id;

     if(!dir){
        //prev
        console.log('[Previous]');
        if(id === 0){
           newID = listLength - 1;
        } else {
           newID = id - 1;
        }
     } else {
        //next
        console.log('[Next]');
        if(id === listLength - 1){
           newID = 0;
        } else {
           newID = id + 1;
        }
     }

     this.PLAYLIST.id = newID;

     this.setAudio(newID);
  }

  scrubMedia = (time) => {
     if(this.PLAYER !== undefined){
        if(time !== undefined){
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

  getAlbumArt = (song) => {
    let albumArt = this.DEFAULT_ALBUM_ART;
    this.PLAYLIST.artwork = albumArt;
    this.CONTEXT.forceUpdate();

    if(song){
      const file = song.path + '/' + song.file;
      this.SOCKET.getAlbumArt(file).then(img => {
        if(img){
          if(img.data.length === 0) return;//prevent empty img bug
          const img64 = Converter.arrayBufferToBase64(img.data, 'data:' + img.format + ';base64,');
          this.PLAYLIST.artwork = img64;
          this.CONTEXT.forceUpdate();
        }
      });
    }
  }

  stopMedia = () => {
    if(this.PLAYER){
      this.PLAYER.unload();
      this.PLAYER = undefined;
    }
  }

  setAudio = (id) => {
     this.stopMedia();
     this.CONTEXT.forceUpdate();

     if(this.PLAYLIST.list.length > 0){
       const audioObj = this.PLAYLIST.list[id];

       console.info('[AUDIO] Mounted:', audioObj.title + ' - ' + audioObj.artist);

       const file = audioObj.path + '/' + audioObj.file;
       this.getAlbumArt(audioObj);
       const audio = new Howl({
         src: file,
         autoplay: true,
         onload: () => {
           if(audio !== this.PLAYER){
             audio.unload();
             return;
           }
           if(!this.PLAYLIST.isPlaying) audio.pause();
           this.ANALYSER = Howler.ctx.createAnalyser();
           Howler.masterGain.connect(this.ANALYSER);
           this.CONTEXT.forceUpdate();
         },
         onend: () => {
           this.switchMedia(true);
         }
       });
       this.PLAYER = audio;
     }
  }

  audioData = () => {
     if(this.PLAYER !== undefined){
        if(this.PLAYER.playing() && this.ANALYSER !== undefined){
           this.ANALYSER.fftSize = 1024;
           const bufferLength = this.ANALYSER.frequencyBinCount;
           const dataArray = new Uint8Array(bufferLength);
           this.ANALYSER.getByteFrequencyData(dataArray)

           return dataArray;
        }
     }
     return false;
  }

  setLibrary = (aSrc) => {
    this.SOCKET.refreshSongLibrary(aSrc)
    .then(library => this.getLibrary(library));
  }

  getLibrary = async(src) => {
    let library;

    if(src === undefined){
      console.info('Fetching audio library from server..');
      const data = await this.SOCKET.getSongs();
      library = data;
    } else {
      library = src;
    }

    if(library === null) library = [];
    library.files = Sort.quickSortObject(library.files, 'title', 'ASC');
    this.AUDIO_LIST = library;

    this.setPlaylist();

    return;
  }


  setPlaylist = () => {
     console.info('Setting playlist..');
     const playlist = Sort.quickSortObject(this.AUDIO_LIST.files, 'title', 'ASC');
     const randomID = Math.floor(Math.random() * playlist.length);

     this.PLAYLIST = {
       id: randomID,
       list: playlist,
     }

     this.setAudio(this.PLAYLIST.id);
     this.CONTEXT.forceUpdate();
  }

}

export default AudioWidget
