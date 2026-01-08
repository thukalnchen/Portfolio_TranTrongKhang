'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Float, 
  Html, 
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiTailwindcss,
  SiPython,
  SiFigma,
  SiMysql,
  SiExpress,
  SiSpring
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import KeyCap from './KeyCap';

// Tech skills data với màu sắc rực rỡ và icon
const TECH_SKILLS = [
  // Row 1 - Frontend
  { name: 'React', icon: SiReact, keycapColor: '#61DAFB', iconColor: '#FFFFFF', key: 'r', position: [0, 0, 1] },
  { name: 'Next.js', icon: SiNextdotjs, keycapColor: '#000000', iconColor: '#FFFFFF', key: 'n', position: [1.1, 0, 1] },
  { name: 'TypeScript', icon: SiTypescript, keycapColor: '#3178C6', iconColor: '#FFFFFF', key: 't', position: [2.2, 0, 1] },
  { name: 'JavaScript', icon: SiJavascript, keycapColor: '#F7DF1E', iconColor: '#000000', key: 'j', position: [3.3, 0, 1] },
  { name: 'Tailwind', icon: SiTailwindcss, keycapColor: '#38BDF8', iconColor: '#FFFFFF', key: 'w', position: [4.4, 0, 1] },
  
  // Row 2 - Backend
  { name: 'Node.js', icon: SiNodedotjs, keycapColor: '#68A063', iconColor: '#FFFFFF', key: 'o', position: [0, 0, 0] },
  { name: 'Python', icon: SiPython, keycapColor: '#3776AB', iconColor: '#FFD43B', key: 'p', position: [1.1, 0, 0] },
  { name: 'Java', icon: FaJava, keycapColor: '#ED8B00', iconColor: '#FFFFFF', key: 'a', position: [2.2, 0, 0] },
  { name: 'Express', icon: SiExpress, keycapColor: '#000000', iconColor: '#FFFFFF', key: 'e', position: [3.3, 0, 0] },
  { name: 'Spring', icon: SiSpring, keycapColor: '#6DB33F', iconColor: '#FFFFFF', key: 's', position: [4.4, 0, 0] },
  
  // Row 3 - Database
  { name: 'MongoDB', icon: SiMongodb, keycapColor: '#47A248', iconColor: '#FFFFFF', key: 'm', position: [0.55, 0, -1] },
  { name: 'PostgreSQL', icon: SiPostgresql, keycapColor: '#336791', iconColor: '#FFFFFF', key: 'q', position: [1.65, 0, -1] },
  { name: 'MySQL', icon: SiMysql, keycapColor: '#00758F', iconColor: '#F29111', key: 'y', position: [2.75, 0, -1] },
  { name: 'Git', icon: SiGit, keycapColor: '#F05032', iconColor: '#FFFFFF', key: 'g', position: [3.85, 0, -1] },
  
  // Row 4 - Tools
  { name: 'Docker', icon: SiDocker, keycapColor: '#2496ED', iconColor: '#FFFFFF', key: 'd', position: [1.1, 0, -2] },
  { name: 'Figma', icon: SiFigma, keycapColor: '#F24E1E', iconColor: '#FFFFFF', key: 'f', position: [2.2, 0, -2] },
];

