import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from "react-pageflip";
import '../LibroReseñas.css';
import PageWrapper from '../../PageWrapper';
import fondoLibro from '../../../assets/fondo-libro.png';
import PaginaEjercicios from './PaginaEjercicios';

import sonidoPaginaSrc from '../../../assets/sonidos/pagina.m4a';
import sonidoPortadaSrc from '../../../assets/sonidos/portada.m4a';
import sonidoContraportadaSrc from '../../../assets/sonidos/portada.m4a';

import portadaImg from '../../../assets/LibroEjercicios/portada.png';
import contraportadaImg from '../../../assets/LibroEjercicios/portada.png';
import primeraPaginaImg from '../../../assets/LibroEjercicios/pagina1.png';
import ultimaPaginaImg from '../../../assets/LibroEjercicios/pagina4.png';
import hojaFrenteImg from '../../../assets/LibroEjercicios/pagina4.png';
import hojaReversoImg from '../../../assets/LibroEjercicios/pagina3.png';

function LibroEjercicios() {
  const [bookSize, setBookSize] = useState({ width: 800, height: 1200 });
  const [ejercicios, setEjercicios] = useState([]);
  const [paginas, setPaginas] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const flipBookRef = useRef(null);

  // 🎵 Sonidos
  const sonidoPagina = useRef(new Audio(sonidoPaginaSrc));
  const sonidoPortada = useRef(new Audio(sonidoPortadaSrc));
  const sonidoContraportada = useRef(new Audio(sonidoContraportadaSrc));

  useEffect(() => {
    sonidoPagina.current.volume = 0.6;
    sonidoPortada.current.volume = 1.0;
    sonidoContraportada.current.volume = 1.0;
  }, []);

  // 📚 Imágenes del libro
  const imagenesLibro = {
    portada: portadaImg,
    contraportada: contraportadaImg,
    primeraPagina: primeraPaginaImg,
    ultimaPagina: ultimaPaginaImg,
    hojaFrente: hojaFrenteImg,
    hojaReverso: hojaReversoImg,
  };

  // 📥 Cargar ejercicios y mezclar aleatoriamente
  useEffect(() => {
    fetch('/ejercicios.json')
      .then(res => res.json())
      .then(data => {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setEjercicios(shuffled);
      })
      .catch(err => console.error('Error cargando ejercicios:', err));
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

  // 📄 Agrupar preguntas (3 por página, máximo 2 hojas internas)
useEffect(() => {
  if (ejercicios.length === 0) return;

  const generarPaginas = () => {
    const porPagina = 3; // 🔹 Máximo 3 preguntas por página
    const nuevasPaginas = [];

    // 🔀 Mezclar las preguntas aleatoriamente en cada carga
    const ejerciciosAleatorios = [...ejercicios].sort(() => Math.random() - 0.5);

    // 📄 Dividir los ejercicios en grupos de 3
    for (let i = 0; i < ejerciciosAleatorios.length; i += porPagina) {
      nuevasPaginas.push(ejerciciosAleatorios.slice(i, i + porPagina));
    }

    // 🔢 Limitar a máximo 4 páginas (2 hojas internas)
    let paginasLimitadas = nuevasPaginas.slice(0, 4);

    // 🧩 Solo añadir página vacía si el número total es impar Y la última ya tiene contenido
    if (paginasLimitadas.length % 2 !== 0) {
      const ultimaTieneContenido = paginasLimitadas.at(-1)?.length > 0;
      if (ultimaTieneContenido) paginasLimitadas.push([]);
    }

    // ✅ Aseguramos que la última interna (antes de contraportada) tenga ejercicios
    if (paginasLimitadas.length > 0 && paginasLimitadas.at(-1).length === 0) {
      const penultima = paginasLimitadas[paginasLimitadas.length - 2];
      paginasLimitadas[paginasLimitadas.length - 1] = penultima;
    }

    setPaginas(paginasLimitadas);
  };

  generarPaginas();
  window.addEventListener('resize', generarPaginas);
  return () => window.removeEventListener('resize', generarPaginas);
}, [ejercicios]);



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

  // ⏳ Pantalla de carga
  if (ejercicios.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-900 text-white text-2xl">
        Cargando ejercicios...
      </div>
    );
  }

  // 📖 Render principal
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
            alt="Portada ejercicios"
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
            <p>“Demuestra cuánto sabes...”</p>
          </div>
        </div>

        {/* 📄 Páginas con ejercicios (máximo 2 hojas internas) */}
        {paginas.map((grupo, index) => (
          <PaginaEjercicios
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

        {/* 🟪 Última página con ejercicios */}
        <PaginaEjercicios
          grupo={paginas[paginas.length - 1] || []}
          imagenFondo={imagenesLibro.ultimaPagina}
          bookSize={bookSize}
        />

        {/* 🟥 Contraportada */}
        <div className="page flex items-center justify-center">
          <img
            src={imagenesLibro.contraportada}
            alt="Contraportada ejercicios"
            className="w-full h-full object-cover"
          />
        </div>
      </HTMLFlipBook>
    </div>
  </PageWrapper>
);
}

export default LibroEjercicios;
