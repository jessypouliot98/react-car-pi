import Sort from '../../../functions/Sort';
// import Converter from '../../../functions/Converter';

class VideoWidget{

  VIDEO_LIST = [];

  PLAYLIST = {
    id: 0,
    list: [],
    isPlaying: true,
  };

  constructor(context){
    this.CONTEXT = context;
    this.HOST = this.CONTEXT.HOST;
    this.SOCKET = this.CONTEXT.SOCKET;
    this.initialise();
  }

  initialise = () => {
    const app = document.getElementsByClassName('App')[0];
    this.PLAYER = document.createElement('video');
    if(this.PLAYER) {
       this.setEventListeners();
    }
  }

  setEventListeners = () => {
     this.PLAYER.onended = this.onEnd;
     this.PLAYER.onpause = this.onPaused;
  }

  onEnd = (e) => {
     this.switchMedia(true);
  }

  onPaused = (e) => {
    if(this.PLAYLIST.isPlaying) this.play();
  }

  setVideo = (id) => {
     this.CONTEXT.forceUpdate();

     if(this.PLAYLIST.list.length > 0){
       const video = this.PLAYLIST.list[id];
       this.PLAYER.src = '/MV_STINGRAY_COMMERCIAL_HD/' + video.file;
       console.info('[VIDEO] Mounted:', video.title + ' - ' + video.artist);
       if(this.PLAYLIST.isPlaying){
         this.play();
       }
     }
  }

  togglePlay = () => {
     if(this.PLAYER){
        const playing = !this.PLAYER.paused;
        let state;

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
    if(this.PLAYER){
      this.PLAYER.play();
      this.CONTEXT.mediaFocus('video');
      this.PLAYLIST.isPlaying = true;
      return true;
    }
    return false;
  }

  pause = () => {
    if(this.PLAYER){
      this.PLAYER.pause();
      this.PLAYLIST.isPlaying = false;
      return false;
    }
    return false;
  }

  scrubMedia = (time) => {
     if(this.PLAYER !== undefined){
        if(time !== undefined){
          const duration = this.PLAYER.duration;
          this.PLAYER.currentTime = time * duration;
        } else {
          return {
             current: this.PLAYER.currentTime,
             total: this.PLAYER.duration,
          };
        }
     } else {
        return false;
     }
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

     this.setVideo(newID);
  }

  getLibrary = async(library) => {
    let files;

    if(library === undefined){
      console.info('Fetching video library from server..');
      const data = await this.SOCKET.getVideos();
      files = data.files;
    }

    if(files === null) files = [];
    const audioList = Sort.quickSortObject(files, 'title', 'ASC');
    this.VIDEO_LIST = audioList;

    this.setPlaylist();

    return;
  }

  setPlaylist = () => {
     console.info('Setting playlist..');
     const playlist = Sort.quickSortObject(this.VIDEO_LIST, 'artist', 'ASC');
     const randomID = Math.floor(Math.random() * playlist.length);

     this.PLAYLIST.id = randomID;
     this.PLAYLIST.list = playlist;

     this.setVideo(this.PLAYLIST.id);
     this.CONTEXT.forceUpdate();
  }

}

export default VideoWidget
