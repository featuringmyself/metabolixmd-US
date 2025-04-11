import React from 'react';
import { useRouter } from 'next/navigation';
import { SignIn, SignUp } from '@clerk/nextjs';

const AuthForm = ({ onNext, mode = 'signin' }) => {
  const router = useRouter();

  const handleComplete = () => {
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
      {mode === 'signin' ? (
        <SignIn
          appearance={appearance}
          afterSignInUrl="/get-started"
          signUpUrl={null}
          routing="virtual"
          afterSignIn={handleComplete}
        />
      ) : (
        <SignUp
          appearance={appearance}
          afterSignUpUrl="/get-started"
          signInUrl={null}
          routing="virtual"
          afterSignUp={handleComplete}
        />
      )}
    </div>
  );
};

export default AuthForm;