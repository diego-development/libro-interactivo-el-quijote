import { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "/fondo.gif";
import loadingBackground from "/cargando.gif"; // Imagen temporal
import PageWrapper from "../components/PageWrapper";

export default function Home() {
  const navigate = useNavigate();
  const [bgImage, setBgImage] = useState(background);

  const handleClick = () => {
    // Pre-cargamos la imagen de carga
    const img = new Image();
    img.src = loadingBackground;

    img.onload = () => {
      // Cambiamos a la imagen temporal
      setBgImage(loadingBackground);

      // Esperamos 1.5 segundos antes de navegar
      setTimeout(() => {
        navigate("/menu");
      }, 1500);
    };
  };

  return (
    <PageWrapper>
      <div
        className="h-screen w-screen relative bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          backgroundColor: "#000" // Color de fondo mientras carga la imagen
        }}
        onClick={handleClick}
      >
      </div>
    </PageWrapper>
  );
}
