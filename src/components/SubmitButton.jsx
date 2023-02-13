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
    const [repeatedPlayers, setRepeatedPlayers] = useState([]);

    // Función para manejar el evento de submit
    const handleSubmit = (event) => {
        event.preventDefault();
        setInputValue(false);
        console.log("Form submitted: ", inputValue);
    };

    // Función para mostrar los jugadores repetidos
    const handleRepeatedPlayers = repeatedPlayers.reduce((players, player) => {
        if (!players.includes(player)) {
            players.push(player.charAt(0).toUpperCase() + player.slice(1));
        }
        return players;
    }, []);

    const formattedPlayers = handleRepeatedPlayers.reduce(
        (formattedPlayers, player, index) => {
            if (index === handleRepeatedPlayers.length - 1) {
                return formattedPlayers + player + ".";
            }
            return formattedPlayers + player + ", ";
        },
        ""
    );

    // Un useEffect para evaluar si el formulario es válido
    useEffect(() => {
        setIsValid(
            dataForm.teams > 1 &&
                dataForm.players &&
                dataForm.players.length > dataForm.teams &&
                dataForm.players.every(
                    (player, index, self) => self.indexOf(player) === index
                ) &&
                repeatedPlayers.length === 0
        );
    }, [dataForm.players, dataForm.teams, repeatedPlayers]);

    // Un useEffect para evaluar si en el dataForm hay jugadores repetidos
    useEffect(() => {
        if (dataForm.players) {
            const players = dataForm.players.map((player) => player.toLowerCase());
            const duplicatedPlayers = players.filter(
                (player, index) => players.indexOf(player) !== index
            );
            setRepeatedPlayers(duplicatedPlayers);
            console.log("repeatedPlayers: ", repeatedPlayers);
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
                                {repeatedPlayers.length > 0 ? (
                                    <FormHelperText id="component-helper-text" error>
                                        * Hay jugadores repetidos: {formattedPlayers}
                                    </FormHelperText>
                                ) : (
                                    <FormHelperText id="component-helper-text" error>
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
