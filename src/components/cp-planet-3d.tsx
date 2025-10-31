import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

// CP Profile interface for API response
interface CPProfile {
  platform: string;
  username: string;
  rating?: number;
  solved?: number;
  highestRating?: number;
  rank?: string;
  logo: string;
  link: string;
  color: string;
}

// CP Node interface for 3D rendering
interface CPNode {
  platform: string;
  username: string;
  rating?: number;
  solved?: number;
  logo: string;
  link: string;
  color: string;
  position: [number, number, number];
}

// Distribute nodes evenly on a sphere using Fibonacci sphere algorithm
function fibonacciSphere(
  samples: number,
  radius: number
): [number, number, number][] {
  const points: [number, number, number][] = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    points.push([x * radius, y * radius, z * radius]);
  }

  return points;
}

// CP Node Component
function CPNode({ node, index }: { node: CPNode; index: number }) {
  const [x, y, z] = node.position;
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Pulse and rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      const pulse =
        Math.sin(state.clock.elapsedTime * 2.5 + index * 0.4) * 0.15 + 1;
      meshRef.current.scale.setScalar(pulse);
    }

    // Rotating ring effect
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.02;
    }

    // Rotate to always face camera
    if (groupRef.current) {
      groupRef.current.lookAt(state.camera.position);
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    console.log("CP Node clicked:", node.platform, node.link);
    if (node.link) {
      window.open(node.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <group ref={groupRef} position={[x, y, z]}>
      {/* Main glowing sphere - clickable */}
      <mesh ref={meshRef} onClick={handleClick} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'default'}>
        <sphereGeometry args={[0.25, 20, 20]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Rotating ring around node */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.35, 0.025, 10, 32]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.5} />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.25} />
      </mesh>

      {/* Extra outer glow */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.12} />
      </mesh>

      {/* HTML label with platform info */}
      <Html
        center
        distanceFactor={8}
        style={{
          pointerEvents: "auto",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center gap-1.5 transition-all duration-300 hover:scale-110">
          {/* Platform Logo */}
          <div
            className="w-16 h-16 p-3 rounded-xl backdrop-blur-md shadow-2xl transition-all duration-300 hover:shadow-3xl"
            style={{
              backgroundColor: "rgba(0,0,0,0.85)",
              border: `2px solid ${node.color}80`,
              boxShadow: `0 0 25px ${node.color}60`,
            }}
          >
            <img
              src={node.logo}
              alt={node.platform}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Platform Name */}
          <div
            className="text-sm font-bold px-4 py-1.5 rounded-lg backdrop-blur-md whitespace-nowrap shadow-lg"
            style={{
              color: node.color,
              backgroundColor: "rgba(0,0,0,0.9)",
              border: `2px solid ${node.color}70`,
              boxShadow: `0 0 15px ${node.color}40`,
            }}
          >
            {node.platform}
          </div>

          {/* Username */}
          <div
            className="text-xs font-semibold px-3 py-1 rounded backdrop-blur-sm opacity-90"
            style={{
              color: "#ffffff",
              backgroundColor: "rgba(0,0,0,0.75)",
              border: `1px solid ${node.color}50`,
            }}
          >
            @{node.username}
          </div>

          {/* Stats */}
          {(node.rating || node.solved) && (
            <div className="flex gap-2 mt-1">
              {node.rating && (
                <div
                  className="text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm"
                  style={{
                    color: node.color,
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: `1px solid ${node.color}40`,
                  }}
                >
                  ⭐ {node.rating}
                </div>
              )}
              {node.solved && (
                <div
                  className="text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm"
                  style={{
                    color: node.color,
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: `1px solid ${node.color}40`,
                  }}
                >
                  ✓ {node.solved}
                </div>
              )}
            </div>
          )}

          {/* Click hint */}
        </div>
      </Html>

      {/* Connection line to center */}
      <Line
        points={[
          [0, 0, 0],
          [-x * 0.65, -y * 0.65, -z * 0.65],
        ]}
        color={node.color}
        lineWidth={2}
        transparent
        opacity={0.45}
      />
    </group>
  );
}

