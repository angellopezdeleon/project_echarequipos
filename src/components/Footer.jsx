import * as React from "react";
import Box from "@mui/material/Box";

const pStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
  marginTop: '10px',
  color: 'white',
};

export default function Footer() {
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: 55,
          backgroundColor: "#0d47a1",
          marginTop: "20px",
          display: "flex",
          justifyContent: 'center',
          alignItems: 'center',
          textColor: 'white'
        }}
      >
        <p style={pStyle}>Desarrollado por Ángel LdeL</p>
      </Box>
    </div>
  );
}
