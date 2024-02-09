import React, { useState, useEffect } from "react";
import Datos from "./Datos";

export default function Left() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [weatherImage, setWeatherImage] = useState("");

  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      try {
        const lat = 51.5074;
        const lon = -0.1278;
        const apiKey = "1fab01c07468ce8a7d396af998fe84c5";
        const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=${apiKey}&units=metric`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        setCurrentTemperature(data.current.temp);
        const weatherImg = getWeatherImage(data.current.weather[0].main);
        setWeatherImage(weatherImg);
      } catch (error) {
        console.error("Error fetching temperature:", error);
      }
    };

    fetchData();
    intervalId = setInterval(fetchData, 600000);

    return () => clearInterval(intervalId);
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
    <>
      <div className="w-[25%] bg-slate-800 h-screen relative">
        <button
          className="px-2 py-1 bg-slate-700 text-white rounded-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          Search for places
        </button>

        {isOpen && (
          <>
            <div className="flex">
              <div className="w-64 bg-gray-800 h-screen">
                {/* Sidebar Content */}
              </div>
              <div className="w-4/5 bg-slate-900 h-screen ml-64">
                {/* Main Content */}
              </div>
            </div>
          </>
        )}
        <div className="relative flex items-center justify-center">
          <img src="Cloud-background.png" alt="" className="opacity-10" />
          <img
            src={weatherImage}
            alt=""
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[65%] z-10"
          />
        </div>

        <Datos/>
      </div>
    </>
  );
}
