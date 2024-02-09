import React, { useState, useEffect } from 'react';
import PlaceIcon from '@mui/icons-material/Place';

const Datos = () => {
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [weatherState, setWeatherState] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  }));
  const [timezone, setTimezone] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lat = 51.5074;
        const lon = -0.1278;
        const apiKey = "1fab01c07468ce8a7d396af998fe84c5";
        const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=${apiKey}&units=metric`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        setCurrentTemperature(data.current.temp);
        setWeatherState(data.current.weather[0].main);
        setCurrentDate(new Date().toLocaleString('en-US', {
          weekday: 'short',
          day: 'numeric',
          month: 'short'
        }));
        setTimezone(data.timezone);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>

      <p className="temperatura text-4xl text-center text-white mt-[45%] ml-10" style={{ maxWidth: "300px", fontFamily: "Raleway, sans-serif", textAlign: "center", fontSize: "70px" }}>
        {currentTemperature != null ? `${Math.round(currentTemperature)}` : 'Loading...'}
        <span style={{ fontSize: "20px" }}>°C</span>
      </p>
      <p className="estado-clima text-xl text-center text-white" style={{ fontFamily: "Raleway, sans-serif", textAlign: "center", marginTop: "20px" }}>
        {weatherState}
      </p>

      <p className="fecha-actual text-sm text-center text-white" style={{ fontFamily: "Raleway, sans-serif", textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
        Today • {currentDate}
      </p>

      <p className="fecha-actual text-sm text-center text-white" style={{ fontFamily: "Raleway, sans-serif", textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
         <PlaceIcon /> {timezone}
      </p>

    </>
  );
};

export default Datos;
