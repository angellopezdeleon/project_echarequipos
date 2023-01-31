import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import ContentPasteTwoToneIcon from "@mui/icons-material/ContentPasteTwoTone";
import { useContext, useState } from "react";
import { formContext } from "../../contexts/FormsContext";

export default function PlayersSelector({ children }) {
    const { addElement } = useContext(formContext);
    const [value, setValue] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const SEPARATOR = "\u0003";

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
        children();
    }

    function handleBlur(event) {
        const options = inputValue.split(SEPARATOR);
        const lastOption = options[options.length - 1];
        setValue(value.concat(lastOption).filter((x) => x));
        setInputValue("");
        handleChange();
    }

    function handleKeyDown(event, inputValue) {
        if (event.key === "Enter") {
            const options = inputValue.split(SEPARATOR);
            const lastOption = options[options.length - 1];
            setValue(value.concat(lastOption).filter((x) => x));
            setInputValue("");
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
        const options = newInputValue.split(SEPARATOR);
        options.pop();

        if (options.length > 0) {
            setValue(
                value
                    .concat(options)
                    .map((x) => x.trim())
                    .filter((x) => x)
            );
        } else {
            setInputValue(newInputValue);
        }
        handleChange();
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
                <Grid item xs={11}>
                    <Autocomplete
                        multiple
                        autoSelect
                        id="tags-filled"
                        options={[]}
                        value={value}
                        inputValue={inputValue}
                        popupIcon={""}
                        onPaste={handlePaste}
                        onChange={(event, newValue) => {
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
                                required
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={1}>
                    <IconButton
                        color="inherit"
                        aria-label="paste players"
                        size="large"
                        variant="text"
                        onClick={handlePasteFromButton}
                    >
                        <ContentPasteTwoToneIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
}
