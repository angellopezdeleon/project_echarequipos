import React, { useState, useContext } from "react";
import { Grid, Button } from "@mui/material";
import { formContext } from "../contexts/FormsContext";
import MainForm from "./MainForm";
import ResultToShare from "./ResultToShare";
import Tooltip from "@mui/material/Tooltip";

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
                    <Grid sx={{ mt: 3 }}>
                        {dataForm.teams > 1 &&
                        dataForm.players &&
                        dataForm.players.length > dataForm.teams ? (
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    Echar Equipos
                                </Button>
                            </Grid>
                        ) : (
                            <Grid item xs={12}>
                                <Tooltip
                                    title="Es necesario elegir como mínimo 2 equipos y 3 jugadores"
                                    placement="top"
                                    arrow
                                >
                                    <span>
                                        <Button
                                            disabled
                                            size="large"
                                            fullWidth
                                            variant="contained"
                                        >
                                            FALTAN DATOS REQUERIDOS
                                        </Button>
                                    </span>
                                </Tooltip>
                            </Grid>
                        )}
                    </Grid>
                </div>
            ) : (
                <ResultToShare />
            )}
        </>
    );
}
