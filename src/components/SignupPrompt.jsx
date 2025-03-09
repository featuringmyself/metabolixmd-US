'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import useFirebaseAuth from '../services/Auth/useFirebaseAuth';
import { toast } from 'react-toastify';

const SignupPrompt = ({ onClose }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { createUserWithEmailMethod } = useFirebaseAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailMethod(email, password);
      if (result.status) {
        toast.success('Account created successfully!');
        onClose();
      }
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
    }
  };

  const handleGoogleSignup = () => {
    router.push('/signup');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
          Create Your Account
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Join MetabolixMD to access personalized weight loss projections and treatment options.
        </p>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600 mb-2">Or sign up with</p>
          <button
            onClick={handleGoogleSignup}
            className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Continue with Google
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{' '}
          <button
            onClick={() => router.push('/login')}
            className="text-primary hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default SignupPrompt;