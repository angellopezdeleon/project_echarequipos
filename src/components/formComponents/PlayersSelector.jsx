import React, { useContext, useState, useEffect } from "react";
import PasteButton from "./PasteButton";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { formContext } from "../../contexts/FormsContext";


export default function PlayersSelector() {
    const { addElement, dataForm } = useContext(formContext);
    const [value, setValue] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [storagedOptions, setStoragedOptions] = useState([]);
    const SEPARATOR = "\u0003";

    // Organiza los nombres de los jugadores
    function sortNames(namesRaw) {
        // const regex = /[^a-zA-ZÀ-ÿ\u00f1\u00d1\s]+/; VERSION permitiendo ESPACIOS pero también saltos de línea
        const regex = /[^a-zA-ZÀ-ÿ\u00f1\u00d1]+/;
        const nameList = namesRaw.split(regex);
        return nameList.join(SEPARATOR) + SEPARATOR;
    }

    // Añade el nombre del jugador a la lista de jugadores
    function handleChange() {
        let newUserData = { players: value };
        addElement(newUserData);
    }

    // Genera los chips a partir de la entrada de texto
    function createChips(event, newInputValue) {
        console.log("createChips: ", newInputValue);
        const chips = newInputValue.split(SEPARATOR);
        chips.pop();

        if (chips.length > 0) {
            setValue( value.concat(chips).map((x) => x.trim()).filter((x) => x) );
        } else {
            setInputValue(newInputValue);
        }
        handleChange();
    }

    // Maneja el evento de pulsar una tecla y el evento de pegar texto
    function handleInput(event) {
        const { key, type } = event;
        const word = inputValue.split(SEPARATOR);
        const lastWord = word[word.length - 1];

        if (key === "Enter" || key === "Tab" || type === "blur") {
            setValue(value.concat(lastWord).filter((x) => x));
            handleChange();
            setInputValue("");
        } else if (type === "click") {
            navigator.clipboard.readText().then((clipboardData) => {
                if (!clipboardData.trim()) {
                    return;
                }
                const sortedText = sortNames(clipboardData);
                setInputValue(sortedText);
                createChips(event, sortedText);
                handleChange();
                setTimeout(() => {
                    setInputValue("");
                }, 1);
            });
        } else if (type === "paste") {
            const text = event.clipboardData.getData("text");
            if (!text.trim()) {
                return;
            }
            const sortedText = sortNames(text);
            setInputValue(sortedText);
            handleChange();
            setTimeout(() => {
                setInputValue("");
            }, 1);
        }
    }

    function handleOnChange(e, newValue, situation, option) {
        if (
            situation === "removeOption" ||
            situation === "selectOption" ||
            situation === "clear"
        ) {
            setInputValue(" ");
            setTimeout(() => {
                setInputValue("");
            }, 1);
        }
        setValue(newValue);
        handleChange();
    }

    // Actualiza el estado de los jugadores cuando se modifica el valor del input
    useEffect(() => {
        handleChange();
    }, [inputValue]);

    // Almacena los jugadores en el localStorage que no estén en el array de jugadores
    useEffect(() => {
        const storedData = localStorage.getItem("shuffledPlayers");
        const shuffledPlayers = storedData ? JSON.parse(storedData) : [];
        const playersChosen = dataForm.players || [];
        const playersForOptions = shuffledPlayers.filter(x => !playersChosen.includes(x));
        setStoragedOptions(playersForOptions);
    }, [inputValue]);

    return (
        <Grid
            container
            spacing={0}
            columns={{ xs: 12, sm: 12, md: 12 }}
            style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            <PasteButton handleInput={handleInput}></PasteButton>
            <Grid item xs={10} sm={11} md={11}>
                <Autocomplete
                    multiple
                    freeSolo
                    id="tags-filled"
                    options={storagedOptions}
                    value={value}
                    inputValue={inputValue}
                    popupIcon={""}
                    noOptionsText="No hay opciones"
                    onPaste={handleInput}
                    onChange={handleOnChange}
                    onBlur={(event) => handleInput(event, inputValue)}
                    onKeyDown={(event) => handleInput(event, inputValue)}
                    onInputChange={createChips}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Participantes"
                            fullWidth
                            onChange={handleChange}
                            required
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
}
