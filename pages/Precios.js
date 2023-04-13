import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/layouts/Layout";
import ModalPrecios from "../components/ModalPrecios";
import Image from "next/image";
import agregarServicio from "../public/img/imagenAgregar.png";
import styled from "../styles/Precios.module.scss";
import TabPrecios from "../components/TabPrecios";
//firebase

import { FirebaseContext } from "../firebase";

const Precios = () => {
  const [modal, setModal] = useState(false);
  const [arrayPrecios, setArrayPrecios] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  const [preciosCategoria, setPreciosCategoria] = useState([]);
  const [precioEditar, setPrecioEditar] = useState({});

  //Obteniendo todos los precios
  useEffect(() => {
    try {
      const obtenerPrecios = async () => {
        const datos = await firebase.getPrecios();
        const datosCategoriaInicial = datos.filter((cat) => {
          if (cat.categoria == "pantalones") {
            return cat;
          }
        });
        setPreciosCategoria(datosCategoriaInicial);
        setArrayPrecios(datos);
      };
      obtenerPrecios();
    } catch (error) {}
  }, []);

  return (
    <div>
      <Layout>
        {modal && (
          <ModalPrecios
            setArrayPrecios={setArrayPrecios}
            setModal={setModal}
            precioEditar={precioEditar}
            setPrecioEditar={setPrecioEditar}
          ></ModalPrecios>
        )}

        <div
          className={styled.btnServicio}
          onClick={() => {
            setModal(true);
          }}
        >
          <Image
            className={styled.btnServicio__imagen}
            src={agregarServicio}
            alt="IconoAgregarServicio"
            width={30}
            height={30}
          ></Image>
          <p className={styled.btnServicio__descripcion}>Agregar Servicio</p>
        </div>

        <TabPrecios
          arrayPrecios={arrayPrecios}
          setArrayPrecios={setArrayPrecios}
          preciosCategoria={preciosCategoria}
          setPreciosCategoria={setPreciosCategoria}
          setModal={setModal}
          setPrecioEditar={setPrecioEditar}
        ></TabPrecios>
      </Layout>
    </div>
  );
};

export default Precios;
