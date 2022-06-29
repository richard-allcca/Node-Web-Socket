const express = require('express');
const cors = require('cors');
const { socketsEvents } = require('../sockets-controller/sockets-events');


class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);

    this.paths = {};

    // middlewares
    this.middlewares();

    // routes
    this.routes();

    // Sockets
    this.sockets();
  }

  middlewares() {

    // Cors
    this.app.use(cors());

    // Directories
    this.app.use(express.static('public'));
  }

  routes() {
    // this.app.use(this.paths.aout, require('../routes/aouth'));
  }

  sockets() {
    this.io.on('connection', socketsEvents)
  }

  listen() {
    // Usamos this.server para usar el socket.io
    this.server.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto: ', this.port)
    })
  }
}

module.exports = Server;
