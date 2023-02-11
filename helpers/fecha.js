const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha);

  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  fechaNueva.setMinutes(
    fechaNueva.getMinutes() + fechaNueva.getTimezoneOffset()
  );
  console.log(fechaNueva);
  return fechaNueva.toLocaleDateString("es-ES", opciones);
};
const formatearFechaFormatoTitulo = (fecha) => {
  const fechaNueva = new Date(fecha);

  const opciones = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  fechaNueva.setMinutes(
    fechaNueva.getMinutes() + fechaNueva.getTimezoneOffset()
  );
  console.log(fechaNueva);
  return fechaNueva.toLocaleDateString("es-ES", opciones);
};

const fechaActual = () => {
  const fechaNueva = new Date();

  return fechaNueva.toISOString().substring(0, 10);
};
const fechaPasadaUnMes = () => {
  const fechaNueva = new Date();
  fechaNueva.setMonth(fechaNueva.getMonth() - 1);

  return fechaNueva.toISOString().substring(0, 10);
};

export {
  formatearFecha,
  fechaActual,
  fechaPasadaUnMes,
  formatearFechaFormatoTitulo,
};
