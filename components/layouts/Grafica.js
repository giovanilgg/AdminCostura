import React from "react";
import { Pie } from "react-chartjs-2";
const Grafica = ({ data, options }) => {
  return (
    <Pie data={data} options={options}>
      Grafica
    </Pie>
  );
};

export default Grafica;
