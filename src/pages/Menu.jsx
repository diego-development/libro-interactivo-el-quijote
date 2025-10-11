import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

export default function Menu() {
  const navigate = useNavigate();

  const handleClick = (pagina) => {
    navigate(pagina); // navega inmediatamente al hacer click
  };

  const tarjetas = [
    { id: "pagina1", label: "Página 1", src: "/tarjetas/frases.png" },
    { id: "pagina2", label: "Página 2", src: "/tarjetas/personajes.png" },
    { id: "pagina3", label: "Página 3", src: "/tarjetas/ejercicios.png" },
    { id: "pagina4", label: "Página 4", src: "/tarjetas/reseñas.png" },
  ];

  return (
    <PageWrapper>
      <div className="h-screen w-screen flex bg-gray-900 text-white px-[3%] pt-[9%] pb-[9%] gap-[3%]"  style={{
          backgroundImage: "url('/fondo-libro.png')",
        }}>
        {tarjetas.map((t, index) => (
          <motion.button
            key={t.id}
            className="flex-1 flex items-center justify-center bg-transparent overflow-visible"
            onClick={() => handleClick(`/${t.id}`)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 1, // cada tarjeta espera 2s más que la anterior
            }}
          >
            <img
              src={t.src}
              alt={t.label}
              className="w-full h-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
            />
          </motion.button>
        ))}
      </div>
    </PageWrapper>
  );
}
