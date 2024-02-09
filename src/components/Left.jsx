import React, { useState, useEffect } from "react";

export default function Left() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [currentWeather, setCurrentWeather] = useState("");
  const [currentDate, setCurrentDate] = useState("");

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
        setCurrentWeather(data.current.weather[0].description);
        setCurrentDate(new Date().toLocaleString());
      } catch (error) {
        console.error("Error al obtener la temperatura:", error);
      }
    };

    fetchData();
intervalId = setInterval(fetchData, 600000); 

    return () => clearInterval(intervalId);
  }, []);

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
                {/* Contenido del Sidebar */}
              </div>
              <div className="w-4/5 bg-slate-900 h-screen ml-64">
                {/* Contenido principal */}
              </div>
            </div>
          </>
        )}
        <div className="relative flex items-center justify-center">
          <img src="Cloud-background.png" alt="" className="opacity-10" />
          <img
            src="LightCloud.png"
            alt=""
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[65%] z-10"
          />
        </div>
        <p className="temperatura font-raleway text-4xl text-center mt-[50%] text-white">
          {Math.round(currentTemperature)}°C
        </p>
        <p className="clima font-raleway text-xl text-center mb-4 text-white">
          {currentWeather}
        </p>
        <p className="fecha font-raleway text-lg text-center mb-2 text-white">
          {currentDate}
        </p>
       <span className="flex items-center justify-center">
         <svg
           xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24"
           strokeWidth={1.5}
           stroke="currentColor"
           className="w-6 h-6"
         >
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
           />
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
           />
         </svg>
         <p className="text-white">London</p>
       </span>
      </div>
    </>
  );
}
