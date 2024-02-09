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

  const getWeatherImage = (weather) => {
    switch (weather) {
      case "Clear":
        return "Clear.png";
      case "Hail":
        return "Hail.png";
      case "Clouds":
        return "HeavyCloud.png";
      case "Rain":
        return "HeavyRain.png";
      case "LightCloud":
        return "LightCloud.png";
      case "LightRain":
        return "LightRain.png";
      case "Shower":
        return "Shower.png";
      case "Sleet":
        return "Sleet.png";
      case "Snow":
        return "Snow.png";
      case "Thunderstorm":
        return "Thunderstorm.png";
      default:
        return "default.png";
    }
  };

  return (
    <div className="flex flex-wrap ml-[20%]">
      {forecastData.map((forecast, index) => {
        const weatherImage = getWeatherImage(forecast.weather[0].main);

        return (
          <div
            key={index}
            className="w-1/5 p-1 mt-4 flex items-center justify-center ml-[-5%]"
          >
            <div className="text-white rounded-lg p-2 bg-slate-700 max-w-md mx-auto">
              <p className="text-lg font-semibold text-center">
                {Math.round(forecast.temp.day)}°C
              </p>
              <img
                className="w-24 h-24 object-cover rounded-t-lg mx-auto mb-2"
                src={weatherImage}
                alt="Weather"
              />
              <p className="text-sm text-center">
                {Math.round(forecast.temp.min)}°C -{" "}
                {Math.round(forecast.temp.max)}°C
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
