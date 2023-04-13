//next y react
import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Router from "next/router";
//Formulario
import { useFormik } from "formik";
//Estilos
import styled from "../styles/ModalPrecios.module.scss";
//Imagenes
import imagenCerrar from "../public/img/imagenCerrar.png";
//Modelos
import PrecioServicio from "../models/precioServicio";
//Firebase
import { FirebaseContext } from "../firebase";
//Componentes
import Alerta from "./Alerta";
//fuente principal
import { Advent_Pro } from "@next/font/google";
import { async } from "@firebase/util";
const advenPro = Advent_Pro({ subsets: ["latin"], weight: ["700", "500"] });
const ModalPrecios = ({
  setModal,
  setArrayPrecios,
  setPrecioEditar,
  precioEditar,
}) => {
  const { firebase } = useContext(FirebaseContext);
  const [alerta, setAlerta] = useState({
    mensaje: "",
    accion: "",
  });
  const [alertaActive, setAlertaActive] = useState(false);
  //editar precio
  useEffect(() => {
    if (Object.entries(precioEditar).length !== 0) {
      const { categoria, precio, descripcion } = precioEditar;
      formik.resetForm();
      formik.resetForm({
        values: {
          categoria: categoria,
          precio: precio,
          descripcion: descripcion,
        },
      });
    }
  }, []);
  //Registrar un precio
  const handleSubmitPrecio = async (values) => {
    const { categoria, precio, descripcion } = values;
    const precioNuevo = new PrecioServicio(categoria, precio, descripcion);
    try {
      if (Object.entries(precioEditar).length !== 0) {
        await firebase.actualizarPrecio(precioEditar.id, precioNuevo);
        setAlerta({
          mensaje: "Precio actualizado correctamente",
          accion: "actualizar",
        });
        setAlertaActive(true);
      } else {
        await firebase.postPrecio(precioNuevo);

        setAlerta({
          mensaje: "Precio agregado correctamente",
          accion: "insertar",
        });
        setAlertaActive(true);
      }
      const dataPrecios = await firebase.getPrecios();
      setArrayPrecios(dataPrecios);
      setPrecioEditar({});
    } catch (error) {
      setAlerta({
        mensaje: "Lo sentimos,hubo un problema al registrar el precio",
        accion: "error",
      });
      setAlertaActive(true);
    }

    setTimeout(() => {
      setAlertaActive(false);
      setModal(false);
    }, 2500);
  };
  //Validaciones
  const handleValidacionesPrecio = (values) => {
    let err = {};
    const { categoria, precio, descripcion } = values;
    //validacion categoria
    if (categoria === "") {
      err.categoria = "La categoria es obligatoria";
    }
    //validacion precio
    if (precio === "" || precio === 0) {
      err.precio = "El precio de obligatorio";
    }
    //validacion de la descripcion
    if (descripcion === "") {
      err.descripcion = "La descripcion es obligatoria";
    }

    return err;
  };

  const formik = useFormik({
    initialValues: {
      categoria: "",
      precio: 0,
      descripcion: "",
    },
    onSubmit: (values) => {
      handleSubmitPrecio(values);
      Router.push("/Precios");
    },
    validate: (values) => {
      return handleValidacionesPrecio(values);
    },
  });
  return (
    <div className={styled.modalPrecio}>
      <div className={styled.modalPrecio__contenedor}>
        {alertaActive && (
          <Alerta accion={alerta.accion}>{alerta.mensaje}</Alerta>
        )}
        <div
          className={styled.modalPrecio__contenedor__btnCerrar}
          onClick={() => {
            setModal(false);
            setPrecioEditar({});
          }}
        >
          <Image
            src={imagenCerrar}
            alt="IconoImagenCerrar"
            width={30}
            height={30}
          />
        </div>{" "}
        <form
          onSubmit={formik.handleSubmit}
          className={styled.modalPrecio__Formulario}
        >
          <legend className={advenPro.className}>
            {Object.entries(precioEditar).length !== 0 ? "Editar" : "Agregar"}{" "}
            <span>Precio</span>{" "}
          </legend>
          <div className={styled.modalPrecio__Formulario__Campo}>
            <label className={advenPro.className}>Elige una categoria</label>
            <select
              id="categoria"
              name="categoria"
              value={formik.values.categoria}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value={""}>Sin asignar</option>
              <option value={"pantalones"}>Pantalones</option>
              <option value={"blusasCamisas"}>Blusas o Camisas</option>
              <option value={"faldas"}>Faldas</option>
              <option value={"vestidos"}>Vestidos</option>
              <option value={"sacos"}>Sacos</option>
              <option value={"cortinasServilletas"}>
                Cortinas y servilletas
              </option>
              <option value={"otros"}>Otros</option>
            </select>
            {formik.touched.categoria && formik.errors.categoria && (
              <p className={styled.modalPrecioAlerta}>
                {formik.errors.categoria}
              </p>
            )}
          </div>
          <div className={styled.modalPrecio__Formulario__Campo}>
            <label className={advenPro.className}>
              Descripción del servicio
            </label>
            <input
              type="string"
              id="descripcion"
              name="descripcion"
              value={formik.values.descripcion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.descripcion && formik.errors.descripcion && (
              <p className={styled.modalPrecioAlerta}>
                {formik.errors.descripcion}
              </p>
            )}
          </div>
          <div className={styled.modalPrecio__Formulario__Campo}>
            <label className={advenPro.className}>Precio</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formik.values.precio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.precio && formik.errors.precio && (
            <p className={styled.modalPrecioAlerta}>{formik.errors.precio}</p>
          )}
          <input
            className={styled.modalPrecio__Formulario__btn}
            type={"submit"}
            value={
              Object.entries(precioEditar).length !== 0
                ? "Actualizar"
                : "Agregar"
            }
          />
        </form>
      </div>
    </div>
  );
};

export default ModalPrecios;
