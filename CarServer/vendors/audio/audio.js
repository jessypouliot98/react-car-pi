/*
Dependencies
*/
const Metadata = require('music-metadata');
const FileSystem = require('../file_system/filesystem.js').FileSystem;
const jsmediatags = require("jsmediatags");

//Vars
const SUPPORTED_FILE_TYPES = ['mp3', 'flac', 'm4a'];

const FILE_AUDIO_LIBRARY = './configs/audio-library.json';
const AUDIO_LIBRARY = {};
const PUBLIC_APP_DIR = '../CarApp/public/';

class Audio {


  static getSources = async() => {
    const library = FileSystem.loadJSON(FILE_AUDIO_LIBRARY);
    AUDIO_LIBRARY.paths = library.paths;
    AUDIO_LIBRARY.files = library.files;

    return AUDIO_LIBRARY;
  }

  static getAlbumArt = (file) => {
    const promise = new Promise((resolve, reject) => {
      jsmediatags.read(PUBLIC_APP_DIR + file, {
        onSuccess: resp => {
          if(resp.tags.picture) resolve({
            format: resp.tags.picture.format,
            data: resp.tags.picture.data
          });
          resolve();
        },
        onError: err => {
          console.log(':(', err.type, err.info);
          resolve();
        }
      });
    });

    return promise;
  }

  static addSources = async(aSrc) => {
    if(typeof aSrc === 'string') aSrc = [aSrc];

    const folders = FileSystem.linkPathsToApp(aSrc);

    const files = await FileSystem.getItemsFromDirs(aSrc, SUPPORTED_FILE_TYPES, folders);
    const songs = await this.getSongDataList(files);
    // console.log(songs);
    await this.updateLibrary(aSrc, songs);


    return AUDIO_LIBRARY;
  }

  static updateLibrary = async(paths, files) => {
    AUDIO_LIBRARY.paths = paths;
    AUDIO_LIBRARY.files = files;
    const writeSteam = FileSystem.writeFile(FILE_AUDIO_LIBRARY, JSON.stringify(AUDIO_LIBRARY));

    return writeSteam;
  }

  static getSongDataList = (files) => {
    const promise = new Promise((resolve, reject) => {
      const songList = [];

      for(const file of files){
        this.getMetadata(file.path + '/' + file.file).then(meta => {
          const song = {
            title: (meta.common.title ? meta.common.title : file.file),
            artist: (meta.common.artist ? meta.common.artist : undefined),
            album: (meta.common.album ? meta.common.album : undefined),
            path: file.folder,
            file: file.file,
          };

          songList.push(song);
          if(songList.length === files.length) resolve(songList);
        });
      }
    });

    return promise;
  }

  static getMetadata = async(file) => {
    const meta = Metadata.parseFile(file, {native: true});

    return meta;
  }

}

exports.Audio = Audio;
