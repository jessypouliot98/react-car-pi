/*
Dependencies
*/
const fs = require('fs');

//vars
const PUBLIC_APP_DIR = '../CarApp/public/';

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

  static getItemsFromDirs = (aSrc, types, folder) => {
    const promise = new Promise((resolve, reject) => {
      const files = [];
      let folders = 0;
      let resolvedFolders = 0;

      for(let dir of aSrc){
        if(folder === undefined){
          const paths = dir.split('/');
          folder = '/' + paths[paths.length - 1];
        }

        if(dir[dir.length-1] !== '/') dir += '/';

        const items = fs.readdirSync(dir);


        for(let item of items){
          if(!this.isFolder(dir, item)){
            if(this.isFileSupported(item, types)){
              files.push({
                path: dir,
                folder: folder,
                file: item,
              });
            }
          } else {
            folders++;
            this.getItemsFromDirs([dir + '/' + item], types, folder + '/' + item)
            .then(results => {
              resolvedFolders++;

              for(const r of results){
                files.push(r);
              }

              if(folders === resolvedFolders){
                resolve(files);
              }
            })
            .catch(err => console.log(err));
          }
        }
      }

      if(folders === 0) resolve(files);
    });

    return promise;
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
    for(const path of paths){
      const folders = path.split('/');
      const folder = folders[folders.length - 1];
      const publicDir = PUBLIC_APP_DIR + '/' + folder;

      if(!fs.existsSync(publicDir)){
        fs.symlinkSync(path, publicDir);
      }
    }
  }

}

exports.FileSystem = FileSystem;
