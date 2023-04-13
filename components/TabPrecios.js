import React, { useState, useEffect, useContext } from "react";
import styled from "../styles/TabPrecios.module.scss";
import { FirebaseContext } from "../firebase";
//alertas de sweetalert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MiSwal = withReactContent(Swal);
const TabPrecios = ({
  arrayPrecios,
  setArrayPrecios,
  preciosCategoria,
  setPreciosCategoria,
  setModal,
  setPrecioEditar,
}) => {
  const [valorCategoria, setValorCategoria] = useState("pantalones");
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const categoriaArray = arrayPrecios.filter((cat) => {
      if (cat.categoria == valorCategoria) {
        return cat;
      }
    });
    setPreciosCategoria(categoriaArray);
  }, [valorCategoria, arrayPrecios]);

  const editarPrecio = async (id) => {
    try {
      const valoresPrecio = await firebase.getPrecio(id);
      setPrecioEditar(valoresPrecio);
    } catch (error) {
      return;
    }
    setModal(true);
  };
  const eliminarPrecio = (id) => {
    MiSwal.fire({
      title: "Estas seguro de eliminar el precio?",
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
          await firebase.deletePrecio(id);
          const datos = await firebase.getPrecios();
          setArrayPrecios(datos);

          MiSwal.fire("Eliminado!", "El precio ha sido removido", "success");
        }
      } catch (error) {
        MiSwal.fire("Fallo", "Lo sentimos algo ha salido mal", "success");
      }
    });
  };
  return (
    <div className={styled.contenedorTab}>
      <div className={styled.menuTab}>
        <button
          className={[
            styled.menuTab__btn,
            valorCategoria == "pantalones" && styled.btnHover,
          ].join(" ")}
          onClick={() => {
            setValorCategoria("pantalones");
          }}
        >
          Pantalones
        </button>
        <button
          className={[
            styled.menuTab__btn,
            valorCategoria == "blusasCamisas" && styled.btnHover,
          ].join(" ")}
          onClick={() => {
            setValorCategoria("blusasCamisas");
          }}
        >
          Blusas o Camisas
        </button>
        <button
          className={[
            styled.menuTab__btn,
            valorCategoria == "faldas" && styled.btnHover,
          ].join(" ")}
          onClick={() => {
            setValorCategoria("faldas");
          }}
        >
          Faldas
        </button>
        <button
          className={[
            styled.menuTab__btn,
            valorCategoria == "vestidos" && styled.btnHover,
          ].join(" ")}
          onClick={() => {
            setValorCategoria("vestidos");
          }}
        >
          Vestidos
        </button>
        <button
          className={[
            styled.menuTab__btn,
            valorCategoria == "sacos" && styled.btnHover,
          ].join(" ")}
          onClick={() => {
            setValorCategoria("sacos");
          }}
        >
          Sacos
        </button>
        <button
          className={[
            styled.menuTab__btn,
            valorCategoria == "otros" && styled.btnHover,
          ].join(" ")}
          onClick={() => {
            setValorCategoria("otros");
          }}
        >
          Otros
        </button>
      </div>

      <div className={styled.contenidoTab}>
        <div className={styled.contenidoTab__contenido}>
          <ul>
            <h3 className={styled.contenidoTab__contenido__titulo}>
              {valorCategoria}
            </h3>
            {preciosCategoria.map((cat) => (
              <li
                className={styled.contenidoTab__contenido__lista}
                key={cat.id}
              >
                <p className={styled.contenidoTab__contenido__lista__info}>
                  <span> Descripción:</span> {cat.descripcion}
                </p>
                <p className={styled.contenidoTab__contenido__lista__info}>
                  <span> Precio:</span> ${cat.precio}
                </p>
                <div>
                  <button
                    className={
                      styled.contenidoTab__contenido__lista__btnActualizar
                    }
                    onClick={() => {
                      editarPrecio(cat.id);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className={styled.contenidoTab__contenido__lista__btnBorrar}
                    onClick={() => {
                      eliminarPrecio(cat.id);
                    }}
                  >
                    Borrar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TabPrecios;
