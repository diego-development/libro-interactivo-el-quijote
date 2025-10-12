import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import "./PaginaFrases.css";

const PaginaFrases = forwardRef(({ frases = [], fondo, lado, bookSize }, ref) => {
  const baseWidth = 800;
  const baseHeight = 1200;
  const scaleX = (bookSize?.width || baseWidth) / baseWidth;
  const scaleY = (bookSize?.height || baseHeight) / baseHeight;
  const scale = Math.min(scaleX, scaleY);

  return (
    <div ref={ref} className="page relative overflow-hidden">
      <img
        src={fondo}
        alt="Fondo página"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div
        className={`absolute inset-0 flex flex-col ${
          lado === "izquierdo" ? "items-start" : "items-end"
        } justify-evenly px-[8%] py-[6%]`}
        style={{
          fontFamily: "'Caveat', cursive",
          fontSize: `${1.8 * scale}rem`,
          lineHeight: 1.4,
          color: "#2a1d0a",
        }}
      >
        {frases.map((frase, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/60 rounded-xl shadow-md p-3 max-w-[80%]"
          >
            “{frase.texto || frase}”
          </motion.p>
        ))}
      </div>
    </div>
  );
});

export default PaginaFrases;
