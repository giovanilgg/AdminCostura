import "../styles/globals.scss";
import "normalize.css/normalize.css";
import { useState } from "react";
import firebase, { FirebaseContext } from "../firebase/index";
import useAutenticacion from "../hooks/useAuteticacion";
function MyApp({ Component, pageProps }) {
  const usuario = useAutenticacion();
  //state global para la tabla
  const [clientes, guardarClientes] = useState([]);

  return (
    <FirebaseContext.Provider
      value={{ firebase, usuario, clientes, guardarClientes }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}

export default MyApp;
