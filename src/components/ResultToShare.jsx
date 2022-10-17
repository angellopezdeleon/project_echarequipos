import React from "react";
import { useContext } from "react";
import { formContext } from "../contexts/FormsContext";
import PlayersDuel from "./result/PlayersDuel";
import "./result/resultToShare.css"

function ResultToShare() {
  const context = useContext(formContext);

  return (
    <div className="containResults">
      {context.form.day ? <h1>Convocatoria para {context.form.day}</h1> : null}
      <PlayersDuel props={context.form} />
      {context.form.time ? <p>A las {context.form.time}</p> : null}
      {context.form.sport ? <p>Para jugar al {context.form.sport}</p> : null}
      {context.form.address ? <p>En {context.form.address}</p> : null}
    </div>
  );
}

export default ResultToShare;
