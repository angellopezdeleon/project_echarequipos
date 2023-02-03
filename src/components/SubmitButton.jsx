import React, { useState, useContext, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import { formContext } from "../contexts/FormsContext";
import MainForm from "./MainForm";
import ResultToShare from "./ResultToShare";
import Tooltip from "@mui/material/Tooltip";

export default function SubmitButton() {
    const [inputValue, setInputValue] = useState(true);
    const { dataForm } = useContext(formContext);
    const [isValid, setIsValid] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setInputValue(false);
        console.log("Form submitted: ", inputValue);
    };

    useEffect(() => {
        setIsValid(
            dataForm.teams > 1 &&
                dataForm.players &&
                dataForm.players.length > dataForm.teams &&
                dataForm.players.every(
                    (player, index, self) => self.indexOf(player) === index
                )
        );
    }, [dataForm.players, dataForm.teams]);

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
                                <Tooltip
                                    title="Sin participantes repetidos y al menos 3 participantes"
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
