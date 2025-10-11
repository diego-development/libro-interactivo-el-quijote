import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IdleRedirect({ children }) {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(60);

  // Ref para almacenar el tiempo restante
  const remainingTimeRef = useRef(60);

  // Ref para almacenar la última actividad
  const lastActivityRef = useRef(Date.now());

  const resetActivity = () => {
    lastActivityRef.current = Date.now();
    remainingTimeRef.current = 60; // reinicia contador
    setSecondsLeft(60); // actualiza UI
  };

  useEffect(() => {
    // Escuchar eventos de actividad
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((e) => window.addEventListener(e, resetActivity));

    // Intervalo que actualiza contador cada segundo
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor((now - lastActivityRef.current) / 1000);
      const remaining = 60 - diff;
      remainingTimeRef.current = remaining > 0 ? remaining : 0;
      setSecondsLeft(remainingTimeRef.current);

      if (remainingTimeRef.current <= 0) {
        navigate("/"); // redirige al llegar a 0
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      events.forEach((e) => window.removeEventListener(e, resetActivity));
    };
  }, [navigate]);

  return (
    <div>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          background: "rgba(0,0,0,0.7)",
          color: "white",
          padding: "8px 12px",
          borderRadius: "8px",
          fontSize: "14px",
        }}
      >
        Inactividad: {secondsLeft}s
      </div>
    </div>
  );
}
