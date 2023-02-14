import React from "react";

const h2Style = {
  margin: "40px auto auto auto",
  width: "75px",
  maxWidth: "100%",
  color: "white",
  cursor: "pointer",
  fontSize: "20px",
  display: "flex",
  flexDirection: "column",
};

const headerStyle = {
  backgroundColor: "#0d47a1",
  height: "150px",
};

const spanStyle = {
  fontSize: "17px",
  padding: "0 0 15px 0",
  alginItems: "center",
};

const h2 = {
  fontSize: "24px",
  padding: "0 0 15px 0",
  margin: "-5px",
};

export default function Header() {

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <div style={headerStyle}>
        <div style={h2Style} onClick={handleLogoClick}>
          <h2 style={h2}>Echar</h2>
          <h2 style={h2}>Equipos</h2>
          <h2 style={h2}><span style={spanStyle}>⚽</span> com</h2>
        </div>
    </div>
  );
}
