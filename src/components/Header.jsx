import React from "react";

const h2Style = {
  margin: "70px auto 20px auto",
  width: "100px",
  maxWidth: "100%",
  color: "white",
  cursor: "pointer",
  
};

const divStyle = {
  backgroundColor: "#0d47a1",
  height: "150px",
};

export default function Header() {

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <div style={divStyle}>
        <h2 style={h2Style} onClick={handleLogoClick}>
          Echar <br />
          Equipos
        </h2>
    </div>
  );
}
