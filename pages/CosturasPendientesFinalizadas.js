import React, { useContext, useEffect } from "react";
import Layout from "../components/layouts/Layout";
import Tabla from "../components/layouts/Tabla";
import { FirebaseContext } from "../firebase";

const CosturasPendientesFinalizadas = () => {
  const { firebase, clientes, guardarClientes } = useContext(FirebaseContext);
  useEffect(() => {
    guardarClientes([]);
    const obtenerClientes = async () => {
      const docClientes = await firebase.getClientesT();

      guardarClientes(docClientes);
    };
    obtenerClientes();
  }, []);

  return (
    <div>
      <Layout>
        <Tabla clientes={clientes} guardarClientes={guardarClientes}></Tabla>
      </Layout>
      ;
    </div>
  );
};

export default CosturasPendientesFinalizadas;
