import React, { useState, useEffect } from "react";

export default function Left() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTemperature, setCurrentTemperature] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const lat = 51.5074; 
      const lon = -0.1278; 
      const apiKey = "1fab01c07468ce8a7d396af998fe84c5";
      const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=${apiKey}&units=metric`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setCurrentTemperature(data.current.temp);
        })
        .catch((error) => {
          console.error("Error al obtener la temperatura:", error);
        });
    }
  }, [isOpen]);

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
          <img
            src="Cloud-background.png"
            alt=""
            className="opacity-10"
          />
          <img
            src="LightCloud.png"
            alt=""
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <p className="temperatura font-raleway text-4xl text-center mt-[50%]">
          {currentTemperature}°C
        </p>
      </div>
    </>
  );
}
