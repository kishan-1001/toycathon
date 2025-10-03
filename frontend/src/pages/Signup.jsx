import React, { useState } from 'react';
import { Shield, User, Mail, Lock } from 'lucide-react';
import Input from '../components/Input';
import AuthButton, { GoogleIcon } from '../components/AuthButton';
import RoleSelector from '../components/RoleSelector';
import firebase from '../firebase';
import AnimatedBackground from '../components/AnimatedBackground';

const Signup = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!username) newErrors.username = 'Username is required';
    else if (username.length < 3) newErrors.username = 'Username must be at least 3 characters';
    else if (!/^[a-zA-Z0-9_]+$/.test(username)) newErrors.username = 'Username can only contain letters, numbers, and underscores';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!role) newErrors.role = 'Please select your role';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (validate()) {
      try {
        await firebase.auth.createUserWithEmailAndPassword(email, password);
        console.log('User data:', { name, username, role });
        alert(`Account created successfully as ${role}! Welcome, ${name}! 🎉`);
      } catch (error) {
        setErrors({ ...errors, general: 'Signup failed. Please try again.' });
      }
    }
  };

  const handleGoogleSignup = async () => {
    if (!role) {
      setErrors({ ...errors, role: 'Please select your role first' });
      return;
    }
    try {
      await firebase.auth.signInWithPopup();
      alert(`Google signup successful as ${role}! 🎉`);
    } catch (error) {
      setErrors({ ...errors, general: 'Google signup failed.' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4 relative">
      <AnimatedBackground />
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-2">
              <Shield className="w-10 h-10 text-yellow-300" />
              <h1 className="text-4xl font-bold text-white">SafeQuest</h1>
            </div>
            <p className="text-purple-100">Start your safety adventure!</p>
          </div>

          <RoleSelector selected={role} onChange={setRole} />
          {errors.role && <p className="text-red-300 text-sm mb-4 -mt-2 ml-1">{errors.role}</p>}

          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />

          <Input
            icon={User}
            type="text"
            placeholder="Username (display name)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
          />

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

          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
          />

          {errors.general && (
            <p className="text-red-300 text-sm mb-4 text-center">{errors.general}</p>
          )}

          <div className="mb-4">
            <AuthButton onClick={handleSignup}>Create Account</AuthButton>
          </div>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-300/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-purple-100">or</span>
            </div>
          </div>

          <AuthButton variant="google" icon={GoogleIcon} onClick={handleGoogleSignup}>
            Continue with Google
          </AuthButton>

          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="text-purple-100 text-sm">Already have an account?</span>
            <button
              onClick={() => onNavigate('login')}
              className="text-yellow-300 font-semibold hover:underline transition-all"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
