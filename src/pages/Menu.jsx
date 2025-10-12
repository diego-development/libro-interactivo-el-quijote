import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

// 🖼️ Importar imágenes desde assets
import fondoLibro from "../assets/fondo-libro.png";
import frasesImg from "../assets/tarjetas/frases.png";
import personajesImg from "../assets/tarjetas/personajes.png";
import ejerciciosImg from "../assets/tarjetas/ejercicios.png";
import reseñasImg from "../assets/tarjetas/reseñas.png";

export default function Menu() {
  const navigate = useNavigate();

  const handleClick = (pagina) => {
    navigate(pagina);
  };

  const tarjetas = [
    { id: "pagina1", label: "Página 1", src: frasesImg },
    { id: "pagina2", label: "Página 2", src: personajesImg },
    { id: "pagina3", label: "Página 3", src: ejerciciosImg },
    { id: "pagina4", label: "Página 4", src: reseñasImg },
  ];

  return (
    <PageWrapper>
      <div
        className="h-screen w-screen flex bg-gray-900 text-white px-[3%] pt-[9%] pb-[9%] gap-[3%]"
        style={{
          backgroundImage: `url(${fondoLibro})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {tarjetas.map((t, index) => (
          <motion.button
            key={t.id}
            className="flex-1 flex items-center justify-center bg-transparent overflow-visible"
            onClick={() => handleClick(`/${t.id}`)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.5, // animación escalonada más fluida
            }}
          >
            <img
              src={t.src}
              alt={t.label}
              className="w-full h-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-300"
            />
          </motion.button>
        ))}
      </div>
    </PageWrapper>
  );
}
