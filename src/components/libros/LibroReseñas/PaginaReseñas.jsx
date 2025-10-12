import React, { forwardRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import './PaginaReseñas.css';

const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
  }),
};

const PaginaReseñas = forwardRef(({ grupo = [], imagenFondo, bookSize }, ref) => {
  // 🔢 Determinar cuántas reseñas mostrar por página según ancho del libro
  const maxPorPagina = useMemo(() => {
    const ancho = bookSize?.width || window.innerWidth;
    return ancho < 900 ? 3 : 4; // móviles y tablets: 3, escritorio: 4
  }, [bookSize]);

  // ✂️ Limitar reseñas según resolución
  const grupoLimitado = grupo.slice(0, maxPorPagina);

  // 📐 Calcular escala visual en base al tamaño del libro (para texto y paddings)
  const baseWidth = 800;
  const baseHeight = 1200;
  const scaleX = (bookSize?.width || baseWidth) / baseWidth;
  const scaleY = (bookSize?.height || baseHeight) / baseHeight;
  const scale = Math.min(scaleX, scaleY);

  return (
    <div ref={ref} className="page relative overflow-hidden">
      {/* 🖼️ Fondo de la página */}
      <img
        src={imagenFondo}
        alt="Fondo de página"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 📖 Contenedor de reseñas */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-evenly"
        style={{
          padding: '8%',
          fontFamily: "'Caveat', cursive",
          gap: `${1.5 * scale}rem`,
        }}
      >
        {grupoLimitado.map((r, i) => (
          <motion.div
            key={r.id || i}
            className="resena-card"
            variants={fadeInVariant}
            initial="hidden"
            animate="visible"
            custom={i}
            style={{
              padding: `${1.6 * scale}rem ${2 * scale}rem`,
              borderRadius: `${18 * scale}px`,
              maxWidth: '90%',
            }}
          >
            {/* 🏷️ Cabecera */}
            <div
              className="flex justify-between items-center mb-2 flex-wrap"
              style={{
                marginBottom: `${0.4 * scale}rem`,
              }}
            >
              <span
                style={{
                  fontSize: `${2.2 * scale}rem`,
                  fontWeight: 600,
                  color: '#1a1a1a',
                }}
              >
                {r.nombre}
              </span>
              <span
                style={{
                  fontSize: `${1.6 * scale}rem`,
                  color: '#333',
                  opacity: 0.8,
                }}
              >
                {r.fecha}
              </span>
            </div>

            {/* ✍️ Texto de la reseña */}
            <p
              style={{
                fontSize: `${1.8 * scale}rem`,
                color: '#2a1d0a',
                lineHeight: 1.45,
                whiteSpace: 'pre-line',
                wordBreak: 'break-word',
                textAlign: 'justify',
              }}
            >
              {r.texto}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

export default PaginaReseñas;
