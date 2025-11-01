import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { Home, Briefcase, Code, Mail, FolderOpen, Award, User } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode, SiCodeforces } from "react-icons/si";

interface FooterNode {
  name: string;
  icon: React.ReactElement;
  color: string;
  position: [number, number, number];
  category: string;
  description: string;
  link?: string;
  isMainNode: boolean;
}

// Create footer nodes with navigation and social links
const createFooterNodes = () => {
  const nodes: any[] = [];

  // Main portfolio hub at center
  nodes.push({
    name: "Al Amin",
    icon: <User size={32} />,
    color: "#f97316",
    category: "Portfolio Hub",
    description: "Fullstack Developer & Problem Solver",
    position: [0, 0, 0] as [number, number, number],
    isMainNode: true,
  });

  // Navigation links (inner circle)
  const navigationLinks = [
    {
      name: "Home",
      icon: <Home size={24} />,
      color: "#0ea5e9",
      category: "Navigation",
      description: "Back to top",
      link: "#home",
    },
    {
      name: "Projects",
      icon: <FolderOpen size={24} />,
      color: "#8b5cf6",
      category: "Navigation",
      description: "View my work",
      link: "#projects",
    },
    {
      name: "Skills",
      icon: <Code size={24} />,
      color: "#10b981",
      category: "Navigation",
      description: "My tech stack",
      link: "#skills",
    },
    {
      name: "Contact",
      icon: <Mail size={24} />,
      color: "#14b8a6",
      category: "Navigation",
      description: "Get in touch",
      link: "#contact",
    },
  ];

  // Services (middle circle)
  const services = [
    {
      name: "Web Dev",
      icon: <Code size={24} />,
      color: "#06b6d4",
      category: "Service",
      description: "Full-Stack Web Development",
    },
    {
      name: "Software Dev",
      icon: <Briefcase size={24} />,
      color: "#0891b2",
      category: "Service",
      description: "Custom Software Solutions",
    },
    {
      name: "Backend",
      icon: <Code size={24} />,
      color: "#0e7490",
      category: "Service",
      description: "Backend Development & APIs",
    },
    {
      name: "Database",
      icon: <Award size={24} />,
      color: "#155e75",
      category: "Service",
      description: "Database Design & Management",
    },
  ];

  // Social media (outer circle)
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={24} />,
      color: "#0077b5",
      category: "Social",
      description: "Connect on LinkedIn",
      link: "https://www.linkedin.com/in/alamin27",
    },
    {
      name: "GitHub",
      icon: <FaGithub size={24} />,
      color: "#333333",
      category: "Social",
      description: "View my code",
      link: "https://github.com/alamin147",
    },
    {
      name: "LeetCode",
      icon: <SiLeetcode size={24} />,
      color: "#ffa116",
      category: "Social",
      description: "Coding profile",
      link: "https://leetcode.com/u/alamin14",
    },
    {
      name: "Codeforces",
      icon: <SiCodeforces size={24} />,
      color: "#1f8acb",
      category: "Social",
      description: "CP profile",
      link: "https://codeforces.com/profile/alamin147",
    },
  ];

  // Position navigation links (inner circle)
  const innerRadius = 2.5;
  navigationLinks.forEach((node, i) => {
    const angle = (Math.PI * 2 * i) / navigationLinks.length;
    const x = Math.cos(angle) * innerRadius;
    const y = Math.sin(angle * 0.4) * 0.6;
    const z = Math.sin(angle) * innerRadius;

    nodes.push({
      ...node,
      position: [x, y, z] as [number, number, number],
      isMainNode: false,
    });
  });

  // Position services (middle circle)
  const middleRadius = 3.5;
  services.forEach((node, i) => {
    const angle = (Math.PI * 2 * i) / services.length + Math.PI / 4; // Offset from navigation
    const x = Math.cos(angle) * middleRadius;
    const y = Math.sin(angle * 0.5) * 0.8;
    const z = Math.sin(angle) * middleRadius;

    nodes.push({
      ...node,
      position: [x, y, z] as [number, number, number],
      isMainNode: false,
    });
  });

  // Position social links (outer circle)
  const outerRadius = 4.5;
  socialLinks.forEach((node, i) => {
    const angle = (Math.PI * 2 * i) / socialLinks.length;
    const x = Math.cos(angle) * outerRadius;
    const y = Math.sin(angle * 0.6) * 1;
    const z = Math.sin(angle) * outerRadius;

    nodes.push({
      ...node,
      position: [x, y, z] as [number, number, number],
      isMainNode: false,
    });
  });

  return nodes;
};

