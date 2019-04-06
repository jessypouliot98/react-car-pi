import React from 'react';

const { Provider, Consumer } = React.createContext();

class VideoProvider extends React.Component{

   CONTEXT = null;
   ANALYSER = null;
   PLAYER = null;

   state = {
      videoList: [
         {
            path: '/video/',
            file: '107',
         },{
            path: '/video/',
            file: '108',
         },{
            path: '/video/',
            file: '112',
         },{
            path: '/video/',
            file: '138',
         }
      ],
      playlist: [],
      currentVideoID: 0,
      playState: false,
   }

   onEnd = (e) => {
      this.switchVideo(true);
   }

   togglePlay = (play = null) => {
      if(this.PLAYER !== null){
         const playing = !this.PLAYER.paused;
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

   switchVideo = (dir = true) => {
      const id = this.state.currentVideoID;
      const listLength = this.state.songList.length;
      let newID = id;

      if(!dir){
         //prev
         console.log('previous');
         if(id === 0){
            newID = listLength;
         } else {
            newID = id - 1;
         }
      } else {
         //next
         console.log('next');
         if(id === listLength){
            newID = 0;
         } else {
            newID = id + 1;
         }
      }

      this.setState({
         currentVideoID: newID,
      });

      this.togglePlay(true);
   }

   scrubVideo = (time = null) => {
      if(this.PLAYER !== null){
         if(time !== null){
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

   getMedia = () => {
      const id = this.state.currentVideoID;
      const medias = this.state.videoList;
      const file = medias[id];

      if(file){
         return file.path + file.file;
      } else {
         return false;
      }
   }

   getVideoList = () => {
      const songQuery = [
         {
            path: '/video/',
            file: '107',
         },{
            path: '/video/',
            file: '107',
         },{
            path: '/video/',
            file: '107',
         }
      ];
      this.setState({
         songList: songQuery,
      });
   }

   setPlaylist = () => {

   }

   setEventListeners = () => {
      this.PLAYER.onended = this.onEnd;
   }

   componentDidMount(){
      this.PLAYER = document.getElementById('video-player');
      if(this.PLAYER) {
         this.setEventListeners();
         this.getVideoList();
      }
   }

   render(){
      return(
         <Provider value={{
            mediaList: this.state.videoList,
            playlist: this.state.playlist,
            currentMediaID: this.state.currentVideoID,
            currentMediaSrcFn: this.getMedia,
            scrubMediaFn: this.scrubVideo,
            togglePlayFn: this.togglePlay,
            switchMediaFn: this.switchVideo,
            mediaState: (this.PLAYER !== null ? !this.PLAYER.paused : false),
         }}>
            {this.props.children}
         </Provider>
      );
   }
}

export {VideoProvider, Consumer as VideoConsumer};
