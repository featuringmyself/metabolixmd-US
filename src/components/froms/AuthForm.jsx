import React from 'react';
import { useRouter } from 'next/navigation';
import FirebaseAuthForm from './FirebaseAuthForm';
import { showSuccessToast } from '@/lib/toastConfig';

const AuthForm = ({ onNext, mode = 'signin' }) => {
  const router = useRouter();

  const handleComplete = (result) => {
    if (result?.status) {
      onNext(result);
    }
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
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-3xl shadow-md">
      <FirebaseAuthForm 
        mode={mode} 
        onNext={handleComplete} 
      />
    </div>
  );
};

export default AuthForm;