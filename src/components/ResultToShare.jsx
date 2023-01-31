import React, { useEffect, setError, setIsLoading, useState, useContext } from "react";
import { formContext } from "../contexts/FormsContext";
import { useNavigate, useLocation } from "react-router-dom";
import PlayersDuel from "./result/PlayersDuel";
import getQuoteBySport from "./../services/quotesAPI";
import "./result/resultToShare.css";

function ResultToShare() {
    const navigate = useNavigate();
    const location = useLocation();

    const { form, restartForm } = useContext(formContext);
    let [data, setData] = useState({});
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (form.sport) {
            getQuoteBySport(form.sport)
                .then((respuestaDatos) => {
                    setData(
                        respuestaDatos[
                            Math.floor(Math.random() * respuestaDatos.length)
                        ]
                    );
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setError(true);
                });
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        window.onbeforeunload = () => {
            navigate("/");
            restartForm();
        };
    }, []);

    return (
        <div className="containResults">
            {form.day ? <h1>Convocatoria para {form.day}</h1> : null}
            {isLoading ? (
                <p>Cargando...</p>
            ) : (
                <>
                    <PlayersDuel props={form} />
                    {form.time ? <p>A las {form.time}</p> : null}
                    {form.sport ? <p>Para jugar al {form.sport}</p> : null}
                    {form.sport ? <p>{data.phrase}</p> : null}
                    {form.address ? <p>En {form.address}</p> : null}
                </>
            )}
        </div>
    );
}

export default ResultToShare;
