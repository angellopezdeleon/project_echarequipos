import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useContext } from "react";
import { formContext } from "../../contexts/FormsContext";

export default function SportSelector() {
  const { addElement } = useContext(formContext);

  function handleAccepted(event) {
    let newUserData = {
      sport: event.target.innerText,
    };
    addElement(newUserData);
  }

  return (
    <Autocomplete
      fullWidth
      disablePortal
      id="combo-box-demo"
      options={sports}
      onInputChange={handleAccepted}
      renderInput={(params) => <TextField {...params} label="Deporte" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const sports = [
  { label: "Fútbol" },
  { label: "Baloncesto" },
  { label: "Deporte de raqueta" },
];
