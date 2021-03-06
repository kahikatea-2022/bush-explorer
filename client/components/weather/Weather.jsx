import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather } from '../../actions/weather'
import { fetchForecast } from '../../actions/forecast'
import WaitCircular from '../WaitIndicator/WaitCircular'

function Weather() {
  const weather = useSelector((state) => state.weather)
  const forecast = useSelector((state) => state.forecast)
  const waiting = useSelector((state) => state.waiting)
  const dispatch = useDispatch()

  const { temperature } = weather

  useEffect(() => {
    dispatch(fetchWeather())
    dispatch(fetchForecast())
  }, [])

  return waiting ? (
    <WaitCircular />
  ) : (
    <div>
      <div className="weather-container">
        <div className="weather-rectangle">
          <p className="weather-day">Today</p>
          <img
            src="/icons/weather/cloudy.png"
            alt="current weather"
            className="weather-icon"
          />
          <p className="weather-temp">{temperature}&deg;C</p>
        </div>
        {forecast.slice(0, 2).map((forecastData, index) => (
          <div key={index} className="weather-rectangle">
            <p className="weather-day">
              {index === 0 ? 'Tomorrow' : 'Saturday'}
            </p>
            <img
              src="/icons/weather/rain.png"
              alt="current weather"
              className="weather-icon"
            />
            <p className="weather-temp">{forecastData.temperature}&deg;C</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Weather
