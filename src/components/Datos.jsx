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
  const [locationData, setLocationData] = useState(null);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(null);

  useEffect(() => {
    if (locationPermissionGranted && locationData) { // Verificar permiso y datos de ubicación
      fetchWeatherData(locationData.latitude, locationData.longitude);
    } else {
      // Si no se otorga el permiso, cargar los datos climáticos de Londres
      fetchWeatherData(51.5074, -0.1278); // Coordenadas de Londres
    }
  }, [locationPermissionGranted, locationData]);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const fetchWeatherData = async (lat, lon) => {
    try {
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

  const requestLocationPermission = () => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' })
        .then(permissionStatus => {
          if (permissionStatus.state === 'granted') {
            setLocationPermissionGranted(true);
            getCurrentLocation();
          } else {
            permissionStatus.onchange = () => {
              if (permissionStatus.state === 'granted') {
                setLocationPermissionGranted(true);
                getCurrentLocation();
              }
            };
          }
        });
    } else {
      // Fallback para navegadores más antiguos
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocationData({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

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
