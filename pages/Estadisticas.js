import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/layouts/Layout";
//stylos
import styled from "../styles/Estadisticas.module.scss";
//Componetes de chart.js
import Grafica from "../components/Grafica";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
//Firebase
import { FirebaseContext } from "../firebase";
//fechas
import {
  fechaActual,
  fechaPasadaUnMes,
  formatearFechaFormatoTitulo,
} from "../helpers/fecha.js";
ChartJS.register(ArcElement, Tooltip, Legend, Title);
const Estadisticas = () => {
  //Estableciendo un conteo de la fecha actual,menos un mes
  const fechaF = fechaActual();
  const fechaI = fechaPasadaUnMes();
  //estados de los inputs
  const [datosClientesTerminados, setDatosClientesTerminados] = useState([]);
  const [fechaInicial, setFechaInicial] = useState(fechaI);
  const [fechaFinal, setFechaFinal] = useState(fechaF);
  //opciones generales del grafico
  let options = {
    plugins: {
      responsive: false,
      title: {
        display: true,
        text: `Ganancias desde el ${formatearFechaFormatoTitulo(
          fechaInicial
        )} al ${formatearFechaFormatoTitulo(fechaFinal)}`,
        color: "#D316BC",
        font: { size: "14px" },
      },
    },
  };

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [],
        borderColor: [],

        borderWidth: 1,
      },
    ],
  });
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    const getClientesTerminado = async () => {
      const datos = await firebase.getClientesE();
      setDatosClientesTerminados(datos);
    };
    getClientesTerminado();
  }, []);
  useEffect(() => {
    rellenarDatosGrafica(datosClientesTerminados, fechaInicial, fechaFinal);
  }, [fechaInicial, fechaFinal, datosClientesTerminados]);

  const rellenarDatosGrafica = (datos, fechaI, fechaF) => {
    const silvia = datos.reduce((acum, cliente) => {
      if (
        cliente.asignadoA == "Silvia" &&
        cliente.fechaConteo >= fechaI &&
        cliente.fechaConteo <= fechaF
      ) {
        acum += cliente.precioTotal;
      }
      return acum;
    }, 0);
    const abigail = datos.reduce((acum, cliente) => {
      if (
        cliente.asignadoA == "Abigail" &&
        cliente.fechaConteo >= fechaI &&
        cliente.fechaConteo <= fechaF
      ) {
        acum += cliente.precioTotal;
      }
      return acum;
    }, 0);
    //datos de las graficas
    const dataGrafica = {
      labels: ["Silvia Garcia Merino", "Abigail Garcia Merino"],
      datasets: [
        {
          label: " Ganancia Total ",
          data: [silvia, abigail],
          backgroundColor: ["#DCA4CC", "#E3E3E3"],
          borderColor: ["#DCA4CC", "#E3E3E3"],
          borderWidth: 1,
        },
      ],
    };
    setData(dataGrafica);
  };

  return (
    <div>
      <Layout>
        <section className={styled.grafica}>
          <div className={styled.grafica__circular}>
            <Grafica data={data} options={options}></Grafica>
          </div>

          <div className={styled.grafica__filtros}>
            <div className={styled.grafica__filtros_elementos}>
              <label>Desde:</label>
              <input
                type={"date"}
                value={fechaInicial}
                onChange={(e) => {
                  setFechaInicial(e.target.value);
                }}
              />
            </div>
            <div className={styled.grafica__filtros_elementos}>
              <label>Hasta:</label>
              <input
                type={"date"}
                value={fechaFinal}
                onChange={(e) => {
                  setFechaFinal(e.target.value);
                }}
              />
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default Estadisticas;
