import React from "react";
import styled from "../styles/Alerta.module.scss";
const Alerta = ({ children, accion }) => {
  return (
    <div
      className={[
        styled.alerta,
        accion == "error" && styled.error,
        accion == "actualizar" && styled.actualizar,
        accion == "insertar" && styled.insertar,
      ].join(" ")}
    >
      <p>{children}</p>
    </div>
  );
};

export default Alerta;
