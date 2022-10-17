import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SportSelector from "./formComponents/SportSelector";
import { TextField } from "@mui/material";
import GoogleMaps from "./formComponents/MapsAutocomplete";
import { Link } from "react-router-dom";
import DateSelector from "./formComponents/DateSelector";
import TimeSelector from "./formComponents/TimeSelector";
import { useState, useContext } from "react";
import { formContext } from "../contexts/FormsContext";
import FormControl from "@mui/material/FormControl";

export default function Form() {
  const [userData, setUserData] = useState({
    players: "",
    teams: 0,
  });

  const { addElement } = useContext(formContext);

  function handleChange(event) {
    const target = event.target;
    const value = event.target.value;
    const inputName = event.target.name;

    let newUserData = { ...userData };
    newUserData[inputName] = value;
    setUserData(newUserData);

    //console.log("newUserData es:  ", newUserData);

    addElement(newUserData);
  }

  //console.log("userData es:  ", userData);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormControl>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              name="players"
              onChange={handleChange}
              fullWidth
              required
              id="outlined-required"
              label="Participantes"
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="teams"
              onChange={handleChange}
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
          </Grid>
          <Grid item xs={6}>
            <TimeSelector>{handleChange}</TimeSelector>
          </Grid>
          <Grid item xs={6}>
            <DateSelector onChange={handleChange}></DateSelector>
          </Grid>
          <Grid item xs={12}>
            <GoogleMaps onChange={handleChange}></GoogleMaps>
          </Grid>
          <Grid item xs={12}>
            <SportSelector onChange={handleChange} fullWidth></SportSelector>
          </Grid>
          <Grid item xs={12}>
            <Link to="/result">
              <Button fullWidth variant="contained">
                Echar Equipos
              </Button>
            </Link>
          </Grid>
        </Grid>
      </FormControl>
    </Box>
  );
}
