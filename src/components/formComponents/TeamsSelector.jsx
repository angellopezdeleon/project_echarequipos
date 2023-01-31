import * as React from "react";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { formContext } from "../../contexts/FormsContext";

export default function TeamsSelector({children}) {
  const { addElement } = useContext(formContext);

  function handleChange(event) {
    let newUserData = {
      teams: event.target.value,
    };
    addElement(newUserData);
    children();
  }

  return (
    <TextField
      name="teams"
      onChange={handleChange}
      // onChange={children}
      fullWidth
      required
      id="outlined-required"
      label="Numero de equipos"
      type="number"
      InputProps={{ inputProps: { min: 0 } }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
