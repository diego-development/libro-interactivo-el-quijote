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

// 🎥 Fondos, vídeos y marcos
import fondo1 from "../../../assets/LibroPersonajes/fondos/fondo1.png";
import fondo2 from "../../../assets/LibroPersonajes/fondos/fondo1.png";
import fondo3 from "../../../assets/LibroPersonajes/fondos/fondo1.png";

import fondoVideo1 from "../../../assets/LibroPersonajes/fondos/fondo2.png";
import fondoVideo2 from "../../../assets/LibroPersonajes/fondos/fondo2.png";
import fondoVideo3 from "../../../assets/LibroPersonajes/fondos/fondo2.png";

import video1 from "../../../assets/LibroPersonajes/videos/video1.mp4";
import video2 from "../../../assets/LibroPersonajes/videos/video1.mp4";
import video3 from "../../../assets/LibroPersonajes/videos/video1.mp4";

import marco1 from "../../../assets/LibroPersonajes/marco-transparente.png";
import marco2 from "../../../assets/LibroPersonajes/marco-transparente.png";
import marco3 from "../../../assets/LibroPersonajes/marco-transparente.png";

function LibroPersonajes() {
  const [bookSize, setBookSize] = useState({ width: 800, height: 1200 });
  const [lastPage, setLastPage] = useState(0);
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

  // 📖 Lista de personajes (fondo + fondoVideo + video + marcoVideo)
  const personajes = [
    { fondo: fondo1, fondoVideo: fondoVideo1, video: video1, marcoVideo: marco1 },
    { fondo: fondo2, fondoVideo: fondoVideo2, video: video2, marcoVideo: marco2 },
    { fondo: fondo3, fondoVideo: fondoVideo3, video: video3, marcoVideo: marco3 },
  ];

  // 📏 Ajustar tamaño del libro al viewport
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
     
    else {
      sonidoPagina.current.play().catch(() => {});
    }
  };

  // 📖 Render del libro
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
            // 📘 Página izquierda: fondo decorativo
            <div
              key={`fondo-${i}`}
              className="page relative h-full w-full overflow-hidden"
            >
              <img
                src={p.fondo}
                alt={`Fondo personaje ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>,

            // 📙 Página derecha: fondoVideo + video + marcoVideo
            <div
              key={`video-${i}`}
              className="page relative h-full w-full overflow-hidden flex items-center justify-center"
            >
              {/* Fondo detrás del video */}
              <img
                src={p.fondoVideo}
                alt={`Fondo del video ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover z-0"
              />

              {/* 🎥 Video */}
              <video
                src={p.video}
                muted
                loop
                playsInline
                autoPlay
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

              {/* 🖼️ Marco del video */}
              <img
                src={p.marcoVideo}
                alt={`Marco video ${i + 1}`}
                className="absolute inset-0 h-full w-full object-contain z-10 pointer-events-none"
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
