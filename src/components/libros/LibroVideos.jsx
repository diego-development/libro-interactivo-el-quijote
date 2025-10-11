import React, { useState, useEffect } from 'react';
import HTMLFlipBook from "react-pageflip";
import { useNavigate } from "react-router-dom";

function Book() {
  const navigate = useNavigate();
  const [bookSize, setBookSize] = useState({ width: 800, height: 1200 });

  const pokemonData = [
    { id: "006", name: "Charizard", types: ["Fire", "Flying"], description: "Flies in search of strong opponents. Breathes extremely hot fire that melts anything, but never uses it on weaker foes." },
    { id: "025", name: "Pikachu", types: ["Electric"], description: "When Pikachu meet, they touch tails to exchange electricity as a greeting." },
    { id: "125", name: "Electabuzz", types: ["Electric"], description: "Often kept at power plants to regulate electricity. Competes with others to attract lightning during storms." },
    { id: "185", name: "Sudowoodo", types: ["Rock"], description: "Despite looking like a tree, its body is more like rock. Hates water and hides when it rains." },
    { id: "448", name: "Lucario", types: ["Fighting", "Steel"], description: "Can read thoughts and movements by sensing others' aura. No foe can hide from Lucario." },
    { id: "658", name: "Greninja", types: ["Water", "Dark"], description: "Creates throwing stars from compressed water that can slice through metal when thrown at high speed." },
    { id: "491", name: "Darkrai", types: ["Dark"], description: "A legendary Pokémon that appears on moonless nights, putting people to sleep and giving them nightmares." }
  ];

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

    setBookSize(prev => {
      // Evita re-render si tamaño no cambió
      if (prev.width === width && prev.height === height) return prev;
      return { width, height };
    });
  };

  useEffect(() => {
    updateBookSize();
    window.addEventListener("resize", updateBookSize);
    return () => window.removeEventListener("resize", updateBookSize);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-gray-900 pt-[9%] pb-[9%] flex items-center justify-center">
      
      {/* Botón de imagen en esquina superior izquierda 
      <img
        src="/assets/boton-volver.png"
        alt="Volver"
        onClick={() => navigate("/menu")}
        className="
          absolute top-[3%] left-[3%] z-20 
          w-24 md:w-32 lg:w-40 
          cursor-pointer 
          hover:scale-105 transition-transform
        "
      />
*/}
      {/* Libro centrado */}
      <HTMLFlipBook
        width={bookSize.width}
        height={bookSize.height}
        size="fixed"
        maxShadowOpacity={0.5}
        drawShadow={true}
        showCover={true}
      >
        {/* Portada */}
        <div className="page flex items-center justify-center" style={{ background: 'transparent' }}>
          <div className="page-content cover">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" 
              alt="Pokémon Logo" 
              className="pokemon-logo w-3/4 h-auto"
            />
          </div>
        </div>

        {/* Páginas de Pokémon */}
        {pokemonData.map((pokemon) => (
          <div className="page flex items-center justify-center" key={pokemon.id}>
            <div className="page-content pokemon-container flex flex-col items-center">
              <img 
                src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${pokemon.id}.png`} 
                alt={pokemon.name} 
                className="w-48 h-auto mb-4"
              />
              <div className="pokemon-info text-center">
                <h2 className="pokemon-name text-2xl font-bold">{pokemon.name}</h2>
                <p className="pokemon-number">#{pokemon.id}</p>
                <div className="flex justify-center gap-2 my-2">
                  {pokemon.types.map((type) => (
                    <span key={type} className="px-2 py-1 rounded bg-gray-700 text-white">{type}</span>
                  ))}
                </div>
                <p className="pokemon-description max-w-xs">{pokemon.description}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Página de video */}
        <div className="page flex items-center justify-center" style={{ background: 'transparent' }}>
          <div className="page-content cover w-full h-full">
            <video
              src="/videos/video-ejemplo.mp4"
              controls
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </HTMLFlipBook>
    </div>
  );
}

export default Book;
