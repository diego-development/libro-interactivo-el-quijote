import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import PageWrapper from "../../PageWrapper";
import fondoLibro from "../../../assets/fondo-libro.png";

// 🖼️ Imágenes base del libro
import portadaImg from "../../../assets/LibroFrases/portada.png";
import contraportadaImg from "../../../assets/LibroFrases/contraportada.png";
import primeraPaginaImg from "../../../assets/LibroFrases/primeraPagina.png";
import ultimaPaginaImg from "../../../assets/LibroFrases/ultimaPagina.png";

// 🖼️ Fondos configurables para las hojas internas
import fondo1 from "../../../assets/LibroFrases/frase1-der.png";
import fondo2 from "../../../assets/LibroFrases/frase2-izq.png";
import fondo3 from "../../../assets/LibroFrases/frase3-izq.png";
import fondo4 from "../../../assets/LibroFrases/frase4-der.png";
import fondo5 from "../../../assets/LibroFrases/frase5-izq.png";
import fondo6 from "../../../assets/LibroFrases/frase6-der.png";

function LibroFrases() {
  const [bookSize, setBookSize] = useState({ width: 800, height: 1200 });
  const [paginas, setPaginas] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const flipBookRef = useRef(null);

  // 🔹 Todas las hojas posibles
  const HOJAS_CONFIG = [
    { fondo: fondo1, lado: "derecho" },
    { fondo: fondo2, lado: "izquierdo" },
    { fondo: fondo3, lado: "izquierdo" },
    { fondo: fondo4, lado: "derecho" },
    { fondo: fondo5, lado: "izquierdo" },
    { fondo: fondo6, lado: "derecho" },
    { fondo: fondo1, lado: "derecho" },
    { fondo: fondo2, lado: "izquierdo" },
    { fondo: fondo3, lado: "izquierdo" },
    { fondo: fondo4, lado: "derecho" },
    { fondo: fondo5, lado: "izquierdo" },
    { fondo: fondo6, lado: "derecho" },
  ];

  // 🎵 Sonidos
  const sonidoPagina = useRef(new Audio("/libros/sonidos/pagina.m4a"));
  const sonidoPortada = useRef(new Audio("/libros/sonidos/portada.m4a"));
  const sonidoContraportada = useRef(new Audio("/libros/sonidos/portada.m4a"));

  useEffect(() => {
    sonidoPagina.current.volume = 0.6;
    sonidoPortada.current.volume = 1.0;
    sonidoContraportada.current.volume = 1.0;
  }, []);

  // 📏 Ajustar tamaño del libro según pantalla
  useEffect(() => {
    const updateBookSize = () => {
      const availableWidth = window.innerWidth * 0.9;
      const availableHeight = window.innerHeight * 0.82;
      const aspectRatio = 800 / 1200;
      let width = availableWidth;
      let height = width / aspectRatio;
      if (height > availableHeight) {
        height = availableHeight;
        width = height * aspectRatio;
      }
      setBookSize({ width, height });
    };

    updateBookSize();
    window.addEventListener("resize", updateBookSize);
    return () => window.removeEventListener("resize", updateBookSize);
  }, []);

  // 🧮 Seleccionar aleatoriamente hasta 10 páginas alternando, empezando por derecha
  useEffect(() => {
    const izquierdas = HOJAS_CONFIG.filter((h) => h.lado === "izquierdo");
    const derechas = HOJAS_CONFIG.filter((h) => h.lado === "derecho");

    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
    const seleccionIzq = shuffle(izquierdas).slice(0, 5);
    const seleccionDer = shuffle(derechas).slice(0, 5);

    const paginasOrdenadas = [];
    const maxPares = Math.max(seleccionIzq.length, seleccionDer.length);

    // 🔸 Siempre comenzar con una página derecha
    for (let i = 0; i < maxPares; i++) {
      if (seleccionDer[i]) paginasOrdenadas.push(seleccionDer[i]);
      if (seleccionIzq[i]) paginasOrdenadas.push(seleccionIzq[i]);
    }

    setPaginas(paginasOrdenadas.slice(0, 10)); // Máximo 10 internas
  }, []);

  // 🎧 Manejo de sonidos
  const handleFlip = (e) => {
    const index = e.data;
    const direction = index > lastPage ? "forward" : "backward";
    setLastPage(index);

    [sonidoPagina, sonidoPortada, sonidoContraportada].forEach((s) => {
      try {
        s.current.pause();
        s.current.currentTime = 0;
      } catch {}
    });

    if (index === 0 && direction === "backward") {
      sonidoContraportada.current.play().catch(() => {});
    } 
    else if (index === 0 && direction === "forward") {
      sonidoPortada.current.play().catch(() => {});
    } 
    else if (index === 1) {
      if (direction === "forward") {
        sonidoPortada.current.play().catch(() => {});
      } else {
        sonidoPagina.current.play().catch(() => {});
      }
    } 
    else if (index === paginas.length + 3 && direction === "forward") {
      sonidoContraportada.current.play().catch(() => {});
    } 
    else if (index === paginas.length + 1 && direction === "backward") {
      sonidoContraportada.current.play().catch(() => {});
    } 
    else {
      sonidoPagina.current.play().catch(() => {});
    }
  };

  // 🧾 Render
  return (
    <PageWrapper>
      <div
        className="relative h-screen w-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${fondoLibro})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <HTMLFlipBook
          ref={flipBookRef}
          width={bookSize.width}
          height={bookSize.height}
          size="fixed"
          showCover
          drawShadow
          maxShadowOpacity={0.5}
          onFlip={handleFlip}
          style={{ backgroundColor: "transparent" }}
        >
          {/* 🟦 Portada */}
          <div className="page">
            <img
              src={portadaImg}
              alt="Portada"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 🟨 Primera página */}
          <div className="page relative">
            <img
              src={primeraPaginaImg}
              alt="Primera página"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* 📖 Páginas internas (máx. 10, empezando con derecha) */}
          {paginas.map((p, i) => (
            <div key={i} className="page">
              <img
                src={p.fondo}
                alt={`Página ${i + 1} (${p.lado})`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* 🟪 Última página */}
          <div className="page">
            <img
              src={ultimaPaginaImg}
              alt="Última página"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 🟥 Contraportada */}
          <div className="page">
            <img
              src={contraportadaImg}
              alt="Contraportada"
              className="w-full h-full object-cover"
            />
          </div>
        </HTMLFlipBook>
      </div>
    </PageWrapper>
  );
}

export default LibroFrases;
