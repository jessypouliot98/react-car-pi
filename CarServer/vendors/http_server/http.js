/*
Dependencies
*/
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

class HttpServer {

  MIMES = {
    '.ico': 'image/x-icon',
    '.html':'text/html',
    '.js':  'text/javascript',
    '.json':'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
  };

  constructor(port = 80){
    this.PORT = parseInt(port);


  }

  init = () => {
    this.SERVER = http.createServer(this.handler).listen(this.PORT);
  }


  handler = (req, res) => {
    const promise = new Promise((resolve, reject) => {
      console.log(`${req.method} ${req.url}`);

      // parse URL
      const parsedUrl = url.parse(req.url);

      // extract URL path
      // Avoid https://en.wikipedia.org/wiki/Directory_traversal_attack
      // e.g curl --path-as-is http://localhost:9000/../fileInDanger.txt
      // by limiting the path to current directory only
      const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
      let pathname = path.join(__dirname, sanitizePath);

      fs.exists(pathname, function (exist) {
        if(!exist) {
          // if the file is not found, return 404
          res.statusCode = 404;
          res.end(`File ${pathname} not found!`);
          return;
        }

        // if is a directory, then look for index.html
        if (fs.statSync(pathname).isDirectory()) {
          pathname += '/index.html';
        }

        // read file from file system
        fs.readFile(pathname, function(err, data){
          if(err){
            res.statusCode = 500;
            res.end(`Error getting the file: ${err}.`);
          } else {
            // based on the URL path, extract the file extention. e.g. .js, .doc, ...
            const ext = path.parse(pathname).ext;
            // if the file is found, set Content-type and send data
            res.setHeader('Content-type', this.MIMES[ext] || 'text/plain' );
            // res.removeHeader('Access-Control-Allow-Origin');
            res.end(data);
          }
        });
      });

      console.log(`Server listening on port ${this.PORT}`);
    });

    return promise;
  }
  
}

exports.HttpServer = HttpServer;
