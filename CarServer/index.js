const DEV = true;

/*
Dependencies
*/
const HttpServer = require('./vendors/http_server/http.js').HttpServer;
const SocketIO = require('./vendors/socket/socket.js').SocketIO;
const Audio = require('./vendors/audio/audio.js').Audio;

if(!DEV){
  const GPIORotaryEncoder = require('./vendors/gpio_rotary/rotary.js').GPIORotaryEncoder;
}


class CarServer {

  constructor(){
    this.HTTP = new HttpServer(process.argv[2]);
    this.HTTP.init();
    this.SOCKET = new SocketIO(this.HTTP.SERVER).init(this.socketEvents);
  }

  socketEvents = (socket) => {
    socket.emit('status', true);

    //Library sources
    socket.on('getSources', () => {
      Audio.getSources()
      .then(aSrc => {
        socket.emit('emitSources', aSrc);
      })
      .catch(err => console.log(err));
    });

    socket.on('addSources', (paths) => {
      Audio.addSources(paths)
      .then(status => {
        socket.emit('addedSources', status);
      })
      .catch(err => console.log(err));
    });

    socket.on('removeSources', (array) => Audio.removeSources(socket, array));

    if(!DEV){
      RE.on('Press', (bool) => socket.emit('press', bool));
      RE.on('Rotate', (side) => socket.emit('rotate', side));
    }
  }

}

const carServer = new CarServer();
