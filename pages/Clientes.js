import React, { useContext, useEffect } from "react";
import Layout from "../components/layouts/Layout";
import { useState } from "react";
import Tabla from "../components/Tabla";
import { FirebaseContext } from "../firebase";
import Filtro from "../components/Filtro";
const Clientes = () => {
  const { firebase, clientes, guardarClientes } = useContext(FirebaseContext);
  const [clientesFiltro, guardarClientesFiltro] = useState([]);

  //extrayendo los datos de firestore
  useEffect(() => {
    guardarClientes([]);
    const obtenerClientes = async () => {
      const docClientes = await firebase.getClientesE();
      guardarClientes(docClientes);
      guardarClientesFiltro(docClientes);
    };
    obtenerClientes();
  }, []);
  return (
    <div>
      <Layout>
        <Filtro
          clientes={clientes}
          guardarClientesFiltro={guardarClientesFiltro}
        />
        <Tabla
          clientes={clientesFiltro}
          guardarClientes={guardarClientesFiltro}
        ></Tabla>
      </Layout>
      ;
    </div>
  );
};

export default Clientes;
