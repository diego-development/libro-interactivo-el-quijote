import { useNavigate } from "react-router-dom";
import Frases from "../components/libros/LibroFrases/LibroFrases";
import Personajes from "../components/libros/LibroPersonajes/LibroPersonajes";
import Ejercicios from "../components/libros/LibroEjercicios/LibroEjercicios";
import Reseñas from "../components/libros/LibroReseñas/LibroReseñas";

export default function Pagina({ num }) {
  const navigate = useNavigate();

  // 📖 Seleccionar el libro según "num"
  let Book;
  switch (num) {
    case 1:
      Book = Frases;
      break;
    case 2:
      Book = Personajes;
      break;
    case 3:
      Book = Ejercicios;
      break;
    case 4:
      Book = Reseñas;
      break;
    default:
      Book = Frases;
  }

  return (
    <>
      {/* 🔙 Botón volver */}
      <img
        src="/icono-nombre-pag.png"
        alt="Volver"
        onClick={() => navigate("/menu")}
        className="
          absolute top-[3%] left-[3%] z-20
          w-[clamp(40px,5vw,100px)]
          cursor-pointer
          hover:scale-105 transition-transform
        "
      />

      {/* 📘 Libro seleccionado */}
      <div className="container">
        <Book />
      </div>
    </>
  );
}
