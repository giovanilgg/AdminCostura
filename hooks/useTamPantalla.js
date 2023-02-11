import React, { useState, useEffect } from "react";

const useTamPantalla = () => {
  let ancho;

  if (typeof window !== "undefined") {
    ancho = window.innerWidth;
  }
  const [width, setWidth] = useState(ancho);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  return { width };
};

export default useTamPantalla;
