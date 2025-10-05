import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Character component using GLTF model
function Character({ index, isKicking, setIsKicking }) {
  const groupRef = useRef();
  const model = useLoader(GLTFLoader, 'https://models.readyplayer.me/68e253b39f7e763dcea3fa50.glb');
  const kickStartTimeRef = useRef(0);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (index === 1) {
      // Waiting animation: simple up and down
      groupRef.current.position.y = -0.7 + Math.sin(time * 2) * 0.05;
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    } else if (index === 2) {
      // Reading animation: slight bobbing
      groupRef.current.position.y = -0.7 + Math.sin(time) * 0.03;
      groupRef.current.rotation.x = -0.1;
    }

    // Kick animation if triggered
    if (isKicking) {
      const kickTime = time - kickStartTimeRef.current;
      const progress = Math.min(kickTime / 1, 1); // 1 second duration

      if (progress < 0.5) {
        const windProgress = progress * 2;
        groupRef.current.rotation.z = Math.sin(windProgress * Math.PI) * 0.2;
      } else if (progress < 0.7) {
        groupRef.current.rotation.z = 0;
      }

      if (progress >= 1) {
        setIsKicking(false);
        groupRef.current.rotation.z = 0;
      }
    }
  });

  useEffect(() => {
    if (isKicking) {
      kickStartTimeRef.current = performance.now() / 1000; // in seconds
    }
  }, [isKicking]);

  return (
    <group ref={groupRef} position={[0, 0, 0]} dispose={null}>
      <primitive object={model.scene.clone(true)} scale={3.75} />
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
        if (index === 0) {
          onNavigate('adventure');
        } else if (index === 2) {
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
            camera={{ position: [0, 0, 5], fov: 60 }}
            style={{ width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 10, 5]} intensity={0.8} />
            <directionalLight position={[-5, 5, -5]} intensity={0.4} />
            <Suspense fallback={<mesh><boxGeometry args={[1,1,1]} /><meshStandardMaterial color="red" /></mesh>}>
              <Character index={index} isKicking={isKicking} setIsKicking={setIsKicking} />
            </Suspense>
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
