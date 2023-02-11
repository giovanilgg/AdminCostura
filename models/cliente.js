class Cliente {
  constructor(
    nombreCliente,
    telefonoCliente,
    fechaRCliente,
    fechaECliente,
    precioTotal,
    aCuenta,
    asignadoA,
    descripcion,
    estatus,
    fechaConteo
  ) {
    this.nombreCliente = nombreCliente;
    this.telefonoCliente = telefonoCliente;
    this.fechaRCliente = fechaRCliente;
    this.fechaECliente = fechaECliente;
    this.precioTotal = precioTotal;
    this.aCuenta = aCuenta;
    this.asignadoA = asignadoA;
    this.descripcion = descripcion;
    this.estatus = estatus;
    this.fechaConteo=fechaConteo;
    this.fechaOrdenamiento = Date.now();
  }
}

export default Cliente;
