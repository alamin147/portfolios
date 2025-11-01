import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { FaGraduationCap, FaLaptopCode, FaProjectDiagram, FaDatabase, FaCode, FaCalculator, FaAtom, FaFlask, FaDna } from "react-icons/fa";
import { School } from "lucide-react";
import { BsCalendarDate } from "react-icons/bs";

interface EducationNode {
  name: string;
  icon: React.ReactElement;
  color: string;
  position: [number, number, number];
  category: string;
  description: string;
  period: string;
  institution: string;
  highlights?: string[];
  highlightIcons?: React.ReactElement[];
  isMainNode: boolean;
}

// Education data structure matching the actual education section
const educationData = [
  {
    period: "2022 - 2025",
    degree: "Bachelor of Science",
    major: "Computer Science and Engineering",
    institution: "Daffodil International University",
    location: "Dhaka, Bangladesh",
    icon: <FaGraduationCap />,
    color: "#0ea5e9",
    description: "Focused on software engineering and modern web technologies. Active in programming competitions.",
    highlights: [
      "Web Development",
      "Software Engineering",
      "Database Systems",
      "Data Structures & Algorithms",
    ],
    highlightIcons: [
      <FaLaptopCode />,
      <FaProjectDiagram />,
      <FaDatabase />,
      <FaCode />,
    ],
  },
  {
    period: "2018 - 2020",
    degree: "Higher Secondary Certificate",
    major: "Science",
    institution: "Nawabganj City College",
    location: "Chapai Nawabganj, Bangladesh",
    icon: <School size={32} />,
    color: "#10b981",
    description: "Strong foundation in mathematics and physics. Developed analytical thinking skills.",
    highlights: ["Mathematics", "Physics", "Chemistry", "Biology"],
    highlightIcons: [
      <FaCalculator />,
      <FaAtom />,
      <FaFlask />,
      <FaDna />,
    ],
  },
];

// Create main nodes + orbiting subject nodes
const createEducationNodes = () => {
  const nodes: any[] = [];

  educationData.forEach((edu, eduIndex) => {
    // Main degree node at center-ish positions
    const mainPosition: [number, number, number] = eduIndex === 0
      ? [0, 2, 0]  // BSc above
      : [0, -2, 0]; // HSC below

    nodes.push({
      name: edu.degree,
      icon: edu.icon,
      color: edu.color,
      category: edu.major,
      description: edu.institution,
      period: edu.period,
      institution: edu.institution,
      position: mainPosition,
      highlights: edu.highlights,
      highlightIcons: edu.highlightIcons,
      isMainNode: true,
    });

    // Orbiting subject nodes around the main node
    const radius = 2.5;
    const angleStep = (Math.PI * 2) / edu.highlights.length;

    edu.highlights.forEach((highlight, i) => {
      const angle = angleStep * i;
      // Create a circle of subjects around the main node
      const x = mainPosition[0] + Math.cos(angle) * radius;
      const y = mainPosition[1] + Math.sin(angle * 0.5) * 0.5; // Slight vertical variation
      const z = mainPosition[2] + Math.sin(angle) * radius;

      const subjectColor = eduIndex === 0
        ? ["#38bdf8", "#0284c7", "#0369a1", "#075985"][i]
        : ["#34d399", "#059669", "#047857", "#065f46"][i];

      nodes.push({
        name: highlight,
        icon: edu.highlightIcons?.[i] || edu.icon,
        color: subjectColor,
        category: `${edu.degree} Subject`,
        description: `Part of ${edu.major}`,
        period: edu.period,
        institution: edu.institution,
        position: [x, y, z] as [number, number, number],
        isMainNode: false,
      });
    });
  });

  return nodes;
};

// Generate Fibonacci sphere distribution
const generateFibonacciSphere = (numPoints: number, radius: number) => {
  const points: [number, number, number][] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < numPoints; i++) {
    const y = 1 - (i / (numPoints - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    points.push([x * radius, y * radius, z * radius]);
  }

  return points;
};

// Core rotating sphere
function CoreEducationSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
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
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#be185d"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Inner glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.9, 32, 32]} />
        <meshBasicMaterial
          color="#ec4899"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshBasicMaterial
          color="#db2777"
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
    const circleCount = 8;
    const result = [];
    for (let i = 0; i < circleCount; i++) {
      const radius = 2.5 + i * 0.3;
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
          color="#ec4899"
          lineWidth={0.5}
          transparent
          opacity={0.15}
        />
      ))}
    </group>
  );
}

