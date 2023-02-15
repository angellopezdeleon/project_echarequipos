import * as React from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useState, useContext } from "react";
import { formContext } from "../../contexts/FormsContext";

export default function DateSelector() {
    const [value, setValue] = React.useState(null);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const { addElement } = useContext(formContext);

    function monthSelector(month) {
        let monthName = [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre",
        ];
        return monthName[month];
    }

    function weekDaySelector(weekDay) {
        let weekDayName = [
            "lunes",
            "martes",
            "miércoles",
            "jueves",
            "viernes",
            "sábado",
            "domingo",
        ];
        return weekDayName[weekDay];
    }

    function handleAccepted(event) {
        setValue(event);
        const date = `El ${weekDaySelector(event.$W - 1)} ${event.$D} de ${monthSelector(
            event.$M
        )}`;
        let newUserData = {
            day: date,
        };
        addElement(newUserData);
    }

    return (
        <LocalizationProvider adapterLocale="es" dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
                <MobileDatePicker
                    label="Fecha"
                    inputFormat="DD/MM/YYYY"
                    minDate={new Date(dayjs())}
                    maxDate={new Date("2070-06-01")}
                    value={value}
                    onChange={handleChange}
                    onAccept={handleAccepted}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}
