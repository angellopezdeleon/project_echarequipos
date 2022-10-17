import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useState, useContext } from "react";
import { formContext } from "../../contexts/FormsContext";

export default function DateSelector() {
  const [value, setValue] = React.useState(null);
  const [userData, setUserData] = useState({
    date: "",
    completeDate: "",
  });

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
      "diciembre"
    ];
    return monthName[month];
  }

  function handleAccepted(event) {
    setValue(event);
    const date = "El " + event.$D + " de " + monthSelector(event.$M) + " de " + event.$y;
    const completeDate = event.$d;
    let newUserData = {
      day: date,
      completeDate: completeDate,
    };
    setUserData(newUserData);
    addElement(newUserData);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <MobileDatePicker
          label="Fecha de partido"
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
