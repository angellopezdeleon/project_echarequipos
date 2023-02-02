import * as React from "react";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { formContext } from "../../contexts/FormsContext";

export default function TeamsSelector() {
  const { addElement } = useContext(formContext);

  function handleChange(event) {
    let newUserData = {
      teams: event.target.value,
    };
    addElement(newUserData);
  }

  return (
    <TextField
      name="teams"
      onChange={handleChange}
      fullWidth
      required
      defaultValue="2"
      id="outlined-required"
      label="Nº equipos"
      type="number"
      InputProps={{ inputProps: { min: 0 } }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
