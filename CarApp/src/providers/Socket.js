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
         this.SOCKET.on('addedSources', done => resolve(done));
      });

      return promise;
   }

   getSongs = () => {
      const promise = new Promise((resolve, reject) => {
         this.SOCKET.emit('getSources', 'music');
         this.SOCKET.on('emitSources', (aSrc) => resolve(aSrc));
      });

      return promise;
   }
}

export default Socket
