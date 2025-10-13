import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import PageWrapper from "../../PageWrapper";
import fondoLibro from "../../../assets/fondo-libro.png";

// 🖼️ Imágenes base del libro
import portadaImg from "../../../assets/LibroFrases/portada.png";
import contraportadaImg from "../../../assets/LibroFrases/contraportada.png";
import primeraPaginaImg from "../../../assets/LibroFrases/primeraPagina.png";
import ultimaPaginaImg from "../../../assets/LibroFrases/ultimaPagina.png";


// Imágenes de frases de Quijote
import quijote1Der from "../../../assets/LibroFrases/frases/quijote-1-der.png";
import quijote1Izq from "../../../assets/LibroFrases/frases/quijote-1-izq.png";
import quijote2Der from "../../../assets/LibroFrases/frases/quijote-2-der.png";
import quijote2Izq from "../../../assets/LibroFrases/frases/quijote-2-izq.png";
import quijote3Der from "../../../assets/LibroFrases/frases/quijote-3-der.png";
import quijote3Izq from "../../../assets/LibroFrases/frases/quijote-3-izq.png";
import quijote4Der from "../../../assets/LibroFrases/frases/quijote-4-der.png";
import quijote4Izq from "../../../assets/LibroFrases/frases/quijote-4-izq.png";
import quijote5Der from "../../../assets/LibroFrases/frases/quijote-5-der.png";
import quijote5Izq from "../../../assets/LibroFrases/frases/quijote-5-izq.png";
import quijote6Der from "../../../assets/LibroFrases/frases/quijote-6-der.png";
import quijote6Izq from "../../../assets/LibroFrases/frases/quijote-6-izq.png";
import quijote7Der from "../../../assets/LibroFrases/frases/quijote-7-der.png";
import quijote7Izq from "../../../assets/LibroFrases/frases/quijote-7-izq.png";
import quijote8Der from "../../../assets/LibroFrases/frases/quijote-8-der.png";
import quijote8Izq from "../../../assets/LibroFrases/frases/quijote-8-izq.png";
import quijote9Der from "../../../assets/LibroFrases/frases/quijote-9-der.png";
import quijote9Izq from "../../../assets/LibroFrases/frases/quijote-9-izq.png";
import quijote10Der from "../../../assets/LibroFrases/frases/quijote-10-der.png";
import quijote10Izq from "../../../assets/LibroFrases/frases/quijote-10-izq.png";
import quijote11Der from "../../../assets/LibroFrases/frases/quijote-11-der.png";
import quijote11Izq from "../../../assets/LibroFrases/frases/quijote-11-izq.png";
import quijote12Der from "../../../assets/LibroFrases/frases/quijote-12-der.png";
import quijote12Izq from "../../../assets/LibroFrases/frases/quijote-12-izq.png";
import quijote13Izq from "../../../assets/LibroFrases/frases/quijote-13-izq.png";

// Imágenes de frases de Sancho
import sancho1Der from "../../../assets/LibroFrases/frases/sancho-1-der.png";
import sancho1Izq from "../../../assets/LibroFrases/frases/sancho-1-izq.png";
import sancho2Der from "../../../assets/LibroFrases/frases/sancho-2-der.png";
import sancho2Izq from "../../../assets/LibroFrases/frases/sancho-2-izq.png";
import sancho3Der from "../../../assets/LibroFrases/frases/sancho-3-der.png";
import sancho3Izq from "../../../assets/LibroFrases/frases/sancho-3-izq.png";
import sancho4Der from "../../../assets/LibroFrases/frases/sancho-4-der.png";
import sancho4Izq from "../../../assets/LibroFrases/frases/sancho-4-izq.png";
import sancho5Der from "../../../assets/LibroFrases/frases/sancho-5-der.png";
import sancho5Izq from "../../../assets/LibroFrases/frases/sancho-5-izq.png";
import sancho6Der from "../../../assets/LibroFrases/frases/sancho-6-der.png";
import sancho6Izq from "../../../assets/LibroFrases/frases/sancho-6-izq.png";
import sancho7Der from "../../../assets/LibroFrases/frases/sancho-7-der.png";
import sancho7Izq from "../../../assets/LibroFrases/frases/sancho-7-izq.png";
import sancho8Der from "../../../assets/LibroFrases/frases/sancho-8-der.png";
import sancho8Izq from "../../../assets/LibroFrases/frases/sancho-8-izq.png";
import sancho9Der from "../../../assets/LibroFrases/frases/sancho-9-der.png";
import sancho9Izq from "../../../assets/LibroFrases/frases/sancho-9-izq.png";
import sancho10Der from "../../../assets/LibroFrases/frases/sancho-10-der.png";
import sancho10Izq from "../../../assets/LibroFrases/frases/sancho-10-izq.png";
import sancho11Der from "../../../assets/LibroFrases/frases/sancho-11-der.png";
import sancho11Izq from "../../../assets/LibroFrases/frases/sancho-11-izq.png";
import sancho12Der from "../../../assets/LibroFrases/frases/sancho-12-der.png";
import sancho12Izq from "../../../assets/LibroFrases/frases/sancho-12-izq.png";
import sancho13Izq from "../../../assets/LibroFrases/frases/sancho-13-izq.png";

