/*
Dependencies
*/
const fs = require('fs');

//vars
const PUBLIC_APP_DIR = '../CarApp/public';

class FileSystem {

  static writeFile = (file, data) => {
    const promise = new Promise((resolve, reject) => {
      const writeFileStrean = fs.createWriteStream(file, 'utf-8');
      writeFileStrean.write(data);
      writeFileStrean.end(() => resolve(true));
    });

    return promise;
  }

  static loadJSON = (file) => {
    const data = fs.readFileSync(file);
    const json = (data.length === 0 ? {} :JSON.parse(data));

    return json;
  }

  static getItemsFromDirs = async(aSrc, types, paths) => {
    const files = [];

    for(let i = 0; i < aSrc.length; i++){
      const src = aSrc[i];
      const path = paths[i];
      const items = fs.readdirSync(src);

      for(const item of items){
        if(this.isFolder(src, item)){
          const results = await this.getItemsFromDirs([src + '/' + item], types, [path + '/' + item]);
          for(const result of results){
            files.push(result);
          }
        }
        else if(this.isFileSupported(item, types)) {
          const file = {
            path: src,
            folder: path,
            file: item,
          };
          files.push(file);
        }
      }
    }

    return files;
  }

  static getFilesFromItems = async(items, types) => {
    const fileList = [];

    for(let file of items){
      const src = file.path + file.file;
      if(this.isFileSupported(file.file, types)){
        fileList.push(src);
      }
    }

    return fileList;
  }

  static isFileSupported = (file, types) => {
     for(let type of types){
        if(file.includes('.' + type)) return true;
     }

     return false;
  }

  static isFolder = (path, item) => {
    return fs.lstatSync(path + '/' + item).isDirectory();
  }

  static linkPathsToApp = (paths) => {
    const publicPaths = [];

    for(const path of paths){
      const folders = path.split('/');
      const folder = folders[folders.length - 1];
      const publicDir = PUBLIC_APP_DIR + '/' + folder;
      publicPaths.push('/' + folder);

      if(!fs.existsSync(publicDir)){
        fs.symlinkSync(path, publicDir)
      }
    }

    return publicPaths;
  }

}

exports.FileSystem = FileSystem;
