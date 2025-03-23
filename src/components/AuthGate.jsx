import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import useFirebaseAuth from '@/services/Auth/useFirebaseAuth';

const AuthGate = ({ children }) => {
  const auth = useFirebaseAuth();
  const router = useRouter();
  const [currentUser, setCurrentUser] = React.useState(null);
  
  // Check for authentication on component mount
  React.useEffect(() => {
    // Check if user is authenticated by looking for token
    const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('token');
    if (isAuthenticated) {
      setCurrentUser(true);
    }
  }, []);

  if (currentUser) {
    return children;
  }

  const handleSignup = () => {
    router.push('/signup');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  // We already checked authentication in useEffect, no need to check again

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto p-6 text-center bg-white rounded-lg shadow-lg my-8"
    >
      <h2 className="text-2xl font-semibold text-primary mb-4">
        Create an Account to View Your Results
      </h2>
      <p className="text-gray-600 mb-6">
        To see your personalized weight loss graph and treatment options, please create a free account or log in.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleSignup}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Sign Up
        </button>
        <button
          onClick={handleLogin}
          className="bg-white text-primary border border-primary px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Log In
        </button>
      </div>
    </motion.div>
  );
};

export default AuthGate;