// Core rotating sphere
function CoreFooterSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <group>
      {/* Main sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#ea580c"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Inner glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshBasicMaterial
          color="#ea580c"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Grid lines
function GridLines() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.y += 0.001;
      gridRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const circles = useMemo(() => {
    const circleCount = 7;
    const result = [];
    for (let i = 0; i < circleCount; i++) {
      const radius = 2.2 + i * 0.4;
      const points = [];
      const segments = 64;
      for (let j = 0; j <= segments; j++) {
        const angle = (j / segments) * Math.PI * 2;
        points.push(
          new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
        );
      }
      result.push(points);
    }
    return result;
  }, []);

  return (
    <group ref={gridRef}>
      {circles.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#f97316"
          lineWidth={0.5}
          transparent
          opacity={0.2}
        />
      ))}
    </group>
  );
}

// Connection network
function FooterConnectionNetwork({ nodes }: { nodes: FooterNode[] }) {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  const connections = useMemo(() => {
    const lines: { points: [THREE.Vector3, THREE.Vector3]; color: string }[] = [];
    const mainNode = nodes.find((n) => n.isMainNode);

    if (!mainNode) return lines;

    // Connect main node to all other nodes
    nodes.forEach((node) => {
      if (!node.isMainNode) {
        lines.push({
          points: [
            new THREE.Vector3(...mainNode.position),
            new THREE.Vector3(...node.position),
          ],
          color: node.color,
        });
      }
    });

    // Connect navigation nodes to each other
    const navNodes = nodes.filter((n) => n.category === "Navigation");
    for (let i = 0; i < navNodes.length; i++) {
      const nextIdx = (i + 1) % navNodes.length;
      lines.push({
        points: [
          new THREE.Vector3(...navNodes[i].position),
          new THREE.Vector3(...navNodes[nextIdx].position),
        ],
        color: "#0ea5e9",
      });
    }

    // Connect service nodes to each other
    const serviceNodes = nodes.filter((n) => n.category === "Service");
    for (let i = 0; i < serviceNodes.length; i++) {
      const nextIdx = (i + 1) % serviceNodes.length;
      lines.push({
        points: [
          new THREE.Vector3(...serviceNodes[i].position),
          new THREE.Vector3(...serviceNodes[nextIdx].position),
        ],
        color: "#06b6d4",
      });
    }

    // Connect social nodes to each other
    const socialNodes = nodes.filter((n) => n.category === "Social");
    for (let i = 0; i < socialNodes.length; i++) {
      const nextIdx = (i + 1) % socialNodes.length;
      lines.push({
        points: [
          new THREE.Vector3(...socialNodes[i].position),
          new THREE.Vector3(...socialNodes[nextIdx].position),
        ],
        color: "#f97316",
      });
    }

    return lines;
  }, [nodes]);

  return (
    <group ref={linesRef}>
      {connections.map((connection, i) => (
        <Line
          key={i}
          points={connection.points}
          color={connection.color}
          lineWidth={0.5}
          transparent
          opacity={0.3}
        />
      ))}
    </group>
  );
}

// Floating particles
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#f97316"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Individual footer node
function FooterNode({ node, index }: { node: FooterNode; index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const [x, y, z] = node.position;
  const isMain = node.isMainNode;
  const nodeSize = isMain ? 0.7 : 0.25;

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      const bobAmount = isMain ? 0.04 : 0.1;
      groupRef.current.position.y = y + Math.sin(time * 0.5 + index) * bobAmount;

      // Nodes orbit slightly
      if (!isMain) {
        const rotationSpeed = 0.2;
        const rotationRadius = 0.1;
        groupRef.current.position.x = x + Math.cos(time * rotationSpeed + index) * rotationRadius;
        groupRef.current.position.z = z + Math.sin(time * rotationSpeed + index) * rotationRadius;
      }
    }

    if (meshRef.current) {
      const baseScale = hovered ? 1.4 : 1;
      meshRef.current.scale.setScalar(
        baseScale + Math.sin(state.clock.elapsedTime * 2 + index) * 0.1
      );
    }
  });

  const handleClick = () => {
    if (node.link) {
      if (node.link.startsWith("#")) {
        // Internal navigation
        const element = document.querySelector(node.link);
        element?.scrollIntoView({ behavior: "smooth" });
      } else {
        // External link
        window.open(node.link, "_blank");
      }
    }
  };

  return (
    <group ref={groupRef} position={[x, y, z]}>
      {/* Main glowing sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <sphereGeometry args={[nodeSize, 20, 20]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={hovered ? 1.3 : 0.8}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh scale={1.4}>
        <sphereGeometry args={[nodeSize, 16, 16]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={hovered ? 0.4 : 0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Pulsing ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={hovered ? 1.7 : 1.4}>
        <ringGeometry args={[nodeSize * 1.2, nodeSize * 1.5, 32]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={hovered ? 0.7 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Extra rings for main node */}
      {isMain && (
        <>
          <mesh rotation={[0, 0, Math.PI / 4]} scale={1.6}>
            <ringGeometry args={[nodeSize * 1.8, nodeSize * 2.2, 32]} />
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]} scale={1.9}>
            <ringGeometry args={[nodeSize * 2, nodeSize * 2.4, 32]} />
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}

      {/* Footer info label */}
      <Html
        position={[0, nodeSize + 0.6, 0]}
        center
        distanceFactor={6}
        style={{
          transition: "all 0.2s",
          opacity: hovered ? 1 : 0,
          pointerEvents: "none",
          userSelect: "none",
        }}
        zIndexRange={[100, 0]}
      >
        <div
          className="bg-gray-900/95 backdrop-blur-md px-4 py-3 rounded-xl border shadow-2xl"
          style={{
            willChange: "auto",
            transform: hovered ? "scale(1)" : "scale(0.5)",
            borderColor: node.color + "50",
            minWidth: isMain ? "220px" : "180px",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="text-xl" style={{ color: node.color }}>
              {node.icon}
            </div>
            <div className="text-white font-bold text-sm">{node.name}</div>
          </div>
          <div className="text-gray-300 text-xs mb-2">{node.description}</div>

          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[10px] px-2 py-0.5 rounded-full border"
              style={{
                backgroundColor: node.color + "20",
                color: node.color,
                borderColor: node.color + "40",
              }}
            >
              {node.category}
            </span>
            {node.link && (
              <span className="text-[9px] px-2 py-0.5 bg-white/10 text-white/70 rounded-full">
                Click to {node.link.startsWith("#") ? "navigate" : "visit"}
              </span>
            )}
          </div>
        </div>
      </Html>

      {/* Always visible minimal label */}
      <Html
        position={[0, -nodeSize - 0.3, 0]}
        center
        distanceFactor={8}
        style={{
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          className="text-white/70 text-[10px] font-semibold text-center whitespace-nowrap bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10"
          style={{ willChange: "auto" }}
        >
          {node.name}
        </div>
      </Html>
    </group>
  );
}

// Main component
export default function FooterPlanet3D() {
  const nodes: FooterNode[] = useMemo(() => {
    return createFooterNodes();
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Instruction text */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-orange-400/70 text-sm font-semibold animate-pulse pointer-events-none backdrop-blur-sm bg-black/30 px-4 py-2 rounded-full">
        🖱️ Click to navigate • Explore all sections • Connect socially
      </div>

      {/* Node count */}
      <div className="absolute top-4 right-8 z-10 text-orange-400/60 text-xs font-semibold pointer-events-none backdrop-blur-sm bg-black/40 px-3 py-1.5 rounded-full border border-orange-500/30">
        {nodes.length - 1} Links
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
        <directionalLight position={[5, 5, 5]} intensity={1.3} />
        <pointLight position={[-5, -5, -5]} intensity={0.7} color="#f97316" />
        <pointLight position={[5, -5, 5]} intensity={0.7} color="#ea580c" />
        <spotLight
          position={[0, 10, 0]}
          intensity={0.6}
          angle={0.6}
          penumbra={1}
          color="#f97316"
        />
        <pointLight position={[0, -10, 0]} intensity={0.4} color="#ea580c" />

        {/* Core footer sphere */}
        <CoreFooterSphere />

        {/* Grid lines */}
        <GridLines />

        {/* Connection network */}
        <FooterConnectionNetwork nodes={nodes} />

        {/* Footer nodes */}
        {nodes.map((node, index) => (
          <FooterNode key={index} node={node} index={index} />
        ))}

        {/* Floating particles */}
        <FloatingParticles />

        {/* OrbitControls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={6}
          maxDistance={16}
          autoRotate={true}
          autoRotateSpeed={0.5}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}
