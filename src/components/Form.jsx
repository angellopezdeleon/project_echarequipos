import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SportSelector from "./formComponents/SportSelector";
import GoogleMaps from "./formComponents/MapsAutocomplete";
import { Link } from "react-router-dom";
import DateSelector from "./formComponents/DateSelector";
import TimeSelector from "./formComponents/TimeSelector";
import { useContext, useState } from "react";
import { formContext } from "../contexts/FormsContext";
import FormControl from "@mui/material/FormControl";
import PlayersSelector from "./formComponents/PlayersSelector";
import TeamsSelector from "./formComponents/TeamsSelector";

export default function Form() {

  const { form } = useContext(formContext);
  const [required, setRequired] = useState({});

  function checkRequired() {
    const newRequired = {...form};
    setRequired(newRequired);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormControl>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <PlayersSelector>{checkRequired}</PlayersSelector>
          </Grid>
          <Grid item xs={12}>
            <TeamsSelector>{checkRequired}</TeamsSelector>
          </Grid>
          <Grid item xs={6}>
            <TimeSelector />
          </Grid>
          <Grid item xs={6}>
            <DateSelector />
          </Grid>
          <Grid item xs={12}>
            <GoogleMaps />
          </Grid>
          <Grid item xs={12}>
            <SportSelector />
          </Grid>
          {(required.players && required.teams !== undefined) ? (
            <Grid item xs={12}>
              <Link to="/result">
                <Button fullWidth variant="contained">
                  Echar Equipos
                </Button>
              </Link>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Link to="/">
                <Button disabled fullWidth variant="contained">
                  FALTAN DATOS REQUERIDOS
                </Button>
              </Link>
            </Grid>
          )}
        </Grid>
      </FormControl>
    </Box>
  );
}
