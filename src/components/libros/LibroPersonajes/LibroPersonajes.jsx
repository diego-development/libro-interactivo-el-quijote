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

// 🎥 Fondos
import fondo1 from "../../../assets/LibroPersonajes/personajes/1.png";
import fondo2 from "../../../assets/LibroPersonajes/personajes/2.png";
import fondo3 from "../../../assets/LibroPersonajes/personajes/3.png";
import fondo4 from "../../../assets/LibroPersonajes/personajes/4.png";
import fondo5 from "../../../assets/LibroPersonajes/personajes/5.png";
import fondo6 from "../../../assets/LibroPersonajes/personajes/6.png";
import fondo7 from "../../../assets/LibroPersonajes/personajes/7.png";
import fondo8 from "../../../assets/LibroPersonajes/personajes/8.png";
import fondo9 from "../../../assets/LibroPersonajes/personajes/9.png";
import fondo10 from "../../../assets/LibroPersonajes/personajes/10.png";
import fondo11 from "../../../assets/LibroPersonajes/personajes/11.png";
import fondo12 from "../../../assets/LibroPersonajes/personajes/12.png";
import fondo13 from "../../../assets/LibroPersonajes/personajes/13.png";
import fondo14 from "../../../assets/LibroPersonajes/personajes/14.png";
import fondo15 from "../../../assets/LibroPersonajes/personajes/15.png";
import fondo16 from "../../../assets/LibroPersonajes/personajes/16.png";
import fondo17 from "../../../assets/LibroPersonajes/personajes/17.png";
import fondo18 from "../../../assets/LibroPersonajes/personajes/18.png";
import fondo19 from "../../../assets/LibroPersonajes/personajes/19.png";
import fondo20 from "../../../assets/LibroPersonajes/personajes/20.png";

import fondoVideo from "../../../assets/LibroPersonajes/fondo-video.png";
import marco from "../../../assets/LibroPersonajes/marco-transparente.png";

// 🎞️ Videos
import video1 from "../../../assets/LibroPersonajes/videos/1.mp4";
import video2 from "../../../assets/LibroPersonajes/videos/2.mp4";
import video3 from "../../../assets/LibroPersonajes/videos/3.mp4";
import video4 from "../../../assets/LibroPersonajes/videos/4.mp4";
import video5 from "../../../assets/LibroPersonajes/videos/5.mp4";
import video6 from "../../../assets/LibroPersonajes/videos/6.mp4";
import video7 from "../../../assets/LibroPersonajes/videos/7.mp4";
import video8 from "../../../assets/LibroPersonajes/videos/8.mp4";
import video9 from "../../../assets/LibroPersonajes/videos/9.mp4";
import video10 from "../../../assets/LibroPersonajes/videos/10.mp4";
import video11 from "../../../assets/LibroPersonajes/videos/11.mp4";
import video12 from "../../../assets/LibroPersonajes/videos/12.mp4";
import video13 from "../../../assets/LibroPersonajes/videos/13.mp4";
import video14 from "../../../assets/LibroPersonajes/videos/14.mp4";
import video15 from "../../../assets/LibroPersonajes/videos/15.mp4";
import video16 from "../../../assets/LibroPersonajes/videos/16.mp4";
import video17 from "../../../assets/LibroPersonajes/videos/17.mp4";
import video18 from "../../../assets/LibroPersonajes/videos/18.mp4";
import video19 from "../../../assets/LibroPersonajes/videos/19.mp4";
import video20 from "../../../assets/LibroPersonajes/videos/20.mp4";



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

  // 📖 Lista completa de personajes
  const personajes = [
    { fondo: fondo1, fondoVideo, video: video1, marcoVideo: marco },
    { fondo: fondo2, fondoVideo, video: video2, marcoVideo: marco },
    { fondo: fondo3, fondoVideo, video: video3, marcoVideo: marco },
    { fondo: fondo4, fondoVideo, video: video4, marcoVideo: marco },
    { fondo: fondo5, fondoVideo, video: video5, marcoVideo: marco },
    { fondo: fondo6, fondoVideo, video: video6, marcoVideo: marco },
    { fondo: fondo7, fondoVideo, video: video7, marcoVideo: marco },
    { fondo: fondo8, fondoVideo, video: video8, marcoVideo: marco },
    { fondo: fondo9, fondoVideo, video: video9, marcoVideo: marco },
    { fondo: fondo10, fondoVideo, video: video10, marcoVideo: marco },
    { fondo: fondo11, fondoVideo, video: video11, marcoVideo: marco },
    { fondo: fondo12, fondoVideo, video: video12, marcoVideo: marco },
    { fondo: fondo13, fondoVideo, video: video13, marcoVideo: marco },
    { fondo: fondo14, fondoVideo, video: video14, marcoVideo: marco },
    { fondo: fondo15, fondoVideo, video: video15, marcoVideo: marco },
    { fondo: fondo16, fondoVideo, video: video16, marcoVideo: marco },
    { fondo: fondo17, fondoVideo, video: video17, marcoVideo: marco },
    { fondo: fondo18, fondoVideo, video: video18, marcoVideo: marco },
    { fondo: fondo19, fondoVideo, video: video19, marcoVideo: marco },
    { fondo: fondo20, fondoVideo, video: video20, marcoVideo: marco },
  ];

  const totalPaginas = 1 + personajes.length * 2 + 1;
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

    if (index === 0 && direction === "backward") {
      sonidoContraportada.current.play().catch(() => { });
    } else if (index === 0 && direction === "forward") {
      sonidoPortada.current.play().catch(() => { });
    } else if (index === 1) {
      if (direction === "forward") {
        sonidoPortada.current.play().catch(() => { });
      } else {
        sonidoPagina.current.play().catch(() => { });
      }
    } else if (index === totalPaginas - 3 && direction === "backward") {
      sonidoContraportada.current.play().catch(() => { });
    } else if (index === totalPaginas - 1 && direction === "forward") {
      sonidoContraportada.current.play().catch(() => { });
    } else {
      sonidoPagina.current.play().catch(() => { });
    }
  };

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
            // 📘 Página izquierda (fondo)
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
                alt={`Fondo video ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover z-0"
              />
              <video
                src={p.video}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                disablePictureInPicture
                controls={false}
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
