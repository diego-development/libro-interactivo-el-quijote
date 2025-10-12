import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import PageWrapper from "../../PageWrapper";
import fondoLibro from "../../../assets/fondo-libro.png";
import PaginaReseñas from "./PaginaReseñas";

// 🖼️ Imágenes
import portadaImg from "../../../assets/LibroEjercicios/portada.png";
import contraportadaImg from "../../../assets/LibroReseñas/contraportada.png";
import primeraPaginaImg from "../../../assets/LibroReseñas/primeraPagina.png";
import ultimaPaginaImg from "../../../assets/LibroReseñas/ultimaPagina.png";
import hojaFrenteImg from "../../../assets/LibroReseñas/hojaFrente.png";
import hojaReversoImg from "../../../assets/LibroReseñas/hojaReverso.png";

// 🎵 Sonidos
import sonidoPaginaSrc from "../../../assets/sonidos/pagina.m4a";
import sonidoPortadaSrc from "../../../assets/sonidos/portada.m4a";
import sonidoContraportadaSrc from "../../../assets/sonidos/portada.m4a";

function LibroReseñas({ maxHojas = 2 }) {
  const [bookSize, setBookSize] = useState({ width: 800, height: 1200 });
  const [reseñas, setReseñas] = useState([]);
  const [paginas, setPaginas] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const flipBookRef = useRef(null);

  const sonidoPagina = useRef(new Audio(sonidoPaginaSrc));
  const sonidoPortada = useRef(new Audio(sonidoPortadaSrc));
  const sonidoContraportada = useRef(new Audio(sonidoContraportadaSrc));

  useEffect(() => {
    sonidoPagina.current.volume = 0.6;
    sonidoPortada.current.volume = 1.0;
    sonidoContraportada.current.volume = 1.0;
  }, []);

  // 📥 Cargar reseñas aleatorias
  useEffect(() => {
    fetch("/reseñas.json")
      .then((res) => res.json())
      .then((data) => {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setReseñas(shuffled);
      })
      .catch((err) => console.error("Error cargando reseñas:", err));
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

  // 📄 Distribuir reseñas en hojas internas + página adicional
  useEffect(() => {
    if (reseñas.length === 0) return;

    const altura = bookSize.height;
    const porPagina = altura < 900 ? 3 : altura < 1100 ? 4 : 5;

    // Si hay pocas reseñas, no generar hojas internas, pero sí página adicional
    if (reseñas.length <= porPagina) {
      setPaginas([]);
      return;
    }

    // Dividir reseñas en grupos para hojas internas
    const grupos = [];
    for (let i = 0; i < reseñas.length; i += porPagina) {
      grupos.push(reseñas.slice(i, i + porPagina));
    }

    // Limitar según hojas máximas (cada hoja = 2 páginas)
    let paginasLimitadas = grupos.slice(0, maxHojas * 2);

    // Si el número es impar, agregamos una página vacía (mantener paridad)
    if (paginasLimitadas.length % 2 !== 0) {
      paginasLimitadas.push([]);
    }

    setPaginas(paginasLimitadas);
  }, [reseñas, bookSize, maxHojas]);

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

  if (reseñas.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-900 text-white text-2xl">
        Cargando reseñas...
      </div>
    );
  }

  // ✅ Preparar páginas de reseñas
  const paginasInternas =
    paginas.length > 0
      ? paginas.map((grupo, i) => (
          <PaginaReseñas
            key={i}
            grupo={grupo}
            imagenFondo={i % 2 === 0 ? hojaFrenteImg : hojaReversoImg}
            bookSize={bookSize}
          />
        ))
      : [];

  // ✅ Página adicional con reseñas (siempre se muestra)
  const paginaAdicional = (
    <PaginaReseñas
      key="extra"
      grupo={reseñas.slice(0, 5)} // muestra hasta 5 comentarios
      imagenFondo={ultimaPaginaImg}
      bookSize={bookSize}
    />
  );

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

          {/* 🟨 Primera página (sin reseñas) */}
          <div className="page relative">
            <img
              src={primeraPaginaImg}
              alt="Primera página"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* 📖 Hojas internas (si hay reseñas suficientes) */}
          {paginasInternas}

          {/* 🟪 Página adicional (siempre con comentarios) */}
          {paginaAdicional}

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

export default LibroReseñas;
