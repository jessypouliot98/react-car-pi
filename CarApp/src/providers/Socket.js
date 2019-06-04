import io from 'socket.io-client';

class Socket {
   SOCKET = null;

   connect = (host) => {
      const promise = new Promise((resolve, reject) => {
         this.SOCKET = io(host);
         this.SOCKET.on('status', (connected) => resolve(connected));
      });

      return promise;
   }

   refreshSongLibrary = (aSrc) => {
      const promise = new Promise((resolve, reject) => {
         this.SOCKET.emit('addSources', aSrc);
         this.SOCKET.on('addedSources', (aSrc) => resolve(aSrc));
      });

      return promise;
   }

   getSongs = () => {
      const promise = new Promise((resolve, reject) => {
         this.SOCKET.emit('getSources');//BROKEN ??
         this.SOCKET.on('emitSources', (aSrc) => resolve(aSrc));
      });

      return promise;
   }

   getAlbumArt = (file) => {
     const promise = new Promise((resolve, reject) => {
        this.SOCKET.emit('getAlbumArt', file);
        this.SOCKET.on('emitAlbumArt', (img64) => resolve(img64));
     });

     return promise;
   }

   getWeather = () => {
     const promise = new Promise((resolve, reject) => {
        this.SOCKET.emit('getWeather');
        this.SOCKET.on('emitWeather', (data) => resolve(JSON.parse(data)));
     });

     return promise;
   }

   saveWeather = (data) => {
     const promise = new Promise((resolve, reject) => {
        this.SOCKET.emit('setWeather', JSON.stringify(data));
     });

     return promise;
   }

   getLocation = () => {
     const promise = new Promise((resolve, reject) => {
        this.SOCKET.emit('getLocation');
        this.SOCKET.on('emitLocation', (id) => resolve(JSON.parse(id)));
     });

     return promise;
   }

   setLocation = (id) => {
     const promise = new Promise((resolve, reject) => {
        this.SOCKET.emit('setLocation', JSON.stringify(id));
        this.SOCKET.on('emitLocation', (id) => resolve(JSON.parse(id)));
     });

     return promise;
   }

   inputListener = (fn) => {
     const promise = new Promise((resolve, reject) => {
       this.SOCKET.on('rotate', (side) => fn.onRotate(side));
       this.SOCKET.on('press', (bool) => fn.onPress(bool));
     });

     return promise;
   }
}

export default Socket
