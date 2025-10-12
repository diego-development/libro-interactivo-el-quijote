import React, { forwardRef, useMemo } from "react";
import { motion } from "framer-motion";
import "./PaginaReseñas.css";
import papiroImg from "../../../assets/papiro.png"; // 🆕 Fondo de cada reseña

const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

const PaginaReseñas = forwardRef(({ grupo = [], imagenFondo, bookSize }, ref) => {
  const maxPorPagina = useMemo(() => {
    const ancho = bookSize?.width || window.innerWidth;
    return ancho < 900 ? 3 : 4;
  }, [bookSize]);

  const grupoLimitado = Array.isArray(grupo) ? grupo.slice(0, maxPorPagina) : [];

  const baseWidth = 800;
  const baseHeight = 1200;
  const scale = Math.min(
    (bookSize?.width || baseWidth) / baseWidth,
    (bookSize?.height || baseHeight) / baseHeight
  );

  return (
    <div ref={ref} className="page relative overflow-hidden">
      <img
        src={imagenFondo}
        alt="Fondo reseñas"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div
        className="absolute inset-0 flex flex-col items-center justify-evenly"
        style={{
          padding: "8%",
          fontFamily: "'Caveat', cursive",
          gap: `${1.5 * scale}rem`,
        }}
      >
        {grupoLimitado.length > 0 ? (
          grupoLimitado.map((r, i) => (
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
                maxWidth: "90%",
                backgroundImage: `url(${papiroImg})`, // 🆕 Fondo tipo papiro
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <div
                className="flex justify-between items-center mb-2 flex-wrap"
                style={{ marginBottom: `${0.4 * scale}rem` }}
              >
                <span
                  style={{
                    fontSize: `${2.2 * scale}rem`,
                    fontWeight: 600,
                    color: "#1a1a1a",
                  }}
                >
                  {r.nombre || "Autor desconocido"}
                </span>
                <span
                  style={{
                    fontSize: `${1.6 * scale}rem`,
                    color: "#333",
                    opacity: 0.8,
                  }}
                >
                  {r.fecha || ""}
                </span>
              </div>
              <p
                style={{
                  fontSize: `${1.8 * scale}rem`,
                  color: "#2a1d0a",
                  lineHeight: 1.45,
                  whiteSpace: "pre-line",
                  wordBreak: "break-word",
                  textAlign: "justify",
                }}
              >
                {r.texto || "Reseña sin contenido."}
              </p>
            </motion.div>
          ))
        ) : (
          <div className="flex-grow" />
        )}
      </div>
    </div>
  );
});

export default PaginaReseñas;
