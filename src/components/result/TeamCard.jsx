import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import { margin } from "@mui/system";

const colors = [
    "#000000", // Negro
    "#ffffff", // Blanco
    "#7b9fe2", // Azul claro
    "#e84a33", // Rojo anaranjado
    "#fee65f", // Amarillo claro
    "#9be674", // Verde claro
    "#f078ea", // Rosa
    "#1e9a8a", // Verde azulado
    "#c68c53", // Marrón claro
    "#9370db", // Púrpura medio
    ];

export default function TeamCard(props) {
    const [selectedColor, setSelectedColor] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    let { id, team } = props;

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const secondaryId = open ? "simple-popover" : undefined;

    const selectedColorCircleStyles = {
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: selectedColor || colors[id],
        display: "inline-block",
        border: "2px solid #DFDFDF",
        clipPath: "circle(50%)",
    };

    return (
        <Card key={id} sx={{ margin: 1 }}>
            <CardContent>
                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                        }}
                    >
                        <span>EQUIPO {id + 1}</span>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ fontSize: "12px" }}>Equipación: </span>
                            <IconButton
                                aria-describedby={secondaryId}
                                variant="contained"
                                onClick={handleClick}
                            >
                                <div style={selectedColorCircleStyles} />
                            </IconButton>
                        </div>
                    </div>
                </div>

                {team.map((teamMember) => {
                    return (
                        <Typography key={teamMember} component="div">
                            {teamMember}
                        </Typography>
                    );
                })}
                <Popover
                    id={secondaryId}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <div
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "10px",
                            backgroundColor: "background.default",
                            borderRadius: "10px",
                        }}
                    >
                        {colors.map((color) => {
                            return (
                                <div
                                    key={color}
                                    onClick={() => {
                                        setSelectedColor(color);
                                        handleClose();
                                    }}
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: color,
                                        margin: "5px",
                                        cursor: "pointer",
                                        border: "1px solid #DFDFDF",
                                        clipPath: "circle(50%)",
                                    }}
                                />
                            );
                        })}
                    </div>
                </Popover>
            </CardContent>
        </Card>
    );
}
