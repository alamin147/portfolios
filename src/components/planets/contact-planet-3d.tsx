import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode, SiCodeforces, SiCodechef, SiHackerrank } from "react-icons/si";
import { contactInfo, socialLinks } from "@/data/contact-data";

interface ContactNode {
  name: string;
  icon: React.ReactElement;
  color: string;
  position: [number, number, number];
  category: string;
  description: string;
  link?: string;
  isMainNode: boolean;
}

// Create contact nodes from actual data
const createContactNodes = () => {
  const nodes: any[] = [];

  // Main contact info node at center
  nodes.push({
    name: "Contact Info",
    icon: <Mail size={32} />,
    color: "#14b8a6",
    category: "Main",
    description: "Get in touch with me",
    position: [0, 0, 0] as [number, number, number],
    isMainNode: true,
  });

  // Contact methods orbiting around main node
  const contactMethods = [
    {
      name: "Email",
      icon: <Mail size={24} />,
      color: "#0ea5e9",
      category: "Contact",
      description: contactInfo.email,
      link: `mailto:${contactInfo.email}`,
    },
    {
      name: "Phone",
      icon: <Phone size={24} />,
      color: "#06b6d4",
      category: "Contact",
      description: contactInfo.phone,
      link: `tel:${contactInfo.phone}`,
    },
    {
      name: "Location",
      icon: <MapPin size={24} />,
      color: "#0891b2",
      category: "Contact",
      description: contactInfo.address,
    },
  ];

  // Social media nodes
  const socialNodes = socialLinks.map((social) => {
    let icon;
    let color;
    switch (social.name) {
      case "LinkedIn":
        icon = <FaLinkedin size={24} />;
        color = "#0077b5";
        break;
      case "GitHub":
        icon = <FaGithub size={24} />;
        color = "#333333";
        break;
      case "LeetCode":
        icon = <SiLeetcode size={24} />;
        color = "#ffa116";
        break;
      case "Codeforces":
        icon = <SiCodeforces size={24} />;
        color = "#1f8acb";
        break;
      case "CodeChef":
        icon = <SiCodechef size={24} />;
        color = "#5b4638";
        break;
      case "Hackerrank":
        icon = <SiHackerrank size={24} />;
        color = "#00ea64";
        break;
      default:
        icon = <FaGithub size={24} />;
        color = "#333333";
    }
    return {
      name: social.name,
      icon,
      color,
      category: "Social",
      description: `Connect on ${social.name}`,
      link: social.href,
    };
  });

  // Position nodes in two concentric circles
  const innerRadius = 2.5; // Contact methods
  const outerRadius = 4; // Social media

  contactMethods.forEach((node, i) => {
    const angle = (Math.PI * 2 * i) / contactMethods.length;
    const x = Math.cos(angle) * innerRadius;
    const y = Math.sin(angle * 0.3) * 0.5; // Slight vertical variation
    const z = Math.sin(angle) * innerRadius;

    nodes.push({
      ...node,
      position: [x, y, z] as [number, number, number],
      isMainNode: false,
    });
  });

  socialNodes.forEach((node, i) => {
    const angle = (Math.PI * 2 * i) / socialNodes.length;
    const x = Math.cos(angle) * outerRadius;
    const y = Math.sin(angle * 0.5) * 0.8; // More vertical variation
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
function CoreContactSphere() {
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
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#14b8a6"
          emissive="#0d9488"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Inner glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial
          color="#14b8a6"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#0d9488"
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
    const circleCount = 6;
    const result = [];
    for (let i = 0; i < circleCount; i++) {
      const radius = 2 + i * 0.4;
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
          color="#14b8a6"
          lineWidth={0.5}
          transparent
          opacity={0.2}
        />
      ))}
    </group>
  );
}

// Connection network
function ContactConnectionNetwork({ nodes }: { nodes: ContactNode[] }) {
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

    // Connect contact methods to each other
    const contactNodes = nodes.filter((n) => n.category === "Contact" && !n.isMainNode);
    for (let i = 0; i < contactNodes.length; i++) {
      const nextIdx = (i + 1) % contactNodes.length;
      lines.push({
        points: [
          new THREE.Vector3(...contactNodes[i].position),
          new THREE.Vector3(...contactNodes[nextIdx].position),
        ],
        color: "#0ea5e9",
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
        color: "#14b8a6",
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
    const count = 80;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 5 + Math.random() * 2;
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
        color="#14b8a6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Individual contact node
function ContactNode({ node, index }: { node: ContactNode; index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const [x, y, z] = node.position;
  const isMain = node.isMainNode;
  const nodeSize = isMain ? 0.6 : 0.25;

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      const bobAmount = isMain ? 0.03 : 0.08;
      groupRef.current.position.y = y + Math.sin(time * 0.5 + index) * bobAmount;

      // Nodes orbit slightly
      if (!isMain) {
        const rotationSpeed = 0.2;
        const rotationRadius = 0.08;
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
      window.open(node.link, "_blank");
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
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={hovered ? 1.6 : 1.3}>
        <ringGeometry args={[nodeSize * 1.2, nodeSize * 1.5, 32]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={hovered ? 0.7 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Extra ring for main node */}
      {isMain && (
        <mesh rotation={[0, 0, Math.PI / 4]} scale={1.8}>
          <ringGeometry args={[nodeSize * 1.8, nodeSize * 2.2, 32]} />
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Contact info label */}
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
            minWidth: isMain ? "200px" : "180px",
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
                Click to open
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
export default function ContactPlanet3D() {
  const nodes: ContactNode[] = useMemo(() => {
    return createContactNodes();
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Instruction text */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-teal-400/70 text-sm font-semibold animate-pulse pointer-events-none backdrop-blur-sm bg-black/30 px-4 py-2 rounded-full">
        🖱️ Drag to explore • Click nodes to connect • Scroll to zoom
      </div>

      {/* Contact count */}
      {/* <div className="absolute top-4 right-8 z-10 text-teal-400/60 text-xs font-semibold pointer-events-none backdrop-blur-sm bg-black/40 px-3 py-1.5 rounded-full border border-teal-500/30">
        {nodes.length - 1} Ways to Connect
      </div> */}

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
        <pointLight position={[-5, -5, -5]} intensity={0.7} color="#14b8a6" />
        <pointLight position={[5, -5, 5]} intensity={0.7} color="#0ea5e9" />
        <spotLight
          position={[0, 10, 0]}
          intensity={0.6}
          angle={0.6}
          penumbra={1}
          color="#14b8a6"
        />
        <pointLight position={[0, -10, 0]} intensity={0.4} color="#0d9488" />

        {/* Core contact sphere */}
        <CoreContactSphere />

        {/* Grid lines */}
        <GridLines />

        {/* Connection network */}
        <ContactConnectionNetwork nodes={nodes} />

        {/* Contact nodes */}
        {nodes.map((node, index) => (
          <ContactNode key={index} node={node} index={index} />
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
