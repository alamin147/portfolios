import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";
import React from "react";
import {
  FaUser,
  FaGraduationCap,
  FaCode,
  FaLaptopCode,
  FaTrophy,
  FaRocket,
  FaUsers,
  FaCoffee,
  FaBrain,
  FaTools,
} from "react-icons/fa";

interface ProfileNode {
  name: string;
  icon: React.ReactElement;
  color: string;
  position: [number, number, number];
  category: string
}

// Profile information data with positions distributed on sphere
const profileData = [
  {
    name: "Fullstack Developer",
    icon: <FaLaptopCode />,
    color: "#3b82f6",
    // category: "Role",
  },
  {
    name: "CSE Student",
    icon: <FaGraduationCap />,
    color: "#10b981",
    // category: "Education",
  },
  {
    name: "Coding Enthusiast",
    icon: <FaCode />,
    color: "#8b5cf6",
    // category: "Passion",
  },
  {
    name: "Problem Solver",
    icon: <FaBrain />,
    color: "#ec4899",
    // category: "Skill",
  },
  {
    name: "CP Experience",
    icon: <FaTrophy />,
    color: "#f59e0b",
    // category: "Experience",
  },
  {
    name: "Backend Architecture",
    icon: <FaTools />,
    color: "#06b6d4",
    // category: "Expertise",
  },
  {
    name: "Team Player",
    icon: <FaUsers />,
    color: "#14b8a6",
    // category: "Trait",
  },
  {
    name: "Always Learning",
    icon: <FaRocket />,
    color: "#f97316",
    // category: "Mindset",
  },
  {
    name: "Tech Explorer",
    icon: <FaCoffee />,
    color: "#a855f7",
    // category: "Hobby",
  },
  {
    name: "Al Amin",
    icon: <FaUser />,
    color: "#06d6a0",
    // category: "Identity",
  },
];

// Distribute profile nodes evenly on a sphere using Fibonacci sphere algorithm
function fibonacciSphere(
  samples: number,
  radius: number
): [number, number, number][] {
  const points: [number, number, number][] = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2; // y from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    points.push([x * radius, y * radius, z * radius]);
  }

  return points;
}

