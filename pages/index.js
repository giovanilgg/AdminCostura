import Layout from "../components/layouts/Layout";
import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";
import Tabla from "../components/Tabla";

function Home() {
  const { firebase, clientes, guardarClientes } = useContext(FirebaseContext);
  useEffect(() => {
    const obtenerClientes = async () => {
      const docClientes = await firebase.getClientesP();

      guardarClientes(docClientes);
    };
    obtenerClientes();
  }, []);

  return (
    <div>
      <Layout>
        <Tabla
          clientes={clientes}
          guardarClientes={guardarClientes}
          urlRecarga=""
        ></Tabla>
      </Layout>
      ;
    </div>
  );
}
export default Home;
