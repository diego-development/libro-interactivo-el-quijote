import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from "react-pageflip";
import './LibroReseñas.css';
import PageWrapper from '../PageWrapper';
import fondoLibro from '../../assets/fondo-libro.png';
import PaginaReseñas from './PaginaReseñas';

function LibroReseñas() {
  const [bookSize, setBookSize] = useState({ width: 800, height: 1200 });
  const [reseñas, setReseñas] = useState([]);
  const [paginas, setPaginas] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const flipBookRef = useRef(null);

  // 🎵 Sonidos
  const sonidoPagina = useRef(new Audio("/libros/sonidos/pagina.m4a"));
  const sonidoPortada = useRef(new Audio("/libros/sonidos/portada.m4a"));
  const sonidoContraportada = useRef(new Audio("/libros/sonidos/portada.m4a"));

  useEffect(() => {
    sonidoPagina.current.volume = 0.6;
    sonidoPortada.current.volume = 1.0;
    sonidoContraportada.current.volume = 1.0;
  }, []);

  // 📚 Imágenes del libro
  const imagenesLibro = {
    portada: "/libros/frases/portada.png",
    contraportada: "/libros/frases/contraportada.png",
    primeraPagina: "/libros/frases/pagina3.png",
    ultimaPagina: "/libros/frases/pagina4.png",
    hojaFrente: "/libros/frases/pagina4.png",
    hojaReverso: "/libros/frases/pagina3.png",
  };

  // 📥 Cargar reseñas
  useEffect(() => {
    fetch('/reseñas.json')
      .then(res => res.json())
      .then(data => setReseñas(data))
      .catch(err => console.error('Error cargando reseñas:', err));
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

  // 📄 Agrupar reseñas (3 o 4 por página según ancho)
  useEffect(() => {
    if (reseñas.length === 0) return;

    const ancho = window.innerWidth;
    const porPagina = ancho < 900 ? 3 : 4;
    const nuevasPaginas = [];

    for (let i = 0; i < reseñas.length; i += porPagina) {
      nuevasPaginas.push(reseñas.slice(i, i + porPagina));
    }

    // Asegurar número par de páginas
    if (nuevasPaginas.length % 2 !== 0) nuevasPaginas.push([]);

    setPaginas(nuevasPaginas);
  }, [reseñas]);

  // 🎧 Manejo de sonidos con dirección
  const handleFlip = (e) => {
    const index = e.data;
    const direction = index > lastPage ? "forward" : "backward";
    setLastPage(index);

    // detener cualquier sonido anterior
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

  // ⏳ Pantalla de carga
  if (reseñas.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-900 text-white text-2xl">
        Cargando reseñas...
      </div>
    );
  }

  // 📖 Render principal
  return (
    <PageWrapper>
      <div
        className="relative h-screen w-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${fondoLibro})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <HTMLFlipBook
          ref={flipBookRef}
          width={bookSize.width}
          height={bookSize.height}
          size="fixed"
          maxShadowOpacity={0.5}
          drawShadow
          showCover
          onFlip={handleFlip}
          style={{ backgroundColor: 'transparent' }}
        >
          {/* 🟦 Portada */}
          <div className="page flex items-center justify-center">
            <img
              src={imagenesLibro.portada}
              alt="Portada"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 🟨 Primera página */}
          <div className="page flex items-center justify-center relative">
            <img
              src={imagenesLibro.primeraPagina}
              alt="Primera página"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="relative z-10 text-center text-[#333] font-[Caveat] text-3xl opacity-80 px-4">
              <p>“Aquí comienzan las historias...”</p>
            </div>
          </div>

          {/* 📄 Páginas con reseñas */}
          {paginas.map((grupo, index) => (
            <PaginaReseñas
              key={index}
              grupo={grupo}
              imagenFondo={
                index % 2 === 0
                  ? imagenesLibro.hojaFrente
                  : imagenesLibro.hojaReverso
              }
              bookSize={bookSize}
            />
          ))}

          {/* 🟪 Última página */}
          <div className="page flex items-center justify-center">
            <img
              src={imagenesLibro.ultimaPagina}
              alt="Última página"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 🟥 Contraportada */}
          <div className="page flex items-center justify-center">
            <img
              src={imagenesLibro.contraportada}
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
