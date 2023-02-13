import React, { useState, useContext, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import { formContext } from "../contexts/FormsContext";
import MainForm from "./MainForm";
import ResultToShare from "./ResultToShare";
import Tooltip from "@mui/material/Tooltip";
import FormHelperText from "@mui/material/FormHelperText";

export default function SubmitButton() {
    const [inputValue, setInputValue] = useState(true);
    const { dataForm } = useContext(formContext);
    const [isValid, setIsValid] = useState(false);
    const [repeatedPlayers, setRepeatedPlayers] = useState(false);

    // Función para manejar el evento de submit
    const handleSubmit = (event) => {
        event.preventDefault();
        setInputValue(false);
        console.log("Form submitted: ", inputValue);
    };

    // Un useEffect para evaluar si el formulario es válido
    useEffect(() => {
        setIsValid(
            dataForm.teams > 1 &&
                dataForm.players &&
                dataForm.players.length > dataForm.teams &&
                dataForm.players.every(
                    (player, index, self) => self.indexOf(player) === index
                ) &&
                !repeatedPlayers
        );
    }, [dataForm.players, dataForm.teams]);

    // Un useEffect para evaluar si en el dataForm hay jugadores repetidos
    useEffect(() => {
        if (dataForm.players) {
            const players = dataForm.players.map((player) =>
                player.toLowerCase()
            );
            const duplicatedPlayers = players.filter(
                (player, index) => players.indexOf(player) !== index
            );
            if (duplicatedPlayers.length > 0) {
                setRepeatedPlayers(true);
            } else {
                setRepeatedPlayers(false);
            }
        }
    }, [dataForm]);

    return (
        <>
            {inputValue ? (
                <div>
                    <MainForm />
                    <Grid sx={{ mt: 3 }}>
                        {isValid ? (
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
                                <Button
                                    disabled
                                    size="large"
                                    fullWidth
                                    variant="contained"
                                >
                                    FALTAN DATOS REQUERIDOS
                                </Button>
                                {repeatedPlayers ? (
                                    <FormHelperText
                                        id="component-helper-text"
                                        error
                                    >
                                        * Hay jugadores repetidos
                                    </FormHelperText>
                                ) : (
                                    <FormHelperText
                                        id="component-helper-text"
                                        error
                                    >
                                        * Faltan jugadores o equipos
                                    </FormHelperText>
                                )}
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
