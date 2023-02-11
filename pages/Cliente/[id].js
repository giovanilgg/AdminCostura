import React, { useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
//Componentes
import Layout from "../../components/layouts/Layout";
//Librerias externas
import { Formik, useFormik } from "formik";
//Estilos
import styles from "../../styles/FormularioCliente.module.scss";
//imagenes
import Image from "next/image";
import imagenTijeras from "../../public/img/imagenTijeras.png";
//Context y firebase
import { FirebaseContext } from "../../firebase";
//Models
import Cliente from "../../models/cliente";

//fuente principal
import { Advent_Pro } from "@next/font/google";
const advenPro = Advent_Pro({ subsets: ["latin"], weight: ["700", "500"] });
const FormCliente = () => {
  //Actualizar un cliente
  useEffect(() => {
    if (id != "nuevo") {
      const obtenerCliente = async (id) => {
        const datos = await firebase.getCliente(id);
        const {
          aCuenta,
          asignadoA,
          descripcion,
          fechaECliente,
          fechaRCliente,
          nombreCliente,
          precioTotal,
          telefonoCliente,
        } = datos;
        formik.resetForm();
        formik.resetForm({
          values: {
            nombreCliente: nombreCliente,
            telefonoCliente: telefonoCliente,
            fechaRCliente: fechaRCliente,
            fechaECliente: fechaECliente,
            precioTotal: precioTotal,
            aCuenta: aCuenta,
            asignadoA: asignadoA,
            descripcion: descripcion,
          },
        });
      };
    
      obtenerCliente(id); 
      
    }
  }, []);

  //obtener id de las url
  const router = useRouter();
  const { id } = router.query;
  //Context y firebase
  const { firebase } = useContext(FirebaseContext);
  //submit datos del cliente
  const handleSubmitCliente = async (valores) => {
    const {
      aCuenta,
      asignadoA,
      descripcion,
      fechaECliente,
      fechaRCliente,
      nombreCliente,
      precioTotal,
      telefonoCliente,
    } = valores;
    const clienteNuevo = new Cliente(
      nombreCliente,
      telefonoCliente,
      fechaRCliente,
      fechaECliente,
      precioTotal,
      aCuenta,
      asignadoA,
      descripcion,
      "pendiente",
      ""
    );
    console.log(clienteNuevo)
    const clienteActualizar = {
      nombreCliente,
      telefonoCliente,
      fechaRCliente,
      fechaECliente,
      precioTotal,
      aCuenta,
      asignadoA,
      descripcion,
    };
    try {
      if (id != "nuevo") {
        await firebase.actualizarCliente(id, clienteActualizar);
        router.push("/");
        return;
      }
      await firebase.postCliente(clienteNuevo);
      router.push("/");
    } catch (error) {
      console.log("Existe un error", error);
    }
  };
  //validaciones formulario
  const handleValidaciones = (values) => {
    let err = {};
    //validacion nombreCliente
    if (values.nombreCliente === "") {
      err.nombreCliente = "El nombre del cliente es obligatorio";
    }
    //validacion fechaRegistro
    if (values.fechaRCliente === "") {
      err.fechaRCliente = "La fecha de registro es obligatoria";
    }
    //validacion de la descripcion
    if (values.descripcion === "") {
      err.descripcion = "La descripcion es obligatoria";
    }

    return err;
  };
  //nuevo uso de formik

  const formik = useFormik({
    initialValues: {
      nombreCliente: "",
      telefonoCliente: 0,
      fechaRCliente: "",
      fechaECliente: "",
      precioTotal: 0,
      aCuenta: 0,
      asignadoA: "noAsignado",
      descripcion: "",
    },
    onSubmit: (values) => {
      handleSubmitCliente(values);
      router.navigate("/");
    },
    validate: (values) => {
      return handleValidaciones(values);
    },
  });
  console.log(formik.initialValues)

  return (
    <Layout>
      <form className={styles.formularioCliente} onSubmit={formik.handleSubmit}>
        <div className={styles.formularioCliente__tituloImagen}>
          <Image
            src={imagenTijeras}
            width={60}
            height={70}
            alt="Imagen de unas tijeras"
          />
          <h3 className={advenPro.className}>
            {id == "nuevo"
              ? "Agregando un nuevo usuario"
              : "Editanto un usuario"}
          </h3>
        </div>

        <div className={styles.formularioCliente__dosCampos}>
          <div className={styles.formularioCliente__campo}>
            <label htmlFor="nombreCliente" className={advenPro.className}>
              Nombre del cliente:*
            </label>
            <input
              type="string"
              id="nombreCliente"
              name="nombreCliente"
              value={formik.values.nombreCliente}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.nombreCliente && formik.errors.nombreCliente && (
              <p className={styles.formularioCliente__advertencia}>
                {formik.errors.nombreCliente}
              </p>
            )}
          </div>

          <div className={styles.formularioCliente__campo}>
            <label htmlFor="telefonoCliente" className={advenPro.className}>
              Telefono:
            </label>
            <input
              type="tel"
              id="telefonoCliente"
              name="telefonoCliente"
              value={formik.values.telefonoCliente}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        <div className={styles.formularioCliente__dosCampos}>
          <div className={styles.formularioCliente__campo}>
            <label htmlFor="fechaRCliente" className={advenPro.className}>
              Fecha de registro:*
            </label>
            <input
              type="date"
              id="fechaRCliente"
              name="fechaRCliente"
              value={formik.values.fechaRCliente}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fechaRCliente && formik.errors.fechaRCliente && (
              <p className={styles.formularioCliente__advertencia}>
                {formik.errors.fechaRCliente}
              </p>
            )}
          </div>

          <div className={styles.formularioCliente__campo}>
            <label htmlFor="fechaECliente" className={advenPro.className}>
              Fecha de entrega:*
            </label>
            <input
              type="date"
              id="fechaECliente"
              name="fechaECliente"
              value={formik.values.fechaECliente}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        <div className={styles.formularioCliente__tresCampos}>
          <div className={styles.formularioCliente__campo}>
            <label htmlFor="precioTotal" className={advenPro.className}>
              Precio Total:
            </label>
            <input
              type="number"
              id="precioTotal"
              name="precioTotal"
              value={formik.values.precioTotal}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className={styles.formularioCliente__campo}>
            <label htmlFor="aCuenta" className={advenPro.className}>
              A cuenta:
            </label>
            <input
              type="number"
              id="aCuenta"
              name="aCuenta"
              value={formik.values.aCuenta}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className={styles.formularioCliente__campo}>
            <label htmlFor="asignadoA" className={advenPro.className}>
              Asignado a{" "}
            </label>
            <select
              type="number"
              id="asignadoA"
              name="asignadoA" 
              value={ formik.values.asignadoA}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
           
            >
              <option value="noAsignado">Sin asignar</option>
              <option value="Silvia">Silvia Garcia Merino</option>
              <option value="Abigail">Abigail Garcia Merino</option>
             
            </select>
          </div>
        </div>
        <div
          className={[
            styles.formularioCliente__campo,
            styles.formularioCliente__unCampo,
          ].join(" ")}
        >
          <label htmlFor="descripcion" className={advenPro.className}>
            Descripcion:*
          </label>
          <textarea
            type="string"
            id="descripcion"
            name="descripcion"
            value={formik.values.descripcion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            cols={30}
            rows={3}
          />
          {formik.touched.descripcion && formik.errors.descripcion && (
            <p className={styles.formularioCliente__advertencia}>
              {formik.errors.descripcion}
            </p>
          )}
        </div>

        <button
          className={[styles.formularioCliente__btn, advenPro.className].join(
            " "
          )}
          type="submit"
        >
          {id == "nuevo" ? "AGREGAR" : "ACTUALIZAR"}
        </button>
      </form>
    </Layout>
  );
};

export default FormCliente;
