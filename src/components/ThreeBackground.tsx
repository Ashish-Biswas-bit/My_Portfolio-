"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({
  position,
  color,
  speed,
  size,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  size: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 1]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.15}
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 200 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00f5ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GridLines() {
  const gridRef = useRef<THREE.GridHelper>(null!);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z =
        (state.clock.elapsedTime * 0.5) % 2;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[40, 40, "#1a1a5e", "#1a1a3e"]}
      position={[0, -5, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#ff00ff" />
        <pointLight position={[10, -5, 5]} intensity={0.3} color="#00f5ff" />

        <FloatingShape
          position={[-4, 2, -3]}
          color="#00f5ff"
          speed={1.5}
          size={1.2}
        />
        <FloatingShape
          position={[4, -1, -4]}
          color="#7b2ff7"
          speed={1}
          size={0.8}
        />
        <FloatingShape
          position={[-2, -3, -2]}
          color="#ff00ff"
          speed={2}
          size={0.6}
        />
        <FloatingShape
          position={[3, 3, -5]}
          color="#00d4ff"
          speed={0.8}
          size={1}
        />
        <FloatingShape
          position={[0, 0, -6]}
          color="#7b2ff7"
          speed={1.2}
          size={1.5}
        />

        <Particles count={300} />
        <GridLines />
      </Canvas>
    </div>
  );
}
