import { useState, useEffect } from "react";

export default function PageWrapper({ children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Montaje: activar opacidad
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => setVisible(false); // Desmontaje
  }, []);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 1.5s ease-in-out",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}
