import React, { useState, Suspense } from 'react';
import { Shield } from 'lucide-react';
import axios from 'axios';
import AnimatedBackground from '../components/AnimatedBackground';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw"
  },
  in: {
    opacity: 1,
    x: 0
  },
  out: {
    opacity: 0,
    x: "100vw"
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.1
};

const avatars = [
  {
    id: 'boy1',
    model: '/adorable_cartoon-like_boy_with_blue_hair_and_ex.glb',
    title: 'Adorable Cartoon Boy'
  },
  {
    id: 'girl1',
    model: '/cartoon_girl_bust.glb',
    title: 'Cartoon Girl'
  },
  {
    id: 'boy2',
    model: '/jogador__player_-_cartoon_boy_-_toscoman_3d.glb',
    title: 'Cartoon Boy Player'
  },
  {
    id: 'girl2',
    model: '/shadow_boxing_girl.glb',
    title: 'Shadow Boxing Girl'
  }
];

function AvatarPreview({ modelUrl }) {
  const model = useLoader(GLTFLoader, modelUrl);

  // Rotate to face front, matching AdventureDoors
  model.scene.rotation.y = Math.PI;

  return <primitive object={model.scene} scale={1.5} />;
}

const AvatarSelection = ({ user, onNavigate }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectAvatar = async (avatarId) => {
    setSelectedAvatar(avatarId);
    setLoading(true);
    try {
      await axios.put('http://localhost:5000/api/auth/update-avatar', { id: user.id, avatar: avatarId });
      onNavigate('welcome', { user: { ...user, avatar: avatarId } });
    } catch (error) {
      console.error('Error updating avatar:', error);
      // Handle error, maybe show message
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4 relative"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <AnimatedBackground />
      <div className="w-full max-w-4xl">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-2">
              <Shield className="w-10 h-10 text-yellow-300" />
              <h1 className="text-4xl font-bold text-white">SafeQuest</h1>
            </div>
            <p className="text-purple-100">{user.avatar ? 'Change your avatar' : 'Choose your avatar'}, {user.username}!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                className={`relative bg-white/5 rounded-xl p-4 border-2 cursor-pointer transition-all ${
                  selectedAvatar === avatar.id ? 'border-yellow-300' : 'border-white/20 hover:border-white/40'
                }`}
                onClick={() => handleSelectAvatar(avatar.id)}
              >
                <Canvas
                  camera={{ position: [0, 0, 5], fov: 60 }}
                  style={{ width: '100%', height: '256px', borderRadius: '0.5rem' }}
                >
                  <ambientLight intensity={0.7} />
                  <directionalLight position={[5, 10, 5]} intensity={0.8} />
                  <Suspense fallback={<mesh><boxGeometry args={[1,1,1]} /><meshStandardMaterial color="red" /></mesh>}>
                    <AvatarPreview modelUrl={avatar.model} />
                  </Suspense>
                </Canvas>
                <p className="text-white text-center mt-2">{avatar.title}</p>
                {selectedAvatar === avatar.id && loading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                    <div className="text-white">Saving...</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AvatarSelection;
