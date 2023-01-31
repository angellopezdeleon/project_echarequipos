import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { formContext } from "../../contexts/FormsContext";
// import { Chip } from "@mui/material";

export default function PlayersSelector({ children }) {

    const { addElement } = useContext(formContext);
    const [value, setValue] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const SEPARATOR = '\u0003';

    function sortNames(namesRaw) {
        let nameList = [];
        let names = "";
        const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
    
        namesRaw.split('').forEach(function(c) {
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
        setInputValue(sortedText);
        handleChange();
    }

    function createChips(event, newInputValue) {
        const options = newInputValue.split(SEPARATOR);
        options.pop();

        if (options.length > 1) {
            setValue(
                value.concat(options).map((x) => x.trim()).filter((x) => x)
            );
        } else {
            setInputValue(newInputValue);
        }
        handleChange();
    }

    // function renderOption(option) {
    //     return (
    //         <Chip label={option}/>
    //     );
    // }

    return (
        <Autocomplete
            multiple
            autoSelect
            id="tags-filled"
            options={[]}
            // renderOption={renderOption}
            // noOptionsText={"Pulsar enter para crear un nuevo jugador o pegar una lista de nombres"}
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
    );
}