// Keyboard Case - Transparent glass effect
const KeyboardCase = () => {
  return (
    <group position={[2.2, -0.55, -0.5]}>
      {/* Main case body - transparent glass */}
      <mesh receiveShadow>
        <boxGeometry args={[6.2, 0.25, 3.8]} />
        <meshStandardMaterial
          color="#1a1a2e"
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* RGB strip - front */}
      <mesh position={[0, 0.1, 1.85]}>
        <boxGeometry args={[5.8, 0.02, 0.05]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>

      {/* RGB strip - left */}
      <mesh position={[-3.05, 0.1, 0]}>
        <boxGeometry args={[0.05, 0.02, 3.6]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>

      {/* RGB strip - right */}
      <mesh position={[3.05, 0.1, 0]}>
        <boxGeometry args={[0.05, 0.02, 3.6]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>

      {/* Under-glow light effect */}
      <pointLight position={[0, -0.3, 0]} intensity={10} distance={2.5} color="#3b82f6" />
    </group>
  );
};

// Floating particles với glow
const FloatingParticles = ({ count = 50 }: { count?: number }) => {
  const particles = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = Math.random() * 8 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    const techColors = [
      [0.38, 0.51, 0.98], // Blue
      [0.55, 0.36, 0.96], // Purple
      [0.22, 0.71, 0.83], // Cyan
    ];
    
    for (let i = 0; i < count; i++) {
      const color = techColors[Math.floor(Math.random() * techColors.length)];
      cols[i * 3] = color[0];
      cols[i * 3 + 1] = color[1];
      cols[i * 3 + 2] = color[2];
    }
    return cols;
  }, [count]);

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y += 0.0005;
      const positions = particles.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      
      particles.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Main Keyboard Scene
const KeyboardScene = () => {
  return (
    <>
      {/* Background color */}
      <color attach="background" args={['#0a0a0a']} />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a0a', 10, 25]} />
      
      {/* Studio Lighting Setup */}
      <ambientLight intensity={1.2} />
      
      {/* Key light - Main spotlight */}
      <spotLight
        position={[5, 8, 5]}
        angle={0.5}
        penumbra={0.5}
        intensity={150}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Fill light */}
      <pointLight position={[-5, 5, -5]} intensity={50} color="#3b82f6" />
      
      {/* Rim light */}
      <pointLight position={[0, 2, -8]} intensity={50} color="#8b5cf6" />
      
      {/* Front fill */}
      <pointLight position={[2, 3, 8]} intensity={40} color="#ffffff" />

      {/* Ground plane for shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.3} />
      </mesh>

      {/* Keyboard case */}
      <KeyboardCase />

      {/* All keycaps - Using KeyCap component with Decal */}
      {TECH_SKILLS.map((skill) => (
        <KeyCap
          key={skill.name}
          position={skill.position as [number, number, number]}
          keycapColor={skill.keycapColor}
          iconColor={skill.iconColor}
          label={skill.name}
          icon={skill.icon}
          keyCode={skill.key}
        />
      ))}

      {/* Floating SKILLS title */}
      <Float
        speed={2}
        rotationIntensity={0.1}
        floatIntensity={0.3}
      >
        <Html
          position={[2.2, 2.5, -0.5]}
          center
          distanceFactor={4}
        >
          <div 
            className="text-6xl font-bold text-white pointer-events-none select-none"
            style={{
              textShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.6)',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            TECH SKILLS
          </div>
        </Html>
      </Float>

      {/* Floating particles */}
      <FloatingParticles count={20} />
    </>
  );
};

// Compact Keyboard Scene for Hero section
const CompactKeyboardScene = () => {
  return (
    <>
      {/* Enhanced Studio Lighting */}
      <ambientLight intensity={0.8} />
      
      {/* Key light - Main spotlight with warm tone */}
      <spotLight
        position={[8, 10, 8]}
        angle={0.4}
        penumbra={0.8}
        intensity={200}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        color="#ffffff"
      />
      
      {/* Blue accent light - left side */}
      <pointLight position={[-6, 4, 2]} intensity={80} color="#3b82f6" />
      
      {/* Purple accent light - right side */}
      <pointLight position={[8, 3, -4]} intensity={60} color="#8b5cf6" />
      
      {/* Cyan rim light - back */}
      <pointLight position={[2, 2, -10]} intensity={50} color="#06b6d4" />
      
      {/* Front fill light */}
      <pointLight position={[2, 5, 10]} intensity={30} color="#ffffff" />
      
      {/* Bottom glow */}
      <pointLight position={[2, -2, 0]} intensity={20} color="#3b82f6" />

      {/* Keyboard case */}
      <KeyboardCase />

      {/* All keycaps */}
      {TECH_SKILLS.map((skill) => (
        <KeyCap
          key={skill.name}
          position={skill.position as [number, number, number]}
          keycapColor={skill.keycapColor}
          iconColor={skill.iconColor}
          label={skill.name}
          icon={skill.icon}
          keyCode={skill.key}
        />
      ))}

      {/* Floating particles */}
      <FloatingParticles count={15} />
    </>
  );
};

// Main Component Export with isCompact prop
interface TechKeyboard3DProps {
  isCompact?: boolean;
  scale?: number;
}

const TechKeyboard3D = ({ isCompact = false, scale = 1 }: TechKeyboard3DProps) => {
  if (isCompact) {
    return (
      <div className="w-full h-full relative">
        <Canvas 
          shadows
          gl={{ 
            alpha: true, 
            antialias: true,
            premultipliedAlpha: false,
            preserveDrawingBuffer: true
          }}
          camera={{ position: [9, 5, 6], fov: 42 }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <group scale={scale} position={[0.5, 0, 0]}>
            <CompactKeyboardScene />
          </group>
          
          <OrbitControls 
            target={[3, 0, -0.5]}
            enablePan={false}
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.5}
          />

          <EffectComposer>
            <Bloom 
              intensity={1.5}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              height={300}
            />
          </EffectComposer>
        </Canvas>
        
        {/* Subtle hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
          <p className="text-xs text-gray-500 backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full">
            Press keys: R, N, T, J, P...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[700px] relative rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900 border border-white/10">
      <Canvas 
        shadows
        camera={{ position: [6, 5, 6], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <KeyboardScene />
        
        {/* OrbitControls */}
        <OrbitControls 
          target={[2.2, 0, 0]}
          enablePan={false}
          enableZoom={true}
          minDistance={8}
          maxDistance={15}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
        />

        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom 
            intensity={1.2}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.7}
            height={200}
          />
        </EffectComposer>
      </Canvas>
      
      {/* Keyboard interaction hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm text-gray-400 backdrop-blur-md bg-black/30 px-6 py-3 rounded-full border border-white/10">
          💡 <span className="font-semibold">Hover</span> over keycaps or press keyboard keys (R, N, T, J, etc.)
        </p>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default TechKeyboard3D;
