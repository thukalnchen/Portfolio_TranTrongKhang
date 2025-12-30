'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox, Decal } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import ReactDOMServer from 'react-dom/server';

interface KeyCapProps {
  position: [number, number, number];
  keycapColor: string;
  iconColor: string;
  label: string;
  icon?: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
  keyCode?: string;
}

// Tao data URL tu React Icon SVG
const createSvgDataUrl = (
  Icon: React.ComponentType<{ size?: number; color?: string }>,
  iconColor: string,
  size: number = 256
): string => {
  const svgString = ReactDOMServer.renderToStaticMarkup(
    <Icon size={size * 0.65} color={iconColor} />
  );

  const fullSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <g transform="translate(${size * 0.175}, ${size * 0.175})">
        ${svgString}
      </g>
    </svg>
  `;

  const encoded = encodeURIComponent(fullSvg);
  return `data:image/svg+xml,${encoded}`;
};

// Animated components
const AnimatedGroup = animated('group');

// Hook de load texture tu data URL
const useIconTexture = (dataUrl: string | null) => {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!dataUrl) {
      setTexture(null);
      return;
    }

    const loader = new THREE.TextureLoader();
    loader.load(
      dataUrl,
      (loadedTexture) => {
        loadedTexture.minFilter = THREE.LinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
      }
    );

    return () => {
      if (texture) {
        texture.dispose();
      }
    };
  }, [dataUrl]);

  return texture;
};

// Lighten color helper
const lightenColor = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
};

// Darken color helper
const darkenColor = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, (num >> 16) - amt);
  const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
  const B = Math.max(0, (num & 0x0000ff) - amt);
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
};

const KeyCap = ({ position, keycapColor, iconColor, label, icon: Icon, keyCode }: KeyCapProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Derived colors for premium look
  const topColor = useMemo(() => lightenColor(keycapColor, 15), [keycapColor]);
  const sideColor = useMemo(() => darkenColor(keycapColor, 10), [keycapColor]);
  const stemColor = useMemo(() => darkenColor(keycapColor, 5), [keycapColor]);

  // Tao data URL cho icon
  const iconDataUrl = useMemo(() => {
    if (!Icon) return null;
    return createSvgDataUrl(Icon, iconColor);
  }, [Icon, iconColor]);

  // Load texture
  const iconTexture = useIconTexture(iconDataUrl);

  // Spring animation - Keycap + Stem di chuyen, Housing dung yen
  const { scale, stemY, emissiveIntensity, glowIntensity } = useSpring({
    scale: pressed ? 0.96 : hovered ? 1.02 : 1,
    stemY: pressed ? -0.12 : 0, // Stem di chuyen xuong khi nhan
    emissiveIntensity: pressed ? 1 : hovered ? 0.6 : 0.3,
    glowIntensity: pressed ? 1.5 : hovered ? 1 : 0.4,
    config: {
      tension: 600,
      friction: 22,
      mass: 0.3,
    },
  });

  // Subtle floating animation for the whole unit
  useFrame((state) => {
    if (groupRef.current && !pressed) {
      const float = Math.sin(state.clock.elapsedTime * 1.5 + position[0] * 2) * 0.015;
      groupRef.current.position.y = position[1] + float;
    }
  });

  // Keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (keyCode && e.key.toLowerCase() === keyCode.toLowerCase()) {
        setPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (keyCode && e.key.toLowerCase() === keyCode.toLowerCase()) {
        setPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keyCode]);

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1], position[2]]}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={() => {
        setPressed(true);
        setTimeout(() => setPressed(false), 150);
      }}
    >
      {/* ===============================================================
          SWITCH HOUSING - CO DINH, KHONG DI CHUYEN
          Simplified for performance
      =============================================================== */}
      <group position={[0, -0.45, 0]}>
        
        {/* Housing Base - De switch */}
        <mesh castShadow>
          <boxGeometry args={[0.85, 0.22, 0.85]} />
          <meshStandardMaterial
            color="#2a2a2a"
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>

        {/* Housing Top Ring */}
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.78, 0.04, 0.78]} />
          <meshStandardMaterial
            color="#3a3a3a"
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>

        {/* LED Glow - simple emissive */}
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[0.5, 0.02, 0.5]} />
          <animated.meshStandardMaterial
            color={keycapColor}
            emissive={keycapColor}
            emissiveIntensity={glowIntensity.to((v: number) => v * 0.8)}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* ===============================================================
          SWITCH STEM + KEYCAP - DI CHUYEN CUNG NHAU
      =============================================================== */}
      <AnimatedGroup position-y={stemY}>
        
        {/* Stem Body - Tru chinh */}
        <mesh position={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[0.4, 0.16, 0.4]} />
          <meshStandardMaterial
            color={stemColor}
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>

        {/* Cross Mount - Cherry MX style */}
        <group position={[0, -0.08, 0]}>
          <mesh>
            <boxGeometry args={[0.05, 0.08, 0.22]} />
            <meshStandardMaterial color={keycapColor} roughness={0.4} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.22, 0.08, 0.05]} />
            <meshStandardMaterial color={keycapColor} roughness={0.4} />
          </mesh>
        </group>

        {/* ===============================================================
            KEYCAP - Simplified
        =============================================================== */}
        <AnimatedGroup scale={scale}>
          
          {/* Main Keycap Body */}
          <RoundedBox
            position={[0, 0.15, 0]}
            args={[0.88, 0.28, 0.88]}
            radius={0.06}
            smoothness={2}
            castShadow
          >
            <animated.meshStandardMaterial
              color={keycapColor}
              roughness={0.35}
              metalness={0.1}
              emissive={keycapColor}
              emissiveIntensity={emissiveIntensity}
            />
          </RoundedBox>

          {/* Top Surface */}
          <RoundedBox
            position={[0, 0.28, 0]}
            args={[0.72, 0.03, 0.72]}
            radius={0.03}
            smoothness={2}
          >
            <animated.meshStandardMaterial
              color={topColor}
              roughness={0.25}
              metalness={0.15}
              emissive={keycapColor}
              emissiveIntensity={emissiveIntensity}
            />

            {/* Icon Decal */}
            {iconTexture && (
              <Decal
                position={[0, 0.02, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[0.58, 0.58, 0.58]}
              >
                <meshBasicMaterial
                  map={iconTexture}
                  transparent
                  opacity={1}
                  polygonOffset
                  polygonOffsetFactor={-10}
                  depthTest={true}
                  depthWrite={false}
                />
              </Decal>
            )}
          </RoundedBox>
        </AnimatedGroup>
      </AnimatedGroup>

      {/* Single light for hover effect - only when needed */}
      {(hovered || pressed) && (
        <pointLight
          position={[0, -0.3, 0]}
          intensity={pressed ? 1.5 : 0.8}
          distance={0.8}
          color={keycapColor}
        />
      )}
    </group>
  );
};

export default KeyCap;
