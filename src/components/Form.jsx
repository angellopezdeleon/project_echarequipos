import React from "react";
import { Grid } from "@mui/material";
import SportSelector from "./formComponents/SportSelector";
import GoogleMaps from "./formComponents/MapsAutocomplete";
import DateSelector from "./formComponents/DateSelector";
import TimeSelector from "./formComponents/TimeSelector";
import PlayersSelector from "./formComponents/PlayersSelector";
import TeamsSelector from "./formComponents/TeamsSelector";

export default function Form() {

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <PlayersSelector />
            </Grid>
            <Grid item xs={12}>
                <TeamsSelector />
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
        </Grid>
    )
};