// Profile Node Component
function ProfileNode({ node, index }: { node: ProfileNode; index: number }) {
  const [x, y, z] = node.position;
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Pulse animation with different timing for each node
  useFrame((state) => {
    if (meshRef.current) {
      const pulse =
        Math.sin(state.clock.elapsedTime * 2 + index * 0.5) * 0.15 + 1;
      meshRef.current.scale.setScalar(pulse);
    }

    // Rotate to always face camera
    if (groupRef.current) {
      groupRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <group ref={groupRef} position={[x, y, z]}>
      {/* Glowing sphere for the profile node */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.15} />
      </mesh>

      {/* HTML label with icon */}
      <Html
        center
        distanceFactor={8}
        style={{
          pointerEvents: "none",
          userSelect: "none",
        }}
        transform
        occlude
      >
        <div className="flex flex-col items-center gap-1">
          <div
            className="text-2xl p-2 rounded-lg backdrop-blur-sm shadow-lg"
            style={{
              color: node.color,
              backgroundColor: "rgba(0,0,0,0.7)",
              border: `2px solid ${node.color}60`,
              boxShadow: `0 0 15px ${node.color}40`,
              willChange: "auto",
            }}
          >
            {node.icon}
          </div>
          <div
            className="text-xs font-semibold px-2 py-1 rounded backdrop-blur-sm whitespace-nowrap shadow-md"
            style={{
              color: node.color,
              backgroundColor: "rgba(0,0,0,0.8)",
              border: `1px solid ${node.color}50`,
              willChange: "auto",
            }}
          >
            {node.name}
          </div>
          <div
            className="text-[10px] font-medium px-2 py-0.5 rounded backdrop-blur-sm opacity-70"
            style={{
              color: node.color,
              backgroundColor: "rgba(0,0,0,0.6)",
              willChange: "auto",
            }}
          >
            {node.category}
          </div>
        </div>
      </Html>

      {/* Connection line to center */}
      <Line
        points={[
          [0, 0, 0],
          [-x * 0.65, -y * 0.65, -z * 0.65],
        ]}
        color={node.color}
        lineWidth={1.5}
        transparent
        opacity={0.35}
      />
    </group>
  );
}

// Core profile sphere (center)
function CoreProfileSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= 0.002;
    }
  });

  return (
    <group>
      {/* Outer wireframe */}
      <Sphere ref={meshRef} args={[1.6, 32, 32]}>
        <meshStandardMaterial
          color="#06d6a0"
          emissive="#0d9488"
          emissiveIntensity={0.3}
          transparent
          opacity={0.25}
          wireframe
        />
      </Sphere>

      {/* Inner solid sphere with gradient */}
      <Sphere ref={innerRef} args={[1.2, 32, 32]}>
        <meshStandardMaterial
          color="#1e293b"
          emissive="#0f172a"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </Sphere>

      {/* Core glow */}
      <Sphere args={[1.0, 32, 32]}>
        <meshBasicMaterial
          color="#06d6a0"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

// Connection network between nodes
function ConnectionNetwork({ nodes }: { nodes: ProfileNode[] }) {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  // Create connections between nearby nodes
  const connections = useMemo(() => {
    const conns: {
      start: [number, number, number];
      end: [number, number, number];
      color: string;
    }[] = [];
    const maxDistance = 2.8;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const [x1, y1, z1] = nodes[i].position;
        const [x2, y2, z2] = nodes[j].position;
        const distance = Math.sqrt(
          Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
        );

        if (distance < maxDistance) {
          conns.push({
            start: [x1, y1, z1],
            end: [x2, y2, z2],
            color: nodes[i].color,
          });
        }
      }
    }

    return conns;
  }, [nodes]);

  return (
    <group ref={linesRef}>
      {connections.map((conn, index) => (
        <Line
          key={index}
          points={[conn.start, conn.end]}
          color={conn.color}
          lineWidth={1}
          transparent
          opacity={0.12}
        />
      ))}
    </group>
  );
}

// Energy particles orbiting
function EnergyParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(800 * 3);

    for (let i = 0; i < 800; i++) {
      const i3 = i * 3;
      const radius = 3 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0003;
      particlesRef.current.rotation.x += 0.0001;
    }
  });

  return (
    <points ref={particlesRef} geometry={particleGeometry}>
      <pointsMaterial
        size={0.025}
        color="#06d6a0"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// Main Profile Planet Component
export function ProfilePlanet3D() {
  // Distribute profile nodes on sphere
  const nodes:any = useMemo(() => {
    const positions = fibonacciSphere(profileData.length, 2.8);
    return profileData.map((node, index) => ({
      ...node,
      position: positions[index],
    }));
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Instruction text */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-emerald-400/60 text-sm animate-pulse pointer-events-none">
      </div>

      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        className="w-full h-full"
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false,
        }}
        style={{ pointerEvents: "auto" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, -5]} intensity={0.6} color="#06d6a0" />
        <pointLight position={[5, -5, 5]} intensity={0.6} color="#3b82f6" />
        <spotLight
          position={[0, 10, 0]}
          intensity={0.5}
          angle={0.5}
          penumbra={1}
          color="#10b981"
        />

        {/* Core profile sphere */}
        <CoreProfileSphere />

        {/* Connection network */}
        <ConnectionNetwork nodes={nodes} />

        {/* Profile nodes */}
        {nodes.map((node:any, index:number) => (
          <ProfileNode key={index} node={node} index={index} />
        ))}

        {/* Energy particles */}
        <EnergyParticles />

        {/* OrbitControls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={6}
          maxDistance={16}
          autoRotate={true}
          autoRotateSpeed={0.3}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
