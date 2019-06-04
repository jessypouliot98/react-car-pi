const DEV = true;

/*
Dependencies
*/
const HttpServer = require('./vendors/http_server/http.js').HttpServer;
const SocketIO = require('./vendors/socket/socket.js').SocketIO;
const Audio = require('./vendors/audio/audio.js').Audio;
const FileSystem = require('./vendors/file_system/filesystem.js').FileSystem;
const Weather = require('./vendors/weather/weather.js').Weather;

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

    /**
    * LIBRARY
    */

    //GET
    socket.on('getSources', () => {
      Audio.getSources()
      .then(aSrc => {
        socket.emit('emitSources', aSrc);
      })
      .catch(err => console.log(err));
    });

    //POST
    socket.on('addSources', (paths) => {
      Audio.addSources(paths)
      .then(aSrc => socket.emit('addedSources', aSrc))
      .catch(err => console.log(err));
    });

    //DELETE
    socket.on('removeSources', (array) => Audio.removeSources(socket, array));

    /**
    * AUDIO
    */

    //GET - ALBUM COVER
    socket.on('getAlbumArt', (file) => {
      Audio.getAlbumArt(file)
      .then(img64 => socket.emit('emitAlbumArt', img64))
      .catch(err => console.log(err));
    });

    /**
    * WEATHER
    */

    //GET
    socket.on('getWeather', () => {
      Weather.loadWeather()
      .then(data => socket.emit('emitWeather', data))
      .catch(err => console.log(err));
    });

    //POST
    socket.on('setWeather', (data) => {
      Weather.saveWeather(data);
    });

    //GET
    socket.on('getLocation', () => {
      Weather.getLocation()
      .then(id => socket.emit('emitLocation', id))
      .catch(err => console.log(err));
    });

    //POST
    socket.on('setLocation', (id) => {
      Weather.setLocation(id)
      .then(() => socket.emit('emitLocation', id))
      .catch(err => console.log(err));
    });


    /**
    * INPUTS
    */
    if(!DEV){
      RE.on('Press', (bool) => socket.emit('press', bool));
      RE.on('Rotate', (side) => socket.emit('rotate', side));
    }
  }

}

const carServer = new CarServer();
