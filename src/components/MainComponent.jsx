import React from 'react';
import Grid from '@mui/material/Grid';
import Grib from './Grib'; // Importa el componente Grib
import Sidebar from './Sidebar'; // Importa el componente Sidebar

function MainComponent() {
  return (
    <div> {/* Elimina el paddingTop */}
      <Grid container spacing={1}>
        <Grid item xs={6} sm={4} md={3}> {/* Especifica el diseño para los tamaños de pantalla (2 componentes por fila) */}
          <Grib />
        </Grid>
        <Grid item xs={6} sm={4} md={3}> {/* Especifica el diseño para los tamaños de pantalla (2 componentes por fila) */}
          <Sidebar />
        </Grid>
        <Grid item xs={6} sm={4} md={3}> {/* Especifica el diseño para los tamaños de pantalla (2 componentes por fila) */}
          {/* Agrega otro componente aquí */}
        </Grid>
        <Grid item xs={6} sm={4} md={3}> {/* Especifica el diseño para los tamaños de pantalla (2 componentes por fila) */}
          {/* Agrega otro componente aquí */}
        </Grid>
        {/* Repite el patrón para agregar más filas */}
      </Grid>
    </div>
  );
}

export default MainComponent;