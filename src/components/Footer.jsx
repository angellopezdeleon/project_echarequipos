import * as React from "react";
import Box from "@mui/material/Box";

const pStyle = {
  color: 'white',
};

export default function Footer() {
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "50px",
          backgroundColor: "#0d47a1",
          display: "flex",
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p style={pStyle}>Desarrollado por Ángel López de León</p>
      </Box>
    </div>
  );
}
