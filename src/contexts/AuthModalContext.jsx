'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import FirebaseAuthForm from '@/components/froms/FirebaseAuthForm';

// Create the authentication modal context
const AuthModalContext = createContext();

// Custom hook to use the auth modal context
export const useAuthModalContext = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModalContext must be used within an AuthModalProvider');
  }
  return context;
};

// Provider component that makes auth modal functions available to any child component
export function AuthModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'

  const openSignIn = () => {
    setAuthMode('signin');
    setIsOpen(true);
  };

  const openSignUp = () => {
    setAuthMode('signup');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Handle mode toggle events from the FirebaseAuthForm
  useEffect(() => {
    const handleToggleAuthMode = (event) => {
      setAuthMode(event.detail);
    };

    window.addEventListener('toggleAuthMode', handleToggleAuthMode);
    return () => {
      window.removeEventListener('toggleAuthMode', handleToggleAuthMode);
    };
  }, []);

  // The value passed to the context provider
  const value = {
    isOpen,
    authMode,
    openSignIn,
    openSignUp,
    closeModal
  };

  return (
    <AuthModalContext.Provider value={value}>
      {children}

      {/* Authentication Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center mb-4"
                  >
                    {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                  </Dialog.Title>
                  
                  <button
                    type="button"
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-500"
                    onClick={closeModal}
                  >
                    <span className="sr-only">Close</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <FirebaseAuthForm 
                    mode={authMode} 
                    onNext={() => {
                      closeModal();
                    }} 
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </AuthModalContext.Provider>
  );
}