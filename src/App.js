import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Scene from "./scene";
import Loader from "./loader";
import Cephi from "./Cephi";
import { Suspense, useEffect, useState } from "react";

function MainPage() {
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const hideArrow = () => setShowArrow(false);

    window.addEventListener("wheel", hideArrow);
    window.addEventListener("touchstart", hideArrow);

    return () => {
      window.removeEventListener("wheel", hideArrow);
      window.removeEventListener("touchstart", hideArrow);
    };
  }, []);

  return (
    <>
      {/* Logo is now rendered inside Canvas via Scene — no hero-text div needed */}

      <div className={`scroll-arrow ${!showArrow ? "hide" : ""}`}>
        <div className="chevron"><span></span><span></span></div>
        <div className="chevron"><span></span><span></span></div>
        <div className="chevron"><span></span><span></span></div>
      </div>

      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Suspense fallback={<Loader />}>
          <ScrollControls pages={4} damping={0.0}>
            <Scene />
          </ScrollControls>
        </Suspense>
      </Canvas>

      <style>
        {`
          @keyframes glow {
            from { box-shadow: 0 0 5px #C09020, 0 0 10px #C09020; }
            to   { box-shadow: 0 0 15px #C09020, 0 0 30px #82B0B3; }
          }
          @keyframes spark {
            0%   { transform: translate(0,0) scale(0.5); opacity: 1; }
            100% { transform: translate(calc(-20px + 40px * var(--randX)), calc(-20px + 40px * var(--randY))) scale(0); opacity: 0; }
          }
        `}
      </style>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/cephi" element={<Cephi />} />
      </Routes>
    </Router>
  );
}
