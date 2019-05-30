const io = require('socket.io');
const ss = require('socket.io-stream');

class SocketIO {

  constructor(server){
    this.SERVER = server;
  }

  init = (events) => {
    io.listen(this.SERVER).on('connection', events);
  }

}

exports.SocketIO = SocketIO;
