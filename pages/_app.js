import "../styles/globals.scss";
import "normalize.css/normalize.css";
import { useState } from "react";
import firebase, { FirebaseContext } from "../firebase/index";
import useAutenticacion from "../hooks/useAuteticacion";
function MyApp({ Component, pageProps }) {
  const usuario = useAutenticacion();
  //state global para la tabla
  const [clientes, guardarClientes] = useState([]);
  //state global para precios
  const [precios, guardarPrecios] = useState([]);

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        usuario,
        clientes,
        guardarClientes,
        precios,
        guardarPrecios,
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}

export default MyApp;
