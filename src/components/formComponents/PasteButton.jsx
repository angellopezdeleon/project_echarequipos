import React from "react";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ContentPasteGoOutlinedIcon from "@mui/icons-material/ContentPasteGoOutlined";
import { formContext } from "../../contexts/FormsContext";

export default function PasteButton({ handleInput }) {
    return (
        <Grid item xs={2} sm={1} md={1} sx={{ p: -1 }}>
            <Tooltip title="Pegar Jugadores" placement="top" arrow>
                <IconButton
                    color="inherit"
                    aria-label="paste players"
                    variant="text"
                    onClick={handleInput}
                >
                    <ContentPasteGoOutlinedIcon
                        fontSize="large"
                        color="primary"
                    />
                </IconButton>
            </Tooltip>
        </Grid>
    );
}
