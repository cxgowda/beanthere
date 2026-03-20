import { RoundedBox, Text } from "@react-three/drei";
import { forwardRef, useRef, useImperativeHandle, useState, useEffect } from "react";

const CephiLoader = forwardRef(
  ({ color = "#222222", args = [2, 0.8, 0.1], fadeDuration = 1000 }, ref) => {
    const panelRef = useRef();
    const textRef = useRef();
    const [opacity, setOpacity] = useState(0);

    // Expose panel properties
    useImperativeHandle(ref, () => ({
      position: panelRef.current.parent.position,
      material: panelRef.current.material,
      setOpacity,
    }));

    // Fade-in
    useEffect(() => {
      let start = null;
      const fadeIn = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / fadeDuration, 1);
        setOpacity(progress);
        if (progress < 1) requestAnimationFrame(fadeIn);
      };
      requestAnimationFrame(fadeIn);
    }, []);

    return (
      <group>
        {/* Main Panel */}
        <RoundedBox ref={panelRef} args={args} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            color={color}
            roughness={0.5}
            metalness={0}
            transparent
            opacity={opacity}
          />
        </RoundedBox>

        {/* Arrow Button on top */}
        <Text
          ref={textRef}
          position={[args[0] / 2 - 0.35, 0, args[2] / 2 + 0.03]}
          fontSize={0.15}
          anchorX="center"
          anchorY="middle"
          color={`rgba(255,255,255,${opacity})`}
          outlineWidth={0}
        >
          {'>'}
        </Text>
      </group>
    );
  }
);

export default CephiLoader;
