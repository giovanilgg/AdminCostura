import React from "react";
import styled from "../styles/Filtro.module.scss";
import imagenBuscar from "../public/img/imagenBuscar.png";
import Image from "next/image";
const Filtro = ({ clientes, guardarClientesFiltro }) => {
  const buscarRegistro = (valorInput) => {
    if (valorInput === "") {
      guardarClientesFiltro(clientes);
      return;
    }
    const patron = `${valorInput}`;
    const patronBusqueda = new RegExp(patron, "gi");
    const clientesEncontrados = clientes.filter((cliente) => {
      if (cliente.nombreCliente.match(patronBusqueda)) {
        return cliente;
      }
    });
    guardarClientesFiltro(clientesEncontrados);
  };
  return (
    <div className={styled.filtro}>
      <Image
        className={styled.filtro__imagenFiltro}
        src={imagenBuscar}
        alt="iconoBuscar"
        height={20}
        width={20}
      />
      <input
        className={styled.filtro__inputFiltro}
        type="text"
        placeholder="Buscar cliente"
        onChange={(e) => {
          buscarRegistro(e.target.value);
        }}
      />
    </div>
  );
};

export default Filtro;
