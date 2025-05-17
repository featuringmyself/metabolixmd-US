'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthModalContext } from '@/contexts/AuthModalContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const BlurOverlay = ({ children, blurIntensity = 8, formData, onBack }) => {
  const { isLoaded, isSignedIn, currentUser } = useAuth();
  const { openSignIn, openSignUp } = useAuthModalContext();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // For debugging
  useEffect(() => {
    if (mounted && !isSignedIn) {
      console.log('BlurOverlay: User not signed in, should show login modal');
    }
  }, [mounted, isSignedIn]);

  if (!isLoaded) {
    return <div className="animate-pulse bg-gray-200 h-full w-full rounded"></div>;
  }

  // Check if we're in the weight calculation step
  const params = new URLSearchParams(window.location.search);
  const currentForm = params.get('form');
  const isWeightCalculation = window.location.pathname === "/get-started" && 
                             (currentForm === "weightCalculation" || 
                              currentForm === "userInfo" ||
                              currentForm === "goalSelection" ||
                              !currentForm);

  return (
    <div className="relative">
      <div className={`transition-all duration-500 ease-in-out ${
        !isSignedIn && !isWeightCalculation ? 'filter blur-md pointer-events-none ' : ''
      }`}>
        {children}
      </div>
      {mounted && !isSignedIn && !isWeightCalculation && (
        <div className="fixed inset-0 flex items-center justify-center z-[40]">
          <div className="absolute inset-0 "></div>
          <div className="relative z-20 w-full max-w-md mx-4">
            {!isLoaded ? (
              <div className="bg-white rounded-xl shadow-2xl p-8 w-full transform transition-all flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-2xl p-8 w-full transform transition-all">
                <h2 className="text-2xl font-bold mb-4 text-center">Create Your Account</h2>
                <p className="text-gray-600 mb-6 text-center">Please create an account to continue your journey</p>
                <button 
                  onClick={openSignUp}
                  className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors w-full"
                >
                  Create Account
                </button>
                <p className="text-center text-gray-500 mt-4">Already have an account? 
                  <button 
                    onClick={openSignIn}
                    className="text-primary hover:text-primary/90 ml-2 font-medium"
                  >
                    Sign In
                  </button>
                </p>
                <div className="flex flex-col gap-3 mt-4">
                  
                  <Link 
                    href="/get-started?form=userInfoForm"
                    className="bg-gray-200 text-gray-700 px-6 py-2 text-center rounded-full hover:bg-gray-300 transition-colors w-full"
                  >
                    Back
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlurOverlay;