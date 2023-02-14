import React, { useEffect, useState, useContext } from "react";
import { formContext } from "../contexts/FormsContext";
import PlayersDuel from "./result/PlayersDuel";
import getQuoteBySport from "../services/quotesAPI";
import "./result/resultToShare.css";

function ResultToShare() {
    const { dataForm } = useContext(formContext);
    const [data, setData] = useState({});
    const sports = ["Fútbol", "Baloncesto", "Deporte de raqueta"];

    // Función para repetir la palabra
    const repeatWord = (word, count) => {
        return new Array(count + 1).join(word + "-");
    };

    // Crear la cadena de texto
    const text = repeatWord(dataForm.sport.toUpperCase(), 300)
        .split("-")
        .filter((word) => word.length > 0)
        .map((word, index) => {
           return word
        })
        .join("-");

    useEffect(() => {
        if (sports.includes(dataForm.sport)) {
            getQuoteBySport(dataForm.sport)
                .then((respuestaDatos) => {
                    setData(
                        respuestaDatos[Math.floor(Math.random() * respuestaDatos.length)]
                    );
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        console.log("text: ", text);
    }, []);

    return (
        <div className="containResults">
            {/* Contenido */}
            {dataForm.day ? (
                <h1 style={{ zIndex: 1 }}>PARTIDO DE {dataForm.sport.toUpperCase()}</h1>
            ) : null}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    zIndex: 1,
                }}
            >
                {dataForm.day ? <p style={{ zIndex: 1 }}> {dataForm.day}</p> : null}
                {dataForm.time ? (
                    <p style={{ zIndex: 1 }}>, a las {dataForm.time}</p>
                ) : null}
            </div>
            <div className="cards">
                <PlayersDuel props={dataForm} />
            </div>
            {dataForm.address ? <p style={{ zIndex: 1 }}>En {dataForm.address}</p> : null}
            {dataForm.sport ? <q style={{ fontStyle: "italic", zIndex: 1 }}>{data.phrase}</q> : null}

            {/* Fondo */}
            <div className="backgroundText">{text}</div>
        </div>
    );
}

export default ResultToShare;
