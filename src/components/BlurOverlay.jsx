'use client';
import { useEffect, useState } from 'react';
import { useAuth, SignIn, SignInButton, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const BlurOverlay = ({ children, blurIntensity = 8, formData }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // For debugging
  useEffect(() => {
    if (mounted && !isSignedIn) {
      console.log('BlurOverlay: User not signed in, should show sign-in modal');
    }
  }, [mounted, isSignedIn]);

  if (!isLoaded) {
    return <div className="animate-pulse bg-gray-200 h-full w-full rounded"></div>;
  }

  return (
    <div className="relative">
      <div className={`transition-all duration-500 ease-in-out ${
        !isSignedIn ? 'filter blur-md pointer-events-none' : ''
      }`}>
        {children}
      </div>
      {mounted && !isSignedIn && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-[10000] w-full max-w-md mx-4">
            <ClerkLoading>
              <div className="bg-white rounded-xl shadow-2xl p-8 w-full transform transition-all flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            </ClerkLoading>
            <ClerkLoaded>
              <div className="bg-white rounded-xl shadow-2xl p-8 w-full transform transition-all">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign In Required</h2>
                <p className="text-gray-600 mb-6 text-center">Please sign in to access this content</p>
                <SignInButton 
                  mode="modal" 
                  afterSignInUrl="/get-started?form=weightCalculation"
                  redirectUrl="/get-started?form=weightCalculation"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      formButtonPrimary: "bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors w-full",
                    }
                  }}
                  signUpUrl="/sign-up"
                  afterSignIn={(result) => {
                    router.push('/get-started?form=weightCalculation');
                    return false;
                  }}
                >
                  <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors w-full">
                    Sign In
                  </button>
                </SignInButton>
              </div>
            </ClerkLoaded>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlurOverlay;