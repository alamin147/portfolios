import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Ring } from "@react-three/drei";
import * as THREE from "three";
import type { Planet } from "@/data/planets-data";

interface Planet3DProps {
  planet: Planet;
}

// Individual Planet Component
function PlanetSphere({ planet }: { planet: Planet }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  // Auto-rotate the planet
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.003;
    }
  });

  // Generate planet texture based on planet type
  const planetTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    // Create gradient based on planet color
    const gradient = ctx.createLinearGradient(0, 0, 512, 512);

    if (planet.id === "jupiter") {
      // Jupiter - bands of orange/brown
      gradient.addColorStop(0, "#d4a373");
      gradient.addColorStop(0.2, "#c19a6b");
      gradient.addColorStop(0.4, "#a67c52");
      gradient.addColorStop(0.6, "#8b6f47");
      gradient.addColorStop(0.8, "#c19a6b");
      gradient.addColorStop(1, "#d4a373");
    } else if (planet.id === "saturn") {
      // Saturn - pale yellow/cream
      gradient.addColorStop(0, "#f4e7d7");
      gradient.addColorStop(0.5, "#e6d5b8");
      gradient.addColorStop(1, "#d8c4a0");
    } else if (planet.id === "neptune") {
      // Neptune - deep blue
      gradient.addColorStop(0, "#4a90e2");
      gradient.addColorStop(0.5, "#2e5c8a");
      gradient.addColorStop(1, "#1a3d5c");
    } else if (planet.id === "mars") {
      // Mars - rusty red/orange
      gradient.addColorStop(0, "#cd5c5c");
      gradient.addColorStop(0.5, "#a0522d");
      gradient.addColorStop(1, "#8b4513");
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Add some noise/texture
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const size = Math.random() * 2;
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.3})`;
      ctx.fillRect(x, y, size, size);
    }

    // Add horizontal bands for gas giants
    if (planet.id === "jupiter" || planet.id === "saturn") {
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      for (let i = 0; i < 512; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(512, i);
        ctx.stroke();
      }
    }

    // Add Great Red Spot for Jupiter
    if (planet.id === "jupiter") {
      const centerX = 350;
      const centerY = 200;
      const spotGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40);
      spotGradient.addColorStop(0, "rgba(200, 50, 50, 0.8)");
      spotGradient.addColorStop(1, "rgba(150, 40, 40, 0.3)");
      ctx.fillStyle = spotGradient;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 50, 35, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [planet.id]);

  // Cloud layer for gas giants
  const shouldHaveClouds = planet.id === "jupiter" || planet.id === "saturn";

  return (
    <group>
      {/* Main Planet Sphere */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          map={planetTexture}
          roughness={0.7}
          metalness={0.1}
        />
      </Sphere>

      {/* Cloud layer for gas giants */}
      {shouldHaveClouds && (
        <Sphere ref={cloudsRef} args={[2.05, 64, 64]}>
          <meshStandardMaterial
            transparent
            opacity={0.3}
            roughness={0.9}
            metalness={0}
            color="#ffffff"
          />
        </Sphere>
      )}

      {/* Atmosphere glow */}
      <Sphere args={[2.15, 32, 32]}>
        <meshBasicMaterial
          color={planet.color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

// Saturn's Rings Component
function SaturnRings() {
  return (
    <group rotation={[Math.PI / 2.5, 0, 0]}>
      {/* Multiple ring layers */}
      <Ring args={[2.5, 3.5, 64]}>
        <meshStandardMaterial
          color="#d8c4a0"
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          roughness={0.8}
        />
      </Ring>
      <Ring args={[3.6, 4.2, 64]}>
        <meshStandardMaterial
          color="#c4b090"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          roughness={0.8}
        />
      </Ring>
      <Ring args={[4.3, 4.8, 64]}>
        <meshStandardMaterial
          color="#b0a080"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          roughness={0.8}
        />
      </Ring>
    </group>
  );
}

// Main 3D Scene
export function Planet3D({ planet }: Planet3DProps) {
  return (
    <div className="w-full h-full relative">
      {/* Instruction text */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-cyan-400/60 text-sm animate-pulse pointer-events-none">
        {/* 🖱️ Drag to rotate • Scroll to zoom */}
      </div>

      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        className="w-full h-full"
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} />
        <pointLight position={[-5, -3, -5]} intensity={0.5} color={planet.color} />

        {/* Planet */}
        <PlanetSphere planet={planet} />

        {/* Saturn's Rings */}
        {planet.id === "saturn" && <SaturnRings />}

        {/* Stars in background */}
        <Stars />

        {/* OrbitControls for interaction */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={15}
          autoRotate={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

// Background stars
function Stars() {
  const starsRef = useRef<THREE.Points>(null);

  const starGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(1000 * 3);

    for (let i = 0; i < 1000; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <points ref={starsRef} geometry={starGeometry}>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}
