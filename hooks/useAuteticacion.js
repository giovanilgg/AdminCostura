import React, { useState, useEffect } from "react";
import firebase from "../firebase";

const useAutenticacion = () => {
  const [usuarioAutenticado, guardarUsuarioAutenticado] = useState();

  useEffect(() => {
    const onsuscribe = firebase.auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        guardarUsuarioAutenticado(usuario);
      } else {
        guardarUsuarioAutenticado(null);
      }
    });

    return () => onsuscribe();
  }, []);

  return usuarioAutenticado;
};

export default useAutenticacion;
