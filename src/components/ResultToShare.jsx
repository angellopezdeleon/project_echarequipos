import React, { useEffect, useState, useContext } from "react";
import { formContext } from "../contexts/FormsContext";
import PlayersDuel from "./result/PlayersDuel";
import getQuoteBySport from "../services/quotesAPI";
import "./result/resultToShare.css";

function ResultToShare() {
    const { dataForm } = useContext(formContext);
    const [data, setData] = useState({});

    const sports = ["Fútbol", "Baloncesto", "Deporte de raqueta"];
      
    useEffect(() => {
        if (sports.includes(dataForm.sport)) {
            getQuoteBySport(dataForm.sport)
                .then((respuestaDatos) => {
                    setData(
                        respuestaDatos[
                            Math.floor(Math.random() * respuestaDatos.length)
                        ]
                    );
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    return (
        <div className="containResults">
            {dataForm.day ? <h1>Convocatoria para {dataForm.day}</h1> : null}
            <PlayersDuel props={dataForm} />
            {dataForm.time ? <p>A las {dataForm.time}</p> : null}
            {dataForm.sport ? <p>Para jugar al {dataForm.sport}</p> : null}
            {dataForm.sport ? <p>{data.phrase}</p> : null}
            {dataForm.address ? <p>En {dataForm.address}</p> : null}
        </div>
    );
}

export default ResultToShare;
