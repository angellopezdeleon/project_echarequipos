import * as React from "react";
import Box from "@mui/material/Box";

const pStyle = {
    color: "white",
};

export default function Footer() {
    return (
        <div>
            <Box
                sx={{
                    width: "100%",
                    height: "50px",
                    backgroundColor: "#0d47a1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <p style={pStyle}>
                    Desarrollado por{" "}
                    <a
                        style={pStyle}
                        target="_blank"
                        href="https://www.linkedin.com/in/angel-lopez-de-leon-jaramillo/"
                    >
                        Ángel López de León
                    </a>
                </p>
            </Box>
        </div>
    );
}
