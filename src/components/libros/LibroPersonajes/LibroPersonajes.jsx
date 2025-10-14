import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import PageWrapper from "../../PageWrapper";
import fondoLibro from "../../../assets/fondo-libro.png";

import sonidoPaginaSrc from "../../../assets/sonidos/pagina.m4a";
import sonidoPortadaSrc from "../../../assets/sonidos/portada.m4a";
import sonidoContraportadaSrc from "../../../assets/sonidos/portada.m4a";

import portadaImg from "../../../assets/LibroPersonajes/portada.png";
import contraportadaImg from "../../../assets/LibroPersonajes/contraportada.png";

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
  const flipBookRef = useRef(null);
  const videoRefs = useRef([]);

  // 🎵 Sonidos
  const sonidoPagina = useRef(new Audio(sonidoPaginaSrc));
  const sonidoPortada = useRef(new Audio(sonidoPortadaSrc));
  const sonidoContraportada = useRef(new Audio(sonidoContraportadaSrc));

  useEffect(() => {
    sonidoPagina.current.volume = 0.6;
    sonidoPortada.current.volume = 1.0;
    sonidoContraportada.current.volume = 1.0;
  }, []);

  // 📖 Lista de personajes
  const personajes = [
    { fondo: fondo1, video: video1 },
    { fondo: fondo2, video: video2 },
    { fondo: fondo3, video: video3 },
    { fondo: fondo4, video: video4 },
    { fondo: fondo5, video: video5 },
    { fondo: fondo6, video: video6 },
    { fondo: fondo7, video: video7 },
    { fondo: fondo8, video: video8 },
    { fondo: fondo9, video: video9 },
    { fondo: fondo10, video: video10 },
    { fondo: fondo11, video: video11 },
    { fondo: fondo12, video: video12 },
    { fondo: fondo13, video: video13 },
    { fondo: fondo14, video: video14 },
    { fondo: fondo15, video: video15 },
    { fondo: fondo16, video: video16 },
    { fondo: fondo17, video: video17 },
    { fondo: fondo18, video: video18 },
    { fondo: fondo19, video: video19 },
    { fondo: fondo20, video: video20 },
  ].map((p) => ({ ...p, fondoVideo, marcoVideo: marco }));

  const totalPaginas = 1 + personajes.length * 2 + 1;

  // 📏 Ajuste responsivo
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

  // 🚀 Precarga solo el primer video al cargar la página
  useEffect(() => {
    const first = videoRefs.current[0];
    if (first) {
      first.preload = "auto";
      first.oncanplaythrough = () => {
        first.play().catch(() => {});
      };
    }
  }, []);

  // 🎧 Sonidos + control de videos
  const handleFlip = (e) => {
    const index = e.data;
    const direction = index > lastPage ? "forward" : "backward";
    setLastPage(index);

    // 🎵 Sonidos
    [sonidoPagina, sonidoPortada, sonidoContraportada].forEach((s) => {
      try {
        s.current.pause();
        s.current.currentTime = 0;
      } catch {}
    });

    if (index === 0 && direction === "backward") {
      sonidoContraportada.current.play().catch(() => {});
    } else if (index === 0 && direction === "forward") {
      sonidoPortada.current.play().catch(() => {});
    } else if (index === 1) {
      if (direction === "forward") {
        sonidoPortada.current.play().catch(() => {});
      } else {
        sonidoPagina.current.play().catch(() => {});
      }
    } else if (index === totalPaginas - 3 && direction === "backward") {
      sonidoContraportada.current.play().catch(() => {});
    } else if (index === totalPaginas - 1 && direction === "forward") {
      sonidoContraportada.current.play().catch(() => {});
    } else {
      sonidoPagina.current.play().catch(() => {});
    }

    // 🧩 Control de videos mejorado
    const videoIndex = Math.floor((index - 1) / 2);
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === videoIndex || i === videoIndex + 1) {
        vid.currentTime = 0; // 🔁 Reinicia el video cada vez que aparece
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  };

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
          style={{ backgroundColor: "transparent" }}
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
            <div key={`fondo-${i}`} className="page relative h-full w-full overflow-hidden">
              <img
                src={p.fondo}
                alt={`Fondo personaje ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>,
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
                ref={(el) => (videoRefs.current[i] = el)}
                src={p.video}
                muted
                loop
                playsInline
                preload={i === 0 ? "auto" : "none"} // 🟩 Solo el primero se precarga
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
                onEnded={(e) => e.target.play()} // 🔁 En caso de que se detenga
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
