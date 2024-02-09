import { useState, useEffect } from "react";
import LocationPermissionButton from "./LocationPermissionButton";

const useGeolocation = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const requestLocationPermission = () => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' })
        .then(permissionStatus => {
          if (permissionStatus.state === 'granted') {
            // La ubicación ya está permitida
            setPosition(null); // Esto obligará a recargar la ubicación actual
          } else {
            // Solicitar permiso de ubicación
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                setPosition({
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude
                });
              },
              (err) => {
                setError(err.message);
              }
            );
          }
        });
    } else {
      // Fallback para navegadores más antiguos
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    }
  };

  return { position, error, requestLocationPermission };

  // Aquí devolvemos el botón junto con la posición y el error
  return (
    <>
      <LocationPermissionButton onClick={requestLocationPermission} />
    </>
  );
};

export default useGeolocation;