// Connection network - connects main degree nodes to their subjects
function EducationConnectionNetwork({ nodes }: { nodes: EducationNode[] }) {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  const connections = useMemo(() => {
    const lines: { points: [THREE.Vector3, THREE.Vector3]; color: string }[] = [];
    const mainNodes = nodes.filter(n => n.isMainNode);

    // Connect each main node to its subject nodes
    mainNodes.forEach((mainNode) => {
      const subjectNodes = nodes.filter(
        n => !n.isMainNode &&
        n.period === mainNode.period &&
        n.institution === mainNode.institution
      );

      subjectNodes.forEach((subjectNode) => {
        lines.push({
          points: [
            new THREE.Vector3(...mainNode.position),
            new THREE.Vector3(...subjectNode.position),
          ],
          color: mainNode.color,
        });
      });
    });

    // Add some connections between subjects of the same degree
    mainNodes.forEach((mainNode) => {
      const subjectNodes = nodes.filter(
        n => !n.isMainNode &&
        n.period === mainNode.period &&
        n.institution === mainNode.institution
      );

      for (let i = 0; i < subjectNodes.length; i++) {
        const nextIdx = (i + 1) % subjectNodes.length;
        lines.push({
          points: [
            new THREE.Vector3(...subjectNodes[i].position),
            new THREE.Vector3(...subjectNodes[nextIdx].position),
          ],
          color: mainNode.color,
        });
      }
    });

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
      const radius = 4 + Math.random() * 2;
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
        color="#ec4899"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Individual education node
function EducationNode({ node, index }: { node: EducationNode; index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const [x, y, z] = node.position;
  const isMain = node.isMainNode;
  const nodeSize = isMain ? 0.5 : 0.2; // Main nodes are bigger

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      // Main nodes stay more stable, subjects orbit slightly
      const bobAmount = isMain ? 0.05 : 0.1;
      groupRef.current.position.y = y + Math.sin(time * 0.5 + index) * bobAmount;

      // Subjects rotate around their main node
      if (!isMain) {
        const rotationSpeed = 0.3;
        const rotationRadius = 0.1;
        groupRef.current.position.x = x + Math.cos(time * rotationSpeed + index) * rotationRadius;
        groupRef.current.position.z = z + Math.sin(time * rotationSpeed + index) * rotationRadius;
      }
    }

    if (meshRef.current) {
      const baseScale = hovered ? 1.3 : 1;
      meshRef.current.scale.setScalar(
        baseScale + Math.sin(state.clock.elapsedTime * 2 + index) * 0.1
      );
    }
  });

  return (
    <group ref={groupRef} position={[x, y, z]}>
      {/* Main glowing sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[nodeSize, 20, 20]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={hovered ? 1.2 : 0.8}
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
          opacity={hovered ? 0.3 : 0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Pulsing ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={hovered ? 1.5 : 1.2}>
        <ringGeometry args={[nodeSize * 1.2, nodeSize * 1.4, 32]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={hovered ? 0.6 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Extra ring for main nodes */}
      {isMain && (
        <mesh rotation={[0, 0, Math.PI / 4]} scale={1.8}>
          <ringGeometry args={[nodeSize * 1.8, nodeSize * 2.2, 32]} />
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Education info label */}
      <Html
        position={[0, nodeSize + 0.5, 0]}
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
            minWidth: isMain ? "280px" : "220px",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="text-2xl" style={{ color: node.color }}>
              {node.icon}
            </div>
            <div className="text-white font-bold text-sm">{node.name}</div>
          </div>
          <div className="text-gray-300 text-xs mb-2">{node.description}</div>

          {/* Show subjects list for main nodes */}
          {isMain && node.highlights && (
            <div className="mb-2">
              <div className="text-[10px] text-gray-400 mb-1">Core Subjects:</div>
              <div className="flex flex-wrap gap-1">
                {node.highlights.map((highlight, i) => (
                  <span
                    key={i}
                    className="text-[9px] px-1.5 py-0.5 bg-white/10 text-white/80 rounded"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          )}

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
            <span className="text-[10px] px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full border border-purple-400/30 flex items-center gap-1">
              <BsCalendarDate className="inline" /> {node.period}
            </span>
          </div>
        </div>
      </Html>

      {/* Always visible minimal label */}
      <Html
        position={[0, -0.4, 0]}
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
export default function EducationPlanet3D() {
  const nodes: EducationNode[] = useMemo(() => {
    const educationNodes = createEducationNodes();
    const positions = generateFibonacciSphere(educationNodes.length, 3.5);
    return educationNodes.map((item, i) => ({
      ...item,
      position: positions[i],
    }));
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Instruction text */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-pink-400/70 text-sm font-semibold animate-pulse pointer-events-none backdrop-blur-sm bg-black/30 px-4 py-2 rounded-full">
        🖱️ Drag to explore • Scroll to zoom • Hover to learn more
      </div>

      {/* Education count */}
      {/* <div className="absolute top-4 right-8 z-10 text-pink-400/60 text-xs font-semibold pointer-events-none backdrop-blur-sm bg-black/40 px-3 py-1.5 rounded-full border border-pink-500/30">
        {nodes.length} Academic Nodes
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
        <pointLight position={[-5, -5, -5]} intensity={0.7} color="#ec4899" />
        <pointLight position={[5, -5, 5]} intensity={0.7} color="#f472b6" />
        <spotLight
          position={[0, 10, 0]}
          intensity={0.6}
          angle={0.6}
          penumbra={1}
          color="#ec4899"
        />
        <pointLight position={[0, -10, 0]} intensity={0.4} color="#db2777" />

        {/* Core education sphere */}
        <CoreEducationSphere />

        {/* Grid lines */}
        <GridLines />

        {/* Connection network */}
        <EducationConnectionNetwork nodes={nodes} />

        {/* Education nodes */}
        {nodes.map((node, index) => (
          <EducationNode key={index} node={node} index={index} />
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
          autoRotateSpeed={0.4}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}
