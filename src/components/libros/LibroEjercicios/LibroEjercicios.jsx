import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from "react-pageflip";
import PageWrapper from '../../PageWrapper';
import fondoLibro from '../../../assets/fondo-libro.png';
import PaginaEjercicios from './PaginaEjercicios';

import sonidoPaginaSrc from '../../../assets/sonidos/pagina.m4a';
import sonidoPortadaSrc from '../../../assets/sonidos/portada.m4a';
import sonidoContraportadaSrc from '../../../assets/sonidos/portada.m4a';

import portadaImg from '../../../assets/LibroEjercicios/portada.png';
import contraportadaImg from '../../../assets/LibroEjercicios/portada.png';
import primeraPaginaImg from '../../../assets/LibroEjercicios/primeraPagina.png';
import ultimaPaginaImg from '../../../assets/LibroEjercicios/ultimaPagina.png';
import hojaFrenteImg from '../../../assets/LibroEjercicios/hojaFrente.png';
import hojaReversoImg from '../../../assets/LibroEjercicios/hojaReverso.png';

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


  const [ultimaPaginaGrupo, setUltimaPaginaGrupo] = useState([]);

  // 📄 Agrupar preguntas (3 por página, máximo 2 hojas internas)
  useEffect(() => {
    if (ejercicios.length === 0) return;

    const generarPaginas = () => {
      const porPagina = 3;
      const nuevasPaginas = [];

      // Mezclar aleatoriamente
      const ejerciciosAleatorios = [...ejercicios].sort(() => Math.random() - 0.5);

      // Filtrar por id único (por si el JSON trae repetidos)
      const idsVistos = new Set();
      const ejerciciosUnicos = ejerciciosAleatorios.filter(e => {
        if (!e?.id) return false;
        if (idsVistos.has(e.id)) return false;
        idsVistos.add(e.id);
        return true;
      });

      // Dividir en grupos de 3
      for (let i = 0; i < ejerciciosUnicos.length; i += porPagina) {
        nuevasPaginas.push(ejerciciosUnicos.slice(i, i + porPagina));
      }

      // Limitar a máx 4 páginas (2 hojas internas)
      let paginasLimitadas = nuevasPaginas.slice(0, 4);

      // Si número impar, agrega una página vacía real
      if (paginasLimitadas.length % 2 !== 0) {
        paginasLimitadas.push([]);
      }

      // ✅ Calcular el grupo para la ÚLTIMA PÁGINA EXTRA (distinto a la penúltima del map)
      let extra = [];
      if (paginasLimitadas.length > 0) {
        const grupoUltimoDelMap = paginasLimitadas[paginasLimitadas.length - 1] || [];
        const idsUltimoDelMap = new Set(grupoUltimoDelMap.map(q => q.id));

        // 1) Intentar elegir 3 que NO estén en el último del map
        const candidatos = ejerciciosUnicos.filter(e => !idsUltimoDelMap.has(e.id));
        if (candidatos.length >= porPagina) {
          extra = candidatos.slice(0, porPagina);
        } else {
          // 2) Si no alcanza, reemplazar al menos 1 elemento para que NO sea el mismo conjunto
          const distinto = ejerciciosUnicos.find(e => !idsUltimoDelMap.has(e.id));
          if (distinto && grupoUltimoDelMap.length) {
            const base = [...grupoUltimoDelMap];
            base[0] = distinto; // cambia al menos un ejercicio
            // asegurar unicidad por id en la extra
            const vistosExtra = new Set();
            extra = base.filter(e => {
              if (!e) return false;
              if (vistosExtra.has(e.id)) return false;
              vistosExtra.add(e.id);
              return true;
            }).slice(0, porPagina);
          } else {
            // 3) Si de verdad no hay nada distinto, deja la extra vacía
            extra = [];
          }
        }
      }

      setPaginas(paginasLimitadas);
      setUltimaPaginaGrupo(extra); // ← aquí fijamos el grupo de la última página
    };

    generarPaginas();
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
      } catch { }
    });

    if (index === 0 && direction === "backward") {
      sonidoContraportada.current.play().catch(() => { });
    }
    else if (index === 0 && direction === "forward") {
      sonidoPortada.current.play().catch(() => { });
    }
    else if (index === 1) {
      if (direction === "forward") {
        sonidoPortada.current.play().catch(() => { });
      } else {
        sonidoPagina.current.play().catch(() => { });
      }
    }
    else if (index === paginas.length + 3 && direction === "forward") {
      sonidoContraportada.current.play().catch(() => { });
    }
    else if (index === paginas.length + 1 && direction === "backward") {
      sonidoContraportada.current.play().catch(() => { });
    }
    else {
      sonidoPagina.current.play().catch(() => { });
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
          </div>
          {/* 📄 Páginas con ejercicios (máximo 2 hojas internas) */}
          {paginas.map((grupo, index) => {
            // 🧩 Generar clave única a partir de los id de las preguntas del grupo
            const claveGrupo = grupo.map((q) => q.id).join('-') || `vacio-${index}`;
            return (
              <PaginaEjercicios
                key={`pagina-${index}-${claveGrupo}`} // ✅ clave única y estable
                grupo={grupo}
                imagenFondo={
                  index % 2 === 0
                    ? imagenesLibro.hojaFrente
                    : imagenesLibro.hojaReverso
                }
                bookSize={bookSize}
              />
            );
          })}

          {/* 🟪 Última página con ejercicios (clave independiente) */}
          {/* 🟪 Última página con ejercicios */}
          <PaginaEjercicios
            grupo={ultimaPaginaGrupo}  // ← antes usaba paginas[paginas.length - 1]
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
