import React, { forwardRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './PaginaEjercicios.css';
import hojaFondo from '../../../assets/LibroEjercicios/hojaReverso.png';
import papiroImg from '../../../assets/papiro.png'; // 🆕 Fondo de textura papiro

const PaginaEjercicios = forwardRef(({ grupo = [], imagenFondo = hojaFondo, bookSize, currentPage }, ref) => {
  const [respuestas, setRespuestas] = useState({});
  const [verificado, setVerificado] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    setRespuestas({});
    setVerificado(false);
  }, [currentPage]);

  useEffect(() => {
    const handleResize = () => setIsSmall(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const seleccionar = (id, idx, tipo) => {
    if (verificado) return;
    if (tipo === 'multiple') {
      const seleccionadas = respuestas[id] || [];
      const nuevaSeleccion = seleccionadas.includes(idx)
        ? seleccionadas.filter(i => i !== idx)
        : [...seleccionadas, idx];
      setRespuestas({ ...respuestas, [id]: nuevaSeleccion });
    } else {
      setRespuestas({ ...respuestas, [id]: idx });
    }
  };

  const comprobar = () => setVerificado(true);

  return (
    <div ref={ref} className="page relative overflow-hidden font-[Caveat]">
      <img src={imagenFondo} alt="Fondo de página" className="absolute inset-0 w-full h-full object-cover z-0" />

      <div
        className="relative z-10 flex flex-col items-center justify-between h-full w-full"
        style={{
          padding: isSmall ? '4% 6%' : '5% 7%',
          gap: isSmall ? '0.6rem' : '2rem',
        }}
      >
        {grupo.map((q, i) => (
          <motion.div
            key={q.id || i}
            className="ejercicio-card w-full p-3 md:p-5 lg:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              backgroundImage: `url(${papiroImg})`, // 🆕 Fondo tipo papiro
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              borderRadius: '18px',
            }}
          >
            <h3 className="pregunta text-center mb-2">{q.question}</h3>
            <div className="flex flex-col gap-1.5 w-full">
              {q.answers.map((a, idx) => {
                const tipo = q.type;
                const seleccion = respuestas[q.id];
                const seleccionada =
                  tipo === 'multiple'
                    ? Array.isArray(seleccion) && seleccion.includes(idx)
                    : seleccion === idx;
                const esCorrecta = verificado && a.isCorrect;
                const esIncorrecta = verificado && seleccionada && !a.isCorrect;
                return (
                  <button
                    key={idx}
                    onClick={() => seleccionar(q.id, idx, tipo)}
                    className={`opcion ${seleccionada ? 'seleccionada' : ''} ${esCorrecta ? 'correcta' : ''} ${esIncorrecta ? 'incorrecta' : ''}`}
                  >
                    {a.text}
                  </button>
                );
              })}
            </div>
     
          </motion.div>
        ))}

        {!verificado && grupo.length > 0 && (
          <div className="flex justify-center mt-3 mb-2">
            <button onClick={comprobar} className="btn-comprobar">
              Comprobar
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default PaginaEjercicios;
