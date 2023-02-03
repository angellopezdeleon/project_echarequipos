import React, { useState, useContext }  from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { formContext } from "../../contexts/FormsContext";

export default function SportSelector() {
  const { addElement } = useContext(formContext);
  const [inputValue, setInputValue] = useState("");

  function handleAccepted(event) {
    let newUserData = {
      sport: event.target.value,
    };
    console.log("event.target.innerText: ", event.target.innerText);
    console.log("event: ", event);
    addElement(newUserData);
  }

  return (
    <Autocomplete
      fullWidth
      disablePortal
      freeSolo
      includeInputInList
      value={inputValue}
      onChange={(event, newValue) => {
        setInputValue(newValue);
      }}
      id="combo-box-demo"
      options={sports}
      onInputChange={handleAccepted}
      renderInput={(params) => <TextField {...params} label="Deporte" fullWidth />}
    />
  );
}

const sports = [
  { label: "Fútbol" },
  { label: "Baloncesto" },
  { label: "Deporte de raqueta" },
];
