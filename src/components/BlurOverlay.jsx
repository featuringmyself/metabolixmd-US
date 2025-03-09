'use client';
import { useEffect, useState } from 'react';
import { auth } from '../services/Auth/firebaseConfigue';
import SignupPrompt from './SignupPrompt';

const BlurOverlay = ({ children, blurIntensity = 8 }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 h-full w-full rounded"></div>;
  }

  return (
    <div className="relative">
      <div className={`transition-all duration-500 ease-in-out ${
        !isAuthenticated ? 'filter blur-md pointer-events-none' : ''
      }`}>
        {children}
      </div>
      {!isAuthenticated && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-white/90 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
            <h3 className="text-2xl font-bold mb-4 text-primary">Sign Up to View Content</h3>
            <p className="text-gray-700 mb-6">Create an account to access detailed information and personalized weight loss projections</p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => setShowSignupPrompt(true)}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg w-full"
              >
                Sign Up Now
              </button>
              <button
                onClick={() => setShowSignupPrompt(true)}
                className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors font-semibold text-lg w-full"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      )}
      {showSignupPrompt && <SignupPrompt onClose={() => setShowSignupPrompt(false)} />}
    </div>
  );
};

export default BlurOverlay;