import React, { useContext } from "react";
import { Link } from "react-router-dom";

const h1Style = {
  margin: "50px",
  padding: "20px",
  display: "flex",
  justifyContent: "center",
  color: "white",
};

const divStyle = {
  backgroundColor: "#0d47a1",
};

export default function Header() {

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <div style={divStyle} onClick={handleLogoClick}>
      <Link to="/">
        <h2 style={h1Style}>
          Echar <br />
          Equipos
        </h2>
      </Link>
    </div>
  );
}
