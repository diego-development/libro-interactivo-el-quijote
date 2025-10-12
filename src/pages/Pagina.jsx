import { useNavigate } from "react-router-dom";
//import Book from '../components/Book';
import Book from '../components/libros/LibroPersonajes/LibroPersonajes';
export default function Pagina({ num }) {
  const navigate = useNavigate();
  return (
    <>
<img
  src="/icono-nombre-pag.png"
  alt="Volver"
  onClick={() => navigate("/menu")}
  className="
    absolute top-[3%] left-[3%] z-20
    w-[clamp(40px,5vw,100px)]  /* min 40px, ideal 5vw, max 100px */
    cursor-pointer
    hover:scale-105 transition-transform
  "
/>


      <div className="container">
        <Book />
      </div>
    </>
  );
}
