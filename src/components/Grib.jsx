import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import './style.css';

function Grib({ selectedCity, updateWeatherData }) {
    const [locationPermission, setLocationPermission] = useState(false);
    const [weatherData, setWeatherData] = useState([]);
    const [weatherDataLocation, setWeatherDataLocation] = useState([]);

    const formatDate = (timestamp, index) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + index);
        const options = { weekday: 'long' };
        return new Intl.DateTimeFormat('en-US', options).format(currentDate);
    };

    const getWeatherDataByLocation = (latitude, longitude) => {
        const apiKey = 'deccf3474efa27ddf6ec3fba5099fa33';

        axios
            .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=5&appid=${apiKey}`)
            .then(response => {
                const data = response.data;
                if (data && data.list && data.list.length >= 5) {
                    const dailyForecastData = data.list.slice(0, 5);
                    setWeatherDataLocation(dailyForecastData);
                    updateWeatherData(dailyForecastData);
                } else {
                    console.error('No se encontraron datos de pronóstico para la ubicación actual.');
                }
            })
            .catch(error => {
                console.error('Error al obtener datos de pronóstico por ubicación:', error);
            });
    };

    useEffect(() => {
        const loadWeatherData = () => {
            const savedData = localStorage.getItem('weatherData');
            if (savedData) {
                setWeatherData(JSON.parse(savedData));
            }
        };

        if (selectedCity) {
            const apiKey = 'deccf3474efa27ddf6ec3fba5099fa33';

            axios
                .get(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&cnt=5&appid=${apiKey}`)
                .then(response => {
                    const data = response.data;
                    if (data && data.list && data.list.length >= 5) {
                        const dailyForecastData = data.list.slice(0, 5);
                        setWeatherData(dailyForecastData);
                        localStorage.setItem('weatherData', JSON.stringify(dailyForecastData));
                    } else {
                        console.error('No se encontraron datos para la ciudad especificada o no hay suficientes datos de pronóstico');
                    }
                })
                .catch(error => {
                    console.error('Error al obtener datos del pronóstico:', error);
                });
        } else {
            loadWeatherData();
        }
    }, [selectedCity]);

    useEffect(() => {
        if (locationPermission) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        getWeatherDataByLocation(latitude, longitude);
                    },
                    error => {
                        console.error('Error al obtener la ubicación del usuario:', error);
                    }
                );
            } else {
                console.error('La geolocalización no es compatible en este navegador.');
            }
        }
    }, [locationPermission, updateWeatherData]);

    const selectedWeatherData = locationPermission ? weatherDataLocation : weatherData;

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
        <Grid container spacing={2} className="weather-grid">
            {selectedWeatherData.map((day, index) => (
                <Grid item xs={12} sm={6} md={2} key={index}>
                    <Card className="weather-card" style={{ backgroundColor: '#344353', color: 'white', height: '100%', display: 'flex', flexDirection: 'column' }}> 
                        <CardHeader title={formatDate(day.dt, index)} className="small-title" />
                        <CardContent>
                            <img src={getWeatherImage(day.weather[0].main)} alt={day.weather[0].main} className="weather-icon" />
                            <p className="temp">{Math.round(day.main.temp - 273.15)}°C</p>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default Grib;
