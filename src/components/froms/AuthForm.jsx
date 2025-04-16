import React from 'react';
import { useRouter } from 'next/navigation';
import FirebaseAuthForm from './FirebaseAuthForm';
import { showSuccessToast } from '@/lib/toastConfig';

const AuthForm = ({ onNext, mode = 'signin' }) => {
  const router = useRouter();

  const handleComplete = () => {
    // Show success toast notification using our custom function
    showSuccessToast('Successfully signed in!');
    
    // Don't specify the next form - let the MultiStepForm component handle it
    // This prevents redirection to a specific form after authentication
    onNext({});
  };

  const appearance = {
    elements: {
      rootBox: "w-full max-w-md mx-auto",
      card: "rounded-lg shadow-md",
      modalCloseButton: "hidden",
      modalBackdrop: "!bg-black/80",
    },
    layout: {
      socialButtonsPlacement: "bottom",
      showOptionalFields: false,
    },
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <FirebaseAuthForm 
        mode={mode} 
        onNext={handleComplete} 
      />
    </div>
  );
};

export default AuthForm;