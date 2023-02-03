import React, { useState, useContext }  from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { formContext } from "../../contexts/FormsContext";

export default function SportSelector() {
  const { addElement } = useContext(formContext);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(["Fútbol", "Baloncesto", "Deporte de raqueta"]);

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
      freeSolo
      options={options}
      includeInputInList
      id="combo-box-demo"
      options={sports}
      onInputChange={handleAccepted}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        handleAccepted(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} label="Deporte" />}
    />
  );
}

const sports = [
  { label: "Fútbol" },
  { label: "Baloncesto" },
  { label: "Deporte de raqueta" },
];
