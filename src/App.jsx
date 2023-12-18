import { useEffect, useState } from 'react'
import axios from 'axios';

import './App.css'

function App() {

  const [weather, setWeather] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);

  const date = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  const time = new Date().toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  })


  useEffect(() => {
    console.log("Date: ", new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }));
    axios.get("https://api.weather.gov/gridpoints/MTR/84,105/forecast")
    .then((response) => {
      const getNowAndComingDays = response.data.properties.periods;
      //get now and three upcoming days not overnight days.
      console.log("getNowAndComingDays => ",response.data.properties)
      setCurrentWeather(getNowAndComingDays[0])
      setWeather([getNowAndComingDays[1], getNowAndComingDays[3], getNowAndComingDays[5]])
      // setWeather(getNowAndComingDays)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }, [])


  return (
    <div className="container">
      <div className="hero">
        <p className="hero__title">San Francisco Bay Area</p>
        <p>{currentWeather?.name}</p>
        <div className="hero__weather">
          <img className="hero__image" src={currentWeather?.icon} />
          <div>
            <p style={{margin: 0, fontSize: "30px"}}>{currentWeather?.temperature}°F</p>
            <p style={{margin: 0}}>{currentWeather?.shortForecast}</p>
          </div>
        </div>
      </div>
      <div>

      
      {
        weather.map((weather, index) => {
          return <div  className="weather" key={index}>
            <div className="weather__card">
              <div className="weather__date">
                <p>{weather.name}</p>
              </div>
              <p style={{fontSize: "19px"}}>{weather.temperature}°F</p>
              <img src={weather.icon} />
            </div>
            <p style={{margin: 0}}>{weather.shortForecast}</p>
          </div>
        })
      }
      </div>
    </div>
  )
}

export default App