// Core CP sphere
function CoreCPSphere() {
  const outerRef = useRef<THREE.Mesh>(null);
  const middleRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (outerRef.current) {
      outerRef.current.rotation.y += 0.004;
      outerRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
    if (middleRef.current) {
      middleRef.current.rotation.y -= 0.003;
    }
    if (innerRef.current) {
      innerRef.current.rotation.z += 0.002;
    }
  });

  return (
    <group>
      {/* Outer wireframe - golden/trophy color */}
      <Sphere ref={outerRef} args={[1.7, 32, 32]}>
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#d97706"
          emissiveIntensity={0.4}
          transparent
          opacity={0.3}
          wireframe
        />
      </Sphere>

      {/* Middle sphere with code pattern */}
      <Sphere ref={middleRef} args={[1.3, 32, 32]}>
        <meshStandardMaterial
          color="#1f2937"
          emissive="#374151"
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </Sphere>

      {/* Inner glowing core */}
      <Sphere ref={innerRef} args={[1.0, 32, 32]}>
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#fbbf24"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
        />
      </Sphere>

      {/* Core atmosphere glow */}
      <Sphere args={[1.1, 32, 32]}>
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

// Connection network
function CPConnectionNetwork({ nodes }: { nodes: CPNode[] }) {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  const connections = useMemo(() => {
    const conns: {
      start: [number, number, number];
      end: [number, number, number];
      color: string;
    }[] = [];
    const maxDistance = 2.6;

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
          lineWidth={1.2}
          transparent
          opacity={0.15}
        />
      ))}
    </group>
  );
}

// Code particles floating around
function CodeParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(600 * 3);

    for (let i = 0; i < 600; i++) {
      const i3 = i * 3;
      const radius = 3.5 + Math.random() * 2;
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
      particlesRef.current.rotation.y += 0.0004;
      particlesRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <points ref={particlesRef} geometry={particleGeometry}>
      <pointsMaterial
        size={0.03}
        color="#f59e0b"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// Trophy/Achievement rings
function AchievementRings() {
  const rings = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (rings.current) {
      rings.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={rings}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.03, 16, 100]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <torusGeometry args={[2.8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// Main CP Planet Component with API fetching
export default function CPPlanet3D() {
  const [profiles, setProfiles] = useState<CPProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/cpProfiles`
        );
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error("Failed to fetch CP profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const generateNodes = useCallback((): CPNode[] => {
    if (profiles.length === 0) return [];

    const positions = fibonacciSphere(profiles.length, 2.9);
    return profiles.map((profile, index) => ({
      platform: profile.platform,
      username: profile.username,
      rating: profile.rating,
      solved: profile.solved,
      logo: profile.logo,
      link: profile.link,
      color: profile.color,
      position: positions[index],
    }));
  }, [profiles]);

  const nodes = useMemo(() => generateNodes(), [generateNodes]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900">
        <div className="text-amber-500 text-xl font-bold animate-pulse flex flex-col items-center gap-4">
          <div>Loading CP Universe...</div>
          <div className="text-sm text-amber-400/60">
            Fetching competitive programming profiles
          </div>
        </div>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900">
        <div className="text-red-500 text-xl font-bold flex flex-col items-center gap-4">
          <div className="text-5xl">⚠️</div>
          <div>No CP profiles found</div>
          <div className="text-sm text-red-400/60">
            Unable to load competitive programming data
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {/* Instruction text */}


      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        className="w-full h-full"
        style={{ pointerEvents: "auto" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.3} />
        <pointLight position={[-5, -5, -5]} intensity={0.7} color="#f59e0b" />
        <pointLight position={[5, -5, 5]} intensity={0.7} color="#fbbf24" />
        <spotLight
          position={[0, 10, 0]}
          intensity={0.6}
          angle={0.6}
          penumbra={1}
          color="#f59e0b"
        />
        <pointLight position={[0, -10, 0]} intensity={0.4} color="#ef4444" />

        {/* Core CP sphere */}
        <CoreCPSphere />

        {/* Achievement rings */}
        <AchievementRings />

        {/* Connection network */}
        <CPConnectionNetwork nodes={nodes} />

        {/* CP nodes */}
        {nodes.map((node, index) => (
          <CPNode key={index} node={node} index={index} />
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
