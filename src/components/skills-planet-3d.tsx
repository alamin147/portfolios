import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";
import {
  SiTypescript,
  SiJavascript,
  SiExpress,
  SiNodedotjs,
  SiReact,
  SiMongodb,
  SiMongoose,
  SiPostgresql,
  SiTailwindcss,
  SiRedux,
  SiCplusplus,
  SiC,
  SiHtml5,
  SiCss3,
  SiPrisma,
} from "react-icons/si";
import React from "react";

interface SkillNode {
  name: string;
  icon: React.ReactElement;
  color: string;
  position: [number, number, number];
}

// Skills data with positions distributed on sphere
const skillsData = [
  { name: "TypeScript", icon: <SiTypescript />, color: "#3178c6" },
  { name: "JavaScript", icon: <SiJavascript />, color: "#f7df1e" },
  { name: "Express", icon: <SiExpress />, color: "#000000" },
  { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
  { name: "React", icon: <SiReact />, color: "#61dafb" },
  { name: "MongoDB", icon: <SiMongodb />, color: "#47a248" },
  { name: "Mongoose", icon: <SiMongoose />, color: "#880000" },
  { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
  { name: "Tailwind", icon: <SiTailwindcss />, color: "#06b6d4" },
  { name: "Redux", icon: <SiRedux />, color: "#764abc" },
  { name: "C++", icon: <SiCplusplus />, color: "#00599c" },
  { name: "C", icon: <SiC />, color: "#a8b9cc" },
  { name: "HTML", icon: <SiHtml5 />, color: "#e34f26" },
  { name: "CSS", icon: <SiCss3 />, color: "#1572b6" },
  { name: "Prisma", icon: <SiPrisma />, color: "#2d3748" },
];

// Distribute skills evenly on a sphere using Fibonacci sphere algorithm
function fibonacciSphere(samples: number, radius: number): [number, number, number][] {
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

// Skill Node Component
function SkillNode({ skill, index }: { skill: SkillNode; index: number }) {
  const [x, y, z] = skill.position;
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Pulse animation
  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2 + index * 0.3) * 0.1 + 1;
      meshRef.current.scale.setScalar(pulse);
    }

    // Rotate to always face camera
    if (groupRef.current) {
      groupRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <group ref={groupRef} position={[x, y, z]}>
      {/* Glowing sphere for the skill node */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* HTML label with icon */}
      <Html
        center
        distanceFactor={8}
        style={{
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div className="flex flex-col items-center gap-1 transition-all duration-300 hover:scale-110">
          <div
            className="text-2xl p-2 rounded-lg backdrop-blur-sm"
            style={{
              color: skill.color,
              backgroundColor: "rgba(0,0,0,0.6)",
              border: `1px solid ${skill.color}40`,
            }}
          >
            {skill.icon}
          </div>
          <div
            className="text-xs font-semibold px-2 py-1 rounded backdrop-blur-sm whitespace-nowrap"
            style={{
              color: skill.color,
              backgroundColor: "rgba(0,0,0,0.7)",
              border: `1px solid ${skill.color}40`,
            }}
          >
            {skill.name}
          </div>
        </div>
      </Html>

      {/* Connection line to center */}
      <Line
        points={[
          [0, 0, 0],
          [-x * 0.7, -y * 0.7, -z * 0.7],
        ]}
        color={skill.color}
        lineWidth={1}
        transparent
        opacity={0.3}
      />
    </group>
  );
}

// Core planet sphere
function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 32, 32]}>
      <meshStandardMaterial
        color="#1a1a2e"
        emissive="#0f3460"
        emissiveIntensity={0.2}
        transparent
        opacity={0.3}
        wireframe
      />
    </Sphere>
  );
}

// Connecting lines between skills
function ConnectionLines({ skills }: { skills: SkillNode[] }) {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // Create connections between nearby skills
  const connections = useMemo(() => {
    const conns: { start: [number, number, number]; end: [number, number, number]; color: string }[] = [];
    const maxDistance = 2.5;

    for (let i = 0; i < skills.length; i++) {
      for (let j = i + 1; j < skills.length; j++) {
        const [x1, y1, z1] = skills[i].position;
        const [x2, y2, z2] = skills[j].position;
        const distance = Math.sqrt(
          Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
        );

        if (distance < maxDistance) {
          conns.push({
            start: [x1, y1, z1],
            end: [x2, y2, z2],
            color: skills[i].color,
          });
        }
      }
    }

    return conns;
  }, [skills]);

  return (
    <group ref={linesRef}>
      {connections.map((conn, index) => (
        <Line
          key={index}
          points={[conn.start, conn.end]}
          color={conn.color}
          lineWidth={1}
          transparent
          opacity={0.15}
        />
      ))}
    </group>
  );
}

// Rotating particles
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(500 * 3);

    for (let i = 0; i < 500; i++) {
      const i3 = i * 3;
      const radius = 3 + Math.random() * 2;
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
      particlesRef.current.rotation.y += 0.0005;
      particlesRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <points ref={particlesRef} geometry={particleGeometry}>
      <pointsMaterial
        size={0.02}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Main Skills Planet Component
export function SkillsPlanet3D() {
  // Distribute skills on sphere
  const skills: SkillNode[] = useMemo(() => {
    const positions = fibonacciSphere(skillsData.length, 2.5);
    return skillsData.map((skill, index) => ({
      ...skill,
      position: positions[index],
    }));
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Instruction text */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-cyan-400/60 text-sm animate-pulse pointer-events-none">
        {/* 🖱️ Drag to explore • Scroll to zoom • 💻 Skills Planet */}
      </div>

      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        className="w-full h-full"
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00d4ff" />
        <pointLight position={[5, -5, 5]} intensity={0.5} color="#ff00ff" />

        {/* Core wireframe sphere */}
        <CoreSphere />

        {/* Connection lines */}
        <ConnectionLines skills={skills} />

        {/* Skill nodes */}
        {skills.map((skill, index) => (
          <SkillNode key={index} skill={skill} index={index} />
        ))}

        {/* Floating particles */}
        <Particles />

        {/* OrbitControls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={12}
          autoRotate={true}
          autoRotateSpeed={0.5}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}
