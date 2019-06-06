import React from 'react';
import classes from './Weather.module.scss';
import { AppContext } from '../../providers/';

class Weather extends React.Component{

  static contextType = AppContext;

  render(){
    const weather = this.context.weather;
    if(weather.cod === "200"){

      const data = {
        city: weather.city.name,
        today: weather.list[0]
      };

      if(data.today.weather.length > 0) data.today.weather = { ...data.today.weather[0] };

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
