import React from "react";

const h2Style = {
  margin: "40px auto auto auto",
  width: "75px",
  maxWidth: "100%",
  color: "white",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
};

const headerStyle = {
  backgroundColor: "#0d47a1",
  height: "150px",
};

const spanStyle = {
  fontSize: "12px",
};

const h2 = {
  fontSize: "28px",
  margin: "-5px",
  lineHeight: "1.1",
  fontWeight: "bold",
};

export default function Header() {

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <div style={headerStyle}>
        <div style={h2Style} onClick={handleLogoClick}>
          <p style={h2}>Echar Equipos <span style={spanStyle}>⚽</span> com</p>
        </div>
    </div>
  );
}
