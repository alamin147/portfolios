import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";

interface BlogPost {
  _id: string;
  title: string;
  shortDes: string;
  imgUrl: string;
  category: string;
  createdAt: string;
  color?: string;
}

interface BlogNode extends BlogPost {
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
function CoreBlogSphere() {
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
          color="#a855f7"
          emissive="#7e22ce"
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
          color="#a855f7"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshBasicMaterial
          color="#9333ea"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Grid lines for aesthetic
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
          color="#a855f7"
          lineWidth={0.5}
          transparent
          opacity={0.15}
        />
      ))}
    </group>
  );
}

// Connection lines between blog nodes
function BlogConnectionNetwork({ nodes }: { nodes: BlogNode[] }) {
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
          color="#a855f7"
          lineWidth={0.3}
          transparent
          opacity={0.2}
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
        color="#a855f7"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Individual blog node
function BlogNode({ node, index }: { node: BlogNode; index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const [x, y, z] = node.position;

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.position.y = y + Math.sin(time * 0.5 + index) * 0.1;
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
    console.log("Blog Node clicked:", node.title);
    // Navigate to blog detail page
    window.location.href = `/blog/${node._id}`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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

      {/* Blog info label */}
      <Html
        position={[0, 0.5, 0]}
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
          className="bg-gray-900/95 backdrop-blur-md px-4 py-3 rounded-xl border border-purple-500/30 shadow-2xl min-w-[200px]"
          style={{
            willChange: "auto",
            transform: hovered ? "scale(1)" : "scale(0.5)",
          }}
        >
          <div className="text-white font-bold text-sm mb-1 line-clamp-2">{node.title}</div>
          <div className="text-gray-300 text-xs mb-2 line-clamp-2">{node.shortDes}</div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full border border-purple-400/30">
              {node.category}
            </span>
            <span className="text-[10px] text-gray-400">
              {formatDate(node.createdAt)}
            </span>
          </div>
          <div className="text-purple-400 text-xs font-semibold animate-pulse">
            Click to read
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
          {node.title.length > 20 ? node.title.substring(0, 20) + "..." : node.title}
        </div>
      </Html>
    </group>
  );
}

// Main component
export default function BlogPlanet3D() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/blog`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blogs");
        return res.json();
      })
      .then((result) => {
        // Take first 12 blogs
        setBlogs(result.slice(0, 12));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const nodes: BlogNode[] = useMemo(() => {
    if (!blogs.length) return [];

    const positions = generateFibonacciSphere(blogs.length, 3.5);
    const colors = [
      "#a855f7", "#9333ea", "#7e22ce", "#6b21a8",
      "#c084fc", "#d8b4fe", "#e9d5ff", "#a78bfa",
    ];

    return blogs.map((blog, i) => ({
      ...blog,
      position: positions[i],
      color: colors[i % colors.length],
    }));
  }, [blogs]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-purple-400 font-semibold animate-pulse">Loading Blog Universe...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-red-400 font-semibold">Failed to load blogs</p>
          <p className="text-red-300/60 text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {/* Instruction text */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-purple-400/70 text-sm font-semibold animate-pulse pointer-events-none backdrop-blur-sm bg-black/30 px-4 py-2 rounded-full">
        🖱️ Drag to explore • Scroll to zoom • Click to read blog
      </div>

      {/* Blog count */}
      {/* <div className="absolute top-4 right-8 z-10 text-purple-400/60 text-xs font-semibold pointer-events-none backdrop-blur-sm bg-black/40 px-3 py-1.5 rounded-full border border-purple-500/30">
        {blogs.length} Articles
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
        <pointLight position={[-5, -5, -5]} intensity={0.7} color="#a855f7" />
        <pointLight position={[5, -5, 5]} intensity={0.7} color="#c084fc" />
        <spotLight
          position={[0, 10, 0]}
          intensity={0.6}
          angle={0.6}
          penumbra={1}
          color="#a855f7"
        />
        <pointLight position={[0, -10, 0]} intensity={0.4} color="#9333ea" />

        {/* Core blog sphere */}
        <CoreBlogSphere />

        {/* Grid lines */}
        <GridLines />

        {/* Connection network */}
        <BlogConnectionNetwork nodes={nodes} />

        {/* Blog nodes */}
        {nodes.map((node, index) => (
          <BlogNode key={node._id || index} node={node} index={index} />
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
