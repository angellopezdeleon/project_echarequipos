import React, { useState, useContext } from "react";
import { Grid, Button } from "@mui/material";
import { formContext } from "../contexts/FormsContext";
import MainForm from "./MainForm";
import ResultToShare from "./ResultToShare";

export default function SubmitButton() {
    const [inputValue, setInputValue] = useState(true);
    const { dataForm } = useContext(formContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        setInputValue(false);
        console.log("Form submitted: ", inputValue);
    };

    return (
        <>
            {inputValue ? (
                <div>
                    <MainForm />
                    <Grid sx={{ my: 2 }}>
                        {(dataForm.teams > 1 && dataForm.players.length > dataForm.teams) ? (
                            <Grid item xs={12}>
                                <Button fullWidth variant="contained" onClick={handleSubmit}>
                                    Echar Equipos
                                </Button>
                            </Grid>
                        ) : (
                            <Grid item xs={12}>
                                <Button disabled fullWidth variant="contained">
                                    FALTAN DATOS REQUERIDOS
                                </Button>
                            </Grid>)}
                    </Grid>
                </div>
            ) : (
                <ResultToShare />
            )}
        </>
    )};

