import React, { useState, useEffect } from "react";

const Highlights = () => {
  const [weatherData, setWeatherData] = useState(null);

  const lat = 51.5074;
  const lon = -0.1278;
  const apiKey = "1fab01c07468ce8a7d396af998fe84c5";
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=imperial`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.daily[0]);
        const windSpeed = data.daily[0].wind_speed;
        const windDirection = data.daily[0].wind_deg;
        const humidity = data.daily[0].humidity;
        const visibilityMiles = data.current.visibility / 1609.34; // Convert meters to miles
        const pressure = data.daily[0].pressure;
        setWeatherData({
          windSpeed,
          windDirection,
          humidity,
          visibility: visibilityMiles,
          pressure,
        });
      })

      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [apiUrl]);

  const getWindDirectionText = (angle) => {
    // Function to get wind direction text based on wind angle
    if (angle >= 337.5 || angle < 22.5) {
      return "N (North)";
    } else if (angle >= 22.5 && angle < 67.5) {
      return "NE (Northeast)";
    } else if (angle >= 67.5 && angle < 112.5) {
      return "E (East)";
    } else if (angle >= 112.5 && angle < 157.5) {
      return "SE (Southeast)";
    } else if (angle >= 157.5 && angle < 202.5) {
      return "S (South)";
    } else if (angle >= 202.5 && angle < 247.5) {
      return "SW (Southwest)";
    } else if (angle >= 247.5 && angle < 292.5) {
      return "W (West)";
    } else {
      return "NW (Northwest)";
    }
  };

  function formatVisibility(x) {
    // Function to format and round visibility
    const visibilityInMeters = x * 1609.34; // Convert miles to meters
    const roundedVisibility = Math.round(visibilityInMeters);
    return roundedVisibility;
  }
  

  return (
    <>
      {weatherData && (
        <>
          {/* Wind Status */}
          <div className="flex flex-wrap ml-[20%] mt-[4%] text-white rounded-lg p-2 bg-slate-700 " style={{ maxWidth: "300px", fontFamily: "Raleway, sans-serif" }}>
            <div className="p-4 w-full text-center mr">
              <h1 style={{ fontFamily: "Raleway, sans-serif" }}>Wind Status: <p className="mt-[2%]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: "bold", fontSize: "40px" }}>{Math.round(weatherData.windSpeed)} m/s</p></h1>
              <h2 style={{ fontFamily: "Raleway, sans-serif" }}> <p>{getWindDirectionText(weatherData.windDirection)}</p></h2>
            </div>
          </div>

          {/* Humidity */}
          <div className="flex flex-wrap ml-[50%] mt-[-13%] text-white rounded-lg p-2 bg-slate-700 " style={{ maxWidth: "300px", fontFamily: "Raleway, sans-serif" }}>
            <div className="p-4 w-full text-center mr">
              <h1 style={{ fontFamily: "Raleway, sans-serif" }}>Humidity: <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: "bold", fontSize: "40px" }}>{weatherData.humidity}%</p></h1>
              <progress value={weatherData.humidity} max="100"></progress>
            </div>
          </div>

          {/* Visibility */}
          <div className="flex flex-wrap ml-[20%] mt-[4%] text-white rounded-lg p-2 bg-slate-700 " style={{ maxWidth: "300px" }}>
            <div className="p-4 w-full text-center mr">
            <h1 style={{ fontFamily: "Raleway, sans-serif", fontWeight: "bold" }}>Visibility: <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: "bold", fontSize: "40px" }}>{formatVisibility(weatherData.visibility)} M</p></h1>
            </div>
          </div>

          {/* Air Pressure */}
          <div className="flex flex-wrap ml-[50%] mt-[-10.5%] text-white rounded-lg p-2 bg-slate-700 " style={{ maxWidth: "300px" }}>
            <div className="p-4 w-full text-center mr">
              <h1 style={{ fontFamily: "Raleway, sans-serif" }}>Air Pressure: <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: "bold", fontSize: "40px" }}>{weatherData.pressure} hPa</p></h1>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Highlights;
