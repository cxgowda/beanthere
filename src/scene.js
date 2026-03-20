import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, Html } from "@react-three/drei";
import { useRef } from "react";
import Logo from "./logo";

export default function Scene() {
  const scroll = useScroll();
  const logoGroupRef = useRef();
  const { viewport } = useThree();

  useFrame(() => {
    if (!logoGroupRef.current) return;

    const offset = scroll.offset; // 0 (top) → 1 (bottom)

    // viewport.width < 3.5 world units ≈ screen narrower than ~480px (mobile)
    const isMobile = viewport.width < 3.5;
    const fillRatio = isMobile ? 3.0 : 1.0;
    const targetWorldWidth = viewport.width * fillRatio;
    const htmlPxWidth = 360;
    const distanceFactor = 10;
    const baseScale = (targetWorldWidth * distanceFactor) / htmlPxWidth;

    // Scroll animation: move up + fade out in first 30% of scroll
    const scrollScale = Math.max(0.3, 1 - offset * 1.2);
    logoGroupRef.current.scale.setScalar(baseScale * scrollScale);

    logoGroupRef.current.position.y = 0.6 - offset * 5;
    logoGroupRef.current.position.z = -offset * 1.5;
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={2} />

      {/* Logo — lives inside Canvas, scales with viewport, animates on scroll */}
      <group ref={logoGroupRef} position={[0, 0, 0]}>
        <Html
          center
          transform
          occlude={false}
          distanceFactor={10}
          style={{ pointerEvents: "none" }}
        >
          <Logo />
        </Html>
      </group>
    </>
  );
}
