// App.js

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Grib from './components/Grib';
import Grib2 from './components/Grib2';

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  const updateWeatherData = (newData) => {
    setWeatherData(newData);
  };

  const handleSelectedStateChange = (newSelectedState) => {
    setSelectedCity(newSelectedState);
    // Actualizar los datos del clima en Grib y Grib2 cuando se selecciona una ciudad
    updateWeatherData(newData);
  };

  return (
    <div className="app-container">
      <Sidebar
        setSelectedCity={setSelectedCity}
        setCurrentLocation={setCurrentLocation}
        updateWeatherData={handleSelectedStateChange} // Cambiado para pasar la función handleSelectedStateChange
      />
      <div className="grib">
        <Grib selectedCity={selectedCity} updateWeatherData={updateWeatherData} />
        <Grib2 selectedState={selectedCity} updateWeatherData={updateWeatherData} />
      </div>
    </div>
  );
}

export default App;
