import React, { useState, useEffect } from "react";

export default function Cards() {
  const [forecastData, setForecastData] = useState([]);

  const fetchForecastData = async () => {
    try {
      const lat = 51.5074;
      const lon = -0.1278;
      const apiKey = "1fab01c07468ce8a7d396af998fe84c5";
      const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      const nextSixDaysForecast = data.daily.slice(1, 6);

      setForecastData(nextSixDaysForecast);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  useEffect(() => {
    fetchForecastData();
  }, []);

  return ( 
    <div className="flex flex-wrap ml-[20%] ">
      {forecastData.map((forecast, index) => (
        <div key={index} className="w-1/6 p-2 ">
          <div className="border rounded-lg p-2">
          
            <p className="text-lg font-semibold ">{forecast.temp.day}°C</p>
            <img
              className="w-full h-32 object-cover rounded-t-lg"
              src="LightCloud.png"
              alt="Weather"
            />
            <p className="text-sm ">{new Date(forecast.dt * 600000).toDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}