import React, { useState, useEffect } from 'react';
import HTMLFlipBook from "react-pageflip";
import { useNavigate } from "react-router-dom";
import QRCode from 'react-qr-code';

function LibroFrases() {
  const navigate = useNavigate();
  const [bookSize, setBookSize] = useState({ width: 800, height: 1200 });

  //Número par para que se cierre el libro
  const paginas = [
    { id: "1", url: "/libros/frases/pagina1.png" },
    { id: "2", url: "/libros/frases/pagina2.png" },
    { id: "3", url: "/libros/frases/pagina3.png" },
    { id: "4", url: "/libros/frases/pagina4.png" },
    { id: "5", url: "/libros/frases/pagina5.png" },
    { id: "6", url: "/libros/frases/pagina6.png" }
  ];

  const urlPortada = "/libros/frases/portada.png";
  const urlContraportada = "/libros/frases/contraportada.png";

  // Calcula tamaño responsivo manteniendo proporción
  const updateBookSize = () => {
    const availableWidth = window.innerWidth * 0.9;
    const availableHeight = window.innerHeight * 0.82; // 9% arriba y abajo
    const aspectRatio = 800 / 1200;
    let width = availableWidth;
    let height = width / aspectRatio;

    if (height > availableHeight) {
      height = availableHeight;
      width = height * aspectRatio;
    }

    setBookSize(prev => (prev.width === width && prev.height === height ? prev : { width, height }));
  };

  useEffect(() => {
    updateBookSize();
    window.addEventListener("resize", updateBookSize);
    return () => window.removeEventListener("resize", updateBookSize);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-gray-900 pt-[9%] pb-[9%] flex items-center justify-center">

      <HTMLFlipBook
        width={bookSize.width}
        height={bookSize.height}
        size="fixed"
        maxShadowOpacity={0.5}
        drawShadow={true}
        showCover={true} // importante para portada y contraportada
      >
        {/* Portada */}
        <div className="page flex items-center justify-center">
          <div className="page-content cover w-full h-full flex items-center justify-center relative">
            {/* Imagen de fondo */}
            <img
              src={urlPortada}
              alt="Portada no disponible"
              className="w-full h-full object-cover"
            />

            {/* QR superpuesto */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white p-2 rounded">
                <QRCode size={200} value="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAYAABgLG29UQTcxOTdYNENZQUo0VzdZQkJKVUJRQUFRMS4u" />
              </div>
            </div>
          </div>
        </div>


        {/* Páginas internas */}
        {paginas.map((pagina) => (
          <div className="page flex items-center justify-center" key={pagina.id}>
            <div className="page-content w-full h-full flex items-center justify-center">
              <img
                src={pagina.url}
                alt="Página no disponible"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}

        {/* Contraportada */}
        <div className="page flex items-center justify-center">
          <div className="page-content cover w-full h-full flex items-center justify-center">
            <img
              src={urlContraportada}
              alt="Contraportada no disponible"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </HTMLFlipBook>
    </div>
  );
}

export default LibroFrases;
