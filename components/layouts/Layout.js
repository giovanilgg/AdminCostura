import { Advent_Pro, Lato } from "@next/font/google";
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import imagenPrincipal from "../../public/img/imagenPrincipal.png";
import imagenCosturasPendientes from "../../public/img/imagenCosturaPendiente.png";
import imagenCosturasSinEntregar from "../../public/img/imagenCosturaSinEntregar.png";
import imagenClientes from "../../public/img/imagenClientes.png";
import imagenPrecios from "../../public/img/imagenPrecio.png";
import imagenEstadisticas from "../../public/img/imagenEstadisticas.png";
import imagenCerrarSesion from "../../public/img/imagenCerrarSesion.png";
import imagenNuevo from "../../public/img/imagenNuevo.png";
import styled from "../../styles/Menu.module.scss";
import { FirebaseContext } from "../../firebase";
import useTamPantalla from "../../hooks/useTamPantalla";
import Router from "next/router";
const lato = Lato({ weight: ["400"] });

const Layout = (props) => {
  const { usuario, firebase } = useContext(FirebaseContext);
  const { width } = useTamPantalla();

  /* useEffect(() => {
    if (!usuario) {
      Router.push("/Login");
    }
    return () => usuario;
  }, [usuario]);*/

  //menu desplegable
  const [menuActivo, setMenuActivo] = useState(false);
  const handleMenu = () => {
    if (menuActivo) {
      setMenuActivo(false);
    } else {
      setMenuActivo(true);
    }
  };
  return (
    <div>
      <div
        className={[
          styled.menuCollapsed,
          (menuActivo && styled.menuActive) || styled.menuCollapsed,
          width < 768 && menuActivo == false && styled.menuActive,
        ].join(" ")}
      >
        <header className={styled.menuCollapsed__header}>
          <h1
            className={[
              lato.className,
              styled.menuCollapsed__header_titulo,
              (menuActivo && styled.tituloActive) || lato.className,
              styled.menuCollapsed__header_titulo,
              width < 768 && menuActivo == false && styled.tituloActive,
            ].join(" ")}
          >
            Costura <span>Garcia</span>{" "}
          </h1>
          <svg
            width="40"
            height="40"
            viewBox="0 0 108 65"
            fill="none"
            stroke="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styled.menuCollapsed__header_menu}
            onClick={() => {
              handleMenu();
            }}
          >
            <rect width="108" height="15" rx="7.5" fill="#E56CBC" />
            <rect y="25" width="108" height="15" rx="7.5" fill="#E56CBC" />
            <rect y="50" width="108" height="15" rx="7.5" fill="#E56CBC" />
          </svg>
        </header>
        <div
          className={[
            styled.menuCollapsed__logoImagen,
            (menuActivo && styled.imagenActive) ||
              styled.menuCollapsed__logoImagen,
            width < 768 && menuActivo == false && styled.imagenActive,
          ].join(" ")}
        >
          <Image src={imagenPrincipal} alt="Imagen principal de costura" />
        </div>
        <nav
          className={[
            styled.menuCollapsed__linksSecciones,
            (menuActivo && styled.iconosActive) ||
              styled.menuCollapsed__linksSecciones,
            width < 768 && menuActivo == false && styled.iconosActive,
          ].join(" ")}
        >
          <Link
            href="/"
            className={styled.menuCollapsed__linksSecciones_colorDos}
          >
            <Image
              src={imagenCosturasPendientes}
              width={40}
              height={40}
              alt="Imagen costuras pendientes"
            />
            <p className={lato.className}>Costuras Pendientes</p>
          </Link>
          <Link
            href="/CosturasPendientesFinalizadas"
            className={styled.menuCollapsed__linksSecciones_colorUno}
          >
            <Image
              src={imagenCosturasSinEntregar}
              width={40}
              height={40}
              alt="Imagen costuras sin entregar"
            />
            <p className={lato.className}>Costuras sin entregar</p>
          </Link>
          <Link
            href="/Clientes"
            className={styled.menuCollapsed__linksSecciones_colorDos}
          >
            <Image
              src={imagenClientes}
              width={40}
              height={40}
              alt="Imagen clientes"
            />
            <p className={lato.className}>CLientes</p>
          </Link>
          <Link
            href="/Precios"
            className={styled.menuCollapsed__linksSecciones_colorUno}
          >
            <Image
              src={imagenPrecios}
              width={40}
              height={40}
              alt="Imagen Precios"
            />
            <p className={lato.className}>Precios</p>
          </Link>
          <Link
            href="/Estadisticas"
            className={styled.menuCollapsed__linksSecciones_colorDos}
          >
            <Image
              src={imagenEstadisticas}
              width={40}
              height={40}
              alt="Imagen estadisticas"
            />
            <p className={lato.className}>Estadisticas</p>
          </Link>
        </nav>
      </div>
      <main
        className={[
          styled.contenidoPrincipal,
          (menuActivo && styled.contenidoPrincipalActive) ||
            styled.contenidoPrincipal,
          width < 768 && menuActivo == false && styled.contenidoPrincipalActive,
        ].join(" ")}
      >
        <div className="contenedor">
          {props.children}
          <div className={styled.contenidoPrincipal__btnCerrar}>
            <Image
              src={imagenCerrarSesion}
              width={40}
              height={40}
              alt="Imagen cerrar sesion"
              onClick={() => firebase.cerrarSesion()}
            ></Image>
            <p className={styled.contenidoPrincipal__btnCerrar_titulo}>
              Cerrar Sesión
            </p>
          </div>

          <Link
            className={styled.contenidoPrincipal__btnNuevo}
            href="/Cliente/nuevo"
          >
            <Image
              src={imagenNuevo}
              width={40}
              height={40}
              alt="Imagen agregar nuevo cliente"
            ></Image>
            <p className={styled.contenidoPrincipal__btnNuevo_titulo}>
              Nuevo Cliente
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Layout;
