import React, { useState } from "react";
import firebase from "../firebase";
import styles from "../styles/Login.module.scss";
import Image from "next/image";
import imagenLogin from "../public/img/imagenLogin.jpg";
import { Lato, Advent_Pro } from "@next/font/google";
import Router from "next/router";

const lato = Lato({ subsets: ["latin"], weight: ["400"] });
const advenPro = Advent_Pro({ subsets: ["latin"], weight: ["400"] });
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function iniciarSesion(e) {
    try {
      e.preventDefault();
      await firebase.iniciarSesion(email, password);
      Router.push("/");
    } catch (error) {
      console.error("Hubo un error al logear el usuario", error);
    }
  }
  return (
    <div className={styles.containerLogin}>
      <form
        className={styles.formularioLogin}
        onSubmit={(e) => iniciarSesion(e)}
      >
        <div className={styles.formularioLogin__posicionElementos}>
          <h2
            className={[styles.formularioLogin__titulo, lato.className].join(
              " "
            )}
          >
            Hola bienvenido a{" "}
            <span className={styles.formularioLogin__titulo__span}>
              COSTURA GARCIA
            </span>
          </h2>
          <div className={styles.formularioLogin__campo}>
            <label
              className={[
                styles.formularioLogin__label,
                advenPro.className,
              ].join(" ")}
            >
              Correo:
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formularioLogin__input}
              type={"email"}
            />
          </div>
          <div className={styles.formularioLogin__campo}>
            <label
              className={[
                styles.formularioLogin__label,
                advenPro.className,
              ].join(" ")}
            >
              Contraseña:
            </label>
            <input
              className={styles.formularioLogin__input}
              type="password"
              pattern=".{6,}"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            className={[styles.formularioLogin__btn, lato.className].join(" ")}
            value={"Enviando"}
          />
        </div>
      </form>
      <Image
        className={styles.imagenLogin}
        src={imagenLogin}
        alt="ImagenCosturaLogin"
      ></Image>
    </div>
  );
};

export default Login;
