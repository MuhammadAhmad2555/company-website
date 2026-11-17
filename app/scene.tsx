'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Torus } from '@react-three/drei';
import * as THREE from 'three';

/** Slow pointer-tracked rig: eases the camera toward the cursor. */
function Rig() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3());
  useFrame((_, dt) => {
    target.current.set(pointer.x * 1.6, pointer.y * 1.1, 0);
    camera.position.lerp(target.current.multiplyScalar(0.35), Math.min(1, dt * 2.4));
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/** The "quantum core": a distorting icosahedron wrapped in wire + orbiting rings. */
function Core() {
  const outer = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outer.current) {
      outer.current.rotation.y = t * 0.12;
      outer.current.rotation.x = Math.sin(t * 0.18) * 0.25;
    }
    if (wire.current) {
      wire.current.rotation.y = -t * 0.08;
      wire.current.rotation.z = t * 0.05;
    }
  });
  return (
    <group>
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={1.1}>
        <mesh ref={outer}>
          <icosahedronGeometry args={[1.45, 24]} />
          <MeshDistortMaterial
            color="#6d4fe0"
            emissive="#3a2a86"
            emissiveIntensity={0.55}
            roughness={0.18}
            metalness={0.75}
            distort={0.32}
            speed={1.6}
          />
        </mesh>
        <mesh ref={wire} scale={1.28}>
          <icosahedronGeometry args={[1.45, 1]} />
          <meshBasicMaterial color="#8f7bff" wireframe transparent opacity={0.28} />
        </mesh>
      </Float>
      <Torus args={[2.6, 0.012, 12, 128]} rotation={[Math.PI / 2.15, 0.35, 0]}>
        <meshBasicMaterial color="#6bd4ef" transparent opacity={0.5} />
      </Torus>
      <Torus args={[3.15, 0.01, 12, 128]} rotation={[Math.PI / 1.8, -0.5, 0.25]}>
        <meshBasicMaterial color="#9278fa" transparent opacity={0.35} />
      </Torus>
      <Orbiters />
    </group>
  );
}

/** Bright satellites travelling the two ring planes. */
function Orbiters() {
  const a = useRef<THREE.Group>(null);
  const b = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (a.current) a.current.rotation.z = t * 0.35;
    if (b.current) b.current.rotation.z = -t * 0.22;
  });
  return (
    <>
      <group rotation={[Math.PI / 2.15, 0.35, 0]} ref={a}>
        <mesh position={[2.6, 0, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#9be8ff" />
        </mesh>
        <mesh position={[-2.6, 0, 0]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#6bd4ef" />
        </mesh>
      </group>
      <group rotation={[Math.PI / 1.8, -0.5, 0.25]} ref={b}>
        <mesh position={[0, 3.15, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#c4b1ff" />
        </mesh>
      </group>
    </>
  );
}

/** Distant dust + near sparks for depth. */
function Field() {
  return (
    <>
      <Sparkles count={140} scale={[16, 10, 8]} size={1.6} speed={0.16} opacity={0.5} color="#8f7bff" position={[0, 0, -4]} />
      <Sparkles count={60} scale={[12, 8, 6]} size={3} speed={0.25} opacity={0.65} color="#6bd4ef" position={[0, 0, -1]} />
    </>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[6, 4, 6]} intensity={60} color="#9d86ff" />
      <pointLight position={[-7, -3, 4]} intensity={40} color="#4fc4e8" />
      <group position={[1.9, 0.15, 0]}>
        <Core />
      </group>
      <Field />
      <Rig />
    </>
  );
}

function webglAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Full-bleed WebGL backdrop for the hero. Only mounts on the client when WebGL
 * is available and the hero is on screen; a CSS gradient sits underneath as
 * the permanent fallback.
 */
export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(!reduced && webglAvailable());
    const el = wrap.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { rootMargin: '120px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="hero-scene" aria-hidden="true">
      {enabled && onScreen && (
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 8.5], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Scene />
        </Canvas>
      )}
    </div>
  );
}
