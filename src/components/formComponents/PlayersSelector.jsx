import React, { useContext, useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import ContentPasteGoOutlinedIcon from "@mui/icons-material/ContentPasteGoOutlined";
import { formContext } from "../../contexts/FormsContext";
import Tooltip from "@mui/material/Tooltip";

export default function PlayersSelector() {
    const { addElement } = useContext(formContext);
    const [value, setValue] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const SEPARATOR = "\u0003";
    const [options, setOptions] = useState([]);

    function sortNames(namesRaw) {
        let nameList = [];
        let names = "";
        const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
        namesRaw.split("").forEach(function (c) {
            if (regex.test(c)) {
                names += c;
            } else if (names) {
                nameList.push(names);
                names = "";
            }
        });
        names && nameList.push(names);
        return nameList.join(SEPARATOR) + SEPARATOR;
    }

    function handleChange() {
        let newUserData = {
            players: value,
        };
        addElement(newUserData);
    }

    function handleBlur(event) {
        const options = inputValue.split(SEPARATOR);
        const lastOption = options[options.length - 1];
        setValue(value.concat(lastOption).filter((x) => x));
        setInputValue("");
        console.log("onBLUR");
        handleChange();
    }

    function handleKeyDown(event, inputValue) {
        if (event.key === "Enter") {
            const options = inputValue.split(SEPARATOR);
            const lastOption = options[options.length - 1];
            setValue(value.concat(lastOption).filter((x) => x));
            setInputValue("");
            console.log("ENTER");
            handleChange();
        } else if (event.key === "Tab") {
            const options = inputValue.split(SEPARATOR);
            const lastOption = options[options.length - 1];
            setValue(value.concat(lastOption).filter((x) => x));
            setInputValue("");
            console.log("TAB");
            handleChange();
        }
    }

    function handlePaste(event) {
        if (!event.clipboardData.getData("text").trim()) {
            return;
        }
        const text = event.clipboardData.getData("text");
        const sortedText = sortNames(text);
        console.log("sortedText1: ", sortedText);
        setInputValue(sortedText);
        console.log("inputValue1: ", inputValue);
        handleChange();
    }

    const handlePasteFromButton = async (event) => {
        const clipboardData = await navigator.clipboard.readText();
        if (!clipboardData.trim()) {
            return;
        }
        const sortedText = sortNames(clipboardData);
        console.log("sortedText2: ", sortedText);
        setInputValue(sortedText);
        console.log("inputValue2: ", inputValue);
        createChips(event, sortedText);
        handleChange();
    };

    function createChips(event, newInputValue) {
        console.log("createChips: ", newInputValue);
        const chips = newInputValue.split(SEPARATOR);
        chips.pop();

        if (chips.length > 0) {
            setValue(
                value
                    .concat(chips)
                    .map((x) => x.trim())
                    .filter((x) => x)
            );
        } else {
            setInputValue(newInputValue);
        }
        handleChange();
        // setInputValue("");
    }

    const handleUpdate = () => {
        setInputValue(" ");
        setTimeout(() => {
            setInputValue("");
        }, 200);
    };

    useEffect(() => {
        handleChange();
        console.log("------->>>> USEEFFECT <<<<-------");
    }, [inputValue]);

    useEffect(() => {
        const storedData = localStorage.getItem("shuffledPlayers");
        const shuffledPlayers = storedData ? JSON.parse(storedData) : [];
        setOptions(shuffledPlayers);
        console.log("------->>>> USEEFFECT localStorage <<<<-------");
    }, []);

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
            <Grid item xs={2} sm={1} md={1} sx={{ p: -1 }}>
                <Tooltip title="Pegar Jugadores" placement="top" arrow>
                    <IconButton
                        color="inherit"
                        aria-label="paste players"
                        variant="text"
                        onClick={handlePasteFromButton}
                    >
                        <ContentPasteGoOutlinedIcon
                            fontSize="large"
                            color="primary"
                        />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs={10} sm={11} md={11}>
                <Autocomplete
                    multiple
                    autoSelect
                    freeSolo
                    id="tags-filled"
                    options={options}
                    value={value}
                    inputValue={inputValue}
                    popupIcon={""}
                    noOptionsText="No hay opciones"
                    onPaste={handlePaste}
                    onChange={(e, newValue, situation, option) => {
                        if (
                            situation === "removeOption" ||
                            situation === "selectOption" ||
                            situation === "clear"
                        ) {
                            handleUpdate();
                        }
                        setValue(newValue);
                        handleChange();
                    }}
                    onBlur={() => handleBlur(inputValue)}
                    onKeyDown={(event) => handleKeyDown(event, inputValue)}
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
