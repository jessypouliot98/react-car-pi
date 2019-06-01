/*
   GLOBALS
*/

const FILE_AUDIO_LIBRARY = './audio-library.json';
const AUDIO_LIBRARY = {};

const FILE_VIDEOCLIP_LIBRARY = './audio-library.json';
const VIDEOCLIP_LIBRARY = {};

const PUBLIC_APP_DIR = '../CarApp/public';

if(!DEV){
  const RE = new GPIORotaryEncoder().EE;
}

const util = require('util');
const audioData = require('music-metadata');
const slugify = require('slugify');

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

  if(!DEV){
    RE.on('Press', (bool) => socket.emit('press', bool));
    RE.on('Rotate', (side) => socket.emit('rotate', side));
  }
});

//Socket event - load all files found in sources parameter and write a library of file information
function addSources(socket, aSrc){
   if(typeof aSrc === 'string') aSrc = [aSrc];

   const songList = [];
   const folderItems = getItemsFromDirs(aSrc);
   const fileQuery = getSongsFromItems(folderItems);
   linkFoldersToApp(aSrc);

   fileQuery.then(songs => {
      for(let song of songs){
         songList.push(song);
      }

      AUDIO_LIBRARY.files = songList;
      writeFile(FILE_AUDIO_LIBRARY, JSON.stringify(AUDIO_LIBRARY));
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
         file = FILE_AUDIO_LIBRARY;
         break;
      case 'video_clip':
         file = FILE_VIDEOCLIP_LIBRARY;
         break;
      default:
         console.log('Unregistered Source Type');
         socket.emit('emitSources', false);
         return;
   }

   const libraryRaw = fs.readFileSync(file);
   const aSrc = JSON.parse(libraryRaw).files;

   socket.emit('emitSources', aSrc);
}

/*
   Files
*/

//create symlink from file folder to public app dir
function linkFoldersToApp(aSrc){
  for(const src of aSrc){
    const path = src.split('/');
    const folder = path[path.length - 1];
    const publicDir = PUBLIC_APP_DIR + '/' + folder;

    if(!fs.existsSync(publicDir)){
      fs.symlinkSync(src, publicDir);
    }
  }
  AUDIO_LIBRARY.paths = aSrc;
  writeFile(FILE_AUDIO_LIBRARY, JSON.stringify(AUDIO_LIBRARY));
}

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
function getSongsFromItems(items, types){
   let resolveCount = 0;
   const songMetaList = [];

   const promise = new Promise((resolve, reject) => {
      let miscFileCount = 0;
      for(let file of items){
         const src = file.path + file.file;
         if(isFileSupported(file.file, types)){
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
  const promise = new Promise((resolve, reject) => {
    const wLibraryStrean = fs.createWriteStream(file, 'utf-8');

    wLibraryStrean.write(data, () => resolve(true));
  });

  return promise;
}

/*
   Music
*/

// Returns true or false if audio file is supported
function isFileSupported(file, types){

   for(let type of types){
      if(file.includes('.' + type)) return true;
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
   const folder = file.path.split('/');
   const clientPath = '/' + folder[folder.length - 2];
   return {
      title: (meta.common.title ? meta.common.title : file.file),
      artist: (meta.common.artist ? meta.common.artist : undefined),
      album: (meta.common.album ? meta.common.album : undefined),
      path: clientPath,
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
