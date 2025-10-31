import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";

interface Project {
  _id: string;
  title: string;
  shortDes: string;
  imgUrl: string;
  live: string;
  github: string;
  tech: string[];
  color?: string;
}

interface ProjectNode extends Project {
  position: [number, number, number];
  color: string;
}

// Generate Fibonacci sphere distribution for even node placement
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
function CoreProjectsSphere() {
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
          color="#4272d7"
          emissive="#325abb"
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
          color="#4272d7"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshBasicMaterial
          color="#3a66c9"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Grid lines for tech aesthetic
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
          color="#4272d7"
          lineWidth={0.5}
          transparent
          opacity={0.15}
        />
      ))}
    </group>
  );
}

// Connection lines between project nodes
function ProjectConnectionNetwork({ nodes }: { nodes: ProjectNode[] }) {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const connections = useMemo(() => {
    const lines: [THREE.Vector3, THREE.Vector3][] = [];
    const maxConnections = Math.min(nodes.length * 2, 30);

    for (let i = 0; i < maxConnections; i++) {
      const idx1 = Math.floor(Math.random() * nodes.length);
      let idx2 = Math.floor(Math.random() * nodes.length);
      while (idx2 === idx1) idx2 = Math.floor(Math.random() * nodes.length);

      const node1 = nodes[idx1];
      const node2 = nodes[idx2];
      lines.push([
        new THREE.Vector3(...node1.position),
        new THREE.Vector3(...node2.position),
      ]);
    }
    return lines;
  }, [nodes]);

  return (
    <group ref={linesRef}>
      {connections.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#4272d7"
          lineWidth={0.3}
          transparent
          opacity={0.2}
        />
      ))}
    </group>
  );
}

// Floating code particles
function CodeParticles() {
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
        color="#4272d7"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Individual project node
function ProjectNode({ node, index }: { node: ProjectNode; index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const [x, y, z] = node.position;

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.position.y = y + Math.sin(time * 0.5 + index) * 0.1;
      groupRef.current.rotation.y += 0.01;
    }

    if (meshRef.current) {
      const baseScale = hovered ? 1.3 : 1;
      meshRef.current.scale.setScalar(
        baseScale + Math.sin(state.clock.elapsedTime * 2 + index) * 0.1
      );
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    console.log("Project Node clicked:", node.title, node.live);
    if (node.live) {
      window.open(node.live, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <group ref={groupRef} position={[x, y, z]}>
      {/* Main glowing sphere - clickable */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[0.25, 20, 20]} />
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
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={hovered ? 0.3 : 0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Pulsing ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={hovered ? 1.5 : 1.2}>
        <ringGeometry args={[0.3, 0.35, 32]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={hovered ? 0.6 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Project info label */}
      <Html
        position={[0, 0.5, 0]}
        center
        distanceFactor={6}
        style={{
          transition: "all 0.2s",
          opacity: hovered ? 1 : 0,
          transform: `scale(${hovered ? 1 : 0.5})`,
          pointerEvents: "none",
        }}
      >
        <div className="bg-gray-900/95 backdrop-blur-md px-4 py-3 rounded-xl border border-blue-500/30 shadow-2xl min-w-[200px]">
          <div className="text-white font-bold text-sm mb-1 line-clamp-2">{node.title}</div>
          <div className="text-gray-300 text-xs mb-2 line-clamp-2">{node.shortDes}</div>
          <div className="flex flex-wrap gap-1 mb-2">
            {node.tech.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/30"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="text-blue-400 text-xs font-semibold animate-pulse">
            🚀 Click to visit
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
        }}
      >
        <div className="text-white/70 text-[10px] font-semibold text-center whitespace-nowrap bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
          {node.title.length > 20 ? node.title.substring(0, 20) + "..." : node.title}
        </div>
      </Html>
    </group>
  );
}

// Main component
export default function ProjectsPlanet3D() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/project`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((result) => {
        // Take first 12 projects
        setProjects(result.slice(0, 12));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const nodes: ProjectNode[] = useMemo(() => {
    if (!projects.length) return [];

    const positions = generateFibonacciSphere(projects.length, 3.5);
    const colors = [
      "#4272d7", "#3a66c9", "#325abb", "#2a4e9d",
      "#5b8de8", "#6b9df0", "#7badf8", "#5080e0",
    ];

    return projects.map((project, i) => ({
      ...project,
      position: positions[i],
      color: colors[i % colors.length],
    }));
  }, [projects]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-blue-400 font-semibold animate-pulse">Loading Projects Universe...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-red-400 font-semibold">Failed to load projects</p>
          <p className="text-red-300/60 text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {/* Instruction text */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-blue-400/70 text-sm font-semibold animate-pulse pointer-events-none backdrop-blur-sm bg-black/30 px-4 py-2 rounded-full">
        🖱️ Drag to explore • Scroll to zoom • Click projects to visit
      </div>

      {/* Project count */}


      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        className="w-full h-full"
        style={{ pointerEvents: "auto" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.3} />
        <pointLight position={[-5, -5, -5]} intensity={0.7} color="#4272d7" />
        <pointLight position={[5, -5, 5]} intensity={0.7} color="#5b8de8" />
        <spotLight
          position={[0, 10, 0]}
          intensity={0.6}
          angle={0.6}
          penumbra={1}
          color="#4272d7"
        />
        <pointLight position={[0, -10, 0]} intensity={0.4} color="#3a66c9" />

        {/* Core project sphere */}
        <CoreProjectsSphere />

        {/* Grid lines */}
        <GridLines />

        {/* Connection network */}
        <ProjectConnectionNetwork nodes={nodes} />

        {/* Project nodes */}
        {nodes.map((node, index) => (
          <ProjectNode key={node._id || index} node={node} index={index} />
        ))}

        {/* Code particles */}
        <CodeParticles />

        {/* OrbitControls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={13}
          autoRotate={true}
          autoRotateSpeed={0.4}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}