// 🎵 Sonidos
import sonidoPaginaSrc from "../../../assets/sonidos/pagina.m4a";
import sonidoPortadaSrc from "../../../assets/sonidos/portada.m4a";
import sonidoContraportadaSrc from "../../../assets/sonidos/portada.m4a";

function LibroFrases() {
  const [bookSize, setBookSize] = useState({ width: 800, height: 1200 });
  const [paginas, setPaginas] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const flipBookRef = useRef(null);

  // 🔹 Todas las hojas posibles
const HOJAS_CONFIG = [

  // Quijote
  { fondo: quijote1Der, lado: "derecho" },
  { fondo: quijote1Izq, lado: "izquierdo" },
  { fondo: quijote2Der, lado: "derecho" },
  { fondo: quijote2Izq, lado: "izquierdo" },
  { fondo: quijote3Der, lado: "derecho" },
  { fondo: quijote3Izq, lado: "izquierdo" },
  { fondo: quijote4Der, lado: "derecho" },
  { fondo: quijote4Izq, lado: "izquierdo" },
  { fondo: quijote5Der, lado: "derecho" },
  { fondo: quijote5Izq, lado: "izquierdo" },
  { fondo: quijote6Der, lado: "derecho" },
  { fondo: quijote6Izq, lado: "izquierdo" },
  { fondo: quijote7Der, lado: "derecho" },
  { fondo: quijote7Izq, lado: "izquierdo" },
  { fondo: quijote8Der, lado: "derecho" },
  { fondo: quijote8Izq, lado: "izquierdo" },
  { fondo: quijote9Der, lado: "derecho" },
  { fondo: quijote9Izq, lado: "izquierdo" },
  { fondo: quijote10Der, lado: "derecho" },
  { fondo: quijote10Izq, lado: "izquierdo" },
  { fondo: quijote11Der, lado: "derecho" },
  { fondo: quijote11Izq, lado: "izquierdo" },
  { fondo: quijote12Der, lado: "derecho" },
  { fondo: quijote12Izq, lado: "izquierdo" },
  { fondo: quijote13Izq, lado: "izquierdo" },

  // Sancho
  { fondo: sancho1Der, lado: "derecho" },
  { fondo: sancho1Izq, lado: "izquierdo" },
  { fondo: sancho2Der, lado: "derecho" },
  { fondo: sancho2Izq, lado: "izquierdo" },
  { fondo: sancho3Der, lado: "derecho" },
  { fondo: sancho3Izq, lado: "izquierdo" },
  { fondo: sancho4Der, lado: "derecho" },
  { fondo: sancho4Izq, lado: "izquierdo" },
  { fondo: sancho5Der, lado: "derecho" },
  { fondo: sancho5Izq, lado: "izquierdo" },
  { fondo: sancho6Der, lado: "derecho" },
  { fondo: sancho6Izq, lado: "izquierdo" },
  { fondo: sancho7Der, lado: "derecho" },
  { fondo: sancho7Izq, lado: "izquierdo" },
  { fondo: sancho8Der, lado: "derecho" },
  { fondo: sancho8Izq, lado: "izquierdo" },
  { fondo: sancho9Der, lado: "derecho" },
  { fondo: sancho9Izq, lado: "izquierdo" },
  { fondo: sancho10Der, lado: "derecho" },
  { fondo: sancho10Izq, lado: "izquierdo" },
  { fondo: sancho11Der, lado: "derecho" },
  { fondo: sancho11Izq, lado: "izquierdo" },
  { fondo: sancho12Der, lado: "derecho" },
  { fondo: sancho12Izq, lado: "izquierdo" },
  { fondo: sancho13Izq, lado: "izquierdo" }
];

  // 🎵 Sonidos
  const sonidoPagina = useRef(new Audio(sonidoPaginaSrc));
  const sonidoPortada = useRef(new Audio(sonidoPortadaSrc));
  const sonidoContraportada = useRef(new Audio(sonidoContraportadaSrc));

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
