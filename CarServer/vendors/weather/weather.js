/**
* Dependencies
*/

const FileSystem = require('../file_system/filesystem.js').FileSystem;

/**
* VARIABLES
*/

const WEATHER_SAVE = './configs/weather-save.json';
const WEATHER_CONFIG = './configs/weather-config.json';

class Weather {

  static loadWeather = async() => {
    const data = FileSystem.loadJSON(WEATHER_SAVE);

    return JSON.stringify(data);
  }

  static saveWeather = (data) => {
    FileSystem.writeFile(WEATHER_SAVE, data);
  }

  static getLocation = async() => {
    const data = FileSystem.loadJSON(WEATHER_CONFIG);

    return JSON.stringify(data);
  }

  static setLocation = async(id) => {
    FileSystem.writeFile(WEATHER_CONFIG, id);
    return id;
  }

}

exports.Weather = Weather;
