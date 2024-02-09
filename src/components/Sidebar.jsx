import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import RoomIcon from "@mui/icons-material/Room";
import { styled } from "@mui/system";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import "./style.css";

const CircleButton = styled(Button)`
  width: 50px;
  height: 50px;
  min-width: 50px;
  border-radius: 50%;
  margin-left: 90px;
`;

const imageContainer2Style = {
  position: "absolute",
  zIndex: 2,
  top: "25%",
  left: "45%",
  transform: "translate(-50%, -50%)",
};

const allStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

function Sidebar({ setSelectedCity, setCurrentLocation, updateWeatherData }) {
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStates, setFilteredStates] = useState(allStates);
  const [askedForLocation, setAskedForLocation] = useState(false);
  const [weatherImage, setWeatherImage] = useState(null);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearchClick = async () => {
    if (selectedState !== "Current Location") {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${selectedState}&limit=1&appid=deccf3474efa27ddf6ec3fba5099fa33`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const cityLatitude = data[0].lat;
          const cityLongitude = data[0].lon;
          obtenerPronosticoPorCoordenadas(cityLatitude, cityLongitude);
          setSelectedCity(selectedState);
        }
      } catch (error) {
        console.error("Error al obtener las coordenadas de la ciudad:", error);
      }
    } else {
      if (!askedForLocation) {
        handleGetLocationClick();
        setAskedForLocation(true);
      }
    }
  };

  const obtenerPronosticoPorCoordenadas = (latitude, longitude) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=deccf3474efa27ddf6ec3fba5099fa33`
    )
      .then((response) => response.json())
      .then((data) => {
        const celsius = Math.floor(data.current.temp - 273.15);
        setTemperature(celsius);
        setDescription(data.current.weather[0].description);


        const weatherImg = getWeatherImage(data.current.weather[0].main);
        setWeatherImage(weatherImg);


        updateWeatherData({ temperature: celsius, description });
      })
      .catch((error) => {
        console.error("Error al obtener datos climáticos:", error);
      });
  };

  const handleGetLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          obtenerPronosticoPorCoordenadas(latitude, longitude);
          setSelectedState("My Location");
          setCurrentLocation({ latitude, longitude });

          updateWeatherData({ latitude, longitude });
        },
        (error) => {
          console.error("Error al obtener la ubicación del usuario:", error);
        }
      );
    } else {
      console.error("La geolocalización no es compatible en este navegador.");
    }
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = allStates.filter((state) =>
      state.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStates(filtered);
  };

  const updateCurrentDate = () => {
    setCurrentDate(new Date());
  };

  useEffect(() => {
    const interval = setInterval(updateCurrentDate, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    handleSearchClick();
  }, [selectedState]);

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
    <div className="colored-column" style={{ width: "29%", height: "100%" }}>
      <Stack spacing={20} direction="row" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          className="search-button"
          style={{
            marginLeft: "10px",
            marginTop: "10px",
            fontSize: "10px",
            height: "50px",
            width: "200px",
            padding: "10px",
          }}
          onClick={openMenu}
        >
          Search for places
        </Button>
        <CircleButton
          variant="contained"
          color="primary"
          className="button-margin"
          onClick={handleGetLocationClick}
          style={{ marginTop: "9px", marginRight: "10px" }}
        >
          <MyLocationIcon />
        </CircleButton>
      </Stack>

      <Drawer anchor="left" open={isMenuOpen} onClose={closeMenu}>
        <div>
          <input
            type="text"
            placeholder="Search states"
            onChange={handleSearchInputChange}
            value={searchQuery}
          />
        </div>
        <List>
          {filteredStates.map((state, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                setIsMenuOpen(false);
                setSelectedState(state);
              }}
            >
              {state}
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div style={{ position: "relative" }}>
        <img
          src="Cloud-background.png"
          alt="Mi Imagen"
          style={{
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            opacity: 0.3,
          }}
        />
        {weatherImage && (
          <img
            src={weatherImage}
            alt=""
            className="imageContainer2"
            style={{ ...imageContainer2Style, zIndex: 2 }}
          />
        )}
      </div>

      {temperature !== null && (
        <div className="center-text">
          <p
            className="Grados"
            style={{
              marginTop: "300px",
              marginLeft: "80px",
              color: "white",
              fontFamily: "Raleway, sans-serif",
              fontSize: "50px",
            }}
          >
                {temperature}{" "}
            <span
              style={{
                fontSize: "30px",
                display: "inline-block",
                verticalAlign: "top",
              }}
            >
              °C
            </span>
          </p>
          <Typography
            variant="h4"
            style={{ marginTop: "15px", textAlign: "center", color: "white" }}
          >
            {description}
          </Typography>
          <Typography
            variant="subtitle1"
            style={{ marginTop: "15px", textAlign: "center", color: "white" }}
          >
            {currentDate.toDateString()}
          </Typography>

          <Stack direction="row" alignItems="center" className="centered-text">
            <RoomIcon fontSize="small" style={{ color: "white" }} />
            <Typography variant="subtitle1">
              {selectedState || "Select a location"}
            </Typography>
          </Stack>
        </div>
      )}

      

    </div>
  );
}

export default Sidebar;
