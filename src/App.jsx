import { useEffect, useState } from 'react'
import axios from 'axios';

import './App.css'

function App() {

  const [weather, setWeather] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    console.log("Date: ", new Date().toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }));
    axios.get("https://api.weather.gov/gridpoints/MTR/84,105/forecast")
    .then((response) => {
      const getNowAndComingDays = response.data.properties.periods;

      setCurrentWeather(getNowAndComingDays[0])
      console.log("This is getNow", getNowAndComingDays)
      //get now and three upcoming days not overnight days.
      setWeather([getNowAndComingDays[1], getNowAndComingDays[3], getNowAndComingDays[5]])
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }, [])


  return (
    <div className="container">
      <div className="weather">
        <div className="weather-info">
          <p className="title">🌡️ Weather APP</p>
          <p className="sub-title">San Francisco Bay Area</p>
          <p className="date">
            {new Date().toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </p>
          <p style={{margin: 0, fontSize: "30px"}}>{currentWeather?.temperature}°F</p>
          <p>{currentWeather?.shortForecast}</p>
        </div>
        <div className="weather-more">
          <p>Percipitation: {currentWeather?.probabilityOfPrecipitation?.value || 0}%</p>
          <p>Humidity: {currentWeather?.relativeHumidity?.value || 0}% </p>
          <p>Wind Speed: {currentWeather?.windSpeed} </p> 
        </div>
      </div>
    <div>

    {
      weather.map((weather, index) => {
        return <div className="days-weather" key={index}>
          <div>
            <p><strong>{weather.name}</strong></p>
            <p style={{margin: 0}}>{weather.shortForecast}</p>
          </div>
          <p >{weather.temperature}°F</p>
        </div>
      })
    }
      </div>
    </div>
  )
}

export default App
