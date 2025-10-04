import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Character component
function Character({ index, isKicking, setIsKicking }) {
  const groupRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const rightShoeRef = useRef();
  const bookRef = useRef();
  const kickStartTimeRef = useRef(0);

  // Create character parts
  const headGeometry = new THREE.SphereGeometry(0.25, 32, 32);
  const skinMaterial = new THREE.MeshStandardMaterial({ color: 0xffdbac });

  const hairGeometry = new THREE.SphereGeometry(0.27, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
  const hairMaterial = new THREE.MeshStandardMaterial({ color: 0x2c1810 });

  const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
  const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

  const smileCurve = new THREE.EllipseCurve(0, 0, 0.1, 0.05, 0, Math.PI, false, 0);
  const smilePoints = smileCurve.getPoints(20);
  const smileGeometry = new THREE.BufferGeometry().setFromPoints(smilePoints);
  const smileMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });

  const torsoGeometry = new THREE.BoxGeometry(0.35, 0.5, 0.2);
  const torsoMaterial = new THREE.MeshStandardMaterial({ color: 0xff6b6b });

  const armGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.4, 16);
  const armMaterial = new THREE.MeshStandardMaterial({ color: 0xffdbac });

  const legGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.5, 16);
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x4169e1 });

  const shoeGeometry = new THREE.BoxGeometry(0.12, 0.08, 0.18);
  const shoeMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });

  // Book for reading avatar
  const coverGeometry = new THREE.BoxGeometry(0.3, 0.4, 0.05);
  const coverMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  const pagesGeometry = new THREE.BoxGeometry(0.28, 0.38, 0.04);
  const pagesMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (index === 1) {
      // Waiting animation
      groupRef.current.position.y = -0.7 + Math.sin(time * 2) * 0.05;
      rightArmRef.current.rotation.z = -0.3 + Math.sin(time * 3) * 0.4;
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    } else if (index === 2) {
      // Reading animation
      groupRef.current.position.y = -0.7 + Math.sin(time) * 0.03;
      groupRef.current.rotation.x = -0.1;
      if (bookRef.current) {
        bookRef.current.rotation.x = -0.3 + Math.sin(time * 2) * 0.05;
      }
    }

    // Kick animation if triggered
    if (isKicking) {
      const kickTime = time - kickStartTimeRef.current;
      const progress = Math.min(kickTime / 1, 1); // 1 second duration

      if (progress < 0.5) {
        const windProgress = progress * 2;
        groupRef.current.rotation.z = Math.sin(windProgress * Math.PI) * 0.2;
        rightLegRef.current.rotation.x = -windProgress * 1.5;
        rightShoeRef.current.position.z = 0.05 + windProgress * 0.3;
      } else if (progress < 0.7) {
        const kickProgress = (progress - 0.5) / 0.2;
        groupRef.current.rotation.z = 0;
        rightLegRef.current.rotation.x = -1.5 + kickProgress * 2;
        rightShoeRef.current.position.z = 0.35 + kickProgress * 0.4;
      } else {
        const returnProgress = (progress - 0.7) / 0.3;
        rightLegRef.current.rotation.x = 0.5 - returnProgress * 0.5;
        rightShoeRef.current.position.z = 0.75 - returnProgress * 0.7;
      }

      if (progress >= 1) {
        setIsKicking(false);
        groupRef.current.rotation.z = 0;
        rightLegRef.current.rotation.x = 0;
        rightShoeRef.current.position.z = 0.05;
      }
    }
  });

  useEffect(() => {
    if (isKicking) {
      kickStartTimeRef.current = performance.now() / 1000; // in seconds
    }
  }, [isKicking]);

  return (
    <group ref={groupRef} position={[0, -0.7, 0]}>
      {/* Head */}
      <mesh geometry={headGeometry} material={skinMaterial} position={[0, 1.4, 0]} scale={[1, 1.1, 1]} />

      {/* Hair */}
      <mesh geometry={hairGeometry} material={hairMaterial} position={[0, 1.55, 0]} />

      {/* Eyes */}
      <mesh geometry={eyeGeometry} material={eyeMaterial} position={[-0.1, 1.45, 0.2]} />
      <mesh geometry={eyeGeometry} material={eyeMaterial} position={[0.1, 1.45, 0.2]} />

      {/* Smile */}
      <line geometry={smileGeometry} material={smileMaterial} position={[0, 1.3, 0.22]} rotation={[Math.PI, 0, 0]} />

      {/* Torso */}
      <mesh geometry={torsoGeometry} material={torsoMaterial} position={[0, 0.9, 0]} />

      {/* Arms */}
      <mesh ref={leftArmRef} geometry={armGeometry} material={armMaterial} position={[-0.25, 0.95, 0]} rotation={[0, 0, 0.3]} />
      <mesh ref={rightArmRef} geometry={armGeometry} material={armMaterial} position={[0.25, 0.95, 0]} rotation={[0, 0, -0.3]} />

      {/* Legs */}
      <mesh ref={leftLegRef} geometry={legGeometry} material={legMaterial} position={[-0.12, 0.4, 0]} />
      <mesh ref={rightLegRef} geometry={legGeometry} material={legMaterial} position={[0.12, 0.4, 0]} />

      {/* Shoes */}
      <mesh geometry={shoeGeometry} material={shoeMaterial} position={[-0.12, 0.12, 0.05]} />
      <mesh ref={rightShoeRef} geometry={shoeGeometry} material={shoeMaterial} position={[0.12, 0.12, 0.05]} />

      {/* Book for reading avatar */}
      {index === 2 && (
        <group ref={bookRef} position={[0, 0.9, 0.3]} rotation={[-0.3, 0, 0]}>
          <mesh geometry={coverGeometry} material={coverMaterial} />
          <mesh geometry={pagesGeometry} material={pagesMaterial} position={[0, 0, 0.01]} />
        </group>
      )}
    </group>
  );
}

// Door component
function Door({ title, index, onNavigate }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isKicking, setIsKicking] = React.useState(false);

  const handleClick = () => {
    if (index === 0) {
      setIsKicking(true);
    }
    setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
        if (index === 2) {
          onNavigate('blog');
        }
      }, 2600);
    }, 400);
  };

  return (
    <div className="door-section">
      <h2 className="door-title">{title}</h2>
      <div className="door-container" onClick={handleClick}>
        <div className={`door ${isOpen ? 'open' : ''}`}>
          <div className="door-window"></div>
          <div className="door-knob"></div>
        </div>
        <div className="avatar-container">
          <Canvas
            camera={{ position: [0, 1.2, 3], fov: 45 }}
            style={{ width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 10, 5]} intensity={0.8} />
            <directionalLight position={[-5, 5, -5]} intensity={0.4} />
            <Character index={index} isKicking={isKicking} setIsKicking={setIsKicking} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

const AdventureDoors = ({ onNavigate }) => {
  return (
    <div className="container">
      <Door title="START ADVENTURE" index={0} onNavigate={onNavigate} />
      <Door title="CONTINUE ADVENTURE" index={1} onNavigate={onNavigate} />
      <Door title="BLOG" index={2} onNavigate={onNavigate} />
    </div>
  );
};

export default AdventureDoors;
