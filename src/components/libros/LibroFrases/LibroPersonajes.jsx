import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import PageWrapper from "../../PageWrapper";
import fondoLibro from "../../../assets/fondo-libro.png";

// 🎵 Sonidos
import sonidoPaginaSrc from "../../../assets/sonidos/pagina.m4a";
import sonidoPortadaSrc from "../../../assets/sonidos/portada.m4a";
import sonidoContraportadaSrc from "../../../assets/sonidos/portada.m4a";

// 📕 Imágenes del libro
import portadaImg from "../../../assets/LibroPersonajes/portada.png";
import contraportadaImg from "../../../assets/LibroPersonajes/contraportada.png";

// 🎥 Fondos y vídeos
import fondo1 from "../../../assets/LibroPersonajes/fondo1.png";
import video1 from "../../../assets/LibroPersonajes/video1.mp4";
import marco from "../../../assets/LibroPersonajes/marco.png";
import video2 from "../../../assets/LibroPersonajes/video1.mp4";

function LibroPersonajes() {
  const [bookSize, setBookSize] = useState({ width: 800, height: 1200 });
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const flipBookRef = useRef(null);

  // 🔊 Sonidos
  const sonidoPagina = useRef(new Audio(sonidoPaginaSrc));
  const sonidoPortada = useRef(new Audio(sonidoPortadaSrc));
  const sonidoContraportada = useRef(new Audio(sonidoContraportadaSrc));

  useEffect(() => {
    sonidoPagina.current.volume = 0.6;
    sonidoPortada.current.volume = 1.0;
    sonidoContraportada.current.volume = 1.0;
  }, []);

  const personajes = [
    { fondo: fondo1, fondoVideo: marco, video: video1 },
    { fondo: fondo1, fondoVideo: marco, video: video2 },
    { fondo: fondo1, fondoVideo: marco, video: video2 },
    { fondo: fondo1, fondoVideo: marco, video: video2 },
    { fondo: fondo1, fondoVideo: marco, video: video2 },
    { fondo: fondo1, fondoVideo: marco, video: video2 },
  ];

  // 📏 Ajustar tamaño del libro
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

  // 📖 Lógica de sonidos igual a LibroEjercicios
  const handleFlip = (e) => {
    const index = e.data;
    const direction = index > lastPage ? "forward" : "backward";
    setLastPage(index);
    setCurrentPage(index);

    // detener sonidos previos
    [sonidoPagina, sonidoPortada, sonidoContraportada].forEach((s) => {
      try {
        s.current.pause();
        s.current.currentTime = 0;
      } catch {}
    });

    const totalPages = personajes.length * 2 + 2;
    const lastIndex = totalPages - 1;

    if (index === 0 && direction === "forward") {
      sonidoPortada.current.play().catch(() => {});
    } else if (index === lastIndex && direction === "forward") {
      sonidoContraportada.current.play().catch(() => {});
    } else if (index === 0 && direction === "backward") {
      sonidoContraportada.current.play().catch(() => {});
    } else {
      sonidoPagina.current.play().catch(() => {});
    }
  };

  // 🧠 función auxiliar: índice real de la página del video
  const getVideoPageIndex = (i) => 2 + i * 2; // portada=0, fondo=1, video=2, fondo=3, video=4, etc.

  // 📖 Render
  return (
    <PageWrapper>
      <div
        className="relative flex items-center justify-center h-screen w-screen overflow-hidden"
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
          style={{
            backgroundColor: "transparent",
            isolation: "isolate",
            overflow: "hidden",
          }}
        >
          {/* 🟦 Portada */}
          <div className="page relative h-full w-full overflow-hidden">
            <img
              src={portadaImg}
              alt="Portada personajes"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* 🔹 Páginas de personajes */}
          {personajes.flatMap((p, i) => [
            // 📘 Página izquierda
            <div
              key={`fondo-${i}`}
              className="page relative h-full w-full overflow-hidden"
            >
              <img
                src={p.fondo}
                alt={`Personaje ${i + 1} fondo`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>,

            // 📙 Página derecha con video
            <div
              key={`video-${i}`}
              className="page relative h-full w-full overflow-hidden flex items-center justify-center"
            >
              <img
                src={p.fondoVideo}
                alt={`Marco video ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover z-0"
              />
              <video
                src={p.video}
                muted
                loop
                playsInline
                autoPlay={true}
                className="absolute object-contain"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "78%",
                  height: "78%",
                  maxWidth: "85%",
                  maxHeight: "85%",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              />
            </div>,
          ])}

          {/* 🟥 Contraportada */}
          <div className="page relative h-full w-full overflow-hidden">
            <img
              src={contraportadaImg}
              alt="Contraportada personajes"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </HTMLFlipBook>
      </div>
    </PageWrapper>
  );
}

export default LibroPersonajes;
