import React, { useContext } from "react";
import styles from "../styles/Tabla.module.scss";
import { FirebaseContext } from "../firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Router, { useRouter } from "next/router";
import { formatearFecha, fechaActual } from "../helpers/fecha";

const MiSwal = withReactContent(Swal);

const Tabla = ({ clientes, guardarClientes, urlRecarga }) => {
  const { firebase } = useContext(FirebaseContext);
  const router = useRouter();

  const accionCompostura = async (id, status, asignado) => {
    let docClientes = [];
    if (status === "pendiente") {
      if (asignado === "noAsignado") {
        MiSwal.fire({
          icon: "error",
          title: "Error",
          text: "El cliente aun no ha sido asignado a ninguna persona",
        });
        return;
      } else {
        await firebase.actualizarCliente(id, { estatus: "terminado" });
        docClientes = await firebase.getClientesP();
      }
    } else if (status === "terminado") {
      await firebase.actualizarCliente(id, { estatus: "entregado" });
      const fechaC = fechaActual();
      await firebase.actualizarCliente(id, { fechaConteo: fechaC });
      docClientes = await firebase.getClientesT();
    } else if (status === "entregado") {
      docClientes = await firebase.getClientesE();
    }

    guardarClientes(docClientes);
  };

  const actualizarCliente = (id) => {
    router.push(`Cliente/${id}`);
  };

  const eliminarCliente = (id, status) => {
    MiSwal.fire({
      title: "Estas seguro de eliminar el cliente?",
      text: "Esta acción es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await firebase.deleteCliente(id);
          //actualizando la vista de registros dependiendo el estatus
          let docClientes = [];
          if (status === "pendiente") {
            docClientes = await firebase.getClientesP();
          } else if (status === "terminado") {
            docClientes = await firebase.getClientesT();
          } else if (status === "entregado") {
            docClientes = await firebase.getClientesE();
          }

          guardarClientes(docClientes);
          MiSwal.fire("Eliminado!", "El cliente ha sido removido", "success");
        }
      } catch (error) {
        MiSwal.fire("Fallo", "Lo sentimos algo ha salido mal", "success");
      }
    });
  };

  return (
    <table className={styles.tabla}>
      <thead className={styles.tabla__head}>
        <tr className={styles.tabla__head__tr}>
          <th>Nombre</th>
          <th>Telefono</th>
          <th>FechaRegistro</th>
          <th>Asignado</th>
          <th>Descripcion</th>
          <th>PrecioTotal</th>
          <th>A cuenta</th>
          <th>Estatus</th>
          <th>Fecha Entrega</th>
          <th>Recibio su prenda el</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className={styles.tabla__body}>
        {clientes &&
          clientes.map((clie) => (
            <tr className={styles.tabla__body__tr} key={clie.id}>
              <td data-label="Nombre">{clie.nombreCliente}</td>
              <td data-label="Telefono">{clie.telefonoCliente}</td>
              <td data-label="FechaRegistro">
                {formatearFecha(clie.fechaRCliente)}
              </td>
              <td data-label="Asignado">{clie.asignadoA}</td>
              <td data-label="Descripcion">{clie.descripcion}</td>
              <td data-label="PrecioTotal">${clie.precioTotal}</td>
              <td data-label="A cuenta">${clie.aCuenta}</td>
              <td data-label="Estatus">{clie.estatus}</td>
              <td data-label="Fecha Entrega">
                {formatearFecha(clie.fechaECliente)}
              </td>
              <td data-label="Cliente recibio su prenda el">
                {formatearFecha(clie.fechaConteo)}
              </td>
              <td className={styles.tabla__body__tr__btn}>
                <button
                  onClick={() => actualizarCliente(clie.id)}
                  className={styles.tabla__body__tr__btn__actualizar}
                >
                  Editar
                </button>
                <button
                  className={styles.tabla__body__tr__btn__eliminar}
                  onClick={() => {
                    eliminarCliente(clie.id, clie.estatus);
                  }}
                >
                  Eliminar
                </button>

                <button
                  onClick={() => {
                    accionCompostura(clie.id, clie.estatus, clie.asignadoA);
                  }}
                  className={
                    (clie.estatus == "entregado" && styles.tabla__oculto) ||
                    (clie.estatus == "pendiente" &&
                      styles.tabla__body__tr__btn__finalizar) ||
                    (clie.estatus == "terminado" &&
                      styles.tabla__body__tr__btn__entregar)
                  }
                >
                  {(clie.estatus === "pendiente" && "Finalizar") ||
                    (clie.estatus == "terminado" && "Entregar")}
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Tabla;
