import React, { useState, useEffect } from "react";

const Highlights = () => {
  const [weatherData, setWeatherData] = useState(null);

  const lat = 51.5074;
  const lon = -0.1278;
  const apiKey = "1fab01c07468ce8a7d396af998fe84c5";
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apiKey}&units=imperial`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const windSpeed = data.daily[0].wind_speed;
        const windDirection = data.daily[0].wind_deg;
        const humidity = data.daily[0].humidity;
        const visibilityMiles = data.daily[0].visibility;
        const pressure = data.daily[0].pressure;
        setWeatherData({ windSpeed, windDirection, humidity, visibility: visibilityMiles, pressure });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [apiUrl]);

  const getWindDirectionText = (angle) => {
    if (angle >= 337.5 || angle < 22.5) {
      return "Norte";
    } else if (angle >= 22.5 && angle < 67.5) {
      return "Noreste";
    } else if (angle >= 67.5 && angle < 112.5) {
      return "Este";
    } else if (angle >= 112.5 && angle < 157.5) {
      return "Sureste";
    } else if (angle >= 157.5 && angle < 202.5) {
      return "Sur";
    } else if (angle >= 202.5 && angle < 247.5) {
      return "Suroeste";
    } else if (angle >= 247.5 && angle < 292.5) {
      return "Oeste";
    } else {
      return "Noroeste";
    }
  };

  return (
    <>
    {/* Status y direccion */}
    <div
        className="flex flex-wrap ml-[20%] mt-[4%] text-white rounded-lg p-2 bg-slate-700 "
        style={{ maxWidth: "300px", fontFamily: 'Raleway, sans-serif' }}
      >
        {weatherData && (
          <div className="p-4 w-full text-center mr">
            <h1 style={{ fontFamily: 'Raleway, sans-serif' }}>Wind Status: <p className="mt-[2%]" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 'bold', fontSize: '40px' }}>{weatherData.windSpeed} m/s</p></h1>
            <h2 style={{ fontFamily: 'Raleway, sans-serif',}}> <p>{getWindDirectionText(weatherData.windDirection)}</p></h2>
          </div>
        )}
      </div>

      {/* Humedad */}
      <div
        className="flex flex-wrap ml-[50%] mt-[-13%] text-white rounded-lg p-2 bg-slate-700 "
        style={{ maxWidth: "300px", fontFamily: 'Raleway, sans-serif', fontWeight: 'bold' }}
      >
        {weatherData && (
          <div className="p-4  w-full text-center mr">
            <h1 style={{ fontFamily: 'Raleway, sans-serif'}}>Humidity: <p style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 'bold', fontSize : '40px' }}> {weatherData.humidity}%</p></h1>
          </div>
        )}
      </div>

      {/* Visibilidad */}
      <div
        className="flex flex-wrap ml-[20%] mt-[4%] text-white rounded-lg p-2 bg-slate-700 "
        style={{ maxWidth: "300px" }}
      >
        {weatherData && (
          <div className="p-4  w-full text-center mr">
            <p  style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 'bold' }}>Visibility: {weatherData.visibility} miles</p>
          </div>
        )}
      </div>

      {/* Presion */}
      <div
        className="flex flex-wrap ml-[50%] mt-[-8%] text-white rounded-lg p-2 bg-slate-700 "
        style={{ maxWidth: "300px" }}
      >
        {weatherData && (
          <div className="p-4  w-full text-center mr">
            <p  style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 'bold' }}>Air Pressure: {weatherData.pressure} hPa</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Highlights;
