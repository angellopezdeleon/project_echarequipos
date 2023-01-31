import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { formContext } from "../contexts/FormsContext";

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

  const { restartForm } = useContext(formContext);
  const handleLogoClick = () => {
    window.location.reload();
    // restartForm();
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
