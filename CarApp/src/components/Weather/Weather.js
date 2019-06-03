import React from 'react';
// import { Row, Col } from '../';
import classes from './Weather.module.scss';

class Weather extends React.Component{

  WEATHER_APP_ID = 'APPID=' + 'a65209e8aafed33f986933a82bfcfc69';

  WEATHER_NB_DAYS = 'cnt=' + 3;

  WEATHER_CITY = '6138501';
  WEATHER_LOCATION = 'q=' + this.WEATHER_CITY;

  WEATHER_FORMAT = 'units=' + 'metric';

  WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/forecast/daily?id=' + this.WEATHER_CITY + '&' + this.WEATHER_NB_DAYS + '&' + this.WEATHER_FORMAT + '&' + this.WEATHER_APP_ID;

  state = {
    weather: {},
  }

  getWeather = () => {
    fetch(this.WEATHER_API_URL)
    .then(resp => resp.json())
    .then(data => this.setState({ weather: data }));
  }

  componentDidMount(){
    this.getWeather();
  }

  render(){
    // console.log(this.state.weather);
    const weatherLoaded = (Object.entries(this.state.weather).length > 0);
    if(weatherLoaded){
      const data = {
        city: this.state.weather.city.name,
        today: this.state.weather.list[0]
      };
      data.today.weather = data.today.weather[0];
      console.log(data);
      return(
        <div className={classes.Weather}>
          <div className={classes.Col}>
            <img src={'/icons/weather_icons/' + data.today.weather.icon + '.svg'} alt={data.today.weather.main + ' icon'} className={classes.WeatherIcon}/>
          </div>
          <div className={classes.Col}>
            <div className={classes.WeatherTemp}>{data.today.temp.max.toFixed(1)} &deg;C</div>
            <div className={classes.WeatherCity}>{data.city}</div>
            <div className={classes.WeatherWeather}>{data.today.weather.description}</div>
          </div>
        </div>
      );
    } else {
      return(
        <div className={classes.Weather}>
          <div className={classes.Col}>
            <img src={'/icons/weather_icons/01d.svg'} alt={'Default icon'} className={classes.WeatherIcon}/>
          </div>
          <div className={classes.Col}>
            <div className={classes.WeatherTemp}>0 &deg;C</div>
            <div className={classes.WeatherCity}>Unknown</div>
            <div className={classes.WeatherWeather}>unknown</div>
          </div>
        </div>
      );
    }
  }
}

export default Weather
