/*
Dependencies
*/
const FileSystem = require('../file_system/filesystem.js').FileSystem;

//Vars
const SUPPORTED_FILE_TYPES = ['mp4', ''];

const FILE_VIDEO_LIBRARY = './configs/video-library.json';
const VIDEO_LIBRARY = {};
const PUBLIC_APP_DIR = '../CarApp/public/';

class Video {


  static getSources = async() => {
    const library = FileSystem.loadJSON(FILE_VIDEO_LIBRARY);
    // VIDEO_LIBRARY.paths = library.paths;
    VIDEO_LIBRARY.files = library;
    const folders = FileSystem.linkPathsToApp(['/media/jessy/MyPassport/StingrayMusic/MV_STINGRAY_COMMERCIAL_HD']);

    return VIDEO_LIBRARY;
  }

}

exports.Video = Video;
