/*
Dependencies
*/
const http = require('http').createServer(handler);
const url = require('url');
const fs = require('fs');
const path = require('path');
const util = require('util');
const io = require('socket.io');
const ss = require('socket.io-stream');
const audioData = require('music-metadata');
const slugify = require('slugify');
const GPIORotaryEncoder = require('./vendors/gpio_rotary/rotary.js').GPIORotaryEncoder;

/*
   GLOBALS
*/
const AUDIO_LIBRARY = './audio-library.json';
const VIDEOCLIP_LIBRARY = './audio-library.json';

const RE = new GPIORotaryEncoder().EE;

RE.on('Press', (bool) => console.log('Pressed: ' + bool));
RE.on('Rotate', (side) => console.log( 'Rotated: ' + (side ? 'Right' : 'Left') ));

/*
  HTTP SERVER
*/
const port = process.argv[2] || 80;

// maps file extention to MIME types
const mimeType = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
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

http.listen(parseInt(port));

function handler(req, res) {
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
        res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
        res.end(data);
      }
    });
  });
}
console.log(`Server listening on port ${port}`);

/*
   SOCKET.IO
*/
io.listen(http).on('connection', function (socket) {
  //Connection
  // console.log(socket);
  socket.emit('status', true);

  //Library sources
  socket.on('addSources', (array) => addSources(socket, array));
  socket.on('removeSources', (array) => removeSources(socket, array));
  socket.on('getSources', (type) => getSources(socket, type));
});

//Socket event - load all files found in sources parameter and write a library of file information
function addSources(socket, aSrc){
   if(typeof aSrc === 'string') aSrc = [aSrc];

   const songList = [];
   const folderItems = getItemsFromDirs(aSrc);
   const fileQuery = getSongsFromItems(folderItems);

   fileQuery.then(songs => {
      for(let song of songs){
         songList.push(song);
      }
      writeFile(AUDIO_LIBRARY, JSON.stringify(songList));
      socket.emit('addedSources', true);
   });
}

// TODO
function removeSources(socket, aSrc){
   socket.emit('removedSources', true);
}

//Returns json library
function getSources(socket, type){
   let file;
   switch(type){
      case 'music':
         file = AUDIO_LIBRARY;
         break;
      case 'video_clip':
         file = VIDEOCLIP_LIBRARY;
         break;
      default:
         console.log('Unregistered Source Type');
         socket.emit('emitSources', false);
         return;
   }

   const libraryRaw = fs.readFileSync(file);
   const aSrc = JSON.parse(libraryRaw);

   socket.emit('emitSources', aSrc);
}

/*
   Files
*/

//get list of files from source directories
function getItemsFromDirs(aSrc){
   const folderItems = [];

   for(let dir of aSrc){
      if(dir[dir.length-1] !== '/') dir += '/';

      const files = fs.readdirSync(dir);
      for(let file of files){
         folderItems.push({
            path: dir,
            file: file,
         });
      }
   }

   return folderItems;
}

//Get file info from song items
function getSongsFromItems(items){
   let resolveCount = 0;
   const songMetaList = [];

   const promise = new Promise((resolve, reject) => {
      let miscFileCount = 0;
      for(let file of items){
         const src = file.path + file.file;
         if(containsAudioExtension(file.file)){
            const meta = getSongMeta(src);

            meta.then(data => {
               resolveCount++;
               songMetaList.push(getSongObject(file, data));
               if(resolveCount === items.length - 1 - miscFileCount) resolve(songMetaList);
            });
         } else {
            miscFileCount++;
         }
      }
   });

   return promise;
}

//Write library to selected file library
function writeFile(file, data){
   const wLibraryStrean = fs.createWriteStream(file, 'utf-8');

   wLibraryStrean.write(data);
}

/*
   Music
*/

// Returns true or false if audio file is supported
function containsAudioExtension(file){
   const supported = ['mp3', 'flac', 'm4a'];

   for(let extension of supported){
      if(file.includes('.' + extension)) return true;
   }

   return false;
}

//returns audio metadata
function getSongMeta(file){
  const meta = audioData.parseFile(file, {native: true});

  return meta;
}

//returns a formated audio object for audioLibrary
function getSongObject(file, meta){
   return {
      title: (meta.common.title ? meta.common.title : file.file),
      artist: (meta.common.artist ? meta.common.artist : undefined),
      album: (meta.common.album ? meta.common.album : undefined),
      path: file.path,
      file: file.file,
   }
}


//Stingray video DB to myDB
function convertStingrayToLibrary(){
   const songlist = [];
   const stingray = fs.readFileSync('./assetInfo.json');
   const json = JSON.parse(stingray);
   const playlist = Object.keys(json).map(key => (json[key]));

   const list = Object.values(playlist);
   for(let item of playlist){
      Object.keys(item).map(key => {
         const song = item[key];
         console.log(song.title + song.artist + song.albumTitle + song.assetId);
         if(song.title && song.artist && song.assetId){
            songlist.push({
               title: song.title,
               artist: song.artist,
               album: song.albumTitle,
               path: './',
               file: song.assetId,
            });
         }
      });
      // break;
   }
   console.log(songlist);
   writeFile('./video.json', JSON.stringify(songlist));
}
// convertStingrayToLibrary();
