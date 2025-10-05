import React, { useState } from 'react';
import { Shield, Mail, Lock } from 'lucide-react';
import Input from '../components/Input';
import AuthButton from '../components/AuthButton';
import axios from 'axios';
import AnimatedBackground from '../components/AnimatedBackground';
import { motion } from 'framer-motion';

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

const Login = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validate()) {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/signin', { email, password });
        onNavigate('welcome', { user: res.data });
      } catch (error) {
        setErrors({ ...errors, general: 'Login failed. Please check your credentials.' });
      }
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
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-2">
              <Shield className="w-10 h-10 text-yellow-300" />
              <h1 className="text-4xl font-bold text-white">SafeQuest</h1>
            </div>
            <p className="text-purple-100">Welcome back, adventurer!</p>
          </div>

          <Input
            icon={Mail}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          {errors.general && (
            <p className="text-red-300 text-sm mb-4 text-center">{errors.general}</p>
          )}

          <div className="mb-4">
            <AuthButton onClick={handleLogin}>Sign In</AuthButton>
          </div>

          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="text-purple-100 text-sm">New to SafeQuest?</span>
            <button
              onClick={() => onNavigate('signup')}
              className="text-yellow-300 font-semibold hover:underline transition-all"
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
