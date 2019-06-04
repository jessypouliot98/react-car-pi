class WeatherWidget{

  WEATHER = {
    appID: 'APPID=a65209e8aafed33f986933a82bfcfc69',
    nbDays: 'cnt=' + 3,
    format: 'units=metric',
  };

  constructor(context){
    this.CONTEXT = context;
    this.HOST = this.CONTEXT.HOST;
    this.SOCKET = this.CONTEXT.SOCKET;
  }

  saveWeather = (data) => {
    this.SOCKET.saveWeather(data);
  }

  getWeatherFromAPI = (city) => {
    const url = 'https://api.openweathermap.org/data/2.5/forecast/daily?id=' + city + '&' + this.WEATHER.nbDays + '&' + this.WEATHER.format + '&' + this.WEATHER.appID;

    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      this.CONTEXT.setState({ weather: data });
      this.saveWeather(data);
    });
  }

  getWeatherFromSave = () => {
    this.SOCKET.getWeather()
    .then(data => {
      this.CONTEXT.setState({ weather: data });
    });
  }

  setLocation = (city) => {
    if(navigator.onLine){
      this.getWeatherFromAPI(city);
    } else {
      console.warn('No internet connection, getting weather from save..');
      this.getWeatherFromSave();
    }
    const sec = 1000;
    const min = 60 * sec;
    setTimeout(this.getWeather, min);
  }
}

export default WeatherWidget
