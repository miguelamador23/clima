import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';

function Grib2({ selectedState, updateWeatherData }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      if (selectedState) {
        const apiKey = 'deccf3474efa27ddf6ec3fba5099fa33';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedState}&appid=${apiKey}`);
        if (response.ok) {
          const data = await response.json();
          setWeatherData({
            wind_speed: data.wind.speed,
            humidity: data.main.humidity,
            visibility: data.visibility,
            pressure: data.main.pressure,
          });
          updateWeatherData({ latitude: data.coord.lat, longitude: data.coord.lon }); 
        } else {
          console.error('Error al obtener datos del clima');
        }
      }
    };

    getWeatherData();
  }, [selectedState]);


  
  return (
    <div className="centered-content">
      <div>
        <h3 className="text-white">Today's Highlights</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-700 text-white p-4">
          <h2 className="text-xl font-semibold">Wind Status</h2>
          {weatherData && `${weatherData.wind_speed} m/s`}
        </div>
        <div className="bg-slate-700 text-white p-4">
          <h2 className="text-xl font-semibold">Humidity</h2>
          {weatherData && `${weatherData.humidity}%`}
          {weatherData && <LinearProgress variant="determinate" value={weatherData.humidity} />}
        </div>
        <div className="bg-slate-700 text-white p-4">
          <h2 className="text-xl font-semibold">Visibility</h2>
          {weatherData && `${weatherData.visibility} meters`}
        </div>
        <div className="bg-slate-700 text-white p-4">
          <h2 className="text-xl font-semibold">Air Pressure</h2>
          {weatherData && `${weatherData.pressure} hPa`}
        </div>
      </div>
    </div>
  );
}

export default Grib2;