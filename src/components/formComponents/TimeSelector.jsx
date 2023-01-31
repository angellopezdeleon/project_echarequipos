import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useState, useContext } from "react";
import { formContext } from "../../contexts/FormsContext";

export default function TimeSelector() {
  const [value, setValue] = React.useState(null);
  const [userData, setUserData] = useState({
    time: "",
  });

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const { addElement } = useContext(formContext);

  function handleAccepted(event) {
    setValue(event);
    const time = event.$H + ":" + (event.$m > 9 ? event.$m : "0" + event.$m);
    let newUserData = {
      time: time,
    };
    setUserData(newUserData);
    addElement(newUserData);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <TimePicker
          label="Hora"
          value={value}
          onChange={handleChange}
          onAccept={handleAccepted}
          renderInput={(params) => <TextField {...params} />}
          ampm={false}
        />
      </Stack>
    </LocalizationProvider>
  );
}
